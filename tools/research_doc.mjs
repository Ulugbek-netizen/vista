// Vista research documentation generator. Run from the repo root: npm install docx@9.15.4 && node tools/research_doc.mjs [out.docx] [out.txt] (default out: docs/Vista-Research-Documentation.docx; then open it in Word and update the contents table to fill in page numbers).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  AlignmentType, BorderStyle, Document, ExternalHyperlink, Footer, Header, HeadingLevel, LevelFormat, Packer, PageBreak,
  PageNumber, Paragraph, PositionalTab, PositionalTabAlignment, PositionalTabLeader, PositionalTabRelativeTo, ShadingType,
  Table, TableCell, TableLayoutType, TableOfContents, TableRow, TextRun, VerticalAlign, WidthType,
} from 'docx';

const here = path.dirname(fileURLToPath(import.meta.url));
const OUT = process.argv[2] || path.join(here, '..', 'docs', 'Vista-Research-Documentation.docx');
const TXT = process.argv[3] || null;

/* ---------- look ---------- */
const FONT = 'Arial', MONO = 'Consolas';
const C = {
  ink: '1A1F1C', muted: '4A5A52', h1: '0B3D2E', h2: '0F6B4B', accent: '14B873', head: '0B3D2E', zebra: 'F3F7F5',
  border: 'C9D3CE', box: 'EEF6F1', boxLine: '9FCFB5', warn: 'FFF6E0', warnLine: 'E3C26B', link: '0B5FA5',
};
const LEVEL = {
  N: {word: 'Nominal', text: '1B7A4A', fill: '35C987'}, W: {word: 'Watch', text: '8A6100', fill: 'F2B938'},
  A: {word: 'Act', text: 'B4501C', fill: 'FF8A4A'}, U: {word: 'Urgent', text: 'C1272F', fill: 'FF5B66'},
  X: {word: 'No data', text: '4A5A52', fill: '6E8278'},
};
const PAGE_W = 11906, MARGIN = 1440, WIDTH = PAGE_W - 2 * MARGIN; // A4, 2.54 cm margins: 9026 twips of text width
const BODY = 21, SMALL = 17, CAPTION = 18;

/* ---------- inline markup: **bold**, __italic__, `code`, [[url]], [label|url], {N}{W}{A}{U}{X} level words, ^{superscript}, ₂ subscript ---------- */
const TOKEN = /\*\*(.+?)\*\*|__(.+?)__|`(.+?)`|\[\[(.+?)\]\]|\[([^\]|]+)\|([^\]]+)\]|\{([NWAUX])\}|\^\{(.+?)\}/g;
function parse(str) {
  const out = []; let last = 0, m;
  TOKEN.lastIndex = 0;
  while ((m = TOKEN.exec(str))) {
    if (m.index > last) out.push({t: str.slice(last, m.index)});
    if (m[1] != null) out.push({t: m[1], bold: true});
    else if (m[2] != null) out.push({t: m[2], italics: true});
    else if (m[3] != null) out.push({t: m[3], code: true});
    else if (m[4] != null) out.push({t: m[4], url: m[4]});
    else if (m[5] != null) out.push({t: m[5], url: m[6]});
    else if (m[7] != null) out.push({t: LEVEL[m[7]].word, level: m[7]});
    else out.push({t: m[8], sup: true});
    last = TOKEN.lastIndex;
  }
  if (last < str.length) out.push({t: str.slice(last)});
  return out;
}
function runs(str, base = {}) {
  const kids = [];
  for (const seg of parse(str)) {
    const opts = {font: seg.code ? MONO : FONT, size: base.size || BODY, color: base.color || C.ink, bold: base.bold || seg.bold || !!seg.level, italics: base.italics || seg.italics};
    if (seg.level) opts.color = LEVEL[seg.level].text;
    if (seg.sup) opts.superScript = true;
    if (base.highlight) opts.highlight = base.highlight;
    const parts = seg.t.split(/(₂)/).filter(s => s !== '');
    const textRuns = parts.map(s => s === '₂' ? new TextRun({...opts, text: '2', subScript: true}) : new TextRun({...opts, text: s}));
    if (seg.url) kids.push(new ExternalHyperlink({link: seg.url, children: parts.map(s => new TextRun({...opts, color: C.link, underline: {}, text: s === '₂' ? '2' : s, subScript: s === '₂'}))}));
    else kids.push(...textRuns);
  }
  return kids;
}
const plain = str => parse(str).map(s => s.url && s.t !== s.url ? `${s.t} <${s.url}>` : s.sup ? `^(${s.t})` : s.t).join('');

/* ---------- content model ---------- */
const DOC = [];
const H1 = text => DOC.push({k: 'h1', text});
const H2 = text => DOC.push({k: 'h2', text});
const P = (text, o = {}) => DOC.push({k: 'p', text, ...o});
const UL = items => DOC.push({k: 'ul', items});
const OL = items => DOC.push({k: 'ol', items});
const EQ = text => DOC.push({k: 'eq', text});
const BOX = (lines, o = {}) => DOC.push({k: 'box', lines, ...o});
const BREAK = () => DOC.push({k: 'break'});
let tableNo = 0;
const TABLE = (caption, widths, head, rows, o = {}) => { tableNo++; DOC.push({k: 'table', caption: `Table ${tableNo}. ${caption}`, widths, head, rows, ...o}); return tableNo; };

/* ===================================================================================================================
   DOCUMENT TEXT. Sources: README.md, vista.html, docs/evidence/*.md, supabase/reports.sql, tools/anatomy.py and the
   developer's notes on the features added on 14 November 2026. Design choices are labelled as such.
   =================================================================================================================== */

/* ---------- 1 Summary ---------- */
H1('1 Summary');
P('Vista gives astronauts a clear view of their own health, far from Earth. A crew member logs a reading in under a minute and gets a plain-language verdict with a colour, a shape and a word. The app then says exactly what to do: look after yourself, tell your crew medical officer, or call the flight surgeon. The advice changes with the mission: a low-Earth-orbit station, a Moon base, the cruise to Mars or a Mars base, where a reply from Earth can take 44 minutes.');
P('Vista covers 15 checks that a crew member can do alone, from resting heart rate and blood pressure to a 3-minute reaction test, an Amsler grid and the radiation dosimeter. Each reading is placed in one of four levels: Nominal, Watch, Act and Urgent. Thresholds come from clinical early-warning ranges (NEWS2, AHA/ACC 2025, ADA 2026, AASM/SRS) and NASA limits (NASA-STD-3001). Where no fixed number exists, Vista compares the reading with the crew member’s own baseline. Red-flag symptoms raise the level. Rules that no source prescribes are marked **design choice** in this document and need flight-surgeon sign-off.');
P('The research behind the thresholds is kept in six evidence files. Independent verifiers then re-checked the claims against their sources: of 332 items checked, 307 were confirmed, 22 corrected and 3 marked unsupported (Section 8.2).');
P('Three features are new in this version: **Mission link**, which shows today’s distance from Earth and the signal delay for the selected environment; a **Status-colour view** of the body map; and the **Privacy Charter**, six commitments on how data is handled.');
P('Vista is one HTML file with no dependencies and works offline. It keeps readings on the device, sets no cookies and sends data only when the user presses one of three buttons. It is a research and training prototype, not a medical device.');

/* ---------- 2 The problem ---------- */
H1('2 The problem');
P('Spaceflight changes the body fast, and the further a crew travels, the longer it waits for help. Crews must notice, judge and act on their own health. Vista gives them a simple, trustworthy routine for that.');
H2('2.1 How spaceflight changes the body');
UL([
  'About 2 litres of fluid shift towards the head in weightlessness, and the shift lasts for the whole flight (NASA, Cardiovascular and Vision).',
  'Blood plasma volume stays 10–15% below its pre-flight value on long missions (Smith et al. 2021, NASA nutrition book).',
  'Weight-bearing bone loses on average 1–1.5% of its mineral density a month (NASA, The Human Body in Space). With today’s ISS exercise devices the average is about 0.5–1% a month (NASA/SP-20250000273).',
  'Most crews sleep about 6 hours a night: 6.09 hours on average by wrist actigraphy on ISS missions (Barger et al. 2014), against the 7 hours or more recommended for adults (Watson et al. 2015).',
  'Radiation exposure rises two to six times beyond low Earth orbit (README). The daily rates in Table 2 are not strictly comparable: the station figure is effective dose, while the Moon, transit and Mars figures are dose equivalent measured behind light shielding.',
  'Healthy values shift in flight. Resting core temperature rose about 1 °C over the first months (Stahn et al. 2017), and 24-hour blood pressure ran about 8/9 mmHg lower (Norsk et al. 2015). Earth ranges must therefore be read against a personal in-flight baseline.',
]);
H2('2.2 NASA’s five hazards');
P('NASA’s Human Research Program sorts the health threats of spaceflight into five hazards, summarised as RIDGE: space Radiation, Isolation and confinement, Distance from Earth, Gravity fields, and hostile, closed Environments (NASA HRP; NASA, The Human Body in Space). Vista links each body system on its map to the hazards that affect it, and the Guide lists the checks in which each hazard shows up (Table 1). The link from systems to hazards is the team’s own mapping (**design choice**): NASA publishes no table that maps every risk to a hazard (framework.md, caveats).');
TABLE('NASA’s five hazards as Vista presents them (HZ and SYS in vista.html)', [1750, 4076, 3200], ['Hazard', 'What it means (Vista’s wording)', 'Shows up in these checks'], [
  ['**R** · Space radiation', 'Cosmic rays and solar storms raise long-term cancer, heart and nervous-system risk; a large solar event can cause radiation sickness.', 'Heart rate, blood pressure, temperature, sleep, mood, wellbeing, reaction time, radiation'],
  ['**I** · Isolation & confinement', 'Months in a small space with the same few people: sleep, mood, teamwork and alertness can suffer.', 'Temperature, sleep, mood, wellbeing, reaction time'],
  ['**D** · Distance from Earth', 'Signal delay and no quick ride home mean the crew must spot and handle problems on its own.', 'Sleep, mood, wellbeing, reaction time, fluids, body mass, glucose'],
  ['**G** · Gravity fields', 'Weightlessness shifts fluid to the head and unloads bone and muscle; Moon (0.165 g) and Mars (0.38 g) only partly help. Changing gravity upsets balance.', 'Heart rate, blood pressure, vision, fluids, exercise, body mass, glucose'],
  ['**E** · Hostile, closed environment', 'Recycled air and water, CO₂, noise, microbes and dust in a sealed habitat.', 'SpO₂, cabin CO₂, temperature, fluids, body mass, glucose'],
]);
H2('2.3 Distance from help and signal delay');
P('Help gets further away with every step from Earth. NASA’s design reference missions give evacuation to Earth as 1 day or less from low Earth orbit, 3–11 days from the Moon and the full mission duration for Mars, where medical evacuation is not possible (Antonsen et al. 2023). Even from the station a return takes time: when a Crew-11 astronaut had a medical event on 7 January 2026, the crew splashed down on 15 January, 8 days later, in a planned early return (NASA, Crew-11 update).');
P('Signals travel at the speed of light. The Earth–Mars distance varies from 54.6 to 401.4 million km, so a message takes about 3 to 22 minutes each way (NSSDC Mars Fact Sheet; light time derived in framework.md), and a question and its answer are up to about 44 minutes apart. About every 26 months the Sun sits between Earth and Mars; NASA’s example crewed trajectories lose direct communication for about 13 to 21 days (NASA, Mars Communications Disruption and Delay).');
P('On the ISS the programme trains two crew medical officers per increment. They are astronauts (prior medical experience is preferred but not required) who act as an extension of the ground flight surgeons, who are on call 24 hours a day (NASA OCHMO-TB-044). Each crew member also has a private medical conference with the flight surgeon once a week and a private psychological conference every 2 weeks (NASA podcast Ep. 377; Beven 2017). For exploration, NASA plans to move medical decisions progressively from the ground to the crew and calls onboard clinical decision support the cornerstone of Earth-independent care (Levin et al. 2023). Vista is not such a system, but it works on the same gap at the level of daily self-checks.');
TABLE('Mission environments in Vista (ENVS in vista.html)', [1300, 1250, 1150, 1250, 1676, 1200, 1200],
  ['Environment', 'Gravity', 'Signal delay', 'Ride home', 'Day and night', 'Radiation (mSv/day)', 'Typical dosimeter (mGy/day)'], [
  ['Low-Earth-orbit station', '0 g (weightless)', 'Under 1 s', 'About 1 day', '16 sunrises a day (90-minute orbit)', '0.2–0.5 (effective dose)', '0.3'],
  ['Lunar surface base', '0.165 g', '1.3 s each way', '3–11 days', 'About 14.8 Earth days of light, then 14.8 of dark', 'About 1.4', '0.32'],
  ['Mars transit', '0 g (weightless)', '3–22 min each way', 'None until the mission ends', 'Ship time (24 h)', 'About 1.8', '0.48'],
  ['Mars surface base', '0.38 g', '3–22 min each way', 'None until the mission ends', 'Sol of 24 h 39 min 35 s', 'About 0.64', '0.21'],
], {note: 'The Moon, transit and Mars rates are dose equivalent measured behind light shielding (China’s Chang’e-4 lander and NASA’s Curiosity rover), so they run high for a shielded habitat; NASA’s design ceilings are 1.3 mSv/day in free space and 0.9 on a surface (NASA-STD-3001 Vol. 1 Rev C). A dosimeter shows absorbed dose in mGy, so Vista compares readings with the absorbed-dose baselines in the last column, never with the mSv figures. Sources: Shavers et al. 2024; Zhang et al. 2020; Zeitlin et al. 2013; Hassler et al. 2014; ride home from Antonsen et al. 2023; gravity and day length from the NSSDC fact sheets.'});

