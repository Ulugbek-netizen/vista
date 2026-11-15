# Vista library, batch c3: research log

Research log for `c3.json` (11 condition entries: nausea and vomiting, diarrhoea, constipation, heartburn and reflux, belly pain and appendicitis, urinary retention, urinary tract infection, space anaemia, weight loss and under-eating, menstrual health, low blood sugar). Compiled 2026-11-15.

## Method

- Read `kb/kb_conditions.json`, `kb/kb_meds.json`, `kb/kb_conditions.md` first and matched their tone, length and source style. Reused sources already verified for the first 20 entries where they covered these topics (MTB-003, MTB-004, TB-010, TB-020, TB-033, Smith 2021, NASA-STD-3001 Vol 1, Crucian 2016).
- NASA PDFs were read from the copies in `kb/src/` (text extracted with `pdftotext`; page numbers are PDF pages unless "printed p." is given). The Smith 2021 nutrition book is a two-page-spread PDF, so printed page numbers are given for it.
- Journal papers were read through PubMed: full text from PubMed Central where marked "full text", otherwise the abstract.
- NHS, NIDDK and CDC pages were opened directly in this session (review dates noted).
- Built and checked by `kb2/build_c3.py`: Vista system and check keys, no dose-pattern text (same regex as `kb/scripts/build_kb.py`), no common US spellings (list extended with anemic, diarrhea, anesthesia), ASCII only, no double quotes.
- No medicine doses appear. Medicines are named only as classes (anti-sickness medicine, anti-diarrhoea medicine, stool softeners and laxatives, antacids, antibiotics, iron supplements, the combined pill), always with the flight surgeon deciding. The one amount given is food sugar for a measured low glucose (see entry 11), from NIDDK, tied to the Vista `glucose` check.
- "Design rule" marks escalation wording that is a Vista safety instruction, not a sourced fact. These need flight-surgeon review.
- Word counts (summary + why + signs + selfcare + escalate): 160 to 184. Three entries run slightly over 170 (menstrual health 184, heartburn 177, nausea 175) because safety wording was kept.

Abbreviations: MTB/TB = NASA OCHMO medical technical brief / technical brief. Smith = Smith, Zwart, Douglas, Heer, Human Adaptation to Spaceflight: The Role of Food and Nutrition, 2nd ed., NASA 2021.

## 1. Nausea and vomiting (`nausea-and-vomiting`)

| Claim | Source and location |
|---|---|
| Space motion sickness settles within 2 to 3 days | MTB-004 Rev A p. 1 Executive Summary ("first 2-3 days"); same figure as existing `space-motion-sickness` entry |
| NASA plans for stomach infections in flight | TB-033 Rev D p. 13, "Additional In-Mission Conditions": "Infectious/Immune diseases - pharyngitis; influenza; gastroenteritis..." |
| Kidney stone can cause vomiting with pain | MTB-003 Rev A p. 5, HSRB renal stone risk quote: "renal colic (pain), nausea, vomiting, hematuria..." |
| Nausea and tiredness after a solar storm can be early radiation sickness | TB-020 Rev G p. 2, "In Mission Risk - Acute Radiation Syndromes from SPEs": "nausea, vomiting, and fatigue, may occur due to in mission radiation exposure" |
| Vomiting drains body fluid and can dehydrate | MTB-004 p. 3, "Genitourinary issues": "nausea and vomiting reduces fluid volume increasing dehydration risk" |
| Signs: dark urine / less urine; green, bloody or coffee-ground vomit | NHS Diarrhoea and vomiting (reviewed 21 Dec 2023): dehydration signs "dark, smelly pee or peeing less than usual"; 999 list "vomit blood or have vomit that looks like ground coffee", "green vomit (adults)" |
| Small sips; eat when able; hand washing; do not prepare food for others | NHS Diarrhoea and vomiting, "How to treat" and "How to avoid spreading" |
| Do not start a spacewalk while sick; vomit in a suit is dangerous | TB-010 Rev A p. 8, ISS flight rule box: no EVA before MET 72 h because suit donning may provoke illness and "endanger the crewmember with vomitus in the suit"; p. 7 suit vomitus requirement |
| Escalate: cannot keep fluids down; vomiting more than 2 days | NHS D&V, "Call 111": "keep being sick and cannot keep fluid down"; "vomiting for more than 2 days" |
| Emergency: bloody/green vomit, sudden severe belly pain or headache, confusion | NHS D&V, "Call 999 or go to A&E" list |
| Report sickness after a radiation alert | Design rule, based on TB-020 p. 2 above |
| Checks `water`, `mass`, `temp`, `dose` | Design rule |

