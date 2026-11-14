"""Vivoya anatomical figure (generator for the body map and bone-panel skeleton in vivoya.html): realistic adult proportions, front view, anatomical position (palms forward).
Stature 175 cm = 439 units (vertex y=4, sole y=443), so 1 cm = 2.509 units. Landmark heights follow standard
anthropometry: chin 0.87 H, shoulder 0.82, elbow 0.63, iliac crest 0.60, hip joint 0.53, wrist 0.485,
crotch 0.47, fingertip 0.377, knee 0.27, lateral malleolus 0.04.
Bilateral parts are drawn on the viewer's left (the body's right) and mirrored around x=100.
Paint order (front view occlusion): msk < metab < resp < cardio < immune < mind < eyes < rib-cage overlay < rad.
Vessels are drawn only where they are visible from the front (occlusion by omission).
Writes figure.svg and skel.json (pasted into vivoya.html) and prints any point that comes within 0.9 units of the skin.
Run: python tools/anatomy.py <out-dir>"""
import json
import math
import re
import sys

OUT = sys.argv[1] if len(sys.argv) > 1 else '.'


def fmt(v):
    s = f'{v:.2f}'.rstrip('0').rstrip('.')
    return '0' if s in ('-0', '') else s


def mirror_d(d):
    toks = re.findall(r'[MLCQZHV]|-?\d+(?:\.\d+)?', d)
    out, cmd, idx = [], '', 0
    for t in toks:
        if t in 'MLCQZHV':
            cmd, idx = t, 0
            out.append(t)
            continue
        v = float(t)
        if cmd == 'H' or (cmd in 'MLCQ' and idx % 2 == 0):
            v = 200 - v
        idx += 1
        out.append(fmt(v))
    s = ''
    for t in out:
        s += t if t in 'MLCQZHV' else ((' ' if s and s[-1] not in 'MLCQZHV' else '') + t)
    return s


def shift_d(d, dx, dy):
    toks = re.findall(r'[MLCQZHV]|-?\d+(?:\.\d+)?', d)
    out, cmd, idx = [], '', 0
    for t in toks:
        if t in 'MLCQZHV':
            cmd, idx = t, 0
            out.append(t)
            continue
        v = float(t)
        if cmd == 'H' or (cmd in 'MLCQ' and idx % 2 == 0):
            v += dx
        elif cmd == 'V' or cmd in 'MLCQ':
            v += dy
        idx += 1
        out.append(fmt(v))
    s = ''
    for t in out:
        s += t if t in 'MLCQZHV' else ((' ' if s and s[-1] not in 'MLCQZHV' else '') + t)
    return s


def _seg(p0, p1, p2, p3):
    c1 = (p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6)
    c2 = (p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6)
    return f'C{fmt(c1[0])} {fmt(c1[1])} {fmt(c2[0])} {fmt(c2[1])} {fmt(p2[0])} {fmt(p2[1])}'


def cr(pts, closed=True):
    n = len(pts)
    g = (lambda k: pts[k % n]) if closed else (lambda k: pts[min(max(k, 0), n - 1)])
    d = f'M{fmt(pts[0][0])} {fmt(pts[0][1])}'
    for i in range(n if closed else n - 1):
        d += _seg(g(i - 1), g(i), g(i + 1), g(i + 2))
    return d + ('Z' if closed else '')


def sym(left):
    """left: points from the top centre down the viewer's-left side to the bottom centre."""
    return cr(left + [(200 - x, y) for (x, y) in reversed(left[1:-1])])


def sample(pts, k=8, closed=False):
    n = len(pts)
    g = (lambda i: pts[i % n]) if closed else (lambda i: pts[min(max(i, 0), n - 1)])
    out = []
    for i in range(n if closed else n - 1):
        p0, p1, p2, p3 = g(i - 1), g(i), g(i + 1), g(i + 2)
        for j in range(k):
            t = j / k
            t2, t3 = t * t, t * t * t
            out.append(tuple(0.5 * (2 * p1[a] + (p2[a] - p0[a]) * t + (2 * p0[a] - 5 * p1[a] + 4 * p2[a] - p3[a]) * t2
                                    + (3 * p1[a] - p0[a] - 3 * p2[a] + p3[a]) * t3) for a in (0, 1)))
    if not closed:
        out.append(pts[-1])
    return out


def tube(center, widths, k=3):
    """Closed outline of a tube along a Catmull-Rom centreline; widths are half-widths at each key point."""
    pts = sample(center, k)
    ws = []
    for i in range(len(pts)):
        s, t = divmod(i, k)
        s = min(s, len(widths) - 1)
        nxt = widths[min(s + 1, len(widths) - 1)]
        ws.append(widths[s] + (nxt - widths[s]) * t / k)
    L, R, N = [], [], []
    for i, (x, y) in enumerate(pts):
        a, b = pts[max(i - 1, 0)], pts[min(i + 1, len(pts) - 1)]
        dx, dy = b[0] - a[0], b[1] - a[1]
        ln = math.hypot(dx, dy) or 1
        nx, ny = -dy / ln, dx / ln
        L.append((x + nx * ws[i], y + ny * ws[i]))
        R.append((x - nx * ws[i], y - ny * ws[i]))
        N.append((x, y, nx, ny, ws[i], dx / ln, dy / ln))
    (x0, y0, *_, tx0, ty0), (x1, y1, *_, tx1, ty1) = N[0], N[-1]
    cap0 = (x0 - tx0 * ws[0] * 0.9, y0 - ty0 * ws[0] * 0.9)
    cap1 = (x1 + tx1 * ws[-1] * 0.9, y1 + ty1 * ws[-1] * 0.9)
    return cr(L + [cap1] + R[::-1] + [cap0]), N


class Fig:
    def __init__(self):
        self.parts = []

    def p(self, cls, d, both=False, title=None):
        t = f'<title>{title}</title>' if title else ''
        self.parts.append(f'<path class="{cls}" d="{d}">{t}</path>' if t else f'<path class="{cls}" d="{d}"/>')
        if both:
            m = mirror_d(d)
            self.parts.append(f'<path class="{cls}" d="{m}">{t}</path>' if t else f'<path class="{cls}" d="{m}"/>')
        return self

    def e(self, cls, cx, cy, rx, ry, rot=0, both=False):
        def one(x, r):
            tr = f' transform="rotate({fmt(r)} {fmt(x)} {fmt(cy)})"' if r else ''
            if rx == ry and not r:
                self.parts.append(f'<circle class="{cls}" cx="{fmt(x)}" cy="{fmt(cy)}" r="{fmt(rx)}"/>')
            else:
                self.parts.append(f'<ellipse class="{cls}" cx="{fmt(x)}" cy="{fmt(cy)}" rx="{fmt(rx)}" ry="{fmt(ry)}"{tr}/>')
        one(cx, rot)
        if both:
            one(200 - cx, -rot)
        return self

    def r(self, cls, x, y, w, h, rx=0, both=False):
        def one(xx):
            self.parts.append(f'<rect class="{cls}" x="{fmt(xx)}" y="{fmt(y)}" width="{fmt(w)}" height="{fmt(h)}" rx="{fmt(rx)}"/>')
        one(x)
        if both:
            one(200 - x - w)
        return self

    def out(self):
        s = ''.join(self.parts)
        self.parts = []
        return s