/* ---------- 3 What Vista does ---------- */
H1('3 What Vista does');
P('Vista is a single web page with five views: Home, Today, Trends, Guide and the Privacy Charter. The Today view holds the daily routine and most of the features in Table 3. Everything the crew member logs stays in the browser on the device. The Guide is generated from the same definitions the rules use, so the instructions and source notes a crew member reads cannot drift from the thresholds the app applies.');
TABLE('Vista features (new in this version: Mission link, Status-colour view, Privacy Charter)', [2050, 6976], ['Feature', 'What it does'], [
  ['15 self-checks', 'Resting heart rate, blood pressure, SpO₂, cabin CO₂, temperature, sleep, mood, the PHQ-4 wellbeing screen, a 3-minute psychomotor vigilance test (PVT-B, playable in the app), near vision with an Amsler grid, fluids, exercise, body mass, finger-stick glucose and the radiation dosimeter. Each has step-by-step instructions written for people with no medical training (Section 4.2).'],
  ['Four levels', 'Nominal, Watch, Act and Urgent, each with its own colour, icon shape and word (Section 4.1).'],
  ['Escalation ladder', 'Four steps from “look after yourself” to “emergency: act now”, worded for the signal delay of each environment (Section 4.3).'],
  ['Findings & what to do', 'Every check at Watch or above, plus findings that combine checks, sorted by level with the step to take (Section 4.4).'],
  ['Mission environment', 'A selector for LEO station, Moon base, Mars transit and Mars base. It changes the escalation wording, the radiation baseline, the bone model and Mission link, and the status banner shows the gravity, signal delay and ride home.'],
  ['**Mission link (new)**', 'A Today-screen panel that shows, for the selected environment, today’s distance from Earth and the one-way and round-trip signal delay at the speed of light, with a small orbit map (Section 4.6).'],
  ['Anatomical body map', 'A front-view adult figure drawn to real body proportions in natural tissue colours. Each body system is outlined in its current status colour and glows when it needs attention. Tapping a system shows what it does, how spaceflight affects it, which of NASA’s five hazards apply and its latest readings (Table 4; Section 7).'],
  ['**Status-colour view (new)**', 'A toggle on the body map between “Anatomy” (natural tissue colours with a status outline and glow) and “Status colours” (every organ filled with its system’s status colour: green Nominal, amber Watch, orange Act, red Urgent, grey no data), for reading at a glance under stress. Words and icons stay beside every colour.'],
  ['Bones & muscles', 'A bone-density estimate for hip, pelvis, lumbar spine, thigh and shin from launch to one year after landing, drawn against NASA’s bone limits, with a table of the astronaut studies it uses (Section 4.5).'],
  ['Trends', 'Charts over 7, 14 or 30 days with status zones, reference lines (baseline or target), keyboard-readable values and a data table.'],
  ['Daily routine', 'A checklist of the checks due today, with streaks, XP, levels and badges. A reading earns 10 XP and a complete daily routine 25 XP; a new level comes every 300 XP.'],
  ['Window to Earth', 'For isolation and wellbeing: the latest clear NASA satellite view (Harmonized Landsat and Sentinel-2) of a place that matters to the crew member (Section 5).'],
  ['Space weather', 'Solar energetic particle events, coronal mass ejections and geomagnetic storms from NASA DONKI over the last 30 days, shown next to the radiation dose. The radiation panel also estimates mission dose against NASA’s 600 mSv career limit (Section 10).'],
  ['Flight-surgeon inbox', '“Send report to flight surgeon” shows exactly what will be sent (current readings, findings, mission environment, optional callsign), then delivers it to the team’s Supabase inbox, which is insert-only for the public key (Section 6).'],
  ['Guide', 'Plain-language help: the four levels, when to call for help, why to check yourself, the five hazards, bone health, mission environments, how to measure each check and where its ranges come from, three items from ESA’s Space Heritage archive, and all sources.'],
  ['Crew profile & data', 'Pre-flight body mass, sex (sets the fluid minimum), mission start date and length (7–1,200 days) and the bone medication plan set by the flight surgeon; backup download, restore and delete.'],
  ['**Privacy Charter (new name)**', 'The privacy page, renamed. It opens with six commitments on how data is handled (Section 6.1).'],
  ['Example data', 'A made-up 42-day station mission to explore the app. “Start my own log” removes it.'],
]);
TABLE('Body systems on the map, their checks and hazards (SYS in vista.html)', [2150, 3776, 3100], ['Body system', 'Checks that set its status', 'Hazards'], [
  ['Brain & behaviour', 'Sleep, mood, PHQ-4, reaction test', 'Isolation, Distance, Radiation'],
  ['Eyes', 'Near vision & Amsler grid', 'Gravity'],
  ['Heart & circulation', 'Resting heart rate, blood pressure', 'Gravity, Radiation'],
  ['Lungs & cabin air', 'SpO₂, cabin CO₂', 'Environment'],
  ['Immune system', 'Body temperature', 'Isolation, Environment, Radiation'],
  ['Metabolism & kidneys', 'Blood glucose, fluids, body mass', 'Environment, Gravity, Distance'],
  ['Bones & muscles', 'Exercise, body mass, and the bone-density estimate', 'Gravity'],
  ['Radiation exposure', 'Radiation dose', 'Radiation'],
], {note: 'A system takes the worst current level of its checks. “No data” is shown when none of its checks has a current reading.'});