## 2. Diarrhoea (`diarrhoea`)

| Claim | Source and location |
|---|---|
| Common in the first few days of flight | MTB-004 p. 3, "Metabolic capacity": "Symptoms of nausea, vomiting, diarrhea, malaise, and marked lack of appetite often occur in the first few days" |
| NASA plans for stomach infections | TB-033 p. 13 (gastroenteritis) |
| Crews quarantined before launch to keep germs off board | TB-033 p. 3: screening and pre-flight quarantine in the Health Stabilization Program "lessens potential in-mission impacts of infectious disease" |
| Food-borne illness could end a mission; strict safety controls | Smith printed pp. 19-20: "an incidence of foodborne illness could result in loss of a mission, and even loss of life"; HACCP developed for the spaceflight food system |
| Signs (loose stools, cramps, sickness, fever, thirst, dark urine, dizziness) | NHS D&V (symptoms and dehydration signs) |
| Small sips; oral rehydration salts | NHS D&V: "take small sips if you feel sick"; pharmacist "oral rehydration" sachets |
| Hand washing; do not prepare food for others | NHS D&V, "How to avoid spreading" |
| An anti-diarrhoea medicine is carried on the ISS | Wotring 2016, AAPS J 18:210, doi 10.1208/s12248-015-9834-5 (full text): samples from unused ISS medical supplies included "an antidiarrheal" (loperamide) |
| Escalate: blood in stool; cannot keep fluids down; more than 7 days | NHS D&V, "Call 111": "bloody diarrhoea or bleeding from the bottom", "cannot keep fluid down", "diarrhoea for more than 7 days" |
| Emergency: sudden severe belly pain, confusion | NHS D&V, 999 list |

## 3. Constipation (`constipation`)

| Claim | Source and location |
|---|---|
| Fewer than 3 stools a week; hard, dry, lumpy; straining or pain | NHS Constipation (reviewed 26 Oct 2023), "Check if you have constipation" |
| Fluid shifts and drinking less tend to slow the gut | Smith printed p. 29-30: "Fluid shifts, in combination with reduced fluid intake, would tend to decrease GI motility" |
| Bed-rest study: slower transit | Smith printed p. 30: during 10 days of head-down bed rest "mouth-to-cecum transit time was significantly longer" |
| ISS crews eat less fibre than recommended; standard menu does not provide enough | Smith printed p. 34, Figure 11 text: "the standard menu did not provide, nor did crewmembers select, foods to meet recommended daily intakes of fiber" |
| Ignoring the urge makes it worse | NHS Constipation, causes: "often ignoring the urge to go to the toilet" |
| Self-care: fibre added gradually, fluids, exercise, go when you feel the urge | NHS Constipation, "How you can treat constipation yourself" |
| Stool softeners and laxatives are on board | MTB-004 p. 3: "Crew is treated with fluid management and fiber in diet; stool softeners and laxatives are available if needed" |
| Escalate: not improving; blood; weight loss; ongoing tiredness | NHS Constipation, "See a GP if" |
| Sudden severe belly pain is an emergency | NHS D&V 999 list ("sudden, severe tummy ache"); Design rule to apply it here |

## 4. Heartburn and acid reflux (`heartburn-and-reflux`)