F = Fig()
CHECK = []  # (name, [(x, y), ...]) points that must stay inside the skin


def pts_of(d):
    nums = [float(v) for v in re.findall(r'-?\d+(?:\.\d+)?', re.sub(r'[HV]-?\d+(?:\.\d+)?', '', d))]
    return list(zip(nums[0::2], nums[1::2]))


# ---------------------------------------------------------------- skin
W = (32.4, 229.8)  # wrist centre (forearm axis 12 deg from vertical, carrying angle)


def H(lx, ly):  # hand-local -> global (hand axis tilted 3.7 deg)
    return (round(W[0] + lx - 0.065 * ly, 2), round(W[1] + ly, 2))


HAND = [(-8.6, 5.6), (-10.0, 11.0), (-11.8, 16.6), (-13.6, 22.0), (-14.6, 27.2), (-14.4, 30.6), (-13.2, 32.4),
        (-11.4, 32.0), (-10.4, 29.6), (-9.9, 26.4), (-9.4, 23.4), (-9.8, 26.8), (-9.9, 32.0), (-9.8, 37.8), (-9.4, 42.0),
        (-8.4, 44.2), (-6.6, 44.4), (-5.4, 42.4), (-4.8, 45.6), (-3.6, 47.4), (-1.6, 47.6), (-0.4, 45.6), (0.0, 43.4),
        (0.4, 44.6), (1.4, 46.2), (3.4, 46.2), (4.4, 44.0), (4.8, 40.4), (5.4, 41.0), (6.6, 41.8), (8.4, 41.0),
        (9.0, 38.4), (9.2, 33.6), (9.2, 27.0), (9.0, 20.0), (8.6, 12.6), (8.0, 5.6)]

SKIN = ([(100, 4), (91.6, 5.4), (85.4, 9.4), (81.8, 15.4), (80.4, 23.0),
         (80.4, 26.8), (78.2, 28.4), (77.0, 32.4), (77.2, 37.4), (78.6, 41.6), (81.2, 44.0),  # ear
         (83.8, 47.8), (85.6, 52.0), (87.0, 56.6),  # jaw
         (87.4, 61.6), (87.0, 67.0), (85.8, 71.4),  # neck
         (81.4, 74.4), (74.2, 77.2), (66.0, 79.4), (58.6, 81.4), (52.6, 83.8),  # trapezius
         (47.6, 87.4), (43.8, 92.2), (41.6, 98.0), (40.9, 104.0), (40.6, 111.0), (40.2, 119.0),  # deltoid
         (39.4, 130), (38.4, 140), (37.5, 150), (36.4, 160), (35.4, 166),  # arm, lateral
         (34.6, 172), (32.6, 180), (31.0, 190), (29.4, 200), (28.0, 210), (26.6, 220), (25.0, 229.4)]  # forearm
        + [H(*q) for q in HAND]
        + [(40.0, 230.2), (42.5, 220), (45.6, 210), (49.0, 200), (52.5, 190), (55.6, 180), (57.1, 172), (57.8, 166),
           (57.8, 160), (58.3, 150), (59.8, 140), (60.8, 130), (61.7, 120), (63.2, 116.2),  # arm, medial -> axilla
           (64.0, 124), (64.2, 132), (64.6, 142), (65.2, 152), (65.8, 162), (66.2, 171),  # chest, waist
           (64.8, 180), (63.0, 188), (61.0, 196), (59.6, 204), (58.8, 212), (58.6, 220),  # hip
           (59.2, 230), (60.2, 242), (61.4, 254), (62.8, 266), (64.3, 278), (65.8, 290), (67.2, 302), (68.4, 312),
           (69.0, 320), (69.2, 327), (68.8, 334),  # knee
           (68.2, 342), (67.8, 350), (68.0, 358), (68.9, 367), (70.2, 377), (71.6, 388), (72.8, 399), (73.4, 409),
           (73.2, 416), (72.4, 421.6), (72.2, 425.6),  # lateral malleolus
           (72.4, 430), (71.6, 434.6), (71.4, 438.8), (72.6, 441.8), (76.0, 443.4), (81.0, 443.9), (86.8, 443.9),
           (91.8, 443.3), (95.2, 441.8), (96.6, 439.0), (96.4, 435.0), (95.6, 430.6), (94.6, 426.6),  # foot
           (94.4, 422.0), (94.0, 416.6),  # medial malleolus
           (94.2, 407), (94.8, 395), (95.6, 382), (96.3, 369), (96.7, 357), (96.6, 346), (96.0, 337),
           (95.6, 330), (95.7, 322), (96.1, 314),
           (96.6, 304), (97.2, 292), (97.8, 280), (98.4, 268), (99.0, 256), (99.5, 247), (100, 241)])


def skin_path():
    return sym(SKIN)


# ---------------------------------------------------------------- skeleton (class map c decides the look)
def skull(c):
    F.p(c['bone'], sym([(100, 6.6), (91.8, 7.6), (86.2, 11.4), (83.0, 17.4), (82.0, 24.4), (82.4, 30.6), (83.6, 34.6),
                        (83.0, 38.6), (84.6, 42.6), (86.4, 46.6), (88.0, 50.0), (89.6, 54.0), (92.8, 57.6), (96.4, 59.4),
                        (100, 59.8)]))
    F.e(c['hole'], 92.0, 31.6, 4.9, 4.3, -6, both=True)  # orbits
    F.p(c['hole'], 'M100 38.4C98.8 40.6 97 43.4 97 45.6C97 47.4 98.4 48.6 100 48.2C101.6 48.6 103 47.4 103 45.6C103 43.4 101.2 40.6 100 38.4Z')
    F.p(c['line'], 'M100 40.2V47.6')  # septum
    x0 = 100.08
    for w, h in ((1.55, 2.5), (1.25, 2.2), (1.35, 2.6), (1.15, 2.0), (1.1, 1.9)):  # upper: incisors, canine, premolars
        F.r(c['teeth'], x0, 49.0, w, h, 0.45, both=True)
        x0 += w + 0.16
    x0 = 100.08
    for w, h in ((1.1, 1.9), (1.2, 2.0), (1.35, 2.2), (1.2, 1.8), (1.15, 1.7)):  # lower
        F.r(c['teeth'], x0, 51.7, w, h, 0.45, both=True)
        x0 += w + 0.16
    F.p(c['line'], 'M86.8 26.6Q92 24.8 97.2 26.4M86.6 36.4C86.2 39.4 87.8 41.8 90.6 42.6M86.6 43.2C87.6 46.8 89.4 49.6 92 51.2', both=True)
    F.p(c['line'], 'M96.6 57.4Q100 58.6 103.4 57.4')
    return F.out()


