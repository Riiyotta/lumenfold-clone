#!/usr/bin/env python3
"""Semantic validator for Lumenfold PageSpecs.

Runs the Draft-07 schema first, then every rule JSON Schema cannot express. Each rule id
below is the same id used in compatibility/graph.json; extraction/verify_all.py fails if
the two sets ever diverge.

Usage:
    python3 schema/semantic_validate.py path/to/page.pagespec.json [...]
Exit code 0 when every file has zero errors (warnings are printed but do not fail).

Requires the `jsonschema` package (Draft7Validator).
"""
import json
import os
import re
import sys

from jsonschema import Draft7Validator

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # design-repo/

RULE_IDS = {
    'NAV_FIRST', 'FOOTER_LAST', 'FOOTER_ABSENT_NO_FOOTER_TEMPLATES', 'ONE_HERO', 'HERO_FOLLOWS_NAV',
    'TEMPLATE_SEQUENCE_MATCH', 'ROUTE_BOUND_TO_TEMPLATE', 'NO_EXCLUDED_ROUTES', 'NO_REDIRECT_ONLY_ROUTES',
    'VARIANT_ALLOWED_BY_TEMPLATE', 'NO_ADJACENT_IDENTICAL_NODE', 'CONTINUOUS_MOTION_BUDGET',
    'REDUCED_MOTION_FALLBACK_REQUIRED', 'MOTION_PATTERN_ALLOWED', 'ASSET_ROLE_ALLOWED_FOR_SECTION',
    'ASSET_POLICY_PINNED', 'NO_REAL_BRAND_REFERENCES', 'FORMS_VISUAL_ONLY', 'MAX_WORDS',
    'VARIANT_CONTENT_COHERENCE', 'OBSERVED_ADJACENCY', 'ADJACENT_CONVERSION',
}
SCHEMA_RULE = 'SCHEMA'


def _load(rel):
    with open(os.path.join(ROOT, rel), encoding='utf-8') as f:
        return json.load(f)


class Repo:
    """Everything the validator needs, loaded once from design-repo/ itself."""

    def __init__(self, root=ROOT):
        global ROOT
        ROOT = root
        self.schema = _load('schema/pagespec.schema.json')
        self.validator = Draft7Validator(self.schema)
        self.templates = _load('templates/templates.json')['templates']
        r = _load('templates/routes.json')
        self.routes = {x['path']: x['template'] for x in r['routes']}
        self.redirects = [x['path'] for x in r['redirects']]
        self.excluded = [re.compile(x['pattern']) for x in r['excluded']]
        self.graph = _load('compatibility/graph.json')
        self.rules = {x['id']: x for x in self.graph['rules']}
        self.categories = self.graph['sectionCategories']
        self.edges = set(self.graph['observedAdjacency'])
        roles = _load('assets/asset-roles.json')
        self.role_policy = {k: v['generationPolicy'] for k, v in roles['roles'].items()}
        self.brands = [b.lower() for b in roles['realBrandDenylist']['names']]
        self.sections = {}
        for fn in os.listdir(os.path.join(ROOT, 'sections')):
            if fn.endswith('.json'):
                c = _load('sections/' + fn)
                self.sections[c['id']] = c


def _words(s):
    return len(re.findall(r'\S+', s))


def _values_at(obj, path):
    """Yield (concrete_path, value) for a maxWords path like 'items[].title' or 'menus[].columns[].items[]'."""
    parts = path.split('.')

    def rec(o, i, trail):
        if i == len(parts):
            yield trail, o
            return
        p = parts[i]
        many = p.endswith('[]')
        key = p[:-2] if many else p
        if not isinstance(o, dict) or key not in o:
            return
        v = o[key]
        if many:
            if isinstance(v, list):
                for j, x in enumerate(v):
                    yield from rec(x, i + 1, f'{trail}.{key}[{j}]' if trail else f'{key}[{j}]')
        else:
            yield from rec(v, i + 1, f'{trail}.{key}' if trail else key)

    yield from rec(obj, 0, '')


def _strings(o, trail=''):
    if isinstance(o, str):
        yield trail, o
    elif isinstance(o, dict):
        for k, v in o.items():
            yield from _strings(v, f'{trail}.{k}' if trail else k)
    elif isinstance(o, list):
        for i, v in enumerate(o):
            yield from _strings(v, f'{trail}[{i}]')


