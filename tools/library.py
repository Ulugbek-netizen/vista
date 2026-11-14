"""Embed the Library (space-health conditions and medicines) into vista.html.

python tools/library.py kb_conditions.json kb_meds.json

Checks every entry against Vista's body-system and check keys, links each medicine to
conditions that exist, refuses anything that looks like a dose, and writes the data
between /*KB*/ and /*/KB*/ in vista.html. Research logs live in docs/evidence/library-*.md.
"""
import difflib
import json
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
SYS = {'msk', 'metab', 'resp', 'cardio', 'immune', 'mind', 'eyes', 'rad'}
CHECKS = {'hr', 'bp', 'spo2', 'co2', 'temp', 'sleep', 'mood', 'phq4', 'react', 'vision', 'water', 'exercise', 'mass', 'glucose', 'dose'}
DOSE = re.compile(r'\d\s*(mg|mcg|µg|ml|iu|units?|tablets?|capsules?|puffs?|drops?|sprays?)\b'
                  r'|\b(once|twice|three times|every \d+ hours?) (a|per|daily)\b', re.I)  # same rule as the app's self-test
EMOJI = re.compile('[\U0001F000-\U0001FAFF\u2600-\u27BF\uFE0F\u200D]')
C_KEYS = ['id', 'name', 'systems', 'summary', 'why', 'signs', 'selfcare', 'escalate', 'checks', 'sources']
M_KEYS = ['id', 'name', 'group', 'for', 'use', 'cautions', 'space', 'conditions', 'sources']
KEYLISTS = {'systems', 'checks', 'conditions'}


def typo(s):
    """Typographic apostrophes and quotes, as used everywhere else in the app."""
    s = re.sub(r"(\w)'", '\\1\u2019', s.strip())
    s = re.sub(r'\b(CO|SpO|O)2\b', '\\1\u2082', s)
    return re.sub(r'"([^"]*)"', '\u201c\\1\u201d', s)


def tidy(x, keys):
    missing = [k for k in keys if k not in x]
    assert not missing, f"{x.get('id')}: missing {missing}"
    out = {}
    for k in keys:
        v = x[k]
        if k == 'sources':
            v = [{'t': typo(s['t']), 'u': re.sub(r'^http://', 'https://', s['u'].strip())} for s in v]
        elif k in KEYLISTS:
            v = [str(i).strip() for i in v]
        elif isinstance(v, list):
            v = [typo(i) for i in v if str(i).strip()]
        elif k != 'id':
            v = typo(str(v))
        out[k] = v
    return out


def texts(x):
    for k, v in x.items():
        if k in KEYLISTS or k == 'id':
            continue
        if k == 'sources':
            yield from (s['t'] for s in v)
        elif isinstance(v, list):
            yield from v
        else:
            yield v


def main(cfile, mfile):
    load = lambda f: json.loads(pathlib.Path(f).read_text(encoding='utf-8'))
    C = [tidy(x, C_KEYS) for x in load(cfile)]
    M = [tidy(x, M_KEYS) for x in load(mfile)]
    ids = [x['id'] for x in C]
    bad = []
    for x in C:
        unknown = (set(x['systems']) - SYS) | (set(x['checks']) - CHECKS)
        if unknown or not x['systems']:
            bad.append(f"{x['id']}: unknown or missing keys {unknown}")
    for m in M:
        linked = []
        for c in m['conditions']:
            hit = c if c in ids else next(iter(difflib.get_close_matches(c, ids, 1, 0.6)), None)
            if hit != c:
                print(f'  link {m["id"]}: {c} -> {hit}')
            if hit and hit not in linked:
                linked.append(hit)
        m['conditions'] = linked
        if any(DOSE.search(t) for t in texts(m) if t not in (s['t'] for s in m['sources'])):
            bad.append(f"{m['id']}: looks like a dose")
    every = C + M
    if len({x['id'] for x in every}) != len(every):
        bad.append('duplicate ids')
    for x in every:
        if not x['sources'] or any(not s['u'].startswith('https://') for s in x['sources']):
            bad.append(f"{x['id']}: a source has no https link")
        for t in texts(x):
            if EMOJI.search(t):
                bad.append(f"{x['id']}: emoji in {t[:40]!r}")
            if "'" in t or '"' in t:
                print(f'  check quotes in {x["id"]}: {t[:70]!r}')
    if bad:
        sys.exit('Not embedded:\n  ' + '\n  '.join(bad))
    data = json.dumps({'c': C, 'm': M}, ensure_ascii=False, separators=(',', ':'))
    data = data.replace('</', '<\\/').replace('<!--', '<\\!--')
    page = ROOT / 'vista.html'
    with open(page, encoding='utf-8', newline='') as f:
        html = f.read()
    html, n = re.subn(r'/\*KB\*/.*?/\*/KB\*/', lambda _: f'/*KB*/{data}/*/KB*/', html, flags=re.S)
    assert n == 1, 'KB marker not found in vista.html'
    with open(page, 'w', encoding='utf-8', newline='') as f:
        f.write(html)
    print(f'Embedded {len(C)} conditions and {len(M)} medicines ({len(data) // 1024} KB).')


if __name__ == '__main__':
    main(*sys.argv[1:3])
