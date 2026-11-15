# Vista library, new conditions batch 1 (c1): research log

Research log for `kb2/c1.json` (10 entries). Compiled 2026-11-15. Built and checked by `kb2/build_c1.py` (Vista system and check keys, the app's dose regular expression, no emoji, no straight double quotes, a short US-spelling list, https sources).

## How this was done

- Read `kb/kb_conditions.json`, `kb/kb_meds.json` and `docs/evidence/library-*.md` first for tone and to reuse verified sources.
- NASA PDFs were read as text extracted with `pdftotext -layout` (the copies already in `kb/src/`, made earlier in this session's workflow): `std3001v1.pg.txt` (NASA-STD-3001 Vol 1 Rev C), `tb033.pg.txt` (OCHMO-TB-033 Rev D), `tb051.pg.txt` (OCHMO-TB-051), `mtb013.pg.txt` (OCHMO-MTB-013 Rev D). Page numbers are PDF pages.
- Three NASA NTRS documents on glove injuries were downloaded to `kb2/dl/` and read (20140014058, 20150003474, 20150000534; the last one is slides, used only to cross-check and not cited).
- Journal papers were read through PubMed: abstract for all; full text (PubMed Central) for Khan 2025.
- NHS, MedlinePlus and CDC pages were opened directly on 2026-11-15; the review date shown on each page is in the citation title.
- No medicine names with doses appear. Medicines are mentioned only as "pain relief" or "a decongestant", always with "as the flight surgeon advises". The NHS pages name paracetamol and ibuprofen; these were not copied.
- **IMM numbers.** NASA-STD-3001 Vol 1 Appendix E, Table E.2-1 is labelled "Sample IMM Output" and does not state the mission scenario. Its per-mission figures were therefore NOT copied; entries only say a condition is "among the most likely" when it ranks high in that table.
- "Design rule" marks a Vista escalation or app instruction that is not a sourced fact and needs flight-surgeon review.

Abbreviations: STD = NASA-STD-3001 Vol 1 Rev C; E.2-1 = Table E.2-1 Sample IMM Output (PDF p. 81-82); E.2-2 = Table E.2-2 Medical Conditions Considered of High Likelihood or High Consequence (PDF p. 82-85); TB-033 = OCHMO-TB-033 Rev D; TB-051 = OCHMO-TB-051; MTB-013 = OCHMO-MTB-013 Rev D.

## 1. Nosebleed (`nosebleed`)

| Claim | Source and location |
|---|---|
| NASA lists nosebleed among conditions to plan for, including one linked to adapting to space | STD E.2-2, p. 82 "Epistaxis (nosebleed, space adaptation related)" under environmental/spaceflight-induced conditions; p. 83 "Epistaxis (nosebleed)" under ENT |
| Fluid moves to the head; a blocked nose is very common | Khan 2025 full text, Introduction (about 2 L fluid shift, cranial redistribution) and Results/Table 2 (general nasal congestion logged in 75% of 71 ISS astronauts) |
| Dry nose, picking, blowing hard are common causes | NHS Nosebleed (reviewed 5 Dec 2023), "Causes" |
| Bad ear barotrauma can cause a nosebleed | MedlinePlus Ear barotrauma (reviewed 29 Apr 2026), Symptoms: severe cases can cause nosebleeds |
| Lean forward, breathe through mouth; pinch just above nostrils 10 to 15 min | NHS Nosebleed, "How to stop a nosebleed yourself" |
| For 24 h avoid blowing/picking, strenuous exercise | NHS Nosebleed, "For 24 hours after a nosebleed, avoid" |
| Escalate: lasts longer than 10 to 15 min, after a blow to the head, weak or dizzy, difficulty breathing | NHS Nosebleed, "Go to A&E if" |
| Escalate: frequent nosebleeds, blood thinner | NHS Nosebleed, "See a GP if" (regular nosebleeds; blood-thinning medicine) |
| "Catch the blood with gauze" | Design rule (practical, no factual claim) |
| Checks bp, hr | NHS: higher risk with high blood pressure; weak or dizzy as escalation sign. Design rule mapping to Vista checks |

Not sourced, so left out: any claim that nosebleeds are more frequent in flight, or how blood behaves in weightlessness. No peer-reviewed spaceflight epistaxis study was found (PubMed search "epistaxis spaceflight OR nosebleed AND astronaut" returned 0).

## 2. Cuts and abrasions (`cuts-and-abrasions`)

| Claim | Source and location |
|---|---|
| Grazes and small cuts, mostly on the hands, among the most common injuries | Scheuring 2009 abstract: hand injuries the most common location, abrasions and small lacerations common; STD E.2-1 p. 81: Skin Abrasion ranked 2nd of 48; E.2-2 p. 84: skin abrasion and skin laceration marked * (most common) |
| Most in-flight injuries while moving between modules, during exercise, from suit parts | Scheuring 2009 abstract: translating between modules, aerobic and resistive exercise, EVA suit components the leading causes |
| Grazes and cuts during re-entry and landing | TB-051 Appendix B, p. 36: "Common Re-Entry & Landing Symptoms/Injuries: Abrasion ... Laceration" |
| Skin thins, wound healing altered, may raise infection risk | Nguyen 2022 abstract (thinning epidermis, altering wound healing); Henke 2025 abstract (increased infection risk, slow wound-healing) |
| Press with a clean dressing until bleeding controlled; add a layer if soaked | NHS Cuts and grazes (reviewed 2 Apr 2026), "Stopping the bleeding" |
| Rinse with water or sterile wipes, pat dry, sterile dressing | NHS Cuts and grazes, "Cleaning a cut or graze" |
| Escalate: swollen, red, more painful, pus; fever | NHS Cuts and grazes, urgent GP/111 list (includes high temperature) |
| Emergency: bleeding will not stop, spurting, deep or very large wound, loss of feeling, embedded object | NHS Cuts and grazes, "Call 999 or go to A&E" |
| "Check it every day"; check temp | Design rule |

## 3. Burns (`burns`)

| Claim | Source and location |
|---|---|
| NASA lists heat, chemical skin, electrical and fire burns | STD E.2-2 p. 82 (Burn (thermal); Burns secondary to fire; Electrical injury; Smoke/combustion product inhalation) and p. 84 (Burn - Chemical, skin; Toxic dermal exposure); TB-033 p. 13 (Burns, secondary to fire; Smoke inhalation) |
| Fire smoke can injure the lungs | STD E.2-2 p. 82 (Smoke/combustion product inhalation; Toxic inhalation injury); MedlinePlus Burns (reviewed 9 Apr 2026): airway burns from breathing smoke |
| Toxic exposures such as ammonia | TB-033 p. 13: "Toxic exposure (e.g. ammonia, hydrazine, methane, formaldehyde, Freon, etc.)" |
| Signs by depth (redness, pain, swelling, blisters; white or blackened, may be numb) | MedlinePlus Burns, first-, second-, third-degree |
| Smoke signs: coughing, wheezing, voice changes, dark black-stained mucus | MedlinePlus Burns, airway burn list |
| Cool water 20 min, as soon as possible; bottled water or wet towel if no running water | NHS Burns and scalds (reviewed 31 Mar 2026), first aid |
| Remove clothing and jewellery near the burn, leave anything stuck | NHS Burns and scalds |
| Cling film laid loosely, not wrapped; no creams, oils, sticky dressings; do not burst blisters | NHS Burns and scalds |
| Emergency: large or deep, face or genitals, chemical or electrical | NHS Burns and scalds, "Call 999 or go to A&E" |
| "Tell your crew medical officer about every burn"; any fire burn or smoke breathed in to flight surgeon at once | Design rule (MedlinePlus airway-burn list supports the smoke concern) |

Note: NHS also lists the bottom; Vista text keeps "face or genitals". "Ammonia harms the skin" was deliberately not claimed; the entry only says toxic exposures such as ammonia are on the NASA list.

## 4. Spacesuit glove injuries and fingernail lifting (`eva-hand-injury`)

| Claim | Source and location |
|---|---|
| Hand injuries common in EVA and EVA training | Reid 2015 (NTRS 20150003474) abstract p. 1: "Injuries to the hands are common among astronauts who train for extravehicular activity"; Strauss 2005 abstract: 166 of 352 NBL suit symptom comments (47%) were in the hands |
| Pressurised glove restricts movement and creates pressure points | Reid 2015 abstract p. 1 |
| Most training hand injuries to fingernails, knuckles (MCP joints), fingertips | Reid 2015 abstract: 58% of hand and arm NBL injuries 1993-2010 to fingernail, MCP or fingertip; Reid 2014 (NTRS 20140014058) Results: over 70% of training injuries to fingernail, MCP joint and finger crotch |
| Nail lifting (onycholysis) linked to large hands | Opperman 2010 abstract: hand circumference the dominant effect (19.6% vs 5.6% probability above and below 22.86 cm in men; number not used in entry) |
| ... glove fingers of the wrong length, longer sessions | Reid 2014 Results: onycholysis predictors include middle finger length difference from glove (OR 7.709) and event duration (OR 1.570) |
| Gripping may cut fingertip blood flow | Opperman 2010 abstract (constriction may occlude vascular flow, hypothesis); Reid 2015 abstract (perfusion decreased during finger presses) |
| Damp nails may split more easily | Reid 2015 full text (extracted text lines 709-713 and 773-774): high humidity wetting the nails may change their properties and cause splitting between nail layers; onycholysis is the only crew injury known to be possibly at risk from moisture |
| Signs: pain, redness; numbness/tingling; dark nail | Reid 2014: pain, erythema, onycholysis most common training injuries; paresthesia among most common flight injuries; STD E.2-2 p. 84: Subungual hematoma, Paresthesia, Fingernail delamination (EVA related), Hand injury (EVA related) |
| EVA suit components cause injuries | Scheuring 2009 abstract: 0.26 injuries per EVA from suit components (number not used) |
| Report rubbing, pressure points or poor fit early | Reid 2014 abstract (ill-fitting gloves and glove contact the commonest causes; sizing issue); Strauss 2005 (symptoms well controlled by countermeasures). Wording is a design rule |
| Cold, pale or blue finger = flight surgeon at once | Design rule (based on the blood-flow mechanism above) |

Not sourced, so left out: keeping nails short, protective dressings or tape (only seen in press coverage, not in an opened NASA or peer-reviewed source).

## 5. Shoulder injury (`shoulder-injury`)

| Claim | Source and location |
|---|---|
| Most often reported musculoskeletal condition in astronauts | Ward 2026 abstract, Background |
| Most after landing or before flight | Ward 2026 abstract: 677 injuries 1981-2024, post-flight 64.8%, pre-flight 33.6%, in-flight 1.6% |
| EVA training loads shoulder and presses on hard suit parts | Strauss 2005 abstract: shoulders 20.7% of NBL suit symptoms; mechanism hard contact with suit components and strain |
| More training (NBL) hours linked with earlier injury; 6 months or more in space linked with earlier post-flight onset | Ward 2026 abstract, Results |
| Tendon injury, rotator cuff injury, osteoarthritis common | Ward 2026 abstract: tendinopathy 8.9%, osteoarthritis 7.8%, rotator cuff injury 7.8% |
| Shoulder sprain/strain likely in flight | STD E.2-1 p. 81 (Shoulder Sprain/Strain ranked 14th); E.2-2 p. 84 dislocation (shoulder) |
| Keep moving gently; stopping can slow recovery | NHS Shoulder pain (reviewed 22 May 2023), self-care |
| Cold pack up to 20 min, up to 3 times a day | NHS Shoulder pain |
| Escalate: worse or not better after 2 weeks | NHS Shoulder pain, "See a GP" |
| At once: cannot move arm, changed shape or badly swollen, pins and needles or no feeling | NHS Shoulder pain, urgent list |
| Signs (pain, trouble moving arm, swelling, pins and needles) | Drawn from the NHS urgent list. Design rule |

Caution: the NHS shoulder page was past its "next review due" date (22 May 2026) when opened.

## 6. Muscle strain and joint sprain (`strain-and-sprain`)

| Claim | Source and location |
|---|---|
| Back, shoulder, elbow, knee, ankle sprains/strains among most likely | STD E.2-1 p. 81: Back Injury (10th), Shoulder (14th), Elbow (20th), Ankle (21st), Knee (28th) Sprain/Strain |
| Exercise the most frequent source of injury on ISS; moving between modules | Scheuring 2009 abstract |
| After landing: weakness, lower fitness, lower bone density raise injury risk | TB-051 p. 4: "Increased risk of musculoskeletal injury (generalized muscular weakness, diminished aerobic capacity, decreased bone density)" |
| Signs | NHS Sprains and strains (reviewed 23 Apr 2024), Symptoms |
| 2 to 3 days: rest, stop exercise; ice up to 20 min every 2 to 3 h; support bandage by day | NHS Sprains and strains, PRICE |
| Avoid heat and massage first days; then keep moving; most better in about 2 weeks | NHS Sprains and strains |
| At once: heard a crack, changed shape, numb, tingling, blue, grey, cold, may be broken | NHS Sprains and strains, "999 or A&E" |

Note: the NHS "elevation" step was left out, since raising a limb above the heart has no meaning in weightlessness.

## 7. Broken bones (`fractures`)

| Claim | Source and location |
|---|---|
| No in-flight fracture so far; bone may break from loads that would not have broken it before | MTB-013 p. 1 Executive Summary (quotes NASA HSRB risk) and p. 3 |
| Bone loss lowers strength; EVA loads raise fracture risk in deconditioned crew | MTB-013 p. 2, Physiology and "Mission risks" |
| Landing forces | TB-033 p. 15: re-entries and landings may result in traumatic injuries (e.g. fractures, neck injuries) |
| Falls after landing; weak muscles and balance | TB-051 p. 4 (postural instability; musculoskeletal injury risk) and p. 36 (trip, fall) |
| NASA plans for wrist, hip, spine, lower leg, stress fractures | TB-033 p. 13; STD E.2-2 p. 84 (finger, hand, wrist/arm, distal leg, hip, spine; lower extremity stress fracture) |
| Signs | MedlinePlus Broken bone (reviewed 14 Jan 2026), Symptoms |
| Splint above and below; do not straighten or test; ice | MedlinePlus Broken bone, First aid and Do not |
| Emergency: bone through skin, severe bleeding, pale/cold/blue below injury, head/neck/back/hip/pelvis/upper leg | MedlinePlus Broken bone, "Call 911" |
| Any suspected fracture to flight surgeon at once | Design rule |

## 8. Head injury and concussion (`head-injury-and-concussion`)

| Claim | Source and location |
|---|---|
| A bump, blow or jolt can cause concussion | CDC HEADS UP signs page (dated 15 Sep 2025), emergency section wording |
| NASA plans for minor and major head injury | STD E.2-2 p. 84: Head trauma (major), Head trauma (minor); TB-033 p. 13: other traumatic injuries, head |
| Re-entry and landing can cause injuries | TB-033 p. 15; TB-051 p. 2 (crew secured properly to avoid injuries) |
| Moving about the cabin leads to knocks | Scheuring 2009 abstract: translating between modules a leading cause of injuries and minor trauma |
| Symptoms up to 2 weeks | NHS Head injury and concussion (reviewed 29 May 2025) |
| Signs: headache, dizziness, nausea, foggy, slowed down, concentration, slowed reaction times, sleep changes, irritability | CDC HEADS UP symptom lists (the page is written for children and teens; general symptoms used) |
| Cold pack; rest; adult stays with you 24 h; no sleeping pills unless doctor advises | NHS Head injury and concussion, self-care |
| Escalate vomiting, dizziness | NHS, "Get help from NHS 111" list |
| Emergency list | NHS 999 list (knocked out, cannot stay awake, fit, clear fluid from ears or nose, bleeding from ears, vision or hearing problems, new numbness or weakness) and CDC danger signs (worsening headache, one pupil larger) |
| Checks react, sleep, mood, vision | Design rule mapping CDC symptoms to Vista checks |

## 9. Dental problems (`dental-problems`)

| Claim | Source and location |
|---|---|
| Dental emergencies rare, increase with mission duration | Del Fabbro 2025 (ESA Topical Team scoping review) abstract, Results |
| Full care not possible in flight | TB-033 p. 13: "full terrestrial care and treatment may not be possible" |
| NASA plans for caries, filling and crown loss, fractured tooth, avulsion, abscess | STD E.2-2 p. 83 (Dental/oral); TB-033 p. 13 |
| Preventive dental care part of preparing for flight | TB-033 p. 8 (Pre-mission item 7); STD p. 17/19 ("Preventive dental care") |
| Signs | NHS Toothache (reviewed 1 Jul 2024; pain when biting, red gums, cheek or jaw swelling, bad taste) and NHS Dental abscess (reviewed 18 Mar 2026; sensitivity to hot or cold, bad taste, facial swelling) |
| Soft food, avoid chewing on sore tooth, soft brush; avoid sweet, very hot, very cold | NHS Toothache, self-care |
| Escalate toothache more than 2 days | NHS Toothache, "see a dentist" |
| Emergency: swelling around eye or neck, a lot of swelling in mouth, hard to breathe, swallow, speak or open mouth | NHS Toothache and Dental abscess, A&E lists |
| Lost filling or crown or broken tooth to CMO | Design rule |

## 10. Ear and sinus barotrauma (`ear-and-sinus-barotrauma`)

| Claim | Source and location |
|---|---|
| Among the more likely medical events | STD E.2-1 p. 81: Barotrauma (Ear/Sinus Block) ranked 11th; E.2-2 p. 82 |
| Pressure difference can cause pain and damage | MedlinePlus Ear barotrauma, definition |
| US suits at much lower pressure than the cabin; middle-ear gas expands | Khan 2025 full text, Discussion: 14.7 psi station vs 4.3 psi US suit, two- to threefold expansion |
| Blocked Eustachian tubes stop equalising, especially at repressurisation; pause if ear fullness | Khan 2025 Discussion |
| Head-ward fluid shift blocks the nose | Khan 2025 Introduction and Results |
| Spacewalkers had more nose, sinus and ear problems logged | Khan 2025 Results: EVA cohort 18.08 vs 8.89 sinonasal events (category included ear clearing and barotrauma) |
| Signs: pain, fullness, mild hearing loss, dizziness | MedlinePlus Ear barotrauma, Symptoms; sinus pressure from Khan 2025 Table 2 |
| Swallow, yawn, chew; breathe out gently with nostrils pinched and mouth closed | MedlinePlus Ear barotrauma, self-care |
| Decongestant before a spacewalk only on flight surgeon advice | Khan 2025 Results (oxymetazoline and pseudoephedrine used as EVA prophylaxis); MedlinePlus (decongestants before altitude changes can help) |
| Escalate after a few hours; severe pain, drainage or bleeding, fever | MedlinePlus Ear barotrauma, "When to contact" |

Number not used: Khan 2025 gives 17 (28%) in the abstract but 7 first-time cases (10%) in Table 2 for ear clearing and barotrauma, so no figure was quoted.

## Sources opened (all cited)

- NASA-STD-3001 Vol 1 Rev C: https://www.nasa.gov/wp-content/uploads/2023/11/nasa-std-3001-vol-1-rev-c-with-signature.pdf
- NASA OCHMO-TB-033 Rev D: https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-033-spaceflight-experience-medical-care.pdf
- NASA OCHMO-TB-051: https://www.nasa.gov/wp-content/uploads/2026/05/ochmo-tb-051-crew-medical-support-entry-descent-landing.pdf
- NASA OCHMO-MTB-013 Rev D: https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-030-bone-loss.pdf
- Scheuring 2009: https://doi.org/10.3357/asem.2270.2009
- Strauss 2005 (no DOI): https://pubmed.ncbi.nlm.nih.gov/15892545/
- Ward 2026: https://doi.org/10.1016/j.jse.2026.07.014
- Opperman 2010: https://doi.org/10.3357/asem.2810.2010
- Reid 2014, NTRS 20140014058: https://ntrs.nasa.gov/citations/20140014058
- Reid 2015, NTRS 20150003474: https://ntrs.nasa.gov/citations/20150003474
- Khan 2025 (PMC12322577): https://doi.org/10.1002/lio2.70229
- Del Fabbro 2025: https://doi.org/10.3357/AMHP.6372.2025
- Nguyen 2022: https://doi.org/10.1016/j.lssr.2022.10.004
- Henke 2025: https://doi.org/10.3357/AMHP.6713.2025
- NHS: nosebleed, cuts-and-grazes, burns-and-scalds, sprains-and-strains, shoulder-pain, head-injury-and-concussion, toothache, dental-abscess (https://www.nhs.uk/conditions/...)
- MedlinePlus: Broken bone 000001, Burns 000030, Ear barotrauma 001064
- CDC HEADS UP: https://www.cdc.gov/heads-up/signs-symptoms/index.html

## Verification log

Adversarial fact-check of `kb2/c1.json`, 2026-11-15. Every cited source was reopened: NHS and MedlinePlus pages and the CDC page fetched live; PubMed records re-read for Scheuring 2009, Strauss 2005, Opperman 2010, Ward 2026 (PMID 42532466), Del Fabbro 2025, Nguyen 2022 (PMID 36682824) and Henke 2025; Khan 2025 full text re-read (PMC12322577); NASA PDFs re-read from `kb/src/*.pg.txt`, NTRS texts from `kb2/dl/`. All non-NHS URLs were requested with curl: the NASA PDFs (same byte size as the copies read), NTRS pages and DOIs return 200, except doi.org/10.1002/lio2.70229 (Wiley) and the CDC page, which return 403 to scripts only and open in a browser fetch. Pre-check copies: `kb2/work/c1.pre-fc.json`, `kb2/work/c1.pre-fc.md`. Fix scripts: `kb2/work/fix_c1.py`, `kb2/work/fix_c1b.py`. NOTE: `build_c1.py` still holds the pre-check text; do not re-run it, or these fixes are lost. The tables above describe the pre-check text; where they differ, this log wins.

| # | Entry | Problem found | Fix | Source |
|---|---|---|---|---|
| 1 | nosebleed | Summary said "most nosebleeds stop with firm pinching". NHS does not say how often pinching works; it says nosebleeds are not usually serious and most can be easily treated at home. | Now: "Nosebleeds are not usually serious, and most can be treated on the spot." | NHS Nosebleed (reviewed 5 Dec 2023) |
| 2 | nosebleed | Escalation missed the NHS A&E item "the bleeding seems excessive". | Added "the bleeding is heavy". | NHS Nosebleed, "Go to A&E" |
| 3 | nosebleed | Summary over length; clumsy wording. | "NASA plans for nosebleeds on missions, including ones linked to adapting to space." | STD E.2-2 p. 82-83 |
| 4 | cuts-and-abrasions | "mostly on the hands" overstated Scheuring, which says the hand was the most common location of all in-flight musculoskeletal injuries, not that most grazes are on the hands. | "often on the hands". | Scheuring 2009 abstract |
| 5 | cuts-and-abrasions | "Most injuries in flight happen while..." overstated Scheuring's "leading causes". | "The leading causes of injury in flight are moving between modules, exercise and spacesuit parts." | Scheuring 2009 abstract |
| 6 | burns | Entry covers smoke injury to the lungs but had only system `immune`. | Systems now `immune`, `resp`. | MedlinePlus Burns (airway burns); STD E.2-2 p. 82 (smoke inhalation) |
| 7 | burns | Summary over length. | "NASA plans for heat, chemical, electrical and fire burns on missions." | STD E.2-2 p. 82, 84 |
| 8 | eva-hand-injury | "Gripping in the glove may cut blood flow to the fingertips" misstated the sources: Opperman hypothesises that constriction at large knuckle (MCP) joints may occlude blood flow; Reid 2015 measured perfusion falling during finger presses. Neither is about gripping. | "A glove that is tight at the knuckles, and pressing with the fingertips, may reduce blood flow to the fingers." | Opperman 2010 abstract; Reid 2015 (NTRS 20150003474) abstract |
| 9 | shoulder-injury | "in the training years before flight" is an interpretation; Ward reports a pre-flight phase (injuries within 5 years of a mission). Also did not say how few happen in space (1.6%). | "Most happen after landing or before flight, not in space." | Ward 2026 abstract (64.8% post-flight, 33.6% pre-flight, 1.6% in-flight) |
| 10 | shoulder-injury | "Common problems are..." implied general frequency; Ward gives these as the top diagnoses in its data, in the order tendinopathy, osteoarthritis, rotator cuff injury. | "The most common problems were tendon injury, wear-and-tear arthritis and rotator cuff injury." | Ward 2026 abstract |
| 11 | shoulder-injury | "up to 3 times a day" is not the NHS wording. | "3 times a day". | NHS Shoulder pain |
| 12 | strain-and-sprain | Summary said back, shoulder, elbow, knee and ankle strains are "among the most likely injuries", from ranks in STD Table E.2-1, which is a Sample IMM output with no stated mission scenario (knee was 28th of 48). This broke the log's own IMM rule. | "NASA plans for strains and sprains of the back, neck and limb joints on missions." | STD E.2-2 p. 84 (back and neck sprain/strain; joint sprain/strain of shoulder, elbow, wrist, hip, knee, ankle); TB-033 p. 13 |
| 13 | strain-and-sprain | "Exercise causes the most injuries on the ISS" reworded closer to the source. | "Exercise is the most frequent source of injury on the ISS." | Scheuring 2009 abstract |
| 14 | head-injury-and-concussion | Cited CDC HEADS UP page is written for parents of children and teens; "slowed reaction times" is listed there for school-aged children only. | Source replaced with the CDC adult page, Concussion signs and symptoms (updated 15 Sep 2025). Signs now follow its adult lists: nausea or vomiting early on; foggy or slowed down, concentration problems; sleeping more or less than usual; irritability. "Slower reaction times" removed. `react` check kept as a design rule mapped to "feeling slowed down". | https://www.cdc.gov/traumatic-brain-injury/signs-symptoms/index.html |
| 15 | head-injury-and-concussion | Escalation treated vomiting only as a CMO-level sign; CDC adult danger signs list repeated vomiting, slurred speech and confusion as emergencies. | Added "vomiting again and again", "slurred speech" and "confusion" to the call-at-once list. | CDC adult danger signs |
| 16 | head-injury-and-concussion | "clear fluid or blood from the nose or ears": NHS lists clear fluid from the ears or nose, and bleeding or bruising around the ears, not blood from the nose. | "clear fluid from the nose or ears, bleeding from the ears". | NHS Head injury and concussion, 999 list |
| 17 | dental-problems | "Good dental care before flight is the best prevention": "best" is not in any source. | "Dental care before flight is part of the plan to prevent them." The repeated clause in `why` replaced with "so problems are best caught early" (design rule). | TB-033 p. 8 item 7; STD p. 17/19; Del Fabbro 2025 (preflight measures should focus on prevention) |
| 18 | ear-and-sinus-barotrauma | "one of the more likely medical events on a mission" relied on the Sample IMM ranking (11th), against the log's own IMM rule. | "NASA lists it among the conditions to plan for on every mission." | STD E.2-2 p. 82 |
| 19 | ear-and-sinus-barotrauma | "spacewalkers had more nose, sinus and ear problems logged" left out the authors' own caveat. | Added "partly because they are checked more closely". | Khan 2025 Discussion (increased scrutiny and monitoring of astronauts before and after EVA) |

Checked and confirmed without change: MTB-013 Rev D (dated 11-Feb-26; served at the `ochmo-tb-030-bone-loss.pdf` URL, same file) says there have been no in-mission fractures and EVA loads raise fracture risk in deconditioned crew; TB-033 Rev D is dated 12/01/2023 and lists the fracture, dental, burn, smoke and toxic-exposure items used; TB-051 (21-May-26) p. 4 and p. 36 support the landing-injury claims; STD E.2-2 asterisks mark skin abrasion and laceration as most common; Reid 2014 odds ratios and the over-70% training-injury figure; Reid 2015 humidity passage; Strauss 2005 (47% hands, 20.7% shoulders, hard suit contact); Nguyen 2022 (thinning epidermis, altered wound healing); Henke 2025 (infection risk, slow wound healing); NHS burns, sprains and strains, cuts and grazes, toothache (soft food, avoid chewing with the sore tooth, soft brush, avoid sweet, very hot or very cold) and dental abscess lists; MedlinePlus broken bone, burns and ear barotrauma (severe cases can cause nosebleed; contact if not better after a few hours) all match the entry text.

Remaining cautions: the NHS Shoulder pain page is past its next-review date (22 May 2026). Escalation thresholds marked "Design rule" still need flight-surgeon sign-off. Validation re-run with the `build_c1.py` rules (Vista keys, dose pattern, emoji, US spelling, straight double quotes, https): no problems. Entries removed: none. Final entry count: 10.
