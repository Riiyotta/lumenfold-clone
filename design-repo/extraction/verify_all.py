#!/usr/bin/env python3
"""One-shot verification for the Lumenfold design-repo.

Checks (each prints PASS/FAIL; any FAIL exits 1):
  1. self-containment    entryPoints exist inside design-repo/, no ../ or absolute paths, no
                         home-directory paths anywhere in the tree
  2. schema              Draft-07 meta-validation + example has 0 schema and 0 semantic errors
  3. allowlist-parity    allowlist ids == contract files; node/motion/asset properties == schema;
                         asset roles == registry == schema enum; allowlistVersion == manifest
  4. manifest-counts     every number in registry.manifest.json#counts recomputed from disk,
                         and README's count table agrees
  5. citations           every cite.* reference resolves to the ledger; every ledger entry is
                         path:start[-end] and — when the sibling project tree is present — the
                         range fits the real file AND the quoted text sits inside that range.
                         Without the sibling tree this degrades to warnings.
  6. routes-templates    296 routes, each bound to exactly one template; routeCount parity;
                         template node sections/variants exist in the section contracts
  7. graph-validator     graph.json rule ids == semantic_validate.RULE_IDS
  8. asset-roles         closed enum AND pinned generationPolicy per role (a different-but-valid
                         policy fails); schema if/then consts agree with the pins
  9. tokens              theme + {ref} resolution, policy categories == catalog == foundation
 10. contracts           archetype defs exist, maxWords paths exist, sampleContent validates

Requires the `jsonschema` package. Run: python3 extraction/verify_all.py
"""
import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # design-repo/
PROJECT = os.path.dirname(ROOT)  # sibling source tree, if the repo still sits in its project

# Independent copy of the compliance pins. asset-roles.json must match these exactly.
PINNED = {
    'brand.logo': 'reuse-exact',
    'brand.mascot': 'reuse-exact',
    'proof.customer-wordmark': 'generate-fictional-mark',
    'proof.press-mark': 'generate-fictional-mark',
    'catalog.app-icon': 'generate-fictional-mark',
    'badge.certification-seal': 'generate-fictional-mark',
    'people.illustrated-avatar': 'generate-illustrated-person',
    'photo.customer-story': 'licensed-stock-no-marks',
    'photo.editorial-cover': 'licensed-stock-no-marks',
    'photo.company-place': 'licensed-stock-no-marks',
    'photo.product-scene': 'licensed-stock-no-marks',
    'video.poster': 'poster-placeholder-only',
    'illustration.diagram': 'generate-original-illustration',
}


def load(rel, root=None):
    with open(os.path.join(root or ROOT, rel), encoding='utf-8') as f:
        return json.load(f)


def files(sub, ext='.json'):
    d = os.path.join(ROOT, sub)
    return sorted(f for f in os.listdir(d) if f.endswith(ext))


# --------------------------------------------------------------------------------------
def check_self_containment():
    fails, warns = [], []
    man = load('registry.manifest.json')
    for e in man['entryPoints']:
        if e.startswith('/') or e.startswith('..') or '..' in e.split('/'):
            fails.append(f'entryPoint points outside the package: {e}')
        elif not os.path.isfile(os.path.join(ROOT, e)):
            fails.append(f'entryPoint missing: {e}')
    needle = re.compile('/' + 'Users' + '/|/' + 'home' + '/[a-z]|[A-Z]:\\\\' + 'Users')
    for dp, _, fns in os.walk(ROOT):
        for fn in fns:
            if fn in ('.DS_Store',):
                fails.append(f'junk file shipped: {os.path.relpath(os.path.join(dp, fn), ROOT)}')
                continue
            p = os.path.join(dp, fn)
            try:
                txt = open(p, encoding='utf-8').read()
            except (UnicodeDecodeError, OSError):
                continue
            if needle.search(txt):
                fails.append(f'absolute home path in {os.path.relpath(p, ROOT)}')
        if '__pycache__' in dp:
            warns.append(f'__pycache__ present: {os.path.relpath(dp, ROOT)} (excluded from the zip)')
    return fails, warns


def check_schema():
    from jsonschema import Draft7Validator
    sys.path.insert(0, os.path.join(ROOT, 'schema'))
    import semantic_validate as sv
    fails = []
    schema = load('schema/pagespec.schema.json')
    try:
        Draft7Validator.check_schema(schema)
    except Exception as e:  # noqa
        fails.append(f'schema is not valid Draft-07: {e}')
    ex = load('schema/example.pagespec.json')
    errs = list(Draft7Validator(schema).iter_errors(ex))
    fails += [f'example schema error: {e.message[:160]}' for e in errs]
    se, sw = sv.validate(ex, sv.Repo(ROOT))
    fails += [f'example semantic error [{r}] {m}' for r, m in se]
    fails += [f'example semantic warning [{r}] {m}' for r, m in sw]
    man = load('registry.manifest.json')
    if schema['properties']['pageSpecVersion'].get('const') != man['pageSpecVersion']:
        fails.append('pageSpecVersion: schema const != manifest')
    return fails, []


