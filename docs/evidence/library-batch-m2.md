# Void Voyagers medicine library, batch m2: research log

Companion to `m2.json` (15 entries): 10 new medicines (cetirizine, fexofenadine, fluticasone-nasal-spray, saline-nasal-spray, salbutamol-inhaler, prednisone, clotrimazole-cream, mupirocin-ointment, tetracaine-eye-drops, ciprofloxacin-eye-drops) and 5 existing entries copied unchanged from `kb/kb_meds.json` with a `dose` object added (decongestants, antihistamines, topical-steroids, artificial-tears, adrenaline-auto-injector). Built 15 November 2026. Build and checks: `kb2/m2build/build_m2.py` (valid JSON, ASCII only, kebab-case ids, every condition id is in `kb_conditions.json` or the parallel new-condition list, every gate key is a Void Voyagers check key, `bp` gates carry `f`, every dose has all fields).

## Ground rules applied

- Dose numbers come only from official US labels opened on DailyMed (NLM) through its SPL web service (`/dailymed/services/v2/spls/{setid}.xml`), converted to text and kept in `kb2/m2src/*.txt`. Numbers are copied as the label states them. No UK SmPC or WHO source was needed.
- Spaceflight notes reuse sources already verified for `kb_meds.json` (local copies re-read for this batch): the ISS Emergency Medical Procedures Manual (`kb/dl_emp/emp2016.txt`), OCHMO-MTB-012 Rev B text (`kb/dl_ochmo/tb006.txt`) and its p. 18 ISS kit-list image (`kb/dl_ochmo/imgs/img_394.png`, viewed), the CSRM EVA medication review (`kb/dl_ntrs2/crsm.txt`), Reichard 2023 (`kb/dl_ntrs2/pharm2023.u8.txt`), Du 2011 (`kb/dl_epmc/PMC3085701.txt`), Crucian 2016 (`kb/dl_epmc/PMC5098747.txt`), OCHMO-TB-033 (`kb/fc/dl/tb033.txt`).
- `calc` is true only for over-the-counter (Drug Facts) products. Prescription items, the injectable, the eye anaesthetic and the reliever inhaler are false.
- Gate thresholds: the label supplies the reason (a warning or "ask a doctor before use if you have ..."); the number is Void Voyagers's existing threshold from `docs/evidence/clinical-thresholds.md`: systolic 140 / diastolic 90 mmHg (Act band, AHA/ACC stage 2), resting heart rate 111 bpm (Act band, NEWS2), random glucose 200 mg/dL (ADA 2026), PHQ-4 6 (Void Voyagers's moderate band, Kroenke 2009). The cetirizine reaction-time gate uses 355 ms, the PVT-B lapse threshold (Basner 2011, quoted in Void Voyagers's react check). These are design choices tied to sourced thresholds, not label numbers.

## Labels opened (DailyMed)

| Key | Label | setid | Effective |
|---|---|---|---|
| zyrtec | Zyrtec Allergy cetirizine HCl 10 mg tablets (Kenvue) | b165db38-b302-4220-8627-77cb07bb078c | 10 Oct 2025 |
| allegra | Allegra Allergy 12/24 hour fexofenadine 60/180 mg (Chattem) | 81c1dcbb-28b3-4ad5-9f3d-9ccc16ddd173 | 14 Apr 2026 |
| flonase | Flonase Allergy Relief fluticasone propionate 50 mcg/spray (Haleon) | b6134ba0-b70a-4eac-9a82-cef64b242c1d | 19 Dec 2024 |
| saline | Saline Nasal Spray sodium chloride 0.65% (CVS) | f02c41b0-c78e-41cd-aa4a-2756bbe92087 | 19 Aug 2026 |
| proventil | Proventil HFA albuterol sulfate inhalation aerosol (Merck) | f454947c-6055-474b-bf35-29a379e01aa3 | 7 Oct 2019 |
| prednisone | Prednisone tablets USP (Mylan) | fec09050-5ac2-451b-a2b9-5a21b2def212 | 15 Sep 2026 |
| lotrimin | Lotrimin AF clotrimazole 1% cream, athlete's foot / jock itch / ringworm (Bayer) | da948ef3-3709-4bfc-9d17-f6f1ea325343 | 4 Dec 2025 |
| mupirocin | Mupirocin ointment 2% (Glenmark) | ff7428fb-9ce9-4743-b58c-01a05424a57a | 28 Oct 2025 |
| tetracaine | Tetracaine HCl ophthalmic solution USP 0.5% (Bausch & Lomb) | f12d5944-0d6c-43ff-89fd-e0b5669e9b4a | 7 Feb 2026 |
| cipro | Ciprofloxacin ophthalmic solution 0.3% (Sandoz label, manufactured by Alcon; A-S Medication Solutions repackager listing) | ec3a3dcf-b9c9-432e-adfe-4b30cade8931 | 7 Nov 2024 |
| sudafed | Sudafed Sinus Congestion 12 Hour pseudoephedrine 120 mg (Kenvue) | d600b5d5-7d95-4ad6-a95b-6d73502743d7 | 8 Nov 2024 |
| claritin | Claritin loratadine 10 mg tablets (Bayer) | 660ac9df-f1b1-4c89-94dd-9fae0a013f3c | 5 Dec 2025 |
| cortizone | Cortizone 10 Ultra Soothing Creme hydrocortisone 1% (Chattem) | 4b62615f-e713-42f2-8b9c-9eebf8d1b270 | 14 Jan 2026 |
| refresh | Refresh Plus carboxymethylcellulose 0.5% (Allergan) | 0f6a4b4b-cde6-4518-84b5-ce997f1154a7 | 28 Jun 2022 |
| epipen | EpiPen / EpiPen Jr epinephrine injection (Viatris) | 7560c201-9246-487c-a13b-6295db04274a | 15 Feb 2023 |
| (not cited) | Sudafed OM oxymetazoline 0.05% spray (Kenvue) | 1d089074-3969-ce6e-e063-6294a90aa70c | 12 Dec 2024 |

URLs: `https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=<setid>`.

Short keys for NASA and journal sources: issemp (ISS EMP, FOIA 2016), mtb012 (OCHMO-MTB-012 Rev B; p. 10 stability, p. 16 Mercury/history, p. 17 shuttle list, p. 18 ISS kit list image), csrm2024 (Ives 2024 NTRS 20240013840), crucian2016, du2011, reichard2023, tb033, ong2025, as defined in `kb/kb_meds.md`.

## 1. cetirizine

| Claim | Source and locator |
|---|---|
| Uses: runny nose, sneezing, itchy watery eyes, itchy nose or throat (hay fever, upper respiratory allergies) | zyrtec, Uses |
| One tablet once a day | zyrtec, Directions |
| Drowsiness may occur; alcohol, sedatives, tranquillisers increase drowsiness; care with machinery | zyrtec, When using this product |
| Ask a doctor or pharmacist if taking tranquillisers or sedatives | zyrtec, Warnings |
| Ask a doctor with liver or kidney disease; adults 65 and over ask a doctor | zyrtec, Warnings and Directions |
| Do not use after an allergic reaction to it or to hydroxyzine; stop if allergic reaction | zyrtec, Warnings |
| ISS kit list names fexofenadine and loratadine, not cetirizine | mtb012 p. 18 image (Convenience Med Pack, Oral Pak columns) |
| Oral antihistamines suggested for persistent allergic or hypersensitivity symptoms | crucian2016 Discussion |
| DOSE label, max, single 10 mg, maxSingle 10, maxDay 10, everyH 24 | zyrtec, Directions: "one 10 mg tablet once daily; do not take more than one 10 mg tablet in 24 hours. A 5 mg product may be appropriate for less severe symptoms." |
| Gate react >= 355 ms | Reason: zyrtec, When using this product (drowsiness; be careful operating machinery). Number: PVT-B lapse threshold (Basner 2011, as in Void Voyagers's react check) |

## 2. fexofenadine

| Claim | Source and locator |
|---|---|
| Uses | allegra, Uses |
| One tablet with water; not with fruit juices; not at same time as aluminium or magnesium antacids | allegra, Directions and When using this product |
| No grapefruit juice 1 hour before to 2 hours after; not with other antihistamines | issemp 3.001 p. 2 (Table 1 comments) |
| Side effects listed for the ISS kit | issemp 3.001 p. 2; csrm2024 fexofenadine entry ("per protocol" list) |
| Ask a doctor with kidney disease; adults 65 and older ask a doctor | allegra, Warnings and Directions |
| In ISS convenience pack and oral pack | mtb012 p. 18 image (Convenience Med Pack and Oral Pak columns); issemp 3.001 p. 2 (convenience pack) |
| Much lower sedation risk; drowsiness 1.3% | csrm2024 fexofenadine entry (meta-analysis; FDA label rates) |
| DOSE: 180 mg once a day, not more than 1 tablet in 24 hours; 60 mg every 12 hours, not more than 2 in 24 hours | allegra, "Allegra 24 Hour Directions" and "Allegra 12 Hour Directions" |
| No gates | Label warnings give no vital-sign-related contraindication |

## 3. fluticasone-nasal-spray

| Claim | Source and locator |
|---|---|
| Uses: nasal congestion, itchy nose, runny nose, itchy watery eyes, sneezing | flonase, Uses |
| Once a day; shake gently; relief from the first day, full effect after several days; nose only | flonase, Directions, Other information, Warnings |
| Stinging or sneezing for a few seconds | flonase, When using this product |
| Stop-and-ask list (7 days, facial pain, thick discharge, nosebleeds, whistling, vision changes) | flonase, Stop use and ask a doctor if |
| Glaucoma or cataracts; other steroid medicines | flonase, Ask a doctor before use / Ask a doctor or pharmacist |
| Not for asthma; do not share bottle | flonase, Do not use; When using this product |
| In NASA's assumed Artemis EVA medicine list, labelled purpose nasal congestion; bioavailability under 2%; epistaxis and pharyngitis among ADRs | csrm2024 (scope paragraph; fluticasone propionate entry) |
| ISS kit carries mometasone (Nasonex) nasal spray | issemp 3.001 p. 4 (Steroid: Mometasone (Nasonex), intranasal) |
| Sprays may suit weightlessness and airflow less well than solid medicines | tb033 (pharmaceutical treatment pathway paragraph, p. 9) |
| DOSE: week 1, 2 sprays each nostril once daily; week 2 to 6 months, 1 or 2 sprays each nostril once daily; once a day only; 50 mcg per spray | flonase, Directions and Active ingredient |
| single/maxSingle/maxDay = 2 are sprays PER NOSTRIL, as the label states them (not converted to a total) | flonase, Directions |

## 4. saline-nasal-spray

| Claim | Source and locator |
|---|---|
| Uses: dry irritated nasal passages from colds, allergies, dry air, decongestant or steroid sprays | saline, Uses |
| Each nostril as often as needed; sharing the dispenser may spread infection | saline, Directions |
| Pregnancy or breast-feeding: ask a health professional | saline, Warnings |
| No significant side effects within prescribed dose | csrm2024 sodium chloride (AYR Saline) entry (ADRs as per ISS documents) |
| AYR Saline 0.9% in ISS convenience pack | issemp 3.001 p. 3; mtb012 p. 18 image |
| Unlikely to impact any modelled EVA physiology | csrm2024 sodium chloride entry |
| Sprays less desirable in weightlessness | tb033 p. 9 |
| DOSE: "squeeze bottle twice in each nostril as often as needed or as directed by physician" | saline, Directions (a 0.65% product; no DailyMed label for AYR 0.9% was found) |

## 5. salbutamol-inhaler

| Claim | Source and locator |
|---|---|
| Treatment or prevention of bronchospasm; prevention of exercise-induced bronchospasm | proventil, Indications and Usage |
| Shake well; 15 to 30 minutes before exercise | proventil, Precautions (Information for Patients) and Dosage and Administration |
| Common effects: palpitations, chest pain, rapid heart rate, tremor, nervousness | proventil, Precautions (Information for Patients) |
| Paradoxical bronchospasm, often with first use of new canister; discontinue | proventil, Warnings |
| Needing more doses or reduced effect means re-evaluation; seek medical attention | proventil, Warnings (Deterioration of Asthma); Precautions (Information for Patients) |
| Caution with coronary insufficiency, arrhythmias, hypertension, convulsive disorders, hyperthyroidism, diabetes; do not exceed recommended dose | proventil, Warnings (Cardiovascular Effects; Do Not Exceed Recommended Dose) and Precautions (General) |
| Albuterol (Proventil HFA) in ISS topical and injectable pack | issemp 3.001 p. 22; mtb012 p. 18 image |
| Albuterol inhaler on shuttle list | mtb012 p. 17 |
| ISS 1.108 Difficulty Breathing: oxygen via non-rebreather, then inhaled albuterol (two actuations) | issemp 1.108 p. 1 (20 Apr 2015) |
| ISS 1.106 Toxic Exposure: if difficulty breathing, perform 1.108 | issemp 1.106 (respiratory exposure step 2.3) |
| Can increase heart rate (EVA metabolic model) | csrm2024 albuterol entry |
| DOSE: "two inhalations repeated every 4 to 6 hours. More frequent administration or a larger number of inhalations is not recommended. In some patients, one inhalation every 4 hours may be sufficient." Exercise: two inhalations 15 to 30 minutes before; 90 mcg albuterol base per actuation | proventil, Dosage and Administration |
| maxDay null | Label gives no 24-hour total |
| Gates hr >= 111, bp sys >= 140 (soft wording, use only as directed) | proventil, Warnings (Cardiovascular Effects: pulse rate, blood pressure; caution in arrhythmias and hypertension) |

## 6. prednisone

| Claim | Source and locator |
|---|---|
| Severe or incapacitating allergic conditions not controlled by conventional treatment (allergic rhinitis, bronchial asthma, contact and atopic dermatitis, drug hypersensitivity) | prednisone, Indications (Allergic States) |
| With food or milk; morning before 9 am for single doses; do not stop abruptly; gradual reduction | prednisone, Dosage and Administration; Warnings (Endocrine); Precautions (Information for Patients) |
| Infection risk, masked signs; avoid chickenpox and measles, report exposure | prednisone, Warnings (Immunosuppression; Varicella Zoster and Measles); Information for Patients |
| Raised blood sugar | prednisone, Adverse Reactions (Endocrine: hyperglycaemia); Drug Interactions (Antidiabetics) |
| Raised blood pressure, fluid retention | prednisone, Warnings (Cardio-Renal); Adverse Reactions (Cardiovascular; Fluid and Electrolyte) |
| Psychiatric effects: euphoria, insomnia, mood swings, personality changes, severe depression; existing instability aggravated | prednisone, Precautions (Neuro-Psychiatric) |
| Peptic ulcer risk; bone loss, muscle loss; cataracts, glaucoma; all corticosteroids increase calcium excretion | prednisone, Precautions (Gastrointestinal; Musculoskeletal); Warnings (Ophthalmic; Cardio-Renal) |
| Prednisone and methylprednisolone in ISS oral pack | mtb012 p. 18 image; issemp 3.001 p. 17 |
| ISS checklist: take with food; headache, fluid retention, vertigo, high blood pressure, mood changes | issemp 3.001 p. 17 (table text is column-scrambled in the FOIA copy; the side-effect cell beside "Prednisone (Deltasone)" and the comment "Take with food" were read as belonging to prednisone) |
| Oral steroids among suggested treatments for persistent allergic or hypersensitivity symptoms | crucian2016 Discussion |
| DOSE: "The initial dosage of prednisone may vary from 5 mg to 60 mg per day, depending on the specific disease entity being treated"; individualise; morning before 9 am | prednisone, Dosage and Administration |
| single, maxSingle, maxDay null | Label gives a range and says higher initial doses may be required in selected patients; no maximum |
| Gates glucose >= 200, bp sys >= 140, phq4 >= 6 | prednisone, Adverse Reactions (hyperglycaemia), Warnings (Cardio-Renal), Precautions (Neuro-Psychiatric) |

## 7. clotrimazole-cream

| Claim | Source and locator |
|---|---|
| Athlete's foot, jock itch, ringworm | lotrimin, Uses |
| Wash and dry, thin layer twice daily (morning and night); 4 weeks (athlete's foot, ringworm), 2 weeks (jock itch) | lotrimin, Directions |
| Avoid eyes; stop if irritation or no improvement in 4 weeks / 2 weeks; not effective on scalp or nails | lotrimin, Warnings and Directions |
| Skin irritation, itching | issemp 3.001 p. 21 (Clotrimazole (Lotrimin) 1%, 30 gm) |
| Do not place sensors on treated skin | csrm2024 (mupirocin entry: best practice to avoid placing sensors where topical medication has been applied) |
| In ISS topical and injectable pack; on shuttle list | mtb012 p. 18 image; issemp 3.001 p. 21; mtb012 p. 17 |
| Phase separation after 880 days on ISS (payload 4) | du2011 Results ("samples of clotrimazole cream and mupirocin ointment from payload 4 exhibited phase separation") |
| About 98% strength after iron and proton irradiation up to 50 Gy (2006 NSRL ground study) | reichard2023 p. 56, Table 5 (98.2 to 99.5% across doses) |
| DOSE as label | lotrimin, Directions |
| maxDay null | Label gives twice-daily directions but no separate maximum |

## 8. mupirocin-ointment

| Claim | Source and locator |
|---|---|
| Impetigo due to S. aureus and S. pyogenes | mupirocin, 1 Indications and Usage |
| Small amount with cotton swab or gauze; may cover with gauze; not intranasal, ophthalmic or mucosal; not with other creams concurrently | mupirocin, 2 Dosage and Administration |
| Burning, stinging or pain, itching (at least 1%) | mupirocin, 6 Adverse Reactions (highlights) |
| Severe allergic reactions | mupirocin, 5.1 |
| Re-evaluate if no response in 3 to 5 days; microbial overgrowth with prolonged use | mupirocin, 2 and 5.5 |
| Sensors on treated skin | csrm2024 mupirocin entry |
| In ISS topical and injectable pack; checklist side effects skin irritation, itching | mtb012 p. 18 image; issemp 3.001 p. 21; csrm2024 mupirocin entry ("per protocol") |
| Phase separation by 880 days | du2011 Results; reichard2023 p. 44 (notes it was omitted from Du's Table II) |
| Skin infections among ISS crew infections | crucian2016 (infection categories: skin, upper respiratory, urinary tract) |
| DOSE: "Apply a small amount ... to the affected area 3 times daily for up to 10 days." "Re-evaluate patients not showing a clinical response within 3 to 5 days." | mupirocin, 2 |

## 9. tetracaine-eye-drops

| Claim | Source and locator |
|---|---|
| Rapid short-acting eye anaesthetic for procedures | tetracaine, 1 |
| For administration under healthcare-provider supervision; not for self-administration | tetracaine, 5.4 |
| Remove contact lenses; wait 15 minutes before reinserting | issemp 3.001 p. 20 (Tetracaine 0.5%, 15 mL) |
| Do not touch the eye for 10 to 20 minutes; insensitive up to 20 minutes | tetracaine, 5.3 and 17 |
| Stinging, burning, redness; light sensitivity, tearing | tetracaine, 6; issemp 3.001 p. 20 |
| Prolonged use can cause corneal toxicity and permanent damage | tetracaine, 5.2 |
| In ISS topical and injectable pack; labelled purpose eye foreign body | mtb012 p. 18 image; csrm2024 tetracaine entry |
| Proparacaine eye drops on shuttle list | mtb012 p. 17 |
| 21% of 257 astronauts reported foreign-body sensation after flight | ong2025 abstract (as in `kb_meds.md`) |
| DOSE: "One drop topically in the eye(s) as needed." | tetracaine, 2 |

## 10. ciprofloxacin-eye-drops

| Claim | Source and locator |
|---|---|
| Corneal ulcers and conjunctivitis due to susceptible bacteria | cipro, Indications and Usage |
| Remove contact lenses; do not touch dropper tip | cipro, Warnings; Information for Patients |
| Local burning or discomfort most frequent; lid crusting, foreign-body sensation, itching, hyperaemia, bad taste | cipro, Adverse Reactions |
| Discontinue at first rash or hypersensitivity; serious anaphylactic reactions with systemic quinolones | cipro, Precautions (General); Warnings |
| Overgrowth with prolonged use; white crystalline precipitate in corneal ulcer patients | cipro, Precautions (General) |
| Ciloxan eye drops on shuttle list | mtb012 p. 17 |
| Ciprofloxacin ophthalmic solution kept acceptable content beyond labelled expiry (flight and control) | du2011 Results/Discussion |
| Eye drops more susceptible to bacterial growth or loss of stability | mtb012 p. 10 ("Other Concerns") |
| ISS list names moxifloxacin, erythromycin, tobramycin-dexamethasone eye medicines | mtb012 p. 18 image; issemp 3.001 p. 21 |
| DOSE: conjunctivitis "one or two drops ... every two hours while awake for two days and one or two drops every four hours while awake for the next five days"; corneal ulcer schedule | cipro, Dosage and Administration |

## 11. decongestants (existing; dose added)

Dose covers pseudoephedrine only (the ISS item is Sudafed 12 Hour 120 mg, issemp 3.001 p. 3).

| Dose item | Source and locator |
|---|---|
| "take 1 tablet every 12 hours do not take more than 2 tablets in 24 hours"; "do not exceed recommended dosage" | sudafed, Directions and Warnings |
| Gates bp sys >= 140, dia >= 90, hr >= 111 | sudafed, "Ask a doctor before use if you have heart disease, high blood pressure ..."; rapid heart rate and high blood pressure listed for the ISS kit (issemp 3.001 p. 3) |
| Oxymetazoline "not for more than 3 days" mention | Sudafed OM label, When using this product; already in the entry's cautions from issemp |

## 12. antihistamines (existing; dose added)

| Dose item | Source and locator |
|---|---|
| Loratadine "1 tablet daily; not more than 1 tablet in 24 hours"; 10 mg per tablet; more than directed may cause drowsiness | claritin, Directions, Active ingredient, Warnings |

## 13. topical-steroids (existing; dose added)

| Dose item | Source and locator |
|---|---|
| Hydrocortisone 1%: "apply to affected area not more than 3 to 4 times daily"; stop if worse or lasting more than 7 days | cortizone, Directions; Stop use and ask a doctor if |

## 14. artificial-tears (existing; dose added)

| Dose item | Source and locator |
|---|---|
| Refresh Plus 0.5%: "Instill 1 or 2 drops in the affected eye(s) as needed and discard container"; stop if eye pain, vision change, continued redness, or more than 72 hours | refresh, Directions; Stop use and ask a doctor if |

## 15. adrenaline-auto-injector (existing; dose added)

| Dose item | Source and locator |
|---|---|
| 30 kg or more: EpiPen 0.3 mg, IM or SC into anterolateral thigh, through clothing if necessary; single-dose device | epipen, 2, 2.1, 2.2 |
| Repeat injections may be necessary for severe persistent anaphylaxis; more than two sequential doses only under direct medical supervision; not a substitute for medical care | epipen, 2.2 and 5.1 |
| mgPerKg null | The label gives weight bands, not a per-kg dose |
| No gates | epipen, 4 Contraindications: "None"; 5.5: heart disease is not a contraindication in an acute life-threatening situation |

## Not sourced or left out

- No spaceflight-specific source was found for cetirizine (it is not on the published ISS kit list). The `space` note says only that.
- No DailyMed label exists for AYR Saline 0.9% (the ISS product); a 0.65% store-brand saline label was used for the dose.
- Proventil HFA label (2019) gives no 24-hour maximum; `maxDay` is null.
- Prednisone, tetracaine, ciprofloxacin eye drops, clotrimazole, mupirocin, saline and artificial tears have no maximum daily amount on the label; `maxDay` is null.
- No label gives a weight-based (mg/kg) adult dose for any of these medicines; `mgPerKg` is null throughout.
- The `decongestants` and `antihistamines` entries each cover several medicines, but the schema holds one `dose`; doses were given for pseudoephedrine and loratadine. Oxymetazoline and diphenhydramine have no dose object. The oxymetazoline label text as extracted ran together the adult and child age bands ("adults and children 6 to under 12 years of age"), so it was not used for numbers.
- Spray numbers for fluticasone and saline are per nostril, as the labels state them. The app must not read them as a total.
- The ISS checklist table (issemp 3.001) is column-scrambled in the FOIA text copy; side-effect lists for prednisone and mupirocin were matched to rows by layout and cross-checked against CSRM where it repeats the "per protocol" list (mupirocin yes; prednisone not in CSRM).

## Verification log

Adversarial fact-check, 15 November 2026.

- **Labels:** all 15 DailyMed labels were downloaded again from the SPL web service (`/dailymed/services/v2/spls/{setid}.xml`) into `kb2/m2fc/dl/`. They were converted to text with `kb2/m2fc/scripts/x2t.py`. Every dose number (single, maximum single, maximum per day, interval, units, per-kg) was checked against the label text.
- **Label pages:** all 15, and the Sudafed OM page, return HTTP 200. The effective dates match the table above.
- **NASA and journal claims:** re-read in the local copies:
  - ISS EMP `kb/dl_emp/emp2016.txt`
  - CSRM `kb/dl_ntrs2/crsm.txt`
  - OCHMO-MTB-012 text and its p. 18 kit-list image `kb/dl_ochmo/imgs/img_394.png`
  - OCHMO-TB-033 `kb/fc/dl/tb033.txt`
  - Du 2011 `kb/dl_epmc/PMC3085701.txt`
  - Reichard 2023 `kb/dl_ntrs2/pharm2023.u8.txt`
  - Crucian 2016 `kb/dl_epmc/PMC5098747.txt`
  - The Ong 2025 abstract was re-read on Europe PMC.
- **Other links:** every non-label link resolves. The governmentattic PDF returns 200 to a plain client. Two DOIs return 403 to scripts (10.1096/fj.14-264838 and 10.1177/10806032261466966); both were confirmed through Crossref.
- **Pre-fix copies:** `kb2/m2fc/m2.pre-fc.json` and `kb2/m2fc/m2.pre-fc.md`. Fix script: `kb2/m2fc/scripts/fix.py`.

### Problems found and fixed

| # | Entry | Problem | Fix | Source |
|---|---|---|---|---|
| 1 | cetirizine | `space` said the ISS kit list "names two other antihistamines, fexofenadine and loratadine". The list also has diphenhydramine and olopatadine (and promethazine), so "two" was wrong. | Now: the list "includes other antihistamines, such as fexofenadine, loratadine and diphenhydramine, but not cetirizine". | mtb012 p. 18 kit-list image (Convenience Med Pack, Oral Pak and Topical/Injectable columns) |
| 2 | fexofenadine | `space` said the NASA review "found" a lower sedation risk, and that drowsiness "was reported by 1.3% of users". In fact the review quotes a meta-analysis, and 1.3% is a side-effect rate in its list, not a count of NASA users. | Reworded: the review, "citing a meta-analysis, notes" the lower sedation risk; "its side-effect list gives drowsiness as 1.3%". | csrm2024 fexofenadine entry ("per a meta analysis ..."; "drowsiness (1.3%)") |
| 3 | fluticasone-nasal-spray | Cautions left out label warnings that matter for an immune-suppressed crew and for drug interactions. | Added: stop and ask a doctor after contact with chickenpox, measles or tuberculosis. Added ritonavir and ketoconazole tablets to "ask a doctor first". | flonase, Stop use and ask a doctor if; Ask a doctor or pharmacist before use |
| 4 | saline-nasal-spray | A caution said "The ISS checklist lists no significant side effects". The ISS EMP table is column-scrambled at that row, and CSRM gives this as plain "ADRs", not "per protocol", so the claim was credited to the wrong source. | Now credited to the 2024 NASA review: "A 2024 NASA review lists no significant side effects within the prescribed dose." | csrm2024 sodium chloride (AYR Saline) entry |
| 5 | prednisone | The PHQ-4 gate message said "Your wellbeing score is high". A high PHQ-4 means more symptoms, so a crew member could read it as good news. | Now: "Your PHQ-4 mood check shows more symptoms than usual. Prednisone can worsen mood: ask the crew medical officer first." Threshold unchanged (6). | prednisone, Precautions (Neuro-Psychiatric) |
| 6 | clotrimazole-cream | "kept about 98% of its strength" understated the result: Table 5 gives 98.2 to 98.9% after radiation (99.5% unirradiated). | Now: "still measured 98 to 99% of its labelled strength". | reichard2023 Table 5 (clotrimazole 1% cream row) |
| 7 | ciprofloxacin-eye-drops | `everyH` was 2. The label's corneal-ulcer schedule doses every 15 minutes, then every 30 minutes, then hourly, so a 2-hour minimum gap would wrongly block a correct ulcer dose. | `everyH` set to null. Both schedules stay in the `dose.label` text. | cipro, Dosage and Administration |
| 8 | decongestants | `dose.label` says oxymetazoline "is not used for more than 3 days", but `dose.src` cited only the pseudoephedrine label. | Added the Sudafed OM (oxymetazoline 0.05%) Drug Facts label to `dose.src`. That label says "do not use for more than 3 days" (re-read in `kb2/m2src/afrin.txt`; page returns 200). | DailyMed setid 1d089074-3969-ce6e-e063-6294a90aa70c |
| 9 | adrenaline-auto-injector | `conditions` was empty, but the parallel new-condition batch defines `anaphylaxis`, which is exactly what this medicine treats. | `conditions` set to ["anaphylaxis"]. | epipen, 1 Indications (anaphylaxis); c2.json condition list |

### Checked and found correct (no change)

- **Dose numbers:** every one matches its label.
  - Cetirizine: 10 mg once daily; max one tablet in 24 h.
  - Fexofenadine: 180 mg once daily (or 60 mg every 12 h, max 2).
  - Fluticasone: week 1, 2 sprays per nostril once daily, then 1 or 2; 50 mcg per spray.
  - Saline: twice in each nostril as often as needed.
  - Albuterol: 2 inhalations every 4 to 6 hours; 90 mcg per puff; 15 to 30 min before exercise.
  - Prednisone: 5 to 60 mg per day.
  - Clotrimazole: twice daily for 4 weeks (or 2 weeks).
  - Mupirocin: 3 times daily for up to 10 days.
  - Tetracaine: 1 drop as needed.
  - Ciprofloxacin eye drops: conjunctivitis and ulcer schedules as labelled.
  - Pseudoephedrine: 120 mg every 12 h; max 2 tablets.
  - Loratadine: 10 mg; max 1.
  - Hydrocortisone: not more than 3 to 4 times daily.
  - Refresh Plus: 1 or 2 drops as needed.
  - EpiPen: 0.3 mg at 30 kg or more; more than two doses in a row only under direct medical supervision.
- **mg per kg:** no label gives an adult mg/kg dose, so `mgPerKg` stays null throughout.
- **calc:** false for every prescription, injectable, eye-anaesthetic and reliever-inhaler entry (salbutamol, prednisone, mupirocin, tetracaine, ciprofloxacin eye drops, adrenaline). True only for Drug Facts (OTC) products.
- **Gates:** each has a label warning behind it.
  - Cetirizine (react): drowsiness; care with machinery.
  - Pseudoephedrine (bp, hr): "ask a doctor if heart disease, high blood pressure".
  - Albuterol (hr, bp): cardiovascular effects; caution in hypertension and arrhythmia. Worded as "use only as directed", not "do not take", so an emergency rescue dose is not blocked.
  - Prednisone (glucose, bp, phq4): high blood sugar, high blood pressure and psychiatric effects.
- **NASA claims re-verified:**
  - ISS EMP 1.108: oxygen, then two albuterol puffs. EMP 1.106 step 2.3: go to 1.108.
  - EMP 3.001 rows:
    - fexofenadine: no grapefruit juice from 1 h before to 2 h after; no other antihistamines.
    - tetracaine: remove contact lenses; wait 15 min.
    - clotrimazole.
    - prednisone: take with food; side effects.
    - mometasone (Nasonex).
  - CSRM entries:
    - fluticasone: purpose nasal congestion; bioavailability under 2%; nosebleeds and sore throat.
    - tetracaine: purpose eye foreign body.
    - mupirocin: avoid sensors on treated skin.
  - TB-033: sprays may suit weightlessness less well than solid medicines.
  - MTB-012 p. 10: eye drops are more prone to bacterial growth or loss of stability. MTB-012 p. 17: Ciloxan, proparacaine and an albuterol inhaler are on the shuttle list.
  - Du 2011: clotrimazole and mupirocin separated into layers in payload 4 (880 days); ciprofloxacin eye solution stayed acceptable beyond expiry.
  - Crucian 2016: oral antihistamines and oral steroids suggested; skin infections reported.
  - Ong 2025: 34%, 21% and 14% of 257 astronauts.
- **Carried-over entries:** the 5 entries from `kb_meds.json` are unchanged outside `dose` (checked field by field).

### Entries removed

None. Final count: 15 entries.

### Residual notes

- The saline dose comes from a 0.65% store-brand label. The ISS carries AYR 0.9%, and no DailyMed label was found for it. This is disclosed in `dose.label`.
- Fluticasone and saline spray numbers are per nostril, as the labels give them.
- Adding `anaphylaxis` to adrenaline relies on parallel batch c2 keeping that id.