def cervical(c):
    for i in range(5):  # C3-C7 (C1-C2 sit behind the face)
        y, w = 53.4 + i * 4.9, 5.4 + i * 0.2
        F.r(c['bone'], 100 - w / 2, y, w, 3.8, 0.9)
    return F.out()


def thoracic(c):
    for i in range(12):
        y, w = 77.9 + i * 5.85, 6.4 + i * 0.15
        F.r(c['bone'], 100 - w / 2, y, w, 4.9, 1.0)
    return F.out()


def lumbar(c):
    for i in range(5):
        y, w = 148.2 + i * 9.2, 10.2 + i * 0.5
        F.r(c['disc'], 100 - (w - 0.8) / 2, y - 1.6, w - 0.8, 1.6, 0.6)
        F.r(c['bone'], 100 - (w + 9.2) / 2, y + 2.4, w + 9.2, 2.2, 1.0)  # transverse processes
        F.r(c['bone'], 100 - w / 2, y, w, 7.4, 1.8)
    return F.out()


def sacrum(c):
    F.p(c['bone'], 'M89.6 194.6C93.4 193 96.8 193.4 100 194C103.2 193.4 106.6 193 110.4 194.6C110 199.6 107.6 205.4 104.6 210.4C103.2 213.2 101.6 215.6 100 216.6C98.4 215.6 96.8 213.2 95.4 210.4C92.4 205.4 90 199.6 89.6 194.6Z')
    for y, d, r in ((199.0, 4.4, 1.05), (203.4, 4.0, 0.95), (207.6, 3.4, 0.85), (211.4, 2.6, 0.7)):
        F.e(c['hole'], 100 - d, y, r, r, both=True)
    F.p(c['line'], 'M96.6 201.2H103.4M97 205.5H103M97.6 209.6H102.4')
    for y, rx in ((218.0, 1.8), (220.4, 1.4), (222.4, 1.0)):
        F.e(c['bone'], 100, y, rx, rx * 0.66)
    return F.out()


HIP = [(91.4, 195.2), (88.6, 188.4), (84.2, 181.6), (78.4, 177.8), (72.6, 178.8), (68.8, 183.2), (67.6, 189.2), (68.6, 194.4),
       (70.6, 198.6), (72.0, 201.6), (73.4, 204.4), (73.0, 208.6), (72.4, 213.6), (73.8, 219.6), (76.8, 225.4), (79.0, 231.0),
       (81.6, 235.6), (85.4, 236.8), (89.6, 234.8), (94.0, 231.4), (97.4, 229.8), (99.0, 228.6), (99.0, 220.4), (96.4, 219.2),
       (93.2, 219.6), (89.4, 217.0), (86.0, 213.0), (84.6, 207.6), (85.8, 201.8), (88.6, 197.4)]


def pelvis(c):
    F.p(c['bone'], cr(HIP), both=True)
    F.e(c['hole'], 88.0, 225.4, 3.6, 4.8, -16, both=True)  # obturator foramen
    F.p(c['line'], 'M72.4 207.2C74.8 204.4 80.8 204 83.8 206.8M69.6 191.6C74 187 80.8 185.6 86.4 189', both=True)
    return F.out()


def femur_prox(c):
    F.p(c['bone'], 'M80.2 208.6C76.4 209.4 71.2 210 67.2 210.6C64.6 211.2 63.6 213.6 64 217C64.4 220.6 65.4 224.2 66.6 228L76 230.2C76.4 228.6 77.2 227.2 78.2 226.4C77.6 224.6 78 222.6 79.6 220.6C81.6 218 83.2 215.4 83.4 212.6Z', both=True)
    F.e(c['bone'], 77.8, 212.4, 5.6, 5.6, both=True)
    F.p(c['line'], 'M66 213.4C68.4 216.6 71.4 219 74.4 220.4', both=True)  # intertrochanteric line
    return F.out()


def femur_shaft(c):
    F.p(c['bone'], 'M66.6 228C69.6 250 73.6 276 76.6 298C74.4 302.4 72.8 308 72.8 313.6C72.8 319.4 74.8 323.6 78.6 323.8C80.8 323.8 82 322.4 82.6 320.8L83.6 320.8C84.4 323.4 86.4 325.4 89 325.2C92.4 325 93.6 321.6 93.2 317.6C92.8 312.8 90.2 306.4 85.2 300.6C82.6 280 79.2 254 76 230.2Z', both=True)
    return F.out()


def patella(c):
    F.p(c['bone'], 'M83 310.6C86.4 310.6 88.4 313 88.2 316C88 319.4 85.4 323 83 323.6C80.6 323 78 319.4 77.8 316C77.6 313 79.6 310.6 83 310.6Z', both=True)
    return F.out()


def tibia(c):
    F.p(c['bone'], 'M73.4 328.4C73.2 326.6 76.4 326 79.6 326.2L82.2 326.4L83 324.8L83.8 326L84.6 324.6L85.6 326.2L89 326.2C92.4 326.2 94 327.4 93.8 329.4C93.6 331.6 92 333.2 90.6 335C89.6 337.4 89 342 88.8 348C88.6 368 89 392 89.6 408C90.6 411.4 92.4 414.6 92.6 418.4C92.8 421.6 92 424.2 90.6 424.6C89.4 424.8 88.8 423 88.4 421L81.4 420.6C80.4 418.4 80.4 414 81.6 410C82 392 81.6 368 81 348C80.4 342 79 338 77.4 335.2C75.8 333.4 73.6 331 73.4 328.4Z', both=True)
    F.p(c['line'], 'M84.2 336.4C84.8 338.4 84.8 340.4 84.4 342', both=True)  # tibial tuberosity
    return F.out()


def fibula(c):
    F.p(c['bone'], 'M70.8 336.2C70.6 333 72.2 331.6 74.2 332C75.8 332.4 76 334.6 75 336.8C75.4 360 76.8 392 78.4 410C79.6 413.6 80 418.6 79.6 423C79.2 426 78 427.4 76.6 426.8C75 426 74.2 422.6 74.6 418.4C74.8 414.6 75 411.6 75 410C73.6 392 72.2 360 71.8 338.8C71.2 338 70.8 337.2 70.8 336.2Z', both=True)
    return F.out()


