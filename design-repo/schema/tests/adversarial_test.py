#!/usr/bin/env python3
"""Adversarial suite: proves every rule rejects a bad instance and every real shape passes.

Controls: the bundled example plus ONE synthesized PageSpec per template, built generically
from templates/templates.json + each section contract's sampleContent (a new template is
covered automatically). Every control must produce zero errors and zero warnings.

Mutations: each must be rejected AND rejected by the rule it targets (or by the schema
where the schema is the first line of defence).

Run from anywhere:  python3 schema/tests/adversarial_test.py     (requires jsonschema)
"""
import copy
import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(os.path.dirname(HERE))
sys.path.insert(0, os.path.join(REPO, 'schema'))
sys.path.insert(0, os.path.join(REPO, 'extraction'))

import semantic_validate as sv  # noqa: E402
import verify_all  # noqa: E402

R = sv.Repo(REPO)
EXAMPLE = json.load(open(os.path.join(REPO, 'schema', 'example.pagespec.json')))
ROUTES = json.load(open(os.path.join(REPO, 'templates', 'routes.json')))['routes']


def motion_for(sec, pattern=None):
    m = R.sections[sec]['motion']
    p = pattern or m['patterns'][0]
    return {'pattern': p, 'trigger': m['trigger'][p], 'reducedMotionFallback': m['reducedMotionFallback'][p]}


def synth(tid):
    tpl = R.templates[tid]
    route = next(r['path'] for r in ROUTES if r['template'] == tid)
    nodes = []
    for tn in tpl['nodes']:
        sec = tn['section']
        nodes.append({'section': sec, 'variant': tn['variants'][0], 'content': copy.deepcopy(R.sections[sec]['sampleContent']), 'motion': motion_for(sec), 'assets': []})
    return {'pageSpecVersion': R.schema['properties']['pageSpecVersion']['const'], 'template': tid, 'route': route, 'theme': 'light',
            'meta': {'title': f"{tpl['name']} | Lumenfold", 'description': 'Synthesized control instance.'}, 'nodes': nodes}


def idx(spec, sec):
    return next(i for i, n in enumerate(spec['nodes']) if n['section'] == sec)


def m(base, fn):
    s = copy.deepcopy(base)
    fn(s)
    return s


EX = EXAMPLE
HOME = synth('template.home')
SPEC = synth('template.specialist-agents')
FEAT = synth('template.feature-detail')
COMP = synth('template.comparison-page')
SUPP = synth('template.contact-support')


def set_(path, value):
    def f(s):
        o = s
        for k in path[:-1]:
            o = o[k]
        o[path[-1]] = value
    return f


i_hero, i_act, i_setup, i_cta, i_foot = (idx(EX, x) for x in ['hero.integration-detail', 'catalog.integration-actions', 'content.integration-setup', 'conversion.grain-cta', 'shell.footer'])

