# Vista medicine library, batch m4: research log

Companion to `m4.json` (originally 17 entries; 16 after the fact-check below: 9 new, 7 existing entries copied unchanged with a `dose` object added). Built 15 November 2026. Build script: `scratchpad/m4_scripts/build_m4.py` (validates ASCII, kebab-case ids, condition ids, check keys, units, https URLs). Label files as downloaded are kept in `kb2/m4_src/` (DailyMed SPL XML or openFDA JSON, named by set id).

## Method and ground rules

- Doses come only from official labelling: FDA labels read as SPL XML from the DailyMed web service (`dailymed.nlm.nih.gov/dailymed/services/v2/spls/{setid}.xml`) or the openFDA label API (same SPL content), the UK EMC SmPC (melatonin), and an NHS page (glucose gel, see "Could not source"). Cited as the DailyMed `drugInfo.cfm?setid=` page for each set id.
- Dose numbers are copied as the label states them. Where a label gives a range (ketamine, lorazepam, morphine into a vein), the numeric fields `single` and `mgPerKg` are left null and the range stays in the `label` text, so the app cannot show one end of a range as "the" dose. `everyH` is the shortest interval the label states.
- `calc: true` only for over-the-counter style medicines a crew member could take under a standing order: caffeine (US OTC monograph), meclizine (US OTC), glucose gel. Everything else is `false` (injectables, opioids, ketamine, benzodiazepine, antidepressant, prescription sleep medicines, scopolamine patch (US prescription), promethazine (US prescription), modafinil (controlled), radiation countermeasures, potassium iodide (taken only on official instruction)).
- Gates: each gate's reason comes from the label's warnings or contraindications (section named below). The numeric threshold is not in any label; it is Vista's own band from `docs/evidence/clinical-thresholds.md`, chosen to match: react >= 355 ms (PVT-B lapse threshold, Basner 2011, used by Vista's reaction test); SpO2 <= 91% (Vista urgent band, NEWS2 score 3); systolic <= 90 mmHg and >= 180 mmHg (Vista urgent/severe hypertension bands); systolic >= 140 (Vista stage 2 band); HR >= 111 (Vista Act band, NEWS2 score 2); temp >= 38.0 deg C (Vista fever band); sleep < 6 h (Vista Act band); PHQ-4 >= 6 (Vista Act band); glucose < 54 mg/dL (ADA level 2, Vista urgent band) and glucose >= 72 mg/dL (NHS 4 mmol/L converted at 18 mg/dL per mmol/L).
- Condition links marked "editorial" below are Vista's mapping of a label indication to a library condition, not a claim found in a source.
- Spaceflight claims come from the team's local copies of NASA documents re-read for this batch (keys as in `kb/kb_meds.md`): issemp (ISS Emergency Medical Procedures Manual, 2015 pages, FOIA), mtb012 (OCHMO-MTB-012 Rev B), reichard2023, ives2024 (CSRM), bmed2025, mtb004 (OCHMO-MTB-004 Rev A), plus PubMed records opened for this batch (abstracts only): Nowadly 2026 (PMID 42550782), Komorowski 2013 (PMID 23513283), Kutz 2025 (PMID 40643389), Sanzari 2015 (PMID 25909052), and the NASA HRP radiation hazard page (fetched).

## Labels used

| Key | Label | Set id / URL | Version read |
|---|---|---|---|
| L_KI | ThyroSafe potassium iodide 65 mg tablets (BTG), OTC, ANDA076350 | 47762f8f-30e2-445d-aaa1-e04479f8dd5b | effective 2026-08-26 |
| L_FIL | Neupogen (filgrastim) injection (Amgen) | 97cc73cc-b5b7-458a-a933-77b00523e193 | effective 2026-07-23 |
| L_KET | Ketalar (ketamine HCl) injection (Par), NDA016812 | 14e8f864-8b8a-4e7e-8439-e510d3107063 | effective 2026-03-27 |
| L_MOR | Morphine Sulfate Injection (Fresenius Kabi), NDA204223 | 1f53de80-efc8-4930-b3e3-fba0d026af05 | effective 2026-08-31 |
| L_LOR | Ativan (lorazepam) tablets (Bausch Health), NDA017794 | 89057c93-8155-4040-acec-64e877bd2b4c | effective 2025-07-09 |
| L_SER | Zoloft (sertraline) tablets (Viatris), NDA019839 | fda754f6-d0f3-4dce-a17a-927d64f912f7 | effective 2023-08-08 |
| L_CAF | Vivarin caffeine 200 mg tablets (Vespyr Brands), OTC monograph M011 | 4537a56b-e875-4961-9fff-3f778746f126 | effective 2026-05-01 |
| L_GLU | NHS, Low blood sugar (hypoglycaemia) | https://www.nhs.uk/conditions/low-blood-sugar-hypoglycaemia/ | fetched 15 Nov 2026 |
| L_ATR | Atropine Sulfate Injection 0.4 mg/mL (Fresenius Kabi), NDA209260 | 310c8a74-ea24-4357-8099-81e394b1634e | effective 2024-10-11 |
| L_LID | Xylocaine / Xylocaine MPF (lidocaine HCl) injection (Fresenius Kabi), NDA006488 | 4dd52202-8eef-4136-92dd-ada573b7cf74 | effective 2025-04-22 |
| L_PRO | Promethazine HCl tablets USP (Cardinal Health repackager label) | e16238dc-9292-49ac-b80f-8afeccb88bc5 | effective 2026-10-22 |
| L_SCO | Transderm Scop (scopolamine transdermal system) (Baxter), NDA017874 | b877a694-a1d0-4280-937a-a06820b12a88 | effective 2025-06-10 |
| L_MEC | Bonine meclizine 25 mg chewable tablets (WellSpring), OTC M009 | 0b2ea6b8-b342-4940-8922-898758fbeb31 | effective 2025-03-21 |
| L_ZOL | Ambien (zolpidem) tablets (Cosette), NDA019908 | 747949c5-2c91-4909-8a07-71b6826f8e97 | effective 2025-02-07 |
| L_ZAL | Zaleplon capsules USP (Bionpharma), ANDA090374 | 53103d2f-4453-49a8-9e36-888d919879f6 | effective 2024-02-13 |
| L_MEL | Circadin 2 mg prolonged-release tablets, UK SmPC (EMC product 2809) | https://www.medicines.org.uk/emc/product/2809/smpc | EMC "last updated" 11 Feb 2025 |
| L_MOD | Provigil (modafinil) tablets (Cephalon), NDA020717 | e16c26ad-7bc2-d155-3a5d-da83ad6492c8 | effective 2022-12-31 |

