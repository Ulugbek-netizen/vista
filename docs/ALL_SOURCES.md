# All sources used by Void Voyagers

Every data source, reference, tool and licence the project uses. The library entries below are generated from the app itself (`void-voyagers.html`), so this list matches what the app cites.
The library cites 527 sources across 61 conditions and 58 medicines.

## Live NASA data in the app

- NASA DONKI space weather (solar-storm alerts), via NASA Open APIs: https://kauai.ccmc.gsfc.nasa.gov/DONKI/ and https://api.nasa.gov/
- NASA Harmonized Landsat and Sentinel-2 (HLS) imagery, delivered by Microsoft Planetary Computer: https://www.earthdata.nasa.gov/data/projects/hls and https://planetarycomputer.microsoft.com/
- NASA JPL Approximate Positions of the Planets (Standish), checked against JPL Horizons, for the Earth signal delay: https://ssd.jpl.nasa.gov/planets/approx_pos.html and https://ssd.jpl.nasa.gov/horizons/
- NASA Human Research Program hazards and risks: https://www.nasa.gov/hrp/hazards/ and https://www.nasa.gov/hrp/risks/
- NASA-STD-3001 crew health limits behind the verdicts: https://www.nasa.gov/wp-content/uploads/2023/11/nasa-std-3001-vol-1-rev-c-with-signature.pdf

## Other data, code and assets

- BodyParts3D, Database Center for Life Science (DBCLS), CC BY-SA 2.1 JP: the 3D anatomy model. https://lifesciencedb.jp/bp3d/
- three.js (MIT), esbuild (MIT), meshoptimizer/gltfpack (MIT), trimesh (MIT), scikit-image (BSD-3-Clause), fast-simplification (MIT): 3D viewer and model pipeline.
- Supabase (report inbox), Vercel and Azure Static Web Apps (hosting), GitHub (code, MIT licence).
- Fonts: Archivo and Martian Mono (app), Oswald and Inter (slides), all SIL Open Font License, via Google Fonts.
- Website design reference: "Earth Limb Landing" by Kedhareswer Naidu on 21st.dev (MIT): https://21st.dev/@kedhareswer/templates/satellite-imaging-landing-page
- PHQ-4 wellbeing questions: https://www.phqscreeners.com/
- AI assistance: Claude by Anthropic, for research, fact-checking, code, security testing and writing. No AI runs inside the app. See README.

## Library: Conditions (61)

### Space motion sickness
- NASA OCHMO-MTB-004 Rev A, 2025: https://www.nasa.gov/wp-content/uploads/2025/09/ochmo-mtb-004-space-adaptation-sickness-sas.pdf
- NASA OCHMO-TB-010 Rev A, 2023: https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-010-sensorimotor.pdf
- Wood, NASA slides, NTRS 20210025094: https://ntrs.nasa.gov/api/citations/20210025094/downloads/Wood-AeroMed%20UTHNeuro-Dec21.pdf

### Head-ward fluid shift (puffy face, stuffy nose, headache)
- NASA, Cardiovascular and Vision, 2025: https://www.nasa.gov/directorates/esdmd/hhp/cardiovascular-and-vision/
- NASA OCHMO-MTB-004 Rev A, 2025: https://www.nasa.gov/wp-content/uploads/2025/09/ochmo-mtb-004-space-adaptation-sickness-sas.pdf
- NASA station blog, Aug 2025: https://www.nasa.gov/blogs/spacestation/2025/08/27/head-and-eye-health-dragon-reboost-preps-and-emergency-drill-fill-crew-day/
- NASA OCHMO-TB-004 Rev D, 2026: https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-004-carbon-dioxide.pdf

### Spaceflight-associated neuro-ocular syndrome (SANS)
- NASA OCHMO-MTB-001, 2024: https://www.nasa.gov/wp-content/uploads/2024/02/ochmo-mtb-001-sans.pdf
- NASA, Risk of SANS, 2025: https://www.nasa.gov/reference/risk-of-spaceflight-associated-neuro-ocular-syndrome-sans/
- Brunstetter 2023, NTRS 20220014606: https://ntrs.nasa.gov/citations/20220014606
- AAO, Amsler grid, 2025: https://www.aao.org/eye-health/tips-prevention/facts-about-amsler-grid-daily-vision-test

### Bone loss
- NASA, Human Body in Space, 2026: https://www.nasa.gov/humans-in-space/the-human-body-in-space/
- NASA/SP-20250000273, 2025: https://ntrs.nasa.gov/citations/20250000273
- NASA OCHMO-MTB-013 Rev D, 2026: https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-030-bone-loss.pdf
- Sibonga 2007, Bone: https://doi.org/10.1016/j.bone.2007.08.022
- LeBlanc 2013, Osteoporos Int: https://doi.org/10.1007/s00198-012-2243-z

### Muscle and fitness loss
- NASA/SP-20250000273, 2025: https://ntrs.nasa.gov/citations/20250000273
- NASA OCHMO-TB-031, 2023: https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-031-exercise-overview.pdf
- Scott 2023, npj Microgravity: https://doi.org/10.1038/s41526-023-00256-5
- Richter 2017, Front Physiol: https://doi.org/10.3389/fphys.2017.00583
- NASA OCHMO-TB-033 Rev D, 2023: https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-033-spaceflight-experience-medical-care.pdf

### Back pain from spinal lengthening
- Kerstman 2012, Aviat Space Environ Med: https://doi.org/10.3357/asem.2876.2012
- Pool-Goudzwaard 2015, Aerosp Med Hum Perform: https://doi.org/10.3357/AMHP.4169.2015
- Young 2020, Appl Ergon: https://doi.org/10.1016/j.apergo.2019.102995
- Johnston 2010, Aviat Space Environ Med: https://doi.org/10.3357/asem.2427.2010
- NASA OCHMO-MTB-004 Rev A, 2025: https://www.nasa.gov/wp-content/uploads/2025/09/ochmo-mtb-004-space-adaptation-sickness-sas.pdf
- MedlinePlus, acute low back pain: https://medlineplus.gov/ency/article/007425.htm

### Kidney stones
- NASA OCHMO-MTB-003 Rev A, 2026: https://www.nasa.gov/wp-content/uploads/2025/01/ochmo-mtb-003-urinary-health.pdf
- NASA renal stone evidence report, 2017: https://ntrs.nasa.gov/api/citations/20170004709/downloads/20170004709.pdf
- Smith 2021, NASA nutrition book: https://www.nasa.gov/wp-content/uploads/2015/02/human_adaptation_2021_final.pdf

### Dehydration
- Smith 2021, NASA nutrition book: https://www.nasa.gov/wp-content/uploads/2015/02/human_adaptation_2021_final.pdf
- NASA OCHMO-TB-027 Rev C, 2023: https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-027-water.pdf
- McKenzie 2017, Ann Nutr Metab: https://doi.org/10.1159/000462999
- NASA OCHMO-MTB-004 Rev A, 2025: https://www.nasa.gov/wp-content/uploads/2025/09/ochmo-mtb-004-space-adaptation-sickness-sas.pdf

### Feeling faint after landing (orthostatic intolerance)
- NASA, Cardiovascular and Vision, 2025: https://www.nasa.gov/directorates/esdmd/hhp/cardiovascular-and-vision/
- Lee 2015, Aerosp Med Hum Perform: https://doi.org/10.3357/AMHP.EC08.2015
- NASA OCHMO-TB-033 Rev D, 2023: https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-033-spaceflight-experience-medical-care.pdf
- NASA OCHMO-TB-051, 2026: https://www.nasa.gov/wp-content/uploads/2026/05/ochmo-tb-051-crew-medical-support-entry-descent-landing.pdf
- NASA, Human Body in Space, 2026: https://www.nasa.gov/humans-in-space/the-human-body-in-space/
- ESA Mars Express blog, 2012: https://blogs.esa.int/mex/?p=257

### Sleep loss and body-clock misalignment
- Barger 2014, Lancet Neurol: https://doi.org/10.1016/S1474-4422%2814%2970122-X
- Flynn-Evans 2016, npj Microgravity: https://doi.org/10.1038/npjmgrav.2015.19
- NASA sleep risk page, 2025: https://www.nasa.gov/reference/risk-from-inadequate-sleep-and-irregular-schedules/
- NASA-STD-3001 Vol 1 Rev C: https://www.nasa.gov/wp-content/uploads/2023/11/nasa-std-3001-vol-1-rev-c-with-signature.pdf
- NASA behavioural evidence report, 2025: https://humanresearchroadmap.nasa.gov/evidence/reports/HRP-ER-BMED-HFBP-20250210.pdf
- Barger 2012, Sleep: https://doi.org/10.5665/sleep.2128

### Isolation, low mood and crew conflict
- NASA OCHMO-TB-016 Rev B, 2023: https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-016-behavioral-health.pdf
- NASA behavioural evidence report, 2025: https://humanresearchroadmap.nasa.gov/evidence/reports/HRP-ER-BMED-HFBP-20250210.pdf
- Basner 2014, PLoS One: https://doi.org/10.1371/journal.pone.0093298
- PHQ and GAD-7 instruction manual: https://www.phqscreeners.com/images/sites/g/files/g10016261/f/201412/instructions.pdf

### Fatigue and slowed reactions
- Jones 2022, Sleep: https://doi.org/10.1093/sleep/zsac006
- Barger 2012, Sleep: https://doi.org/10.5665/sleep.2128
- Basner 2011, Acta Astronaut: https://doi.org/10.1016/j.actaastro.2011.07.015
- NASA-STD-3001 Vol 1 Rev C: https://www.nasa.gov/wp-content/uploads/2023/11/nasa-std-3001-vol-1-rev-c-with-signature.pdf
- Rosekind 1995, J Sleep Res: https://doi.org/10.1111/j.1365-2869.1995.tb00229.x
- Flynn-Evans 2023, npj Microgravity: https://doi.org/10.1038/s41526-023-00332-w

