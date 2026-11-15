# Vista library batch c2: research log

Compiled 2026-11-15 for `c2.json` (10 condition entries): chest-pain, abnormal-heart-rhythm, high-blood-pressure, fainting, anaphylaxis, asthma-and-wheeze, toxic-atmosphere-exposure, hypoxia, choking, upper-respiratory-infection.

## Method

- Read `kb/kb_conditions.json`, `kb/kb_meds.json` and `docs/evidence/library-*.md` (plus `clinical-thresholds.md`, `cardio-metabolic.md`) for tone and verified sources.
- NASA PDFs were downloaded in this session to `kb2/src_c2/` and extracted with `pdftotext -layout`; page numbers are PDF pages (they match the printed page numbers on OCHMO briefs). Downloaded this session: OCHMO-TB-003 Rev A, TB-006 Rev F, TB-008 Rev A, TB-015 Rev B, TB-019 Rev B, TB-033 Rev D, TB-044, MTB-012 Rev B, TB-002 (ECLSS). Re-used local copies already in `kb/`: NASA-STD-3001 Vol 1 Rev C (`kb/src/std3001v1.txt`), ISS Emergency Medical Procedures FOIA release 2016 (`kb/dl_emp/emp2016.txt`), TB-011.
- Journal papers: PubMed abstracts retrieved this session (Khine 2018, Ciaccio 2026, Fritsch-Yelle 1998, Norsk 2015, Meck 2001, Crucian 2016).
- Web pages opened this session with WebFetch (summarised by the fetch tool; quoted phrases below are what it returned): NHS chest pain, heart attack, AF symptoms, high blood pressure, fainting, anaphylaxis, asthma attack, common cold; AHA newsroom 14 Aug 2025; PCNA guideline summary; CDC blood pressure measurement; FDA pulse oximeter basics. NEAS (North East Ambulance Service NHS Trust) choking page was downloaded with curl and its text read in full.
- No doses anywhere. Medicines appear only by name or class (aspirin, nitroglycerin, adrenaline auto-injector, albuterol/salbutamol inhaler, antibiotics) with "the flight surgeon decides" or "as the checklist directs". Opened sources that contain doses (NHS heart attack: aspirin; NHS asthma attack: inhaler puffs; EMP 1.101 repeat interval for EpiPen; EMP kit list strengths; TB-019 fluid-loading volumes) were not copied.
- Script `kb2/scripts_c2/build_c2.py` checks Vista system/check keys, no dose-like text, no straight double quotes inside text, and common US spellings. Body length 161 to 184 words (name, summary, why, signs, self-care, escalate), 185 to 210 including source titles. Slightly over the 170 target for six entries, kept for safety wording.

## Source keys

| Key | Source | URL |
|---|---|---|
| STD | NASA-STD-3001 Vol 1 Rev C, Appendix E: Table E.2-1 Sample IMM Output (PDF p. 81), Table E.2-2 High Likelihood or High Consequence conditions (pp. 82-83) | https://www.nasa.gov/wp-content/uploads/2023/11/nasa-std-3001-vol-1-rev-c-with-signature.pdf |
| TB033 | OCHMO-TB-033 Rev D, 12/01/2023 | https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-033-spaceflight-experience-medical-care.pdf |
| EMP | NASA ISS Emergency Medical Procedures and medical kit list, FOIA release 2016 (governmentattic.org) | https://www.governmentattic.org/19docs/NASA-ISSmedicalEmergManual_2016.pdf |
| TB015 | OCHMO-TB-015 Rev B Spaceflight Toxicology, 10/30/2023 | https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-015-spaceflight-toxicology.pdf |
| TB008 | OCHMO-TB-008 Rev A Fire Protection, 11/29/2023 | https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-008-fire-protection.pdf |
| TB003 | OCHMO-TB-003 Rev A Habitable Atmosphere, 11/30/2023 | https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-003-habitable-atmosphere.pdf |
| TB019 | OCHMO-TB-019 Rev B Orthostatic Intolerance, 12/01/2023 | https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-019-orthostatic-intolerance.pdf |
| TB006 | OCHMO-TB-006 Rev F Health Stabilization Program, 05/19/2025 | https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-006-health-stabilization-program.pdf |