## New entries

### potassium-iodide
| Claim / number | Source and place |
|---|---|
| Only when public officials say; nuclear radiation emergency only; protects only the thyroid, only from radioactive iodine | L_KI, unclassified patient section and "Purpose/Indications" |
| Whole or crushed into a drink; once every 24 hours; more does not help; more adds side effects; use with other emergency measures | L_KI, Dosage and Administration; Drug Facts Directions |
| Adults over 18: 2 tablets (130 mg) every day; repeat dose 24 h after first | L_KI, Dosage and Administration; "How and when to take" |
| Max: no more than 1 dose in 24 hours -> single 130, maxSingle 130, maxDay 130, everyH 24 | L_KI, Drug Facts Directions |
| Do not use with iodine allergy, dermatitis herpetiformis, hypocomplementemic vasculitis, nodular thyroid disease with heart disease | L_KI, Warnings / Drug Facts "Do not use" |
| Side effects list (salivary gland swelling ... allergic reactions) | L_KI, "Side effects" section |
| Get help for breathing/speaking/swallowing trouble, wheeze, mouth/throat swelling, rash, irregular heart or chest pain | L_KI, Drug Facts "Stop use and ask a doctor" |
| No spaceflight use found | Searched issemp, mtb012, reichard2023 text: no "iodide" hit |
| Space radiation = galactic cosmic rays and solar storms | NASA HRP hazard page (fetched) |
| calc false, no gates | Taken only on official instruction; no label warning tied to a Vista check |

### filgrastim
| Claim / number | Source and place |
|---|---|
| Indication: increase survival after myelosuppressive radiation doses (haematopoietic syndrome of ARS) | L_FIL, 1.6 |
| 10 mcg/kg single daily subcutaneous injection; start ASAP after suspected/confirmed dose > 2 Gy; continue until ANC > 1,000/mm3 on 3 consecutive CBCs or > 10,000/mm3 after nadir; do not delay if CBC not available | L_FIL, 2.5 |
| mgPerKg 10 (unit mcg), everyH 24, max "one dose a day" (no other maximum stated for this use) | L_FIL, 2.5 |
| Splenic rupture incl. fatal; left upper abdominal or shoulder pain | L_FIL, 5.1 |
| ARDS: fever with lung infiltrates or respiratory distress | L_FIL, 5 (highlights) / 5.2 |
| Serious allergic reactions incl. anaphylaxis, mostly on initial exposure; contraindicated after serious reaction to filgrastim or pegfilgrastim | L_FIL, 4 and 5.3 |
| Bone pain, pyrexia, headache (>= 5% in progenitor-cell mobilisation patients) | L_FIL, 6 (highlights "most common adverse reactions") |
| Store refrigerated 2 to 8 deg C in carton, protect from light, avoid freezing, do not shake | L_FIL, 16 |
| Astronauts could meet SPE radiation, mostly protons; Neulasta (pegfilgrastim) in mini pigs after 2 Gy proton TBI improved WBC/neutrophil loss by about 60% three days after first injection; counts fell quickly after the last injection | Sanzari 2015 abstract (PubMed 25909052) |
| No spaceflight use found | No hit in issemp, mtb012, reichard2023 |
| calc false (injectable, radiation countermeasure) | Rule |