/* ---------- 4 Methods ---------- */
H1('4 Methods');
H2('4.1 Four levels and decision rules');
P('Every reading is placed in one of four levels. A check or body system with no current reading shows “No data”, never Nominal; the flight-surgeon inbox stores such a report with an empty level for the same reason (supabase/reports.sql).');
TABLE('The four levels (LV and STEP in vista.html; wording from the Guide)', [1250, 1450, 3626, 2700], ['Level', 'Icon shape', 'What the crew member is told', 'Step shown with it'], [
  [{text: '**Nominal**', fill: LEVEL.N.fill}, 'Circle with a tick', 'Inside the healthy range for you and this mission. Keep your routine.', 'Keep up your routine.'],
  [{text: '**Watch**', fill: LEVEL.W.fill}, 'Diamond with an exclamation mark', 'A little outside your normal. Look after yourself, re-check, and mention it at your next private medical conference.', 'Look after yourself and re-check. Mention it at your next private medical conference.'],
  [{text: '**Act**', fill: LEVEL.A.fill}, 'Triangle with an exclamation mark', 'Needs attention today. Follow the steps shown and tell your crew medical officer.', 'Tell your crew medical officer today, plus the wording for the environment (Table 8).'],
  [{text: '**Urgent**', fill: LEVEL.U.fill}, 'Octagon with an exclamation mark', 'Possible emergency. Alert your crewmates, start the onboard emergency procedure and contact the flight surgeon on the priority channel.', 'Emergency: alert your crewmates and start the onboard emergency procedure now, plus the wording for the environment (Table 8).'],
  [{text: '**No data**', fill: LEVEL.X.fill}, 'Dashed circle', 'No current reading.', 'None.'],
], {note: 'Every level has a word and a shape as well as a colour, so it reads the same on any screen, in any light and with colour-blindness.'});
P('**How the bands were built.** Where the NEWS2 early-warning score covers a measurement, its per-parameter score maps to the levels (0 Nominal, 1 Watch, 2 Act, 3 Urgent), and the band is then cross-checked against the guideline that owns the measurement (clinical-thresholds.md). Vista uses NEWS2 this way for heart rate, SpO₂ and temperature, and adapts its low blood-pressure bands. It does not compute a NEWS2 score. Other bands come from the 2025 AHA/ACC blood-pressure guideline, the ADA Standards of Care 2026 (glucose), the AASM/SRS consensus (sleep), the PHQ-4 (wellbeing), GLIM (body mass), NASA-STD-3001 and NASA’s nutrition requirements (cabin CO₂, fluids, exercise, bone) and measured spaceflight data (radiation, reaction test). The source of each band is in Table 6.');
P('**Decision rules.** Each check has its own classifier in vista.html. The rules it applies are:');
OL([
  '**Absolute thresholds** from the sources named for each check (Table 6).',
  '**Personal baseline.** For heart rate the baseline is the median of the first 7 readings, and for the reaction test the median of the first 3 tests, once 3 earlier readings exist. Mood is compared with the crew member’s 14-day average. Fluids and body mass use the crew profile (pre-flight body mass and sex).',
  '**Confirmation by repeat.** Some levels need a second reading. A second systolic pressure of 90 mmHg or less within 24 hours, a second CO₂ reading above 4.5 mmHg within 3 hours and a second temperature of 39.4 °C or more within 6 hours each give Urgent. A second pressure of 140/90 mmHg or more within 24 hours, and a second night under 6 hours, give Act. The time windows are **design choices**; the evidence files only ask for one repeat after correct preparation.',
  '**Red flags.** Each check lists symptoms the crew member can tick (Table 7). A ticked red flag raises the level to the flag’s own level, which is Urgent unless stated. A symptom outranks a normal-looking number, and the message then never calls the reading normal. Some symptoms count only with an abnormal value, following AHA/ACC, ADA and FDA guidance: back pain or a change in vision only with a blood pressure above 180/120 mmHg, a racing pulse only with SpO₂ of 95% or less, and vomiting only with glucose of 200 mg/dL or more or below 70 mg/dL.',
  '**Validity window.** A reading counts as current for twice its cadence, and at least 2 days; an as-needed glucose reading counts for 30 days. Older readings stay in the history but no longer set a status (**design choice**).',
  '**Roll-up.** A body system takes the worst current level of its checks; Bones & muscles also includes the bone-density estimate. The banner shows the worst finding overall with the step for its level.',
]);
H2('4.2 The 15 checks');
P('Table 6 summarises each check as vista.html defines it. The full step-by-step instructions are in the app’s Guide under How to measure, next to the source of each range. Bands with no published cut-off are marked **design choice**.');
TABLE('The 15 checks (IND in vista.html)', [1300, 2150, 820, 2756, 2000], ['Check', 'How it is measured', 'How often', 'What each level means', 'Main source'], [
  ['Resting heart rate (bpm)', 'On waking, after 10 minutes lying still. Wrist pulse for 60 s (or 30 s twice) or a wearable; note whether the beat is regular.', 'Daily, morning', '{N} 51–90 (41–50 if the baseline is 52 or lower)\n{W} 41–50 or 91–110; 40 or lower within 5 bpm of a documented low baseline\n{A} 111–130\n{U} 40 or lower, or 131 or higher', 'NEWS2 pulse bands. In-flight 24-hour heart rate is unchanged (Norsk 2015), so a rising resting rate is a signal.'],
  ['Blood pressure (mmHg)', 'No food, caffeine or exercise for 30 min; empty bladder; rest 5 min, restrained; cuff on the bare upper arm at heart level; no talking; two readings 1–2 min apart, log the second.', 'Weekly', '{N} systolic 101–119 and diastolic below 80\n{W} 120–139 or 80–89; systolic 91–100; a first reading of 140/90 or more\n{A} 140/90 or more twice within 24 h; above 180/120; a first systolic of 90 or less\n{U} systolic 220 or more; 90 or less twice within 24 h', 'AHA/ACC 2025 categories. Low bands adapted from NEWS2 and set one level lower for the in-flight baseline (Norsk 2015: about 8/9 mmHg lower in flight).'],
  ['Oxygen saturation, SpO₂ (%)', 'Warm, relaxed hand, no nail polish; clip the oximeter on a fingertip and stay still; log the value once steady (about 30 s). Re-check after a cabin-atmosphere alarm or breathlessness.', 'Weekly', '{N} 96–100\n{W} 94–95\n{A} 92–93\n{U} 91 or less', 'NEWS2 SpO₂ scale 1, assuming a sea-level-equivalent cabin; re-baseline in a reduced-pressure atmosphere. No in-flight SpO₂ norm was found.'],
  ['Cabin CO₂ (mmHg)', 'Read the 1-hour average CO₂ partial pressure on the habitat display or a portable monitor, where you work and sleep.', 'Daily, any time', '{N} 2.5 or less\n{W} above 2.5 to 3.0\n{A} above 3.0\n{U} above 4.5 twice within 3 h', 'NASA-STD-3001 limit of 3 mmHg (1-hour average); a 7-day average under 2.5 mmHg keeps headache risk below 1% (Law 2014). Act and Urgent bands: **design choice**.'],
  ['Body temperature (°C, mouth)', 'Wait 20–30 min after eating or drinking and 1 h after hard exercise; probe under the tongue until it beeps; always the same site (ear reads 0.3–0.6 °C higher).', 'Weekly', '{N} 36.1–37.5\n{W} 35.1–36.0 or 37.6–37.9\n{A} 38.0–40.5\n{U} 35.0 or less; 40.6 or more; 39.4 or more twice within 6 h', 'NEWS2, CDC and MedlinePlus fever levels. Resting core temperature rises about 1 °C in flight (Stahn 2017): compare with the in-flight baseline.'],
  ['Sleep (h)', 'Each morning: time asleep from sleep and wake times (or a wrist actigraph), minus time awake in the night.', 'Daily, morning', '{N} 7 or more\n{W} 5.0–6.9 (6.0–6.9 after a short night)\n{A} under 5; under 6 for a second night in a row; 7-day average under 6 (Section 4.4)\n{U} red flag only', 'AASM/SRS: 7 h or more (Watson 2015). ISS crews average about 6 h (Barger 2014); under 6 h slows reactions (Jones 2022). Two-night and 7-day rules: **design choice**.'],
  ['Mood (0–10)', 'Each evening at the same time: overall mood today, from 0 (very low) to 10 (excellent).', 'Daily, evening', '{N} within your usual range\n{W} 2 or more points below your 14-day average (once 5 ratings exist), or 3 or less before then\n{A} and {U} red flags only', 'No validated cut-off exists for a single mood rating. The 2-point rule is a **design choice** with no published basis; a run of low days prompts the validated PHQ-4.'],
  ['Wellbeing check, PHQ-4 (0–12)', 'In private, thinking about the last 2 weeks: four questions, then a separate safety question.', 'Every 2 weeks', '{N} 0–2\n{W} 3–5\n{A} 6–12, or 3 or more on either pair of questions\n{U} “yes” to the safety question', 'PHQ-4 (Kroenke 2009; public domain). The safety question is Vista’s addition: the PHQ-4 has no self-harm item.'],
  ['Reaction test, PVT-B (ms)', 'A 3-minute test in the app: tap or press Space when the counter appears; same device every time; the first 3 tests taken rested set the baseline.', 'Every 4 days', '{N} within the personal band\n{W} more than 10% slower than baseline, or more than 2 extra lapses\n{A} out of band again, or after a night under 6 h', 'PVT-B (Basner 2011): 3 minutes; a lapse is 355 ms or more; score from mean response speed. Band: **design choice** (no validated individual cut-off).'],
  ['Near vision & Amsler grid (lines)', 'Usual reading glasses, good light. Near-vision card at about 40 cm, one eye at a time; Amsler grid at 30–38 cm, looking for wavy, blurred, dark or missing areas.', 'Weekly', '{N} same line as before flight\n{W} 1 line worse\n{A} 2 or more lines worse, or any new Amsler distortion (same-day review)\n{U} red flags', 'NASA SANS brief: about 60% of long-duration crew report worse near vision; eye exams at flight days 30 and 90 and 30 days before return. Weekly self-check and line rules: **design choice**.'],
  ['Fluid intake (L)', 'Count every drink bag and the water added to rehydrated food; log the day’s total. Target: 32 mL per kg of pre-flight mass, at least 2.5 L (men) or 2.1 L (women).', 'Daily, evening', '{N} target met\n{W} below target (stronger advice under 80% two days running)\n{A} and {U} red flags only', 'NASA exploration nutrition requirements (JSC-67378). ISS crews average only 2.0–2.3 L. The 80% and two-day rules: **design choice**.'],
  ['Exercise (min)', 'Add up active resistive and aerobic minutes for the day, not set-up time; log 0 on a rest day.', 'Daily, evening', '{N} about 600 min or more over the last 7 days (pro-rated in the first week)\n{W} 70–99% of that\n{A} under 70%', 'ISS prescription of about 2 h a day, 6 days a week; about 600 min a week (Scott 2023). NASA requires strength and aerobic capacity of 80% of baseline or more. Weekly thresholds: **design choice**.'],
  ['Body mass (kg)', 'Same mass-measuring device every time (it measures mass by spring or acceleration, not weight); same time of day and clothing; three readings, log the average.', 'Weekly', '{N} within 3% of pre-flight\n{W} 3–4.9% lost\n{A} 5% or more lost (10% or more is severe)\n{U} red flag', 'GLIM: 5% is significant and 10% severe (Cederholm 2019). Crews lose about 3–4% in the first 30 days, then stabilise (Zwart 2014). The 3% line: **design choice**.'],
  ['Blood glucose (mg/dL)', 'Finger-stick meter: wash and dry the fingertip, prick its side, touch the drop to the strip; note whether you ate in the last 8 hours.', 'As needed', 'Fasting: {N} 70–99, {W} 100–125, {A} 126 or more\nAfter food: {N} 70–139, {W} 140–199, {A} 200 or more\nAny time: {A} 54–69 (15–15 rule), {U} below 54', 'ADA Standards of Care 2026 (written for plasma glucose and people with diabetes); 15–15 rule for lows. The 140–199 band after food is borrowed from the 2-hour tolerance-test range: **design choice**.'],
  ['Radiation dose today (mGy)', 'Read today’s absorbed dose on the personal dosimeter (for example the Crew Active Dosimeter). If the radiation alarm sounds, shelter first.', 'Daily, evening', '{N} up to 1.5 × the typical daily dose for the environment\n{W} above 1.5 ×\n{A} above 10 × (possibly a solar particle event)\n{U} alarm, shelter order or symptoms', 'Absorbed-dose baselines (Table 2): Shavers 2024, Zhang 2020, Zeitlin 2013, Hassler 2014. The 1.5× and 10× rules: **design choice**; the onboard alarm always wins.'],
], {size: 16, note: 'Levels as computed by the classifiers in vista.html and confirmed by sweeping each one across its range. “Red flag” means a ticked symptom from Table 7.'});
TABLE('Red-flag symptoms by check (flags in IND)', [1400, 3726, 2000, 1900], ['Check', 'Raise the level to Urgent', 'Raise the level to Act', 'Count only with an abnormal value'], [
  ['Resting heart rate', 'Chest pain; fainting or nearly fainting; severe breathlessness; new confusion', 'New irregular pulse', ''],
  ['Blood pressure', 'Chest pain; shortness of breath; numbness or weakness; difficulty speaking; fainting or confusion', 'Dizzy or light-headed', 'Back pain, vision change: Urgent only above 180/120'],
  ['SpO₂', 'Blue lips, face or nails; breathlessness; chest pain or tightness; confusion', '', 'Racing pulse: Urgent only at 95% or less'],
  ['Cabin CO₂', 'Severe headache, confusion or nausea', '', ''],
  ['Body temperature', 'Confusion or very hard to wake; stiff neck or very bad headache; difficulty breathing or blue lips; seizure', '', ''],
  ['Sleep', 'Fell asleep by accident, or cannot stay alert before a safety-critical task', '', ''],
  ['Mood', 'Thoughts of harming myself or someone else; unable to function or do my work', '', ''],
  ['PHQ-4', '“Yes” to the safety question (part of the check)', '', ''],
  ['Near vision & Amsler', 'Sudden loss of vision; a curtain or shadow over my vision; new double vision; eye pain with loss of vision', '', ''],
  ['Fluid intake', 'Flank or lower-back pain with blood in urine', 'Dizziness, fast pulse or very little urine', ''],
  ['Exercise', '', 'Injury or pain that stops me exercising; bone pain after a fall or impact', ''],
  ['Body mass', 'Fainting or confusion', 'Unable to eat or keep food down', ''],
  ['Blood glucose', 'Confused or cannot treat myself; seizure or fainting', '', 'Vomiting or cannot keep fluids down: Urgent only at 200 or more, or below 70'],
  ['Radiation dose', 'Radiation alarm or order to shelter; nausea or vomiting within hours of a radiation event', '', ''],
], {note: 'The reaction test has no red flags. Red flags for blood pressure, SpO₂, temperature, glucose and the Amsler grid follow the guideline sources listed in clinical-thresholds.md (AHA/ACC, FDA, MedlinePlus, ADA, AAO). The other lists are Vista’s wording (design choice) and need flight-surgeon review.'});
H2('4.3 Escalation by environment');
P('The Act and Urgent steps end with wording that depends on the selected environment, because who can help, and how fast, changes with distance (Table 8). The rule behind it is a design proposal in the framework evidence file (**design choice**): in Mars mode the first Urgent instruction must be something the crew can do on board, with “message the ground” as a parallel step, never the only step.');
TABLE('Escalation wording by environment (STEP with ENVS.call and ENVS.sos)', [1350, 1250, 3213, 3213], ['Environment', 'Signal delay', 'Act: “Tell your crew medical officer today.” then', 'Urgent: “Emergency: alert your crewmates and start the onboard emergency procedure now.” then'], [
  ['LEO station', 'Under 1 s', 'The flight surgeon is a call away, 24 hours a day.', 'Call the flight surgeon on the priority loop.'],
  ['Moon base', '1.3 s each way', 'The flight surgeon can talk with you (1.3 s delay each way).', 'Call the flight surgeon on the priority loop (1.3 s delay).'],
  ['Mars transit', '3–22 min each way', 'Replies take 6–44 minutes round trip, so start the onboard procedure, then send your report.', 'Send a priority message, but act now: do not wait for a reply.'],
  ['Mars base', '3–22 min each way', 'Replies take 6–44 minutes round trip (none for about 2 weeks at solar conjunction), so start the onboard procedure, then report.', 'Send a priority message, but act now: do not wait for a reply.'],
]);
P('The Nominal and Watch steps are the same everywhere (Table 5). The Guide’s ladder adds context for the crew: on the ISS each crew has two crew medical officers, who are usually not doctors but are trained to examine, use the onboard medical kit and bring in the flight surgeon; near Earth the flight surgeon is on call 24 hours a day; from Mars a message takes 3–22 minutes each way and there is no early ride home, so the crew must act before help can answer. The report dialog repeats the Act wording for the selected environment, and Mission link shows today’s actual delay (Section 4.6).');
H2('4.4 Cross-reading findings');
P('Some problems show only when checks are read together. Besides every check at Watch or above, Vista adds the combined findings in Table 9. All of them are **design choices** built on the sourced values named in Table 6. Findings are sorted by level, highest first; each level’s step is shown once, and the same list goes into the flight-surgeon report.');
TABLE('Cross-reading findings (findings() in vista.html)', [1700, 3226, 900, 3200], ['Finding', 'Rule', 'Level', 'What the app advises'], [
  ['Sleep debt', 'At least 4 nights logged in the last 7 days, with an average under 6 h', '{A}', 'Ask the crew medical officer to protect your sleep period, and move safety-critical tasks away from your low point (often 1–7 am body-clock time).'],
  ['Short nights adding up', 'Average 6 h or more, but 3 or more nights under 6 h in the last 7 days', '{W}', 'Protect your full sleep period tonight.'],
  ['Resting heart rate creeping up', 'At least 10 readings in all and 3 in the last 7 days; this week’s average is 10 bpm or more above the baseline (median of the first 7 readings)', '{W}', 'Often an early sign of illness, poor sleep or overtraining: check temperature and fluids.'],
  ['Fever with a fast pulse', 'Temperature of 38.0 °C or more and heart rate of 100 bpm or more, taken within 24 h of each other', '{A}', 'Together these suggest an infection: rest, drink, keep your distance from crewmates where you can, and tell your crew medical officer today.'],
  ['Low oxygen with high CO₂', 'SpO₂ of 95% or less and cabin CO₂ above 3 mmHg, taken within 24 h of each other', '{A}', 'Suspect the cabin air: check ventilation and CO₂ removal, move to a well-ventilated module and report it.'],
], {note: 'The 1–7 am low point follows NASA-STD-3001 [V1 6001], which advises avoiding critical tasks during the circadian nadir (behavior-sleep-immune.md).'});
H2('4.5 Bone-density model');
P('Bone density cannot be measured in flight: NASA states that no system measures it in flight, so it is scanned by DXA on the ground before and after missions (NASA OCHMO-MTB-013). Vista therefore estimates the loss at five sites from loss rates measured in astronauts and the crew member’s own logs. It is an estimate, not a measurement. The model comes from the team’s earlier Orbit Health bone module, now the Bones & muscles panel.');
P('For each mission day the estimated loss at a site grows by:');
EQ('daily loss = (base loss per month ÷ 30.4) × gravity factor × (1 − protection)');
P('After landing, the loss reached at landing decays with a 9-month half-life, t days after landing:');
EQ('loss(t) = loss at landing × 0.5^{t ÷ (9 × 30.4)}');
P('The projection runs from launch to one year after landing. The parameters below are exactly those in vista.html (BONE, BONE_G, BW and HALF_MONTHS).');
TABLE('Bone sites: base loss and NASA limits', [1900, 1300, 2826, 1500, 1500], ['Site', 'Base loss (% a month)', 'Source of the base rate', 'Limit used (loss)', 'Watch from (loss)'], [
  ['Hip (femoral neck)', '1.45', 'Lang 2004: DXA 1.4–1.5% a month before today’s exercise equipment', '10%', '4%'],
  ['Pelvis', '1.25', 'NASA HRP: weight-bearing bone 1–1.5% a month', '5%', '2%'],
  ['Lumbar spine', '0.9', 'Lang 2004', '5%', '2%'],
  ['Thigh (femur shaft)', '0.8', 'Stavnichuk 2020 (148 space travellers)', '5%', '2%'],
  ['Shin (tibia)', '0.8', 'Stavnichuk 2020', '5%', '2%'],
], {note: 'Status: Nominal below 40% of the limit, Watch from 40% of it, Act at the limit. NASA-STD-3001 [V1 4027] requires bone density of 95% or more of the pre-mission value at the hip and spine and 90% at the femoral neck (NASA OCHMO-TB-031). The 40% Watch line and applying the 5% limit to the pelvis, thigh and shin are design choices.'});
TABLE('Protection, gravity and recovery terms', [1600, 1950, 2876, 2600], ['Term', 'Value in the code', 'How it is used', 'Basis'], [
  ['Exercise', '0.52 × exercise factor', 'Exercise factor = daily minutes ÷ 86, capped at 1 (86 minutes a day is about 600 a week). Past days use that day’s logged minutes (a day without a log keeps the previous value); future days use the average of the days logged in the previous 7 days (0 if none).', 'Calibrated to ARED-era crews, who lost about half as much (NASA 2025 review: femoral neck −4.1%, spine −2.6% per mission).'],
  ['Nutrition', '0.10 × nutrition factor', 'Factor 1 if body-mass loss is under 3%, 0.5 at 3–4.9%, 0 at 5% or more (latest body mass against pre-flight).', 'Assumption (“nutrition’s 10% share”). Heavy resistance exercise with enough energy and vitamin D kept hip and pelvis density at pre-flight levels in 5 crew (Smith 2012).'],
  ['Bone medication', '0.35 × medication', '1 if the flight surgeon set a plan (alendronate 70 mg weekly, or a single pre-flight zoledronic acid infusion), otherwise 0.', 'Exercise plus weekly alendronate attenuated nearly all loss in 7 crew (LeBlanc 2013).'],
  ['Protection cap', '0.95', 'Protection = the sum of the three terms, capped at 0.95.', 'Design choice.'],
  ['Gravity factor', '1 − g: station and transit 1; Moon 0.835; Mars 0.62', 'Loss scales with the missing fraction of Earth gravity.', 'Assumption. No long-duration human data exist at 1/6 g or 3/8 g; a review concluded gravity below 0.4 g is probably not enough on its own (Richter 2017).'],
  ['Recovery half-life', '9 months', 'After landing the loss halves every 9 months (30.4-day months).', '50% of lost bone restored within 9 months of landing (Sibonga 2007). Recovery can be incomplete: 9 of 17 astronauts had not recovered shin density 12 months after landing (Gabel 2022).'],
  ['Comparison line', 'No protection', 'The chart’s “early-ISS rate” line shows the same mission with no protection.', 'The base rates in Table 10, which the code treats as loss without today’s exercise equipment.'],
]);
P('Table 12 shows what the model gives for a 180-day station mission. With the exercise term alone (full exercise, but a body-mass loss of 5% or more, so no nutrition credit) it returns 4.1% at the hip and 2.6% at the lumbar spine, the per-mission losses it was calibrated to. These numbers are model outputs, not measurements.');
TABLE('Worked example: 180-day station mission, computed with the model', [2826, 1550, 1550, 1550, 1550], ['Routine', 'Hip at landing', 'Hip 1 year later', 'Lumbar spine at landing', 'Spine 1 year later'], [
  ['No protection (early-ISS rate)', '8.59% ({W})', '3.40%', '5.33% ({A})', '2.11%'],
  ['Full exercise, body-mass loss 5% or more', '4.12% ({W})', '1.63%', '2.56% ({W})', '1.01%'],
  ['Full exercise, body-mass loss under 3%', '3.26% ({N})', '1.29%', '2.02% ({W})', '0.80%'],
  ['As above, plus a bone medication plan', '0.43% ({N})', '0.17%', '0.27% ({N})', '0.11%'],
], {note: '“Full exercise” means 86 minutes or more every day. Levels use the hip (femoral neck) limit of 10% and the spine limit of 5%.'});
P('The panel shows the estimated loss now, at landing and one year after landing, the monthly rate on the recent routine and the early-ISS comparison, and lists the astronaut studies it uses. The worst site sets the bone part of the Bones & muscles status. Exercise minutes stand in for resistive load, a simplification noted in the code.');
H2('4.6 Mission link model');
P('Mission link is a new Today-screen panel. For the selected environment it shows today’s distance from Earth and the one-way and round-trip signal delay at the speed of light, with a small orbit map. Table 13 describes how each distance is found, as specified in the developer’s notes.');
TABLE('Mission link by environment (developer’s notes)', [1500, 5526, 2000], ['Environment', 'How the distance is found', 'Signal delay each way'], [
  ['Station (LEO)', 'About 400–420 km up; the signal is relayed by satellites.', 'Under 1 s'],
  ['Moon base', 'Today’s Earth–Moon distance from the main terms of the lunar theory in Meeus, Astronomical Algorithms (chapter 47).', 'About 1.2–1.4 s'],
  ['Mars base', 'Today’s Earth–Mars distance from JPL’s “Approximate Positions of the Planets” Keplerian elements (E. M. Standish, JPL Solar System Dynamics, valid 1800–2050). Mission link also predicts the next solar conjunction, when Mars is within 2 degrees of the Sun and missions pause commanding for about two weeks.', '3–22 minutes'],
  ['Mars transit', 'A modelled position on a Hohmann transfer that starts on the mission start date, labelled “modelled”.', 'From the modelled position'],
]);
P('Checked against NASA JPL Horizons: [ACCURACY TO BE FILLED]', {highlight: 'yellow'});
P('The delay ranges agree with the light times derived from NASA’s fact-sheet distances in the evidence: 1.2–1.4 s to the Moon and 3.0–22.3 minutes to Mars (framework.md).');

