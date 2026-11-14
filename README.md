# Vista: stay well beyond Earth

**Team Void Voyagers · NASA Space Apps Challenge 2026**
Challenge: *Create Health Monitoring Software for Astronauts on Space Missions*

Vista gives astronauts a clear view of their own health, far from Earth. In this self-check app, a crew member logs a reading in under a minute and gets a plain-language verdict with a colour, a shape and a word. The app then says exactly what to do: look after yourself, tell your crew medical officer, or call the flight surgeon. The advice changes with the mission: low-Earth orbit, a Moon base, the cruise to Mars or a Mars base, where a reply from Earth can take 44 minutes.

- **Live app:** https://vista-health.vercel.app (Vercel) · mirror on Azure Static Web Apps: https://black-sky-0803de80f.8.azurestaticapps.net
- **Source:** https://github.com/Ulugbek-netizen/vista (one HTML file, no dependencies; once open, the checks work without a connection)
- **Research documentation:** [docs/Vista-Research-Documentation.docx](docs/Vista-Research-Documentation.docx) (26 pages: methods, every threshold and its source, the bone and Mission link models, validation, privacy and limitations)

## Why it matters

Spaceflight changes the body fast. About 2 litres of fluid shift towards the head, weight-bearing bone can lose 1–1.5% a month, ISS crews average about 6 hours of sleep a night (Barger 2014), and the cosmic-ray dose on the Moon's surface is about 2.6 times that inside the ISS (Zhang 2020). The further a crew travels, the longer it waits for help: an emergency return from the station takes about a day, from the Moon 3–11 days, and there is no early return from Mars. Crews must notice, judge and act on their own health. Vista gives them a simple, trustworthy routine for that.

## How it works

- **15 checks a crew member can do alone:** resting heart rate, blood pressure, SpO₂, cabin CO₂, temperature, sleep, mood, the PHQ-4 wellbeing screen, a 3-minute psychomotor vigilance test (PVT-B, playable in the app), near vision with an Amsler grid, fluids, exercise, body mass, finger-stick glucose and the radiation dosimeter. Each has step-by-step instructions written for people with no medical training.
- **Four levels, never colour alone:** Nominal, Watch, Act and Urgent, each with its own icon shape and word. Thresholds come from clinical early-warning ranges (NEWS2, AHA/ACC 2025, ADA 2026, AASM) and NASA limits (NASA-STD-3001). Where no fixed number exists, the app compares the reading with the crew member's own baseline. Red-flag symptoms raise the level, and symptoms that matter only with an abnormal value (back pain with very high blood pressure, for example) count only then.
- **When to call for help:** a four-step escalation ladder, worded for each environment's signal delay.
- **Mission link:** today's distance from Earth and radio delay for the chosen environment (station, Moon base, Mars transit, Mars base), with an orbit map. Mars and Moon positions come from JPL's "Approximate Positions of the Planets" (Standish) and the main lunar terms in Meeus, *Astronomical Algorithms*, checked against NASA JPL Horizons: Earth–Mars distance within 0.02% for 2026–2030 (0.2 s of delay), the Moon within 110 km. On a Mars base it shows the earliest possible reply from Earth (about 22 minutes on 14 November 2026) and predicts solar conjunctions, when Mars is within 2° of the Sun and contact pauses (next: about 12–29 March 2028). The Mars transit position is modelled on a Hohmann transfer from the mission start date.
- **Anatomical body map:** a front-view adult figure drawn to real body proportions (175 cm stature, standard anthropometric landmarks) in natural tissue colours: the full skeleton (skull, spine C3 to coccyx, 12 rib pairs with costal cartilages, sternum, clavicles, scapulae, arms and hands down to the finger bones, pelvis, legs and feet), brain, eyes, larynx, trachea and lungs with their lobes, diaphragm, heart with the great vessels and the main arteries and veins of the neck and limbs, thyroid, liver, gallbladder, oesophagus, stomach, pancreas, small and large intestine, appendix, kidneys (shown dashed where the gut covers them), adrenal glands, ureters, bladder, thymus, spleen and lymph nodes. Each body system is outlined in its current status colour and glows when it needs attention; a **Status colours** switch fills every organ with its system's status colour for a fast read under stress (the word and icon stay beside every colour). Tap a system to see what it does, how spaceflight affects it, which of NASA's five hazards apply, and its latest readings.
- **Bone density on measured data:** a per-site projection (hip, pelvis, lumbar spine, thigh, shin) from launch to one year after landing, built on loss rates measured in astronauts (Lang 2004; Stavnichuk 2020, 148 space travellers), the effect of today's ISS exercise equipment (NASA 2025 review) and bone medication (LeBlanc 2013), and the measured 9-month recovery half-life (Sibonga 2007). It is drawn against the NASA-STD-3001 limits for the hip, lumbar spine and femoral neck; the 5% line for the pelvis, thigh and shin is a Vista design choice. A table in the app lists every source.
- **Flight-surgeon inbox:** "Send report to flight surgeon" shows the crew member exactly what will be sent (current readings, findings, mission environment, optional callsign), then delivers it to the team's Supabase inbox. Row-level security makes the table insert-only for the public key, so reports cannot be read back through the app.
- **Trends:** charts with status zones, keyboard-readable tooltips and a data table.
- **Routine and motivation:** a daily checklist with streaks, XP, levels and badges.
- **Cross-reading findings:** for example sleep debt over 7 days, a resting heart rate creeping above baseline, fever with a fast pulse, or low oxygen with high CO₂ (suspect the cabin air).
- **Window to Earth:** for isolation and wellbeing, the latest clear NASA satellite view of a place that matters to you.
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

The team chose the scope, reviewed the medical content and owns every decision. Vista is a prototype, not a medical device.

## Privacy

The app's **Privacy charter** makes six commitments: health data stays on the device; nothing leaves without a tap; no accounts, cookies, analytics, advertising or trackers; every report is shown before it is sent and only the flight-surgeon inbox receives it; everything can be downloaded or deleted at any time; and the source is public. In short: no accounts, no cookies, no analytics, no trackers, and no third-party fonts or scripts. Readings stay in the browser's local storage on the device. Data leaves the device only when the user presses one of three buttons:

- "Show latest view": the chosen place's coordinates go to Microsoft Planetary Computer.
- "Check space weather": a date range goes to api.nasa.gov.
- "Send report to flight surgeon": the previewed report goes to the team's Supabase inbox (EU, Frankfurt).

All three requests are made with cookies switched off and without a referrer. A strict Content-Security-Policy allows the app's own script and these three services only. The full charter is on the app's Privacy charter page (`#privacy`).

## Run it

```
python build.py          # writes dist/ (index.html, fonts, security headers for Vercel and Azure)
python -m http.server 8000 --directory dist
```

Or just open `dist/index.html` in a browser. The page runs a built-in self-test on load and logs the result to the console.

## Tools and open-source materials

- Plain HTML, CSS and JavaScript: one file (`vista.html`), no frameworks
- [Archivo](https://github.com/Omnibus-Type/Archivo) and [Martian Mono](https://github.com/evilmartians/mono) fonts (SIL Open Font License, self-hosted via Fontsource)
- Hosting: Vercel, Azure Static Web Apps and GitHub
- Supabase (Postgres with row-level security) for the flight-surgeon inbox: table `public.reports`, insert-only for the public key
- `bone-module/`: the team's earlier Orbit Health bone prototype, merged into Vista's Bones & muscles panel

## Disclaimer

Vista is a research and training prototype for the NASA Space Apps Challenge 2026. It does not diagnose or treat any condition and does not replace a crew medical officer, flight surgeon or doctor. The example data is made up.
