"""Sort BodyParts3D IS-A element meshes into Void Voyagers layers. Writes layers.json {layer: [FJ ids]} and prints counts."""
import collections, json, re, sys
R = sys.argv[1]
rows = [l.rstrip('\n').split('\t') for l in open(f'{R}/isa_element_parts.txt', encoding='utf-8')][1:]
names = collections.defaultdict(set)
for c, n, f in rows:
    names[f].add(n)

RULES = [  # (layer, regex on any name); first match wins
    ('skin', r'^skin\b|integument'),
    ('vessels', r'\bartery\b|\bvein\b|arterial|venous|aorta|vena cava|capillar|sinus tree'),
    ('bones', r'^bone organ$|cartilage organ|^tooth$|costal cartilage'),
    ('muscles', r'^muscle organ$'),
    ('cardio', r'heart|cardiac|atrium|ventricle of heart|mitral|tricuspid|pericardi'),
    ('resp', r'lung|bronch|trachea|larynx|pleura|diaphragm'),
    ('mind', r'brain|cerebr|cerebell|pons|medulla oblongata|midbrain|thalam|spinal cord|hippocamp|corpus callosum'),
    ('eyes', r'eyeball|\beye\b|lens|cornea|retina|sclera'),
    ('immune', r'spleen|thymus|lymph node|tonsil'),
    ('metab', r'liver|stomach|intestin|colon|duoden|jejun|ile|caecum|cecum|rectum|esophag|oesophag|pancrea|gallbladder|kidney|ureter|urinary bladder|thyroid|adrenal|suprarenal|appendix|pharynx'),
]
lay = collections.defaultdict(list)
for f, ns in names.items():
    for L, rx in RULES:
        if any(re.search(rx, n) for n in ns):
            lay[L].append(f)
            break
    else:
        lay['other'].append(f)
for L in lay:
    print(L, len(lay[L]))
print('other sample:', [sorted(names[f], key=len)[-1] for f in lay['other'][:25]])
json.dump(lay, open(f'{R}/../layers.json', 'w'), indent=0)
json.dump({f: sorted(ns, key=len)[-1] for f, ns in names.items()}, open(f'{R}/../names.json', 'w'), indent=0)