MUTATIONS = [
    # ---- schema layer ---------------------------------------------------------------
    ('unknown template enum', m(EX, set_(['template'], 'template.landing')), {'SCHEMA'}),
    ('wrong pageSpecVersion', m(EX, set_(['pageSpecVersion'], '0.9.0')), {'SCHEMA'}),
    ('missing reducedMotionFallback', m(EX, lambda s: s['nodes'][i_setup]['motion'].pop('reducedMotionFallback')), {'SCHEMA', 'REDUCED_MOTION_FALLBACK_REQUIRED'}),
    ('invented motion field', m(EX, set_(['nodes', i_setup, 'motion', 'inventedAnimation'], 'spin')), {'SCHEMA'}),
    ('fallback not pinned for pattern', m(EX, set_(['nodes', i_setup, 'motion', 'reducedMotionFallback'], 'static-first-frame')), {'SCHEMA', 'REDUCED_MOTION_FALLBACK_REQUIRED'}),
    ('motion pattern not allowed for section', m(EX, set_(['nodes', i_setup, 'motion'], {'pattern': 'marquee', 'trigger': 'continuous', 'reducedMotionFallback': 'static-first-frame'})), {'SCHEMA', 'MOTION_PATTERN_ALLOWED'}),
    ('invented section type', m(EX, set_(['nodes', i_hero, 'section'], 'hero.marketing')), {'SCHEMA'}),
    ('invented content field', m(EX, set_(['nodes', i_hero, 'content', 'subheadline'], 'Extra')), {'SCHEMA'}),
    ('missing required content field', m(EX, lambda s: s['nodes'][i_hero]['content'].pop('title')), {'SCHEMA'}),
    ('invented assetRole', m(EX, set_(['nodes', i_hero, 'assets', 0, 'assetRole'], 'photo.team-headshot')), {'SCHEMA'}),
    ('pinned policy -> different VALID policy (app-icon)', m(EX, set_(['nodes', i_hero, 'assets', 0, 'generationPolicy'], 'generate-original-illustration')), {'SCHEMA', 'ASSET_POLICY_PINNED'}),
    ('pinned policy -> different VALID policy (avatar -> licensed stock)', m(EX, set_(['nodes', i_cta, 'assets', 0, 'generationPolicy'], 'licensed-stock-no-marks')), {'SCHEMA', 'ASSET_POLICY_PINNED'}),
    ('brand.logo ref swapped for a file', m(EX, set_(['nodes', 0, 'assets', 0, 'ref'], '/assets/photos/logo.svg')), {'SCHEMA'}),
    ('asset role not allowed for section', m(EX, lambda s: s['nodes'][i_hero]['assets'].append({'assetRole': 'photo.customer-story', 'generationPolicy': 'licensed-stock-no-marks', 'ref': '/assets/photos/case-1.webp', 'alt': ''})), {'SCHEMA', 'ASSET_ROLE_ALLOWED_FOR_SECTION'}),
    ('assets on a section with no asset roles', m(EX, set_(['nodes', i_setup, 'assets'], [{'assetRole': 'illustration.diagram', 'generationPolicy': 'generate-original-illustration', 'alt': ''}])), {'SCHEMA', 'ASSET_ROLE_ALLOWED_FOR_SECTION'}),
    ('video poster ref outside licensed set', m(HOME, set_(['nodes', 1, 'assets'], [{'assetRole': 'video.poster', 'generationPolicy': 'poster-placeholder-only', 'ref': '/assets/original/relevance-tour.webp', 'alt': ''}])), {'SCHEMA'}),
    ('form gains an action endpoint field', m(SUPP, set_(['nodes', idx(SUPP, 'conversion.support-form'), 'content', 'action'], 'https://example.com/submit')), {'SCHEMA'}),
    ('form copy carries a URL', m(SUPP, set_(['nodes', idx(SUPP, 'conversion.support-form'), 'content', 'body'], 'Post to https://example.com/hook directly.')), {'FORMS_VISUAL_ONLY'}),
    # ---- structural / template cross-reference ------------------------------------
    ('duplicate navbar', m(EX, lambda s: s['nodes'].insert(1, copy.deepcopy(s['nodes'][0]))), {'NAV_FIRST', 'TEMPLATE_SEQUENCE_MATCH'}),
    ('navbar not first', m(EX, lambda s: s['nodes'].insert(0, s['nodes'].pop(i_hero))), {'NAV_FIRST', 'TEMPLATE_SEQUENCE_MATCH'}),
    ('removed required section', m(EX, lambda s: s['nodes'].pop(i_setup)), {'TEMPLATE_SEQUENCE_MATCH'}),
    ('reordered sections', m(EX, lambda s: s['nodes'].__setitem__(slice(i_act, i_setup + 1), [s['nodes'][i_setup], s['nodes'][i_act]])), {'TEMPLATE_SEQUENCE_MATCH'}),
    ('extra section from another template', m(EX, lambda s: s['nodes'].insert(i_hero + 1, {'section': 'proof.logo-wall', 'variant': 'standard', 'content': R.sections['proof.logo-wall']['sampleContent'], 'motion': motion_for('proof.logo-wall')})), {'TEMPLATE_SEQUENCE_MATCH'}),
    ('declared template contradicts node list', m(EX, lambda s: (s.__setitem__('template', 'template.pricing'), s.__setitem__('route', '/pricing'))), {'TEMPLATE_SEQUENCE_MATCH'}),
    ('two heroes', m(EX, lambda s: s['nodes'].insert(i_hero + 1, {'section': 'hero.guide', 'variant': 'default', 'content': {'title': 'Second hero'}, 'motion': motion_for('hero.guide')})), {'ONE_HERO'}),
    ('missing footer', m(EX, lambda s: s['nodes'].pop()), {'FOOTER_LAST', 'TEMPLATE_SEQUENCE_MATCH'}),
    ('footer added to /specialist-agents (NO_FOOTER)', m(SPEC, lambda s: s['nodes'].append({'section': 'shell.footer', 'variant': 'default', 'content': R.sections['shell.footer']['sampleContent'], 'motion': motion_for('shell.footer')})), {'FOOTER_ABSENT_NO_FOOTER_TEMPLATES'}),
    ('non-repeatable section repeated', m(EX, lambda s: s['nodes'].insert(i_setup + 1, copy.deepcopy(s['nodes'][i_setup]))), {'NO_ADJACENT_IDENTICAL_NODE'}),
    ('repeatable section over maxRepeat', m(FEAT, lambda s: [s['nodes'].insert(idx(s, 'features.showcase-row'), copy.deepcopy(s['nodes'][idx(s, 'features.showcase-row')])) for _ in range(2)]), {'TEMPLATE_SEQUENCE_MATCH'}),
    # ---- routes ------------------------------------------------------------------------
    ('route of another template', m(EX, set_(['route'], '/pricing')), {'ROUTE_BOUND_TO_TEMPLATE'}),
    ('unknown slug route', m(EX, set_(['route'], '/integrations/hubspot')), {'ROUTE_BOUND_TO_TEMPLATE'}),
    ('excluded route /academy', m(EX, set_(['route'], '/academy')), {'NO_EXCLUDED_ROUTES'}),
    ('excluded marketplace route', m(EX, set_(['route'], '/agent-templates-sales')), {'NO_EXCLUDED_ROUTES'}),
    ('excluded legacy -old page', m(EX, set_(['route'], '/pricing-old')), {'NO_EXCLUDED_ROUTES'}),
    ('redirect-only route', m(EX, set_(['route'], '/app-tools/pipewise')), {'NO_REDIRECT_ONLY_ROUTES'}),
    ('redirect-only academy index', m(EX, set_(['route'], '/relevance-academy')), {'NO_REDIRECT_ONLY_ROUTES'}),
    # ---- variants ------------------------------------------------------------------------
    ('grain-cta violet on a catalog template', m(EX, lambda s: (s['nodes'][i_cta].__setitem__('variant', 'violet'), s['nodes'][i_cta]['content'].pop('palette'))), {'VARIANT_ALLOWED_BY_TEMPLATE'}),
    ('faq multi-open on a comparison page', m(COMP, set_(['nodes', idx(COMP, 'content.faq-accordion'), 'variant'], 'multi-open')), {'VARIANT_ALLOWED_BY_TEMPLATE'}),
    ('invented variant', m(EX, set_(['nodes', i_cta, 'variant'], 'neon')), {'SCHEMA', 'VARIANT_ALLOWED_BY_TEMPLATE'}),
    ('titleAccent on function-palette grain CTA', m(EX, set_(['nodes', i_cta, 'content', 'titleAccent'], 'with an agent')), {'VARIANT_CONTENT_COHERENCE'}),
    # ---- runtime copy ------------------------------------------------------------------
    ('maxWords overflow: hero title', m(EX, set_(['nodes', i_hero, 'content', 'title'], ' '.join(['word'] * 20))), {'MAX_WORDS'}),
    ('maxWords overflow: nested footer link', m(EX, set_(['nodes', i_foot, 'content', 'groups', 0, 'links', 0], 'a much longer footer link label here')), {'MAX_WORDS'}),
    ('maxWords overflow: catalog item body', m(EX, set_(['nodes', i_act, 'content', 'items', 0, 'body'], ' '.join(['x'] * 59))), {'MAX_WORDS'}),
    ('real brand as generated mark name', m(EX, set_(['nodes', i_hero, 'assets', 0, 'name'], 'HubSpot')), {'NO_REAL_BRAND_REFERENCES'}),
    ('source company named in copy', m(EX, set_(['nodes', i_hero, 'content', 'body'], 'Built just like Relevance AI agents.')), {'NO_REAL_BRAND_REFERENCES'}),
    ('source company named in meta', m(EX, set_(['meta', 'title'], 'Pipewise | relevanceai')), {'NO_REAL_BRAND_REFERENCES'}),
]