### Radiation exposure and solar particle events
- NASA radiation hazard page, 2025: https://www.nasa.gov/hrp/hazard-space-radiation/
- NASA OCHMO-TB-020 Rev G, 2025: https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-020-radiation-protection.pdf
- NOAA SWPC, Solar Radiation Storm: https://www.spaceweather.gov/phenomena/solar-radiation-storm
- Zhang 2020, Sci Adv: https://doi.org/10.1126/sciadv.aaz1334
- NASA Space Radiation Analysis Group: https://srag.jsc.nasa.gov/spaceradiation/how/how.cfm

### High cabin carbon dioxide (CO₂)
- NASA OCHMO-TB-004 Rev D, 2026: https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-004-carbon-dioxide.pdf
- Law 2014, J Occup Environ Med: https://doi.org/10.1097/JOM.0000000000000158

### Skin rashes, dry skin and slow healing
- Crucian 2016, Int J Gen Med: https://doi.org/10.2147/IJGM.S114188
- Nguyen 2022, Life Sci Space Res: https://doi.org/10.1016/j.lssr.2022.10.004
- Henke 2025, Aerosp Med Hum Perform: https://doi.org/10.3357/AMHP.6713.2025
- NASA immune risk page, 2025: https://www.nasa.gov/reference/risk-of-altered-immune-system-responses/

### Immune changes and dormant-virus reactivation
- NASA immune risk page, 2025: https://www.nasa.gov/reference/risk-of-altered-immune-system-responses/
- Rooney 2019, Front Microbiol: https://doi.org/10.3389/fmicb.2019.00016
- Agha 2020, FASEB J: https://doi.org/10.1096/fj.201902327R
- Crucian 2016, Int J Gen Med: https://doi.org/10.2147/IJGM.S114188
- CDC, shingles symptoms, 2024: https://www.cdc.gov/shingles/signs-symptoms/index.html

### Blood clots in veins (jugular vein thrombosis)
- Marshall-Goebel 2019, JAMA Netw Open: https://doi.org/10.1001/jamanetworkopen.2019.15011
- Pavela 2022, Vasc Med: https://doi.org/10.1177/1358863X221086619
- NASA, Cardiovascular and Vision, 2025: https://www.nasa.gov/directorates/esdmd/hhp/cardiovascular-and-vision/
- CDC, blood clots, 2025: https://www.cdc.gov/blood-clots/about/index.html

### Eye injury from floating debris
- Suh 2025, npj Microgravity: https://doi.org/10.1038/s41526-025-00462-3
- NASA OCHMO-TB-033 Rev D, 2023: https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-033-spaceflight-experience-medical-care.pdf
- NASA OCHMO-TB-011 Rev C, 2023: https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-011-lunar-dust-technical-brief.pdf

### Decompression sickness (the bends)
- NASA OCHMO-TB-037 Rev D, 2026: https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-037-decompression-sickness.pdf

### Moon and Mars dust exposure
- NASA OCHMO-TB-011 Rev C, 2023: https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-011-lunar-dust-technical-brief.pdf
- Suh 2025, npj Microgravity: https://doi.org/10.1038/s41526-025-00462-3

### Nosebleed
- NASA-STD-3001 Vol 1 Rev C: https://www.nasa.gov/wp-content/uploads/2023/11/nasa-std-3001-vol-1-rev-c-with-signature.pdf
- Khan 2025, Laryngoscope Investig Otolaryngol: https://doi.org/10.1002/lio2.70229
- NHS, Nosebleed, 2023: https://www.nhs.uk/conditions/nosebleed/
- MedlinePlus, Ear barotrauma, 2026: https://medlineplus.gov/ency/article/001064.htm

### Cuts and abrasions
- Scheuring 2009, Aviat Space Environ Med: https://doi.org/10.3357/asem.2270.2009
- NASA-STD-3001 Vol 1 Rev C: https://www.nasa.gov/wp-content/uploads/2023/11/nasa-std-3001-vol-1-rev-c-with-signature.pdf
- NASA OCHMO-TB-051, 2026: https://www.nasa.gov/wp-content/uploads/2026/05/ochmo-tb-051-crew-medical-support-entry-descent-landing.pdf
- Nguyen 2022, Life Sci Space Res: https://doi.org/10.1016/j.lssr.2022.10.004
- Henke 2025, Aerosp Med Hum Perform: https://doi.org/10.3357/AMHP.6713.2025
- NHS, Cuts and grazes, 2026: https://www.nhs.uk/conditions/cuts-and-grazes/

### Burns
- NASA-STD-3001 Vol 1 Rev C: https://www.nasa.gov/wp-content/uploads/2023/11/nasa-std-3001-vol-1-rev-c-with-signature.pdf
- NASA OCHMO-TB-033 Rev D, 2023: https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-033-spaceflight-experience-medical-care.pdf
- NHS, Burns and scalds, 2026: https://www.nhs.uk/conditions/burns-and-scalds/
- MedlinePlus, Burns, 2026: https://medlineplus.gov/ency/article/000030.htm

### Spacesuit glove injuries and fingernail lifting
- Strauss 2005, Aviat Space Environ Med: https://pubmed.ncbi.nlm.nih.gov/15892545/
- Opperman 2010, Aviat Space Environ Med: https://doi.org/10.3357/asem.2810.2010
- Reid 2014, NASA glove injury study, NTRS: https://ntrs.nasa.gov/citations/20140014058
- Reid 2015, NASA glove sensing study, NTRS: https://ntrs.nasa.gov/citations/20150003474
- Scheuring 2009, Aviat Space Environ Med: https://doi.org/10.3357/asem.2270.2009
- NASA-STD-3001 Vol 1 Rev C: https://www.nasa.gov/wp-content/uploads/2023/11/nasa-std-3001-vol-1-rev-c-with-signature.pdf

### Shoulder injury
- Ward 2026, J Shoulder Elbow Surg: https://doi.org/10.1016/j.jse.2026.07.014
- Strauss 2005, Aviat Space Environ Med: https://pubmed.ncbi.nlm.nih.gov/15892545/
- NASA-STD-3001 Vol 1 Rev C: https://www.nasa.gov/wp-content/uploads/2023/11/nasa-std-3001-vol-1-rev-c-with-signature.pdf
- NHS, Shoulder pain, 2023: https://www.nhs.uk/conditions/shoulder-pain/

### Muscle strain and joint sprain
- NASA-STD-3001 Vol 1 Rev C: https://www.nasa.gov/wp-content/uploads/2023/11/nasa-std-3001-vol-1-rev-c-with-signature.pdf
- Scheuring 2009, Aviat Space Environ Med: https://doi.org/10.3357/asem.2270.2009
- NASA OCHMO-TB-051, 2026: https://www.nasa.gov/wp-content/uploads/2026/05/ochmo-tb-051-crew-medical-support-entry-descent-landing.pdf
- NHS, Sprains and strains, 2024: https://www.nhs.uk/conditions/sprains-and-strains/

### Broken bones (fractures)
- NASA OCHMO-MTB-013 Rev D, 2026: https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-030-bone-loss.pdf
- NASA OCHMO-TB-033 Rev D, 2023: https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-033-spaceflight-experience-medical-care.pdf
- NASA OCHMO-TB-051, 2026: https://www.nasa.gov/wp-content/uploads/2026/05/ochmo-tb-051-crew-medical-support-entry-descent-landing.pdf
- NASA-STD-3001 Vol 1 Rev C: https://www.nasa.gov/wp-content/uploads/2023/11/nasa-std-3001-vol-1-rev-c-with-signature.pdf
- MedlinePlus, Broken bone, 2026: https://medlineplus.gov/ency/article/000001.htm

### Head injury and concussion
- NASA-STD-3001 Vol 1 Rev C: https://www.nasa.gov/wp-content/uploads/2023/11/nasa-std-3001-vol-1-rev-c-with-signature.pdf
- NASA OCHMO-TB-033 Rev D, 2023: https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-033-spaceflight-experience-medical-care.pdf
- NASA OCHMO-TB-051, 2026: https://www.nasa.gov/wp-content/uploads/2026/05/ochmo-tb-051-crew-medical-support-entry-descent-landing.pdf
- Scheuring 2009, Aviat Space Environ Med: https://doi.org/10.3357/asem.2270.2009
- NHS, Head injury and concussion, 2025: https://www.nhs.uk/conditions/head-injury-and-concussion/
- CDC, Concussion signs and symptoms, 2025: https://www.cdc.gov/traumatic-brain-injury/signs-symptoms/index.html

### Dental problems
- Del Fabbro 2025, Aerosp Med Hum Perform: https://doi.org/10.3357/AMHP.6372.2025
- NASA OCHMO-TB-033 Rev D, 2023: https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-033-spaceflight-experience-medical-care.pdf
- NASA-STD-3001 Vol 1 Rev C: https://www.nasa.gov/wp-content/uploads/2023/11/nasa-std-3001-vol-1-rev-c-with-signature.pdf
- NHS, Toothache, 2024: https://www.nhs.uk/conditions/toothache/
- NHS, Dental abscess, 2026: https://www.nhs.uk/conditions/dental-abscess/

### Ear and sinus pressure injury (barotrauma)
- NASA-STD-3001 Vol 1 Rev C: https://www.nasa.gov/wp-content/uploads/2023/11/nasa-std-3001-vol-1-rev-c-with-signature.pdf
- Khan 2025, Laryngoscope Investig Otolaryngol: https://doi.org/10.1002/lio2.70229
- MedlinePlus, Ear barotrauma, 2026: https://medlineplus.gov/ency/article/001064.htm

