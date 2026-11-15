# Vista: stay well beyond Earth

**Team Void Voyagers · NASA Space Apps Challenge 2026**
Challenge: *Create Health Monitoring Software for Astronauts on Space Missions*

Vista gives astronauts a clear view of their own health, far from Earth. In this self-check app, a crew member logs a reading in under a minute and gets a plain-language verdict with a colour, a shape and a word. The app then says exactly what to do: look after yourself, tell your crew medical officer, or call the flight surgeon. The advice changes with the mission: low-Earth orbit, a Moon base, the cruise to Mars or a Mars base, where a reply from Earth can take 44 minutes.

- **Live app:** https://vista-health.vercel.app (Vercel) · mirror on Azure Static Web Apps: https://black-sky-0803de80f.8.azurestaticapps.net
- **Source:** https://github.com/Ulugbek-netizen/vista (one HTML file, no dependencies; once open, the checks work without a connection)
- **Research documentation:** [docs/Vista-Research-Documentation.docx](docs/Vista-Research-Documentation.docx) (48 pages: methods, every threshold and its source, the bone and Mission link models, the 3D body, the Library and its doses, validation, the audit, privacy and limitations)

## Why it matters

Spaceflight changes the body fast. About 2 litres of fluid shift towards the head, weight-bearing bone can lose 1–1.5% a month, ISS crews average about 6 hours of sleep a night (Barger 2014), and the cosmic-ray dose on the Moon's surface is about 2.6 times that inside the ISS (Zhang 2020). The further a crew travels, the longer it waits for help: an emergency return from the station takes about a day, from the Moon 3–11 days, and there is no early return from Mars. Crews must notice, judge and act on their own health. Vista gives them a simple, trustworthy routine for that.

## Who it's for

- **Crew on long missions:** astronauts on a station, on the Moon or on the way to Mars who need a quick, private way to check themselves and to know what to do next.
- **Crew medical officers:** the crew members trained to examine colleagues and use the onboard medical kit. Vista gives them consistent readings, trends and plain next steps.
- **Flight surgeons:** doctors on the ground receive a report the crew member has read first: current readings, findings and the mission environment, nothing more.
- **Analogue crews, trainees and students:** teams in polar stations and isolation studies, people training for spaceflight, and anyone curious how the body changes away from Earth.

## How to use it

1. **Choose your mission** at the top of the screen: LEO station, Moon base, Mars transit or Mars base. Advice, radiation baselines and the signal delay to Earth follow the choice.
2. **Set up your profile** (Today, then Crew profile & data): pre-flight body mass and mission dates set the fluid target, mission day and bone estimate.
3. **Do today's checks** from the routine on Today. Every check has step-by-step instructions, so no medical training is needed.
4. **Read the verdict:** each reading gets a colour, a shape and a word (Nominal, Watch, Act or Urgent), and the banner says what to do next.
5. **Watch your trends:** each measure is plotted against your own baseline, so slow changes stand out.
6. **Look it up, then report:** the Library explains common space-health problems and the medicines in a flight kit. When something needs the flight surgeon, send a report you can read before it goes.

Vista opens with a made-up 42-day station mission so you can look around first; press "Start my own log" on Today to begin your own.

## How it works