def check_allowlist_parity(al=None, man=None):
    fails = []
    al = al or load('tokens/llm/component-allowlist.json')
    man = man or load('registry.manifest.json')
    for kind, sub in [('primitives', 'primitives'), ('components', 'components'), ('sections', 'sections')]:
        on_disk = {load(f'{sub}/{f}')['id'] for f in files(sub)}
        listed = set(al[kind])
        for x in sorted(listed - on_disk):
            fails.append(f'phantom allowlist {kind} entry (no contract file): {x}')
        for x in sorted(on_disk - listed):
            fails.append(f'orphan {kind} contract (no allowlist entry): {x}')
        if len(al[kind]) != len(listed):
            fails.append(f'duplicate ids in allowlist {kind}')
    schema = load('schema/pagespec.schema.json')
    d = schema['definitions']
    for key, schema_keys in [('nodeProperties', d['node']['properties']), ('motionProperties', d['motion']['properties']), ('assetProperties', d['asset']['properties'])]:
        if set(al[key]) != set(schema_keys):
            fails.append(f'allowlist {key} {sorted(al[key])} != schema {sorted(schema_keys)}')
    roles = set(load('assets/asset-roles.json')['roles'])
    if set(al['assetRoles']) != roles or set(d['asset']['properties']['assetRole']['enum']) != roles:
        fails.append('assetRoles differ between allowlist, asset-roles.json and schema enum')
    if set(al['motionPatterns']) != set(d['motion']['properties']['pattern']['enum']):
        fails.append('motionPatterns differ between allowlist and schema')
    if set(al['sections']) != set(d['node']['properties']['section']['enum']):
        fails.append('allowlist sections != schema section enum')
    if man['allowlistVersion'] != al['version']:
        fails.append(f"allowlistVersion drift: manifest {man['allowlistVersion']} != allowlist {al['version']}")
    return fails, []


def count_tokens():
    n = 0
    for sub in ['00-foundation', '10-semantic', '20-component', '30-layout']:
        for fn in files(f'tokens/{sub}'):
            stack = [load(f'tokens/{sub}/{fn}')]
            while stack:
                o = stack.pop()
                if isinstance(o, dict):
                    if '$value' in o:
                        n += 1
                    else:
                        stack.extend(o.values())
    return n


def recount():
    r = load('templates/routes.json')
    return {'tokens': count_tokens(), 'primitives': len(files('primitives')), 'components': len(files('components')), 'sections': len(files('sections')),
            'templates': len(load('templates/templates.json')['templates']), 'routes': len(r['routes']), 'assetRoles': len(load('assets/asset-roles.json')['roles']),
            'rules': len(load('compatibility/graph.json')['rules']), 'citations': len(load('extraction/measured-values.json')['citations']),
            'redirects': len(r['redirects']), 'exclusions': len(r['excluded'])}


def check_manifest_counts(man=None):
    fails = []
    man = man or load('registry.manifest.json')
    real = recount()
    for k, v in real.items():
        if man['counts'].get(k) != v:
            fails.append(f'manifest counts.{k} = {man["counts"].get(k)} but disk has {v}')
    for k in man['counts']:
        if k not in real:
            fails.append(f'manifest counts.{k} has no recompute rule')
    readme = open(os.path.join(ROOT, 'README.md'), encoding='utf-8').read()
    for k, v in real.items():
        if not re.search(r'\|\s*' + re.escape(k) + r'\s*\|\s*' + str(v) + r'\s*\|', readme):
            fails.append(f'README count table does not state {k} = {v}')
    return fails, []


CITE_RE = re.compile(r'cite\.[a-z0-9][a-z0-9-]*')
SRC_RE = re.compile(r'^([^:]+):(\d+)(?:-(\d+))?$')