### ketamine
| Claim / number | Source and place |
|---|---|
| IM 6.5 to 13 mg/kg; IV 1 to 4.5 mg/kg over 60 s or 1 to 2 mg/kg at 0.5 mg/kg/min; repeat half to full induction dose | L_KET, 2 (highlights) and 2.2 |
| Only by/under direction of physicians experienced in anaesthesia, airway, oxygenation; monitor vital signs; airway equipment available | L_KET, 2.1 |
| No 24-h maximum stated; individualised and titrated | L_KET, 2.2 (no maximum anywhere in section 2) |
| Contraindicated when significant BP rise would be a serious hazard -> gate bp sys >= 180 (threshold = Vista severe band) | L_KET, 4 |
| Raises BP and heart rate | L_KET, 6 (cardiovascular) |
| Emergence reactions about 12%, a few hours; dream-like states, vivid imagery, hallucinations, confusion; IM lowers incidence; minimise verbal, tactile, visual stimulation | L_KET, 5.2 |
| Respiratory depression with overdose or too-rapid administration | L_KET, 5 (highlights) |
| Vomiting/aspiration possible; salivation; diplopia; raised intraocular pressure | L_KET, 2.1 and 6 |
| Storage 20 to 25 deg C, protect from light | L_KET, 16 (not used in text) |
| 2015 ISS kit: ketamine 50 mg/mL, 10 mL multi-dose vials, IM, "For use by Physician CMO Only"; side effects incl. arrhythmia, hallucinations, vivid dreams, confusion, raised eye and intracranial pressure, nausea, vomiting, salivation | issemp checklist 3.001, p. 24 of 27 ("Intubation" rows; text columns are jumbled in the extracted text, attribution by row order and strength) |
| Ketamine keeps cardiovascular stability, airway reflexes, spontaneous ventilation; two ketamine-based protocols proposed for exploration missions | Komorowski 2013 abstract (PubMed 23513283) |
| Review proposing ketamine for acute suicidality in long-duration flight; "not intended to redevelop current ISS protocols" | Kutz 2025 abstract (PubMed 40643389) |
| Ketamine among ISS-flown expired medicines; most within about +/-5% of ground controls | Nowadly 2026 abstract (PubMed 42550782) |
| "Pain relief" in `for` | Kutz 2025 abstract lists pain and sedation among ketamine indications |
| Conditions fractures, abdominal-pain-and-appendicitis | Editorial (anaesthesia for an emergency procedure) |

### morphine
| Claim / number | Source and place |
|---|---|
| IM: initiate 10 mg every 4 h as needed (based on 70 kg adult) -> single 10, everyH 4 | L_MOR, 2 (highlights) |
| IV: 0.1 mg to 0.2 mg per kg every 4 h as needed, inject slowly (range, so mgPerKg null) | L_MOR, 2.2 |
| Lowest effective dosage, shortest duration; no 24-h maximum stated | L_MOR, 2.1 |
| Opioid-requiring pain; acute musculoskeletal injuries given as an example of acute pain | L_MOR, 2.1 (basis for `for` and the fractures link) |
| Boxed: life-threatening respiratory depression; benzodiazepines/CNS depressants -> profound sedation, respiratory depression, coma, death; addiction | L_MOR, Boxed warning |
| Contraindicated with significant respiratory depression -> gate spo2 <= 91 | L_MOR, 4 |
| Severe hypotension; avoid in circulatory shock -> gate bp sys <= 90 | L_MOR, 5 (5.10) |
| Avoid with head injury/impaired consciousness | L_MOR, 5 (5.11) |
| Have naloxone and resuscitative equipment available; use limited to those familiar with managing respiratory depression | L_MOR, 5 (5.5) and 2.1 |
| Most frequent: sedation, light-headedness, dizziness, nausea, vomiting, constipation, diaphoresis | L_MOR, 6 |
| Morphine sulfate on the space shuttle medication list | mtb012 p. 17 |
| Not in 2015 ISS kit pages; injectable opioid listed is hydromorphone (Dilaudid) IM | issemp 3.001 p. 25 ("Pain Reliever"); no "morphine" anywhere in the issemp text |
| SLEP: morphine sulfate injectable, average extension 89 months (35 to 119) | mtb012 p. 10 (table, citing Lyon 2006); reichard2023 also gives 13 lots, 35 to 119 months |
| Dilute morphine (1%) degraded more at lower dose rates at 10 kGy; spaceflight doses thousands of times lower should have much less effect | reichard2023 pp. 116-117 (Appendix, radiation) |