def main():
    fails = 0
    print('CONTROLS (must be 0 errors, 0 warnings)')
    optional_skipped = m(EXAMPLE, lambda s: s['nodes'].pop(idx(s, 'catalog.integration-actions')))  # optional node omitted (app with no actions)
    controls = [('example.pagespec.json', EXAMPLE), ('example without optional catalog.integration-actions', optional_skipped)] + [(tid, synth(tid)) for tid in R.templates]
    for name, spec in controls:
        e, w = sv.validate(spec, R)
        ok = not e and not w
        fails += not ok
        if not ok:
            print(f'  FAIL  {name}: {e[:3]} {w[:3]}')
    print(f'  {len(controls) - (fails)}/{len(controls)} controls passed ({len(R.templates)} synthesized, one per template, + the example + its optional-node-skipped form)')

    print('\nMUTATIONS (must be rejected by the targeted rule)')
    rejected = 0
    for name, spec, expect in MUTATIONS:
        e, _ = sv.validate(spec, R)
        hit = {r for r, _ in e} & expect
        ok = bool(e) and bool(hit)
        rejected += ok
        fails += not ok
        print(f"  {'ok  ' if ok else 'FAIL'}  {name:58s} -> {sorted({r for r, _ in e}) if e else 'ACCEPTED'}")
    print(f'  {rejected}/{len(MUTATIONS)} mutations rejected')

    print('\nSEVERITY (warn rules must warn, not error)')
    r2 = sv.Repo(REPO)
    r2.graph['continuousMotionBudget'] = 0
    hc = synth('template.home')
    hc['nodes'][idx(hc, 'hero.home')]['motion'] = motion_for('hero.home', 'mascot-idle')
    e0, w0 = sv.validate(hc, R)
    assert not e0 and not w0, (e0, w0)  # same page is clean under the real budget
    e, w = sv.validate(hc, r2)
    sev_ok = not e and any(x[0] == 'CONTINUOUS_MOTION_BUDGET' for x in w)
    fails += not sev_ok
    print(f"  {'ok  ' if sev_ok else 'FAIL'}  CONTINUOUS_MOTION_BUDGET exceeded on home (budget forced to 0) -> errors={len(e)} warnings={[x[0] for x in w]}")

    print('\nASSET-ROLE REGISTRY PINNED VALUES (verify_all layer)')
    roles = json.load(open(os.path.join(REPO, 'assets', 'asset-roles.json')))
    base_f, _ = verify_all.check_asset_roles(roles)
    reg_ok = not base_f
    print(f"  {'ok  ' if reg_ok else 'FAIL'}  unmutated registry passes ({len(base_f)} failures)")
    fails += not reg_ok
    for role, newp in [('proof.customer-wordmark', 'generate-original-illustration'), ('people.illustrated-avatar', 'licensed-stock-no-marks'),
                       ('brand.mascot', 'generate-original-illustration'), ('video.poster', 'licensed-stock-no-marks')]:
        mut = copy.deepcopy(roles)
        mut['roles'][role]['generationPolicy'] = newp
        assert newp in mut['generationPolicies']  # still a VALID enum member
        f, _ = verify_all.check_asset_roles(mut)
        ok = any('PINNED' in x for x in f)
        fails += not ok
        print(f"  {'ok  ' if ok else 'FAIL'}  {role} -> {newp} (valid enum member) rejected: {f[:1]}")

    print('\nRESULT:', 'PASS' if not fails else f'FAIL ({fails})')
    return 1 if fails else 0


if __name__ == '__main__':
    sys.exit(main())