def check_citations(ledger=None, project=None):
    fails, warns = [], []
    ledger = ledger or load('extraction/measured-values.json')['citations']
    project = PROJECT if project is None else project
    referenced = set()
    for dp, _, fns in os.walk(ROOT):
        for fn in fns:
            if fn.endswith('.json') and fn != 'measured-values.json':
                referenced |= set(CITE_RE.findall(open(os.path.join(dp, fn), encoding='utf-8').read()))
    mv = open(os.path.join(ROOT, 'extraction', 'measured-values.json'), encoding='utf-8').read()
    referenced |= set(CITE_RE.findall(mv))
    for c in sorted(referenced - set(ledger)):
        fails.append(f'citation id referenced but not in ledger: {c}')
    sibling = os.path.isfile(os.path.join(project, 'src', 'App.jsx'))
    missing_files = 0
    for cid, ent in ledger.items():
        mt = SRC_RE.match(ent.get('source', ''))
        if not mt:
            fails.append(f'{cid}: malformed source {ent.get("source")!r}')
            continue
        path, a, b = mt.group(1), int(mt.group(2)), int(mt.group(3) or mt.group(2))
        if b < a or a < 1:
            fails.append(f'{cid}: bad range {a}-{b}')
            continue
        if path.startswith('/') or '..' in path.split('/'):
            fails.append(f'{cid}: path must be relative to the project root: {path}')
            continue
        full = os.path.join(project, path)
        if not sibling or not os.path.isfile(full):
            missing_files += 1
            continue
        lines = open(full, encoding='utf-8').read().split('\n')
        if b > len(lines):
            fails.append(f'{cid}: {path}:{a}-{b} exceeds file length {len(lines)}')
            continue
        if ent.get('quote') and ent['quote'] not in '\n'.join(lines[a - 1:b]):
            fails.append(f'{cid}: quote not found inside {path}:{a}-{b} (in-range but wrong content)')
    if missing_files:
        warns.append(f'{missing_files} citation(s) not re-checked: sibling source tree not present (expected when design-repo ships alone)')
    return fails, warns


def check_routes_templates():
    fails = []
    tpls = load('templates/templates.json')['templates']
    r = load('templates/routes.json')
    paths = [x['path'] for x in r['routes']]
    if len(paths) != len(set(paths)):
        fails.append('duplicate route paths')
    if r['totalRoutes'] != len(paths):
        fails.append('routes.json totalRoutes != routes listed')
    per = {}
    for x in r['routes']:
        if x['template'] not in tpls:
            fails.append(f"route {x['path']} -> unknown template {x['template']}")
        per[x['template']] = per.get(x['template'], 0) + 1
    secs = {load(f'sections/{f}')['id']: load(f'sections/{f}') for f in files('sections')}
    for tid, t in tpls.items():
        if per.get(tid, 0) != t['routeCount']:
            fails.append(f'{tid}: routeCount {t["routeCount"]} != routes bound {per.get(tid, 0)}')
        for n in t['nodes']:
            if n['section'] not in secs:
                fails.append(f'{tid}: node section {n["section"]} has no contract')
                continue
            for v in n['variants']:
                if v not in secs[n['section']]['variants']:
                    fails.append(f'{tid}: {n["section"]} variant {v} not defined in contract')
            if tid not in secs[n['section']]['usedBy']['templates']:
                fails.append(f'{n["section"]}: usedBy misses {tid}')
    excluded = [re.compile(e['pattern']) for e in r['excluded']]
    for p in paths:
        if any(e.search(p) for e in excluded):
            fails.append(f'routed path {p} matches a scope exclusion')
    return fails, []


def check_graph_validator():
    sys.path.insert(0, os.path.join(ROOT, 'schema'))
    import semantic_validate as sv
    g = {x['id'] for x in load('compatibility/graph.json')['rules']}
    fails = [f'graph rule without validator implementation: {x}' for x in sorted(g - sv.RULE_IDS)]
    fails += [f'validator rule missing from graph.json: {x}' for x in sorted(sv.RULE_IDS - g)]
    for x in load('compatibility/graph.json')['rules']:
        if x['severity'] not in ('error', 'warn'):
            fails.append(f'{x["id"]}: bad severity')
    return fails, []


def check_asset_roles(roles=None):
    fails, warns = [], []
    roles = roles or load('assets/asset-roles.json')
    pols = set(roles['generationPolicies'])
    if set(roles['roles']) != set(PINNED):
        fails.append(f"role set drift vs PINNED: {sorted(set(roles['roles']) ^ set(PINNED))}")
    for rid, r in roles['roles'].items():
        if r['generationPolicy'] not in pols:
            fails.append(f'{rid}: policy {r["generationPolicy"]!r} not in the closed policy enum')
        if rid in PINNED and r['generationPolicy'] != PINNED[rid]:
            fails.append(f'PINNED value drift: {rid} is {r["generationPolicy"]!r}, must be {PINNED[rid]!r}')
    schema = load('schema/pagespec.schema.json')
    for br in schema['definitions']['asset']['allOf']:
        rid = br['if']['properties']['assetRole']['const']
        if br['then']['properties']['generationPolicy']['const'] != PINNED.get(rid):
            fails.append(f'schema pin for {rid} != PINNED')
    txt = json.dumps(roles).lower()
    for must in ['relevance ai', 'logos', 'photos', 'licensed stock']:
        if must not in txt:
            fails.append(f'compliance statement lacks {must!r}')
    photos = os.path.join(PROJECT, 'public', 'assets', 'photos')
    if os.path.isdir(photos):
        pats = [re.compile(r['refRule']['refPattern']) for r in roles['roles'].values() if 'refPattern' in r['refRule']]
        for fn in sorted(os.listdir(photos)):
            if fn.startswith('.'):
                continue
            if not any(p.match('/assets/photos/' + fn) for p in pats):
                fails.append(f'shipped photo {fn} matches no assetRole refPattern')
    else:
        warns.append('public/assets/photos not present: photo-coverage check skipped')
    return fails, warns