/* ---------- 5 NASA and partner data ---------- */
H1('5 NASA and partner data');
P('Table 14 lists the NASA and partner data Vista uses, as given in the team’s submission. Peer-reviewed sources for every threshold are listed in the app’s Guide and in docs/evidence, with a verification log for each file.');
TABLE('NASA and partner data used (README)', [3500, 5526], ['Data', 'How Vista uses it'], [
  ['**NASA DONKI** space-weather database, via [[https://api.nasa.gov/]]', 'Live: solar energetic particle events, CMEs and geomagnetic storms in the radiation panel'],
  ['**NASA Harmonized Landsat and Sentinel-2 (HLS)**, via the Microsoft Planetary Computer STAC and data APIs ([[https://planetarycomputer.microsoft.com/]])', 'Live: Window to Earth satellite views'],
  ['**NASA JPL Solar System Dynamics**: [Approximate Positions of the Planets|https://ssd.jpl.nasa.gov/planets/approx_pos.html] and [JPL Horizons|https://ssd.jpl.nasa.gov/horizons/]', 'Mission link: Earth–Mars distance and signal delay (Horizons used to check the model and in the built-in self-test)'],
  ['**NASA-STD-3001** Vol. 1 Rev C and Vol. 2 Rev F, **NASA OCHMO** technical briefs (CO₂, radiation, SANS)', 'Limits: career dose 600 mSv, cabin CO₂ 3 mmHg, strength and fitness at 80% of baseline or more, fluid needs'],
  ['**NASA Human Research Program**: five hazards, human-system risks, evidence reports', 'The body-map hazards and in-app explanations'],
  ['**NASA nutrition requirements** (JSC-67378)', 'Personal fluid target (32 mL/kg) and sodium guidance'],
  ['**Canadian Space Agency** (Bio-Monitor, radiation monitoring, vascular ageing)', 'Measurement context and radiation content'],
  ['**ESA Space Heritage archive**', 'Historical health-research records in the Guide'],
], {note: 'The JPL row is new in this version (Mission link, Section 4.6). For the Moon, Mission link uses the lunar theory in Meeus, Astronomical Algorithms.'});
P('**Space weather.** When the crew member presses “Check space weather”, Vista asks api.nasa.gov for the DONKI solar energetic particle (SEP), coronal mass ejection (CME) and geomagnetic storm (GST) feeds for the last 30 days. Each feed is handled on its own, so one failed feed does not blank the panel; the flare feed (FLR) returned 404 in November 2026 and is left out. The panel shows the count and latest date of each event type and the highest Kp index of the storms, and flags a particle event in the last 3 days. DONKI is a database, not a live alert: the onboard alarm and the ground decide. The app uses NASA’s DEMO_KEY.');
P('**Window to Earth.** “Show latest view” searches the HLS collections for Sentinel-2 (hls2-s30) and Landsat (hls2-l30) for the newest scene over the chosen point with under 15% cloud, and shows a true-colour crop of about 20 km made from the red, green and blue bands. Data: NASA HLS v2.0, doi:10.5067/HLS/HLSS30.002 and doi:10.5067/HLS/HLSL30.002. Preset places are Houston (NASA Johnson), Cologne (ESA astronaut centre), Tsukuba (JAXA), Longueuil (CSA) and Baikonur, or the crew member’s own coordinates.');
P('**ESA Space Heritage archive.** The Guide shows three records: sled training for Spacelab-1 (ESTEC-PHOTO-1981.10.157), an astronaut sleep restraint (ESTEC-PHOTO-1984.12.009) and A Survey of Space Biology and Space Medicine (ESA BR-17).');