def foot(c):
    F.p(c['bone'], 'M78 423.4C80 421.6 89 421.6 90.8 423.4C91.4 425.6 91 427.6 89.8 428.4L79.2 428.4C77.8 427.4 77.4 425.4 78 423.4Z', both=True)
    F.p(c['bone'], 'M85.6 429C88 428.6 91 428.8 92.4 429.6C92.8 430.6 92.4 431.6 91.4 431.8L86 431.6C85.2 430.8 85 429.8 85.6 429Z', both=True)  # navicular
    F.p(c['bone'], 'M76.6 429.2C79 428.8 82.6 428.8 84.6 429.4L84.4 434L76.2 434C75.6 432.4 75.8 430.4 76.6 429.2Z', both=True)  # cuboid
    for x, w in ((85.2, 2.4), (87.8, 2.2), (90.2, 2.6)):  # cuneiforms
        F.r(c['bone'], x, 432.0, w, 2.2, 0.6, both=True)
    F.p(c['stroke'] + ' w32', 'M91.6 434.8L92.2 438M92.3 439.4L92.4 441', both=True)  # big toe ray
    F.p(c['stroke'] + ' w20', 'M88.8 434.8L88.4 438.2M86 434.8L84.8 438.2M82.6 434.9L81.2 438.2M79 434.9L77.4 437.8', both=True)
    F.p(c['stroke'] + ' w18', 'M88.4 439.6L88.3 441.4M84.7 439.6L84.5 441.2M81.1 439.5L80.9 441M77.4 439.1L77.2 440.6', both=True)
    return F.out()


def scapula(c):
    F.p(c['back'], 'M52.6 86.6C54 84.8 57 84.2 60 84.6C66.2 85.4 72.2 85 77.6 84.4C79.4 92.2 80.2 104 79 116C78.2 122.4 76 128 73.2 131C70.4 125 66.4 112 62.8 100.8C61.8 98 60.4 96 59.6 94.2C59.2 92 59.6 89.6 60.4 88C57.8 88 55.4 88.2 52.6 86.6Z', both=True)
    F.p(c['bone'], 'M62.6 88C64.6 87 67 87.6 67.8 89.6C66.6 90.8 64.2 90.6 62.6 89.8Z', both=True)  # coracoid
    return F.out()


def arm(c):
    F.e(c['bone'], 54.6, 92.0, 5.4, 5.4, both=True)  # humeral head
    F.e(c['bone'], 50.6, 94.4, 2.6, 3.6, both=True)  # greater tubercle
    F.p(c['bone'], 'M49.4 97.6C47.8 116 46.2 136 45.2 150C43.2 153.6 40.4 157.8 38.8 161.4C38 163.4 38.8 165.4 40.8 166C42.6 168.4 45.8 169.4 48.8 168.8C51.8 168.8 54.4 166.6 55.4 164C56.2 162 55.4 160.4 53.8 159.6C52 156.6 50.8 153 50.6 150.2C51.6 136 53.6 116 55.8 99Z', both=True)
    F.p(c['bone'], 'M39.2 169.8L44.6 169.8C45 171.2 44.6 172.6 43.4 173.4C43.6 175.2 44.4 176.8 44 178.4C41.4 192 37.6 208 35 219.6C35.4 222.6 35.4 226.4 34.8 229.6C33 230.8 30 231.8 27.8 231.6C26.8 230.4 26.8 228.6 27.4 226.4C28.8 216 33 196 37.4 176.4C38 174.4 38.8 173 39.6 172.4C39 171.6 38.8 170.6 39.2 169.8Z', both=True)  # radius
    F.p(c['bone'], 'M47.6 166.8C49.6 165 53.2 165.2 54.4 167C54.8 168.8 53.8 170.6 52.6 171.6C51.6 175 50.4 178.6 49.4 182C46 196 41.6 212 39.6 222.6C39.8 225.2 39.4 228 38.2 229.6C37 230.2 35.8 229.4 35.4 227.8C35 226 35.2 223.8 36 221.4C38.4 208 42.6 192 46 178C46.4 174 46.8 170 47.6 166.8Z', both=True)  # ulna
    # carpals: proximal row (scaphoid, lunate, triquetrum, pisiform), distal row (trapezium, trapezoid, capitate, hamate)
    for lx, ly, w, h in ((-5.4, 1.8, 3.4, 3.0), (-1.8, 1.6, 3.2, 3.2), (1.6, 1.8, 3.0, 3.0), (4.6, 2.6, 1.6, 1.8),
                         (-6.4, 5.4, 3.0, 3.6), (-3.2, 5.6, 2.6, 3.4), (-0.4, 5.0, 3.0, 4.2), (2.8, 5.2, 3.2, 3.8)):
        x, y = H(lx, ly)
        F.r(c['bone'], x, y, w, h, 0.9, both=True)
    seg = []
    for (a, b) in (((-5.0, 9.8), (-9.6, 19.0)), ((-9.9, 20.4), (-12.0, 26.0)), ((-12.2, 27.2), (-13.0, 30.6))):  # thumb
        seg.append((H(*a), H(*b)))
    for base, head, L in ((-4.0, -7.4, 18.8), (-1.4, -2.5, 21.8), (1.4, 2.4, 20.4), (4.2, 7.0, 16.0)):  # fingers 2-5
        seg.append((H(base, 9.6), H(head, 24.4)))
        y0 = 25.6
        for part in (0.44, 0.27, 0.22):
            y1 = y0 + L * part
            seg.append((H(head, y0), H(head, y1 - 0.6)))
            y0 = y1
    F.p(c['stroke'] + ' w20', ''.join(f'M{fmt(a[0])} {fmt(a[1])}L{fmt(b[0])} {fmt(b[1])}' for a, b in seg), both=True)
    return F.out()


# rib cage: (lateral-most d, y) and costochondral junction (d, y); d = distance from the midline
RIBS = [((22.6, 81.4), (11.0, 88.0)), ((27.4, 86.4), (13.8, 97.0)), ((30.4, 92.6), (15.6, 104.4)), ((32.2, 99.0), (16.8, 111.6)),
        ((33.2, 105.4), (17.6, 118.8)), ((33.8, 111.8), (18.2, 126.2)), ((34.0, 118.4), (18.4, 133.6)), ((33.8, 127.6), (21.4, 146.0)),
        ((33.2, 134.6), (25.0, 154.8)), ((32.4, 141.4), (29.0, 163.6))]
STERNAL = [(6.6, 87.4), (4.8, 96.8), (4.4, 102.8), (4.4, 108.6), (4.6, 114.4), (4.4, 119.8), (3.6, 123.0)]