| Claim | Source and location |
|---|---|
| Burning in middle of chest; sour taste; worse after eating; hiccups, cough | NHS Heartburn and acid reflux (reviewed 20 Nov 2023), symptoms |
| A heart attack can feel like indigestion | NHS Heart attack (reviewed 31 Mar 2026): symptoms include "feeling like you have indigestion" |
| Triggers: coffee, fatty or spicy food, stress, anti-inflammatory painkillers | NHS Heartburn, causes |
| Pain medicines are among those crews use most on the ISS | Wotring 2015, FASEB J 29:4417, doi 10.1096/fj.14-264838 (abstract): "most frequently used medications on the ISS were for sleep problems, pain, congestion, or allergy" |
| Long-term acid-reducing medicine cuts absorption of iron, folate, vitamin B12 | Smith printed pp. 206-207, "Antacids and Proton Pump Inhibitors" |
| Smaller meals; avoid triggers; no food 3 to 4 hours before bed | NHS Heartburn, "Things you can do" |
| Antacids not for regular long-term use | NHS Heartburn, pharmacist section |
| Escalate: most days, food sticking, being sick, weight loss | NHS Heartburn, "See a GP if" |
| Heart attack signs: squeezing chest pain, spread to arm, neck, jaw, breathlessness, sweating | NHS Heart attack, symptoms and "Call 999" |

## 5. Belly pain and appendicitis (`abdominal-pain-and-appendicitis`)

| Claim | Source and location |
|---|---|
| Appendicitis is the most common condition needing surgery | Kamine 2022, Aerosp Med Hum Perform 93:760, doi 10.3357/AMHP.6062.2022 (abstract): "Appendicitis and appendectomy are the most common surgical pathology and procedure performed" |
| NASA lists appendicitis, gallbladder attacks, bowel blockage, kidney stones as possible in-flight conditions | TB-033 p. 13, "Abdominal conditions" |
| Surgery in weightlessness is very hard | Miller 2021, Surg Innov 29:616, doi 10.1177/15533506211053210 (abstract): appendectomy "far from routine for a non-surgeon working in microgravity where IVs do not drip, drains do not drain..." |
| Removing the appendix before flight is not advised; raises later bowel-blockage risk | Reyes 2020, Surg Innov 28:573, doi 10.1177/1553350620979809 (abstract): surgery "increases the risk of small bowel obstruction"; "this analysis does not support the prophylactic removal of appendix and/or gallbladder" |
| Signs: starts around belly button, moves to lower right; sickness, appetite loss, fever; spreading severe pain (burst appendix) | NHS Appendicitis (reviewed 9 Aug 2024) |
| Emergency: severe pain, pain spreading across the belly, sepsis signs (confusion, blotchy or pale skin, trouble breathing) | NHS Appendicitis, "Call 999 or go to A&E" |
| Self-care (note pain, record vitals) and "tell CMO about pain that does not settle" | Design rule |

## 6. Trouble passing urine (`urinary-retention`)

| Claim | Source and location |
|---|---|
| At least 9 in-flight cases | MTB-003 p. 8: "9 cases of urinary retention have been documented during spaceflight" (16 if suggestive symptoms are included) |
| Mostly early in a mission | MTB-004 p. 3: fluid shifts, bladder sensation, psychosocial and neuromuscular factors "can cause urinary retention in the first few days"; TB-033 p. 4: "subset of crew who experience urinary retention with space adaptation" |
| And on landing day | MTB-003 p. 9: "Symptomatic urinary retention happens in flight and on landing day"; p. 8: "Retention risk increased on post-flight day 1" |
| Theory: urine clings to bladder wall; urge only when full | MTB-003 p. 9, "Bladder physiology in space" ("One theory...") |
| Anti-sickness medicines can stop the bladder emptying | MTB-003 p. 3: "Anticholinergic medications often used to prevent space adaptation sickness can interfere with normal bladder function"; Stepaniak 2007, Aviat Space Environ Med 78(4 Suppl):A5 (abstract): retention after promethazine and scopolamine before launch |
| Schedules and suit nappies make crew put off going | MTB-003 p. 3 ("Crew may be hesitant to urinate or use MAG"); p. 8 ("Psychosocial - retention due to schedule and toilet access") |
| Odds about 4.5 times higher for women in flight | MTB-003 p. 8: "4.5x higher among female astronauts" |
| Signs | NIDDK Urinary retention symptoms page: inability to urinate, lower abdominal pain, urgent need, swelling; chronic: slow stream, not emptying |
| Being unable to pass urine is urgent | NIDDK: "See a health care professional right away"; "Acute urinary retention can be life threatening" |
| Untreated can lead to kidney infection | MTB-003 p. 9, "Consequences of urinary retention: UTIs, pyelonephritis (kidney infection), and potentially sepsis" |
| Self-care: do not put off going; tell flight surgeon of past trouble before anti-sickness medicine | Design rule from MTB-003 p. 3 and p. 8 |