### lorazepam
| Claim / number | Source and place |
|---|---|
| Usual range 2 to 6 mg/day divided, largest at bedtime; may vary 1 to 10 mg/day; anxiety initial 2 to 3 mg/day bid or tid; insomnia due to anxiety 2 to 4 mg at bedtime | L_LOR, Dosage and Administration |
| maxDay 10 | L_LOR, Dosage and Administration (1 to 10 mg/day) and Precautions ("maximum human therapeutic dose of 10 mg/day") |
| Indication anxiety; everyday stress usually does not need an anxiolytic; > 4 months not assessed; reassess | L_LOR, Indications and Usage |
| Sedation 15.9%, dizziness 6.9%, weakness 4.2%, unsteadiness 3.4%; memory impairment | L_LOR, Adverse Reactions |
| Boxed: opioids + benzodiazepines; dependence, withdrawal, taper | L_LOR, Boxed warning |
| Contraindicated: acute narrow-angle glaucoma | L_LOR, Contraindications |
| Depression: not without antidepressant therapy; caution with compromised respiratory function -> gate spo2 <= 91 | L_LOR, Precautions |
| Gate react >= 355 | Sedation (Adverse Reactions); Information for Patients (driving/heavy machinery) |
| 2015 ISS kit: lorazepam (Ativan) 1 mg oral, 60 tablets, behavioural health | issemp 3.001 p. 15 |
| ISS kit has 2 anxiolytics, 2 antidepressants, 2 antipsychotics; use unexpected but needed for emergencies | bmed2025 p. 66 |
| CSRM: sedation and memory impairment (fatigue model); CNS depression slows respiratory rate and HR (metabolic rate model) | ives2024 (crsm text, lorazepam entry, refs 34) |

### sertraline
| Claim / number | Source and place |
|---|---|
| MDD/OCD start 50 mg/day; PD/PTSD/SAD start 25 mg/day; increase 25 to 50 mg/day weekly; max 200 mg/day; interval between dose changes one week | L_SER, 2.1 and Table 1 |
| single 50, maxDay 200, everyH null (label gives "per day", no interval wording) | L_SER, 2.1 |
| Boxed: suicidal thoughts in paediatric and young adult patients; monitor for worsening -> gate phq4 >= 6 (Vista Act band) | L_SER, Boxed warning |
| Serotonin syndrome; bleeding with aspirin/NSAIDs; angle-closure glaucoma; hyponatraemia | L_SER, 5 and 6 |
| Most common: nausea, diarrhoea, tremor, dyspepsia, decreased appetite, hyperhidrosis, ejaculation failure, decreased libido | L_SER, 6 (highlights) |
| Discontinuation: nausea, sweating, dysphoric mood, irritability, agitation, dizziness, electric-shock sensations | L_SER, 5.5 |
| 2015 ISS kit: sertraline (Zoloft) 50 mg, 60 tablets | issemp 3.001 p. 15 |
| Du 2011: failed after 353 to 596 days; Cory 2016: 98.6% +/- 5.8% after 700 days, > 40 months past expiry; likely different brands/packaging | reichard2023 pp. 25-26 |
| SSRIs: 2.35 times risk of non-vertebral fractures (general population) | bmed2025 p. 66 |

### caffeine
| Claim / number | Source and place |
|---|---|
| Adults and 12+: 1 tablet (200 mg) not more often than every 3 to 4 hours -> single 200, everyH 3 | L_CAF, Directions |
| No daily maximum on the label; occasional use only | L_CAF, Warnings |
| Too much caffeine: nervousness, irritability, sleeplessness, occasionally rapid heartbeat; limit other caffeine -> gate hr >= 111 | L_CAF, "When using this product" |
| Not a substitute for sleep -> gate sleep < 6; ask a doctor if fatigue persists or recurs | L_CAF, Warnings and "Stop use" |
| ISS checklist side effects list | issemp 3.001 p. 4 (Caffeine (Vivarin) 200 mg, 100 tablets) |
| Stimulants such as caffeine can be paired with anticholinergic antihistamines to reduce sedation | mtb004 p. 8 |
| Caffeine among ISS-flown medicines; most within about +/-5% | Nowadly 2026 abstract |
| calc true | US OTC monograph product |

### dextrose-gel (glucose gel)
| Claim / number | Source and place |
|---|---|
| Low blood sugar usually below 4 mmol/L; treat with e.g. 2 tubes of glucose gel or 5 glucose/dextrose tablets; re-test after 10 to 15 minutes; if still below 4, another sugary drink or snack, check after 10 minutes; then longer-acting food | L_GLU, "Treating it yourself" (written for people with diabetes) |
| Unconscious: no food or drink, cannot swallow safely | L_GLU, severe hypo section -> gate glucose < 54 (threshold from Vista/ADA) |
| Rare without diabetes; causes include malnutrition; symptoms such as shaking, sweating, fast heartbeat, confusion -> see a GP | L_GLU |
| single 2, unit "application" (= 2 tubes), everyH null, maxDay null | L_GLU (no fixed interval or maximum) |
| Gate glucose >= 72 (4 mmol/L x 18) | L_GLU threshold, converted |
| No spaceflight use found | No hit for glucose gel/dextrose in issemp, mtb012, reichard2023 |