### Chest pain
- NHS, Chest pain, reviewed 2023: https://www.nhs.uk/symptoms/chest-pain/
- NHS, Heart attack, reviewed 2026: https://www.nhs.uk/conditions/heart-attack/
- NASA-STD-3001 Vol 1 Rev C, Appendix E: https://www.nasa.gov/wp-content/uploads/2023/11/nasa-std-3001-vol-1-rev-c-with-signature.pdf
- NASA OCHMO-TB-033 Rev D, 2023: https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-033-spaceflight-experience-medical-care.pdf
- NASA OCHMO-TB-015 Rev B, Spaceflight Toxicology, 2023: https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-015-spaceflight-toxicology.pdf
- NASA ISS Emergency Medical Procedures (FOIA release), 2016: https://www.governmentattic.org/19docs/NASA-ISSmedicalEmergManual_2016.pdf

### Abnormal heart rhythm (including atrial fibrillation)
- Khine 2018, Circ Arrhythm Electrophysiol: https://doi.org/10.1161/CIRCEP.117.005959
- Ciaccio 2026, Heart Rhythm: https://doi.org/10.1016/j.hrthm.2026.10.065
- NHS, Atrial fibrillation, reviewed 2025: https://www.nhs.uk/conditions/atrial-fibrillation/
- NASA OCHMO-TB-015 Rev B, Spaceflight Toxicology, 2023: https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-015-spaceflight-toxicology.pdf

### High blood pressure
- NHS, High blood pressure, reviewed 2024: https://www.nhs.uk/conditions/high-blood-pressure/
- Norsk 2015, J Physiol: https://doi.org/10.1113/jphysiol.2014.284869
- PCNA, 2025 AHA/ACC guideline summary: https://pcna.net/news/putting-updated-blood-pressure-guidelines-into-practice/
- CDC, Measuring blood pressure: https://www.cdc.gov/high-blood-pressure/measure/index.html
- NASA-STD-3001 Vol 1 Rev C, Appendix E: https://www.nasa.gov/wp-content/uploads/2023/11/nasa-std-3001-vol-1-rev-c-with-signature.pdf
- NASA ISS Emergency Medical Procedures (FOIA release), 2016: https://www.governmentattic.org/19docs/NASA-ISSmedicalEmergManual_2016.pdf

### Fainting
- NHS, Fainting, reviewed 2026: https://www.nhs.uk/symptoms/fainting/
- NASA OCHMO-TB-019 Rev B, Orthostatic Intolerance, 2023: https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-019-orthostatic-intolerance.pdf
- Meck 2001, Psychosom Med: https://doi.org/10.1097/00006842-200111000-00003
- NASA OCHMO-TB-003 Rev A, Habitable Atmosphere, 2023: https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-003-habitable-atmosphere.pdf

### Anaphylaxis and severe allergic reaction
- NHS, Anaphylaxis, reviewed 2023: https://www.nhs.uk/conditions/anaphylaxis/
- NASA ISS Emergency Medical Procedures (FOIA release), 2016: https://www.governmentattic.org/19docs/NASA-ISSmedicalEmergManual_2016.pdf
- NASA-STD-3001 Vol 1 Rev C, Appendix E: https://www.nasa.gov/wp-content/uploads/2023/11/nasa-std-3001-vol-1-rev-c-with-signature.pdf
- Crucian 2016, Int J Gen Med: https://doi.org/10.2147/IJGM.S114188

### Asthma and wheeze
- NHS, Asthma (asthma attack section), reviewed 2025: https://www.nhs.uk/conditions/asthma/
- NASA OCHMO-TB-015 Rev B, Spaceflight Toxicology, 2023: https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-015-spaceflight-toxicology.pdf
- NASA ISS Emergency Medical Procedures (FOIA release), 2016: https://www.governmentattic.org/19docs/NASA-ISSmedicalEmergManual_2016.pdf
- NASA-STD-3001 Vol 1 Rev C, Appendix E: https://www.nasa.gov/wp-content/uploads/2023/11/nasa-std-3001-vol-1-rev-c-with-signature.pdf
- FDA, Pulse oximeter basics, 2025: https://www.fda.gov/consumers/consumer-updates/pulse-oximeter-basics

### Toxic air: ammonia, smoke and fire products
- NASA OCHMO-TB-015 Rev B, Spaceflight Toxicology, 2023: https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-015-spaceflight-toxicology.pdf
- NASA OCHMO-TB-008 Rev A, Fire Protection, 2023: https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-008-fire-protection.pdf
- NASA ISS Emergency Medical Procedures (FOIA release), 2016: https://www.governmentattic.org/19docs/NASA-ISSmedicalEmergManual_2016.pdf

### Low oxygen (hypoxia)
- NASA OCHMO-TB-003 Rev A, Habitable Atmosphere, 2023: https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-003-habitable-atmosphere.pdf
- FDA, Pulse oximeter basics, 2025: https://www.fda.gov/consumers/consumer-updates/pulse-oximeter-basics

### Choking
- NASA ISS Emergency Medical Procedures (FOIA release), 2016: https://www.governmentattic.org/19docs/NASA-ISSmedicalEmergManual_2016.pdf
- North East Ambulance Service NHS, Choking: https://www.neas.nhs.uk/community-learning/emergency-advice/choking
- NASA-STD-3001 Vol 1 Rev C, Appendix E: https://www.nasa.gov/wp-content/uploads/2023/11/nasa-std-3001-vol-1-rev-c-with-signature.pdf

### Colds and upper respiratory infections
- NHS, Common cold, reviewed 2024: https://www.nhs.uk/conditions/common-cold/
- NASA OCHMO-TB-006 Rev F, Health Stabilization Program, 2025: https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-006-health-stabilization-program.pdf
- Crucian 2016, Int J Gen Med: https://doi.org/10.2147/IJGM.S114188
- NASA OCHMO-TB-033 Rev D, 2023: https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-033-spaceflight-experience-medical-care.pdf

### Nausea and vomiting (not space sickness)
- NASA OCHMO-MTB-004 Rev A, 2025: https://www.nasa.gov/wp-content/uploads/2025/09/ochmo-mtb-004-space-adaptation-sickness-sas.pdf
- NASA OCHMO-TB-033 Rev D, 2023: https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-033-spaceflight-experience-medical-care.pdf
- NASA OCHMO-MTB-003 Rev A, 2026: https://www.nasa.gov/wp-content/uploads/2025/01/ochmo-mtb-003-urinary-health.pdf
- NASA OCHMO-TB-020 Rev G, 2025: https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-020-radiation-protection.pdf
- NASA OCHMO-TB-010 Rev A, 2023: https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-010-sensorimotor.pdf
- NHS, Diarrhoea and vomiting, 2023: https://www.nhs.uk/conditions/diarrhoea-and-vomiting/

### Diarrhoea
- NASA OCHMO-MTB-004 Rev A, 2025: https://www.nasa.gov/wp-content/uploads/2025/09/ochmo-mtb-004-space-adaptation-sickness-sas.pdf
- NASA OCHMO-TB-033 Rev D, 2023: https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-033-spaceflight-experience-medical-care.pdf
- Smith 2021, NASA nutrition book: https://www.nasa.gov/wp-content/uploads/2015/02/human_adaptation_2021_final.pdf
- Wotring 2016, AAPS J: https://doi.org/10.1208/s12248-015-9834-5
- NHS, Diarrhoea and vomiting, 2023: https://www.nhs.uk/conditions/diarrhoea-and-vomiting/
- NHS, Dehydration, 2026: https://www.nhs.uk/conditions/dehydration/

### Constipation
- NASA OCHMO-MTB-004 Rev A, 2025: https://www.nasa.gov/wp-content/uploads/2025/09/ochmo-mtb-004-space-adaptation-sickness-sas.pdf
- Smith 2021, NASA nutrition book: https://www.nasa.gov/wp-content/uploads/2015/02/human_adaptation_2021_final.pdf
- NHS, Constipation, 2023: https://www.nhs.uk/conditions/constipation/

### Heartburn and acid reflux
- NHS, Heartburn and acid reflux, 2023: https://www.nhs.uk/conditions/heartburn-and-acid-reflux/
- NHS, Heart attack, 2026: https://www.nhs.uk/conditions/heart-attack/
- Wotring 2015, FASEB J: https://doi.org/10.1096/fj.14-264838
- Smith 2021, NASA nutrition book: https://www.nasa.gov/wp-content/uploads/2015/02/human_adaptation_2021_final.pdf

### Belly pain and appendicitis
- NASA OCHMO-TB-033 Rev D, 2023: https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-033-spaceflight-experience-medical-care.pdf
- Kamine 2022, Aerosp Med Hum Perform: https://doi.org/10.3357/AMHP.6062.2022
- Miller 2021, Surg Innov: https://doi.org/10.1177/15533506211053210
- Reyes 2020, Surg Innov: https://doi.org/10.1177/1553350620979809
- NHS, Appendicitis, 2024: https://www.nhs.uk/conditions/appendicitis/

### Trouble passing urine (urinary retention)
- NASA OCHMO-MTB-003 Rev A, 2026: https://www.nasa.gov/wp-content/uploads/2025/01/ochmo-mtb-003-urinary-health.pdf
- Stepaniak 2007, Aviat Space Environ Med: https://pubmed.ncbi.nlm.nih.gov/17511293/
- NASA OCHMO-MTB-004 Rev A, 2025: https://www.nasa.gov/wp-content/uploads/2025/09/ochmo-mtb-004-space-adaptation-sickness-sas.pdf
- NASA OCHMO-TB-033 Rev D, 2023: https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-033-spaceflight-experience-medical-care.pdf
- NIDDK, Urinary retention symptoms: https://www.niddk.nih.gov/health-information/urologic-diseases/urinary-retention/symptoms-causes