## 7. Urinary tract infection (`urinary-tract-infection`)

| Claim | Source and location |
|---|---|
| 2 cases in 46 ISS crew | Crucian 2016, Int J Gen Med, doi 10.2147/IJGM.S114188 (full text), Table 1: urinary tract infection, 2 events, 46 crew, 20.57 flight years |
| Untreated can spread to the blood | MTB-003 p. 3: "Serious or untreated UTI can lead to sepsis"; p. 10 |
| Suit nappies, catheters, residual urine, cramped toilet raise risk; women more prone | MTB-003 p. 10: MAG, PVR, limited toilet space, catheterisation; "Females are more susceptible... shorter urethra" |
| Sepsis, mostly urinary, is third most likely reason for emergency return | MTB-003 p. 1 Executive Summary (Integrated Medical Model) |
| Signs | NHS UTIs (reviewed 11 Jul 2025), symptoms list |
| Self-care: pale urine; do not hold urine; wipe front to back; clean and dry | NHS UTIs, self-help and prevention |
| Antibiotics are the treatment | MTB-003 p. 10: "Antibiotics are the treatment of choice for UTI" |
| Urgent: fever, shivering, back pain, blood in urine; emergency: confusion, drowsiness | NHS UTIs, "urgent GP or 111" and "999" lists |

Not used: the Apollo 13 Haise case (MTB-003 p. 13) was in an earlier draft and cut for length.

## 8. Space anaemia (`space-anaemia`)

| Claim | Source and location |
|---|---|
| More red cells destroyed in space; 54% higher through 6-month missions in 14 ISS astronauts | Trudel 2022, Nat Med 28:59, doi 10.1038/s41591-021-01637-7 (full text, PMC8799460): "CO elimination in space over 6 months... was increased 54%"; 14 astronauts |
| Haemoglobin about 9% lower 4 days after landing; 5 of 13 anaemic | Trudel 2022: "8.8% ... decrease in hemoglobin concentration 4 days after landing ... 5 of 13 astronauts (38.5%) reaching clinical levels of anemia" |
| Some effects lasted a year | Trudel 2022: "1 year after landing, CO elimination was 30% ... higher" |
| ISS exercise and diet did not prevent it | Trudel 2022: "The specific exercise and nutritional countermeasures of modern space travel did not prevent hemolysis and postflight anemia" |
| Tiredness, faintness on standing affected by anaemia | Trudel 2022 introduction: "astronaut orthostatism, exercise tolerance and fatigue are key functions affected by anemia" |
| Signs: tiredness, breathlessness, palpitations, pale skin, headaches | NHS Iron deficiency anaemia (reviewed 26 Jan 2024), symptoms |
| ISS food provides plenty of iron | Smith printed p. 85: "The iron content of the ISS food system is very high" |
| Too much iron linked to bone loss and cell damage | Smith printed pp. 84-86: iron stores rise in flight; greater ferritin rise linked to greater bone loss and oxidative damage |
| Escalation wording | Design rule |

## 9. Weight loss and under-eating (`weight-loss-and-under-eating`)

