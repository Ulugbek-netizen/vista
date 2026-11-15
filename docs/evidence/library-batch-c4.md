# Vista library, batch c4: research log

Research log for `c4.json` (10 condition entries). Compiled 2026-11-15. Built and checked by `kb2/build_c4.py` (Vista system and check keys, kebab-case ids, https sources, no emoji, no double quotes, ASCII only, the app's dose-like regular expression, common US spellings, summary of 2 sentences or fewer). Text length is 165 to 190 words per entry (plus 12 to 24 words of source titles), a little above the 120-170 target; the extra words are safety and escalation wording.

## How this was done

- Read `kb/kb_conditions.json`, `kb/kb_meds.json` and `docs/evidence/library-*.md`, `radiation-environment.md`, `behavior-sleep-immune.md`, `framework.md` for tone and already-verified sources.
- Every source cited was opened in this session. NASA PDFs: local text in `kb/src/*.pg.txt` (TB-004, TB-010, TB-016, TB-020, TB-051, NASA-STD-3001 Vol 1 Rev C, BMED evidence report, PHQ manual, Wood slides) or newly downloaded to `kb2/src/` and extracted with `pdftotext -layout` (TB-035 Rev C, Limardo 2021, Antonsen 2017; Beven 2017 was opened but not used). Page numbers below are PDF pages. Journal papers were read through PubMed: abstract for all; full text (PMC) where marked. Web pages were fetched directly.
- No doses, no dose schedules and no named medicines with amounts. Medicines appear only as classes ("pain relief medicine", "antifungal treatment", "antidepressants") with "the flight surgeon decides".
- "Design rule" marks wording that is a Vista instruction or escalation choice rather than a sourced fact. These need flight-surgeon review.

Abbreviations: TB = NASA OCHMO technical brief; STD1 = NASA-STD-3001 Vol 1 Rev C; BMED = NASA HRP evidence report "Risk of Adverse Cognitive or Behavioral Changes and Psychiatric Disorders" (approved 10 Feb 2025).

## 1. Headache and migraine (`headache-and-migraine`)

| Claim | Source and location |
|---|---|
| In one ISS study 22 of 24 astronauts had at least one headache; most mild | van Oosterhout 2024, Neurology (full text PMC11033988), Results "Headache Episodes": 378 episodes in 22/24 (91.7%); mild 124/193 (64.2%) |
| First week: linked to space motion sickness, migraine-like; nausea, vomiting, nasal congestion, facial oedema | Same, abstract and Results: week 1 migraine 12/51 (23.5%) vs 5.1% later; nasal congestion 52.9%, facial oedema 41.2%, nausea 17.6%, vomiting 9.8%; Discussion: sensory conflict / space motion sickness |
| Later mostly milder pressing tension-type headaches, possibly from head-ward fluid shift | Same, Results (131/138 TTH after week 1; pressing 40%) and Discussion (cephalad fluid shift hypothesis; "We can only speculate") - hence "possibly" |
| Pressing or heavy ache | Same, Table 2: pressing 40.0%, heavy feeling 14.9% |
| High cabin CO2 can cause headaches; NASA 1-hour average limit 3 mmHg to limit headaches | TB-004 Rev D, p. 5 "CO2-Induced Headaches": [V2 6004] limits average 1-hour ppCO2 to no more than 3 mmHg to keep headache incidence below 1.4%. Note: van Oosterhout found no association with CO2 in their prospective data (Results, "Headache and Environmental Factors"); entry says "can", not "usually" |
| Sleep, fluids and exercise often helped | van Oosterhout, Results "Treatment and Countermeasures": sleeping 42.1%, hydration 39.5%, exercise 21.1% of alternative measures; Discussion: relief after sleep, exercise, rehydration, coffee |
| Pain relief medicine helped in most treated episodes | Same: good efficacy in 73/84 (86.9%) episodes; NSAIDs 77.0%, acetaminophen 16.1%. Medicine class only; "flight surgeon decides" is a design rule |
| Emergency red flags (sudden extremely painful; weakness, numbness; confusion; speaking difficulty; seizure; loss of vision; high temperature with stiff neck; head injury) | NHS Headaches (reviewed 17 Apr 2024), "Call 999 or go to A&E" list |
| "Tell your crew medical officer about severe, recurring or hard-to-treat headache" | Design rule |

## 2. Anxiety and panic (`anxiety-and-panic`)

| Claim | Source and location |
|---|---|
| Stress and anxiety are common behavioural health concerns in flight | TB-016 Rev B, p. 3 Background: "Common behavioral health conditions ... may include stress, depression, anxiety, relationship problems, and grief" |
| Sleep, workload, family stressors, hypoxia and CO2 contribute | TB-016 p. 3: contributing factors list (sleep, workload, hypoxia, carbon dioxide exposure) and individual factors (family and life stressors) |
| Mild anxiety has occurred; no behavioural emergency reported | BMED p. 9: "subclinical mood and anxiety disturbances have occurred, no behavioral emergencies have been reported to date" |
| Signs: worry that is hard to control, feeling tense or restless, poor sleep | NHS Generalised anxiety disorder symptoms (reviewed 22 Oct 2024): worry "difficult to control", restless, tense, difficulty sleeping |
| Panic symptoms (racing heart, sweating, trembling, breathlessness, dizziness, chest pain); 5 to 20 minutes; breathe slowly and deeply; it will pass | NHS Panic disorder (reviewed 22 Aug 2023), symptoms list and "Most panic attacks last between 5 and 20 minutes"; "breathe slowly and deeply" |
| Body causes must be ruled out first; check HR, SpO2, CO2 | PHQ manual p. 4 note: panic disorder diagnosis requires "ruling out a physical disorder"; TB-004 p. 1 CO2 causes dyspnoea; TB-016 p. 3 hypoxia and CO2 as factors. Choice of checks is a design rule |
| Private psychological conferences | TB-016 p. 6, item 3 |
| PHQ-4 anxiety pair 3 or more: talk to flight surgeon or psychologist | PHQ manual p. 2 and p. 6: PHQ-2 or GAD-2 score of 3 or more is the screening cutpoint. Same rule as the existing library entry |
| Chest pain, fainting, low SpO2 or high CO2: crew medical officer at once, treat as physical | Design rule |

## 3. Depression (`depression`)

| Claim | Source and location |
|---|---|
| Low mood most of the day, every day, for more than 2 weeks | NHS Depression symptoms (reviewed 5 Jul 2023): see a GP if symptoms "for most of the day, every day, for more than 2 weeks" |
| Can affect healthy, high-functioning people | BMED p. 27: high-functioning astronauts with no history "are not immune from developing depression" |
| 2 of 7 Shuttle-Mir astronauts reported depressive symptoms; depression may have contributed to early end of Soyuz T14-Salyut 7 (1985) | TB-016 p. 5 "Reported Behavioral Health Issues during Spaceflight" |
| Risk rises with mission length and distance from Earth | BMED p. 9: likelihood "rises with increases with mission duration, distance from Earth" |
| Signs: low mood, hopelessness, no enjoyment; poor sleep, low energy, appetite change; avoiding others; self-harm thoughts | NHS Depression symptoms: psychological, physical and social lists |
| Poor sleep is a common warning sign | BMED p. 42: "Sleep disruption is a common and observable warning sign of depressed mood, anxiety, or acute stress" |
| Journaling and photographing Earth are outlets for stress | TB-016 p. 7 photo caption |
| Private psychological and family conferences | TB-016 p. 6 (item 3) and p. 7 (item 5, Private Family Conferences) |
| ISS medical kit holds antidepressants | BMED p. 66: "the ISS medical kit contains 2 anxiolytics, 2 antidepressants, and 2 antipsychotics". No drug named, no dose |
| PHQ-4 depression pair 3 or more | PHQ manual, as entry 2 |
| Self-harm thoughts: CMO and flight surgeon at once | Design rule (same as existing `isolation-mood-and-crew-conflict`) |

## 4. Dizziness and disorientation after landing (`spatial-disorientation-after-landing`)

| Claim | Source and location |
|---|---|
| Sensorimotor changes include spatial disorientation, posture and walking problems, eye-hand coordination | TB-010 Rev A, p. 2 Background |
| Adaptation to one gravity is wrong for the next; risk highest at gravity changes; recovery varies with flight duration | Wood slides (NTRS 20210025094), slide p. 7 "SM Risk greatest at G-transitions" |
| Landing day after shuttle flights: 57% tandem (heel-to-toe) walk positive; vertigo/spinning 11.9%; dizziness/faintness 16.5% | Wood slides p. 12, table "Post-flight STS neuro exam" (citing Clark, J Vestib Res 2002) |
| Nausea worse with head movement | Wood slides p. 38 ("head movements provocative"); TB-010 p. 5 ("hypersensitivity to head movement") |
| Move head slowly, build up step by step | Wood slides p. 34 ("Titrate head movements"), p. 40 ("Incremental head movements"; "incremental rehabilitation approach") |
| Accept help to stand and walk | TB-051 p. 12: "astronauts often need assistance with basic movements" |
| No driving or hard physical work in the first week | TB-051 p. 12, First Week: "Crew are usually advised against driving or performing tasks that require significant physical effort" |
| Reconditioning programme; most back to normal within 45 days | TB-051 p. 12 ("45 Days and Beyond") and p. 11 |
| Escalation and emergency list | Design rule; emergency items mirror NHS Headaches red flags (weakness, numbness, speaking) |

## 5. Hearing loss and noise (`hearing-loss-and-noise`)

| Claim | Source and location |
|---|---|
| Temporary and sometimes permanent hearing loss after long flights | Buckey 2001, Aviat Space Environ Med (abstract): "Temporary and, in some cases, permanent hearing loss has been documented after long-duration spaceflights" |
| Fans, exercise equipment, experiment hardware cause noise; most ISS noise from fans | TB-035 Rev C, p. 6 ("On the ISS, most noise come from fans"); Limardo 2021, p. 5 (dust-clogged fans, noisy exercise equipment, experiment hardware) |
| Noise can disturb sleep, interfere with speech, cause irritation and headaches | TB-035 p. 3 "Risks"; p. 4 STS-40 example |
| NASA keeps noise below 85 dBA at all times | TB-035 p. 2, [V2 6077] Hazardous Noise Limits: less than 85 dBA regardless of duration (excludes impulse noise and alarms) |
| Signs: misunderstanding speech in noise; tinnitus | NHS Hearing loss (reviewed 30 May 2025) |
| Earplugs / ANR headsets; required above 16-hour average of 72 dBA | Limardo p. 3 (section 3.3, device types) and p. 4 (flight rule: above 72 dBA LEQ16 crew directed to wear hearing protection) |
| Crew quarters quiet enough with the door closed | Limardo p. 7 |
| Cleaning clogged fans brings noise back down | Limardo p. 5 |
| On-orbit hearing assessment about every 45 days | Antonsen 2017 slides (NTRS 20170009943), p. 30 "On-orbit hearing assessment (OOHA) - 45 days" |
| Sudden hearing loss is urgent; tinnitus with sudden loss can mean inner-ear problems | NHS Hearing loss ("urgent GP appointment" for sudden hearing loss; labyrinthitis / Meniere's) |
| Sleep-noise issues are discussed at private medical conferences | Limardo p. 9 |
| "Same day" escalation timing | Design rule |

## 6. Dry, irritated and infected eyes (`conjunctivitis-and-dry-eye`)

| Claim | Source and location |
|---|---|
| Over 30% of ISS crew reported dry-eye signs or symptoms after flight | Ax 2023, Front Physiol (full text PMC10620524), section 1 Introduction |
| Air currents, screen work, CO2, poor sleep, eyelid swelling from fluid shift affect the tear film | Ax 2023, sections 3.3 and 6 |
| Floating dust does not settle | Ax 2023, section 3.2 (dust and metal filings do not settle; corneal foreign bodies common) |
| NASA records to 2006: 5 eye infections, 4 dry eyes | Meer 2023, npj Microgravity (abstract): Shuttle and ISS through Expedition 13 (2006) |
| Signs (gritty, burning, itchy, watery; strain or blur; red with discharge crusting on lashes) | Ax 2023 section 1 (symptom list); NHS Dry eyes (reviewed 6 Jan 2025); NHS Conjunctivitis (reviewed 23 Apr 2024) |
| Screen breaks; daily lid cleaning with warm damp cloth | NHS Dry eyes self-care; Ax 2023 section 6 (screen breaks) |
| Infection hygiene: wash hands, own towel, no contact lenses | NHS Conjunctivitis |
| Eye drops: bottle touches the eye in weightlessness | Ax 2023 section 5 (fluid must be wicked by direct contact, contaminating the bottle). "Use only your own" is a design rule |
| Red flags: pain, light sensitivity, vision change, very red eye | NHS Conjunctivitis and NHS Dry eyes |
| "scratch" | Meer 2023 abstract (70 corneal abrasions). Same-day flight-surgeon timing is a design rule |

## 7. Cold sores and shingles (`cold-sores-and-shingles`)

| Claim | Source and location |
|---|---|
| Latent viruses reactivate in flight | Rooney 2019, Front Microbiol (abstract) |
| Records of 46 ISS crew: 6 instances of oral herpesvirus reactivation | Crucian 2016, Int J Gen Med (full text PMC5098747), Discussion |
| Stress hormones rise, cell-mediated immunity falls | Rooney 2019 abstract |
| Shedding up to 30 days after ISS flight; risk to newborns, seronegative adults, immunocompromised | Rooney 2019 abstract |
| Cold sore: tingling/burning, blisters within 48 hours; heal within 10 days; do not touch; wash hands | NHS Cold sores (reviewed 19 Feb 2024) |
| Shingles: pain or tingling before rash; band on one side; blisters scab in 7 to 10 days; fever, headache, chills; face can affect eye and cause vision loss | CDC shingles signs and symptoms (page dated 19 Apr 2024) |
| See GP if very large or painful or not healing in 10 days | NHS Cold sores |
| Rash near the eye or vision change: flight surgeon at once | CDC (vision loss) plus design rule (same as existing immune entry) |
| Opened but not cited after trimming: Mehta 2004, J Med Virol (thoracic zoster 2 days before flight; VZV DNA in 30% of saliva samples during and after flight) | https://doi.org/10.1002/jmv.10555 |

## 8. Fungal skin infection (`fungal-skin-infection`)

| Claim | Source and location |
|---|---|
| Skin rashes are the most reported immune-related event on ISS | Crucian 2016 abstract: rashes 1.12 per flight year, the most reported event |
| No-rinse washing, sweat and wet clothing, constrained airflow may contribute to rashes | Crucian 2016 full text, Discussion (speculative: "may be conducive to rashes") - hence "may help" |
| Malassezia increased; unusual yeast (Cyberlindnera jadinii) on 5 of 10 astronauts | Sugita 2016, Med Mycol (abstract): ratio of Malassezia to all fungi increased; C. jadinii in 5 of 10 in-flight samples |
| Athlete's foot signs (itchy white, cracked, flaky skin between toes; blisters); dry feet by dabbing; cotton socks; do not share towels, socks, shoes; treatment takes a few weeks; see GP if spreading to hands, very painful, or foot hot, painful and red | NHS Athlete's foot (reviewed 29 Apr 2024) |
| Ringworm: scaly, itchy, often ring-shaped rash, groin (jock itch); do not scratch; do not share towels | NHS Ringworm (reviewed 3 Aug 2023) |
| Fever as a deeper-infection sign; "same day" | Design rule |
| Not sourced, so left out: any space-specific rate of fungal skin infection (none found; Crucian reports rashes and "skin infection" without fungal breakdown) |

## 9. Acute radiation sickness (`acute-radiation-sickness`)

| Claim | Source and location |
|---|---|
| Acute radiation syndromes from SPEs (nausea, vomiting, fatigue, skin injury, blood-forming organ depletion); shielding and monitoring minimise risk; shielding is effective against SPE protons | TB-020 Rev G, p. 2 ("In Mission Risk" box; "Shielding (5-20 g/cm2 ...) IS effective") |
| Dose above about 0.7 Gy, mild symptoms from 0.3 Gy; nausea, vomiting, anorexia, possibly diarrhoea from minutes to days; transient itchy erythema within hours; latent phase hours to weeks; then fever, malaise, falling blood counts | CDC, Acute Radiation Syndrome: Information for Clinicians (updated 23 Apr 2024) |
| NASA blood-forming organ limit 250 mGy-Eq in 30 days | STD1 p. 40, Table 4.8-1 |
| Shelter in higher-shielded areas or build a shelter; alarm when dose rate may need sheltering; Crew Active Dosimeter shows mission dose and recent dose rate | NASA SRAG "How do we protect the astronauts" (updated 24 Sep 2025) |
| Note time of symptom onset; treat as emergency even if later well; report with dosimeter reading | Design rule (follows the CDC latent phase) |

## 10. Radiation cataract (`radiation-cataract`)

| Claim | Source and location |
|---|---|
| 295 astronauts: lens dose above 8 mSv linked to more and earlier cataracts | Cucinotta 2001, Radiat Res (abstract); authors call results preliminary |
| More cortical cataracts in astronauts who flew | Chylack 2009 (NASCA report 1), Radiat Res (abstract) |
| Lens limits prevent early (under 5 years) severe cataracts, e.g. from an SPE; sub-clinical cataracts from cosmic rays not preventable | STD1 p. 40, Table 4.8-1 footnote |
| Signs: develop slowly; blurred vision, faded colours, glare, halos, poor night vision, double vision; surgery replaces lens | NHS Cataracts (reviewed 12 Mar 2025) |
| Sheltering protects lenses; keep eye exams; sudden loss of vision is not a cataract | Design rule / inference from STD1 footnote (SPE is the cause the limits target) |

## Could not source (left out)

- An in-flight rate or case count for fungal skin infection specifically.
- Any cataract case count in current ISS crew, or how long after flight cataracts appear in astronauts beyond the STD1 "under 5 years" / "over 5 years" wording.
- How long post-landing vertigo lasts in days (Wood slide p. 26 recovery curves were not readable as numbers from the text).
- Any in-flight treatment, antiviral or antiemetic for these conditions: no doses were added, by design.

## Verification log

Adversarial fact-check, 2026-11-15. Every cited source was reopened: NASA PDFs from the local text copies (`kb/src/*.pg.txt`, `kb2/src/*.pg.txt`), journal papers through PubMed metadata and Europe PMC full text (PMC11033988, PMC10620524, PMC10188687, PMC5098747; saved in `kb2/c4fc/`), and every NHS, CDC and SRAG page fetched again. All links resolve (two publisher DOIs and the CDC page return 403 to scripted requests but open in a browser and through the fetch tool). Pre-fix copy: `kb2/c4fc/c4.prefix.json`; fix script: `kb2/c4fc/fix_c4.py`.

| # | Entry | Problem found | Fix | Source checked |
|---|---|---|---|---|
| 1 | headache-and-migraine | "In the first week, headaches often come with space motion sickness" overstates: nausea came with only 17.6% and vomiting 9.8% of week-1 episodes; the paper says headache is "possibly related" to space motion sickness | Now "can come with space motion sickness and are more often migraine-like" (migraine 23.5% in week 1 vs 5.1% later) | van Oosterhout 2024, Introduction, Results, Discussion |
| 2 | headache-and-migraine | "Sleep, fluids and exercise often helped crew" - the paper reports how often these measures were tried (sleeping 42.1%, hydration 39.5%, exercise 21.1% of 38 episodes), not that they worked; efficacy was measured only for medicine | Now "Besides medicine, crew most often tried sleep and drinking fluids." | van Oosterhout 2024, Table 2 and "Treatment and Countermeasures" |
| 3 | anxiety-and-panic | "no behavioural emergency has been reported" - the BMED report says this on p. 9 but contradicts it on p. 24: payload specialists have reported behavioural emergencies (the existing library already carries this correction, BSI-17) | Now "no NASA astronaut has had a behavioural emergency during a mission" | BMED p. 24 ("Although no astronaut has had a behavioral emergency during a mission, payload specialists have reported behavioral emergencies") |
| 4 | depression | Summary "Low mood ... for more than 2 weeks may be depression" reads like a self-diagnosis rule; NHS frames the 2-week window as when to see a GP | Now "is a reason to talk to your flight surgeon" | NHS Depression symptoms ("See a GP if you experience symptoms of depression for most of the day, every day, for more than 2 weeks") |
| 5 | hearing-loss-and-noise | "NASA keeps noise below 85 dBA at all times" is wrong: [V2 6077] covers all phases except launch, entry and abort (launch and entry have separate limits up to 105 dBA) | Now "Outside launch and landing, NASA requires noise to stay below 85 dBA." | TB-035 Rev C p. 3 ([V2 6073], [V2 6074]) and p. 10 ([V2 6077]) |
| 6 | hearing-loss-and-noise | "the quarters are quiet enough then" overstated: Limardo says closed quarters give auditory (hearing) rest, but sleep-time levels have stayed above the 50 dBA sleep-disturbance level | Now "quiet enough to rest your ears" | Limardo 2021 pp. 7 and 9 |
| 7 | hearing-loss-and-noise | "on-orbit hearing test, about every 45 days" rests only on a bullet "OOHA - 45 days" in a 2017 slide deck; no other source found (NTRS 20150011048 gives 60 days for noise dosimetry, not hearing tests) | Interval removed: "Do your scheduled on-orbit hearing tests." Antonsen slides kept as the source for the test existing | Antonsen 2017 slide p. 30; NTRS 20150011048 |
| 8 | conjunctivitis-and-dry-eye | Sign "discharge that crusts on the lashes" - NHS says pus "sticks to lashes" | Reworded to "sticks to the lashes" | NHS Conjunctivitis |
| 9 | conjunctivitis-and-dry-eye | Escalation under-triaged: it put vision change and pain looking at light at "same day", but NHS Dry eyes lists "it hurts to look at light" and "any changes to your sight, like wavy lines, flashing or loss of vision" as call 999 / A&E | Split: pain or very red eye = same day; pain looking at light or any vision change = at once | NHS Dry eyes; NHS Conjunctivitis |
| 10 | cold-sores-and-shingles | "wash your hands with soap and water after any contact" - NHS says wash hands before and after touching | Now "wash your hands before and after any contact" | NHS Cold sores |
| 11 | fungal-skin-infection | Summary put "Skin rashes are the most common immune-related problem on the ISS" next to fungal infection, implying ISS rashes were fungal; Crucian counts rashes/hypersensitivity separately from skin infection and gives no fungal breakdown | Now "Skin rashes of all kinds are the most reported immune-related problem on the ISS; how many were fungal is not known." | Crucian 2016 abstract and Methods/Results (rash vs skin infection categories) |
| 12 | fungal-skin-infection | "Malassezia increased" overstates: the abstract says colonisation "changed" 7.6-fold (cheek) and 9.5-fold (chest) and that the *ratio* of Malassezia to all fungi increased; "unusual yeast appeared on half" omits that it was 5 of 10 crew and may have come from before flight | Now "made up a larger share of skin fungi in flight, and an unusual yeast was found in large amounts on 5 of them" (of 10) | Sugita 2016 abstract (PubMed 26773135) |
| 13 | radiation-cataract | Cucinotta 2001 results presented as settled; the authors call them preliminary (subjective scoring) | Now "In early results from 295 NASA astronauts ..." | Cucinotta 2001 abstract (PubMed 11604058) |
| 14 | radiation-cataract | "Sudden loss of vision is not a cataract" is a diagnostic statement with no source | Now "Sudden loss or change of vision is urgent whatever the cause: tell your crew medical officer at once." (design rule, consistent with NHS red flags) | Design rule; NHS Dry eyes / Headaches list loss of vision as an emergency |
| 15 | radiation-cataract | Cucinotta DOI URL contains square brackets and fails in some link parsers | Replaced with PubMed link https://pubmed.ncbi.nlm.nih.gov/11604058/ | PubMed 11604058 |

Checked and confirmed with no change: van Oosterhout 22/24 and mild 64.2%, week-1 symptoms, pressing/heavy, medicine efficacy 73/84; TB-004 3 mmHg 1-hour limit (headache below 1.4%); TB-016 contributing factors, Shuttle-Mir 2 of 7, Soyuz T14-Salyut 7, PPCs, PFCs, photography/journaling; BMED "not immune", risk rising with duration and distance, sleep as warning sign, ISS kit antidepressants; PHQ-2/GAD-2 cutpoint 3; NHS panic (5 to 20 minutes, breathe slowly, will pass) and GAD wording; Wood slide 7 and 12 (57.0% tandem walk, 11.9% vertigo; recovery varies with flight duration); TB-051 p. 12 (assistance, no driving or hard effort in week 1, 45 days); TB-035 fans and noise effects; Limardo 72 dBA LEQ16, HPDs, clogged fans, private medical conferences; Buckey 2001 abstract; Ax 2023 (over 30%, air currents, CO2, screens, sleep, eyelid swelling from fluid shift, dust does not settle, dropper bottle contact); Meer 2023 (5 infections, 4 dry eyes, 70 corneal abrasions); Crucian 2016 (46 crew, 6 oral herpes reactivations, no-rinse washing, sweat, airflow); Rooney 2019 (stress hormones, shedding up to 30 days, newborns); CDC shingles; NHS cold sores, athlete's foot, ringworm, cataracts, hearing loss, headaches red flags; CDC ARS (0.7 Gy, 0.3 Gy, prodrome, erythema, latent phase); TB-020 (shielding effective for SPE protons; nausea, vomiting, fatigue); STD1 Table 4.8-1 (BFO 250 mGy-Eq 30-day; lens footnote); SRAG (shelter, alarm, Crew Active Dosimeter display); Chylack 2009.

Entries removed: none. Final entry count: 10. Text length after fixes: 163 to 192 words per entry (unchanged range, still a little above target). No medicine doses appear in this batch.