### Urinary tract infection (UTI)
- NASA OCHMO-MTB-003 Rev A, 2026: https://www.nasa.gov/wp-content/uploads/2025/01/ochmo-mtb-003-urinary-health.pdf
- Crucian 2016, Int J Gen Med: https://doi.org/10.2147/IJGM.S114188
- NHS, Urinary tract infections, 2025: https://www.nhs.uk/conditions/urinary-tract-infections-utis/

### Space anaemia (red blood cell loss)
- Trudel 2022, Nat Med: https://doi.org/10.1038/s41591-021-01637-7
- Smith 2021, NASA nutrition book: https://www.nasa.gov/wp-content/uploads/2015/02/human_adaptation_2021_final.pdf
- NHS, Iron deficiency anaemia, 2024: https://www.nhs.uk/conditions/iron-deficiency-anaemia/

### Weight loss and under-eating
- Smith 2021, NASA nutrition book: https://www.nasa.gov/wp-content/uploads/2015/02/human_adaptation_2021_final.pdf
- NASA-STD-3001 Vol 1 Rev C: https://www.nasa.gov/wp-content/uploads/2023/11/nasa-std-3001-vol-1-rev-c-with-signature.pdf

### Periods and menstrual health
- Jain and Wotring 2016, npj Microgravity: https://doi.org/10.1038/npjmgrav.2016.8
- Smith 2021, NASA nutrition book: https://www.nasa.gov/wp-content/uploads/2015/02/human_adaptation_2021_final.pdf
- NASA OCHMO-TB-033 Rev D, 2023: https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-033-spaceflight-experience-medical-care.pdf
- NHS, Combined pill side effects, 2024: https://www.nhs.uk/contraception/methods-of-contraception/combined-pill/side-effects/
- NHS, Combined pill: sickness or diarrhoea, 2024: https://www.nhs.uk/contraception/methods-of-contraception/combined-pill/sickness-or-diarrhoea/
- CDC, blood clots, 2025: https://www.cdc.gov/blood-clots/about/index.html

### Low blood sugar (hypoglycaemia)
- NHS, Low blood sugar, 2023: https://www.nhs.uk/conditions/low-blood-sugar-hypoglycaemia/
- NIDDK, Low blood glucose: https://www.niddk.nih.gov/health-information/diabetes/overview/preventing-problems/low-blood-glucose-hypoglycemia
- Smith 2021, NASA nutrition book: https://www.nasa.gov/wp-content/uploads/2015/02/human_adaptation_2021_final.pdf

### Headache and migraine
- van Oosterhout 2024, Neurology: https://doi.org/10.1212/WNL.0000000000209224
- NASA OCHMO-TB-004 Rev D, 2026: https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-004-carbon-dioxide.pdf
- NHS, Headaches, 2024: https://www.nhs.uk/conditions/headaches/

### Anxiety and panic
- NASA OCHMO-TB-016 Rev B, 2023: https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-016-behavioral-health.pdf
- NASA behavioural evidence report, 2025: https://humanresearchroadmap.nasa.gov/evidence/reports/HRP-ER-BMED-HFBP-20250210.pdf
- PHQ and GAD-7 instruction manual: https://www.phqscreeners.com/images/sites/g/files/g10016261/f/201412/instructions.pdf
- NHS, Generalised anxiety symptoms, 2024: https://www.nhs.uk/mental-health/conditions/generalised-anxiety-disorder/symptoms/
- NHS, Panic disorder, 2023: https://www.nhs.uk/mental-health/conditions/panic-disorder/
- NASA OCHMO-TB-004 Rev D, 2026: https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-004-carbon-dioxide.pdf

### Depression
- NASA OCHMO-TB-016 Rev B, 2023: https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-016-behavioral-health.pdf
- NASA behavioural evidence report, 2025: https://humanresearchroadmap.nasa.gov/evidence/reports/HRP-ER-BMED-HFBP-20250210.pdf
- PHQ and GAD-7 instruction manual: https://www.phqscreeners.com/images/sites/g/files/g10016261/f/201412/instructions.pdf
- NHS, Depression symptoms, 2023: https://www.nhs.uk/mental-health/conditions/depression-in-adults/symptoms/

### Dizziness and disorientation after landing
- NASA OCHMO-TB-010 Rev A, 2023: https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-010-sensorimotor.pdf
- Wood, NASA slides, NTRS 20210025094: https://ntrs.nasa.gov/api/citations/20210025094/downloads/Wood-AeroMed%20UTHNeuro-Dec21.pdf
- NASA OCHMO-TB-051, 2026: https://www.nasa.gov/wp-content/uploads/2026/05/ochmo-tb-051-crew-medical-support-entry-descent-landing.pdf
- NHS, Headaches, 2024: https://www.nhs.uk/conditions/headaches/

### Hearing loss and noise
- Buckey 2001, Aviat Space Environ Med: https://pubmed.ncbi.nlm.nih.gov/11763114/
- NASA OCHMO-TB-035 Rev C, 2023: https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-035-acoustics.pdf
- Limardo 2021, NTRS 20210016305: https://ntrs.nasa.gov/api/citations/20210016305/downloads/Inter-Noise2021_Paper2219_FINAL%20Manuscript.pdf
- Antonsen, NASA slides, NTRS 20170009943: https://ntrs.nasa.gov/api/citations/20170009943/downloads/20170009943.pdf
- NHS, Hearing loss, 2025: https://www.nhs.uk/conditions/hearing-loss/

### Dry, irritated and infected eyes
- Ax 2023, Front Physiol: https://doi.org/10.3389/fphys.2023.1281327
- Meer 2023, npj Microgravity: https://doi.org/10.1038/s41526-023-00279-y
- NHS, Dry eyes, 2025: https://www.nhs.uk/conditions/dry-eyes/
- NHS, Conjunctivitis, 2024: https://www.nhs.uk/conditions/conjunctivitis/

### Cold sores and shingles
- Crucian 2016, Int J Gen Med: https://doi.org/10.2147/IJGM.S114188
- Rooney 2019, Front Microbiol: https://doi.org/10.3389/fmicb.2019.00016
- NHS, Cold sores, 2024: https://www.nhs.uk/conditions/cold-sores/
- CDC, shingles symptoms, 2024: https://www.cdc.gov/shingles/signs-symptoms/index.html

### Fungal skin infection
- Crucian 2016, Int J Gen Med: https://doi.org/10.2147/IJGM.S114188
- Sugita 2016, Med Mycol: https://doi.org/10.1093/mmy/myv121
- NHS, Athlete’s foot, 2024: https://www.nhs.uk/conditions/athletes-foot/
- NHS, Ringworm, 2023: https://www.nhs.uk/conditions/ringworm/

### Acute radiation sickness
- CDC, ARS for clinicians, 2024: https://www.cdc.gov/radiation-emergencies/hcp/clinical-guidance/ars.html
- NASA OCHMO-TB-020 Rev G, 2025: https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-020-radiation-protection.pdf
- NASA-STD-3001 Vol 1 Rev C: https://www.nasa.gov/wp-content/uploads/2023/11/nasa-std-3001-vol-1-rev-c-with-signature.pdf
- NASA Space Radiation Analysis Group: https://srag.jsc.nasa.gov/spaceradiation/how/how.cfm

### Radiation cataract
- Cucinotta 2001, Radiat Res: https://pubmed.ncbi.nlm.nih.gov/11604058/
- Chylack 2009, Radiat Res: https://doi.org/10.1667/RR1580.1
- NASA-STD-3001 Vol 1 Rev C: https://www.nasa.gov/wp-content/uploads/2023/11/nasa-std-3001-vol-1-rev-c-with-signature.pdf
- NHS, Cataracts, 2025: https://www.nhs.uk/conditions/cataracts/

## Library: Medicines (58)

### Promethazine
- Putcha 1999, Aviat Space Environ Med: https://pubmed.ncbi.nlm.nih.gov/10417009/
- Davis 1993, Aviat Space Environ Med: https://pubmed.ncbi.nlm.nih.gov/8447805/
- Davis 1993, Acta Astronaut: https://doi.org/10.1016/0094-5765(93)90074-7
- Jennings 1998, J Vestib Res: https://pubmed.ncbi.nlm.nih.gov/9416592/
- Bagian 1994, J Clin Pharmacol: https://doi.org/10.1002/j.1552-4604.1994.tb02019.x
- Reichard 2023, NASA HRP Evidence Report: Ineffective or Toxic Medication: https://ntrs.nasa.gov/citations/20230018496
- Du 2011, AAPS J: https://doi.org/10.1208/s12248-011-9270-0
- Nowadly 2026, Wilderness Environ Med: https://doi.org/10.1177/10806032261466966
- NASA OCHMO-TB-010, Sensorimotor: https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-010-sensorimotor.pdf
- NASA OCHMO-TB-033 Rev D, Spaceflight Experience and Medical Care: https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-033-spaceflight-experience-medical-care.pdf
- Ives 2024, NASA CSRM: medication impacts on EVA models (NTRS): https://ntrs.nasa.gov/citations/20240013840
- NASA ISS Emergency Medical Procedures Manual, 2015 pages (FOIA release, 2016): https://www.governmentattic.org/19docs/NASA-ISSmedicalEmergManual_2016.pdf

### Scopolamine (hyoscine)
- Davis 1993, Acta Astronaut: https://doi.org/10.1016/0094-5765(93)90074-7
- Weerts 2015, J Psychopharmacol: https://doi.org/10.1177/0269881115598414
- Weerts 2015, J Appl Physiol: https://doi.org/10.1152/japplphysiol.00149.2015
- Reichard 2023, NASA HRP Evidence Report: Ineffective or Toxic Medication: https://ntrs.nasa.gov/citations/20230018496
- Putcha 1989, Pharm Res: https://doi.org/10.1023/a:1015916423156
- Putcha 1996, J Pharm Sci: https://doi.org/10.1021/js950327b

