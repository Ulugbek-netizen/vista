/*
 * Bone Health model — illustrative estimates, not a diagnostic tool.
 *
 * Grounding (see README.md for full references):
 *  - Hip & spine lose ~1–1.5% aBMD per month in microgravity (NASA HRP Bone Fracture Evidence Report, 2024).
 *  - ARED resistance exercise maintains most sites but NOT hip trabecular bone (Sibonga 2019).
 *  - ARED + alendronate 70 mg/week prevented loss at spine, hip, pelvis (LeBlanc 2013).
 *  - Adequate energy intake + vitamin D are required for exercise to work (Smith 2012).
 *  - Recovery after landing is slow/incomplete; hip trabecular deficits persist 2+ years;
 *    (Vico 2017, Gabel 2022). Regional rates: Stavnichuk 2020 meta-analysis.
 * Weights, partial-gravity scaling and recovery rates below are modelling assumptions.
 */
const BoneModel = (() => {
  const DAY_MS = 86400000;

  const ENVS = {
    iss:  { label: 'ISS / deep-space transit', short: 'Microgravity', g: 0 },
    moon: { label: 'Lunar surface base',       short: 'Moon · 0.17 g', g: 0.17 },
    mars: { label: 'Mars surface base',        short: 'Mars · 0.38 g', g: 0.38 },
  };

  const MED_PLANS = {
    none:        { label: 'None prescribed' },
    alendronate: { label: 'Alendronate 70 mg, weekly (oral)' },
    zoledronic:  { label: 'Zoledronic acid, single pre-flight infusion' },
  };

  // base = %/month loss in 0 g with no countermeasures.
  // w = how much each countermeasure protects this site (sums ≤ 1).
  // recoveryCap = fraction of peak loss that can be regained after landing.
  const SITES = {
    spine: {
      name: 'Lumbar spine', base: 1.1, recoveryCap: 0.85,
      w: { ex: 0.5, aero: 0.05, nut: 0.1, med: 0.35 },
      role: 'Carries your upper body weight on Earth. In weightlessness the vertebrae are unloaded and the spine lengthens (up to ~3% height gain).',
      risk: 'Loses density ~10× faster than in early menopause. Vertebral fracture risk rises after flight.',
      actions: ['Heavy squats and deadlifts on the resistance device (axial loading)', 'Keep core and back extensor work in every session', 'Report new or sharp back pain — rule out kidney stone vs. bone'],
    },
    pelvis: {
      name: 'Pelvis', base: 1.3, recoveryCap: 0.7,
      w: { ex: 0.45, aero: 0.05, nut: 0.1, med: 0.4 },
      role: 'The bowl that transfers your upper-body weight into both legs. In weightlessness it carries almost no load.',
      risk: 'Spine + pelvis region loses the most of any part of the skeleton (about −6% after a long mission, in a meta-analysis of 148 space travellers).',
      actions: ['Squats and deadlifts at ≥100% body weight load the pelvis directly', 'Keep sessions 6–7 days a week — no long gaps', 'Hip-hinge and single-leg work for side-to-side loading'],
    },
    hip: {
      name: 'Hip (femoral neck)', base: 1.5, recoveryCap: 0.6,
      w: { ex: 0.4, aero: 0.05, nut: 0.1, med: 0.45 },
      role: 'The top of the thigh bone, where it joins the pelvis. Its spongy (trabecular) inner bone is the most sensitive site in space — and where hip fractures happen.',
      risk: 'Fastest-losing site. Resistance exercise alone does not stop trabecular hip loss; >10% losses seen, often not recovered 2 years after landing.',
      actions: ['Hit your load target: squat / deadlift at ≥100% body weight', 'Do not skip sessions — hip loss resumes within days', 'Ask your flight surgeon whether an anti-resorptive drug is indicated'],
    },
    thigh: {
      name: 'Thigh (femur shaft)', base: 0.8, recoveryCap: 0.75,
      w: { ex: 0.4, aero: 0.15, nut: 0.1, med: 0.35 },
      role: 'The longest, strongest bone in the body. On Earth it carries your full weight with every step.',
      risk: 'Leg bones lose about 0.8% per month in space (meta-analysis of 148 space travellers), and recovery after landing is slow.',
      actions: ['Squats and leg press on the resistance device', 'Treadmill running with a high harness load', 'After landing: progressive walking → jogging plan'],
    },
    tibia: {
      name: 'Shin (tibia)', base: 0.8, recoveryCap: 0.75,
      w: { ex: 0.3, aero: 0.25, nut: 0.1, med: 0.35 },
      role: 'Absorbs impact during walking and running. Measured with high-resolution 3D scans (HR-pQCT).',
      risk: '9 of 17 astronauts had not recovered tibia density 12 months after a long mission.',
      actions: ['Treadmill running with a high harness load (impact loading)', 'Heel raises and jumps on the resistance device', 'After landing: progressive walking → jogging plan'],
    },
  };

  const TARGETS = {
    resMin: 45,        // resistance exercise minutes / day
    loadPct: 100,      // peak load as % body weight
    aeroMin: 30,       // aerobic minutes / day
    waterL: 2.0,       // fluid litres / day (kidney-stone prevention)
    sodiumMg: 3000,    // NASA reformulated ISS menu target
    kcal: 2400,        // adequate energy intake (adjust per crew)
    proteinPerKg: 1.2, // g protein per kg body mass
  };

  // ---------- date helpers (local dates as YYYY-MM-DD) ----------
  const iso = (d) => new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  const parse = (s) => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
  const addDays = (s, n) => { const d = parse(s); d.setDate(d.getDate() + n); return iso(d); };
  const diffDays = (a, b) => Math.round((parse(b) - parse(a)) / DAY_MS);
  const todayIso = () => iso(new Date());
  const clamp = (v, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));
  const num = (v) => (Number.isFinite(+v) ? +v : 0);

  // ---------- scoring ----------
  function dayScores(log, mission) {
    if (!log) return null;
    const t = TARGETS;
    const ex = clamp(num(log.resMin) / t.resMin) * clamp(num(log.loadPct) / t.loadPct);
    const aero = clamp(num(log.aeroMin) / t.aeroMin);
    const checks = [
      num(log.kcal) >= t.kcal,
      num(log.protein) >= t.proteinPerKg * num(mission.bodyMassKg),
      log.sodium !== '' && log.sodium != null && num(log.sodium) <= t.sodiumMg,
      !!log.vitD,
    ];
    const nut = checks.filter(Boolean).length / checks.length;
    return { ex, aero, nut };
  }

  function medActive(state, date) {
    const plan = state.mission.medPlan;
    if (plan === 'zoledronic') return true;
    if (plan !== 'alendronate') return false;
    for (let i = 0; i < 8; i++) {
      const l = state.logs[addDays(date, -i)];
      if (l && l.medTaken) return true;
    }
    return false;
  }

  function protection(site, sc, med) {
    const w = SITES[site].w;
    return clamp(w.ex * sc.ex + w.aero * sc.aero + w.nut * sc.nut + w.med * (med ? 1 : 0), 0, 0.95);
  }

  function recentAverage(state, today, days = 7) {
    const list = [];
    for (let i = 0; i < days; i++) {
      const sc = dayScores(state.logs[addDays(today, -i)], state.mission);
      if (sc) list.push(sc);
    }
    if (!list.length) return null;
    const avg = (k) => list.reduce((a, s) => a + s[k], 0) / list.length;
    return { ex: avg('ex'), aero: avg('aero'), nut: avg('nut') };
  }

  /** Day-by-day simulation of % density lost vs. pre-flight for one site. */
  function simulate(state, site, today = todayIso()) {
    const m = state.mission;
    const s = SITES[site];
    const gf = 1 - ENVS[m.env].g; // assumption: loss scales linearly with missing gravity
    const perDay = s.base / 30.4;
    const elapsed = clamp(diffDays(m.start, today), -1, m.missionDays + 365);
    const horizon = m.missionDays + 365;
    const fallback = { ex: 0, aero: 0, nut: 0.5 };
    const projSc = recentAverage(state, today) || fallback;
    const projMed = m.medPlan === 'zoledronic' || (m.medPlan === 'alendronate' && medActive(state, today));

    let loss = 0, noCM = 0, peak = 0, peakNo = 0, last = null, unlogged = 0;
    const points = [];
    for (let d = 0; d <= horizon; d++) {
      const date = addDays(m.start, d);
      const isPast = d <= elapsed;
      let sc, med;
      if (isPast) {
        const today_ = dayScores(state.logs[date], m);
        if (!today_ && d < m.missionDays && d < elapsed) unlogged++; // today may still be logged
        sc = today_ || last || fallback;
        if (today_) last = today_;
        med = medActive(state, date);
      } else {
        sc = projSc;
        med = projMed;
      }

      if (d < m.missionDays) {
        loss += perDay * gf * (1 - protection(site, sc, med));
        noCM += perDay * gf;
        peak = loss; peakNo = noCM;
      } else {
        const post = d - m.missionDays;
        if (s.postflightWorsen && post < 180) {
          loss += s.postflightWorsen / 30.4;
          noCM += s.postflightWorsen / 30.4;
          peak = Math.max(peak, loss); peakNo = Math.max(peakNo, noCM);
        } else {
          const rec = perDay * 0.3 * (0.5 + 0.5 * sc.ex);
          loss = Math.max(peak * (1 - s.recoveryCap), loss - rec);
          noCM = Math.max(peakNo * (1 - s.recoveryCap), noCM - perDay * 0.3 * 0.5);
        }
      }
      points.push({ d, date, loss, noCM, past: isPast });
    }
    const at = (d) => points[clamp(d, 0, horizon)];
    return {
      site, points, elapsed, horizon,
      missionDays: m.missionDays,
      current: elapsed < 0 ? 0 : at(elapsed).loss,
      atLanding: at(m.missionDays - 1).loss,
      noCMAtLanding: at(m.missionDays - 1).noCM,
      oneYearAfter: at(horizon).loss,
      unlogged,
      ratePerMonth: s.base * gf * (1 - protection(site, projSc, projMed)),
    };
  }

  const level = (loss) => (loss < 2 ? 'ok' : loss < 5 ? 'warn' : 'crit');
  const earthYears = (loss) => loss / 1.0; // ~1%/yr age-related loss after 50 (CSA)

  // ---------- alerts ----------
  function alerts(state, today = todayIso()) {
    const m = state.mission;
    const out = [];
    const logOn = (i) => state.logs[addDays(today, -i)];
    const latest = logOn(0);
    // last 3 logs, starting from today if logged, otherwise yesterday
    const recent = (latest ? [0, 1, 2] : [1, 2, 3]).map(logOn).filter(Boolean);

    if (latest && latest.flankPain && latest.bloodUrine) {
      out.push({ level: 'crit', title: 'Possible kidney stone', detail: 'Flank / lower-back pain together with blood in urine. Bone calcium released in microgravity raises stone risk.', action: 'Contact the flight surgeon now. Increase fluids unless told otherwise.' });
    } else if (latest && latest.flankPain) {
      out.push({ level: 'warn', title: 'Flank or lower-back pain', detail: 'Could be muscular, spinal, or an early kidney stone.', action: 'Drink extra fluid, re-check urine, report if it persists or blood appears.' });
    }
    if (latest && latest.fallPain) {
      out.push({ level: 'crit', title: 'Possible fracture', detail: 'Bone pain after a fall or impact, on a skeleton weakened by spaceflight.', action: 'Stop loaded exercise on that limb and contact the flight surgeon.' });
    }
    if (recent.filter((l) => l.urineCa === 'high').length >= 2) {
      out.push({ level: 'crit', title: 'Urine calcium persistently high', detail: 'High calcium in ≥2 of the last 3 tests means bone is being broken down quickly.', action: 'Report to the flight surgeon; review exercise load, sodium and medication.' });
    }

    let missed = 0;
    for (let i = 0; i < 7; i++) {
      const sc = dayScores(logOn(i), m);
      if (i === 0 && !sc) continue; // today not logged yet
      if (!sc || sc.ex < 0.5) missed++;
    }
    if (missed >= 2) out.push({ level: 'warn', title: `${missed} resistance sessions missed this week`, detail: 'Hip and spine loss restarts quickly without heavy loading.', action: `Schedule a full ${TARGETS.resMin}-min session at ≥${TARGETS.loadPct}% body-weight load.` });

    const salty = recent.filter((l) => num(l.sodium) > TARGETS.sodiumMg);
    if (recent.length >= 3 && salty.length === 3) out.push({ level: 'warn', title: 'High sodium 3 days running', detail: 'Excess salt increases calcium loss in urine.', action: `Keep sodium ≤ ${TARGETS.sodiumMg} mg — choose low-salt menu items.` });

    const withWeight = [0, 1, 2, 3, 4, 5, 6].map(logOn).find((l) => l && num(l.weight) > 0);
    if (withWeight && num(withWeight.weight) < num(m.bodyMassKg) * 0.97) {
      const pct = ((1 - num(withWeight.weight) / num(m.bodyMassKg)) * 100).toFixed(1);
      out.push({ level: 'warn', title: `Body mass down ${pct}%`, detail: 'Low energy intake blunts the benefit of exercise on bone.', action: `Eat at least ${TARGETS.kcal} kcal/day; talk to the nutrition team.` });
    }
    if (latest && latest.water !== '' && latest.water != null && num(latest.water) < TARGETS.waterL) {
      out.push({ level: 'warn', title: 'Low fluid intake today', detail: `${num(latest.water)} L logged.`, action: `Drink ≥ ${TARGETS.waterL} L/day to lower kidney-stone risk.` });
    }
    if (m.medPlan === 'alendronate' && !medActive(state, today)) {
      out.push({ level: 'warn', title: 'Weekly bone medication overdue', detail: 'No alendronate dose logged in the last 8 days.', action: 'Take it as prescribed and log it.' });
    }
    if (!latest) out.push({ level: 'info', title: 'Today’s bone log is not done', detail: 'The model is reusing your last entry.', action: 'Fill in the daily log on the right.' });

    if (!out.some((a) => a.level !== 'info')) out.unshift({ level: 'ok', title: 'Bone countermeasures on track', detail: 'No warning signs in your recent logs.', action: 'Keep the routine going.' });
    const rank = { crit: 0, warn: 1, info: 2, ok: 3 };
    return out.sort((a, b) => rank[a.level] - rank[b.level]);
  }

  function streak(state, today = todayIso()) {
    let start = state.logs[today] ? 0 : 1;
    let n = 0;
    for (let i = start; i < 400; i++) {
      const sc = dayScores(state.logs[addDays(today, -i)], state.mission);
      if (sc && sc.ex >= 0.8) n++; else break;
    }
    return n;
  }

  // ---------- demo data ----------
  function demoState(today = todayIso()) {
    let seed = 7;
    const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    const mission = { crew: 'Demo astronaut', start: addDays(today, -75), missionDays: 180, env: 'iss', bodyMassKg: 76, medPlan: 'none' };
    const logs = {};
    for (let i = 75; i >= 1; i--) {
      const date = addDays(today, -i);
      const skip = rnd() < 0.1 || i === 2 || i === 4;
      const salty = i <= 3;
      logs[date] = {
        resMin: skip ? 0 : Math.round(38 + rnd() * 20),
        loadPct: skip ? 0 : Math.round(80 + rnd() * 35),
        aeroMin: Math.round(20 + rnd() * 25),
        water: +(1.8 + rnd() * 0.9).toFixed(1),
        sodium: salty ? Math.round(3300 + rnd() * 400) : Math.round(2400 + rnd() * 900),
        kcal: Math.round(2250 + rnd() * 500),
        protein: Math.round(80 + rnd() * 40),
        weight: +(76 - (75 - i) * 0.022 + (rnd() - 0.5) * 0.4).toFixed(1),
        vitD: rnd() > 0.1,
        medTaken: false,
        urineCa: i % 14 === 0 ? (rnd() > 0.6 ? 'high' : 'normal') : '',
        flankPain: false, bloodUrine: false, fallPain: false,
      };
    }
    return { mission, logs };
  }

  return { ENVS, MED_PLANS, SITES, TARGETS, dayScores, simulate, alerts, streak, level, earthYears, demoState, addDays, diffDays, todayIso, medActive };
})();