### atropine
| Claim / number | Source and place |
|---|---|
| Indications: antisialagogue/antivagal, antidote for organophosphorus, carbamate, muscarinic mushroom poisoning; symptomatic bradycardia | L_ATR, 1 |
| Bradycardia: 0.5 mg IV/IM every 3 to 5 min, max total 3 mg -> single 0.5, maxDay 3, everyH 0.05 (3 minutes) | L_ATR, 2.2 Table 1 |
| Poisoning: 1 to 6 mg, repeat every 3 to 5 min, may double until response (reduced bronchospasm, better oxygenation, drying of secretions); no maximum | L_ATR, 2.2 Table 1 |
| Ischaemic heart disease: do not exceed 0.04 mg/kg | L_ATR, 2 (highlights) and 2.4 |
| Contraindications none; anaphylaxis, ischaemic heart disease, acute glaucoma, urinary retention | L_ATR, 4 and 5 |
| Common: dry mouth, blurred vision, photophobia, tachycardia; anhidrosis -> heat intolerance; constipation, difficult micturition; large doses: restlessness, delirium, hallucinations | L_ATR, 6 |
| Gate hr >= 111 | L_ATR, 6 (tachycardia) and 5.2 |
| ISS ALS kit: atropine 0.1 mg/mL, 10 mL syringe, intraosseous | issemp 3.001 p. 6 (Table 2, Emergency Medical Treatment Pack) |
| ISS ALS algorithm: no shock advised -> atropine syringe via intraosseous needle; shock advised -> lidocaine | issemp checklist 1.103 ALS Algorithm, pp. 3-4 of 7 |
| Apollo kit and shuttle list included atropine | mtb012 pp. 16-17 |
| Atropine sulfate 1% at 10 kGy: 28% decomposition at 2.5 kGy/h vs 62% at 0.1 kGy/h (doses far above spaceflight) | reichard2023 p. 117 (summarised as "broke down", no numbers used) |

### lidocaine-injection
| Claim / number | Source and place |
|---|---|
| Indication: local or regional anaesthesia by infiltration and nerve block | L_LID, Indications |
| Table 1: infiltration 0.5 or 1%, 1 to 60 mL, 5 to 300 mg; dental 2%, 1 to 5 mL, 20 to 100 mg; lowest dose that works | L_LID, Dosage and Administration, Table 1 |
| Max: without epinephrine 4.5 mg/kg, total in general not over 300 mg; with epinephrine 7 mg/kg, 500 mg -> maxSingle 300 | L_LID, Maximum Recommended Dosages |
| Contraindicated with amide local anaesthetic hypersensitivity | L_LID, Contraindications |
| Aspirate before injecting | L_LID, Dosage and Administration |
| CNS toxicity list; drowsiness early sign of high blood level; bradycardia, hypotension, collapse | L_LID, Adverse Reactions (CNS, Cardiovascular) |
| Methaemoglobinaemia signs (cyanosis, headache, rapid heart rate, shortness of breath) | L_LID, Warnings and Information for Patients |
| 2015 ISS kit: lidocaine 1% and lidocaine 2% with epinephrine 1:100,000 (subcutaneous), lidocaine jelly | issemp 3.001 p. 20 |
| Dental nerve block: benzocaine swab 5 to 10 min, then 2 to 3 mL lidocaine over the tooth root | issemp checklist 2.6.301 |
| ALS kit lidocaine syringe given intraosseously when shock advised | issemp 3.001 p. 6 and checklist 1.103 pp. 3-4 |
| Shuttle list: lidocaine and xylocaine | mtb012 p. 17 |
| Lidocaine among ISS-flown medicines; most within about +/-5% | Nowadly 2026 abstract |
| Conditions cuts-and-abrasions, dental-problems | dental from issemp 2.6.301; cuts editorial (skin infiltration) |
| No gates | No label warning maps to a Vista check reading |

## Existing entries (all fields copied unchanged from `kb/kb_meds.json`; only `dose` added)