## chest-pain

| Claim | Source and section |
|---|---|
| Causes include strained muscle, heartburn (reflux/indigestion), anxiety; also heart attack | NHS Chest pain (reviewed 08 Aug 2023), causes list: acid reflux or indigestion, muscle injury to chest wall, anxiety/panic |
| NASA lists heart attack among high-consequence conditions | STD Table E.2-2, Cardiovascular: "Acute coronary syndrome", "Angina/Myocardial infarction", "Sudden cardiac arrest" |
| Strict crew selection aims to prevent it | TB033 p. 13: "Rigorous crew selection should prevent major conditions from occurring ... Major cardiovascular events, e.g., myocardial infarctions and atrial fibrillation" |
| Carbon monoxide from a fire can cause chest pain | TB015 p. 5, Carbon Monoxide: "most likely be associated with a fire"; symptoms "headache, dizziness, weakness, upset stomach, vomiting, chest pain, and confusion" |
| ISS kit carries aspirin, nitroglycerin and an AED | EMP 3.001 Medical Kit Contents (Pain Reliever: Aspirin; Cardiac: Nitroglycerin (Nitrostat)); EMP 1.102 AED Assisted CPR |
| Signs: tightness/squeezing; spreading to arm, neck, jaw, back; sweating, nausea, light-headed, breathless | NHS Heart attack (reviewed 31 Mar 2026) symptom and 999 lists; NHS Chest pain 999 list |
| Emergency: sudden pain that does not go away, spreads, or with sweating/sickness/breathlessness | NHS Chest pain, "Call 999 if" |
| Start CPR if they stop breathing | NHS Heart attack, "If they stop responding and stop breathing, start CPR"; EMP 1.102 |
| Report pain that comes and goes | NHS Chest pain: see a GP if "you have chest pain that comes and goes" |

## abnormal-heart-rhythm

| Claim | Source and section |
|---|---|
| About 5% of active astronauts have AF, similar to general population but younger | Khine 2018, abstract: "prevalence of atrial fibrillation (AF) in active astronauts is approximately 5%, similar to the general population but at a younger age" |
| After 6 months, left atrium transiently enlarged; none of 13 developed AF | Khine 2018, abstract: LA volume "transiently increased after 6 months in space (12 +/- 18 mL)"; 13 astronauts; "none developed AF" |
| Most in-flight rhythm changes are short-lived extra beats | Ciaccio 2026 (Heart Rhythm review), abstract: "most spaceflight arrhythmias are transient and non-lethal"; frequently reported "isolated premature atrial and ventricular complexes" |
| Freon-type coolant leaks can upset the rhythm | TB015 p. 6, Freons and other halocarbons: "cardiac sensitization leading to rhythm disturbances ... generally noted only at concentrations above 1%" (hence "large leaks") |
| Signs: irregular pulse, rate over 100, racing/fluttering/skipped beats, tiredness, breathlessness, dizziness, sometimes none | NHS AF symptoms (reviewed 13 Jan 2025) |
| Emergency list (chest pain, breathlessness, fainting, one-sided weakness, vision loss, confusion, trouble speaking) | NHS AF symptoms, "Call 999" section |
| Also cited in research, not in final text: NASA plans for AF/flutter (STD Table E.2-2 "Cardiac dysrhythmias (atrial fibrillation/flutter)"); Fritsch-Yelle 1998 non-sustained VT on Mir (removed when trimming) | |

## high-blood-pressure

| Claim | Source and section |
|---|---|
| Home readings of 135/85 or more count as high; rarely causes symptoms; rarely headaches, blurred vision, chest pain | NHS High blood pressure (reviewed 19 Jul 2024) |
| ISS 24-hour BP 8 to 10 mmHg lower than before flight | Norsk 2015, abstract: 24 h systolic, diastolic and mean pressures reduced by 8, 9 and 10 mmHg; 8 male astronauts, 85-192 days on ISS |
| NASA lists hypertension | STD Table E.2-2, Cardiovascular: "Hypertension" |
| ISS kit carries heart medicines | EMP 3.001, Cardiac section: lisinopril (Zestril), metoprolol XL (Toprol XL), nitroglycerin |
| Technique: rest 5 min, bare upper arm, cuff at chest height, no talking, at least 2 readings 1 to 2 min apart | CDC Measuring blood pressure |
| Above 180/120 without symptoms: contact clinician; with chest pain, shortness of breath, back pain, numbness, weakness, change in vision, difficulty speaking: emergency | PCNA summary of 2025 AHA/ACC guideline, Severe hypertension and Hypertensive emergency rows. (AHA category table confirmed in AHA newsroom, 14 Aug 2025; that page does not cover the 180/120 rule. The heart.org "when to call 911" page returned 403 and was not used.) |