### Meclizine
- NASA OCHMO-TB-033 Rev D, Spaceflight Experience and Medical Care: https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-033-spaceflight-experience-medical-care.pdf
- Jennings 1998, J Vestib Res: https://pubmed.ncbi.nlm.nih.gov/9416592/
- Reichard 2023, NASA HRP Evidence Report: Ineffective or Toxic Medication: https://ntrs.nasa.gov/citations/20230018496
- Ives 2024, NASA CSRM: medication impacts on EVA models (NTRS): https://ntrs.nasa.gov/citations/20240013840
- NASA ISS Emergency Medical Procedures Manual, 2015 pages (FOIA release, 2016): https://www.governmentattic.org/19docs/NASA-ISSmedicalEmergManual_2016.pdf
- NASA OCHMO-MTB-012 Rev B, Pharmaceutical Care, 2026: https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-006-pharmaceuticals.pdf

### Zolpidem
- Barger 2014, Lancet Neurol: https://doi.org/10.1016/S1474-4422%2814%2970122-X
- Dinges 2019, Sleep: https://doi.org/10.1093/sleep/zsy258
- Flynn-Evans 2016, npj Microgravity: https://doi.org/10.1038/npjmgrav.2015.19
- NASA HRP Evidence Report: Cognitive or Behavioral Conditions, 2025: https://humanresearchroadmap.nasa.gov/evidence/reports/HRP-ER-BMED-HFBP-20250210.pdf
- Blue 2019, npj Microgravity: https://doi.org/10.1038/s41526-019-0075-2
- Ives 2024, NASA CSRM: medication impacts on EVA models (NTRS): https://ntrs.nasa.gov/citations/20240013840
- NASA ISS Emergency Medical Procedures Manual, 2015 pages (FOIA release, 2016): https://www.governmentattic.org/19docs/NASA-ISSmedicalEmergManual_2016.pdf
- Wotring 2016, AAPS J: https://doi.org/10.1208/s12248-015-9834-5

### Zaleplon
- Barger 2014, Lancet Neurol: https://doi.org/10.1016/S1474-4422%2814%2970122-X
- Dinges 2019, Sleep: https://doi.org/10.1093/sleep/zsy258
- NASA HRP Evidence Report: Cognitive or Behavioral Conditions, 2025: https://humanresearchroadmap.nasa.gov/evidence/reports/HRP-ER-BMED-HFBP-20250210.pdf
- Ives 2024, NASA CSRM: medication impacts on EVA models (NTRS): https://ntrs.nasa.gov/citations/20240013840
- NASA ISS Emergency Medical Procedures Manual, 2015 pages (FOIA release, 2016): https://www.governmentattic.org/19docs/NASA-ISSmedicalEmergManual_2016.pdf
- NASA OCHMO-MTB-012 Rev B, Pharmaceutical Care, 2026: https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-006-pharmaceuticals.pdf

### Melatonin
- Dijk 2001, Am J Physiol Regul Integr Comp Physiol: https://doi.org/10.1152/ajpregu.2001.281.5.R1647
- Barger 2014, Lancet Neurol: https://doi.org/10.1016/S1474-4422%2814%2970122-X
- Wotring 2016, AAPS J: https://doi.org/10.1208/s12248-015-9834-5
- NASA ISS Emergency Medical Procedures Manual, 2015 pages (FOIA release, 2016): https://www.governmentattic.org/19docs/NASA-ISSmedicalEmergManual_2016.pdf

### Modafinil
- NASA OCHMO-TB-033 Rev D, Spaceflight Experience and Medical Care: https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-033-spaceflight-experience-medical-care.pdf
- NASA OCHMO-MTB-012 Rev B, Pharmaceutical Care, 2026: https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-006-pharmaceuticals.pdf
- Wotring 2015, FASEB J: https://doi.org/10.1096/fj.14-264838
- Blue 2019, npj Microgravity: https://doi.org/10.1038/s41526-019-0075-2
- Ives 2024, NASA CSRM: medication impacts on EVA models (NTRS): https://ntrs.nasa.gov/citations/20240013840
- NASA ISS Emergency Medical Procedures Manual, 2015 pages (FOIA release, 2016): https://www.governmentattic.org/19docs/NASA-ISSmedicalEmergManual_2016.pdf
- Wotring 2016, AAPS J: https://doi.org/10.1208/s12248-015-9834-5

### Ibuprofen
- Wotring 2015, FASEB J: https://doi.org/10.1096/fj.14-264838
- NASA OCHMO-MTB-012 Rev B, Pharmaceutical Care, 2026: https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-006-pharmaceuticals.pdf
- NASA OCHMO-TB-033 Rev D, Spaceflight Experience and Medical Care: https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-033-spaceflight-experience-medical-care.pdf
- Wotring 2016, AAPS J: https://doi.org/10.1208/s12248-015-9834-5
- Tran 2024, Adv Healthc Mater: https://doi.org/10.1002/adhm.202402361
- Ives 2024, NASA CSRM: medication impacts on EVA models (NTRS): https://ntrs.nasa.gov/citations/20240013840
- NASA ISS Emergency Medical Procedures Manual, 2015 pages (FOIA release, 2016): https://www.governmentattic.org/19docs/NASA-ISSmedicalEmergManual_2016.pdf

### Paracetamol (acetaminophen)
- Blue 2019, npj Microgravity: https://doi.org/10.1038/s41526-019-0075-2
- Wotring 2016, AAPS J: https://doi.org/10.1208/s12248-015-9834-5
- Reichard 2023, NASA HRP Evidence Report: Ineffective or Toxic Medication: https://ntrs.nasa.gov/citations/20230018496
- Ives 2024, NASA CSRM: medication impacts on EVA models (NTRS): https://ntrs.nasa.gov/citations/20240013840
- NASA ISS Emergency Medical Procedures Manual, 2015 pages (FOIA release, 2016): https://www.governmentattic.org/19docs/NASA-ISSmedicalEmergManual_2016.pdf
- NASA OCHMO-MTB-012 Rev B, Pharmaceutical Care, 2026: https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-006-pharmaceuticals.pdf

### Decongestants (pseudoephedrine tablets, oxymetazoline and saline sprays)
- NASA OCHMO-TB-033 Rev D, Spaceflight Experience and Medical Care: https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-033-spaceflight-experience-medical-care.pdf
- NASA OCHMO-MTB-012 Rev B, Pharmaceutical Care, 2026: https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-006-pharmaceuticals.pdf
- NASA OCHMO-TB-011 Rev C, Lunar Dust: https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-011-lunar-dust-technical-brief.pdf
- Wotring 2016, AAPS J: https://doi.org/10.1208/s12248-015-9834-5
- Ives 2024, NASA CSRM: medication impacts on EVA models (NTRS): https://ntrs.nasa.gov/citations/20240013840
- NASA ISS Emergency Medical Procedures Manual, 2015 pages (FOIA release, 2016): https://www.governmentattic.org/19docs/NASA-ISSmedicalEmergManual_2016.pdf

### Antihistamines (loratadine, fexofenadine, diphenhydramine)
- Crucian 2016, Int J Gen Med: https://doi.org/10.2147/IJGM.S114188
- Wotring 2016, AAPS J: https://doi.org/10.1208/s12248-015-9834-5
- Ives 2024, NASA CSRM: medication impacts on EVA models (NTRS): https://ntrs.nasa.gov/citations/20240013840
- NASA ISS Emergency Medical Procedures Manual, 2015 pages (FOIA release, 2016): https://www.governmentattic.org/19docs/NASA-ISSmedicalEmergManual_2016.pdf
- NASA OCHMO-MTB-012 Rev B, Pharmaceutical Care, 2026: https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-006-pharmaceuticals.pdf

### Steroid skin creams (hydrocortisone, fluocinonide, triamcinolone)
- Crucian 2016, Int J Gen Med: https://doi.org/10.2147/IJGM.S114188
- Wotring 2015, FASEB J: https://doi.org/10.1096/fj.14-264838
- Du 2011, AAPS J: https://doi.org/10.1208/s12248-011-9270-0
- Reichard 2023, NASA HRP Evidence Report: Ineffective or Toxic Medication: https://ntrs.nasa.gov/citations/20230018496
- NASA ISS Emergency Medical Procedures Manual, 2015 pages (FOIA release, 2016): https://www.governmentattic.org/19docs/NASA-ISSmedicalEmergManual_2016.pdf
- Ives 2024, NASA CSRM: medication impacts on EVA models (NTRS): https://ntrs.nasa.gov/citations/20240013840
- NASA OCHMO-MTB-012 Rev B, Pharmaceutical Care, 2026: https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-006-pharmaceuticals.pdf

### Loperamide
- NASA ISS Emergency Medical Procedures Manual, 2015 pages (FOIA release, 2016): https://www.governmentattic.org/19docs/NASA-ISSmedicalEmergManual_2016.pdf
- Ives 2024, NASA CSRM: medication impacts on EVA models (NTRS): https://ntrs.nasa.gov/citations/20240013840
- NASA OCHMO-MTB-012 Rev B, Pharmaceutical Care, 2026: https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-006-pharmaceuticals.pdf
- Wotring 2016, AAPS J: https://doi.org/10.1208/s12248-015-9834-5

### Laxatives (bisacodyl)
- NASA ISS Emergency Medical Procedures Manual, 2015 pages (FOIA release, 2016): https://www.governmentattic.org/19docs/NASA-ISSmedicalEmergManual_2016.pdf
- Ives 2024, NASA CSRM: medication impacts on EVA models (NTRS): https://ntrs.nasa.gov/citations/20240013840
- NASA OCHMO-MTB-012 Rev B, Pharmaceutical Care, 2026: https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-006-pharmaceuticals.pdf
- Blue 2019, npj Microgravity: https://doi.org/10.1038/s41526-019-0075-2
- Putcha 1999, Aviat Space Environ Med: https://pubmed.ncbi.nlm.nih.gov/10417009/

