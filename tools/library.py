"""Embed the Library (space-health conditions and medicines) into void-voyagers.html.

python tools/library.py conditions.json medicines.json

Checks every entry against Void Voyagers's body-system and check keys, links each medicine to
conditions that exist, checks each dose block (label text, numeric limits, vital-sign gates,
https sources), and writes the data between /*KB*/ and /*/KB*/ in void-voyagers.html.
Research and verification logs live in docs/evidence/library-*.md.
"""
import difflib
import json
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
SYS = {'msk', 'metab', 'resp', 'cardio', 'immune', 'mind', 'eyes', 'rad'}
CHECKS = {'hr', 'bp', 'spo2', 'co2', 'temp', 'sleep', 'mood', 'phq4', 'react', 'vision', 'water', 'exercise', 'mass', 'glucose', 'dose'}
EMOJI = re.compile('[\U0001F000-\U0001FAFF\u2600-\u27BF\uFE0F\u200D]')
C_KEYS = ['id', 'name', 'systems', 'summary', 'why', 'signs', 'selfcare', 'escalate', 'checks', 'sources']
M_KEYS = ['id', 'name', 'group', 'for', 'use', 'cautions', 'space', 'conditions', 'sources']
KEYLISTS = {'systems', 'checks', 'conditions'}
NUMS = ('single', 'mgPerKg', 'maxSingle', 'maxDay', 'everyH')


def typo(s):
    """Typographic apostrophes and quotes, as used everywhere else in the app."""
    s = re.sub(r"(\w)'", '\\1\u2019', s.strip())
    s = re.sub(r'\b(CO|SpO|O)2\b', '\\1\u2082', s)
    return re.sub(r'"([^"]*)"', '\u201c\\1\u201d', s)


def src(lst):
    return [{'t': typo(u['t']), 'u': re.sub(r'^http://', 'https://', u['u'].strip())} for u in lst or []]


def tidy(x, keys):
    missing = [k for k in keys if k not in x]
    assert not missing, f"{x.get('id')}: missing {missing}"
    out = {}
    for k in keys:
        v = x[k]
        if k == 'sources':
            v = src(v)
        elif k in KEYLISTS:
            v = [str(i).strip() for i in v]
        elif isinstance(v, list):
            v = [typo(i) for i in v if str(i).strip()]
        elif k != 'id':
            v = typo(str(v))
        out[k] = v
    if x.get('dose'):
        d = {k: v for k, v in x['dose'].items() if v is not None}
        for f in ('label', 'max', 'route', 'unit'):
            if d.get(f):
                d[f] = typo(str(d[f]))
        d['calc'] = bool(d.get('calc'))
        d['gates'] = [{**g, 'say': typo(g['say'])} for g in d.get('gates') or []]
        d['src'] = src(d.get('src'))
        out['dose'] = d
    return out


def texts(x):
    for k, v in x.items():
        if k in KEYLISTS or k == 'id':
            continue
        if k == 'sources':
            yield from (s['t'] for s in v)
        elif k == 'dose':
            yield from (str(v.get(f) or '') for f in ('label', 'max', 'route'))
            yield from (g['say'] for g in v['gates'])
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
        d = m.get('dose')
        if not d:
            continue
        if not d.get('label') or not d['src'] or any(not u['u'].startswith('https://') for u in d['src']):
            bad.append(f"{m['id']}: dose needs a label text and https sources")
        if any(g.get('k') not in CHECKS or g.get('op') not in ('>=', '<=', '>', '<') or not isinstance(g.get('v'), (int, float)) for g in d['gates']):
            bad.append(f"{m['id']}: a dose gate uses an unknown check, operator or value")
        if any(f in d and not isinstance(d[f], (int, float)) for f in NUMS):
            bad.append(f"{m['id']}: dose limits must be numbers")
        if d['calc'] and not (d.get('single') or d.get('mgPerKg')):
            bad.append(f"{m['id']}: a calculated dose needs single or mgPerKg")
    every = C + M
    if len({x['id'] for x in every}) != len(every):
        bad.append('duplicate ids')
    for x in every:
        if not x['sources'] or any(not s['u'].startswith('https://') for s in x['sources']):
            bad.append(f"{x['id']}: a source has no https link")
        for t in texts(x):
            if EMOJI.search(t):
                bad.append(f"{x['id']}: emoji in {t[:40]!r}")
    if bad:
        sys.exit('Not embedded:\n  ' + '\n  '.join(bad))
    data = json.dumps({'c': C, 'm': M}, ensure_ascii=False, separators=(',', ':'))
    data = data.replace('</', '<\\/').replace('<!--', '<\\!--')
    page = ROOT / 'void-voyagers.html'
    with open(page, encoding='utf-8', newline='') as f:
        html = f.read()
    html, n = re.subn(r'/\*KB\*/.*?/\*/KB\*/', lambda _: f'/*KB*/{data}/*/KB*/', html, flags=re.S)
    assert n == 1, 'KB marker not found in void-voyagers.html'
    with open(page, 'w', encoding='utf-8', newline='') as f:
        f.write(html)
    print(f'Embedded {len(C)} conditions and {len(M)} medicines ({len(data) // 1024} KB); {sum(1 for m in M if m.get("dose"))} with doses.')


if __name__ == '__main__':
    main(*sys.argv[1:3])