## fainting

| Claim | Source and section |
|---|---|
| Short loss of consciousness, too little blood to the brain; usually wake within 30 seconds | TB019 p. 1 (OI: inability to maintain arterial pressure and cerebral perfusion, "syncope (i.e., loss of consciousness)"); NHS Fainting (reviewed 17 Aug 2026): "usually wake within 30 seconds" |
| Main risk after landing | TB019 p. 1: "OI is a major concern when crewmembers are re-introduced to gravity after landing" |
| Blood volume falls about 15%; blood pools in legs in gravity | TB019 p. 2, items C and D: intravascular volume reduced "by around 15%"; on return "gravitational gradient pooling fluids in the lower extremities" |
| 5 of 6 after 129-190 day flights presyncopal on tilt; 5 of 20 after short Shuttle flights | Meck 2001, abstract |
| Low oxygen can cause loss of consciousness | TB003 p. 8: decrements near PaO2 80 mmHg "continue till loss of consciousness at 30mmHg" |
| Heart rhythm problem can cause fainting | NHS AF symptoms (fainting listed with fast/irregular heartbeat as 999 reason) |
| Warning signs; lie down and raise legs or sit with head low; first aid for someone who faints; emergency list | NHS Fainting |
| Compression garments and fluid loading before landing | TB019 p. 3, countermeasures (fluid loading and salt; compression garments). Volumes deliberately omitted |

## anaphylaxis

| Claim | Source and section |
|---|---|
| Usually starts within minutes; symptoms list; triggers (foods, antibiotics, NSAIDs, latex); lie down, legs raised, sit up if breathing hard, do not stand or walk | NHS Anaphylaxis (reviewed 21 Jun 2023) |
| NASA counts allergic reaction and anaphylaxis among conditions for any mission | STD Table E.2-2: "Allergic reaction *", "Anaphylaxis *"; asterisk = "most common and should be considered for any mission duration" (p. 82) |
| 40% of notable ISS immune events were rashes/hypersensitivities | Crucian 2016, abstract |
| ISS emergency pack carries EpiPen auto-injectors; inject into the outer thigh; may be repeated if symptoms recur | EMP 1.101 Severe Allergic Reaction (steps 1.4, 1.6) and 3.001 Table 2 (Emergency Medical Treatment Pack, 2 EpiPen). Repeat interval not copied |
| Dropped during trimming: IMM sample output "Allergic Reaction 1.18 per mission" (STD Table E.2-1) | |

## asthma-and-wheeze

| Claim | Source and section |
|---|---|
| Particles (skin cells, lint, food handling) float in microgravity and more easily reach eyes and lungs | TB015 p. 8, Airborne Particles and Dust: "Microgravity will cause the particles to float, increasing the likelihood that they will enter the eyes and respiratory systems" |
| Ammonia and formaldehyde irritate the airways | TB015 p. 6 (ammonia: coughing, nose and throat irritation) and p. 7 (formaldehyde: "irritant to the eyes and respiratory system") |
| NASA lists asthma | STD Table E.2-2, Pulmonary: "Reactive airway/asthma" |
| ISS kit has oxygen and an albuterol reliever inhaler | EMP 1.108 Difficulty Breathing: Respiratory Support Pack oxygen via non-rebreather mask; "Albuterol (Proventil HFA)" |
| Symptoms (wheeze, cough, breathlessness, chest tightness); sit up straight, stay calm; 999 if worse, no better after reliever, no inhaler | NHS Asthma attack (reviewed 07 Apr 2025). Puff numbers not copied |
| Blue lips or nails as a low-oxygen sign | FDA Pulse oximeter basics |