| Claim | Source and location |
|---|---|
| Apollo to Shuttle about 70%, ISS about 80% of needs; many ISS crews now meet needs | Smith printed p. 28-29, "Energy Intake" |
| Weight lost is mostly muscle and fat, not water | Smith printed p. 31: "Only about 1% of the loss of body mass can be explained by loss of body water ... most ... loss of muscle and fat tissue" |
| Losses of 1% to 5% typical; 2 of 79 ISS astronauts lost more than 10% | Smith printed p. 30 and Figure 9 caption |
| Under-eating adds to bone and muscle loss; worsens orthostatic tolerance after flight | Smith printed p. 31: undernutrition "exacerbates the negative effects of bed rest on musculoskeletal and cardiovascular systems"; "impair cardiovascular performance (orthostatic tolerance) ... after spaceflight"; "Inadequate energy intake can also have negative effects on bone" |
| Lower endurance, then strength | Smith printed p. 32: "early decreases in endurance, and a later decrease in strength" |
| Exercise must be matched with food | Smith printed p. 31: "exercise regimens must be coordinated with energy provision" |
| Crews are to be given 100% of calculated energy needs | NASA-STD-3001 Vol 1 Rev C, [V1 4020], PDF p. 36 |
| Loss beyond about 3% starts to cut strength and power (military data) | Smith printed p. 32: military review, energy deficit "corresponding to a total body mass loss of < 3.3% of baseline, to prevent or limit decline in physical performance" |
| "Mass keeps falling" trigger | Design rule |

## 10. Periods and menstrual health (`menstrual-health`)

| Claim | Source and location |
|---|---|
| Women on long missions have often taken the combined pill continuously | Jain and Wotring 2016, npj Microgravity 2:16008, doi 10.1038/npjmgrav.2016.8 (full text): "During long-duration missions, female astronauts have often continuously taken the combined oral contraceptive pill"; Smith printed p. 207: "It is common for astronauts to continually suppress their menstrual cycles during ISS missions" |
| ISS urine system not designed for menstrual blood; hygiene harder; full amenities available | Jain and Wotring 2016, "Spaceflight related" |
| Implant or hormonal coil are options | Jain and Wotring 2016, "Menstrual suppression methods" and Discussion |
| 3-monthly injection lowers bone density; poor fit for space | Jain and Wotring 2016: "Several studies have found a reduction in BMD with DMPA ... would not be acceptable for this subpopulation" |
| Coil or implant best fitted 1.5 to 2 years before flight | Jain and Wotring 2016, "Operational considerations": "insert it at least 1.5-2 years before flight" |
| Breakthrough bleeding common in first months; headaches, mood changes | NHS Combined pill side effects (reviewed 15 Feb 2024) |
| Blood clots up to 1 in 1,000 users | NHS Combined pill side effects: "affects up to 1 in 1,000 people" |
| Vomiting within 3 hours; diarrhoea over 24 hours | NHS Combined pill: sickness or diarrhoea (reviewed 15 Feb 2024) |
| Abnormal bleeding is a condition NASA plans for | TB-033 p. 13 ("abnormal uterine bleeding") |
| Clot signs: painful swollen leg, chest pain, sudden breathlessness | CDC Blood clots page: DVT swelling, pain; PE difficulty breathing, chest pain |
| Escalation wording | Design rule |

Not used: Smith printed p. 84 iron intake figures by menstrual status (dose-like numbers, left out).

## 11. Low blood sugar (`low-blood-sugar`)

| Claim | Source and location |
|---|---|
| Rare without diabetes; malnutrition is one cause | NHS Low blood sugar (reviewed 3 Aug 2023): "People without diabetes: This is rare"; causes include malnutrition |
| Brain relies on sugar | Smith printed p. 33: brain and red cells "depend solely on carbohydrate for energy" |
| Liver stores run out after 12 to 18 hours without food | Smith printed p. 33: "Stores of glycogen in the liver are depleted after 12 to 18 hours of fasting" |
| Crews often eat less than they need | Smith printed p. 28 (see entry 9) |
| Russian study: lower fasting blood sugar after 60 or 88 days | Smith printed p. 34: "reduction in fasting plasma glucose after 60 or 88 days of flight on a Salyut-Soyuz" |
| Too little carbohydrate can slow emergency response | Smith printed p. 34: suboptimal carbohydrate intake may "impede their ability to respond in emergency situations" |
| Signs | NHS Low blood sugar symptoms; NIDDK Low blood glucose symptoms |
| Threshold below 70 (mg/dL) | NIDDK Low Blood Glucose page: "lower than 70 milligrams per deciliter (mg/dL)" (written for people with diabetes; used here as the Vista `glucose` check threshold) |
| Treat with 15 to 20 grams of fast sugar; recheck after 15 minutes; repeat | NIDDK: "Eat or drink 15 to 20 grams of glucose or carbohydrates right away", "Wait 15 minutes and check ... again", repeat |
| Then eat a snack or meal | NHS Low blood sugar treatment; NIDDK after-treatment snack |
| Emergency: very confused, fit, unconscious | NHS Low blood sugar: severe symptoms (fit, unconscious) and 999 advice |
| "Tell CMO about any low reading" | Design rule (NHS: people without diabetes with symptoms should see a GP) |