### Artificial tears and eye lubricants
- Ong 2025, Life Sci Space Res: https://doi.org/10.1016/j.lssr.2025.05.005
- NASA OCHMO-TB-011 Rev C, Lunar Dust: https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-011-lunar-dust-technical-brief.pdf
- NASA OCHMO-MTB-012 Rev B, Pharmaceutical Care, 2026: https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-006-pharmaceuticals.pdf
- NASA ISS Emergency Medical Procedures Manual, 2015 pages (FOIA release, 2016): https://www.governmentattic.org/19docs/NASA-ISSmedicalEmergManual_2016.pdf

### Alendronate
- LeBlanc 2013, Osteoporos Int: https://doi.org/10.1007/s00198-012-2243-z
- NASA OCHMO-MTB-013 Rev D, Bone Loss, 2026: https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-030-bone-loss.pdf
- NASA OCHMO-MTB-003 Rev A, Urinary Health: https://www.nasa.gov/wp-content/uploads/2025/01/ochmo-mtb-003-urinary-health.pdf

### Potassium citrate
- Whitson 2009, J Urol: https://doi.org/10.1016/j.juro.2009.07.010
- NASA HRP Evidence Report: Renal Stone Formation, 2017: https://ntrs.nasa.gov/api/citations/20170004709/downloads/20170004709.pdf
- Smith 2021, NASA Human Adaptation to Spaceflight: The Role of Food and Nutrition: https://www.nasa.gov/wp-content/uploads/2015/02/human_adaptation_2021_final.pdf
- NASA OCHMO-MTB-003 Rev A, Urinary Health: https://www.nasa.gov/wp-content/uploads/2025/01/ochmo-mtb-003-urinary-health.pdf

### Adrenaline (epinephrine) auto-injector
- NASA ISS Emergency Medical Procedures Manual, 2015 pages (FOIA release, 2016): https://www.governmentattic.org/19docs/NASA-ISSmedicalEmergManual_2016.pdf
- Ives 2024, NASA CSRM: medication impacts on EVA models (NTRS): https://ntrs.nasa.gov/citations/20240013840
- NASA OCHMO-MTB-012 Rev B, Pharmaceutical Care, 2026: https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-006-pharmaceuticals.pdf
- Crucian 2016, Int J Gen Med: https://doi.org/10.2147/IJGM.S114188
- Nowadly 2026, Wilderness Environ Med: https://doi.org/10.1177/10806032261466966

### Antibiotics
- Crucian 2016, Int J Gen Med: https://doi.org/10.2147/IJGM.S114188
- Du 2011, AAPS J: https://doi.org/10.1208/s12248-011-9270-0
- Wotring 2016, AAPS J: https://doi.org/10.1208/s12248-015-9834-5
- Blue 2019, npj Microgravity: https://doi.org/10.1038/s41526-019-0075-2
- NASA OCHMO-MTB-012 Rev B, Pharmaceutical Care, 2026: https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-006-pharmaceuticals.pdf
- Ives 2024, NASA CSRM: medication impacts on EVA models (NTRS): https://ntrs.nasa.gov/citations/20240013840
- NASA ISS Emergency Medical Procedures Manual, 2015 pages (FOIA release, 2016): https://www.governmentattic.org/19docs/NASA-ISSmedicalEmergManual_2016.pdf

### Aspirin
- NASA ISS Emergency Medical Procedures Manual, 2015 pages (FOIA release, 2016): https://www.governmentattic.org/19docs/NASA-ISSmedicalEmergManual_2016.pdf
- NASA OCHMO-MTB-012 Rev B, Pharmaceutical Care, 2026: https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-006-pharmaceuticals.pdf
- Wotring 2016, AAPS J: https://doi.org/10.1208/s12248-015-9834-5
- Blue 2019, npj Microgravity: https://doi.org/10.1038/s41526-019-0075-2
- Ives 2024, NASA CSRM: medication impacts on EVA models (NTRS): https://ntrs.nasa.gov/citations/20240013840
- FDA label (DailyMed): Bayer Genuine Aspirin, aspirin 325 mg, Drug Facts: https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=44a08904-68b9-4d06-a28d-21aae3d6140c

### Naproxen
- NASA ISS Emergency Medical Procedures Manual, 2015 pages (FOIA release, 2016): https://www.governmentattic.org/19docs/NASA-ISSmedicalEmergManual_2016.pdf
- NASA OCHMO-MTB-012 Rev B, Pharmaceutical Care, 2026: https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-006-pharmaceuticals.pdf
- FDA label (DailyMed): Aleve tablets (Blueshield), naproxen sodium 220 mg caplets, Drug Facts: https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=31bad2d9-c0bb-7f20-e063-6294a90acb17
- FDA label (DailyMed): Advil tablets, ibuprofen 200 mg, Drug Facts: https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=1a665e64-9f30-be37-4a83-38789f1f1e89

### Diclofenac gel
- UK SmPC (emc): Voltarol 1.16% Emulgel gel, sections 4.1-4.8: https://www.medicines.org.uk/emc/product/366/smpc
- Reichard 2023, NASA HRP Evidence Report: Ineffective or Toxic Medication: https://ntrs.nasa.gov/citations/20230018496
- NASA ISS Emergency Medical Procedures Manual, 2015 pages (FOIA release, 2016): https://www.governmentattic.org/19docs/NASA-ISSmedicalEmergManual_2016.pdf

### Ondansetron
- NASA ISS Emergency Medical Procedures Manual, 2015 pages (FOIA release, 2016): https://www.governmentattic.org/19docs/NASA-ISSmedicalEmergManual_2016.pdf
- NASA OCHMO-MTB-004, Space Adaptation Sickness and Space Readaptation: https://www.nasa.gov/wp-content/uploads/2025/09/ochmo-mtb-004-space-adaptation-sickness-sas.pdf
- NASA OCHMO-MTB-003 Rev A, Urinary Health: https://www.nasa.gov/wp-content/uploads/2025/01/ochmo-mtb-003-urinary-health.pdf
- NASA OCHMO-TB-051, Crew Medical Support for Entry, Descent and Landing, 2026: https://www.nasa.gov/wp-content/uploads/2026/05/ochmo-tb-051-crew-medical-support-entry-descent-landing.pdf
- Ives 2024, NASA CSRM: medication impacts on EVA models (NTRS): https://ntrs.nasa.gov/citations/20240013840
- FDA label (DailyMed): ondansetron tablets and orally disintegrating tablets (Glenmark), sections 1-5, 17: https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=eee5217a-eba8-463a-812d-bf3c66f0934f

### Famotidine
- Ives 2024, NASA CSRM: medication impacts on EVA models (NTRS): https://ntrs.nasa.gov/citations/20240013840
- NASA ISS Emergency Medical Procedures Manual, 2015 pages (FOIA release, 2016): https://www.governmentattic.org/19docs/NASA-ISSmedicalEmergManual_2016.pdf
- FDA label (DailyMed): Pepcid AC Maximum Strength, famotidine 20 mg, Drug Facts: https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=2854047f-c5c4-43c3-8ef2-5c0a84a307f2

### Omeprazole
- NASA ISS Emergency Medical Procedures Manual, 2015 pages (FOIA release, 2016): https://www.governmentattic.org/19docs/NASA-ISSmedicalEmergManual_2016.pdf
- Smith 2021, NASA Human Adaptation to Spaceflight: The Role of Food and Nutrition: https://www.nasa.gov/wp-content/uploads/2015/02/human_adaptation_2021_final.pdf
- FDA label (DailyMed): Prilosec OTC, omeprazole 20 mg, Drug Facts: https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=37291cab-e350-d8e3-e063-6294a90a9cb1

### Calcium carbonate antacid
- Smith 2021, NASA Human Adaptation to Spaceflight: The Role of Food and Nutrition: https://www.nasa.gov/wp-content/uploads/2015/02/human_adaptation_2021_final.pdf
- NASA ISS Emergency Medical Procedures Manual, 2015 pages (FOIA release, 2016): https://www.governmentattic.org/19docs/NASA-ISSmedicalEmergManual_2016.pdf
- FDA label (DailyMed): Tums Regular Strength, calcium carbonate 500 mg, Drug Facts: https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=ac80f627-3f51-425b-8c75-e07363048b00
- FDA label (DailyMed): Dulcolax stimulant laxative tablets, bisacodyl 5 mg, Drug Facts: https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=f1e4b28a-ed74-4eff-bd10-b2bfaf7483b0

### Simethicone
- NASA OCHMO-MTB-012 Rev B, Pharmaceutical Care, 2026: https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-006-pharmaceuticals.pdf
- Blue 2019, npj Microgravity: https://doi.org/10.1038/s41526-019-0075-2
- FDA label (DailyMed): Gas-X Extra Strength chewable, simethicone 125 mg, Drug Facts: https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=f553374b-c20e-4c92-a8c0-cef0aeda8d1c

### Docusate sodium
- NASA ISS Emergency Medical Procedures Manual, 2015 pages (FOIA release, 2016): https://www.governmentattic.org/19docs/NASA-ISSmedicalEmergManual_2016.pdf
- FDA label (DailyMed): Colace capsules, docusate sodium 100 mg, Drug Facts: https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=7793fced-e8ee-44e2-b212-dd2a59a5f462
- FDA label (DailyMed): Dulcolax stimulant laxative tablets, bisacodyl 5 mg, Drug Facts: https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=f1e4b28a-ed74-4eff-bd10-b2bfaf7483b0

### Oral rehydration salts
- UK SmPC (emc): Dioralyte Natural sachets, sections 4.1-4.9: https://www.medicines.org.uk/emc/product/2774/smpc
- NASA OCHMO-TB-051, Crew Medical Support for Entry, Descent and Landing, 2026: https://www.nasa.gov/wp-content/uploads/2026/05/ochmo-tb-051-crew-medical-support-entry-descent-landing.pdf
- Fortney 1994, Fluid-loading solutions and plasma volume: Astro-ade and salt tablets with water (NASA NTRS): https://ntrs.nasa.gov/citations/19940019071