/* ---------- 6 Privacy and security ---------- */
H1('6 Privacy and security');
H2('6.1 The Privacy Charter');
P('The privacy page is now called the Privacy Charter. It opens with six commitments:');
OL([
  'Your health data stays on this device.',
  'Nothing leaves without your tap: only three buttons send anything, and each says what it sends.',
  'No accounts, cookies, analytics, advertising or trackers.',
  'You see every report before it is sent, and only the flight-surgeon inbox receives it; the public key can only insert, never read.',
  'You can download or delete everything at any time.',
  'Open and auditable: the full source code is public.',
]);
TABLE('How each commitment is kept (vista.html, supabase/reports.sql)', [2400, 6626], ['Commitment', 'How it is implemented'], [
  ['1. Data stays on the device', 'Readings, the crew profile and settings are saved in the browser’s local storage under the keys `vista.v1` and `vista.theme`. Saved data that cannot be read is kept as `vista.v1.unreadable.*`, and “Delete all readings” removes it too.'],
  ['2. Nothing leaves without a tap', 'Only the three buttons in Table 16 send anything. Every request is made with cookies switched off and without a referrer.'],
  ['3. No accounts or tracking', 'No sign-in, no cookies, no analytics or advertising code, and no third-party scripts or fonts: the fonts are served from the same site as the app.'],
  ['4. Every report previewed; insert-only inbox', 'The report dialog shows a summary and, under “Everything that will be sent”, the full report. The callsign is optional and the form asks for no real names. Row-level security makes the inbox insert-only for the public key (Section 6.3).'],
  ['5. Download or delete at any time', '“Download backup” saves a JSON file; “Restore from backup” checks it field by field and refuses files over 5 MB; “Delete all readings” asks for confirmation first.'],
  ['6. Open and auditable', 'The full source is public: [[https://github.com/Ulugbek-netizen/vista]].'],
]);
H2('6.2 What leaves the device');
TABLE('The three buttons that send data', [2000, 3100, 2126, 1800], ['Button', 'What is sent', 'Where', 'Not sent'], [
  ['“Show latest view” (Window to Earth)', 'The chosen place’s coordinates', 'Microsoft Planetary Computer', 'No health data'],
  ['“Check space weather”', 'A date range (the last 30 days)', 'NASA DONKI at api.nasa.gov', 'No health data'],
  ['“Send report to flight surgeon”', 'The previewed report: current readings with their levels, findings with advice, mission environment and mission day, whether it is example data, and an optional callsign', 'The team’s Supabase inbox (EU, Frankfurt)', 'Anything not shown in the preview'],
], {note: 'The website itself is served by Vercel, Microsoft Azure and GitHub. Like any web server, they may briefly log technical data such as IP addresses to deliver the page; Vista receives none of it (Privacy Charter).'});
H2('6.3 Security controls');
UL([
  '**Content-Security-Policy.** The deployed page carries a strict policy that allows the app’s own script and the three services only (README). As read from the live page on 14 November 2026, it sets `default-src` to `\'none\'`, allows the single inline script by its SHA-256 hash, allows network connections only to Microsoft Planetary Computer, api.nasa.gov and the Supabase inbox, allows images only from the app itself, data URLs and the Planetary Computer, allows fonts and styles from the app (styles also inline), and sets `base-uri` and `form-action` to `\'none\'`.',
  '**No cookies.** Vista sets and reads no cookies, and every outgoing request omits credentials and the referrer.',
  '**Insert-only inbox (supabase/reports.sql).** Row-level security is enabled on the table `public.reports`. The anon and authenticated roles lose all privileges, then get INSERT on five columns only: callsign, env, level, summary and payload. The policy “crew can submit reports” allows those inserts. No SELECT, UPDATE or DELETE is granted, so the public key cannot read, change or delete reports. The id, time stamp, status and note stay server-controlled, and flight surgeons read reports in the Supabase dashboard.',
  '**Checks on every report.** The callsign is empty or 1–40 characters; env is one of leo, moon, transit and mars; level is 0–3, or empty when there are no current readings, so a report is never a false Nominal; the summary is 1–2,000 characters; the payload is a JSON object of at most 32,000 bytes.',
  '**Senders are not authenticated.** Anyone who loads the page can insert a report; the checks above bound what one report can contain. Because the inbox is a prototype, the dialog asks users not to send real medical information.',
  '**Untrusted input.** Data read from local storage or a backup file is checked field by field: unknown checks, non-numeric or out-of-range values and malformed answers are dropped, never displayed. Keys such as `constructor` and `__proto__` are rejected, and text is escaped before it is shown.',
  '**Defensive storage.** Saved data that cannot be read is kept rather than deleted, a device clock that moved backwards never deletes readings, and another browser tab’s save is adopted instead of being overwritten.',
]);

/* ---------- 7 Accessibility and design ---------- */
H1('7 Accessibility and design');
P('Vista was built and checked against WCAG 2.2 AA and against motion and data-visualisation guidelines (README). The main measures are:');
UL([
  '**Never colour alone.** Every level has a colour, an icon shape and a word (Table 5). In the new Status-colour view, words and icons stay beside every colour. Chart zones carry their level names, and blood-pressure charts use circles for systolic and squares for diastolic values.',
  '**Reduced motion.** The Home globe is pausable (WCAG 2.2.2), stops when hidden or off the Home view, and draws a single still frame when the system asks for reduced motion; animations and transitions are then cut to almost nothing and smooth scrolling is turned off. The reaction-test stimulus appears instantly and is never animated.',
  '**Keyboard and screen readers.** A skip link and a visible focus outline. Body-map systems are buttons that work with Enter and Space and announce their level, for example “Brain & behaviour: Watch”. Charts can be read value by value with the arrow keys (Home and End jump to the ends), each value is announced, and a data table is provided. The status banner is announced again only when it changes, the verdict while typing waits 500 ms so a screen reader hears the finished value, and dialogs return focus to the control that opened them.',
  '**Targets and display.** Buttons, form controls and list options are at least 44 px high (tabs 48 px). Light and dark themes follow the system setting, with a manual switch. In Windows high-contrast mode (forced colours) the body-map outlines stay visible.',
  '**Phone layout.** The layout adapts down to narrow phone screens (the smallest breakpoint is 359 px), respects the safe areas of notched screens and opens numeric keyboards for number fields.',
  '**Plain language.** Short sentences, units on every value and instructions written for people with no medical training.',
  '**Anatomy drawn to real proportions.** The body map and bone skeleton come from tools/anatomy.py: a front view in the anatomical position (palms forward) at a stature of 175 cm = 439 drawing units (1 cm = 2.509 units). Landmark heights follow standard anthropometry as fractions of stature: chin 0.87, shoulder 0.82, elbow 0.63, iliac crest 0.60, hip joint 0.53, wrist 0.485, crotch 0.47, fingertip 0.377, knee 0.27 and lateral malleolus 0.04. Paired parts are drawn once and mirrored, a fixed paint order handles front-view overlap, vessels are drawn only where they are visible from the front, and the generator reports any point that comes within 0.9 units of the skin.',
  '**What the map shows.** The full skeleton (skull, spine from C3 to the coccyx, 12 rib pairs with costal cartilages, sternum, clavicles, scapulae, arms and hands down to the finger bones, pelvis, legs and feet), brain, eyes, larynx, trachea and lungs with their lobes, diaphragm, heart with the great vessels and the main arteries and veins of the neck and limbs, thyroid, liver, gallbladder, oesophagus, stomach, pancreas, small and large intestine, appendix, kidneys (dashed where the gut covers them), adrenal glands, ureters, bladder, thymus, spleen and lymph nodes (README).',
  '**Typography.** Archivo and Martian Mono, self-hosted under the SIL Open Font License.',
]);

/* ---------- 8 Validation and testing ---------- */
H1('8 Validation and testing');
H2('8.1 Built-in self-test');
P('vista.html runs `selfTest()` on every page load. It logs “Vista self-test passed”, or each failure, to the browser console, and it is exposed as `window.VISTA_SELFTEST`. It makes 61 checks (Table 17). When this document was prepared, all 61 passed (0 failures) in a script that runs the rule definitions from vista.html; the build then deployed, which does not yet include Mission link, also passed its self-test on both sites (Section 8.4). To run the app locally: `python build.py` writes dist/, then `python -m http.server 8000 --directory dist`, or open dist/index.html.');
TABLE('What the self-test checks (input → expected level)', [2300, 6726], ['Group', 'Cases'], [
  ['Heart rate (no baseline)', '60 → {N}; 95 → {W}; 115 → {A}; 131 → {U}; 40 → {U}; 45 → {W}'],
  ['SpO₂', '97 → {N}; 95 → {W}; 92 → {A}; 91 → {U}'],
  ['Temperature', '36.8 → {N}; 37.7 → {W}; 38.2 → {A}; 35.0 → {U}; 40.6 → {U}'],
  ['Sleep', '7.5 → {N}; 6.5 → {W}; 5.5 → {W}; 4.5 → {A}'],
  ['Cabin CO₂ (single reading)', '2 → {N}; 2.8 → {W}; 3.5 → {A}; 5 → {A}'],
  ['Body mass (pre-flight 70 kg)', '69 → {N}; 67.5 → {W}; 66 → {A}'],
  ['Fluids (target 2.5 L)', '2.5 → {N}; 2.2 → {W}; 1.5 → {W}'],
  ['Radiation (station, typical 0.3 mGy)', '0.3 → {N}; 0.6 → {W}; 4 → {A}'],
  ['Blood pressure', '118/76 → {N}; 125/78 → {W}; 145/85 → {W}; 190/100 → {A}; 225/100 → {U}; 88/55 → {A}'],
  ['Blood glucose', 'Fasting 50 → {U}; 65 → {A}; 90 → {N}; 110 → {W}; 130 → {A}. After food 150 → {W}'],
  ['PHQ-4', 'Answers 0,0,1,0 → {N}; 1,1,1,0 → {W}; 2,1,0,0 → {A} (anxiety pair of 3); all 0 with “yes” to the safety question → {U}'],
  ['Vision', 'Same line → {N}; 1 line worse → {W}; Amsler distortion → {A}'],
  ['Bone status (5% limit)', '1.9 → {N}; 2.0 → {W}; 4.9 → {W}; 5.0 → {A}'],
  ['Data checks', 'Of three stored entries, only the valid one is kept (a heart rate of 9,999 and an unknown check are dropped)'],
  ['Red flags', 'A ticked red flag raises a heart rate of 60 to {U}, and the message never says “normal resting range”'],
  ['Mission link', 'Earth–Mars distance on 14 November 2026 within 0.0015 au of JPL Horizons (1.3244 au); Earth–Moon distance within 300 km of Horizons (405,616 km); the next Mars solar conjunction after 1 January 2027 starts in March 2028'],
]);
H2('8.2 Research verification');
P('Six research agents compiled the evidence files from NASA, CSA, ESA and peer-reviewed sources, and three verifier agents then re-checked the claims against their sources with live web access (README; the Verification log at the end of each file). The verdicts are: **confirmed**, the number was found in the source; **corrected**, the file was changed and the text marked “(corrected)”; **unsupported**, the claim could not be confirmed and is marked “UNVERIFIED:” so it is not used as a sourced value. Bands tagged (P) or (D) are design proposals; only their sourced anchors could be checked.');
TABLE('Verification results by evidence file', [2300, 2226, 800, 1200, 1200, 1300], ['Evidence file', 'Topic', 'Items', 'Confirmed', 'Corrected', 'Unsupported'], [
  ['framework.md', 'Five hazards, HRP risks, mission medical operations', '44', '43', '1', '0'],
  ['clinical-thresholds.md', 'Clinical ranges and self-measurement technique', '57', '50', '6', '1'],
  ['cardio-metabolic.md', 'Heart, fluids, nutrition, metabolism, kidneys', '55', '52', '2', '1'],
  ['musculoskeletal-neuro.md', 'Bone, muscle, exercise, sensorimotor system, SANS', '68', '64', '4', '0'],
  ['radiation-environment.md', 'Space radiation and the closed habitat', '59', '53', '5', '1'],
  ['behavior-sleep-immune.md', 'Behaviour, sleep, cognition, immune system', '49', '45', '4', '0'],
  ['**Total**', '', '**332**', '**307**', '**22**', '**3**'],
], {note: 'The three unsupported items: the mood rule (no published basis; Vista labels it a design choice), “no spaceflight offset” for SpO₂ (no in-flight norm found; Vista states its sea-level-equivalent cabin assumption) and a weekly water-testing cadence (not used by Vista).'});
H2('8.3 Independent AI reviews');
P('Three AI reviewers looked at the app: one for code, one for clinical accuracy and one for accessibility. Each reviewer’s findings were adversarially verified, and all 33 confirmed issues were fixed (README).');
H2('8.4 Live checks');
P('On 14 November 2026 both deployed sites ([[https://vista-health.vercel.app]] and [[https://black-sky-0803de80f.8.azurestaticapps.net]]) were opened in a browser. On each, the self-test passed on load, `document.cookie` was empty, and no Content-Security-Policy violation was reported while moving through all five views and opening five body-system panels. The deployed build did not yet include the three features new in this document, so the checks should be repeated after the next deployment.');