def validate(spec, repo=None):
    """Return (errors, warnings); each item is (rule_id, message)."""
    repo = repo or Repo()
    errors, warnings = [], []

    def err(rule, msg):
        (errors if repo.rules.get(rule, {}).get('severity', 'error') == 'error' or rule == SCHEMA_RULE else warnings).append((rule, msg))

    for e in sorted(repo.validator.iter_errors(spec), key=lambda e: list(e.absolute_path)):
        errors.append((SCHEMA_RULE, f"{'/'.join(str(p) for p in e.absolute_path) or '<root>'}: {e.message[:200]}"))

    if not isinstance(spec, dict):
        return errors, warnings
    nodes = [n for n in spec.get('nodes', []) if isinstance(n, dict)]
    tid = spec.get('template')
    tpl = repo.templates.get(tid)
    route = spec.get('route')

    # ---- routes ------------------------------------------------------------------
    if isinstance(route, str):
        if any(p.search(route) for p in repo.excluded):
            err('NO_EXCLUDED_ROUTES', f'route {route} is a deliberate scope exclusion')
        if any(re.fullmatch(re.sub(r':[a-z]+', '[^/]+', r), route) for r in repo.redirects):
            err('NO_REDIRECT_ONLY_ROUTES', f'route {route} is redirect-only')
        if tpl is not None and repo.routes.get(route) != tid:
            err('ROUTE_BOUND_TO_TEMPLATE', f'route {route} is not a route of {tid} (routes.json says {repo.routes.get(route)})')

    seq = [n.get('section') for n in nodes]

    # ---- shell -------------------------------------------------------------------
    if seq.count('shell.navbar') != 1 or (seq and seq[0] != 'shell.navbar'):
        err('NAV_FIRST', 'shell.navbar must be the first node, exactly once')
    if tpl is not None:
        if tpl['footer']:
            if seq.count('shell.footer') != 1 or (seq and seq[-1] != 'shell.footer'):
                err('FOOTER_LAST', 'shell.footer must be the last node, exactly once')
        elif 'shell.footer' in seq:
            err('FOOTER_ABSENT_NO_FOOTER_TEMPLATES', f'{tid} renders without the footer (App.jsx NO_FOOTER)')

    heroes = [i for i, s in enumerate(seq) if repo.categories.get(s) == 'HERO']
    if len(heroes) > 1:
        err('ONE_HERO', f'{len(heroes)} HERO nodes; at most one allowed')
    if heroes and heroes[0] != 1 and tid not in (repo.rules['HERO_FOLLOWS_NAV'].get('exceptions') or []):
        err('HERO_FOLLOWS_NAV', 'hero does not directly follow the navbar')

    # ---- template cross-reference (the most important rule) ----------------------
    if tpl is not None:
        tnodes = tpl['nodes']
        ti, i = 0, 0
        while i < len(nodes):
            n = nodes[i]
            sec = n.get('section')
            while ti < len(tnodes) and tnodes[ti]['section'] != sec and not tnodes[ti]['required']:
                ti += 1
            if ti >= len(tnodes) or tnodes[ti]['section'] != sec:
                err('TEMPLATE_SEQUENCE_MATCH', f'node {i} ({sec}) is not the next node allowed by {tid}'
                    + (f" (expected {tnodes[ti]['section']})" if ti < len(tnodes) else ' (template has no more nodes)'))
                break
            tn = tnodes[ti]
            if n.get('variant') not in tn['variants']:
                err('VARIANT_ALLOWED_BY_TEMPLATE', f"node {i} {sec} variant {n.get('variant')!r} not in {tn['variants']} for {tid}")
            run = 1
            while i + run < len(nodes) and nodes[i + run].get('section') == sec:
                run += 1
            if run > 1:
                if not tn['repeatable']:
                    err('NO_ADJACENT_IDENTICAL_NODE', f'{sec} repeats {run}x but is not repeatable in {tid}')
                elif run > tn.get('maxRepeat', 1):
                    err('TEMPLATE_SEQUENCE_MATCH', f"{sec} repeats {run}x, maxRepeat {tn.get('maxRepeat')}")
            i += run
            ti += 1
        missing = [t['section'] for t in tnodes[ti:] if t['required']]
        if missing and not any(e[0] == 'TEMPLATE_SEQUENCE_MATCH' for e in errors):
            err('TEMPLATE_SEQUENCE_MATCH', f'missing required nodes for {tid}: {missing}')
    else:
        for a, b in zip(nodes, nodes[1:]):
            if a.get('section') == b.get('section') and a.get('variant') == b.get('variant'):
                err('NO_ADJACENT_IDENTICAL_NODE', f"{a.get('section')} repeated")

    # ---- adjacency (warn) ---------------------------------------------------------
    for a, b in zip(seq, seq[1:]):
        if f'{a}>{b}' not in repo.edges:
            err('OBSERVED_ADJACENCY', f'{a} -> {b} is not observed on any real template')
        if repo.categories.get(a) == 'CONVERSION' and repo.categories.get(b) == 'CONVERSION' and f'{a}>{b}' not in (repo.rules['ADJACENT_CONVERSION'].get('exceptions') or []):
            err('ADJACENT_CONVERSION', f'{a} -> {b}: two conversion sections in a row')

    # ---- per node ------------------------------------------------------------------
    budget = repo.graph['continuousMotionBudget']
    cont = set(repo.graph['continuousPatterns'])
    n_cont = 0
    for i, n in enumerate(nodes):
        sec = n.get('section')
        con = repo.sections.get(sec)
        if con is None:
            continue
        m = n.get('motion') if isinstance(n.get('motion'), dict) else {}
        pat = m.get('pattern')
        if 'reducedMotionFallback' not in m:
            err('REDUCED_MOTION_FALLBACK_REQUIRED', f'node {i} {sec}: motion.reducedMotionFallback missing')
        elif pat in con['motion']['reducedMotionFallback'] and m['reducedMotionFallback'] != con['motion']['reducedMotionFallback'][pat]:
            err('REDUCED_MOTION_FALLBACK_REQUIRED', f"node {i} {sec}: fallback {m['reducedMotionFallback']!r} != pinned {con['motion']['reducedMotionFallback'][pat]!r}")
        if pat not in con['motion']['patterns']:
            err('MOTION_PATTERN_ALLOWED', f'node {i} {sec}: motion pattern {pat!r} not in {con["motion"]["patterns"]}')
        elif m.get('trigger') != con['motion']['trigger'][pat]:
            err('MOTION_PATTERN_ALLOWED', f"node {i} {sec}: trigger {m.get('trigger')!r} != {con['motion']['trigger'][pat]!r}")
        if pat in cont:
            n_cont += 1

        for j, a in enumerate(n.get('assets') or []):
            if not isinstance(a, dict):
                continue
            role = a.get('assetRole')
            if role not in con['assetRoles']:
                err('ASSET_ROLE_ALLOWED_FOR_SECTION', f'node {i} {sec} asset {j}: role {role!r} not allowed (allowed: {con["assetRoles"]})')
            if role in repo.role_policy and a.get('generationPolicy') != repo.role_policy[role]:
                err('ASSET_POLICY_PINNED', f"node {i} {sec} asset {j}: {role} policy {a.get('generationPolicy')!r} != pinned {repo.role_policy[role]!r}")
            nm = str(a.get('name', '')).lower()
            if nm and any(re.search(r'(^|\W)' + re.escape(b) + r'($|\W)', nm) for b in repo.brands):
                err('NO_REAL_BRAND_REFERENCES', f"node {i} {sec} asset {j}: mark name {a.get('name')!r} matches a real brand")

        content = n.get('content') if isinstance(n.get('content'), dict) else {}
        for path, s in list(_strings(content)) + list(_strings({'meta': spec.get('meta')}) if i == 0 else []):
            if re.search(r'relevance\s*ai|relevanceai', s, re.I):
                err('NO_REAL_BRAND_REFERENCES', f'node {i} {sec} {path}: names the source company')
        for fpath, limit in con['maxWords'].items():
            for cpath, v in _values_at(content, fpath):
                if isinstance(v, str) and _words(v) > limit:
                    err('MAX_WORDS', f'node {i} {sec} {cpath}: {_words(v)} words > {limit}')
        if con['archetype'] == 'form':
            for path, s in _strings(content):
                if re.search(r'https?://|mailto:|\baction\b\s*=', s, re.I):
                    err('FORMS_VISUAL_ONLY', f'node {i} {sec} {path}: forms are visual-only (no endpoints/URLs)')
        if sec == 'conversion.grain-cta':
            v = n.get('variant')
            if 'palette' in content and v != 'function-palette':
                err('VARIANT_CONTENT_COHERENCE', f'node {i}: palette only allowed on function-palette (got {v})')
            if 'titleAccent' in content and v != 'violet':
                err('VARIANT_CONTENT_COHERENCE', f'node {i}: titleAccent only allowed on violet (got {v})')
    if n_cont > budget:
        err('CONTINUOUS_MOTION_BUDGET', f'{n_cont} continuous-motion nodes > budget {budget}')

    return errors, warnings


def main(argv):
    if len(argv) < 2:
        print(__doc__)
        return 2
    repo = Repo()
    bad = 0
    for p in argv[1:]:
        with open(p, encoding='utf-8') as f:
            spec = json.load(f)
        errors, warnings = validate(spec, repo)
        print(f'{p}: {len(errors)} error(s), {len(warnings)} warning(s)')
        for r, m in errors:
            print(f'  ERROR [{r}] {m}')
        for r, m in warnings:
            print(f'  warn  [{r}] {m}')
        bad += bool(errors)
    return 1 if bad else 0


if __name__ == '__main__':
    sys.exit(main(sys.argv))