| Entry | Dose fields and source place |
|---|---|
| promethazine | L_PRO, Dosage and Administration "Motion Sickness": 25 mg twice daily, first dose 1/2 to 1 h before travel, repeat 8 to 12 h later, then on arising and before evening meal; "Nausea and Vomiting": 25 mg, then 12.5 to 25 mg every 4 to 6 h -> single 25, maxSingle 25, everyH 4; no maximum stated. Gates: react >= 355 from Warnings "CNS Depression" (may impair abilities for hazardous tasks); spo2 <= 91 from Warnings "Respiratory Depression" (avoid in compromised respiratory function). Note: the existing entry says the injection worked best in flight; the label used here is the tablet label. |
| scopolamine | L_SCO, 2.1-2.2: one system delivers about 1 mg over 3 days; apply behind one ear at least 4 h before needed; for > 3 days replace behind the other ear; only one at a time -> unit application, single 1, maxDay 1, everyH 72. Gates: temp >= 38.0 from 5.5 Hyperthermia (remove the system if body temperature increases); react >= 355 from 6 (drowsiness > 15% in motion sickness). Note: the existing entry describes oral scop-dex use in flight; no FDA label exists for oral scopolamine, so the patch label is used. |
| meclizine | L_MEC, Directions: 1 to 2 chewable tablets once daily, 1 h before travel; chew or crush -> single 25, maxSingle 50, maxDay 50, everyH 24, calc true. Gate react >= 355 from "When using this product" (drowsiness; caution operating machinery). |
| zolpidem | L_ZOL, 2.1: 5 mg women, 5 or 10 mg men, once per night immediately before bedtime with 7 to 8 h remaining; may increase to 10 mg; total not over 10 mg once daily; not readministered same night -> single 5, maxSingle 10, maxDay 10, everyH 24. Gate react >= 355 from 5.2 (next-day impairment). |
| zaleplon | L_ZAL, Dosage and Administration: 10 mg most adults; 5 mg may suffice for low weight; 20 mg occasional; above 20 mg not recommended; immediately before bedtime or after going to bed with difficulty; not with/after heavy high-fat meal -> single 10, maxSingle 20. Gate react >= 355 from Clinical Pharmacology "Sedative/Psychomotor Effects" (impairment at about 1 h) and the sedative-hypnotic class. |
| melatonin | L_MEL, 4.2: 2 mg once daily, 1 to 2 h before bedtime, after food, up to 13 weeks; 4.1: primary insomnia, aged 55 or over -> single 2, maxDay 2, everyH 24. Gate react >= 355 from 4.7 (moderate influence on ability to drive and use machines). Note: no FDA label exists (US dietary supplement); the ISS kit tablet was 3 mg (issemp p. 4), which differs from the 2 mg licensed UK product. |
| modafinil | L_MOD, 2.1-2.2: 200 mg once a day in the morning (narcolepsy/OSA) or about 1 h before shift (SWD); up to 400 mg/day well tolerated without consistent added benefit -> single 200, everyH 24, maxDay null. Gate bp sys >= 140 from 5.7 (more patients on Provigil needed new or increased antihypertensive medicine, 2.4% vs 0.7%). |

## Could not source / limits

- Glucose (dextrose) gel: no FDA DailyMed label (searched openFDA OTC dextrose/glucose and DailyMed by name), no EMC SmPC and no NHS medicines page were found. Retail pack directions (GlucoGel) seen in search results were not used. The dose comes from the NHS hypoglycaemia condition page, which is written for people with diabetes; it is not formal medicine labelling.
- Potassium iodide and filgrastim: no spaceflight use or NASA statement found in the NASA sources reviewed. The filgrastim spaceflight note rests on one animal study of pegfilgrastim (a related product), read as an abstract only.
- Ketamine, morphine, lorazepam, atropine, lidocaine: no ISS in-flight use data found. Ketamine's ISS kit row is read from jumbled extracted table text (attributed by row order); the page image was not re-checked.
- Morphine is not in the 2015 ISS kit pages (shuttle only); the current ISS kit was not checked beyond mtb012.
- Gate thresholds are Vista design values, not label numbers (see Method).
- PubMed papers (Nowadly 2026, Komorowski 2013, Kutz 2025, Sanzari 2015) were read as abstracts only.
- Zaleplon: the brand Sonata label on DailyMed is a 2010 repackager copy; a 2024 generic label was used instead. Zoloft label version on openFDA is from August 2023.


## Verification log

Adversarial fact-check, 15 November 2026. Every dose number (single, maximum, interval, mg per kg, unit), gate and claim in `m4.json` was checked against the label text kept in `kb2/m4fc/txt/` (DailyMed SPL XML for each set id, flattened in `kb2/m4fc/flat/`), the Circadin SmPC fetched again from EMC (`kb2/m4fc/circadin.html`, "Last updated on emc: 11 Feb 2025"), the PubMed records for Sanzari 2015 (PMID 25909052), Komorowski 2013 (PMID 23513283), Kutz 2025 (PMID 40643389) and Nowadly 2026 (PMID 42550782), the NASA HRP radiation hazard page (fetched again; "Page Last Updated Jun 05, 2025"), and the team's local copies of the ISS Emergency Medical Procedures Manual (`kb/dl_emp/emp2016.txt`), OCHMO-MTB-012 (`kb/dl_ochmo/tb006.txt`), Reichard 2023 (`kb/dl_ntrs2/pharm2023.u8.txt`), Ives 2024 CSRM (`kb/dl_ntrs2/crsm.txt`), the BMED evidence report (`bsi_txt/bmed2025.txt`) and OCHMO-MTB-004 (`kb/src/mtb004.txt`). Before/after copies: `kb2/m4fc/m4.pre-fc.json` (as built) and `kb2/m4fc/m4.pre-fc2.json` (after round 1). Fix scripts: `kb2/m4fc/fix_m4.py` (round 1) and `kb2/m4fc/fix_m4_2.py` (round 2).

### Problems found and fixes

