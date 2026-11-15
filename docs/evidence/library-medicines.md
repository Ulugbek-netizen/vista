# Void Voyagers medicine guide: research log (kb_meds)

Companion to `kb_meds.json` (19 entries). For every entry this log lists each claim as it is worded in the JSON and the exact source and place it comes from. Built 15 November 2026 for Void Voyagers (Team Void Voyagers, NASA Space Apps 2026). Fact-check corrections were applied the same day; the tables below show the corrected wording, and the "Verification log" at the end lists each correction, whether it was applied, and why.

## Ground rules applied

- Every claim comes from a source opened during this work (or the team's local copy of a NASA PDF listed in `docs/evidence/`, re-read for this log). Nothing was taken from memory.
- No doses, strengths, tablet counts, maximum daily amounts or dosing intervals appear in `kb_meds.json`, even where a source gives them (the ISS checklist, LeBlanc 2013, Whitson 2009, Barger 2014 and Dinges 2019 all state doses). Each `use` field ends with: "The dose and timing come from the flight surgeon and the onboard medical checklist." After the fact-check, no entry says when to take a medicine (lights-out, bedtime, before sleep, hours before waking); those were dosing-schedule instructions and were removed. Food cautions from the checklist are kept: zaleplon "not with a high-fat meal", ibuprofen "with food", potassium citrate "with a meal". The adrenaline entry no longer gives injection steps; it points to the onboard emergency checklist.
- Plain English, British spelling (diarrhoea, behaviour, programme), no emoji. A script (`meds_build/build_meds.py`) checks: valid JSON, kebab-case ids, ASCII only, no dose patterns (number plus mg, mEq, mL, tablets, "daily", "weekly", "every N hours"), the dose sentence present, and word count (name + group + for + use + cautions + space). Before the fact-check all 19 entries were 86 to 151 words. After it they are 86 to 188 words: promethazine (188) and antihistamines (156) are over the script's 155-word limit because the corrected wording is longer. All other checks pass. Note: `meds_build/build_meds.py` still holds the pre-correction text and rewrites `kb_meds.json` when run, so it must be updated before it is run again.
- Journal content is paraphrased, not quoted. NASA documents are paraphrased with page locators.

## Sources opened

| Key | Source | How opened | Used for |
|---|---|---|---|
| wotring2015 | Wotring VE 2015, Medication use by U.S. crewmembers on the ISS, FASEB J 29:4417-23. https://doi.org/10.1096/fj.14-264838 | PubMed abstract (PMID 26187345) and NASA NTRS author-version abstract (https://ntrs.nasa.gov/api/citations/20140017010/downloads/20140017010.pdf). Full text blocked (publisher returned HTTP 403). Detail taken from NASA's own summaries of this paper in Reichard 2023 and OCHMO-MTB-012. | ISS use rates, rash treatment failures, EVA- and exercise-linked use |
| putcha1999 | Putcha L et al. 1999, Pharmaceutical use by U.S. astronauts on space shuttle missions, Aviat Space Environ Med 70:705-8. https://pubmed.ncbi.nlm.nih.gov/10417009/ | PubMed abstract (no DOI listed) | Shuttle use, promethazine routes |
| barger2014 | Barger LK et al. 2014, Lancet Neurol 13:904-12. https://doi.org/10.1016/S1474-4422%2814%2970122-X | PMC full text (PMC4188436); also verified by the team (docs/evidence BSI-01, BSI-02) | Sleep-medicine use, zolpidem, zaleplon, melatonin shares, alarm and EVA risks |
| du2011 | Du B et al. 2011, Evaluation of physical and chemical changes in pharmaceuticals flown on space missions, AAPS J 13:299-308. https://doi.org/10.1208/s12248-011-9270-0 | PMC full text (PMC3085701) | Promethazine, antibiotic and triamcinolone stability |
| wotring2016 | Wotring VE 2016, Chemical potency and degradation products of medications stored over 550 Earth days at the ISS, AAPS J 18:210-6. https://doi.org/10.1208/s12248-015-9834-5 | PMC full text (PMC4706284) | Nine ISS-kit medicines after 550 days; Du 2011 results for antibiotics and ibuprofen as summarised by Wotring |
| reichard2023 | Reichard JF et al., NASA HRP Evidence Report: Risk of Ineffective or Toxic Medication During Long-Duration Exploration Spaceflight, approved 20 Dec 2023. https://ntrs.nasa.gov/citations/20230018496 | Full PDF from NTRS | Wotring 2015 details (sickness-medicine uses), overdose and phase-separation statements |
| mtb012 | NASA OCHMO-MTB-012 Rev B, Pharmaceutical Care (6 Jan 2026), served at https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-006-pharmaceuticals.pdf | Full PDF; the ISS kit list on p. 18 is an image, read after extracting it from the PDF | Wotring 2015 table (p. 8), Putcha 1999 summary and decongestant note (p. 9), eye drops and liquid antibiotics (p. 10), Mercury auto-injectors (p. 16), shuttle list (p. 17), ISS kit list (p. 18) |
| tb033 | NASA OCHMO-TB-033 Rev D, Spaceflight Experience and Medical Care (1 Dec 2023). https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-033-spaceflight-experience-medical-care.pdf | Team's local text copy, re-read | Congestion, back pain, sleep and alertness aid rates, sprays, post-landing medicines |
| tb010 | NASA OCHMO-TB-010, Sensorimotor. https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-010-sensorimotor.pdf | Team's local text copy, re-read | Case reviews: promethazine may be effective for space motion sickness |
| tb011 | NASA OCHMO-TB-011 Rev C, Lunar Dust. https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-011-lunar-dust-technical-brief.pdf | Local text copy, re-read | Apollo eye irrigation, Actifed |
| mtb013 | NASA OCHMO-MTB-013 Rev D, Bone Loss (11 Feb 2026). https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-030-bone-loss.pdf | Team's local text copy, re-read | Bisphosphonate status and side effects |
| mtb003 | NASA OCHMO-MTB-003 Rev A, Urinary Health. https://www.nasa.gov/wp-content/uploads/2025/01/ochmo-mtb-003-urinary-health.pdf | Team's local text copy, re-read | Potassium citrate on ISS at flight surgeon's discretion; tablet bulk; bisphosphonates and urine calcium |
| renal2017 | NASA HRP Evidence Report: Risk of Renal Stone Formation (2017). https://ntrs.nasa.gov/api/citations/20170004709/downloads/20170004709.pdf | Team's local text copy, re-read | Potassium citrate side effects and how to take it |
| nutr2021 | Smith SM, Zwart SR, Douglas GL, Heer M, Human Adaptation to Spaceflight: The Role of Food and Nutrition, 2nd ed., NASA 2021. https://www.nasa.gov/wp-content/uploads/2015/02/human_adaptation_2021_final.pdf | Team's local text copy, re-read | Potassium citrate policy and brushite caution |
| whitson2009 | Whitson PA et al. 2009, J Urol 182:2490-6. https://doi.org/10.1016/j.juro.2009.07.010 | PubMed abstract | Potassium citrate trial |
| leblanc2013 | LeBlanc A et al. 2013, Osteoporos Int 24:2105-14. https://doi.org/10.1007/s00198-012-2243-z | PubMed abstract | Alendronate trial |
| bmed2025 | NASA HRP Evidence Report: Risk of Adverse Cognitive or Behavioral Conditions and Psychiatric Disorders (10 Feb 2025). https://humanresearchroadmap.nasa.gov/evidence/reports/HRP-ER-BMED-HFBP-20250210.pdf | Team's local text copy, re-read (pp. 61-63) | Sleep medicine risks; personal tolerance testing |
| dinges2019 | Dinges DF et al. 2019, Sleep 42(3). https://doi.org/10.1093/sleep/zsy258 | PubMed abstract | Zolpidem and zaleplon after sudden waking |
| flynn2016 | Flynn-Evans EE et al. 2016, npj Microgravity 2:15019. https://doi.org/10.1038/npjmgrav.2015.19 | PubMed abstract (team BSI-03 also) | More sleep medicine on misaligned nights |
| dijk2001 | Dijk DJ et al. 2001, Am J Physiol Regul Integr Comp Physiol 281:R1647-64. https://doi.org/10.1152/ajpregu.2001.281.5.R1647 | PubMed abstract | Melatonin did not improve sleep in flight |
| csrm2024 | Ives E, Buckland D, Hoffmann B, York S, Crew State and Risk Model (CSRM): Medication Impacts on Physiologic Models for Exploration Class EVA Predictive Modeling and Operations, NASA NTRS 20240013840 (Nov 2024). https://ntrs.nasa.gov/citations/20240013840 | Full PDF from NTRS | Side effects "per protocol" (copied from the ISS medical documents), EVA relevance, zolpidem and zaleplon timing, EpiPen auto-injector |
| issemp | NASA Emergency Medical Procedures Manual for the ISS (pages dated March and April 2015), released under FOIA case 16-JSC-F-00174 (14 Mar 2016). https://www.governmentattic.org/19docs/NASA-ISSmedicalEmergManual_2016.pdf | Full PDF. NASA document, but hosted by a third-party FOIA archive, not a NASA domain. OCHMO-MTB-012 p. 18 reproduces the same kit list and cites this manual. | ISS kit contents by pack, checklist side effects and comments, EpiPen procedure 1.101 |
| blue2019 | Blue RS et al. 2019, Supplying a pharmacy for NASA exploration spaceflight, npj Microgravity 5:14. https://doi.org/10.1038/s41526-019-0075-2 | PMC full text (PMC6565689) | Pre-flight testing of sleep and alertness medicines, absorption studies, Putcha 1999 ineffectiveness list, antibiotic resistance, shelf life |
| crucian2016 | Crucian B et al. 2016, Int J Gen Med 9:383-91. https://doi.org/10.2147/IJGM.S114188 | PMC full text (PMC5098747); team BSI-29 also | Rashes, antihistamine use, infections, no anaphylaxis |
| ong2025 | Ong J et al. 2025, Life Sci Space Res 46:169-86. https://doi.org/10.1016/j.lssr.2025.05.005 | PubMed abstract | Eye symptoms after flight |
| nowadly2026 | Nowadly C et al. 2026, Wilderness Environ Med (online 4 Aug 2026). https://doi.org/10.1177/10806032261466966 | PubMed abstract | Adrenaline and promethazine potency after ISS flight |
| tran2024 | Tran QD et al. 2024, Adv Healthc Mater 14(4):e2402361. https://doi.org/10.1002/adhm.202402361 | PubMed abstract | Experimental ibuprofen tablets on the ISS |
| davis1993a | Davis JR et al. 1993, Treatment efficacy of intramuscular promethazine for space motion sickness, Aviat Space Environ Med 64:230-3. https://pubmed.ncbi.nlm.nih.gov/8447805/ | PubMed abstract (no DOI listed) | Injection efficacy |
| davis1993b | Davis JR, Jennings RT, Beck BG 1993, Comparison of treatment strategies for space motion sickness, Acta Astronaut 29:587-91. https://doi.org/10.1016/0094-5765(93)90074-7 | PubMed abstract | Scop-dex results, injection and suppository relief |
| jennings1998 | Jennings RT 1998, Managing space motion sickness, J Vestib Res 8:67-70. https://pubmed.ncbi.nlm.nih.gov/9416592/ | PubMed abstract (no DOI listed) | Pre-sleep timing, post-landing medicines |
| bagian1994 | Bagian JP, Ward DF 1994, J Clin Pharmacol 34:649-51. https://doi.org/10.1002/j.1552-4604.1994.tb02019.x | PubMed abstract | In-flight sedation rate |
| weerts2015a | Weerts AP et al. 2015, J Psychopharmacol 29:1231-5. https://doi.org/10.1177/0269881115598414 | PubMed abstract | Scopolamine routes used in space; side effects |
| weerts2015b | Weerts AP et al. 2015, J Appl Physiol 119:213-8. https://doi.org/10.1152/japplphysiol.00149.2015 | PubMed abstract | Some astronauts use scopolamine to prevent sickness |
| putcha1989 | Putcha L et al. 1989, Pharm Res 6:481-5. https://doi.org/10.1023/a:1015916423156 | PubMed abstract | Variable absorption of scopolamine tablets |
| putcha1996 | Putcha L et al. 1996, J Pharm Sci 85:899-902. https://doi.org/10.1021/js950327b | PubMed abstract | Nasal scopolamine tested on the ground |

Also opened but not cited in the JSON: Wotring and Smith 2020 (Dose Tracker, https://doi.org/10.3357/AMHP.5392.2020); Ramanathan 1998 (nasal promethazine in dogs); Putcha and Cintron 1991 (https://doi.org/10.1111/j.1749-6632.1991.tb27292.x; abstract only, results not stated); Hordinsky 1982; the NTRS abstract "Stability analysis of ISS medications" (20140003730).

## Entry-by-entry claims and sources

### 1. promethazine
| Claim | Source and locator |
|---|---|
| Treats space motion sickness once symptoms start | davis1993b abstract (NASA policy: treat after symptoms develop); tb010 p. 9 (case reviews: promethazine may be effective) |
| Also for nausea or vertigo after landing | tb033 p. 15 (post-landing neurovestibular: medications such as meclizine, promethazine); jennings1998 abstract (meclizine and promethazine principal post-flight agents) |
| Injection into a muscle worked best on the shuttle | putcha1999 abstract (promethazine given by three routes; most effective, minimal side effects when intramuscular); davis1993a abstract (90% immediate relief after IM injection) |
| Also given as a tablet | issemp 3.001 p. 17 (tablets in oral pack) and p. 25 (intramuscular in topical and injectable pack); mtb012 p. 18 (promethazine listed only in the Oral Pak and the Topical/Injectable Pak) |
| Suppositories were also used on the shuttle | putcha1999 abstract (oral and rectal routes); davis1993b abstract (suppositories); reichard2023 p. 9 (oral or rectal promethazine on the shuttle) |
| Side effects listed | issemp 3.001 pp. 17 and 25; csrm2024 promethazine section (same "per protocol" list: sedation, poor concentration, drowsiness, dizziness, blurred vision, dry mouth, constipation, photosensitivity, and more) |
| Checklist: may impair performance; do not use with sleep medicines | issemp 3.001 p. 17 comments column |
| Spacewalk model flags its drowsiness | csrm2024 promethazine rationale (drowsiness and sedation mapped to the fatigue and traverse models used to predict EVA readiness) |
| 14 of 15 felt better within 1 to 2 hours after injection | davis1993b abstract |
| Sedation rarer than on the ground | bagian1994 abstract (1 of 21 injected crew sedated in flight versus 60 to 73% in ground studies) |
| Most used sickness medicine on the ISS, 9 of 12 uses; judged ineffective once | reichard2023 p. 9 (summarising wotring2015: 12 uses for space adaptation syndrome, 9 promethazine, 2 scopolamine, 1 meclizine; ineffective in 2 of the 5 symptom-driven cases, one promethazine and one scopolamine) |
| 2011 storage study: suppositories lost strength faster in flight than on the ground | reichard2023 p. 97 Table A3 (suppository 9.9% below ground at 880 days), p. 99 Table A4 (flight-to-ground degradation-rate ratio 2.41), p. 20 (promethazine suppositories the only non-solid form with extensive degradation) |
| NASA's 2023 review: injection stayed close to ground samples; the paper swapped two charts | reichard2023 p. 97 Table A3 (injection within 5% of ground at every time point) and footnote (Du 2011 Fig. 4 panels b and c switched, judged from the supplementary data), p. 99 Table A4 (ratio 1.14), p. 10 (Du 2011 showed promethazine keeps its stability for almost a year in flight). The du2011 text itself says the injection degraded faster; NASA's reading is used. |
| 2026 study of eight expired medicines, promethazine among them: most within about 5% of matching ground samples | nowadly2026 abstract (all samples past expiry; eight medicines including promethazine; average flight-ground differences generally within 5% for most medicines; no result given for promethazine alone) |

### 2. scopolamine
| Claim | Source and locator |
|---|---|
| Used to prevent sickness before it starts | weerts2015b abstract (some astronauts use scopolamine to prevent space motion sickness); davis1993b abstract (scop-dex given before flight as prevention) |
| Taken by mouth before flight, including as scop-dex, or as a skin patch | davis1993b abstract; weerts2015a abstract (transdermal and oral scopolamine have been used in space) |
| Nasal spray tested on the ground | putcha1996 abstract (ground study of nasal, oral and IV scopolamine); weerts2015a and weerts2015b (ground trials of nasal scopolamine) |
| Dry mouth, dizziness, some sleepiness | weerts2015a abstract (dry mouth and dizziness reported; only the Karolinska sleepiness score rose versus placebo) |
| Scop-dex often only delayed sickness: of 19, 9 later, 7 not protected | davis1993b abstract (19 crew on scop-dex: delayed symptoms in 9, failed to prevent in 7, only 3 symptom-free) |
| NASA stopped recommending scop-dex prevention: delayed sickness, uneven absorption of oral medicines early in flight | davis1993b abstract |
| Used twice on the ISS 2002 to 2012, judged ineffective once | reichard2023 p. 9 (wotring2015 data: 2 scopolamine uses; ineffective in one of the symptom-driven cases) |
| Small ground study: share absorbed when taken by mouth varied widely between people | putcha1989 abstract (six healthy men, oral dose; bioavailability 10.7 to 48.2%; form not stated) |

### 3. meclizine
| Claim | Source and locator |
|---|---|
| Nausea, vomiting, vertigo after landing | tb033 p. 15; jennings1998 abstract |
| Tablet in ISS oral pack under motion sickness and anti-nausea | issemp 3.001 p. 17 (heading "Space Motion Sickness/Anti-Nausea"); mtb012 p. 18 (Oral Pak list) |
| Side effects | issemp 3.001 p. 17; csrm2024 meclizine section |
| Checklist: may impair performance; not with sleep medicines | issemp 3.001 p. 17 comments |
| Used once for sickness on the ISS 2002 to 2012 | reichard2023 p. 9 (wotring2015) |
| Ondansetron also carried | issemp 3.001 p. 17; mtb012 p. 18 |

### 4. zolpidem
| Claim | Source and locator |
|---|---|
| For trouble sleeping, including around schedule shifts | barger2014 (sleep-promoting medication use); flynn2016 abstract (sleep-medicine use 24% on misaligned versus 11% on aligned sleep episodes) |
| Tablet by mouth | issemp 3.001 p. 4 (oral tablet); csrm2024 (tablet, oral). The lights-out and "7 to 8 hours before waking" timing was removed in the fact-check (an FDA-label timing condition per csrm2024 and barger2014 Discussion; timing comes from the flight surgeon). |
| Crew test sleep medicines on the ground first, for personal guidance | barger2014 Discussion (crew encouraged to try them at home before flight); bmed2025 pp. 62-63 (individual drug tolerance testing sets personal recommendations); blue2019 (NASA identifies response to sleep and alertness medicines before flight) |
| Side effects | issemp 3.001 p. 4; csrm2024 |
| Alarm waking: thinking, reactions, balance impaired | barger2014 Discussion (performance and balance impaired after waking; emergency alarm concern); dinges2019 abstract (higher zolpidem dose impaired throughput, vigilance, working memory and recall at sudden waking); bmed2025 p. 63 (impaired alertness on waking and impaired waking to caution warnings) |
| Never combine with other sleep medicines | issemp 3.001 p. 4 comment |
| Women clear it more slowly | csrm2024 zolpidem rationale |
| Sleep-walking reported | barger2014 Discussion (sleep-walking, sleep-eating and sleep-driving events reported with zolpidem) |
| Most used sleep medicine on shuttle missions | barger2014 Results (zolpidem and zolpidem CR on 73% and 12% of nights when one sleep medicine was taken) |
| 75 to 78% of shuttle and ISS crew used sleep medicines | barger2014 abstract (61 of 78 shuttle, 12 of 16 ISS) |
| Taken on 60% of nights before shuttle spacewalks | barger2014 Results |
| Measured sleep improved only slightly | barger2014 Discussion (sleep efficiency up 1.3%; sleep duration difference not significant) |
| Met standards 9 months past expiry after 550 days on the ISS | wotring2016 Results (zolpidem at 100.6% of label) |

### 5. zaleplon
| Claim | Source and locator |
|---|---|
| Capsule by mouth | csrm2024 (capsule, oral). "At bedtime" was removed in the fact-check as a timing instruction. |
| Not with a high-fat meal | issemp 3.001 p. 4 comment |
| Crew test sleep medicines on the ground | barger2014; bmed2025 |
| Side effects | issemp 3.001 p. 4; csrm2024 |
| Impairment at about 1 h, gone within 2 to 4 h in studies | csrm2024 zaleplon rationale |
| In larger trials, about 3 in 100 had next-day memory lapses | csrm2024 zaleplon rationale (risk of next-day amnesia 3% in larger clinical trials) |
| Not with other sleep medicines; complex sleep behaviours reported | issemp 3.001 p. 4 comment; csrm2024 (boxed warning: complex sleep behaviour) |
| 11% of shuttle nights when one sleep medicine was taken | barger2014 Results |
| Ground study of astronauts and flight controllers: minor effects at sudden waking, unlike the higher zolpidem dose | dinges2019 abstract |
| In ISS convenience pack | mtb012 p. 18; issemp 3.001 p. 4 |

### 6. melatonin
| Claim | Source and locator |
|---|---|
| Sleep aid; hormone sold as a dietary supplement | wotring2016 (dietary supplement used as a sleep aid) |
| Tablet by mouth | issemp 3.001 p. 4 |
| Side effects; never combine with other sleep medicines | issemp 3.001 p. 4 |
| Less strictly regulated than prescription medicines | wotring2016 Discussion |
| Did not improve sleep on two shuttle missions | dijk2001 abstract |
| About 2% of shuttle nights when one sleep medicine was taken | barger2014 Results (7 of 413 nights) |
| Only one of nine to fail the standards then in force, at 11 months past expiry | wotring2016 abstract and Results (failed USP for both content and impurities) |

### 7. modafinil
| Claim | Source and locator |
|---|---|
| Staying alert when sleep is cut short, for example around schedule shifts | tb033 p. 9 (circadian shifts cause sleep loss and alertness deficits; treated with sleep aids and alertness aids); csrm2024 (labelled purpose: circadian management) |
| Tablet by mouth | issemp 3.001 pp. 5 and 17 |
| Crew test response to sleep and alertness medicines before flight | blue2019 (pharmacogenomics section) |
| Side effects; headache common | issemp 3.001 p. 5; csrm2024 (headache 34%) |
| Insomnia disturbs the next sleep period | csrm2024 modafinil rationale |
| About 21% of ISS crew used alertness medicines, rated very effective | mtb012 p. 8 table (from wotring2015); tb033 p. 9 (about 21%) |
| Met standards 2 months before expiry after 550 days | wotring2016 Results |
| Caffeine tablets also carried | issemp 3.001 p. 4; mtb012 p. 18 |

### 8. ibuprofen
| Claim | Source and locator |
|---|---|
| Back pain early in flight, headache, joint and muscle pain from exercise and EVA | tb033 p. 4 (space adaptation back pain within first days, 52%) and p. 9 (headaches; joint and muscle pain from EVA and exercise equipment) |
| Tablet by mouth with food | issemp 3.001 p. 4 comment |
| Side effects | issemp 3.001 p. 4; csrm2024 |
| Weakens the stomach's natural protection, causing stomach upset | csrm2024 ibuprofen rationale |
| Pain relievers used by 54% for headache, 46% for joint pain, 21% for back pain | mtb012 p. 8 table (from wotring2015) |
| Early back pain affects about half of crew | tb033 p. 4 (52%) |
| Passed potency after about 2.5 years on the ISS | wotring2016 Discussion (reporting Du 2011 ibuprofen results) |
| 19 custom-made tablet recipes: all but one without an iron-oxide shield lost over 10% inside the station | tran2024 abstract (iron-oxide-shielded tablets under 10% inside the ISS; other formulations over 10%, with one exception; number of shielded recipes not stated) |

### 9. paracetamol
| Claim | Source and locator |
|---|---|
| Tablet by mouth | issemp 3.001 p. 3 |
| Few side effects at the prescribed dose | issemp 3.001 p. 3; csrm2024 |
| Little expected effect on EVA readiness | csrm2024 acetaminophen rationale (not assigned to any EVA model) |
| Overdose can damage the liver | reichard2023 p. 64 |
| Prescription painkiller in kit combines hydrocodone with paracetamol | issemp 3.001 p. 16; mtb012 p. 18 |
| Shuttle saliva tests: faster absorption early, slower later; Russian study: tablets and capsules behaved differently | blue2019 (review of Cintron 1987 NASA reports and Kovachevich 2009) |
| 97% of strength 5 months past expiry; meets 2012 standard, not the updated one | wotring2016 Results |

### 10. decongestants
| Claim | Source and locator |
|---|---|
| Stuffy nose and head congestion, common early in flight and with raised CO2 | tb033 p. 4 (head and nasal congestion from space adaptation or CO2) |
| Pseudoephedrine tablets; oxymetazoline and saline sprays | issemp 3.001 p. 3; mtb012 p. 18 |
| Sprays may suit weightlessness and airflow less well than tablets | tb033 p. 9 |
| Pseudoephedrine side effects | issemp 3.001 p. 3; csrm2024 (raises heart rate and blood pressure; insomnia) |
| Oxymetazoline stinging and dryness; rebound congestion; checklist limits consecutive days | issemp 3.001 p. 3 (comment gives a day limit, not repeated here) |
| Congestion affects over half of crew; leading cause of prolonged medicine use | tb033 p. 4 |
| Fluid-shift stuffiness may not be relieved by decongestants | mtb012 p. 9 (says "will not"); softened because tb033 p. 4 lists congestion or allergy medicines as the treatment for head congestion from space adaptation or CO2, and blue2019 lists oxymetazoline and pseudoephedrine among shuttle drugs reported not or only mildly effective |
| Apollo crews: moderate relief from Actifed | tb011 p. 2 |
| Pseudoephedrine met standards 9 months past expiry | wotring2016 Results |

### 11. antihistamines
| Claim | Source and locator |
|---|---|
| Allergy, itchy rashes, lasting stuffy nose with sneezing | crucian2016 Discussion (persistent upper respiratory symptoms treated with and responsive to antihistamines; antihistamines suggested for allergic or hypersensitivity symptoms) |
| Loratadine, fexofenadine tablets; diphenhydramine capsule or injection; eye drops and nasal spray carried | csrm2024 (diphenhydramine capsule, oral); issemp 3.001 pp. 2, 14 (diphenhydramine oral capsule), 21-22 (olopatadine eye drops; cromolyn nasal spray listed under antihistamine); mtb012 p. 18 |
| Diphenhydramine drowsiness and poor concentration for hours; checklist: may impair performance, not with sleep medicines | csrm2024 (drowsiness up to 6 h, mental impairment about 2 h); issemp 3.001 p. 14 comments |
| Fexofenadine not with other antihistamines or grapefruit juice | issemp 3.001 p. 2 comments |
| Fexofenadine far less sedating than diphenhydramine | csrm2024 (fexofenadine drowsiness 1.3%, lower sedation risk in meta-analysis; diphenhydramine drowsiness 10 to 25%) |
| Loratadine side effects | issemp 3.001 p. 2 |
| A NASA review of astronaut health records: most prescribed medicine in flight for problems lasting over a week; second to sleep medicines for shorter ones | crucian2016 Discussion (a NASA pharmacology survey of astronaut archival health records, citing Wotring 2012; not stated to be ISS-only) |
| Rashes and stuffy noses the most common immune-related complaints | crucian2016 Results (23 rash events, 20 upper respiratory events) |
| Loratadine met 2012 standard, would fail the updated one | wotring2016 Results and Discussion |

### 12. topical-steroids
| Claim | Source and locator |
|---|---|
| Hydrocortisone single-use packets; fluocinonide in kit | issemp 3.001 pp. 4 and 25; mtb012 p. 18 |
| Triamcinolone in shuttle list | mtb012 p. 17 |
| Do not place sensors or electrodes on treated skin | csrm2024 (avoid placing sensors where topical medicine has been applied) |
| Hydrocortisone no significant side effects; fluocinonide irritation, itching | issemp 3.001 pp. 4 and 25 |
| Some ISS rashes lasted a long time or did not respond | crucian2016 Results (notable events: prolonged or unresponsive to treatment; almost half were prolonged rashes) |
| Rashes most common, about 25 times Earth rate; topical steroids suggested | crucian2016 Discussion |
| Two apparent treatment failures were rash cases | wotring2015 abstract |
| Triamcinolone cream kept strength 880 days; samples changed in appearance | du2011 Discussion (one of two stable non-solid forms) and Table II (physical changes) |
| Creams that separate can become unusable | reichard2023 p. 64 |

### 13. loperamide
| Claim | Source and locator |
|---|---|
| Tablet by mouth; only for non-bloody diarrhoea | issemp 3.001 p. 2 comment |
| Side effects | issemp 3.001 p. 2; csrm2024 |
| Heart problems at higher than recommended doses | csrm2024 (boxed warning) |
| Diarrhoea can dehydrate | csrm2024 (diarrhoea and vomiting raise dehydration concern) |
| In ISS convenience pack and on the shuttle | mtb012 pp. 17-18 |
| About 96% of strength 2 months before expiry; impurity above newer limit | wotring2016 Results |

### 14. laxatives
| Claim | Source and locator |
|---|---|
| Bisacodyl tablet in ISS convenience pack | issemp 3.001 p. 5; mtb012 p. 18 |
| Side effects; diarrhoea common with overuse | issemp 3.001 p. 5; csrm2024 (cramps 24%, diarrhoea 53%) |
| Several onboard medicines list constipation | issemp 3.001 pp. 2, 16-17 (loperamide, hydrocodone with paracetamol, ondansetron, promethazine) |
| Flew on the shuttle; some crew reported it not or only mildly effective | mtb012 p. 17; blue2019 (summarising putcha1999) |
| No clinically important salt loss | csrm2024 (based on reviews) |

### 15. artificial-tears
| Claim | Source and locator |
|---|---|
| Carboxymethylcellulose and hypromellose drops, mineral oil and petrolatum ointment in ISS convenience pack | issemp 3.001 p. 3; mtb012 p. 18 |
| Take contact lenses out first; vision may blur briefly | issemp 3.001 p. 3 |
| Eye drops more prone to bacterial growth or loss of stability | mtb012 p. 10 |
| 34% irritation, 21% foreign-body feeling, 14% dry eyes in 257 astronauts after flight | ong2025 abstract (2024 NASA Lifetime Surveillance data) |
| Apollo crews needed copious saline for lunar dust in eyes | tb011 p. 2 |

### 16. alendronate
| Claim | Source and locator |
|---|---|
| Protects bone and lowers urine calcium; research use only | leblanc2013 abstract; mtb013 p. 15 |
| Tablet by mouth, started before launch, continued through mission, with resistance exercise | leblanc2013 abstract |
| Gut side effects; rare jaw osteonecrosis; NASA has not used it outside research | mtb013 p. 15 (text and countermeasure table) |
| Seven ISS astronauts with ARED: smaller losses in almost every measure and less urine calcium than exercise-only crew | leblanc2013 abstract (compared with 18 iRED and 11 ARED-only astronauts) |
| NASA considering it for longer missions; storage, mass, expiry challenges | mtb013 p. 15 |
| Bisphosphonates lower urine calcium and stone risk | mtb003 p. 7 |

Note: mtb013 states that 18 ISS astronauts took alendronate; the paper says 7. The paper is used, as in the team's file docs/evidence/musculoskeletal-neuro.md (MSN-05, X-09).

### 17. potassium-citrate
| Claim | Source and locator |
|---|---|
| Only when the flight surgeon judges it necessary | nutr2021 pp. 62-63 (on the ISS for use at the flight surgeon's discretion); mtb003 p. 7 |
| Swallow whole with a meal and plenty of fluid; never chewed, crushed or sucked | renal2017 p. 13 (ways to minimise gut risks) |
| Stomach upset, nausea, vomiting, diarrhoea | renal2017 p. 13 |
| High blood potassium risk with dehydration, kidney disease, potassium-sparing diuretics | renal2017 p. 13 |
| Too high urine pH favours brushite stones; dose must be set carefully | nutr2021 pp. 62-63 |
| Lowered urine calcium; held calcium oxalate risk at preflight levels | whitson2009 abstract |
| Not given routinely: hydration is simpler and potassium has side effects | nutr2021 pp. 62-63 |
| Tablets bulky | mtb003 p. 7 |

### 18. adrenaline-auto-injector
| Claim | Source and locator |
|---|---|
| Kept in the red Emergency Medical Treatment Pack | issemp procedure 1.101 Severe Allergic Reaction (dated 23 Mar 2015) and 3.001 p. 6 |
| In a severe allergic reaction, use it exactly as the onboard emergency checklist says, then call Mission Control | issemp 1.101 Severe Allergic Reaction (dated 23 Mar 2015; step 1.5 "Call MCC-H to request PMC"); mtb012 p. 18 (epinephrine in the Emergency Pak, no device named). The step-by-step EpiPen injection instructions were removed in the fact-check: the app must not stand in for the checklist, and the current device is not confirmed. |
| Side effects | issemp 3.001 p. 6; csrm2024 (EpiPen auto-injector, intramuscular, allergic reaction) |
| No anaphylaxis in 46 ISS crew | crucian2016 Results |
| Carried in emergency auto-injectors in Mercury | mtb012 p. 16 |
| Study of expired medicines: ISS-flown adrenaline averaged 10% lower strength than same-batch ground samples; clearest loss of eight medicines | nowadly2026 abstract (lot-matched controls; all medicines past expiry when tested) |

### 19. antibiotics
| Claim | Source and locator |
|---|---|
| Examples and forms: tablets, injections, eye or ear drops, ointments | issemp 3.001 pp. 13, 20-21; mtb012 p. 18 |
| For skin, throat or urinary infections | crucian2016 (infection categories: skin, upper respiratory, urinary tract; pharyngitis and skin infection among events) |
| Possible side effects; sun sensitivity | issemp 3.001 p. 13; csrm2024 |
| Diarrhoea can dehydrate | csrm2024 |
| No contact lenses during antibiotic eye treatment | issemp 3.001 p. 21 comments |
| At least 13 infections in 46 ISS crew | crucian2016 Results |
| One storage study: amoxicillin-clavulanate, levofloxacin, sulfamethoxazole-trimethoprim lost strength before expiry | wotring2016 Introduction and blue2019 (both summarising du2011) |
| Ground samples lost strength too | du2011 Results (clavulanate degraded faster on the ground than in flight; sulfamethoxazole-trimethoprim lower in flight than its controls; other antibiotics comparable between flight and ground); reichard2023 p. 99 Table A4 (ground degradation rates for all three) |
| NASA's 2023 review points to the non-protective repackaging used for flight as a common factor | reichard2023 pp. 19-20 (common factor in all reports of in-flight degradation of tablets and capsules: non-protective packaging), p. 10 and p. 96 (tablets repacked into zip-lock bags or plastic containers) |
| Space-grown bacteria more resistant to some antibiotics in early experiments | blue2019 (Tixador 1985, Juergensmeyer 1999) |
| Liquid antibiotics prone to losing stability | mtb012 p. 10 |

## Condition ids used

Reconciled with `kb_conditions.json` during the fact-check. Every id in `kb_meds.json` now exists in `kb_conditions.json`. The ids used are: `space-motion-sickness`, `sleep-loss-and-circadian-misalignment`, `fatigue-and-slowed-reactions`, `space-adaptation-back-pain`, `headward-fluid-shift`, `immune-changes-and-virus-reactivation`, `skin-problems-and-slow-healing`, `eye-injury-from-floating-debris`, `moon-and-mars-dust`, `bone-loss`, `kidney-stones`.

How the original ids were mapped: `sleep-loss` and `circadian-misalignment` became `sleep-loss-and-circadian-misalignment`; `fatigue` became `fatigue-and-slowed-reactions`; `post-landing-readaptation` and `nausea-vomiting` became `space-motion-sickness`; `nasal-congestion` and `headache` became `headward-fluid-shift`; `skin-rash` and `skin-infection` became `skin-problems-and-slow-healing`; `allergy`, `infection` and `fever` became `immune-changes-and-virus-reactivation`; `dry-eye` became `eye-injury-from-floating-debris`; `eye-irritation` became both `eye-injury-from-floating-debris` and `moon-and-mars-dust`. `muscle-joint-pain`, `diarrhoea`, `constipation`, `urinary-tract-infection` and `anaphylaxis` have no matching condition and were removed.

As a result, `loperamide`, `laxatives` and `adrenaline-auto-injector` have an empty `conditions` list until matching condition entries are added to `kb_conditions.json`. The links are "related condition" links: for example, `antibiotics` links to `immune-changes-and-virus-reactivation` because Crucian 2016 (a source of that condition) ties ISS infections to immune changes, but the entry itself says antibiotics are for bacterial infections only.

## Could not source, or left out

- **Naproxen.** No spaceflight source was found (PubMed search for naproxen with astronaut or spaceflight returned nothing; it is not in the ISS kit list in OCHMO-MTB-012 or the shuttle list). It was left out. Ibuprofen and paracetamol cover pain.
- **Wotring 2015 full text** was not accessible (publisher 403). Its detailed numbers come from NASA's summaries (Reichard 2023 p. 9; OCHMO-MTB-012 p. 8), cited alongside the paper.
- **Current ISS adrenaline form.** The EpiPen auto-injector is confirmed in the ISS procedures dated March 2015 (FOIA copy) and in the 2024 NASA EVA modelling document; OCHMO-MTB-012 (2026) lists adrenaline in the ISS emergency pack but does not name the form.
- **Scopolamine on today's ISS.** It is not in the 2016 partial kit list; its use is sourced to 2002 to 2012 records and earlier shuttle reports.
- **Zaleplon stability.** Not in the ISS storage studies opened; nothing was said about it.
- **Melatonin study regimen** (Dijk 2001) and all other doses and schedules given in the sources were deliberately left out.
- **Modafinil** was added because ISS kit lists, Wotring 2016 and NASA's summary of Wotring 2015 (alertness aids, 21% of crew) show spaceflight use.

## Caveats

- The ISS Emergency Medical Procedures Manual is a NASA document but is hosted by a FOIA archive (governmentattic.org), not a NASA site, and its pages date from 2015. Its kit list matches OCHMO-MTB-012 p. 18, and its side-effect column is the same "per protocol" list quoted in the NTRS document csrm2024.
- Stability evidence is limited and mixed. Reichard 2023 concludes it is unclear whether spaceflight itself changes medicine stability; most studies lack matched ground controls. Wotring 2016 had no ground controls; Du 2011 had one sample per time point.
- Several percentages come from small groups (for example 12 of 16 ISS crew; 7 alendronate users; 5 Russian crew in the paracetamol study).
- Dinges 2019 is a ground study; Weerts 2015, Putcha 1989 and Putcha 1996 are ground studies; Tran 2024 tested custom-made tablets, not flight-kit products.

## Verification log

On 15 November 2026, 15 fact-check corrections were checked against their sources before any change was made. Local copies used: Reichard 2023 (`dl_ntrs2/pharm2023.u8.txt`; page numbers are the printed ones), Ives 2024 CSRM (`dl_ntrs2/crsm.txt`), the ISS Emergency Medical Procedures Manual (`dl_emp/emp2016.txt`), OCHMO-MTB-012 Rev B (`dl_ochmo/tb006.txt`, and the p. 18 kit-list image `dl_ochmo/imgs/img_394.png`), OCHMO-TB-033 (`fc/dl/tb033.txt`), Du 2011 (`dl_epmc/PMC3085701.txt`), Wotring 2016 (`dl_epmc/PMC4706284.txt`), Barger 2014 (`dl_epmc/PMC4188436.txt`), Crucian 2016 (`dl_epmc/PMC5098747.txt`), Blue 2019 (`dl_epmc/PMC6565689.txt`), `kb_conditions.json` and `meds_build/build_meds.py`. The abstracts for Nowadly 2026 (PMID 42550782), Tran 2024 (PMID 39444063) and Putcha 1989 (PMID 2762223) were fetched again from PubMed.

**Result: 15 applied (one with a one-word amendment), 0 skipped. `kb_meds.json` is still a valid array of 19 entries with the same keys and types.**

| # | Entry and field | Change | Status | Source check |
|---|---|---|---|---|
| 1 | adrenaline-auto-injector, use | Step-by-step EpiPen injection instructions replaced with: use it exactly as the onboard emergency checklist says, then call Mission Control | Applied | issemp 1.101 (dated 23 Mar 2015) is the only source for the steps, and it says "Call MCC-H to request PMC". The mtb012 p. 18 kit-list image lists epinephrine in the Emergency Pak and names no device. The red Emergency Medical Treatment Pack is confirmed by issemp 1.101. |
| 2 | zolpidem, use | Removed "at lights-out, only when 7 to 8 hours remain before you must wake" | Applied | csrm2024 says next-day impairment risk rises if it is not taken 7 to 8 h before waking (from the package insert). barger2014 Discussion quotes the FDA "full night's sleep (7 to 8 hours)" warning. Both confirm it is a label timing condition. `build_meds.py` states the rule "No doses or dosing schedules", and the same field already says timing comes from the flight surgeon. |
| 3 | promethazine, space | Storage sentence replaced: suppositories lost strength faster in flight; NASA found the injection stayed close to ground samples and the paper swapped two charts; a 2026 study of eight expired medicines found most within about 5% of ground samples | Applied | reichard2023 p. 97 footnote (Du 2011 Fig. 4 panels b and c switched, judged from the supplementary data); Table A3 p. 97 (suppository 9.9% and injection 4.5% below ground at 880 days); Table A4 p. 99 (rate ratios 2.41 and 1.14); p. 10 (stable for almost a year in flight); p. 20 (suppositories the exception). The nowadly2026 abstract confirms all samples were expired, eight medicines including promethazine, most within about 5%, and no result for promethazine alone. The du2011 Results text says the injection degraded faster; NASA's later reading is used. |
| 4 | promethazine, use | Removed "or suppository" and "given just before sleep"; added "Suppositories were also used on the shuttle" | Applied | The mtb012 p. 18 image lists promethazine only in the Oral Pak and the Topical/Injectable Pak. issemp 3.001 lists an oral tablet and an intramuscular vial, and has no suppository anywhere in the manual. Shuttle rectal use is confirmed by putcha1999 (abstract, per research log), davis1993b, and reichard2023 p. 9 ("oral or rectal promethazine"). "Before sleep" is a timing instruction. |
| 5 | all entries, conditions | 19 unmatched ids mapped or removed (see "Condition ids used") | Applied | Confirmed that 19 of the 23 ids were not in `kb_conditions.json` (20 ids); only space-motion-sickness, space-adaptation-back-pain, bone-loss and kidney-stones matched. Each target entry was read to confirm the fit; for example, headward-fluid-shift covers stuffy nose and headache and names decongestant, allergy and pain medicines. The five unmatched ids were removed because adding condition entries is outside this file. loperamide, laxatives and adrenaline-auto-injector now have empty lists. |
| 6 | zaleplon, use | Removed "at bedtime" | Applied | csrm2024 confirms capsule, oral. "At bedtime" is a timing instruction. The high-fat-meal caution from issemp 3.001 p. 4 is kept. |
| 7 | zaleplon, cautions | Added "In larger trials, about 3 in 100 people had memory lapses the next day" | Applied | csrm2024 zaleplon rationale: "Risk of next day amnesia was 3% in larger clinical trials." |
| 8 | promethazine, space | Added "and was judged ineffective once" | Applied | reichard2023 p. 9: ineffective in 2 of the 5 symptom-driven cases, one promethazine and one scopolamine. |
| 9 | ibuprofen, space | "most custom-made test tablets" changed to "in an experiment with 19 custom-made tablet recipes, all but one of those without an iron-oxide shield lost over 10%" | Applied | tran2024 abstract: 19 compositions; iron-oxide-shielded tablets under 10% inside the ISS; other formulations over 10% "with one exception"; it does not say how many recipes were shielded, so "most" was not supported. |
| 10 | antihistamines, use | Diphenhydramine "tablet" changed to "capsule" | Applied | csrm2024 (capsule, oral); issemp 3.001 p. 14 (oral capsule). |
| 11 | antihistamines, space | "On the ISS" changed to "A NASA review of astronaut health records ... in flight" | Applied | crucian2016 Discussion credits "a recent NASA pharmacology survey of astronaut archival health records" (ref. 38, Wotring 2012, Space Pharmacology) and does not say the data were ISS-only. |
| 12 | scopolamine, space | "scopolamine tablets" changed to "a small ground study ... when taken by mouth" | Applied | putcha1989 abstract: six healthy men, oral or intravenous dose, oral bioavailability 10.7 to 48.2%; the form is not stated. |
| 13 | antibiotics, space | Added that ground samples lost strength too, and NASA's point about repackaging | Applied with amendment | du2011 Results: clavulanate degraded faster on the ground than in flight; sulfamethoxazole-trimethoprim was lower in flight than its controls; the other antibiotics, including levofloxacin, were comparable. reichard2023 Table A4 shows ground degradation for all three. The proposed word "thin" is not in the source: reichard2023 pp. 19-20 says "non-protective packaging" (p. 96: zip-lock bags or plastic containers), so "non-protective" was used instead. The cited "p. 19" is pp. 19-20. |
| 14 | decongestants, space | "will not be relieved" changed to "may not be relieved" | Applied | mtb012 p. 9 says "will not be relieved by decongestants". tb033 p. 4 lists congestion or allergy medicines as the treatment for head congestion from space adaptation or CO2. blue2019 lists oxymetazoline and pseudoephedrine among shuttle drugs reported not or only mildly effective. Because the NASA briefs disagree, the hedged wording is supported and no longer contradicts headward-fluid-shift in `kb_conditions.json`, which was not edited. |
| 15 | adrenaline-auto-injector, space | "lot-matched" and "potency" replaced by plain words; added that the medicines were expired | Applied | nowadly2026 abstract: lot-matched terrestrial controls; all medications past their labeled expiry at analysis; epinephrine averaged 10% lower than controls, the clearest exception among eight medicines. |

Follow-ups not done here (outside these two files):
- `meds_build/build_meds.py` still contains the pre-correction text and rewrites `kb_meds.json` when run. Update it before running it again, or every correction above will be lost.
- After the corrections, promethazine (188 words) and antihistamines (156 words) are over the build script's 155-word limit.
- loperamide, laxatives and adrenaline-auto-injector have no linked condition until `kb_conditions.json` gains matching entries (for example diarrhoea, constipation or anaphylaxis).