- **15 checks a crew member can do alone:** resting heart rate, blood pressure, SpO₂, cabin CO₂, temperature, sleep, mood, the PHQ-4 wellbeing screen, a 3-minute psychomotor vigilance test (PVT-B, playable in the app), near vision with an Amsler grid, fluids, exercise, body mass, finger-stick glucose and the radiation dosimeter. Each has step-by-step instructions written for people with no medical training.
- **Four levels, never colour alone:** Nominal, Watch, Act and Urgent, each with its own icon shape and word. Thresholds come from clinical early-warning ranges (NEWS2, AHA/ACC 2025, ADA 2026, AASM) and NASA limits (NASA-STD-3001). Where no fixed number exists, the app compares the reading with the crew member's own baseline. Red-flag symptoms raise the level, and symptoms that matter only with an abnormal value (back pain with very high blood pressure, for example) count only then.
- **When to call for help:** a four-step escalation ladder, worded for each environment's signal delay.
- **Mission link:** today's distance from Earth and radio delay for the chosen environment (station, Moon base, Mars transit, Mars base), with an orbit map. Mars and Moon positions come from JPL's "Approximate Positions of the Planets" (Standish) and the main lunar terms in Meeus, *Astronomical Algorithms*, checked against NASA JPL Horizons: Earth–Mars distance within 0.02% for 2026–2030 (0.2 s of delay), the Moon within 110 km. On a Mars base it shows the earliest possible reply from Earth (about 22 minutes on 14 November 2026) and predicts solar conjunctions, when Mars is within 2° of the Sun and contact pauses (next: about 12–29 March 2028). The Mars transit position is modelled on a Hohmann transfer from the mission start date.
- **3D body from real anatomy data:** a rotatable 3D model built from BodyParts3D (MRI-based anatomy from the Database Center for Life Science, Japan; CC BY-SA 2.1 JP): skin, 323 muscles, 282 bones, brain, eyes, heart, airway, lungs (modelled around the real bronchial tree), liver, gut, pancreas, kidneys, bladder, spleen and thymus, plus the main arteries and veins. Four views (**Muscles**, **Organs**, **Bones**, **Status**) and **Male / Female** (the female body is the same data set adapted to average female proportions, with uterus and ovaries; BodyParts3D is a male data set). Drag to turn; tap a part to open its body system. Each system takes its status colour in Status view, and the word and icon stay in the system list beside it. The hand-drawn SVG map remains as the fallback where WebGL is not available.
- **Bone density on measured data:** a per-site projection (hip, pelvis, lumbar spine, thigh, shin) from launch to one year after landing, built on loss rates measured in astronauts (Lang 2004; Stavnichuk 2020, 148 space travellers), the effect of today's ISS exercise equipment (NASA 2025 review) and bone medication (LeBlanc 2013), and the measured 9-month recovery half-life (Sibonga 2007). It is drawn against the NASA-STD-3001 limits for the hip, lumbar spine and femoral neck; the 5% line for the pelvis, thigh and shin is a Vista design choice. A table in the app lists every source.
- **Flight-surgeon inbox:** "Send report to flight surgeon" shows the crew member exactly what will be sent (latest readings with their age, findings, symptoms, the emergency log, mission environment, optional callsign), then delivers it to the team's Supabase inbox. Row-level security makes the table insert-only for the public key, a trigger limits it to 30 reports a minute, and reports are deleted after 90 days (`supabase/hardening.sql`). With no link to Earth the report waits on the device and is sent when the connection returns, and a **short text code** (for example `VISTA|MARS|DAY=42|LEVEL=2|HR=61|BP=111/72|SPO2=97`) can be read out or typed over a slow link.
- **Deep-space tools (from our gap research):** **Emergency** (the first-minutes checklist with a running timer and a time-stamped event log that goes into the next report), **I feel unwell** (tick symptoms, get the immediate step, the right checks and the Library entry; red flags point straight to Emergency), **Solar storm** (a shelter checklist and timer) and **Medicine kit** (stock and expiry tracking with a warning badge, since medicines can lose strength after expiry).
- **Trends:** charts with status zones, keyboard-readable tooltips and a data table.
- **Routine and motivation:** a daily checklist with streaks, XP, levels and badges.
- **Cross-reading findings:** for example sleep debt over 7 days, a resting heart rate creeping above baseline, fever with a fast pulse, or low oxygen with high CO₂ (suspect the cabin air).
- **Window to Earth:** for isolation and wellbeing, the latest clear NASA satellite view of a place that matters to you.
- **Library:** a searchable knowledge base of 61 space-health conditions (why each happens in space, signs, prevention and self-care, when to get help, related checks) and a guide to 58 medicines crews use or carry (what each is for, how crews use it, cautions, what is known about it in space). Search understands everyday words (dizzy, sick, pee) and puts an emergency pointer above red-flag searches such as "chest pain". Every entry cites its sources; research and verification logs are in `docs/evidence/library-*.md`.
- **Doses from your readings:** each medicine shows its official label dose and 24-hour maximum (FDA DailyMed, EMC or NHS labels). For the 24 medicines a crew member could take under a standing order, Vista works out the dose for you now from the label (by body mass where the label is weight-based), never goes above the label maximum, and stops you when a vital sign makes it unsafe (for example a decongestant with a systolic blood pressure of 160 or more). Medicines given by a medic, such as opioids, ketamine, sedatives and heart drugs, show the label dose only. The built-in self-test checks that no calculated dose can exceed the label limits.
- **Space weather:** recent solar particle events, coronal mass ejections and geomagnetic storms from NASA DONKI, shown next to your radiation dose.

## NASA and partner data used