| # | Entry | Problem | Fix | Source checked |
|---|---|---|---|---|
| 1 | dextrose-gel | Dose taken from the NHS hypoglycaemia condition page, which is not official medicine labelling (FDA label, EMC SmPC, NHS medicines page or WHO formulary). No such label could be found: DailyMed name searches for glutose, insta-glucose, dextrose gel and glucose gel returned nothing. | Entry removed. The `low-blood-sugar` condition has no linked medicine from this batch. | DailyMed v2 `spls.json?drug_name=` searches, 15 Nov 2026 |
| 2 | atropine | `maxDay` 3 treated the label's 3 mg "Maximum Total Dose" (slow heart rate) as a 24-hour limit; the label gives a total, not a daily figure. The label paraphrase "doubled until breathing secretions dry" was incomplete. The gate text said only "is for a slow heart rate", with no label warning behind it. | `maxDay` set to null; `max` and `label` reworded to the label's Table 1 (total 3 mg for a slow heart rate; no maximum total for organophosphorus or carbamate poisoning; response = reduced bronchospasm, improved oxygenation, drying of secretions). Gate text now cites 5.2 (atropine-induced tachycardia can worsen cardiac ischaemia). | L_ATR 2.2 Table 1; 5.2 |
| 3 | promethazine | `maxSingle` 25 is not stated by the label (single doses of 12.5 to 25 mg are given; no maximum single dose is set). | `maxSingle` set to null. | L_PRO Dosage and Administration |
| 4 | ketamine | `group` and `for` called it "strong pain relief"; the Ketalar label indications are anaesthesia only (pain use appears only in the Kutz review). | `group` -> "Anaesthetic (injection)"; `for` -> anaesthesia only. Pain and sedation now attributed to the 2025 review in `space`. | L_KET 1; Kutz 2025 abstract |
| 5 | ketamine | Missing the label's interaction warning with opioids, benzodiazepines and other CNS depressants (profound sedation, respiratory depression, coma, death). Round-1 wording then listed lorazepam as if it were an opioid. | Caution added and reworded: "opioids such as morphine, benzodiazepines such as lorazepam, or other sedatives"; monitoring phrased as the label's "continuously monitor vital signs". | L_KET 7.3 and 2.1 |
| 6 | ketamine | Komorowski paraphrase "keep blood pressure" was not the abstract's wording (preservation of cardiovascular stability). | Reworded to "keep the circulation stable, the airway reflexes working and breathing going on its own". | Komorowski 2013 abstract |
| 7 | ketamine, caffeine, lidocaine-injection | "X was among those mostly within about 5%" attributed a per-drug result the abstract does not give; the abstract reports that average flown-versus-ground differences were generally within +/-5% for most of the eight medicines. | Reworded: "X was one of eight expired medicines in a 2026 study ...; for most of them, flown and matching ground samples differed by about 5% or less on average." | Nowadly 2026 abstract (PMID 42550782) |
| 8 | filgrastim | Sanzari paraphrase said pegfilgrastim "raised white cell counts by about 60%"; the abstract says four injections improved WBC loss (mainly neutrophils) by about 60% versus saline. | Reworded to "four injections ... cut the loss of white cells, mainly neutrophils, by about 60%". | Sanzari 2015 abstract (PMID 25909052) |
| 9 | potassium-iodide | "adds side effects" overstated the label ("may increase the chances of side effects"); the caution merged the label's two action levels (get help at once versus stop and ask a doctor). | `use` reworded; caution split into "get medical help at once" (breathing, swallowing, swelling of lips, tongue or throat, irregular heartbeat, chest pain) and "stop it and ask a doctor" (rash, swelling of face, hands or feet, fever with joint pain). | L_KI "What to do if side effects occur" and Drug Facts |
| 10 | morphine | "stayed usable for an average of 89 months past its expiry" overstated SLEP; the source gives an average shelf-life extension. | Reworded to "the shelf life ... was extended by an average of 89 months (range 35 to 119)". | MTB-012 SLEP table; Reichard 2023 p. 25 |
| 11 | morphine, atropine | Radiation note gave only NASA's reassurance (doses thousands of times lower) and left out that, in the same tests, giving the same dose more slowly caused more breakdown. | Added "and more so when the same dose was given slowly". | Reichard 2023 pp. 116-117, Appendix sections B and D |
| 12 | lorazepam | `for` said "severe anxiety or panic"; the label indication is anxiety disorders or short-term relief of anxiety symptoms, plus "insomnia due to anxiety or transient situational stress". | `for` -> "Short-term relief of anxiety, and sleeplessness caused by anxiety or short-term stress." | L_LOR Indications; Dosage and Administration |
| 13 | sertraline | "probably reflecting different brands or packaging" overstated certainty: NASA calls different brands a "likely possibility" and lists packaging, storage location, sample preparation and methods as other possible explanations. | Reworded: "NASA thinks different brands were likely tested, and packaging or storage may also have differed." | Reichard 2023 p. 26 |

### Checked and confirmed (no change)