def check_tokens():
    fails = []
    flat = {}

    def walk(prefix, d):
        for k, v in d.items():
            if isinstance(v, dict) and '$value' in v:
                flat[prefix + k] = v['$value']
            elif isinstance(v, dict):
                walk(prefix + k + '.', v)
    for fn in files('tokens/00-foundation'):
        walk('', load(f'tokens/00-foundation/{fn}'))
    found_cats = set()
    for fn in files('tokens/00-foundation'):
        found_cats |= set(load(f'tokens/00-foundation/{fn}'))
    sem = load('tokens/10-semantic/semantic.json')
    walk('', sem)
    ref = re.compile(r'\{([a-z0-9.\-]+)\}')
    for k, v in list(flat.items()):
        for r in ref.findall(json.dumps(v)):
            if r not in flat:
                fails.append(f'token {k} references unknown {{{r}}}')
    for fn in ['tokens/20-component/component.json', 'tokens/30-layout/layout.json']:
        for r in ref.findall(open(os.path.join(ROOT, fn)).read()):
            if r not in flat:
                fails.append(f'{fn} references unknown {{{r}}}')
    theme = load('tokens/themes/light.json')['values']
    for g, d in sem.items():
        for k, v in d.items():
            target = flat.get(v['$value'].strip('{}'))
            if theme.get(f'{g}.{k}') != target:
                fails.append(f'theme light {g}.{k} = {theme.get(g + "." + k)} != resolved {target}')
    cat = load('tokens/llm/token-catalog.json')
    pol = load('tokens/llm/token-policy.json')
    if set(pol['rawValueRestrictions']) != set(cat['categories']) or set(cat['categories']) != found_cats:
        fails.append(f"policy/catalog categories {sorted(pol['rawValueRestrictions'])} vs catalog {sorted(cat['categories'])} vs foundation {sorted(found_cats)}")
    for s in cat['referenceable']['semantic']:
        if s not in flat:
            fails.append(f'catalog semantic token {s} does not exist')
    return fails, []


def check_contracts():
    from jsonschema import Draft7Validator
    fails = []
    schema = load('schema/pagespec.schema.json')
    for fn in files('sections'):
        c = load(f'sections/{fn}')
        ref = c['contentRef'].split('/')[-1]
        if ref not in schema['definitions']:
            fails.append(f'{c["id"]}: contentRef {ref} missing')
            continue
        sub = dict(schema['definitions'][ref])
        props = sub['properties']
        for path in c['maxWords']:
            top = path.split('.')[0].replace('[]', '')
            if top not in props:
                fails.append(f'{c["id"]}: maxWords path {path} not in {ref}')
        v = Draft7Validator(dict(sub, definitions=schema['definitions']))
        for e in v.iter_errors(c['sampleContent']):
            fails.append(f'{c["id"]}: sampleContent invalid: {e.message[:120]}')
        for p in c['motion']['patterns']:
            if p not in c['motion']['reducedMotionFallback']:
                fails.append(f'{c["id"]}: pattern {p} lacks a reducedMotionFallback')
        if c['id'] + '.json' != fn:
            fails.append(f'{fn}: id/file mismatch')
    return fails, []


CHECKS = [('self-containment', check_self_containment), ('schema', check_schema), ('allowlist-parity', check_allowlist_parity),
          ('manifest-counts', check_manifest_counts), ('citations', check_citations), ('routes-templates', check_routes_templates),
          ('graph-validator', check_graph_validator), ('asset-roles', check_asset_roles), ('tokens', check_tokens), ('contracts', check_contracts)]


def main():
    bad = 0
    sibling = os.path.isfile(os.path.join(PROJECT, 'src', 'App.jsx'))
    print(f'design-repo: {os.path.basename(ROOT)}  sibling source tree: {"present" if sibling else "absent (citation re-checks degrade to warnings)"}')
    for name, fn in CHECKS:
        f, w = fn()
        print(f"{'PASS' if not f else 'FAIL'}  {name}" + (f'  ({len(f)} failure(s))' if f else ''))
        for x in f[:15]:
            print(f'      x {x}')
        for x in w:
            print(f'      ~ {x}')
        bad += bool(f)
    print('\nverify_all:', 'ALL CHECKS PASS' if not bad else f'{bad} CHECK(S) FAILED')
    return 1 if bad else 0


if __name__ == '__main__':
    sys.exit(main())