| Data | How Vista uses it |
|---|---|
| **NASA DONKI** space-weather database, via [api.nasa.gov](https://api.nasa.gov/) | Live: solar energetic particle events, CMEs and geomagnetic storms in the radiation panel |
| **NASA Harmonized Landsat and Sentinel-2 (HLS)**, via the [Microsoft Planetary Computer](https://planetarycomputer.microsoft.com/) STAC and data APIs | Live: Window to Earth satellite views |
| **NASA JPL Solar System Dynamics**: [Approximate Positions of the Planets](https://ssd.jpl.nasa.gov/planets/approx_pos.html) and [JPL Horizons](https://ssd.jpl.nasa.gov/horizons/) | Mission link: Earth–Mars distance and signal delay (Horizons used to check the model and in the built-in self-test) |
| **NASA-STD-3001** Vol. 1 Rev C and Vol. 2 Rev F, **NASA OCHMO** technical briefs (CO₂, radiation, SANS) | Limits: career dose 600 mSv, cabin CO₂ 3 mmHg, strength and fitness at 80% of baseline or more, fluid needs |
| **NASA Human Research Program**: five hazards, human-system risks, evidence reports | The body-map hazards and in-app explanations |
| **NASA nutrition requirements** (JSC-67378) | Personal fluid target (32 mL/kg) and sodium guidance |
| **Canadian Space Agency** (Bio-Monitor, radiation monitoring, vascular ageing) | Measurement context and radiation content |
| **ESA Space Heritage archive** | Historical health-research records in the Guide |

The source of every threshold is listed in the app's Guide and in [`docs/evidence/`](docs/evidence/), with a verification log for each. Where no published cut-off exists, the app compares the reading with the crew member's own baseline or uses a rule it labels as a Vista design choice.

## How we used AI

We built Vista with Claude (Anthropic) as a research and coding assistant:

1. **Research:** six research agents collected thresholds and spaceflight facts from NASA, CSA, ESA and peer-reviewed sources, and three verifier agents checked each claim against its source (see `docs/evidence/*.md`, "Verification log").
2. **Building:** the app was written with AI assistance and checked against WCAG 2.2 AA, motion and data-visualisation guidelines.
3. **Independent review:** three AI reviewers (code, clinical accuracy, accessibility) each had their findings adversarially verified. All 33 confirmed issues were fixed.
4. **Library:** research agents wrote the condition and medicine entries and doses from NASA evidence reports, technical briefs, peer-reviewed studies and official drug labels; for every batch a verifier agent opened the cited sources, tried to refute every claim and dose number, and fixed what failed (see the Verification log in each `docs/evidence/library-*.md`).
5. **Audit:** four reviewers looked at the app as an astronaut, a crew medical officer, a flight surgeon, a judge and a screen-reader user; ran a penetration test; checked the privacy charter against the code; and researched what deep-space crew health still lacks. Each finding was adversarially verified (38 confirmed, 5 rejected), and the fixes and new tools above came from it.

The team chose the scope, reviewed the medical content and owns every decision. Vista is a prototype, not a medical device.

## Privacy

The app's **Privacy charter** makes six commitments: health data stays on the device unless you send a report; nothing leaves without a tap; no accounts, cookies, analytics, advertising or trackers; every report is shown before it is sent, only the team can read the inbox and reports are deleted after 90 days; everything can be downloaded or deleted at any time; and the source is public under the MIT license. Data leaves the device only when the user presses one of three buttons:

- "Show latest view": the chosen place's coordinates go to Microsoft Planetary Computer.
- "Check space weather": a date range and the public demo key go to api.nasa.gov.
- "Send report to flight surgeon": the previewed report goes to the team's Supabase inbox (EU, Frankfurt).

All three requests are made with cookies switched off and without a referrer; like any web request they reveal the IP address to that service. A strict Content-Security-Policy allows only the app's own files and these three services. The team (Void Voyagers) is responsible for the inbox; private questions and deletion requests go through the repository's private vulnerability-report form. The full charter is on the app's Privacy charter page (`#privacy`).

## Run it

```
python build.py          # writes dist/ (index.html, fonts, 3D assets, offline service worker, security headers for Vercel and Azure)
python -m http.server 8000 --directory dist
```

The page runs a built-in self-test on load and logs the result to the console. After the first visit it works with no connection (a service worker keeps the app, fonts and 3D model). Opening `dist/index.html` as a file also works, but other local pages could then read its storage, so use the website for real data.

To rebuild the 3D body: download BodyParts3D 4.0 (IS-A and PART-OF OBJ sets) into `tools/3d/raw`, then `python tools/3d/classify.py` and `python tools/3d/build_body.py`, quantize with `npx gltfpack -i out/body.glb -o assets/body.glb -kn -km`, and bundle the viewer with `cd tools/3d && npm install && node build.mjs`.

## Tools and open-source materials

- Plain HTML, CSS and JavaScript: one file (`vista.html`), no frameworks; the 3D viewer is a self-hosted bundle of [three.js](https://threejs.org/) (MIT) in `assets/vista3d.js`
- [BodyParts3D](https://dbarchive.biosciencedbc.jp/en/bodyparts3d/), © The Database Center for Life Science, CC Attribution-Share Alike 2.1 Japan: the 3D anatomy in `assets/body.glb` (simplified; lungs modelled; female adapted). This model file is shared under the same CC BY-SA licence; the code is MIT.
- [Archivo](https://github.com/Omnibus-Type/Archivo) and [Martian Mono](https://github.com/evilmartians/mono) fonts (SIL Open Font License, self-hosted via Fontsource)
- Hosting: Vercel, Azure Static Web Apps and GitHub
- Supabase (Postgres with row-level security) for the flight-surgeon inbox: table `public.reports`, insert-only for the public key
- `bone-module/`: the team's earlier Orbit Health bone prototype, merged into Vista's Bones & muscles panel

## Who we are

We are **Void Voyagers**, a team in the NASA Space Apps Challenge 2026. We built Vista because a crew member far from Earth should still get a clear answer to two questions: what does this reading mean, and what do I do now? Vista answers both in plain language, keeps working without a connection once it is open, and keeps health data on the device. Questions and feedback: open an issue on this repository; private questions go through its private vulnerability-report form.

## License

MIT. See [LICENSE](LICENSE).

## Disclaimer

Vista is a research and training prototype for the NASA Space Apps Challenge 2026. It does not diagnose or treat any condition and does not replace a crew medical officer, flight surgeon or doctor. The example data is made up.