## toxic-atmosphere-exposure

| Claim | Source and section |
|---|---|
| Ammonia used in thermal control of the US Segment of ISS and Orion; can enter cabin (heat exchanger leak, hard landing, snorkel fan) | TB015 p. 6 |
| Low levels: coughing, nose and throat irritation; high levels: burning of airways, possible respiratory failure | TB015 p. 6 |
| Fires release carbon monoxide; CO symptoms | TB015 p. 5 |
| Apollo-Soyuz 1975: nitrogen tetroxide during descent; respiratory symptoms; out of hospital 6 days after landing | TB015 p. 9, Examples of Toxicological Events. (Mir 1997 oxygen-generator fire, same page, dropped when trimming) |
| Put on mask in smoke, near flame or with symptoms; readings not needed first | TB008 p. 4, Health and Medical Management of an ISS Fire |
| Symptomatic crew: supplemental breathing source with eye protection (PBA) and flight surgeon consult | TB008 p. 4 |
| Rescuer safety first; remove soiled clothes, wipe liquids, irrigate skin with water; remove contact lenses, flush eyes; photograph affected skin | EMP 1.106 Toxic Exposure, steps 1, 2.1, 2.2, 5 |

## hypoxia

| Claim | Source and section |
|---|---|
| Definition: oxygen not sufficient to supply tissues | TB003 p. 5, Physiological Effects - Hypoxia |
| Hard to notice; affects thinking; mistaken for fatigue; easier to spot in others; altitude chamber training | TB003 p. 5 ("CNS: mental changes, at times undetectable to crew") and p. 6 (recognition, pre-flight hypoxia training, monitoring fellow crew) |
| ISS at sea-level pressure (14.7 psia) with 21% oxygen | TB003 p. 8 |
| Pressure leak or oxygen-supply problem | TB003 p. 1 (inadequate oxygen supply) and p. 7 (air pressure falls "due to pressure vessel specification leakage or some contingency") |
| Subtle effects near arterial PaO2 80 mmHg; loss of consciousness near 30 mmHg | TB003 p. 8 |
| Signs: fatigue, nausea, headache, dizziness, mood change, sleep, colour/night/peripheral vision, hyperventilation | TB003 p. 5 list |
| Put on an oxygen mask; main treatment is supplemental oxygen | TB003 p. 3 ("Crew are trained to don oxygen masks anytime symptoms of hypoxia are experienced") and p. 6 (Hypoxia Treatment) |
| SpO2 95-100% in most healthy people; blue lips/face/nails, worsening breathlessness, chest pain as warning signs; cold hands affect readings | FDA Pulse oximeter basics |

## choking

| Claim | Source and section |
|---|---|
| Partial block: can speak, breathe, cough; severe: cannot speak, cough or breathe; keep coughing and spit out | NEAS NHS Trust Choking page |
| NASA lists choking | STD Table E.2-2: "Choking/obstructed airway" (also TB033 p. 13) |
| ISS checklist has a choking procedure: abdominal thrusts (fist above belly button, below ribcage, pull sharply in and up, repeat until clear); if unconscious, head tilt-chin lift, remove object if easily accessible, breaths, then CPR; afterwards take pulse, respiratory rate and BP and consult surgeon | EMP 1.105 Choking, blocks 1 to 5 |
| Food-handling particles float in weightlessness and more easily reach airways | TB015 p. 8 |
| Note: NEAS (ground) guidance starts with up to 5 back blows before abdominal thrusts; the ISS checklist goes straight to abdominal thrusts. The entry follows the ISS checklist and does not mention back blows. | |

## upper-respiratory-infection

| Claim | Source and section |
|---|---|
| Symptoms build over 2 to 3 days, ease in 1 to 2 weeks; symptom list; rest, fluids; hygiene; antibiotics do not help; see GP if temperature over 3 days, not better after 10 days, chest pain or breathlessness | NHS Common cold (reviewed 22 Mar 2024) |
| Apollo 7 and Apollo 9: upper respiratory infection in 3 crew each (pre- and in-flight), before the HSP | TB006 p. 4 table |
| HSP begins 14 days before launch | TB006 p. 1 |
| About 1 episode of upper respiratory symptoms per crew member per flight year (0.97) | Crucian 2016, abstract |
| Head/nasal congestion from space adaptation or CO2 affects over 50% of crew | TB033 p. 4 |