def ribcage(c):
    d_bone, d_cart = '', ''
    ends = list(STERNAL)
    for i, ((dl, yl), (dc, yc)) in enumerate(RIBS):
        lx, cx = 100 - dl, 100 - dc
        ux, uy = lx + 1.2, yl - 4.2
        d_bone += (f'M{fmt(ux)} {fmt(uy)}C{fmt(lx + 0.2)} {fmt(uy + 1.4)} {fmt(lx)} {fmt(yl - 1.6)} {fmt(lx)} {fmt(yl)}'
                   f'C{fmt(lx + 0.2)} {fmt(yl + (yc - yl) * 0.5)} {fmt(cx - (cx - lx) * 0.45)} {fmt(yc - 0.4)} {fmt(cx)} {fmt(yc)}')
        if i < 7:
            sx, sy = 100 - ends[i][0], ends[i][1]
        else:  # false ribs 8-10 join the cartilage of the rib above
            (pdc, pyc), (pdd, pyy) = RIBS[i - 1][1], ends[i - 1]
            sd, sy = pdc + (pdd - pdc) * 0.62, pyc + (pyy - pyc) * 0.62
            ends.append((sd, sy))
            sx = 100 - sd
        qx, qy = cx + (sx - cx) * 0.55, yc - (yc - sy) * 0.15
        d_cart += f'M{fmt(cx)} {fmt(yc)}Q{fmt(qx)} {fmt(qy)} {fmt(sx)} {fmt(sy)}'
    # floating ribs 11-12
    for (dl, yl), (dt, yt) in (((31.2, 147.6), (30.6, 166.6)), ((28.6, 152.4), (26.6, 163.8))):
        lx, tx = 100 - dl, 100 - dt
        d_bone += f'M{fmt(lx + 1.2)} {fmt(yl - 4.2)}C{fmt(lx + 0.2)} {fmt(yl - 2.8)} {fmt(lx)} {fmt(yl - 1.6)} {fmt(lx)} {fmt(yl)}C{fmt(lx)} {fmt(yl + 6)} {fmt(tx - 0.6)} {fmt(yt - 4)} {fmt(tx)} {fmt(yt)}'
    F.p(c['cartline'] + ' w22', d_cart, both=True)
    F.p(c['stroke'] + ' w26', d_bone, both=True)
    # sternum: manubrium, body, xiphoid
    F.p(c['bone'], 'M93.6 84.6C96 85.6 98 86 100 86C102 86 104 85.6 106.4 84.6C106.8 86.4 106.2 88.4 105.2 89.6L104.4 96.2L95.6 96.2L94.8 89.6C93.8 88.4 93.2 86.4 93.6 84.6Z')
    F.p(c['bone'], 'M95.6 96.8L104.4 96.8L104.8 106L105 115L104.2 122.4L95.8 122.4L95 115L95.2 106Z')
    F.p(c['line'], 'M95.6 102.8H104.4M95.4 108.6H104.6M95.4 114.4H104.6')
    F.p(c['bone'], 'M97.6 123L102.4 123L101.4 129.2L100 131.4L98.6 129.2Z')
    # clavicles
    F.p(c['bone'], 'M95.6 85C89.6 86.4 83.2 86.8 77.2 85.8C70.4 84.8 63.2 83.6 56.6 84.2C55.2 84.4 54.6 85.4 55.2 86.6C62 86.6 68.8 87.6 75.6 88.8C82.2 89.8 89.2 89.8 95.2 88.4C96.2 87.4 96.2 86 95.6 85Z', both=True)
    return F.out()


BODY = {'bone': 'shp t-bone', 'hole': 'hole', 'line': 'dtl t-bone', 'back': 'shp t-bone back', 'stroke': 'bn t-bone',
        'cartline': 'bn t-cart', 'teeth': 'shp t-teeth', 'disc': 'shp t-disc'}
SKELC = {'bone': 'bone-c', 'hole': 'hole', 'line': 'ln', 'back': 'bone-c back', 'stroke': 'bn',
         'cartline': 'bn cart', 'teeth': 'bone-c', 'disc': 'cart-c'}
PLAIN = {'bone': 'b', 'hole': 'hole', 'line': 'ln', 'back': 'b back', 'stroke': 'bn', 'cartline': 'bn', 'teeth': 'b', 'disc': 'cart-c'}