## Could not source (left out)

- Any in-flight rate of diarrhoea, constipation, heartburn or appendicitis among astronauts: none found in NASA briefs or PubMed. Crucian 2016 excludes GI symptoms in the first 30 days as adaptation and lists none later.
- Any spaceflight-specific evidence on acid reflux or heartburn (PubMed search found none); the entry relies on general NHS guidance plus ISS medication-use and nutrient-interaction data.
- Whether current EVA suits carry food, and EVA energy cost figures: not used, so the low-blood-sugar entry does not link sugar lows to spacewalks.
- A sourced in-flight weight-loss alarm threshold beyond the military 3.3% figure; "mass keeps falling" is a design rule.
- Warning signs of bowel obstruction: the NHS page URLs tried returned 404, so obstruction signs were not listed.
- Specific medicine names and doses for nausea, diarrhoea, constipation, reflux, UTI or retention (e.g. loperamide, tamsulosin, promethazine) are deliberately not given in condition entries.

## Verification log

Adversarial fact-check of `c3.json`, 2026-11-15. Every NASA PDF URL was downloaded again from the live site (all HTTP 200) into `kb2/fc3/` and re-read. MTB-003 and TB-033 are byte-identical to the `kb/src/` copies used to write the entries. The footers of the live MTB-004 (09/25/2025 Rev A), TB-010 (12/01/2023 Rev A), TB-020 (06/06/2025 Rev G) and TB-033 (12/01/2023 Rev D) match the citation labels. Journal papers were checked again in PubMed: metadata and abstracts for Wotring 2015 (PMID 26187345), Kamine 2022 (PMID 36243909), Miller (PMID 34865575), Reyes (PMID 33339485), Stepaniak 2007 (PMID 17511293) and Trudel 2022 (PMID 35031790). Full text was read for Trudel 2022 (PMC8799460), Wotring 2016 (PMC4706284), Crucian 2016 (PMC5098747) and Jain and Wotring 2016 (PMC5516549, Europe PMC XML). Every NHS, NIDDK and CDC page was opened again. The fixes were made in `build_c3.py` (patch: `work/patch_c3c.py`; pre-fix copies: `work/build_c3.pre-fc3.py`, `work/c3.pre-fc3.json`). Then `c3.json` was rebuilt and validated again: keys, ASCII only, no double quotes, no dose patterns, British spelling.

### Problems found and fixed