### Cetirizine
- Zyrtec Allergy (cetirizine 10 mg) Drug Facts label, DailyMed, Oct 2025: https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=b165db38-b302-4220-8627-77cb07bb078c
- NASA OCHMO-MTB-012 Rev B, Pharmaceutical Care, 2026: https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-006-pharmaceuticals.pdf
- Crucian 2016, Int J Gen Med: https://doi.org/10.2147/IJGM.S114188

### Fexofenadine
- Allegra Allergy (fexofenadine 60 mg and 180 mg) Drug Facts label, DailyMed, Apr 2026: https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=81c1dcbb-28b3-4ad5-9f3d-9ccc16ddd173
- NASA ISS Emergency Medical Procedures Manual, 2015 pages (FOIA release, 2016): https://www.governmentattic.org/19docs/NASA-ISSmedicalEmergManual_2016.pdf
- NASA OCHMO-MTB-012 Rev B, Pharmaceutical Care, 2026: https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-006-pharmaceuticals.pdf
- Ives 2024, NASA CSRM: medication impacts on EVA models (NTRS): https://ntrs.nasa.gov/citations/20240013840
- Crucian 2016, Int J Gen Med: https://doi.org/10.2147/IJGM.S114188

### Fluticasone nasal spray
- Flonase Allergy Relief (fluticasone propionate 50 mcg) Drug Facts label, DailyMed, Dec 2024: https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=b6134ba0-b70a-4eac-9a82-cef64b242c1d
- Ives 2024, NASA CSRM: medication impacts on EVA models (NTRS): https://ntrs.nasa.gov/citations/20240013840
- NASA ISS Emergency Medical Procedures Manual, 2015 pages (FOIA release, 2016): https://www.governmentattic.org/19docs/NASA-ISSmedicalEmergManual_2016.pdf
- NASA OCHMO-TB-033 Rev D, Spaceflight Experience and Medical Care: https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-033-spaceflight-experience-medical-care.pdf

### Saline (salt-water) nasal spray
- Saline Nasal Spray (sodium chloride 0.65%, CVS) Drug Facts label, DailyMed, Aug 2026: https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=f02c41b0-c78e-41cd-aa4a-2756bbe92087
- NASA ISS Emergency Medical Procedures Manual, 2015 pages (FOIA release, 2016): https://www.governmentattic.org/19docs/NASA-ISSmedicalEmergManual_2016.pdf
- NASA OCHMO-MTB-012 Rev B, Pharmaceutical Care, 2026: https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-006-pharmaceuticals.pdf
- Ives 2024, NASA CSRM: medication impacts on EVA models (NTRS): https://ntrs.nasa.gov/citations/20240013840
- NASA OCHMO-TB-033 Rev D, Spaceflight Experience and Medical Care: https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-033-spaceflight-experience-medical-care.pdf

### Salbutamol (albuterol) inhaler
- Proventil HFA (albuterol sulfate) prescribing information, DailyMed, Oct 2019: https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=f454947c-6055-474b-bf35-29a379e01aa3
- NASA ISS Emergency Medical Procedures Manual, 2015 pages (FOIA release, 2016): https://www.governmentattic.org/19docs/NASA-ISSmedicalEmergManual_2016.pdf
- NASA OCHMO-MTB-012 Rev B, Pharmaceutical Care, 2026: https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-006-pharmaceuticals.pdf
- Ives 2024, NASA CSRM: medication impacts on EVA models (NTRS): https://ntrs.nasa.gov/citations/20240013840

### Prednisone
- Prednisone tablets USP (Mylan) prescribing information, DailyMed, Sep 2026: https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=fec09050-5ac2-451b-a2b9-5a21b2def212
- NASA ISS Emergency Medical Procedures Manual, 2015 pages (FOIA release, 2016): https://www.governmentattic.org/19docs/NASA-ISSmedicalEmergManual_2016.pdf
- NASA OCHMO-MTB-012 Rev B, Pharmaceutical Care, 2026: https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-006-pharmaceuticals.pdf
- Crucian 2016, Int J Gen Med: https://doi.org/10.2147/IJGM.S114188

### Clotrimazole cream
- Lotrimin AF (clotrimazole 1% cream) Drug Facts label, DailyMed, Dec 2025: https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=da948ef3-3709-4bfc-9d17-f6f1ea325343
- NASA ISS Emergency Medical Procedures Manual, 2015 pages (FOIA release, 2016): https://www.governmentattic.org/19docs/NASA-ISSmedicalEmergManual_2016.pdf
- NASA OCHMO-MTB-012 Rev B, Pharmaceutical Care, 2026: https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-006-pharmaceuticals.pdf
- Du 2011, AAPS J: https://doi.org/10.1208/s12248-011-9270-0
- Reichard 2023, NASA HRP Evidence Report: Ineffective or Toxic Medication: https://ntrs.nasa.gov/citations/20230018496
- Ives 2024, NASA CSRM: medication impacts on EVA models (NTRS): https://ntrs.nasa.gov/citations/20240013840

### Mupirocin ointment
- Mupirocin ointment 2% (Glenmark) prescribing information, DailyMed, Oct 2025: https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=ff7428fb-9ce9-4743-b58c-01a05424a57a
- NASA ISS Emergency Medical Procedures Manual, 2015 pages (FOIA release, 2016): https://www.governmentattic.org/19docs/NASA-ISSmedicalEmergManual_2016.pdf
- NASA OCHMO-MTB-012 Rev B, Pharmaceutical Care, 2026: https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-006-pharmaceuticals.pdf
- Ives 2024, NASA CSRM: medication impacts on EVA models (NTRS): https://ntrs.nasa.gov/citations/20240013840
- Du 2011, AAPS J: https://doi.org/10.1208/s12248-011-9270-0
- Reichard 2023, NASA HRP Evidence Report: Ineffective or Toxic Medication: https://ntrs.nasa.gov/citations/20230018496
- Crucian 2016, Int J Gen Med: https://doi.org/10.2147/IJGM.S114188

### Tetracaine eye drops
- Tetracaine hydrochloride ophthalmic solution 0.5% (Bausch & Lomb) prescribing information, DailyMed, Feb 2026: https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=f12d5944-0d6c-43ff-89fd-e0b5669e9b4a
- NASA ISS Emergency Medical Procedures Manual, 2015 pages (FOIA release, 2016): https://www.governmentattic.org/19docs/NASA-ISSmedicalEmergManual_2016.pdf
- NASA OCHMO-MTB-012 Rev B, Pharmaceutical Care, 2026: https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-006-pharmaceuticals.pdf
- Ives 2024, NASA CSRM: medication impacts on EVA models (NTRS): https://ntrs.nasa.gov/citations/20240013840
- Ong 2025, Life Sci Space Res: https://doi.org/10.1016/j.lssr.2025.05.005

### Ciprofloxacin eye drops
- Ciprofloxacin ophthalmic solution 0.3% (Sandoz; made by Alcon) prescribing information, DailyMed, Nov 2024: https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=ec3a3dcf-b9c9-432e-adfe-4b30cade8931
- NASA OCHMO-MTB-012 Rev B, Pharmaceutical Care, 2026: https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-006-pharmaceuticals.pdf
- Du 2011, AAPS J: https://doi.org/10.1208/s12248-011-9270-0
- NASA ISS Emergency Medical Procedures Manual, 2015 pages (FOIA release, 2016): https://www.governmentattic.org/19docs/NASA-ISSmedicalEmergManual_2016.pdf

### Amoxicillin-clavulanate (co-amoxiclav)
- DailyMed: amoxicillin and clavulanate potassium tablets (Aurobindo), label revised 09/2026: https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=ffb158a1-83ba-4100-9221-175aa986dc3e
- Du 2011, AAPS J: https://doi.org/10.1208/s12248-011-9270-0
- Reichard 2023, NASA HRP Evidence Report: Ineffective or Toxic Medication: https://ntrs.nasa.gov/citations/20230018496
- NASA OCHMO-MTB-012 Rev B, Pharmaceutical Care, 2026: https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-006-pharmaceuticals.pdf
- NASA ISS Emergency Medical Procedures Manual, 2015 pages (FOIA release, 2016): https://www.governmentattic.org/19docs/NASA-ISSmedicalEmergManual_2016.pdf

### Azithromycin
- DailyMed: ZITHROMAX (azithromycin) tablets (Pfizer), label revised 7/2026: https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=db52b91e-79f7-4cc1-9564-f2eee8e31c45
- Reichard 2023, NASA HRP Evidence Report: Ineffective or Toxic Medication: https://ntrs.nasa.gov/citations/20230018496
- NASA OCHMO-MTB-012 Rev B, Pharmaceutical Care, 2026: https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-006-pharmaceuticals.pdf
- NASA ISS Emergency Medical Procedures Manual, 2015 pages (FOIA release, 2016): https://www.governmentattic.org/19docs/NASA-ISSmedicalEmergManual_2016.pdf

### Ciprofloxacin tablets
- DailyMed: CIPRO (ciprofloxacin) tablets (Bayer), label effective 03/2026: https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=888dc7f9-ad9c-4c00-8d50-8ddfd9bd27c0
- Du 2011, AAPS J: https://doi.org/10.1208/s12248-011-9270-0
- NASA OCHMO-MTB-012 Rev B, Pharmaceutical Care, 2026: https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-006-pharmaceuticals.pdf
- NASA ISS Emergency Medical Procedures Manual, 2015 pages (FOIA release, 2016): https://www.governmentattic.org/19docs/NASA-ISSmedicalEmergManual_2016.pdf