# ---------------------------------------------------------------- organs
def metab():
    # kidneys (retroperitoneal, right lower), adrenals, ureters: drawn first so the gut covers them
    rk = 'M87 149C82.4 149.2 80.2 154.8 80.4 162.6C80.6 170.6 83.4 176 87.8 175.8C91.2 175.6 93.2 172.2 92.6 168.4C92.2 166 91.2 164.2 91.4 162.4C91.6 160.6 92.8 158.8 93.2 156.6C93.6 152.2 91.2 148.8 87 149Z'
    F.p('shp t-kidney', rk, title='Right kidney').p('shp t-kidney', shift_d(mirror_d(rk), 0, -4.4), title='Left kidney')
    pel = 'M92.8 159.8C90.2 159.6 88.8 161.4 89.2 163.6C89.6 165.4 91.6 166.2 93 165.4Z'
    F.p('shp t-ureter', pel).p('shp t-ureter', shift_d(mirror_d(pel), 0, -4.4))
    ad = 'M84.6 150.4C85.2 146.8 88 144.4 90.4 144.8C91.8 146.6 92 149.4 91.2 151.2C89.4 150.2 86.8 150 84.6 150.4Z'
    F.p('shp t-adrenal', ad, title='Adrenal gland').p('shp t-adrenal', shift_d(mirror_d(ad), 0, -4.4), title='Adrenal gland')
    F.p('tbl t-ureter w12', 'M92.2 164.6C93.4 172 93.8 182 93.2 192C92.8 198 92 204 91.8 209C92 212.6 93.6 215 95.6 216.2')
    F.p('tbl t-ureter w12', 'M107.8 160.2C106.6 168 106.2 180 106.8 192C107.2 198 108 204 108.2 209C108 212.6 106.4 215 104.4 216.2')
    # pancreas and duodenum
    F.p('shp t-pancreas', 'M90.2 160C92.4 156.8 96.4 156 100.4 156.2C106.4 154.4 112.4 151 118.4 149.2C121.4 148.2 124 148.8 123.8 150.8C123 153.2 118.8 155 114.2 156.8C109.6 158.6 104.8 160.2 101.2 161.4C99.6 164 98.2 167.2 95.8 168.6C93.2 170 90.4 168.2 90 165C89.8 163.2 89.6 161.4 90.2 160Z', title='Pancreas')
    duo, _ = tube([(96.4, 155.2), (92.0, 154.4), (88.4, 156.6), (86.6, 161.6), (86.6, 167.4), (88.6, 172.0), (93.4, 174.2),
                   (99.4, 174.0), (104.6, 171.6), (107.0, 167.6)], [2.6] * 10)
    F.p('shp t-small gi', duo, title='Duodenum')
    # small intestine: coiled mass framed by the colon
    F.p('shp t-mes gi', sym([(100, 165.0), (90.0, 166.0), (82.6, 170.6), (79.6, 178.6), (79.4, 188.6), (80.6, 198.4), (83.6, 206.0),
                             (89.0, 211.0), (95.4, 213.0), (100, 213.2)]), title='Small intestine')
    # coiled loops: each pass is a capsule; the bends between passes sit underneath
    rows = [(171.0, 88.0, 109.0), (178.6, 85.2, 115.6), (186.2, 84.4, 115.8), (193.8, 84.4, 115.8), (201.4, 87.0, 115.0)]
    bends = ''
    for r in range(len(rows) - 1):
        (y0, a0, b0), (y1, a1, b1) = rows[r], rows[r + 1]
        x = (min(a0, a1) - 0.6) if r % 2 == 0 else (max(b0, b1) + 0.6)
        bd, _ = tube([(x, y0), (x + (-1.6 if r % 2 == 0 else 1.6), (y0 + y1) / 2), (x, y1)], [2.9, 2.9, 2.9], k=3)
        bends += bd
    F.p('shp t-small gi', bends)
    for r, (y, xa, xb) in enumerate(rows):
        pts = [(xa + (xb - xa) * j / 8, y + 1.0 * math.sin(j * 1.3 + r * 1.7)) for j in range(9)]
        cap, _ = tube(pts, [3.0] * 9, k=2)
        F.p('shp t-small gi', cap, title='Small intestine')
    F.p('tbl t-large w20', 'M82.8 206.6C84 210.6 86.4 213.6 88.6 214.8', title='Appendix')  # appendix, from the caecum
    # colon (caecum -> ascending -> transverse -> descending -> sigmoid) with haustra
    colon_c = [(78.0, 207.6), (76.4, 200), (75.4, 190), (75.2, 180), (75.6, 170), (77.6, 162.6), (84.4, 162.0), (92.0, 170.0),
               (100.0, 175.6), (108.0, 173.4), (115.6, 164.0), (121.6, 153.0), (124.6, 157.6), (125.0, 168), (124.6, 178),
               (124.0, 188), (122.6, 197.0), (118.6, 203.2), (112.6, 206.4), (106.6, 206.0), (102.6, 207.6), (100.6, 211.0)]
    colon_w = [6.2, 5.8, 5.4, 5.2, 5.0, 5.0, 4.8, 4.8, 4.8, 4.8, 4.6, 4.4, 4.4, 4.2, 4.2, 4.2, 4.0, 3.6, 3.4, 3.2, 3.0, 2.8]
    cd, N = tube(colon_c, colon_w, k=3)
    F.p('shp t-large gi', cd, title='Large intestine (colon)')
    hd = ''
    for i in range(2, len(N) - 8, 2):
        x, y, nx, ny, w, tx, ty = N[i]
        a = (x + nx * w * 0.86, y + ny * w * 0.86)
        b = (x - nx * w * 0.86, y - ny * w * 0.86)
        q = (x + tx * 1.4, y + ty * 1.4)
        hd += f'M{fmt(a[0])} {fmt(a[1])}Q{fmt(q[0])} {fmt(q[1])} {fmt(b[0])} {fmt(b[1])}'
    F.p('dtl t-large', hd)
    F.p('shp t-bladder', 'M100 203.6C106.4 203.6 109.8 207.6 109.6 212C109.4 216.2 106 219.4 100 219.4C94 219.4 90.6 216.2 90.4 212C90.2 207.6 93.6 203.6 100 203.6Z', title='Bladder')
    # oesophagus: left of the trachea, behind the heart, through the diaphragm to the stomach
    F.p('tbl t-esoph w40', 'M101.6 70.4C102 90 103 115 105 137.4', title='Oesophagus')
    F.p('shp t-stomach gi', 'M103.6 137.6L106.2 136.8C107.6 132.8 112.4 130.4 117 131C122.6 131.8 126 137.4 126 144.4C126 153.4 123.4 162.6 118.4 168.6C114.6 173 108.2 174.6 102.6 172.4C98.2 170.6 95.2 166.4 93.6 161.6C93 159.6 93.2 157.8 94.2 156.6L97 155.4C99 160 102 164.4 105.2 164.4C108 164.4 108.6 158 108 151.4C107.6 146.4 105.8 141.6 103.6 137.6Z', title='Stomach')
    F.p('dtl t-stomach', 'M110.6 138.6C113.6 148 114.4 158 111.4 166.6M115.6 136.2C119.2 146 120 156 116.8 165.6M120.6 136.8C123 145 122.8 154 120.4 161.6')
    F.p('shp t-gall', 'M84.8 151.4C87.6 151.8 89.2 155.6 88.6 160.4C88 164.6 85.8 167.4 83.4 166.8C81 166.2 80.8 162 81.8 158C82.6 154.6 83.2 151.4 84.8 151.4Z', title='Gallbladder')
    F.p('shp t-liver', 'M68 146.4C68 136.4 72.4 128.4 80.6 125.6C87.2 123.6 93.6 126 98 129C102.4 131.2 108.6 131 113.6 130.4C117.6 130 121 131 121.6 133.2C121 136.6 116 140.4 110 144C103 148.6 96.6 152 90.4 156.4C85.6 159.8 80.6 163.2 75.4 165C71.2 166.2 68.4 163 67.8 158C67.4 154 67.8 150 68 146.4Z', title='Liver')
    F.p('dtl t-liver', 'M99.6 130.4C98.6 138 97.4 145 96 152.6')
    F.p('ghost t-kidney', rk).p('ghost t-kidney', shift_d(mirror_d(rk), 0, -4.4))
    F.p('shp t-thyroid', 'M97.6 72.4C96.8 68.4 95.4 66.4 94.2 67C92.8 67.8 92.6 72.6 93.2 75.6C93.8 77.8 95.6 78.4 97.2 77.2C97.8 76.4 98.4 75.6 99 75.2L101 75.2C101.6 75.6 102.2 76.4 102.8 77.2C104.4 78.4 106.2 77.8 106.8 75.6C107.4 72.6 107.2 67.8 105.8 67C104.6 66.4 103.2 68.4 102.4 72.4Z', title='Thyroid')
    return F.out()