| # | Entry | Problem | Fix | Source checked |
|---|---|---|---|---|
| 1 | weight-loss-and-under-eating | Misleading numbers. "Losses of 1% to 5% of preflight mass are typical" is the book's figure for all spaceflight history. It sat next to the ISS figure "2 of 79 lost more than 10%" and left out that the same caption gives 57% (45 of 79) of ISS astronauts losing 5% to 10%. Read together, the text understated ISS losses. | "In one ISS study, 45 of 79 astronauts lost 5% to 10% of their preflight mass and 2 lost more than 10%." | Smith 2021, Figure 9 caption (printed p. 31): "Three percent of astronauts (2 of 79) lost >10% body mass, whereas 57% (45 of 79) lost 5% to 10% of preflight mass" |
| 2 | weight-loss-and-under-eating | "though many now meet their needs" overstated the source, which names only "some of the ISS missions" as exceptions. | "though some recent crews have met their needs" | Smith 2021 printed pp. 28-29 |
| 3 | weight-loss-and-under-eating | "losses beyond that start to cut strength and power" was more specific than the source. The 3.3% figure is the limit "to prevent or limit decline in physical performance" (measured as lower-body performance). | "start to reduce physical performance" | Smith 2021 printed p. 32 |
| 4 | nausea-and-vomiting | No source says sickness after the first few days "usually has another cause". "Normally settles within 2 to 3 days" dropped the source's own caveat. | Summary: "may have another cause". Why: "usually lasts 2 to 3 days, though longer in some crew." | MTB-004 p. 1: symptoms "last 2-3 days (or longer in some crew)" |
| 5 | diarrhoea | The signs "Stomach cramps ... or a fever" are not on the cited NHS page. "Thirst ... dizziness" were not on any cited page (the D&V page lists only dark pee and peeing less). | Sign changed to "Feeling sick, vomiting or a high temperature" (NHS D&V: often caused by a stomach bug; stay at home "If you have a high temperature"). Kept "Thirst, dark urine or dizziness" and added NHS Dehydration (reviewed 1 May 2026) as a source: "feeling thirsty", "dark yellow, strong-smelling pee", "feeling dizzy or lightheaded". | NHS D&V (21 Dec 2023); NHS Dehydration https://www.nhs.uk/conditions/dehydration/ |
| 6 | diarrhoea | "Diarrhoea is common in the first few days of flight" overstated MTB-004. The brief lists diarrhoea among space adaptation symptoms that "often occur" in the first few days but gives no rate. Crucian 2016 left out early GI symptoms, counting them as adaptation. | "Diarrhoea can come with space adaptation in the first few days of flight." | MTB-004 p. 3; Crucian 2016 Table 1 footnote |
| 7 | diarrhoea | "An anti-diarrhoea medicine is carried on the ISS" claimed the ISS stocks one now. The source shows only that one was among unused ISS supplies returned for study. | "has been carried on the ISS" | Wotring 2016 (PMC4706284): the medicines studied included "an antidiarrheal" from unused medical supplies |
| 8 | constipation | "tend to slow the gut" presented a hypothesis as fact. "ISS crews usually eat" generalised from one dietary analysis. | "Some crew get constipated in space. Fluid shifts and drinking less may slow the gut." and "ISS crews have eaten less fibre than recommended, and the standard menu did not provide enough." | Smith 2021 printed pp. 29-30 ("would tend to decrease GI motility") and p. 24 (Figure 11 text); MTB-004 p. 3 ("Some crew experience constipation") |
| 9 | abdominal-pain-and-appendicitis | "Removing the appendix before flight is not advised" read like NASA policy. The source is a single risk-modelling study. | "A risk study did not support removing the appendix before flight, because the surgery itself raises the later risk of bowel blockage." | Reyes 2020, Surg Innov 28:573 (PMID 33339485), abstract |
| 10 | urinary-retention | No source says the 9 cases happened "mostly early in a mission". | "can occur in the first days of a mission and on landing day" | MTB-004 p. 3 ("urinary retention in the first few days"); MTB-003 p. 9 ("in flight and on landing day"); Stepaniak 2007 case report (retention on reaching orbit) |
| 11 | urinary-tract-infection | "Drink enough to pass pale urine": the word "pale" is not in the NHS advice. | "Drink enough to pass urine regularly through the day." Added the NHS prevention advice to try to empty the bladder fully, which matters because MTB-003 links urine left in the bladder (post-void residual) to UTI. | NHS UTIs (reviewed Jul 2025), prevention Do and Don't lists |
| 12 | urinary-tract-infection | "46 ISS crew": Crucian counts repeat flyers separately, so the figure is 46 crew missions flown by 41 astronauts. | "46 ISS crew missions" | Crucian 2016 (PMC5098747), Methods |
| 13 | space-anaemia | "Many crew are anaemic after landing": the only figure is 5 of 13 in one study. | "Some crew are anaemic after landing" (the 5 of 13 figure stays in "why") | Trudel 2022 (PMC8799460) |
| 14 | menstrual-health | "Headaches or mood changes, common pill side effects": NHS says only that "some people report" them. | "which some pill users report" | NHS Combined pill side effects (reviewed 15 Feb 2024) |