/* ---------- 9 How AI was used ---------- */
H1('9 How AI was used');
P('We built Vista with Claude (Anthropic) as a research and coding assistant:');
OL([
  '**Research:** six research agents collected thresholds and spaceflight facts from NASA, CSA, ESA and peer-reviewed sources, and three verifier agents checked each claim against its source (docs/evidence/*.md, “Verification log”).',
  '**Building:** the app was written with AI assistance and checked against WCAG 2.2 AA, motion and data-visualisation guidelines.',
  '**Independent review:** three AI reviewers (code, clinical accuracy, accessibility) each had their findings adversarially verified. All 33 confirmed issues were fixed.',
]);
P('The team chose the scope, reviewed the medical content and owns every decision. Vista is a prototype, not a medical device.');
P('This document was also compiled with AI assistance, only from the team’s README, the app’s source code, the evidence files and the developer’s notes on the new features.');

/* ---------- 10 Limitations and next steps ---------- */
H1('10 Limitations and next steps');
H2('10.1 Limitations');
UL([
  '**A prototype, not a medical device.** Vista does not diagnose or treat any condition and does not replace a crew medical officer, flight surgeon or doctor. The example data is made up.',
  '**Design-choice bands need flight-surgeon sign-off.** These are the mood rule; the reaction-test band; the two-night and 7-day sleep rules; the fluid 80% and two-day rules; the weekly exercise thresholds; the 3% body-mass line; the CO₂ Act and Urgent bands; the radiation 1.5× and 10× rules; the weekly vision self-check and its line rules; the 140–199 mg/dL glucose band after food; the repeat and validity windows; the cross-reading findings; the red flags without a guideline source; the link from body systems to hazards; the escalation wording by environment; and the bone model’s weights, gravity scaling, 40% Watch line and limits for the pelvis, thigh and shin.',
  '**Thresholds were built for other people.** NEWS2 detects acute illness in hospital patients, the AHA/ACC categories describe long-term cardiovascular risk, and the ADA levels were written for diagnosing or managing diabetes with plasma glucose. None has been validated in astronauts (cardio-metabolic.md; clinical-thresholds.md).',
  '**Alarm fatigue.** ISS crews slept under 6 hours on 43.8% of nights (Barger et al. 2014), 57% of ISS crew reached a 5–10% body-mass loss (NASA nutrition book), ISS cabin CO₂ often runs at 2–3 mmHg, and a one-line change in acuity cannot be reliably told from no change (Rosser et al. 2003). Watch and Act will therefore be common. The evidence files advise raising a lasting Act once and following it through the scheduled conferences instead of alerting every day.',
  '**Open conflicts between evidence files.** The files disagree on body temperature of 38.0–39.3 °C without symptoms (Act or Watch), on whether a PHQ-4 total of 9–12 is Urgent, and on PVT-B timing (1–4 s or the 2–5 s flight version). Vista uses Act, keeps Urgent for “act immediately” and uses 1–4 s intervals; a flight surgeon should confirm each choice.',
  '**Estimates are not measurements.** Bone density can only be scanned on Earth. The mission dose estimate multiplies mission days by a typical rate (0.35, 1.37, 1.84 and 0.64 mSv a day for the station, Moon, transit and Mars) and runs high outside low Earth orbit; the official dose comes from the radiation team and includes earlier missions. Mission link computes positions from orbital models, and the Mars transit position is modelled.',
  '**Partial gravity is unknown.** There are no long-duration human data at 1/6 g or 3/8 g, so scaling bone loss with missing gravity is an assumption (musculoskeletal-neuro.md).',
  '**NASA DEMO_KEY rate limits.** Space weather uses NASA’s DEMO_KEY, which covers light use. When the limit is reached the app says so; a free key from api.nasa.gov raises it.',
  '**Self-measurement varies.** Readings depend on technique and device. Reaction-test timing depends on hardware, so a browser or touchscreen result is compared only with the same person’s baseline on the same device. SpO₂ assumes a sea-level-equivalent cabin; a cabin at 8.2 psia with 34% oxygen, NASA’s example exploration atmosphere, would need new baselines (radiation-environment.md).',
  '**Local storage can be wiped.** Readings live in the browser; clearing the site’s data deletes them, so the app asks users to download backups.',
  '**Prototype inbox.** The flight-surgeon inbox does not authenticate senders, and users are asked not to send real medical information.',
]);
H2('10.2 Next steps');
UL([
  'Flight-surgeon review and sign-off of every design-choice band, and a decision on each open conflict between the evidence files.',
  'Fill in the Mission link accuracy statement from the JPL Horizons comparison (Section 4.6).',
  'Redeploy both sites with the three new features, then repeat the live checks: cookies, Content-Security-Policy and self-test.',
  'Replace NASA’s DEMO_KEY with a registered key.',
  'Make thresholds configurable per vehicle atmosphere, as the radiation-environment file recommends.',
  'Use an orbit-averaged baseline for the station dose rule, because the cosmic-ray dose rate rises and falls within every orbit (radiation-environment.md).',
  'Log resistive load and nutrition separately, so the bone model no longer uses exercise minutes as a stand-in for load.',
]);