## Not sourced, left out

- No source found on how to give abdominal thrusts or CPR in weightlessness (bracing, restraints for a choking rescue); only the ISS checklist steps are used. The AED procedure mentions the Crew Medical Restraint System, but not for choking.
- No source found for how often chest pain, hypertension, fainting in flight, asthma or anaphylaxis has actually occurred on the ISS; the entries give only NASA planning lists and the IMM sample-mission figures.
- The 2015 ISS ammonia alarm was not used: news reports and NASA statements describe it as a false alarm, and no NASA primary page was opened.
- The heart.org hypertensive-crisis page (403) could not be opened; the 180/120 rule rests on the PCNA summary of the 2025 AHA/ACC guideline.
- MTB-012 p. 8 medication-use table (Wotring 2015, congestion/allergy use) was not used because the PDF text layout made the row-to-value pairing uncertain.
- No in-flight case of atrial fibrillation in a career astronaut was found in an opened source; Khine 2018 reports prevalence in active astronauts (not necessarily in flight).

## Verification log

Adversarial fact-check, 2026-11-15. Every cited source was re-opened: NASA PDFs re-read from the local copies in `kb2/src_c2/` and `kb/src/std3001v1.txt`, `kb/dl_emp/emp2016.txt` (all live URLs re-checked: HTTP 200/206); journal abstracts re-read from PubMed (PMIDs 29752376, 42982387, 25774397, 11719623, 27843335; all five DOIs match); NHS, CDC, FDA and PCNA pages re-fetched with WebFetch; NEAS page text re-read from `kb2/src_c2/neas.html`. Pre-fix copy kept as `kb2/c2.pre-fc.json`; fixes applied by `kb2/scripts_c2/fix_c2.py` plus a short trim pass.