def resp():
    F.p('shp t-cart', 'M96 60.6L99.2 61.6L100 60.4L100.8 61.6L104 60.6C104.4 63.6 103.6 66.6 101.6 68.4L98.4 68.4C96.4 66.6 95.6 63.6 96 60.6Z', title='Larynx')
    F.r('shp t-cart', 97.6, 68.8, 4.8, 2.0, 0.8)  # cricoid
    F.r('shp t-cart', 97.6, 70.8, 4.8, 1.6, 0.4)  # trachea above the thyroid isthmus
    F.p('shp t-cart', 'M97.6 75.6H102.4V102.6L111.2 108.8L110 111.2L100.8 105.2H99.2L93.6 113.4L91.4 112L97.6 102.6Z', title='Trachea and bronchi')
    F.p('dtl t-cart', ''.join(f'M97.8 {fmt(77.6 + k * 2.6)}H102.2' for k in range(10)))
    F.p('shp t-lung', cr([(86.6, 77.4), (82.0, 80.2), (76.8, 86.0), (72.4, 94.6), (69.6, 104.6), (68.2, 116.0), (67.8, 127.6), (68.2, 136.6),
                          (68.8, 142.8), (72.6, 134.0), (77.4, 127.6), (83.2, 124.4), (88.6, 124.4), (92.2, 126.0), (94.4, 127.6),
                          (93.6, 121.0), (93.0, 114.0), (93.6, 107.6), (95.4, 100.0), (95.8, 90.0), (94.0, 82.0), (90.6, 78.0)]), title='Right lung')
    F.p('dtl t-lung', 'M68.4 111.8C76 110.6 85 111.4 93.2 112.6M69 113.4C75.6 116.4 82.4 120.6 87 124.6')
    F.p('shp t-lung', cr([(113.4, 77.4), (118.0, 80.2), (123.2, 86.0), (127.6, 94.6), (130.4, 104.6), (131.8, 116.0), (132.2, 127.6),
                          (131.8, 136.6), (131.2, 144.6), (127.4, 136.4), (122.8, 129.6), (118.0, 127.0), (113.6, 128.2), (110.2, 130.0),
                          (108.4, 128.2), (110.4, 125.4), (114.6, 121.6), (115.0, 115.0), (112.4, 108.0), (108.0, 103.6), (105.0, 98.4),
                          (104.4, 90.0), (106.0, 82.0), (109.4, 78.0)]), title='Left lung')
    F.p('dtl t-lung', 'M131.2 104.8C125 112 118.6 119.6 115.6 127.6')
    F.p('tbl t-dia w16', 'M68.8 142.8C71.6 131.6 77.2 124 84 123.6C89.6 123.2 94 126.6 97.4 129C100 130.6 103.4 130.6 106.8 129.6C110.8 127.6 115.2 126.4 119.4 126.8C124.6 127.6 129 135.6 131.2 144.6', title='Diaphragm')
    return F.out()


def cardio():
    # neck: carotids (stop where they pass behind the jaw), internal jugular veins
    F.p('tbl t-vein w22', 'M90 57.4C89.8 64 90 72 90.6 79.6', both=True)
    F.p('tbl t-art w20', 'M96 85.4C95.4 78 94 68 92.8 57.6')
    F.p('tbl t-art w20', 'M104 87.6C105 80 106.2 68 107.2 57.6')
    # subclavian -> axillary -> brachial -> radial/ulnar -> palmar arch
    arm_a = ('M61.6 91.8C59.8 95 58.6 99.6 58.4 104.6C57.4 120 55.6 140 52.8 158C51.8 162 50.4 165.2 48.6 168.4'
             'C46 172.6 42 184 39 196C36.8 205 34 215 31.2 222.4C30 225.6 29 228 28.4 230.4'
             'M48.6 168.4C49.4 176 48.4 186 46.4 196C44.8 205 42 214 39.6 222C38.8 225 38 228 37.6 230.6'
             'M37.6 230.8C38.4 237.6 37.4 242.2 33.6 243.8C31 244.8 28.8 243.6 28.2 240.6')
    F.p('tbl t-art w14', arm_a, both=True)
    F.p('tbl t-art w20', 'M96 85.4C91 82.4 84 81.4 77 82.2C70 83.2 64.8 86.8 61.6 91.8')
    F.p('tbl t-art w20', 'M105.6 88.8C107.2 85.2 110.4 82.4 114.4 81.8C121.6 81.2 129.6 82.6 135.2 86.2C136.6 87.6 137.6 89.6 138.4 91.8')
    # cephalic vein (superficial, lateral arm)
    F.p('tbl t-vein w08', 'M27.6 228.4C29.2 216 32 202 35.8 186C38.2 176 40.6 166 41.8 156C43 140 43.6 124 45.8 110C47.4 100 51 94 56.4 90.6', both=True)
    # legs: femoral -> (behind the knee) -> anterior tibial -> dorsalis pedis; great saphenous vein (medial)
    F.p('tbl t-art w16', 'M82.6 211.6C83.4 230 85 260 86.2 290C86.4 296 86.2 300 85.6 304', both=True)
    F.p('tbl t-vein w16', 'M86.4 212.2C87.6 230 89 260 89.8 290C90 296 89.8 300 89.2 304', both=True)
    F.p('tbl t-art w12', 'M79.4 340C80.4 365 82 395 84.6 418C85.6 424 87.4 430 89.4 436', both=True)
    F.p('tbl t-vein w08', 'M92.4 419C93 402 93.6 384 93.6 368C93.4 352 93 338 92.8 326C92.6 310 93.4 294 93.4 278C93.4 258 92 238 89.8 219.4', both=True)
    # great vessels
    F.p('tbl t-art w54', 'M101.6 101.6C101 96.6 101.2 92 102.6 89.2C104 86.6 107.4 86.4 108.8 89C109.6 91 109.4 94.4 108.6 98.6', title='Aorta')
    F.p('tbl t-art w26', 'M101.2 90.4C99.4 88.6 97.6 87 96 85.4')
    F.p('shp t-vein', 'M95 87.2L98.4 87.2L98.4 100.6L95 100.6Z', title='Superior vena cava')
    F.p('tbl t-vein w26', 'M90.6 79.6C92.6 82.4 94.6 85 96.2 87.4M109.4 79.6C106.6 82.6 101.6 85.4 96.6 87.6')
    F.p('shp t-vein', 'M102.4 103.4C102.4 99 104.2 95.8 107.6 94.6L109.8 97.4C107.4 98.4 106.4 100.8 106.6 104Z', title='Pulmonary trunk')
    F.p('shp t-heart', 'M96.6 99.6C94.2 102.4 93 108 93.2 114C93.4 119.2 94 122.4 95.2 124.6C100 127 108 128.6 115.6 128.4C118 128.2 119.6 127.4 119.8 126C120.2 120.4 118.4 112.6 114.6 106.6C112.6 103.6 110.6 101.4 108.4 100.6C105 99.4 100.6 98.8 96.6 99.6Z', title='Heart')
    F.p('dtl t-heart', 'M99.8 101.4C96.8 108 95.8 116 96.8 123.4')
    F.p('tbl t-art w08', 'M106.8 102.6C108.8 110 111.8 118 115.4 126M100.6 101.8C97.8 107 96 114 96.4 122.6')  # coronary arteries
    return F.out()