### Claims checked again and confirmed (no change)

- MTB-003: 9 in-flight retention cases. Odds 4.5 times higher in women (HSRB rates 0.0510 against 0.0111). The "one theory" that urine sticks to the bladder wall. Anti-sickness medicines that block acetylcholine (anticholinergics). Sepsis, mainly from urinary infection, as the third most likely reason for an ISS medical evacuation. UTI risk factors. Antibiotics as the treatment of choice. Retention leading to UTI, kidney infection (pyelonephritis) and sepsis.
- TB-020 Rev G p. 2: acute radiation syndromes from solar particle events, "such as nausea, vomiting, and fatigue". TB-010 p. 8: no spacewalk before 72 hours mission elapsed time, and the danger of vomit in the suit. TB-033 p. 13: condition lists. TB-033: Health Stabilization Program quarantine.
- Trudel 2022: 14 astronauts. Red cell destruction (hemolysis) 54% higher through 6-month missions. Haemoglobin 8.8% lower 4 days after landing. 5 of 13 anaemic. Hemolysis 30% higher 1 year after landing. Exercise and diet countermeasures "did not prevent hemolysis and postflight anemia".
- Smith 2021: food-borne illness "could result in loss of a mission" (printed p. 20). Antacids and proton pump inhibitors reduce absorption of some nutrients (p. 206). Iron in ISS food is "very high", and higher iron stores are linked to bone loss and oxidative damage (pp. 84-86). Only about 1% of mass loss is water; most is muscle and fat. Liver glycogen runs out after 12 to 18 hours of fasting. Russian study: lower fasting glucose after 60 or 88 days. Too little carbohydrate may slow emergency response. Continuous menstrual suppression is common on the ISS.
- NASA-STD-3001 Vol 1 Rev C [V1 4020]: crews get 100% of their calculated energy needs.
- Wotring 2015 abstract: the medicines used most on the ISS were for sleep, pain, congestion or allergy (MeSH terms include NSAIDs). Kamine 2022 abstract: appendicitis is the most common surgical condition. Miller abstract: the hazards of surgery in microgravity.
- Jain and Wotring 2016: the combined pill taken continuously on long missions. The urine recovery system was not designed for menstrual blood. The 3-monthly injection (DMPA) lowers bone density and "would not be acceptable". A long-acting method (coil or implant) should be fitted "at least 1.5-2 years before flight".
- NHS pages (D&V, Constipation, Heartburn, Heart attack 31 Mar 2026, Appendicitis, UTIs, Iron deficiency anaemia, Low blood sugar, both Combined pill pages) and NIDDK pages: every listed sign, self-care step and escalation trigger matched. The NHS Constipation "See a GP" list includes "feel tired all the time". NHS Appendicitis: after a burst appendix, pain "spreads to the whole of your abdomen". CDC Blood clots (5 Mar 2025; opened with WebFetch, because plain curl gets HTTP 403): DVT causes swelling and pain; a clot in the lung (PE) causes difficulty breathing and chest pain.

### Noted, not changed

- Low blood sugar: the 70 mg/dL threshold and the 15 to 20 g treatment come from NIDDK guidance written for people with diabetes, and NHS says low blood sugar is rare without diabetes. Both were kept as the trigger for the Vista `glucose` check. The treatment is food sugar, not a medicine dose, and every low reading goes to the crew medical officer. Flagged for flight-surgeon review.
- Miller 2021 and Reyes 2020 are cited by their online (e-pub) year. The print issues are Surg Innov 2022;29:616 and 2021;28:573.
- After the fixes, entries run 163 to 185 words. Five go over 170 because the safety wording was kept.

### Entries removed

None. Final entry count: 11.