| # | Entry | Problem found | Fix | Source |
|---|---|---|---|---|
| 1 | chest-pain, choking | "high-consequence conditions" misdescribes Table E.2-2, which is titled "High Likelihood or High Consequence" and does not separate the two | Now "high-likelihood or high-consequence conditions" | STD Vol 1 Rev C, Table E.2-2 (p. 82) |
| 2 | chest-pain | "expert help is far away" had no source | Removed | n/a |
| 3 | chest-pain, high-blood-pressure, anaphylaxis, asthma-and-wheeze, choking | Present-tense claims that "the ISS kit carries" items rest on a 2016 FOIA checklist; current kit contents not confirmed | Reworded to "a 2016 ISS checklist / kit list includes..." | EMP 2016 (3.001, 1.101, 1.102, 1.105, 1.108) |
| 4 | chest-pain | Sign "Tightness or squeezing" did not match NHS wording | "Crushing, squeezing or tight pain in the chest" (heart attack page: "crushing or squeezing"; AF page: "chest pain or tightness") | NHS Heart attack; NHS AF |
| 5 | abnormal-heart-rhythm | "Most rhythm changes in flight are short-lived extra beats" overstated the review: it says most are "transient and non-lethal" and extra beats are the most frequently reported | "Most rhythm changes seen in flight are brief and not dangerous; single extra beats are the most often reported." | Ciaccio 2026 abstract (PMID 42982387) |
| 6 | abnormal-heart-rhythm | "Freon-type coolants": TB-015 lists Freon 218 as a compound used in systems, not as a coolant | "Freon-type gases used in onboard systems" | TB-015 Rev B pp. 3, 6 |
| 7 | high-blood-pressure | "So a high reading in flight is unusual" is an inference from one study of 8 men; the study's scope was not stated | States the study size ("one study of 8 astronauts") and says only that a high reading "still needs checking" | Norsk 2015 abstract (PMID 25774397) |
| 8 | high-blood-pressure | "the ISS kit carries heart medicines": the drugs listed (lisinopril, metoprolol) are blood pressure medicines | "blood pressure medicines" (no names or strengths) | EMP 2016, 3.001 Cardiac |
| 9 | fainting | "blood volume falls by about 15%": the source says circulating (intravascular) fluid volume | "the fluid in your blood vessels falls by about 15%" | TB-019 Rev B p. 2, item C |
| 10 | anaphylaxis | "raised, itchy rash": NHS says only that a rash may also occur | "Sometimes a rash as well" | NHS Anaphylaxis (reviewed 21 Jun 2023) |
| 11 | anaphylaxis | Injection site given without saying where it comes from (NHS does not state the site) | Added "as the checklist shows" (EMP 1.101 step 1.4: outer thigh) | EMP 2016, 1.101 |
| 12 | asthma-and-wheeze | "Blue lips or nails in a severe attack" was attributed to the NHS asthma page, which does not mention blue lips; the only source is FDA (a low-oxygen sign) | "Blue lips or nails, a sign of low oxygen" | FDA Pulse oximeter basics (updated 26 Mar 2025) |
| 13 | toxic-atmosphere-exposure | "spent 6 days in hospital": TB-015 says the crew were "released from the hospital 6 days post-landing" | "left hospital 6 days after landing" | TB-015 Rev B p. 9 |
| 14 | toxic-atmosphere-exposure | Self-care and escalation applied fire-specific TB-008 guidance (mask on with symptoms; PBA with eye protection and a flight surgeon call) to every toxic exposure, including skin-only spills | Limited to symptoms from smoke or fire products; for any leak or spill: "follow the checklist and call the ground" | TB-008 Rev A p. 4; EMP 1.106 step 3.1 |
| 15 | choking | Misapplied source: TB-015 says floating particles (skin, lint, food handling) cause eye and airway irritation, not choking | Sentence removed; TB-015 removed from choking sources. Replaced with the sourced fact that the ISS checklist goes straight to abdominal thrusts while ground guides start with back blows | EMP 1.105; NEAS Choking |
| 16 | choking | Signs "Coughing after eating or drinking" and "Lips or skin turning blue or grey" are in neither cited source | Signs rewritten from NEAS: partial block (can speak and breathe, coughing); full block (cannot speak, cough or breathe); loss of consciousness if not cleared | NEAS Choking |
| 17 | upper-respiratory-infection | "stuffy head from the fluid shift": TB-033 attributes head and nasal congestion to "space adaptation or CO2" | "from adapting to space, or from CO2" | TB-033 Rev D p. 4 |
| 18 | chest-pain, fainting, abnormal-heart-rhythm, asthma-and-wheeze | Redirected URLs: NHS chest pain goes to /symptoms/chest-pain/, fainting to /symptoms/fainting/, AF symptoms to /conditions/atrial-fibrillation/, asthma attack to /conditions/asthma/ | URLs updated to the canonical pages; the content was re-checked on each, and AF and asthma titles were updated (same review dates: 13 Jan 2025 and 07 Apr 2025) | NHS |

Checked and confirmed (no change): Khine 2018 (about 5% AF prevalence; LA volume rose transiently; 13 astronauts; none developed AF); Norsk 2015 (8 to 10 mmHg); Meck 2001 (5 of 6 after 129 to 190 days; 5 of 20 after short Shuttle flights); Crucian 2016 (40% of notable events were rashes or hypersensitivities; upper respiratory symptoms 0.97 per flight year); TB-006 Rev F (HSP 14 days before launch; Apollo 7 and 9, 3 crew each); TB-003 Rev A (14.7 psia, 21% O2; PaO2 80 and 30 mmHg; symptoms; training; oxygen masks); TB-015 (ammonia on the US Segment and Orion; CO symptoms; halocarbons above 1%); NHS chest pain, heart attack, AF, high blood pressure (135/85 home), fainting (30 seconds; head between knees; 999 list), anaphylaxis, asthma, common cold; CDC measurement steps; PCNA 180/120 rows; FDA SpO2 95% to 100%.

Residual notes: there are no doses anywhere, and none were added. The AF sign says "resting rate over 100" where NHS says "faster than 100 beats per minute"; "resting" was kept on purpose so that exercise heart rates are not flagged. Body word counts are 164 to 194 (name, summary, why, signs, self-care, escalate). That is over the 170 target for 8 entries; the extra words are safety wording. Entries removed: none. Final count: 10.