def immune():
    F.p('shp t-thymus', 'M99.6 86.4C95.6 86 93.6 90.4 93.8 95.2C94 100 95.8 104.4 98.8 106L101.2 106C104.2 104.4 106 100 106.2 95.4C106.4 90.6 104.4 86.8 100.8 86.6C100.4 88 100.2 89.6 100.2 91.2L99.8 91.2C99.8 89.6 99.8 88 99.6 86.4Z', title='Thymus')
    F.p('shp t-spleen', 'M128.6 142C132.2 144.6 132.8 152.4 130 158.6C128 162.8 124.2 164.6 121.8 162.6C123.6 159.4 123.8 155.8 122.4 152.6C121.6 150.2 122.6 146.6 124.6 143.8C125.8 142.2 127.2 141.4 128.6 142Z', title='Spleen')
    for x, y, r in ((90.0, 62.4, 1.3), (90.2, 68.8, 1.3), (90.6, 75.0, 1.2), (83.4, 79.8, 1.3), (65.8, 108.6, 1.8), (67.4, 114.0, 1.5),
                    (54.6, 158.0, 1.2), (84.0, 214.4, 1.8), (88.6, 217.4, 1.5)):
        F.e('shp t-lymph', x, y, r, r, both=True)
    return F.out()


def mind():
    F.p('shp t-brain', sym([(100, 9.0), (92.2, 9.8), (86.8, 13.4), (84.2, 19.2), (83.8, 25.2), (84.2, 30.4), (85.2, 34.2), (86.6, 34.6),
                            (87.6, 31.6), (88.0, 27.8), (91.0, 26.0), (95.4, 26.4), (98.6, 27.4), (100, 27.8)]), title='Brain')
    F.p('dtl t-brain', 'M100 9.6V27.2')
    F.p('dtl t-brain', 'M88.6 14.8C91.4 15.8 91.6 18.6 89.4 20.2M86.4 22.2C89.6 21.6 92.2 23.4 91.8 25.4M94.2 11.6C96.2 13.8 95.6 17 93 18'
                       'M93.6 21C96.4 20.6 98.4 22.4 98 24.8M85.8 27.4C87 29 86.8 31.4 85.6 32.6M96.8 16.4C98.6 17.6 98.8 19.6 97.6 20.6', both=True)
    return F.out()


def eyes():
    F.e('hit', 92.0, 31.6, 6.4, 5.6, both=True)
    F.e('shp t-eye', 92.0, 31.6, 3.4, 3.4, both=True)
    F.e('iris', 92.0, 31.6, 1.6, 1.6, both=True)
    F.e('pupil', 92.0, 31.6, 0.75, 0.75, both=True)
    F.e('glint', 92.7, 30.9, 0.35, 0.35, both=True)
    return F.out()


def rad():
    F.r('shp t-device', 117.2, 95.0, 10.0, 12.8, 1.8)
    F.p('dtl t-device', 'M119.6 95V92.6H124.8V95')
    F.r('win', 119.0, 98.0, 6.4, 3.0, 0.8)
    return F.out()


def figure():
    grp = lambda k, inner: f'<g class="rg" data-sys="{k}" tabindex="0" role="button" aria-pressed="false">{inner}</g>'
    c = BODY
    msk = (scapula(c) + cervical(c) + thoracic(c) + lumbar(c) + sacrum(c) + arm(c) + pelvis(c) + femur_prox(c) + femur_shaft(c)
           + patella(c) + tibia(c) + fibula(c) + foot(c) + skull(c))
    ov = ribcage(c)
    return ('<svg class="figure" viewBox="0 0 200 460" role="group" aria-label="Anatomical body map, front view. Each body system is a button.">'
            f'<path class="body" d="{skin_path()}"/>'
            + grp('msk', msk) + grp('metab', metab()) + grp('resp', resp()) + grp('cardio', cardio()) + grp('immune', immune())
            + grp('mind', mind()) + grp('eyes', eyes())
            + f'<g class="ov" aria-hidden="true">{ov}</g>' + grp('rad', rad()) + '</svg>')


def skel_parts():
    c = SKELC
    strip = lambda s: s.replace(' class=""', '')
    deco = scapula(c) + cervical(c) + thoracic(c) + ribcage(c) + arm(c) + fibula(c) + foot(c) + skull(c)
    return {'outline': skin_path(), 'deco': deco, 'deco2': patella(c),
            'spine': strip(lumbar(PLAIN)), 'pelvis': strip(sacrum(PLAIN) + pelvis(PLAIN)),
            'hip': strip(femur_prox(PLAIN)), 'thigh': strip(femur_shaft(PLAIN)), 'tibia': strip(tibia(PLAIN))}


# ---------------------------------------------------------------- margin check: bones must sit inside the skin
def inside(poly, x, y):
    n, c = len(poly), False
    for i in range(n):
        x1, y1 = poly[i]
        x2, y2 = poly[(i + 1) % n]
        if (y1 > y) != (y2 > y) and x < (x2 - x1) * (y - y1) / (y2 - y1) + x1:
            c = not c
    return c


def dist(poly, x, y):
    best = 1e9
    for i in range(len(poly)):
        x1, y1 = poly[i]
        x2, y2 = poly[(i + 1) % len(poly)]
        dx, dy = x2 - x1, y2 - y1
        t = max(0, min(1, ((x - x1) * dx + (y - y1) * dy) / ((dx * dx + dy * dy) or 1)))
        best = min(best, math.hypot(x - (x1 + t * dx), y - (y1 + t * dy)))
    return best


if __name__ == '__main__':
    fig = figure()
    open(f'{OUT}/figure.svg', 'w', encoding='utf-8').write(fig)
    json.dump(skel_parts(), open(f'{OUT}/skel.json', 'w', encoding='utf-8'), ensure_ascii=False)
    full = SKIN + [(200 - x, y) for (x, y) in reversed(SKIN[1:-1])]
    poly = sample(full, 6, closed=True)
    bad = 0
    body_inner = fig.split('<g class="rg" data-sys="msk"', 1)[1]
    for d in re.findall(r' d="([^"]+)"', body_inner):
        for (x, y) in pts_of(d):
            if not inside(poly, x, y) or dist(poly, x, y) < 0.9:
                bad += 1
                if bad <= 25:
                    print(f'  near/outside skin: ({fmt(x)}, {fmt(y)}) dist {dist(poly, x, y):.2f} in {d[:60]}')
    for m in re.finditer(r'<(ellipse|circle|rect)[^>]*>', body_inner):
        a = dict(re.findall(r'(\w+)="([^"]+)"', m.group(0)))
        if m.group(1) == 'rect':
            pts = [(float(a['x']), float(a['y'])), (float(a['x']) + float(a['width']), float(a['y']) + float(a['height']))]
        else:
            rx = float(a.get('rx', a.get('r', 0)))
            pts = [(float(a['cx']) - rx, float(a['cy'])), (float(a['cx']) + rx, float(a['cy']))]
        for (x, y) in pts:
            if not inside(poly, x, y) or dist(poly, x, y) < 0.9:
                bad += 1
                if bad <= 40:
                    print(f'  near/outside skin: ({fmt(x)}, {fmt(y)}) {m.group(0)[:70]}')
    print('figure', len(fig), 'bytes;', fig.count('<path') + fig.count('<ellipse') + fig.count('<rect') + fig.count('<circle'),
          'shapes;', bad, 'points near/outside the skin')