- Dose numbers matched the labels for all 16 remaining entries: KI 130 mg, not more than 1 dose in 24 h (adults over 18); filgrastim 10 mcg/kg once daily under the skin, started after a dose above 2 Gy, stop rule as stated; ketamine into a muscle 6.5 to 13 mg/kg, into a vein 1 to 4.5 mg/kg over 60 s or 1 to 2 mg/kg at 0.5 mg/kg/min, no maximum; morphine into a muscle 10 mg every 4 h, into a vein 0.1 to 0.2 mg/kg every 4 h; lorazepam 2 to 6 mg/day, range 1 to 10 mg/day; sertraline 50 mg (25 mg for PD, PTSD, SAD), weekly steps, max 200 mg/day; caffeine 200 mg not more often than every 3 to 4 h; atropine 0.5 mg every 3 to 5 min, total 3 mg; lidocaine Table 1 (percutaneous 5 to 300 mg; dental 20 to 100 mg) and maximums 4.5 mg/kg and 300 mg without adrenaline, 7 mg/kg and 500 mg with; promethazine 25 mg twice daily (motion sickness), 12.5 to 25 mg every 4 to 6 h (nausea); scopolamine one system (about 1 mg over 3 days), one at a time, at least 4 h before; meclizine 1 to 2 chewable tablets once daily, 1 h before travel; zolpidem 5 mg women, 5 or 10 mg men, max 10 mg once nightly; zaleplon 10 mg, 5 mg for low weight, 20 mg occasionally, above 20 mg not recommended; Circadin 2 mg once daily 1 to 2 h before bed after food, up to 13 weeks; modafinil 200 mg once daily, up to 400 mg tolerated without consistent extra benefit.
- `mgPerKg` is set only for filgrastim (10 mcg/kg, a single stated value). Ranges (ketamine, morphine into a vein) and per-kg maximums (lidocaine, atropine in ischaemic heart disease) stay in text only.
- `calc`: true only for caffeine and meclizine (US OTC monograph products). False for every injectable, opioid, anaesthetic, benzodiazepine, antidepressant, prescription hypnotic, radiation countermeasure (KI, filgrastim), modafinil, promethazine, scopolamine patch and Circadin (UK prescription-only).
- Each gate traced to a label warning or contraindication: ketamine bp sys >= 180 (4, contraindicated where a rise in blood pressure is a serious hazard); morphine spo2 <= 91 (4, significant respiratory depression) and bp sys <= 90 (5, severe hypotension, avoid in shock); lorazepam react (sedation 15.9%; patient information on hazardous tasks) and spo2 (Precautions, compromised respiratory function); sertraline phq4 (boxed warning, worsening and suicidality); caffeine hr (rapid heartbeat) and sleep (not a substitute for sleep); atropine hr (5.2); promethazine react (CNS depression) and spo2 (respiratory depression); scopolamine temp (5.5 hyperthermia: remove the system if body temperature rises) and react (drowsiness); meclizine react (drowsiness, machinery); zolpidem react (next-day impairment); zaleplon react (psychomotor impairment at 1 h); melatonin react (SmPC 4.7); modafinil bp sys >= 140 (5.7, more patients needed new or increased blood-pressure medicine, 2.4% vs 0.7%). Numeric thresholds are Vista bands, as stated in the Method section.
- Spaceflight claims re-read in the local NASA copies: ISS kit rows for ketamine (50 mg/mL, 10 mL, into a muscle, "For use by Physician CMO Only", 3.001 p. 24), lorazepam 1 mg, sertraline 50 mg, caffeine 200 mg (3.001), lidocaine products and dental procedure (2.6.301), ALS atropine and lidocaine through the intraosseous needle (1.103); hydromorphone as the ISS injectable opioid (3.001 p. 25); shuttle list with morphine, atropine and lidocaine (MTB-012 p. 17); BMED "2 anxiolytics, 2 antidepressants, and 2 antipsychotics" and SSRI 2.35 times risk of non-vertebral fractures (p. 66); CSRM lorazepam fatigue and metabolic-rate rationale; MTB-004 caffeine pairing statement; Reichard sertraline figures (98.6% +/- 5.8%, 700 days; Du 2011 353 to 596 days).
- Condition ids: all exist in `kb/kb_conditions.json` or the new batches `c1` to `c4` (fractures, cuts-and-abrasions, dental-problems, abnormal-heart-rhythm, abdominal-pain-and-appendicitis, anxiety-and-panic, depression, acute-radiation-sickness).
- The citation "NASA OCHMO-MTB-012 Rev B" pointing to `ochmo-tb-006-pharmaceuticals.pdf` is correct: NASA serves MTB-012 Rev B at that older file name (see `kb/kb_meds.md`).
- Links: all 15 DailyMed `drugInfo.cfm?setid=` pages returned HTTP 200 on 15 Nov 2026. NASA, NTRS, PubMed (203) and the other DOIs resolved; six publisher landing pages (Wiley, Oxford Academic, FASEB, American Physiological Society, SAGE) returned HTTP 403 to an automated client, which is bot blocking, not a broken link. The Nowadly 2026 SAGE DOI was confirmed through its PubMed record.
- The seven existing entries (promethazine, scopolamine, meclizine, zolpidem, zaleplon, melatonin, modafinil) still match `kb/kb_meds.json` in every field except the added `dose`.

### Removed

- dextrose-gel (no official labelling; see row 1).

Final count: 16 entries (9 new, 7 existing with `dose` added).