/* ---------- 11 References ---------- */
const REFS = [
  ['Team sources', [
    'Team Void Voyagers. Vista source code: README.md, vista.html, docs/evidence/*.md (six evidence files with verification logs), supabase/reports.sql, tools/anatomy.py. [[https://github.com/Ulugbek-netizen/vista]]',
    'Vista live app: [[https://vista-health.vercel.app]] (Vercel); mirror: [[https://black-sky-0803de80f.8.azurestaticapps.net]] (Azure Static Web Apps).',
  ]],
  ['NASA standards, technical briefs and reports', [
    'NASA. NASA-STD-3001 Volume 1 Revision C, Crew Health (approved 15 September 2023). [[https://www.nasa.gov/wp-content/uploads/2023/11/nasa-std-3001-vol-1-rev-c-with-signature.pdf]]',
    'NASA. NASA-STD-3001 Volume 2 Revision F, Human Factors, Habitability, and Environmental Health (approved 14 July 2026). [[https://www.nasa.gov/wp-content/uploads/2025/05/nasa-std-3001-vol-2.pdf]]',
    'NASA OCHMO-TB-004 Rev D, Carbon Dioxide (10 March 2026). [[https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-004-carbon-dioxide.pdf]]',
    'NASA OCHMO-TB-020 Rev G, Design for Ionizing Radiation Protection (6 June 2025). [[https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-020-radiation-protection.pdf]]',
    'NASA OCHMO-MTB-001, Spaceflight Associated Neuro-ocular Syndrome (21 February 2024). [[https://www.nasa.gov/wp-content/uploads/2024/02/ochmo-mtb-001-sans.pdf]]',
    'NASA OCHMO-MTB-013 Rev D, Bone Loss (11 February 2026). [[https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-030-bone-loss.pdf]]',
    'NASA OCHMO-TB-031, Exercise Overview (2 October 2023). [[https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-031-exercise-overview.pdf]]',
    'NASA OCHMO-TB-044, Medical Operations (13 August 2025). [[https://www.nasa.gov/wp-content/uploads/2025/08/ochmo-tb-044-medical-operations.pdf]]',
    'NASA/SP-20250000273. Astronaut physiological deconditioning and exercise prescription countermeasures in spaceflight (January 2025). [[https://ntrs.nasa.gov/citations/20250000273]]',
    'NASA JSC-67378 Rev 1. Nutritional Requirements for Exploration Missions up to 365 days (20 April 2020). [[https://ntrs.nasa.gov/api/citations/20205008306/downloads/JSC67378%20Expl%20Nutr%20Reqs%20042020.pdf]]',
    'Smith, Zwart, Douglas, Heer. Human Adaptation to Spaceflight: The Role of Food and Nutrition, 2nd ed. NASA, 2021. [[https://www.nasa.gov/wp-content/uploads/2015/02/human_adaptation_2021_final.pdf]]',
    'NASA. Mars Communications Disruption and Delay. 2023 Moon to Mars Architecture white paper. [[https://www.nasa.gov/wp-content/uploads/2024/01/mars-communications-disruption-and-delay.pdf]]',
    'Beven 2017. Behavioral Health and Performance Operations at NASA JSC (NTRS 20170003866). [[https://ntrs.nasa.gov/api/citations/20170003866/downloads/20170003866.pdf]]',
  ]],
  ['NASA web pages and fact sheets', [
    'NASA Human Research Program. The five hazards. [[https://www.nasa.gov/hrp/hazards/]]',
    'NASA Human Research Program. Human system risks. [[https://www.nasa.gov/hrp/risks/]]',
    'NASA. The Human Body in Space (updated 26 May 2026). [[https://www.nasa.gov/humans-in-space/the-human-body-in-space/]]',
    'NASA. Cardiovascular and Vision (Human Health and Performance, updated 11 March 2025). [[https://www.nasa.gov/directorates/esdmd/hhp/cardiovascular-and-vision/]]',
    'NASA. Crew-11 astronaut update (25 February 2026). [[https://www.nasa.gov/blogs/commercialcrew/2026/02/25/nasas-spacex-crew-11-astronaut-update/]]',
    'NASA. Crew-11 splashdown release. [[https://www.nasa.gov/news-release/nasas-spacex-crew-11-mission-returns-splashes-down-off-california/]]',
    'NASA. Houston We Have a Podcast, Ep. 377: Mission Control: Crew Health Consoles (21 March 2025). [[https://www.nasa.gov/podcasts/houston-we-have-a-podcast/mission-control-crew-health-consoles]]',
    'NSSDC. Mars Fact Sheet. [[https://nssdc.gsfc.nasa.gov/planetary/factsheet/marsfact.html]]',
    'NSSDC. Moon Fact Sheet. [[https://nssdc.gsfc.nasa.gov/planetary/factsheet/moonfact.html]]',
  ]],
  ['NASA and partner data and archives', [
    'NASA DONKI space-weather database. [[https://kauai.ccmc.gsfc.nasa.gov/DONKI/]], via [[https://api.nasa.gov/]]',
    'NASA Harmonized Landsat and Sentinel-2 (HLS). [[https://www.earthdata.nasa.gov/data/projects/hls]]. HLS v2.0 data: doi:10.5067/HLS/HLSS30.002 and doi:10.5067/HLS/HLSL30.002.',
    'Microsoft Planetary Computer, STAC and data APIs. [[https://planetarycomputer.microsoft.com/]]',
    'ESA Space Heritage Image Project. [[https://ship.esa.int/ISS/]]',
    'Canadian Space Agency. Monitoring radiation and astronaut health (2026). [[https://www.asc-csa.gc.ca/eng/news/articles/2026/2026-02-26-monitoring-radiation-astronaut-health.asp]]',
    'Canadian Space Agency. Why do we conduct science experiments in space? [[https://www.asc-csa.gc.ca/eng/iss/science/why-do-we-conduct-science-experiments-in-space.asp]]',
    'Canadian Space Agency. Bio-Monitor. [[https://www.asc-csa.gc.ca/eng/sciences/bio-monitor.asp]]',
    'Canadian Space Agency. Vascular studies. [[https://www.asc-csa.gc.ca/eng/sciences/vascular.asp]]',
  ]],
  ['Clinical guidelines and references', [
    'Royal College of Physicians. National Early Warning Score (NEWS) 2, 2017. [[https://www.rcp.ac.uk/improving-care/resources/national-early-warning-score-news-2/]]; Chart 1: [[https://www.rcp.ac.uk/media/alxev00t/news2-chart-1_the-news-scoring-system_0_0.pdf]]',
    'American Heart Association. New high blood pressure guideline emphasizes prevention, early treatment to reduce CVD risk (news release on the 2025 AHA/ACC guideline, 14 August 2025). [[https://newsroom.heart.org/news/new-high-blood-pressure-guideline-emphasizes-prevention-early-treatment-to-reduce-cvd-risk]]',
    'PCNA. Putting updated blood pressure guidelines into practice. [[https://pcna.net/news/putting-updated-blood-pressure-guidelines-into-practice/]]',
    'American Diabetes Association. 2. Diagnosis and Classification of Diabetes: Standards of Care in Diabetes 2026. Diabetes Care 49 (Suppl 1):S27–S49. [[https://doi.org/10.2337/dc26-S002]]',
    'American Diabetes Association. 6. Glycemic Goals, Hypoglycemia, and Hyperglycemic Crises: Standards of Care in Diabetes 2026. Diabetes Care 49 (Suppl 1):S132–S149. [[https://doi.org/10.2337/dc26-S006]]',
    'MedlinePlus. Pulse. [[https://medlineplus.gov/ency/article/003399.htm]]',
    'MedlinePlus. Fever. [[https://medlineplus.gov/ency/article/003090.htm]]',
    'MedlinePlus. Temperature measurement. [[https://medlineplus.gov/ency/article/003400.htm]]',
    'CDC. Definitions of signs, symptoms, and conditions of ill travelers. [[https://www.cdc.gov/port-health/php/definitions-symptoms-reportable-illness/index.html]]',
    'CDC. Measure Your Blood Pressure. [[https://www.cdc.gov/high-blood-pressure/measure/index.html]]',
    'FDA. Pulse oximeter basics (26 March 2025). [[https://www.fda.gov/consumers/consumer-updates/pulse-oximeter-basics]]',
    'American Academy of Ophthalmology. Amsler grid patient page (19 December 2025). [[https://www.aao.org/eye-health/tips-prevention/facts-about-amsler-grid-daily-vision-test]]',
  ]],
  ['Peer-reviewed papers', [
    'Antonsen et al. 2023. Updates to the NASA human system risk management process. npj Microgravity. [[https://pmc.ncbi.nlm.nih.gov/articles/PMC10485075/]]',
    'Barger et al. 2014. Lancet Neurol 13:904–912 [sleep and hypnotic use in astronauts]. [[https://doi.org/10.1016/S1474-4422(14)70122-X]]',
    'Basner, Mollicone and Dinges 2011. Acta Astronaut 69:949–959 [PVT-B design and lapse thresholds]. [[https://doi.org/10.1016/j.actaastro.2011.07.015]]',
    'Cederholm et al. 2019. Clin Nutr 38:1–9 [GLIM malnutrition criteria]. [[https://doi.org/10.1016/j.clnu.2018.08.002]]',
    'Gabel et al. 2022. Sci Rep 12:9446 [incomplete bone recovery at 12 months]. [[https://doi.org/10.1038/s41598-022-13461-1]]',
    'Hassler et al. 2014. Mars’ surface radiation environment. Science 343:1244797. [[https://doi.org/10.1126/science.1244797]]',
    'Jones et al. 2022. Sleep 45:zsac006 [Reaction Self-Test on the ISS]. [[https://doi.org/10.1093/sleep/zsac006]]',
    'Kroenke et al. 2009. Psychosomatics 50:613–621 [PHQ-4]. [[https://doi.org/10.1176/appi.psy.50.6.613]]',
    'Lang et al. 2004. J Bone Miner Res 19:1006–12 [bone loss rates by site and compartment]. [[https://doi.org/10.1359/JBMR.040307]]',
    'Law et al. 2014. Relationship between carbon dioxide levels and reported headaches on the ISS. J Occup Environ Med 56:477–83. [[https://doi.org/10.1097/JOM.0000000000000158]]',
    'LeBlanc et al. 2013. Osteoporos Int 24:2105–14 [alendronate plus exercise]. [[https://doi.org/10.1007/s00198-012-2243-z]]',
    'Levin et al. 2023. Enabling Human Space Exploration Missions Through Progressively Earth Independent Medical Operations. IEEE OJEMB. [[https://pmc.ncbi.nlm.nih.gov/articles/PMC10810302/]]',
    'Norsk et al. 2015. J Physiol 593:573–584 [blood pressure in flight]. [[https://doi.org/10.1113/jphysiol.2014.284869]]',
    'Richter et al. 2017. Front Physiol 8:583 [partial-gravity systematic review]. [[https://doi.org/10.3389/fphys.2017.00583]]',
    'Rosser et al. 2003. Invest Ophthalmol Vis Sci 44:3278–3281 [smallest acuity change that can be detected reliably]. [[https://doi.org/10.1167/iovs.02-1100]]',
    'Scott et al. 2023. npj Microgravity 9:11 [multisystem outcomes with current ISS exercise]. [[https://doi.org/10.1038/s41526-023-00256-5]]',
    'Shavers et al. 2024. Space agency-specific standards for crew dose and risk assessment. Z Med Phys 34:14–30. [[https://doi.org/10.1016/j.zemedi.2023.06.005]]',
    'Sibonga et al. 2007. Bone 41:973–8 [recovery half-time after long-duration flight]. [[https://doi.org/10.1016/j.bone.2007.08.022]]',
    'Smith et al. 2012. J Bone Miner Res 27:1896–906 [ARED exercise plus nutrition maintains bone]. [[https://doi.org/10.1002/jbmr.1647]]',
    'Stahn et al. 2017. Sci Rep 7:16180 [core body temperature in flight]. [[https://doi.org/10.1038/s41598-017-15560-w]]',
    'Stavnichuk et al. 2020 [regional bone-loss meta-analysis, 148 space travellers]. [[https://doi.org/10.1038/s41526-020-0103-2]]',
    'Watson et al. 2015. Sleep 38:843–844 [AASM/SRS adult sleep consensus]. [[https://doi.org/10.5665/sleep.4716]]',
    'Zeitlin et al. 2013. Measurements of energetic particle radiation in transit to Mars. Science 340:1080–4. [[https://doi.org/10.1126/science.1235989]]',
    'Zhang et al. 2020. First measurements of the radiation dose on the lunar surface. Sci Adv 6:eaaz1334. [[https://doi.org/10.1126/sciadv.aaz1334]]',
    'Zwart et al. 2014. Aviat Space Environ Med 85:897–904 [body mass change and the ISS mass-measuring devices]. [[https://doi.org/10.3357/ASEM.3979.2014]]',
  ]],
  ['Astronomy (Mission link)', [
    'Meeus. Astronomical Algorithms, 2nd ed., chapter 47: main distance terms of the lunar theory (cited as in vista.html; no URL given).',
    'Standish. Approximate Positions of the Planets: Keplerian elements, valid 1800–2050. JPL Solar System Dynamics. [[https://ssd.jpl.nasa.gov/planets/approx_pos.html]]',
    'NASA JPL Horizons ephemerides, used to check the Mission link model and in the self-test. [[https://ssd.jpl.nasa.gov/horizons/]]',
  ]],
  ['Software, fonts and standards', [
    'W3C. Web Content Accessibility Guidelines (WCAG) 2.2, level AA.',
    'Archivo font: [[https://github.com/Omnibus-Type/Archivo]]; Martian Mono font: [[https://github.com/evilmartians/mono]] (SIL Open Font License).',
    'Supabase (Postgres with row-level security): table public.reports as defined in supabase/reports.sql.',
  ]],
];
DOC.push({k: 'h1', text: '11 References', pageBreakBefore: true});
P('Sources are listed with the DOI or URL given in vista.html and docs/evidence. Where the evidence files give no paper title, a short description of the topic follows in square brackets. Each evidence file also lists every page and paper its researchers opened.');
for (const [group, items] of REFS) { DOC.push({k: 'h3', text: group}); DOC.push({k: 'refs', items}); }

/* ===================================================================================================================
   RENDERING
   =================================================================================================================== */
const border = {style: BorderStyle.SINGLE, size: 4, color: C.border};
const cellBorders = {top: border, bottom: border, left: border, right: border};
function cellParas(text, o = {}) {
  return String(text).split('\n').map(line => new Paragraph({spacing: {before: 0, after: 40, line: 252}, keepLines: true, keepNext: !!o.keepNext, children: runs(line, {size: o.size || SMALL, bold: o.bold, color: o.color})}));
}
function makeTable(b) {
  const sz = b.size || SMALL, together = b.rows.length <= 9; // short tables are kept on one page
  const headRow = new TableRow({tableHeader: true, cantSplit: true, children: b.head.map((h, i) => new TableCell({
    width: {size: b.widths[i], type: WidthType.DXA}, borders: cellBorders, verticalAlign: VerticalAlign.BOTTOM,
    shading: {fill: C.head, type: ShadingType.CLEAR, color: 'auto'}, margins: {top: 70, bottom: 70, left: 100, right: 100},
    children: cellParas(h, {size: sz, bold: true, color: 'FFFFFF', keepNext: true})}))});
  const rows = b.rows.map((r, ri) => new TableRow({cantSplit: true, children: r.map((c, i) => {
    const cell = typeof c === 'object' ? c : {text: c};
    const fill = cell.fill || (ri % 2 ? C.zebra : 'FFFFFF');
    return new TableCell({width: {size: b.widths[i], type: WidthType.DXA}, borders: cellBorders, verticalAlign: VerticalAlign.TOP,
      shading: {fill, type: ShadingType.CLEAR, color: 'auto'}, margins: {top: 60, bottom: 60, left: 100, right: 100},
      children: cellParas(cell.text, {size: sz, color: cell.fill ? '000000' : undefined, keepNext: together && ri < b.rows.length - 1})});
  })}));
  return new Table({width: {size: WIDTH, type: WidthType.DXA}, columnWidths: b.widths, layout: TableLayoutType.FIXED, rows: [headRow, ...rows]});
}
function makeBox(lines, o = {}) {
  const fill = o.warn ? C.warn : C.box, line = {style: BorderStyle.SINGLE, size: 8, color: o.warn ? C.warnLine : C.boxLine};
  const kids = [];
  if (o.title) kids.push(new Paragraph({spacing: {after: 60}, children: runs(`**${o.title}**`, {size: 19, color: C.h1})}));
  for (const l of lines) kids.push(new Paragraph({spacing: {after: 60, line: 264}, children: runs(l, {size: 19})}));
  return new Table({width: {size: WIDTH, type: WidthType.DXA}, columnWidths: [WIDTH], layout: TableLayoutType.FIXED, rows: [new TableRow({cantSplit: true, children: [
    new TableCell({width: {size: WIDTH, type: WidthType.DXA}, shading: {fill, type: ShadingType.CLEAR, color: 'auto'}, margins: {top: 120, bottom: 80, left: 180, right: 180},
      borders: {top: line, bottom: line, left: line, right: line}, children: kids})]})]});
}
const spacer = (after = 120) => new Paragraph({spacing: {before: 0, after}, children: []});
let olInstance = 0;
function render(blocks) {
  const out = [];
  for (const b of blocks) {
    if (b.k === 'h1') out.push(new Paragraph({heading: HeadingLevel.HEADING_1, pageBreakBefore: !!b.pageBreakBefore, children: runs(b.text, {size: 32, bold: true, color: C.h1})}));
    else if (b.k === 'h2') out.push(new Paragraph({heading: HeadingLevel.HEADING_2, children: runs(b.text, {size: 25, bold: true, color: C.h2})}));
    else if (b.k === 'h3') out.push(new Paragraph({heading: HeadingLevel.HEADING_3, children: runs(b.text, {size: 21, bold: true, color: C.h1})}));
    else if (b.k === 'p') out.push(new Paragraph({spacing: {after: 120, line: 276}, children: runs(b.text, {highlight: b.highlight})}));
    else if (b.k === 'eq') out.push(new Paragraph({spacing: {before: 40, after: 140}, indent: {left: 567}, children: runs(b.text, {italics: true, color: C.h1})}));
    else if (b.k === 'ul') b.items.forEach(it => out.push(new Paragraph({numbering: {reference: 'bullets', level: 0}, spacing: {after: 80, line: 276}, children: runs(it)})));
    else if (b.k === 'ol') { olInstance++; b.items.forEach(it => out.push(new Paragraph({numbering: {reference: 'numbers', level: 0, instance: olInstance}, spacing: {after: 80, line: 276}, children: runs(it)}))); }
    else if (b.k === 'refs') b.items.forEach(it => out.push(new Paragraph({spacing: {after: 70, line: 252}, indent: {left: 340, hanging: 340}, children: runs(it, {size: 18})})));
    else if (b.k === 'box') { out.push(makeBox(b.lines, b)); out.push(spacer(160)); }
    else if (b.k === 'break') out.push(new Paragraph({children: [new PageBreak()]}));
    else if (b.k === 'table') {
      out.push(new Paragraph({keepNext: true, spacing: {before: 200, after: 80}, children: runs(`**${b.caption}**`, {size: CAPTION, color: C.h1})}));
      out.push(makeTable(b));
      if (b.note) out.push(new Paragraph({spacing: {before: 60, after: 200, line: 252}, children: runs(b.note, {size: SMALL, italics: true, color: C.muted})}));
      else out.push(spacer(160));
    }
  }
  return out;
}

