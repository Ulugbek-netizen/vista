(() => {
  const M = BoneModel;
  const STORE_KEY = 'orbit-health-bone-v1';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const fmt = (v, d = 1) => (Math.round(v * 10 ** d) / 10 ** d).toFixed(d);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const LEVEL_TEXT = { ok: 'Stable', warn: 'Watch', crit: 'Act now' };

  // ---------- state ----------
  function load() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (raw) {
        const s = JSON.parse(raw);
        if (s && s.mission && s.logs) return s;
      }
    } catch (_) { /* storage unavailable */ }
    return M.demoState();
  }
  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (_) { /* ignore */ }
  }
  $('#bodyMap').innerHTML = Skeleton.markup;
  let state = load();
  let selected = 'hip';
  const today = M.todayIso();

  // ---------- header ----------
  function renderMissionBar() {
    const m = state.mission;
    const day = M.diffDays(m.start, today) + 1;
    const post = day > m.missionDays;
    const chips = [
      `<span class="chip"><b>${esc(m.crew)}</b></span>`,
      `<span class="chip">${esc(M.ENVS[m.env].short)}</span>`,
      post
        ? `<span class="chip phase-post">Post-flight <b>day ${day - m.missionDays}</b></span>`
        : `<span class="chip">Mission day <b>${Math.max(day, 0)}</b> / ${m.missionDays}</span>`,
      `<span class="chip">Meds: <b>${esc(M.MED_PLANS[m.medPlan].label.split(',')[0])}</b></span>`,
    ];
    $('#missionBar').innerHTML = chips.join('');
    $('#medRow').hidden = m.medPlan !== 'alendronate';
  }

  // ---------- body map ----------
  function renderBody(sims) {
    $$('#bodyMap .site').forEach((g) => {
      const key = g.dataset.site;
      const lvl = M.level(sims[key].current);
      g.classList.remove('ok', 'warn', 'crit');
      g.classList.add(lvl);
      g.classList.toggle('selected', key === selected);
      g.setAttribute('aria-label', `${M.SITES[key].name}: ${LEVEL_TEXT[lvl]}, ${fmt(sims[key].current)}% loss`);
    });
  }

  function renderDetail(sim) {
    const s = M.SITES[sim.site];
    const lvl = M.level(sim.current);
    const yrs = M.earthYears(sim.current);
    $('#siteDetail').innerHTML = `
      <div><span class="badge ${lvl}">${LEVEL_TEXT[lvl]}</span></div>
      <h3>${esc(s.name)}</h3>
      <div><span class="big">−${fmt(sim.current)}%</span> <span class="sub">density vs. pre-flight (estimated)</span></div>
      <p class="sub">≈ ${fmt(yrs)} years of age-related bone loss on Earth</p>
      <div class="stat-row">
        <div class="stat"><span>Current rate</span><b>${fmt(sim.ratePerMonth, 2)}%/mo</b></div>
        <div class="stat"><span>At landing</span><b>−${fmt(sim.atLanding)}%</b></div>
        <div class="stat"><span>1 yr after</span><b>−${fmt(sim.oneYearAfter)}%</b></div>
      </div>
      <p class="sub">${esc(s.role)}</p>
      <p class="sub"><b style="color:var(--text)">Risk:</b> ${esc(s.risk)}</p>
      <ul>${s.actions.map((a) => `<li>${esc(a)}</li>`).join('')}</ul>`;
  }

  // ---------- alerts ----------
  function renderAlerts() {
    $('#alerts').innerHTML = M.alerts(state, today).map((a) => `
      <li class="${a.level}">
        <span class="t">${esc(a.title)}</span>
        <span class="d">${esc(a.detail)}</span>
        <span class="a">${esc(a.action)}</span>
      </li>`).join('');
  }

  // ---------- chart ----------
  function renderTabs() {
    $('#siteTabs').innerHTML = Object.entries(M.SITES).map(([k, s]) =>
      `<button type="button" role="tab" data-site="${k}" aria-selected="${k === selected}">${esc(s.name.split(' (')[0])}</button>`).join('');
  }

  function renderChart(sim) {
    const W = 640, H = 260, P = { l: 40, r: 14, t: 14, b: 28 };
    const pts = sim.points;
    const n = pts.length - 1;
    const maxV = Math.max(6, ...pts.map((p) => Math.max(p.loss, p.noCM))) * 1.08;
    const x = (d) => P.l + (d / n) * (W - P.l - P.r);
    const y = (v) => P.t + (1 - v / maxV) * (H - P.t - P.b);
    const line = (arr, key) => arr.map((p, i) => `${i ? 'L' : 'M'}${x(p.d).toFixed(1)},${y(p[key]).toFixed(1)}`).join('');
    const el = Math.min(Math.max(sim.elapsed, 0), n);
    const past = pts.slice(0, el + 1);
    const future = pts.slice(el);

    const step = maxV > 12 ? 4 : 2;
    let grid = '';
    for (let v = 0; v <= maxV; v += step) {
      grid += `<line class="grid" x1="${P.l}" x2="${W - P.r}" y1="${y(v)}" y2="${y(v)}"/><text x="${P.l - 6}" y="${y(v) + 4}" text-anchor="end">−${v}%</text>`;
    }
    const bands = [[2, 'var(--warn)'], [5, 'var(--crit)']].map(([v, c]) =>
      `<line class="band" stroke="${c}" x1="${P.l}" x2="${W - P.r}" y1="${y(v)}" y2="${y(v)}"/>`).join('');
    const xm = x(sim.missionDays);
    const xLabels = [0, Math.round(sim.missionDays / 2), sim.missionDays, sim.missionDays + 180, n]
      .map((d) => `<text x="${x(d)}" y="${H - 8}" text-anchor="${d === n ? 'end' : d === 0 ? 'start' : 'middle'}">${d <= sim.missionDays ? `Day ${d}` : `+${d - sim.missionDays}d`}</text>`).join('');

    $('#chart').innerHTML = `
      <rect class="post" x="${xm}" y="${P.t}" width="${W - P.r - xm}" height="${H - P.t - P.b}"/>
      <text x="${xm + 6}" y="${P.t + 12}" style="fill:var(--accent-2)">Back on Earth · recovery</text>
      ${grid}${bands}
      <path class="none" d="${line(pts, 'noCM')}"/>
      ${past.length > 1 ? `<path class="you" d="${line(past, 'loss')}"/>` : ''}
      <path class="proj" d="${line(future, 'loss')}"/>
      ${sim.elapsed >= 0 && sim.elapsed <= n ? `<line class="today" x1="${x(el)}" x2="${x(el)}" y1="${P.t}" y2="${H - P.b}"/><text x="${x(el)}" y="${P.t + 12}" text-anchor="${x(el) > W - 80 ? 'end' : 'middle'}">today</text>` : ''}
      ${xLabels}`;

    const saved = sim.noCMAtLanding - sim.atLanding;
    $('#chartSummary').innerHTML =
      `${esc(M.SITES[sim.site].name)}: projected <b>−${fmt(sim.atLanding)}%</b> at landing vs. <b>−${fmt(sim.noCMAtLanding)}%</b> with no countermeasures — your routine is protecting <b>${fmt(saved)}%</b> of bone.` +
      (sim.unlogged ? ` <span>(${sim.unlogged} unlogged mission days filled with your previous entry.)</span>` : '');
  }

  // ---------- targets ----------
  function renderTargets() {
    const log = state.logs[today] || {};
    const T = M.TARGETS;
    const mass = +state.mission.bodyMassKg || 0;
    const items = [
      { lbl: 'Resistance', v: log.resMin, unit: 'min', goal: T.resMin, kind: 'min' },
      { lbl: 'Peak load', v: log.loadPct, unit: '% BW', goal: T.loadPct, kind: 'min' },
      { lbl: 'Aerobic', v: log.aeroMin, unit: 'min', goal: T.aeroMin, kind: 'min' },
      { lbl: 'Water', v: log.water, unit: 'L', goal: T.waterL, kind: 'min' },
      { lbl: 'Protein', v: log.protein, unit: 'g', goal: Math.round(T.proteinPerKg * mass), kind: 'min' },
      { lbl: 'Sodium', v: log.sodium, unit: 'mg', goal: T.sodiumMg, kind: 'max' },
    ];
    $('#targets').innerHTML = items.map((it) => {
      const has = it.v !== undefined && it.v !== '' && it.v !== null;
      const v = has ? +it.v : 0;
      let pct, lvl;
      if (it.kind === 'min') { pct = Math.min(100, (v / it.goal) * 100); lvl = pct >= 100 ? 'ok' : pct >= 60 ? 'warn' : 'crit'; }
      else { pct = Math.min(100, (v / it.goal) * 100); lvl = v <= it.goal ? 'ok' : v <= it.goal * 1.15 ? 'warn' : 'crit'; }
      return `<div class="target">
        <div class="lbl"><span>${it.lbl}</span><span>${it.kind === 'max' ? '≤' : '≥'} ${it.goal} ${it.unit}</span></div>
        <div class="val">${has ? `${v} ${it.unit}` : '<span style="color:var(--muted)">not logged</span>'}</div>
        <div class="bar"><i class="${has ? lvl : ''}" style="width:${has ? pct : 0}%"></i></div>
      </div>`;
    }).join('');
    const st = M.streak(state, today);
    $('#streak').innerHTML = st ? `🔥 <b>${st}</b> bone-loading day${st > 1 ? 's' : ''} in a row` : 'Start a bone-loading streak today';
  }

  // ---------- log form ----------
  const form = $('#logForm');
  const NUM_FIELDS = ['resMin', 'loadPct', 'aeroMin', 'water', 'sodium', 'kcal', 'protein', 'weight'];
  const BOOL_FIELDS = ['vitD', 'medTaken', 'flankPain', 'bloodUrine', 'fallPain'];

  function fillForm(date) {
    const l = state.logs[date] || {};
    form.date.value = date;
    NUM_FIELDS.forEach((f) => { form[f].value = l[f] ?? ''; });
    BOOL_FIELDS.forEach((f) => { form[f].checked = !!l[f]; });
    form.urineCa.value = l.urineCa || '';
    $('#saveMsg').textContent = state.logs[date] ? 'Editing an existing entry.' : '';
  }

  form.date.addEventListener('change', () => fillForm(form.date.value));
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const date = form.date.value;
    if (!date) return;
    const entry = {};
    NUM_FIELDS.forEach((f) => { entry[f] = form[f].value === '' ? '' : +form[f].value; });
    BOOL_FIELDS.forEach((f) => { entry[f] = form[f].checked; });
    entry.urineCa = form.urineCa.value;
    state.logs[date] = entry;
    save();
    render();
    $('#saveMsg').textContent = `Saved ${date}.`;
  });

  // ---------- settings ----------
  const dlg = $('#settings');
  const sf = $('#settingsForm');
  sf.env.innerHTML = Object.entries(M.ENVS).map(([k, e]) => `<option value="${k}">${esc(e.label)}</option>`).join('');
  sf.medPlan.innerHTML = Object.entries(M.MED_PLANS).map(([k, p]) => `<option value="${k}">${esc(p.label)}</option>`).join('');

  $('#settingsBtn').addEventListener('click', () => {
    const m = state.mission;
    ['crew', 'start', 'missionDays', 'env', 'bodyMassKg', 'medPlan'].forEach((k) => { sf[k].value = m[k]; });
    dlg.showModal();
  });
  dlg.addEventListener('close', () => {
    if (dlg.returnValue !== 'save') return;
    state.mission = {
      crew: sf.crew.value.trim() || 'Crew member',
      start: sf.start.value,
      missionDays: Math.max(7, +sf.missionDays.value || 180),
      env: sf.env.value,
      bodyMassKg: +sf.bodyMassKg.value || 75,
      medPlan: sf.medPlan.value,
    };
    save();
    render();
  });
  $('#loadDemo').addEventListener('click', () => {
    state = M.demoState(today);
    save(); dlg.close(); render(); fillForm(today);
  });
  $('#clearAll').addEventListener('click', () => {
    if (!confirm('Delete all bone logs stored in this browser?')) return;
    state.logs = {};
    save(); dlg.close(); render(); fillForm(today);
  });

  // ---------- selection ----------
  function select(site) { selected = site; render(); }
  $$('#bodyMap .site').forEach((g) => {
    g.addEventListener('click', () => select(g.dataset.site));
    g.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(g.dataset.site); } });
  });
  $('#siteTabs').addEventListener('click', (e) => {
    const b = e.target.closest('button[data-site]');
    if (b) select(b.dataset.site);
  });

  // ---------- render ----------
  function render() {
    const sims = Object.fromEntries(Object.keys(M.SITES).map((k) => [k, M.simulate(state, k, today)]));
    renderMissionBar();
    renderBody(sims);
    renderDetail(sims[selected]);
    renderAlerts();
    renderTabs();
    renderChart(sims[selected]);
    renderTargets();
  }

  render();
  fillForm(today);
})();
