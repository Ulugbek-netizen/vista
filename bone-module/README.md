# Orbit Health — Bone Health module (prototype)

An astronaut self-monitoring tool for the NASA Space Apps challenge. This first module tracks
spaceflight bone loss: daily countermeasure logging, an estimated density-loss model per bone,
colour-coded body map, alerts that say when to contact the flight surgeon, and guidance.

## Run

No build step and no dependencies. Serve the folder and open it:

    python3 -m http.server 5173

Then open http://localhost:5173. The app loads demo data (mission day 76 of 180) on first run;
use **Mission settings** to change the mission, environment and medication plan, load the demo again, or clear logs.
Data stays in the browser (`localStorage`).

## Files

- `index.html` — layout: body map, alerts, chart, targets, daily log, guidance
- `styles.css` — dark mission-control theme, responsive down to phone width
- `js/skeleton.js` — anatomical skeleton drawing for the body map
- `js/model.js` — bone-loss model, alert rules, demo data (no DOM code)
- `js/app.js` — rendering and interaction

## Model (illustrative, not diagnostic)

Only the bones that lose the most density in space are tracked (spine/pelvis −6.2% and legs −5.4% after flight,
vs. arms/ribs −0.7% and skull +2.2%; Stavnichuk 2020 meta-analysis). Arms, ribs and skull are drawn in grey for context.

| Site | Base loss in 0 g, no countermeasures | Notes |
|---|---|---|
| Hip (femoral neck) | 1.5 %/month | Most sensitive; only ~60% recoverable after landing |
| Pelvis | 1.3 %/month | Within NASA's 1–1.5 %/month range |
| Lumbar spine | 1.1 %/month | |
| Thigh (femur shaft) | 0.8 %/month | Lower-limb rate from meta-analysis |
| Shin (tibia) | 0.8 %/month | Lower-limb rate from meta-analysis |

Daily loss = base × (1 − g) × (1 − protection). Protection is a per-site weighted mix of resistance
exercise (minutes × load vs. 45 min at 100% body weight), aerobic exercise, nutrition (calories,
protein, sodium ≤ 3000 mg, vitamin D) and bone medication. Unlogged days reuse the previous entry;
the future is projected from the 7-day average. Status: green < 2%, amber 2–5%, red ≥ 5%.

**Assumptions:** the per-site weights, linear partial-gravity scaling and recovery rates are modelling
choices, not measured values.

## Alert rules

- **Red (contact flight surgeon):** flank pain + blood in urine (kidney stone); bone pain after a fall or impact; high urine calcium in ≥ 2 of the last 3 tests
- **Amber:** ≥ 2 missed resistance sessions in 7 days; sodium > 3000 mg three logs running; body mass down > 3%; water < 2 L; weekly alendronate overdue
- **Info:** today's log not done

## Sources

- NASA HRP, *Risk of Bone Fracture due to Spaceflight-induced Changes to Bone*, Evidence Report (July 2024)
- LeBlanc et al. 2013, *Osteoporosis Int.* — ARED + alendronate 70 mg/week
- Smith et al. 2012, *JBMR* — resistance exercise + nutrition maintain BMD
- Sibonga et al. 2019, *Bone* — ARED alone does not protect hip trabecular bone
- Vico et al. 2017, *JBMR*; Gabel et al. 2022, *Sci. Rep.* — incomplete post-flight recovery
- Stavnichuk et al. 2020, *npj Microgravity* — meta-analysis of regional bone loss (148 space travellers)
- Lane et al. 2013, *Adv. Nutr.* — ISS sodium reduced to 3000 mg/day

**Prototype — not a medical device.** Medication decisions belong to flight surgeons.