/* ---------- title page ---------- */
const titleBlocks = [
  new Paragraph({spacing: {before: 1800, after: 120}, children: runs('NASA SPACE APPS CHALLENGE 2026', {size: 20, bold: true, color: C.h2})}),
  new Paragraph({spacing: {after: 200}, children: runs('Vista: Research Documentation', {size: 60, bold: true, color: C.h1})}),
  new Paragraph({spacing: {after: 360}, border: {bottom: {style: BorderStyle.SINGLE, size: 12, color: C.accent, space: 12}}, children: runs('Astronaut health self-checks · NASA Space Apps Challenge 2026 · Team Void Voyagers', {size: 24, color: C.muted})}),
  new Paragraph({spacing: {after: 80}, children: runs('**Version 1.0** · 14 November 2026', {size: 22})}),
  new Paragraph({spacing: {after: 80}, children: runs('**Challenge:** Create Health Monitoring Software for Astronauts on Space Missions', {size: 22})}),
  new Paragraph({spacing: {after: 80}, children: runs('**Live app:** [[https://vista-health.vercel.app]] (Vercel) · mirror on Azure Static Web Apps: [[https://black-sky-0803de80f.8.azurestaticapps.net]]', {size: 22})}),
  new Paragraph({spacing: {after: 80}, children: runs('**Source code:** [[https://github.com/Ulugbek-netizen/vista]] (one HTML file, no dependencies, works offline)', {size: 22})}),
  new Paragraph({spacing: {after: 600}, children: runs('**Written for:** Space Apps judges and flight surgeons', {size: 22})}),
  makeBox(['Every number in this document comes from the team’s README, the app’s source code (vista.html), the six evidence files in docs/evidence, supabase/reports.sql, tools/anatomy.py or the developer’s notes on the features added on 14 November 2026. The source is named next to each value.', 'Where a rule or band comes from no published source, it is marked **design choice**. It is Vista’s own proposal and needs flight-surgeon sign-off before crew use.'], {title: 'How to read this document'}),
  spacer(200),
  makeBox(['Vista is a research and training prototype for the NASA Space Apps Challenge 2026. It does not diagnose or treat any condition and does not replace a crew medical officer, flight surgeon or doctor. The example data in the app is made up.'], {title: 'Not a medical device', warn: true}),
  new Paragraph({children: [new PageBreak()]}),
  new Paragraph({spacing: {after: 200}, children: runs('Contents', {size: 32, bold: true, color: C.h1})}),
  new TableOfContents('Contents', {hyperlink: true, headingStyleRange: '1-2', beginDirty: false}),
  new Paragraph({children: [new PageBreak()]}),
];

const footer = new Footer({children: [new Paragraph({border: {top: {style: BorderStyle.SINGLE, size: 4, color: C.border, space: 6}}, children: [
  ...runs('Vista: Research Documentation · Version 1.0 · Team Void Voyagers', {size: 16, color: C.muted}),
  new TextRun({font: FONT, size: 16, color: C.muted, children: [new PositionalTab({alignment: PositionalTabAlignment.RIGHT, relativeTo: PositionalTabRelativeTo.MARGIN, leader: PositionalTabLeader.NONE}), 'Page ', PageNumber.CURRENT, ' of ', PageNumber.TOTAL_PAGES]}),
]})]});
const header = new Header({children: [new Paragraph({alignment: AlignmentType.RIGHT, children: runs('NASA Space Apps Challenge 2026', {size: 16, color: C.muted})})]});
const empty = () => new Paragraph({children: []});

const doc = new Document({
  creator: 'Team Void Voyagers', lastModifiedBy: 'Team Void Voyagers',
  title: 'Vista: Research Documentation', subject: 'Astronaut health self-checks · NASA Space Apps Challenge 2026 · Team Void Voyagers',
  description: 'Research documentation for Vista, an astronaut health self-check app. Version 1.0, 14 November 2026.',
  keywords: 'Vista, NASA Space Apps Challenge 2026, astronaut health, self-checks, flight surgeon',
  styles: {
    default: {
      document: {run: {font: FONT, size: BODY, color: C.ink, language: {value: 'en-GB'}}, paragraph: {spacing: {after: 120, line: 276}}},
      heading1: {run: {font: FONT, size: 32, bold: true, color: C.h1}, paragraph: {spacing: {before: 360, after: 140}, keepNext: true, keepLines: true, border: {bottom: {style: BorderStyle.SINGLE, size: 6, color: C.accent, space: 4}}}},
      heading2: {run: {font: FONT, size: 25, bold: true, color: C.h2}, paragraph: {spacing: {before: 260, after: 100}, keepNext: true, keepLines: true}},
      heading3: {run: {font: FONT, size: 21, bold: true, color: C.h1}, paragraph: {spacing: {before: 200, after: 80}, keepNext: true, keepLines: true}},
      hyperlink: {run: {color: C.link, underline: {}}},
    },
    paragraphStyles: [
      {id: 'TOC1', name: 'toc 1', basedOn: 'Normal', next: 'Normal', run: {font: FONT, size: 21, bold: true, color: C.h1}, paragraph: {spacing: {before: 120, after: 40}}},
      {id: 'TOC2', name: 'toc 2', basedOn: 'Normal', next: 'Normal', run: {font: FONT, size: 20, color: C.ink}, paragraph: {spacing: {before: 0, after: 30}, indent: {left: 340}}},
    ],
  },
  numbering: {config: [
    {reference: 'bullets', levels: [{level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: {paragraph: {indent: {left: 360, hanging: 260}}}}]},
    {reference: 'numbers', levels: [{level: 0, format: LevelFormat.DECIMAL, text: '%1.', alignment: AlignmentType.LEFT, style: {paragraph: {indent: {left: 360, hanging: 300}}}}]},
  ]},
  sections: [{
    properties: {titlePage: true, page: {size: {width: PAGE_W, height: 16838}, margin: {top: 1300, bottom: 1300, left: MARGIN, right: MARGIN, header: 600, footer: 600}}},
    headers: {default: header, first: new Header({children: [empty()]})},
    footers: {default: footer, first: new Footer({children: [empty()]})},
    children: [...titleBlocks, ...render(DOC)],
  }],
});

fs.mkdirSync(path.dirname(OUT), {recursive: true});
fs.writeFileSync(OUT, await Packer.toBuffer(doc));
console.log('wrote', OUT, `(${tableNo} tables)`);

/* ---------- plain-text copy for fact-checkers ---------- */
if (TXT) {
  const L = [];
  L.push('VISTA: RESEARCH DOCUMENTATION', 'Astronaut health self-checks · NASA Space Apps Challenge 2026 · Team Void Voyagers', 'Version 1.0 · 14 November 2026',
    'Challenge: Create Health Monitoring Software for Astronauts on Space Missions',
    'Live app: https://vista-health.vercel.app (Vercel) · mirror on Azure Static Web Apps: https://black-sky-0803de80f.8.azurestaticapps.net',
    'Source code: https://github.com/Ulugbek-netizen/vista (one HTML file, no dependencies, works offline)', 'Written for: Space Apps judges and flight surgeons', '',
    'How to read this document',
    'Every number in this document comes from the team’s README, the app’s source code (vista.html), the six evidence files in docs/evidence, supabase/reports.sql, tools/anatomy.py or the developer’s notes on the features added on 14 November 2026. The source is named next to each value.',
    'Where a rule or band comes from no published source, it is marked design choice. It is Vista’s own proposal and needs flight-surgeon sign-off before crew use.', '',
    'Not a medical device',
    'Vista is a research and training prototype for the NASA Space Apps Challenge 2026. It does not diagnose or treat any condition and does not replace a crew medical officer, flight surgeon or doctor. The example data in the app is made up.', '',
    'CONTENTS', ...DOC.filter(b => b.k === 'h1' || b.k === 'h2').map(b => (b.k === 'h2' ? '    ' : '') + b.text), '');
  let n = 0;
  for (const b of DOC) {
    if (b.k === 'h1') L.push('', '='.repeat(b.text.length), b.text.toUpperCase(), '='.repeat(b.text.length), '');
    else if (b.k === 'h2') L.push('', b.text, '-'.repeat(b.text.length));
    else if (b.k === 'h3') L.push('', b.text);
    else if (b.k === 'p') L.push(plain(b.text), '');
    else if (b.k === 'eq') L.push('    ' + plain(b.text), '');
    else if (b.k === 'ul') { b.items.forEach(it => L.push('- ' + plain(it))); L.push(''); }
    else if (b.k === 'ol') { b.items.forEach((it, i) => L.push(`${i + 1}. ${plain(it)}`)); L.push(''); }
    else if (b.k === 'refs') { b.items.forEach(it => L.push('- ' + plain(it))); }
    else if (b.k === 'box') { if (b.title) L.push(`[${b.title}]`); b.lines.forEach(l => L.push('  ' + plain(l))); L.push(''); }
    else if (b.k === 'table') {
      L.push(b.caption);
      L.push('| ' + b.head.map(plain).join(' | ') + ' |');
      for (const r of b.rows) L.push('| ' + r.map(c => plain(typeof c === 'object' ? c.text : c).replace(/\n/g, ' / ')).join(' | ') + ' |');
      if (b.note) L.push('Note: ' + plain(b.note));
      L.push('');
    }
    n++;
  }
  fs.writeFileSync(TXT, L.join('\n').replace(/\n{3,}/g, '\n\n') + '\n', 'utf8');
  console.log('wrote', TXT);
}