### Doxycycline
- DailyMed: doxycycline hyclate capsules and tablets (Chartwell), label Rev. 09/2025: https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=3e7cf78f-3b48-4614-9fa4-c6d1e0c05a35
- NASA OCHMO-MTB-012 Rev B, Pharmaceutical Care, 2026: https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-006-pharmaceuticals.pdf
- NASA ISS Emergency Medical Procedures Manual, 2015 pages (FOIA release, 2016): https://www.governmentattic.org/19docs/NASA-ISSmedicalEmergManual_2016.pdf

### Nitrofurantoin
- DailyMed: MACROBID (nitrofurantoin) capsules (Almatica), label Rev. 02/2025: https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=8f270a9f-12a1-44d4-bc7e-873613555801
- Crucian 2016, Int J Gen Med: https://doi.org/10.2147/IJGM.S114188
- NASA OCHMO-MTB-003 Rev A, Urinary Health: https://www.nasa.gov/wp-content/uploads/2025/01/ochmo-mtb-003-urinary-health.pdf

### Metronidazole
- DailyMed: FLAGYL (metronidazole) 375 capsules (Pfizer), label revised 07/2025: https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a2883ca1-5a9a-4259-9d80-46ab67274384
- Du 2011, AAPS J: https://doi.org/10.1208/s12248-011-9270-0
- Reichard 2023, NASA HRP Evidence Report: Ineffective or Toxic Medication: https://ntrs.nasa.gov/citations/20230018496
- NASA OCHMO-MTB-012 Rev B, Pharmaceutical Care, 2026: https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-006-pharmaceuticals.pdf
- NASA ISS Emergency Medical Procedures Manual, 2015 pages (FOIA release, 2016): https://www.governmentattic.org/19docs/NASA-ISSmedicalEmergManual_2016.pdf

### Valaciclovir
- DailyMed: VALTREX (valacyclovir) tablets (GSK), label revised November 2025: https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=f8e0d8f8-cb73-4206-a484-88f5c4fbd719
- Reichard 2023, NASA HRP Evidence Report: Ineffective or Toxic Medication: https://ntrs.nasa.gov/citations/20230018496
- Crucian 2016, Int J Gen Med: https://doi.org/10.2147/IJGM.S114188
- NASA ISS Emergency Medical Procedures Manual, 2015 pages (FOIA release, 2016): https://www.governmentattic.org/19docs/NASA-ISSmedicalEmergManual_2016.pdf

### Tamsulosin
- DailyMed: tamsulosin hydrochloride capsules (Synthon), label revised 02/2025: https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=13a5032d-0be1-4001-916e-459f0b1a051d
- NASA OCHMO-MTB-003 Rev A, Urinary Health: https://www.nasa.gov/wp-content/uploads/2025/01/ochmo-mtb-003-urinary-health.pdf
- NASA ISS Emergency Medical Procedures Manual, 2015 pages (FOIA release, 2016): https://www.governmentattic.org/19docs/NASA-ISSmedicalEmergManual_2016.pdf

### Glyceryl trinitrate (nitroglycerin)
- DailyMed: NITROSTAT (nitroglycerin) sublingual tablets (Viatris), label revised 2/2023: https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=9a52da75-d0af-4237-96c0-0b12adfa8636
- DailyMed: NITROLINGUAL PUMPSPRAY (nitroglycerin) lingual spray, label revised 05/2024: https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=d19b5f51-ca85-48d6-9ccd-8ae26249cdc3
- NASA OCHMO-MTB-012 Rev B, Pharmaceutical Care, 2026: https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-006-pharmaceuticals.pdf
- NASA ISS Emergency Medical Procedures Manual, 2015 pages (FOIA release, 2016): https://www.governmentattic.org/19docs/NASA-ISSmedicalEmergManual_2016.pdf

### Metoprolol
- DailyMed: TOPROL-XL (metoprolol succinate) extended-release tablets, label effective 03/2026: https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=496ddfaa-7c9c-4888-b747-a210249b367a
- DailyMed: LOPRESSOR (metoprolol tartrate) tablets, label revised 11/2025: https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=b5f4fed2-369c-4808-a682-8a5b8cfdbb4f
- NASA OCHMO-MTB-012 Rev B, Pharmaceutical Care, 2026: https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-006-pharmaceuticals.pdf
- NASA ISS Emergency Medical Procedures Manual, 2015 pages (FOIA release, 2016): https://www.governmentattic.org/19docs/NASA-ISSmedicalEmergManual_2016.pdf

### Potassium iodide (KI)
- FDA label (DailyMed): ThyroSafe potassium iodide 65 mg tablets, BTG, Aug 2026: https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=47762f8f-30e2-445d-aaa1-e04479f8dd5b
- NASA radiation hazard page, 2025: https://www.nasa.gov/hrp/hazard-space-radiation/

### Filgrastim (G-CSF)
- FDA label (DailyMed): Neupogen (filgrastim) injection, Amgen, Jul 2026: https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=97cc73cc-b5b7-458a-a933-77b00523e193
- Sanzari 2015, Life Sci Space Res: https://doi.org/10.1016/j.lssr.2015.03.002

### Ketamine
- FDA label (DailyMed): Ketalar (ketamine) injection, Par, Mar 2026: https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=14e8f864-8b8a-4e7e-8439-e510d3107063
- NASA ISS Emergency Medical Procedures Manual, 2015 pages (FOIA release, 2016): https://www.governmentattic.org/19docs/NASA-ISSmedicalEmergManual_2016.pdf
- Komorowski 2013, Aviat Space Environ Med: https://doi.org/10.3357/asem.3427.2013
- Kutz 2025, Aerosp Med Hum Perform: https://doi.org/10.3357/AMHP.6619.2025
- Nowadly 2026, Wilderness Environ Med: https://doi.org/10.1177/10806032261466966

### Morphine
- FDA label (DailyMed): Morphine Sulfate Injection, Fresenius Kabi, Aug 2026: https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=1f53de80-efc8-4930-b3e3-fba0d026af05
- NASA OCHMO-MTB-012 Rev B, Pharmaceutical Care, 2026: https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-006-pharmaceuticals.pdf
- NASA ISS Emergency Medical Procedures Manual, 2015 pages (FOIA release, 2016): https://www.governmentattic.org/19docs/NASA-ISSmedicalEmergManual_2016.pdf
- Reichard 2023, NASA HRP Evidence Report: Ineffective or Toxic Medication: https://ntrs.nasa.gov/citations/20230018496

### Lorazepam
- FDA label (DailyMed): Ativan (lorazepam) tablets, Bausch Health, Jul 2025: https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=89057c93-8155-4040-acec-64e877bd2b4c
- NASA ISS Emergency Medical Procedures Manual, 2015 pages (FOIA release, 2016): https://www.governmentattic.org/19docs/NASA-ISSmedicalEmergManual_2016.pdf
- NASA HRP Evidence Report: Cognitive or Behavioral Conditions, 2025: https://humanresearchroadmap.nasa.gov/evidence/reports/HRP-ER-BMED-HFBP-20250210.pdf
- Ives 2024, NASA CSRM: medication impacts on EVA models (NTRS): https://ntrs.nasa.gov/citations/20240013840

### Sertraline
- FDA label (DailyMed): Zoloft (sertraline) tablets, Viatris, Aug 2023: https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=fda754f6-d0f3-4dce-a17a-927d64f912f7
- NASA ISS Emergency Medical Procedures Manual, 2015 pages (FOIA release, 2016): https://www.governmentattic.org/19docs/NASA-ISSmedicalEmergManual_2016.pdf
- Reichard 2023, NASA HRP Evidence Report: Ineffective or Toxic Medication: https://ntrs.nasa.gov/citations/20230018496
- NASA HRP Evidence Report: Cognitive or Behavioral Conditions, 2025: https://humanresearchroadmap.nasa.gov/evidence/reports/HRP-ER-BMED-HFBP-20250210.pdf

### Caffeine tablets
- FDA OTC label (DailyMed): Vivarin caffeine 200 mg tablets, Vespyr Brands, May 2026: https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=4537a56b-e875-4961-9fff-3f778746f126
- NASA ISS Emergency Medical Procedures Manual, 2015 pages (FOIA release, 2016): https://www.governmentattic.org/19docs/NASA-ISSmedicalEmergManual_2016.pdf
- NASA OCHMO-MTB-004 Rev A, 2025: https://www.nasa.gov/wp-content/uploads/2025/09/ochmo-mtb-004-space-adaptation-sickness-sas.pdf
- Nowadly 2026, Wilderness Environ Med: https://doi.org/10.1177/10806032261466966

### Atropine
- FDA label (DailyMed): Atropine Sulfate Injection, Fresenius Kabi, Oct 2024: https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=310c8a74-ea24-4357-8099-81e394b1634e
- NASA ISS Emergency Medical Procedures Manual, 2015 pages (FOIA release, 2016): https://www.governmentattic.org/19docs/NASA-ISSmedicalEmergManual_2016.pdf
- NASA OCHMO-MTB-012 Rev B, Pharmaceutical Care, 2026: https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-006-pharmaceuticals.pdf
- Reichard 2023, NASA HRP Evidence Report: Ineffective or Toxic Medication: https://ntrs.nasa.gov/citations/20230018496

### Lidocaine injection
- FDA label (DailyMed): Xylocaine (lidocaine HCl) injection, Fresenius Kabi, Apr 2025: https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=4dd52202-8eef-4136-92dd-ada573b7cf74
- NASA ISS Emergency Medical Procedures Manual, 2015 pages (FOIA release, 2016): https://www.governmentattic.org/19docs/NASA-ISSmedicalEmergManual_2016.pdf
- NASA OCHMO-MTB-012 Rev B, Pharmaceutical Care, 2026: https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-006-pharmaceuticals.pdf
- Nowadly 2026, Wilderness Environ Med: https://doi.org/10.1177/10806032261466966

