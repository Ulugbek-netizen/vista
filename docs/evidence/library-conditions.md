# Void Voyagers library: space-health conditions, research log

Research log for `kb_conditions.json` (20 entries). Compiled 2026-11-15.

## How this was done

- Started from `README.md` and the six files in `docs/evidence/` and reused the sources the team had already verified, so the entries agree with them (SANS 70%, bone 1% to 1.5% a month and 0.5% to 1% with ARED, CO2 limit 3 mmHg, PHQ-4 rule, no diuresis claim, per-virus herpes figures).
- Every source cited in the JSON was opened again in this session. NASA PDFs were fetched and their text extracted with `pdftotext -layout`; page numbers below are PDF pages of that file (printed page numbers are given where they differ). Journal papers were read through PubMed: the abstract for all of them, and the full text (PubMed Central) where marked "full text". Web pages were read directly.
- No doses or schedules anywhere. Medicines appear only as classes or names (anti-sickness medicine, decongestant, bisphosphonates, potassium citrate, blood thinners), always with "the flight surgeon decides". Several opened sources give doses (for example MTB-004 p. 7 for promethazine, LeBlanc 2013 for alendronate, Flynn-Evans 2023 for caffeine); none was copied.
- Entries were checked by script (`scripts/build_kb.py`): Void Voyagers system and check keys, kebab-case ids, https sources, no emoji, no straight double quotes, no dose-like text (the same regular expression as the app's self-test and `tools/library.py`), no common US spellings, and length. Every entry was 155 to 170 words in total, counting source titles, before the fact-check; the five entries corrected in the "Verification log" below are now 185 to 211 words (the safety and accuracy wording was kept rather than trimmed to fit).
- Correction: an earlier version of this log said every medicine carried "the flight surgeon decides". The back-pain entry's "pain relief" (analgesic medicine) and the fluid and salt loading regimen did not; both now do (see "Verification log").
- "Design rule" below marks wording that is a Void Voyagers escalation or app instruction, not a sourced fact. Where it follows a band already proposed in `docs/evidence/` (marked (D) or (P) there), that is stated. These need flight-surgeon review like the rest of the (D)/(P) bands.

Abbreviations: TB/MTB = NASA OCHMO technical brief / medical technical brief; C&V = NASA "Cardiovascular and Vision" page; HBIS = NASA "The Human Body in Space".

## 1. Space motion sickness (`space-motion-sickness`)

| Claim | Source and location |
|---|---|
| Nausea, headache, feeling unwell in the first 2 to 3 days; up to about 7 in 10 crew | MTB-004 Rev A (25 Sep 2025), p. 1 Executive Summary: "affects up to 73% of crewmembers during the first 2-3 days"; Wood slides (NTRS 20210025094), slide p. 9: incidence ~70%, resolving within 2-3 days |
| Eyes, inner ear and body disagree; brain adapts | MTB-004 p. 5, "Physiology (Space Motion Sickness)": sensory conflict theory |
| Often worse on a first flight | MTB-004 p. 3, box: "SAS is worse in first flyers"; TB-010 Rev A p. 2: incidence decreases in repeat flyers |
| Can come back after landing | MTB-004 p. 1 (Terrestrial Readaptation Motion Sickness); Wood slide p. 10: re-entry sickness ~30% after 1-2 week missions, 100% after 6 months in field tests |
| Signs: nausea, vomiting, loss of appetite, headache, sweating, pallor, dizziness, drowsiness, irritability, worse with head movement | MTB-004 p. 6, "Common SMS Symptoms" list |
| Move head slowly, limit activity | MTB-004 p. 6 attenuating factors (restricting activity, restricting head motion) and p. 8 (training to minimise head movements); Wood slide p. 10 (restriction of early activities); TB-010 p. 5 (limit head movement, consistent orientation) |
| Line up with the cabin floor, hold a handrail | Wood slide p. 10: "maintain familiar orientation wrt visual environment; maintain contact cues"; MTB-004 p. 2 ("1g orientation") and p. 6 ("applying strong tactile inputs") |
| Keep air moving, keep sipping fluids | MTB-004 p. 8, "Non-Pharmacological Countermeasures": increased air movement/circulation; maintain hydration |
| Anti-sickness medicine works well; flight surgeon decides | MTB-004 p. 7 (promethazine most effective, up to 90% initial response); p. 4 (treatment "per discretion of crew in coordination with their flight surgeon"); TB-010 p. 9 |
| Escalate: vomiting more than twice, cannot keep fluids down, still sick after 3 days | MTB-004 p. 6 grading table, "Severe (3)": more than 2 episodes of vomiting, may persist beyond 72 hours; p. 8: if severe, consider IV hydration |

## 2. Head-ward fluid shift (`headward-fluid-shift`)

| Claim | Source and location |
|---|---|
| About 2 litres move from lower to upper body | C&V page (updated 11 Mar 2025): "approximately 2 liters of fluid move from the lower to the upper body" |
| Puffy, redder face | NASA ISS blog, 27 Aug 2025: "puffy face" where the face "appears swollen and redder" |
| Face and eyelid swelling worst in the first 3 days; congestion eases within days; full head | MTB-004 p. 2, "Fluid shift symptoms": facial and periorbital edema most evident during the first 3 days; congestion lasts a few hours to a few days; facial/head fullness; C&V: "sensation of fullness in their face and head" |
| Headache, especially in the first few days | MTB-004 p. 3, "Headache": reported by up to 90% in the first few days |
| Sleep, exercise and fluids ease the headache | MTB-004 p. 3: treatment includes sleep, exercise, hydration, analgesics |
| Decongestant, allergy and pain medicines can help | MTB-004 p. 2 (congestion or allergy medications) and p. 3 (analgesics) |
| High CO2 causes similar symptoms | TB-004 Rev D (10 Mar 2026) p. 5: fluid shift "largely contributes to symptoms similar to CO2 over-exposure, including headaches"; p. 4 symptom levels |
| Escalation wording | Design rule. Consistent with `clinical-thresholds.md` pain row (sudden worst-ever headache, Urgent (D)); vision change routes to the SANS entry |

## 3. SANS (`sans`)

| Claim | Source and location |
|---|---|
| Swelling and folds at the back of the eye | NASA "Risk of SANS" page (updated 16 May 2025): optic nerve swelling, retinal folds, flattened back of the eye |
| About 70% of long-duration crew show signs | MTB-001 (21 Feb 2024) p. 3, "Pathophysiology" box |
| Vision so far always correctable with glasses | MTB-001 p. 3 (no uncorrectable vision changes reported) and p. 5 (post-flight vision correctable to 20/20 or better) |
| Fluid shift swells optic nerve and folds retina | NASA SANS page (blood and cerebrospinal fluid move towards the head) |
| Back of eye flattens, more long-sighted; risk grows with time | MTB-001 p. 5, "Hyperopic vision shifts": shift due to globe flattening; "Vision degradation risk increases the longer you are in space" |
| Signs: blurred near print, eye strain | MTB-001 p. 5 (blurred near vision, eyestrain) |
| Signs: wavy, dark or blank Amsler areas | AAO Amsler grid page (19 Dec 2025) |
| Sign: new blind spot | Brunstetter 2023 (NTRS 20220014606) abstract, "acute functional impact" tier: visual field loss (enlarged blind spot) |
| Amsler check one eye at a time | AAO page, steps 1-5 |
| At least 3 pairs of space anticipation glasses | MTB-001 p. 12, "Countermeasures & Treatment" |
| Scheduled eye exams | MTB-001 p. 8: "Eye Weeks" at flight day 30, 90 and 30 days before return |
| Escalate at once: blind spot, distorted central vision, blur beyond strongest glasses | NTRS 20220014606 abstract (acute functional impact tier); AAO ("contact your ophthalmologist right away"). Same-day report of new blur = design rule matching `musculoskeletal-neuro.md` self-report row |

## 4. Bone loss (`bone-loss`)

| Claim | Source and location |
|---|---|
| Weight-bearing bones lose 1% to 1.5% a month | HBIS (updated 26 May 2026), gravity section |
| About 0.5% to 1% a month with today's ISS exercise devices | NASA/SP-20250000273, Table 7, "Long Duration (180+ days)" ARED row |
| Bone needs load; breakdown outpaces building | MTB-013 Rev D (11 Feb 2026) p. 3, "Physiology": load-bearing stimulates bone; resorption increased, formation suppressed or stable |
| Half of lost bone expected back within about 9 months | Sibonga 2007 abstract (exponential model, 50% recovery within 9 months) |
| Silent; not measured in flight | MTB-013 p. 19, "Application": "no system to date measures bone density in-flight"; BMD loss "not usually detectable until a problem occurs" |
| Bone pain after a minor knock | MTB-013 p. 8: fracture with no history of trauma may indicate skeletal fragility (escalation wording is a design rule) |
| Heavy resistive exercise (squats, deadlifts), 6 days a week | SP-20250000273 Table 7 (ARED, 6-7 days/week; critical exercises include squat and deadlift) |
| Eat planned food, take the vitamin D provided | MTB-013 p. 8 ("first line of treatment is dietary and exercise interventions") and p. 15 table (vitamin D "prevents deficiency in space", "requires supplementation") |
| (In "why", moved from self-care) In a NASA study a bisphosphonate plus exercise prevented most bone loss; NASA has used these medicines only in research, so not routine; flight surgeon's decision | LeBlanc 2013 abstract (7 ISS astronauts; alendronate plus exercise); MTB-013 p. 17 (ARED plus bisphosphonate: no significant pre/post-flight change); MTB-013 p. 15 ("To date, NASA has not used bisphosphonates, other than in research"; GI and jaw-necrosis concerns); MTB-013 p. 8 (medicines reserved for failure of diet and exercise plus osteoporosis risk) |

## 5. Muscle and fitness loss (`muscle-and-fitness-loss`)

| Claim | Source and location |
|---|---|
| Muscles and aerobic fitness shrink without gravity | TB-033 Rev D (1 Dec 2023) p. 5, "Aerobic and muscular decrements" |
| Not equal for everyone; up to 17% performance-limiting on future missions | Scott 2023 abstract (changes from -30% to +5%; up to 17%) |
| Lower-body strength about -9%, aerobic fitness about -7% over 6 months | SP-20250000273 Table 7, "Long Duration (180+ days)": -9% lower body strength; -7.4% VO2max |
| Moon and Mars gravity probably cannot keep you fit alone | Richter 2017 abstract (below 0.4 g "seems to be insufficient") |
| Signs: loads feel harder, lower loads in the log | Descriptive, derived from the measured strength and fitness losses above; no separate source |
| After landing: weakness, heaviness, tiredness, clumsiness | TB-033 p. 15, "Musculoskeletal" (weakness, fatigue, poor coordination, feeling of heaviness) |
| 2.5 hours a day, 6 days a week | SP-20250000273, exercise prescription paragraph before Table 5 |
| Log sessions so trainers adjust the plan | SP-20250000273, same paragraph (practices "monitored and updated ... by ASCRs") |
| Aerobic fitness back after about 30 days | TB-031 (2 Oct 2023) p. 12, "Post Mission Reconditioning"; p. 2 ([V1 3017] reconditioning) |
| Escalation wording | Design rule (chest pain, fainting, injury are general red flags). NASA limits for context: TB-031 p. 2, [V1 4003] and [V1 4024], 80% of pre-flight |

## 6. Back pain from spinal lengthening (`space-adaptation-back-pain`)

| Claim | Source and location |
|---|---|
| About half get low back pain early in flight; usually mild, settles | Kerstman 2012 abstract (52%, 382/728; mild in 86%; "usually mild and self-limited"); MTB-004 p. 3 (first 2-5 days) |
| Spine stretches; curve straightens | Johnston 2010 abstract ("elongation of the spine from the lack of gravity"); MTB-004 p. 3 (back curve straightens) |
| Seated height about +6% | Young and Rajulu 2020 abstract |
| Back or neck pain after landing; disc injuries about 4 times more common, risk highest soon after flight | Johnston 2010 abstract (4.3 times; cervical share 18 of 44; risk increased immediately after spaceflight) |
| Sign: lower-back pain, most often central, in the first days of flight | Pool-Goudzwaard 2015 abstract ("most often experienced in the central area of the lower back"); MTB-004 p. 3 (first 2-5 days of flight) |
| Knees-to-chest the most effective remedy, rated 91% effective; exercise and pain medicine each rated 85% effective; flight surgeon chooses the pain medicine, dose and timing | Kerstman 2012 abstract (treatment-effectiveness ratings, not share of astronauts helped; "analgesic medications"); flight-surgeon line per MTB-004 p. 3 and the Void Voyagers medicine rule |
| Escalate: severe, unrelieved or night pain; back pain with fever or blood in urine; leg numbness or weakness; bladder or bowel control | MedlinePlus "Low back pain - acute" (reviewed 27 Jun 2026), "When to Contact a Medical Professional" (includes unexplained fever and blood in urine); MTB-003 Rev A p. 1 (kidney stone the second most likely reason for ISS emergency medical evacuation); Kerstman 2012 (risk when moderate or severe pain does not respond) |

## 7. Kidney stones (`kidney-stones`)

| Claim | Source and location |
|---|---|
| Crystals block urine flow | MTB-003 Rev A (10 Mar 2026) p. 4 (stones block drainage, urinary obstruction) |
| Second most likely reason for emergency return from the ISS | MTB-003 p. 1, Executive Summary (Integrated Medical Model) |
| Bone loss raises urine calcium; crews drink less | MTB-003 p. 5, "Spaceflight conditions that increase Renal Stone risk" |
| Urine volume about 17% lower, calcium concentration about 50% higher | NASA nutrition book (Smith et al. 2021), PDF p. 38 (printed p. 62): "about 17% lower ... 50% greater" |
| Signs: colicky pain, blood in urine, nausea or vomiting, fever | MTB-003 p. 4 (renal colic, hematuria, infection/sepsis) and p. 5 (HSRB statement: pain, nausea, vomiting, hematuria, infection) |
| 2.5 to 3 litres of urine a day; risk rises below 1.5 litres | NASA HRP renal stone evidence report (2017), p. 14, end of section V |
| Exercise protects bone and lowers urine calcium | MTB-003 p. 7, "Countermeasures/Treatment" |
| Potassium citrate on board at flight surgeon's discretion | MTB-003 p. 7 ("available on ISS for use at the flight surgeon's discretion") |
| Escalation (fever or no urine is urgent) | Design rule based on MTB-003 p. 4 complications (obstruction, infection/sepsis) |

## 8. Dehydration (`dehydration`)

| Claim | Source and location |
|---|---|
| 40% met a sports-medicine definition of dehydration | Nutrition book, PDF p. 33 (printed pp. 52-53), Figure 21 caption |
| Thirst seems weaker in flight | Nutrition book, same page, "Diuresis and Dehydration" (reduced thirst, reason unknown) |
| Space sickness adds to the gap | MTB-004 p. 3 (nausea and vomiting increase dehydration risk) |
| Long exercise adds to the gap | TB-027 Rev C (29 Nov 2023) p. 2 (exercising for over 60 minutes) |
| 2.5% body-weight water loss harms decisions, concentration, performance | TB-027 p. 2 |
| Signs: less urine, headache, feeling ill, poor concentration, confusion, sleepiness | TB-027 p. 2, "Signs and symptoms of dehydration" |
| Personal daily target | Void Voyagers's target uses NASA's requirement, nutrition book PDF p. 11, Table 1 (32 mL per kg; at least 2,100 mL women, 2,500 mL men) |
| Pale urine, chart shades 1 to 3 | McKenzie and Armstrong 2017 abstract ("aim for a 1, 2, or 3") |
| Drink extra when sick or vomiting | MTB-004 p. 8 (maintain hydration) |
| Escalation | Design rule; MTB-004 p. 8 (severe cases may need IV hydration) |

## 9. Feeling faint after landing (`orthostatic-intolerance`)

| Claim | Source and location |
|---|---|
| More than 60% affected without countermeasures | C&V page |
| Blood volume falls; blood pools in the legs | TB-033 p. 15, "Cardiovascular" (relative intravascular depletion); TB-051 (21 May 2026) p. 5 (garments prevent pooling in the lower extremities) |
| 2 of 6 ISS astronauts finished the tilt test on landing day; 13 of 15 three days later | Lee 2015 abstract |
| Signs: dizziness, fast heartbeat, low blood pressure, blurred vision, nausea, weakness | TB-033 p. 15, "Cardiovascular" symptoms |
| Compression garment, fluid and salt loading before re-entry; amounts and timing from the flight surgeon and entry checklist | TB-051 p. 5, "Orthostatic Intolerance Countermeasures (V2 7042)" and "Fluid/salt Loading Regimens" (salt tablets with water, "amount based on weight"); TB-033 p. 15 |
| Move slowly, accept help | TB-051 p. 12 ("often need assistance with basic movements"); TB-033 p. 15 (assistance with ambulation, slow progressive increase in activity) |
| Mars: a message can take over 20 minutes each way; Mission link shows today's delay; crew support each other | ESA Mars Express blog, Ormston 2012 (maximum around 24 minutes one way); project README (44-minute reply from a Mars base); HBIS (solve problems as a team; its "up to 20 minutes one-way" understates the maximum and is no longer used) |
| Escalation | Design rule |

## 10. Sleep loss and body-clock misalignment (`sleep-loss-and-circadian-misalignment`)

| Claim | Source and location |
|---|---|
| About 6 hours a night on the ISS; most used sleep medicine | Barger 2014 abstract (6.09 h; 12 of 16 ISS crew, 75%) |
| 8.5-hour sleep period planned | NASA-STD-3001 Vol 1 Rev C, p. 50, section 6.1, [V1 6001] rationale item c |
| 16 sunrises and sunsets; workload and schedules | NASA "Risk from Inadequate Sleep and Irregular Schedules" (updated 16 May 2025) |
| Misaligned sleep about an hour shorter; poorer | Flynn-Evans 2016 abstract (6.4 vs 5.4 h; lower quality) |
| Mars day about 40 minutes longer | Barger 2012 abstract (24.65 h) |
| Daytime tiredness and sleepiness when misaligned | Barger 2012 abstract |
| Same sleep times each day | [V1 6001] rationale (consistent timing of sleep opportunities) |
| Dark, quiet sleep station; avoid blue light | NASA behavioural evidence report (2025) p. 63 (sleep environment: noise, darkness, avoid blue-spectrum light); TB-016 p. 8 |
| Sleep medicine can slow waking for alarms | Behavioural evidence report p. 63 (impaired alertness on waking, impaired waking to caution warnings; individual tolerance testing) |
| Escalate if the 7-day average is under 6 hours | Design rule matching `clinical-thresholds.md` sleep row (D) and `behavior-sleep-immune.md` T01; the 6-hour anchor is Jones 2022 |

## 11. Isolation, low mood and crew conflict (`isolation-mood-and-crew-conflict`)

| Claim | Source and location |
|---|---|
| Stress, low mood, anxiety, relationship problems | TB-016 Rev B (24 Oct 2023) p. 3, "Background" |
| Confinement, workload, sleep, family worries, CO2 | TB-016 p. 1 (isolated, confined environments) and p. 3 (contributing factors incl. sleep, workload, carbon dioxide; family and life stressors) |
| Mars-500: conflicts with mission control 5 times more often | Basner 2014 abstract |
| Signs: withdrawal; friction | TB-016 p. 5 (acute social withdrawal after delayed news); Basner 2014 (conflicts) |
| Shared meals, exercise, personal time | Behavioural evidence report p. 63 (communal eating most reported cohesion practice) and p. 66 (exercise maintains positive mood; personal time) |
| Journal; look at and photograph Earth | TB-016 p. 7; behavioural evidence report p. 66 |
| Private psychological conference about every 2 weeks, confidential | Behavioural evidence report p. 60 ("every 2 weeks for at least 15 minutes"; "confidential venting") |
| PHQ-4 pair score of 3 or more needs follow-up | PHQ and GAD-7 instruction manual p. 2 and p. 6 (PHQ-2 or GAD-2 of 3 or more should prompt the full PHQ-9/GAD-7 and a clinical interview; PHQ-4 = PHQ-2 + GAD-2) |
| Thoughts of self-harm: tell CMO and flight surgeon at once | Design rule matching `clinical-thresholds.md` PHQ-4 Urgent (D); the PHQ-4 has no self-harm item |

## 12. Fatigue and slowed reactions (`fatigue-and-slowed-reactions`)

| Claim | Source and location |
|---|---|
| Under 6 hours linked to slower responses and more stress | Jones 2022 abstract |
| In Earth-based mission staff on Mars-day shifts, 21 hours or more awake lowered performance and alertness | Barger 2012 abstract (Phoenix Mars Lander science and technical personnel, not astronauts) |
| NASA avoids scheduling critical tasks at the body-clock low, typically 1 to 7 am on your usual sleep schedule | NASA-STD-3001 Vol 1 Rev C p. 50, [V1 6001] rationale item e ("relative to one's regular sleep schedule") |
| 3-minute reaction test (PVT-B) | Basner 2011 abstract; Jones 2022 (Reaction Self-Test every 4 days in flight) |
| Short planned nap; allow time to wake (sleep inertia) | Rosekind 1995 abstract; [V1 6001] item g lists naps among countermeasures |
| Caffeine helps alertness but disturbs the next sleep | Flynn-Evans 2023 abstract |
| Escalation and "test regularly" | Design rule, consistent with the personal-baseline PVT band in `behavior-sleep-immune.md` T03 (P) |

## 13. Radiation exposure and solar particle events (`radiation-exposure`)

| Claim | Source and location |
|---|---|
| Invisible; raises cancer risk | NASA "Hazard: Space Radiation" (updated 5 Jun 2025); TB-020 Rev G (6 Jun 2025) p. 2, "Risks of Radiation Exposure" |
| A big solar storm can cause sickness without shielding | TB-020 p. 2 (acute radiation syndromes from SPEs: nausea, vomiting, fatigue; shielding and monitoring minimise the risk) |
| Shielding cuts solar-storm dose about 50%, cosmic-ray dose about 7% | TB-020 p. 8, "Shielding Materials" |
| Protons can arrive within tens of minutes | NOAA SWPC "Solar Radiation Storm" page |
| Moon surface cosmic-ray dose about 2.6 times ISS | Zhang 2020, full text, Discussion |
| Signs: dosimeter, alarm, nausea, vomiting, tiredness | NASA SRAG page (updated 24 Sep 2025: dosimeters log exposure; ISS-RAD alarm when crew may need to shelter); TB-020 p. 2 |
| Go to shelter; water bags cut the dose | NASA SRAG page (shelter in higher-shielded areas); TB-020 p. 9 table (stowage shelter, 210-259 mSv down to 65-83 mSv) and p. 10 (rearranging water containers) |
| Ending a spacewalk within 2 hours with shielding gives very high protection | TB-020 p. 10, "Design Considerations" |
| "Log it daily"; escalation | Design rule (Void Voyagers dose check); symptoms from TB-020 p. 2 |

## 14. High cabin CO2 (`high-cabin-co2`)

| Claim | Source and location |
|---|---|
| CO2 builds up in a closed cabin | TB-004 Rev D p. 1, Executive Summary |
| Each 1 mmHg doubled headache odds; under 2.5 mmHg weekly keeps risk below 1% | Law 2014 abstract; TB-004 p. 5, "CO2-Induced Headaches" |
| Pockets where air does not move; sensors may miss them | TB-004 p. 5 (local fluctuations not measured by fixed sensors) and p. 18 ([V2 6107] ventilation to prevent CO2 pockets) |
| NASA one-hour limit 3 mmHg | TB-004 p. 4 and p. 6, [V2 6004] |
| Signs: frontal headache, tiredness, poor sleep, malaise, cough, blurred vision, nausea | TB-004 p. 4 symptom list (2.8-4.5 mmHg headaches; cough, poor sleep, blurred vision, frontal headache at 3.5; fatigue, malaise, poor sleep, nausea above 4.5) |
| Report readings above 3 mmHg | TB-004 p. 7 (Flight Control Team acts if the average is exceeded) |
| "Several crewmates at once", checking CO2 when headaches start, escalation | Design rule (cabin cause cross-check, as in README "Cross-reading findings") |

## 15. Skin rashes, dry skin and slow healing (`skin-problems-and-slow-healing`)

| Claim | Source and location |
|---|---|
| Rashes the most common immune-related event on long ISS missions; red, irritated patches anywhere | Crucian 2016 abstract (1.12 per flight-year; redness with irritation on a variety of body locations) |
| Skin thins; wound healing altered | Nguyen and Urquieta 2022 abstract (review) |
| Dry skin; slower healing; infection risk; limited hygiene | Henke 2025 abstract (xerosis, slow wound healing, increased infection risk; limited hygiene) |
| Immune system changes | NASA "Risk of Altered Immune System Responses" (updated 16 May 2025) |
| Hygiene may prevent some problems | Nguyen and Urquieta 2022 abstract |
| Escalate a rash that lasts, spreads or does not respond | Crucian 2016 ("notable" events: prolonged or unresponsive to treatment) |
| Skin checks, creams as advised, infected wound | Design rules |

Caution: no human in-flight wound-healing outcome data were found; the healing statements rest on reviews of cell and animal work, hence "may".

## 16. Immune changes and dormant-virus reactivation (`immune-changes-and-virus-reactivation`)

| Claim | Source and location |
|---|---|
| Immunity weakened; dormant viruses wake; cold sores | NASA immune risk page (radiation, microgravity, poor sleep; cold sores, rashes, atypical allergies, infections) |
| Stress hormones and lower cell immunity | Rooney 2019 abstract |
| EBV 96%, VZV 65% shedding on ISS, usually without symptoms | Rooney 2019 abstract (per-virus figures, as in `behavior-sleep-immune.md` BSI-27) |
| Several had shingles in flight | Rooney 2019 full text, "Viral Reactivation" section |
| Cold-like symptoms | Crucian 2016 abstract (upper respiratory symptoms 0.97 per flight-year) |
| Shingles: painful blistering rash in a stripe on one side; face can affect the eye | CDC "Shingles Symptoms and Complications" (19 Apr 2024) |
| Fitter crew 29% lower risk | Agha 2020 abstract |
| Rash near the eye needs the flight surgeon at once | CDC shingles page (vision loss); Rooney 2019 full text (VZV can spread to the retina) |

## 17. Blood clots in veins (`venous-blood-clots`)

| Claim | Source and location |
|---|---|
| 2019 study: blocking clot in a neck vein of an ISS astronaut; no symptoms; blood thinners for the rest of the flight | Marshall-Goebel 2019, abstract and full text (Results: found on flight day 50, treated with anticoagulants for the remaining duration; Discussion: thrombi were asymptomatic) |
| Fluid shift slows neck-vein flow; stagnant or reversed in 6 of 11 at about day 50 | Marshall-Goebel 2019 abstract; C&V page (slow, stagnant flow in veins that drain the head); TB-033 p. 5 |
| Clots found on ultrasound; NASA scans crew in flight | Pavela 2022 abstract (surveillance at three points in flight) |
| DVT signs in arm or leg; PE signs | CDC "About Venous Thromboembolism" (5 Mar 2025) |
| PE signs are an emergency | CDC page ("seek medical help immediately") |
| "Never start a blood thinner yourself"; neck swelling in the escalation | Design rules (no source lists neck-vein symptoms) |

## 18. Eye injury from floating debris (`eye-injury-from-floating-debris`)

| Claim | Source and location |
|---|---|
| Foreign-body scratches were 70 of 104 recorded eye problems (Shuttle and ISS to 2006) | Suh 2025, full text, "Corneal abrasion" |
| Particles float on air currents into eyes; food, lint, LiOH (filter) dust, aluminium particles; dry eyes scratch more easily | Suh 2025, "Risk factors for corneal abrasions during spaceflight" and "Treatment and countermeasures" |
| Signs: foreign-body feeling, pain, watering, light sensitivity, blurred vision | Suh 2025, "Corneal abrasion" |
| Grit or dust: rinse with artificial tears, then the eyewash goggles; check each eye's vision | Suh 2025, "Treatment and countermeasures to corneal abrasions during spaceflight" (artificial tears for minor particle abrasions) |
| Chemical splash: flush with the eyewash goggles straight away and keep flushing while a crewmate calls the flight surgeon | Suh 2025, chemical injury section (immediate copious irrigation for at least 30 min is critical; space goggles can flush continuously) |
| Goggles for dusty work | TB-011 Rev C (28 Nov 2023) p. 5 (goggles and masks against dust) |
| Chemical burns and penetrating injuries are planned-for conditions | TB-033 p. 13 (ophthalmic conditions); Suh 2025 (scarring and vision loss without treatment) |
| "Sudden vision loss" | Design rule |

## 19. Decompression sickness (`decompression-sickness`)

All from TB-037 Rev D (5 Oct 2026): p. 1 (bubbles from rapid pressure drops, cabin to suit), p. 3 (Type I and Type II symptom lists, including cutaneous marmorata), p. 4 (dehydration and vigorous or resistive exercise after decompression raise risk), p. 9 (prebreathe replaces nitrogen; breaks in prebreathe reintroduce it), p. 10 (most cases at 60-240 minutes), p. 11 (no Type II event in NASA spaceflight), p. 6 (treatment: oxygen and suit plus cabin pressure). "Report any symptom at once" is a design rule. No Void Voyagers check fits, so `checks` is empty (the app allows this).

## 20. Moon and Mars dust (`moon-and-mars-dust`)

| Claim | Source and location |
|---|---|
| Fine, sharp dust; deepest-reaching small particles | TB-011 p. 2 sidebar (mostly 0.02-5 µm; smaller particles most deeply respirable) and p. 3 (sharp edges) |
| Apollo: eye irritation; most had nasal congestion, partly blamed on dust | TB-011 p. 2, "Recommendations from Crew" |
| Dust tracked inside and floating in weightlessness | TB-011 p. 2 |
| Sneezing; skin irritation under gloves and fingernails; masks and goggles | TB-011 p. 5 |
| Clean suits, airlock, vacuum, wipe, HEPA filters, rinse eyes and nose | TB-011 p. 2 and p. 6 |
| Mars dust storms may irritate eyes | Suh 2025, "Risk factors for corneal abrasions" |
| Escalation | Design rule (TB-011 p. 5: the respiratory system is the most sensitive) |

## Could not source, so left out

- "Bird legs" and the claim that the fluid shift persists for the whole flight (not stated in the pages opened in this session).
- Early "space diuresis": MTB-004 and TB-033 describe it, but the NASA nutrition book (PDF p. 33) says it has never been confirmed. Not used, as in `cardio-metabolic.md`.
- Symptoms of a neck (jugular) clot: the only in-flight clot was found on ultrasound with no symptoms, and CDC lists signs only for arms and legs. Neck swelling is in the escalation as a Void Voyagers design choice.
- Human in-flight wound-healing data: none found; entry says "may".
- Advice to moisturise dry skin, to avoid rubbing the eye, and taste changes from congestion: no source opened, omitted.
- Mars radiation numbers (MSL-RAD): not reopened this session, so only the Moon figure is given.
- Specific ISS medical-kit contents and all doses: deliberately not included.

## Sources opened (all cited in the JSON)

NASA: MTB-004 Rev A; TB-010 Rev A; TB-033 Rev D; TB-004 Rev D; MTB-001; MTB-003 Rev A; MTB-013 Rev D; TB-031; TB-027 Rev C; TB-051; TB-016 Rev B; TB-020 Rev G; TB-011 Rev C; TB-037 Rev D; NASA-STD-3001 Vol 1 Rev C; NASA/SP-20250000273; renal stone evidence report (2017); behavioural evidence report HRP-ER-BMED-HFBP-20250210; Smith et al., Human Adaptation to Spaceflight: The Role of Food and Nutrition (2021); Wood slides NTRS 20210025094; Brunstetter NTRS 20220014606; web pages C&V, Risk of SANS, The Human Body in Space, sleep risk, immune risk, Hazard: Space Radiation, SRAG, ISS blog 27 Aug 2025.
Other agencies and guidance: ESA Mars Express blog (Ormston 2012); NOAA SWPC; CDC (blood clots, shingles); AAO Amsler grid; MedlinePlus low back pain; PHQ and GAD-7 manual.
Journals (via PubMed; DOI links in the JSON): Kerstman 2012; Pool-Goudzwaard 2015; Johnston 2010; Young 2020; Lee 2015; Barger 2014; Flynn-Evans 2016; Barger 2012; Jones 2022; Basner 2011; Rosekind 1995; Flynn-Evans 2023; Basner 2014; Law 2014; Zhang 2020 (full text); Crucian 2016; Nguyen 2022; Henke 2025; Rooney 2019 (full text); Agha 2020; Marshall-Goebel 2019 (full text); Pavela 2022; Sibonga 2007; LeBlanc 2013; Scott 2023; Richter 2017; McKenzie 2017; Suh 2025 (full text).

## Verification log

Fact-check of 10 corrections, 2026-11-15. Each was re-checked against its cited source before it was applied: local NASA PDF text (`src/*.pg.txt`) for MTB-013, MTB-004, MTB-003, TB-051 and NASA-STD-3001; the PubMed Central full text (`src/suh2025.txt`) for Suh 2025; PubMed abstracts for Kerstman 2012, Barger 2012, Pool-Goudzwaard 2015 and LeBlanc 2013 (Europe PMC); the live MedlinePlus and ESA pages; and the project README. The checks from `scripts/build_kb.py` (no dose-like text, no emoji, no straight double quotes, UK spelling, https sources) passed afterwards; the script used is `scripts/apply_fc.py`. Pre-fix copies: `kb_conditions.pre-fc.json`, `kb_conditions.pre-fc.md`.

| # | Entry and field | Severity | Result | Reason |
|---|---|---|---|---|
| 1 | `eye-injury-from-floating-debris` selfcare[1] | high | Applied | Suh 2025 confirmed: artificial tears are for "minor particle abrasions"; for chemical injury, immediate copious irrigation (at least 30 min) "is critical", and the space goggles can flush continuously. The entry now tells the crew to start flushing at once for a chemical splash. |
| 2 | `bone-loss` selfcare[2], moved to why | medium | Applied | MTB-013 Rev D p. 15 confirmed: "To date, NASA has not used bisphosphonates, other than in research", with GI and jaw-necrosis concerns; p. 8 reserves medicines for failure of diet and exercise plus osteoporosis risk. LeBlanc 2013 (7 astronauts) and MTB-013 p. 17 support the "prevented most bone loss" wording. Self-care now has 2 items. The team evidence file `musculoskeletal-neuro.md` was not found in this workspace; `kb_meds.md` records the same MTB-013 p. 15 point. |
| 3 | `space-adaptation-back-pain` selfcare[1] | medium | Applied | Kerstman 2012 abstract confirmed: "analgesic medications" and exercise were each "85% effective" (an effectiveness rating). The flight-surgeon line was added. |
| 4 | `fatigue-and-slowed-reactions` why | low | Applied | Barger 2012 abstract confirmed: subjects were Phoenix Mars Lander science and technical staff on Earth working a 24.65 h Mars day; prolonged wakefulness of 21 h or more lowered performance and alertness. |
| 5 | `fatigue-and-slowed-reactions` why | low | Applied | NASA-STD-3001 Vol 1 Rev C p. 50, item e confirmed: nadir "typically between 1-7 AM relative to one's regular sleep schedule". |
| 6 | `space-adaptation-back-pain` selfcare[0] | low | Applied | Kerstman 2012 abstract confirmed: "The most effective treatments were fetal positioning (91%)", an effectiveness rating, not the share of all affected astronauts. |
| 7 | `space-adaptation-back-pain` signs[0] | low | Applied | No opened source says "dull ache or stiffness". Pool-Goudzwaard 2015 abstract confirmed: pain "most often experienced in the central area of the lower back during spaceflight"; MTB-004 p. 3 gives "first 2-5 days of flight". Pool-Goudzwaard 2015 was added to the entry's sources. |
| 8 | `space-adaptation-back-pain` escalate | low | Applied | MedlinePlus (review date 27 Jun 2026) confirmed: "Unexplained fever with back pain" and "Burning with urination or blood in your urine" are on its contact-right-away list. MTB-003 Rev A p. 1 confirmed that a kidney stone is the second most likely reason for emergency medical evacuation from the ISS. |
| 9 | `orthostatic-intolerance` selfcare[2] | low | Applied | ESA Mars Express blog confirmed a maximum one-way delay of around 24 minutes; the project README says a Mars-base reply "can take 44 minutes". The ESA blog was added to the entry's sources, because HBIS (the old source) gives only "up to 20 minutes". |
| 10 | `orthostatic-intolerance` selfcare[0] | low | Applied | TB-051 p. 5 confirmed: crew "consume water with salt tablets or an alternative solution, amount based on weight". The flight-surgeon and checklist line was added. |

Applied: 10. Skipped: 0. Entries: 20 (unchanged; no entry added or removed).

Knock-on effects:
- The five corrected entries now run 185 to 211 words including source titles, which is above the old 155 to 170 range and the build script's 175-word "long" flag. That flag is a warning, not a failure. The safety wording was kept rather than trimmed.
- `scripts/_entries.py` and `scripts/build_kb.py` still hold the old wording. Re-running `build_kb.py` would undo these fixes until the same changes are made there.
