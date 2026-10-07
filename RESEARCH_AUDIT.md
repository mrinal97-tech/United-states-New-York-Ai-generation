# Research Audit — Phase 1

**Project:** THE AI GENERATION
**Audit date:** 2026-10-07
**Files:** `data/source-registry.json` (8 sources) · `research/evidence.jsonl` → `data/evidence.json` (85 evidence points, 80 cleared for display) · `research/build_evidence.py` (validator)

---

## Bottom line

1. **What teens do with AI is well measured.** Two probability-based national surveys (Pew, n=1,458; Common Sense/NORC, n=1,017) plus RAND's youth panel give solid, recent descriptive data on adoption, purposes, and schoolwork use.
2. **What AI does to teens' thinking is not measured at all for U.S. teens.** Every "critical thinking" number in this space is a self-perception ("I come up with fewer of my own ideas") or a belief about students in general ("AI will harm critical thinking"). No audited source measures a teen's critical thinking, idea generation, or learning.
3. **No public respondent-level data exists for any of the U.S. teen surveys.** Pew's 2025 teen microdata is not yet released, Common Sense has no public dataset, and RAND AYP access is unconfirmed. Under the project's statistical-analysis rule, **no inferential statistics can be run in this project today.**
4. **The only causal evidence is not about U.S. teens or critical thinking.** Bastani et al. (PNAS, 2025) is a randomized experiment showing an unrestricted GPT-4 tutor lowered later math performance for high schoolers in one Turkish school, while a safeguarded tutor largely did not.
5. **There is no representative NYC student data.** NYC evidence is policy documents plus a self-selected feedback survey dominated by educators and parents.

The evidence-map framing holds up. The gap is the finding.

---

## Source audit table

| Source | Population | N | Geography | Method | Key variables | Microdata | Can compare? | Limitations |
|---|---|--:|---|---|---|---|---|---|
| **Pew** — Teens, Social Media and AI Chatbots 2025 (Dec 9, 2025) | U.S. teens 13–17 living with a parent | 1,458 | U.S. | Ipsos KnowledgePanel, probability, weighted; MOE ±3.3 | Chatbot use, frequency, which chatbots; by race, age, income | Not released (checked 2026-10-07) | Same survey as Pew Feb 2026 → yes, internally | Self-report; first year asked; Asian teens not broken out |
| **Pew** — How Teens Use and View AI (Feb 24, 2026) | Same survey + parents | 1,458 | U.S. | Same | 8 use purposes, share of schoolwork, school tasks, helpfulness, cheating, AI impact views, confidence | Not released | Internally yes; vs Common Sense only side-by-side | Many items asked only of users (n=894) or schoolwork users (n=766); no cognition outcome |
| **Common Sense Media / NORC** — Teens in the AI Era: Schoolwork and Skills That Matter (2026) | U.S. teens 13–17 | 1,017 (665 schoolwork AI users) | U.S. | 682 probability (AmeriSpeak, 11.7% cumulative RR) + 335 nonprobability (Prodege), TrueNorth calibration; MOE ±4.3 | AI for schoolwork, answer-getting modes, first action when stuck, self-perceived learning and idea generation, teacher AI discussions | None public | Side-by-side only (different wording, timing, sampling) | Attitude items are among users only; hybrid sample; two internal inconsistencies (see below) |
| **RAND** — More Students Use AI for Homework… (Mar 17, 2026) | Enrolled U.S. youth **12–29** (MS 184, HS 738, college 292) | 1,214 | U.S. | RAND American Youth Panel (probability-based ALP), weighted | AI homework use, purposes, cheating views, school rules, **belief** that AI harms critical thinking; respondent-level regression by RAND | Unknown — contact RAND Survey Panels | HS subgroup only for teen claims | Headline numbers are not teen-only; trend waves not directly comparable |
| **NYC Public Schools** — AI Public Feedback Survey (survey closed May 8, 2026) | Self-selected respondents to draft guidance | 6,491 | NYC | Anonymous open online link; NYCPS: "not a scientific sample"; duplicates possible | Top concerns, clarity, requested resources, by stakeholder group | Aggregates only | Not comparable to anything | Educators 47%, parents 44% of respondents; not student evidence |
| **NYC policy timeline** (Mar–Sep 2026) | Policy | — | NYC | Press release + news reporting | Guidance release, delay, K–8 moratorium | n/a | n/a | Moratorium details from ABC News; confirm with NYCPS |
| **Bastani et al., PNAS 2025** | High school math students, one school | ~1,000 | Turkey | Randomized field experiment | Practice vs post-removal exam performance under two AI tutor designs | Unknown | No — contextual only | Not U.S.; one subject; measures math learning, not critical thinking |
| **Pew** — ChatGPT for schoolwork (Jan 15, 2025) | U.S. teens 13–17 | not verified | U.S. | Pew teens survey | Used ChatGPT for schoolwork (26%, 2024) | Unknown | **No** — ChatGPT-only wording vs "any chatbot" | Registered but **not yet verified**; no evidence points use it |

---

## Corrections to the build prompt's assumptions

These change what the site can say. Each one is enforced in `evidence.jsonl`.

1. **The 38% / 39% / 66% figures are not "teens."** They are among teens who use AI for schoolwork (n=665). That is roughly 70% of teens, so "38%" is about a quarter of all teens. Copy must say "of teens who use AI for schoolwork."
2. **64% (Pew) and 70% (Common Sense) are different measures**, not a trend. Pew asks whether teens ever use an AI chatbot; Common Sense asks whether they use any AI tool for schoolwork, seven months later, with a different sample. Pew's own schoolwork number is 54%. Show them side by side with definitions; never connect them with a line.
3. **RAND's 62% and 67% include college students up to age 29.** For teens, use the high-school subgroup (63% use AI for homework; 65% agree AI harms critical thinking). Both high-school values were read from chart labels and are flagged `needs-check`.
4. **RAND's critical-thinking item is a belief about students in general**, not a measurement of the respondent's critical thinking. The title "More Believe It Harms Critical Thinking" is accurate; "AI harms critical thinking" is not.
5. **The only respondent-level link between AI use and a critical-thinking variable** is RAND's own regression, and it runs the other way. Students who *don't* believe AI harms critical thinking, and whose schools allow AI, use it more. It is correlational and about beliefs.
6. **Common Sense internal inconsistencies:** the press release says 27% of teens discussed safe AI use with a teacher, while the report says 30%. Separately, a users-vs-non-users skills comparison (fact-checking 31% vs 19%) can't be reconciled with the overall 50% on the same item. This audit uses the report's 30% and excludes the subgroup comparison.
7. **NYC has a major development the prompt doesn't mention:** NYCPS reportedly began 2026–27 with a generative-AI moratorium for students in 2-K through grade 8. The source is news reporting only, so it is flagged for confirmation. High schoolers, who are most 13–17-year-olds, appear not to be covered.
8. **Even when Pew releases microdata, it won't answer the critical-thinking question.** It contains no cognition or learning outcome. It would enable cross-tabs like schoolwork reliance × confidence × demographics.

---

## Research question answerability

| RQ | Question | Verdict | Basis |
|---|---|---|---|
| RQ1 | How prevalent is AI use? | **Answerable** (representative) | Pew 64%; frequency; age, race and income splits |
| RQ2 | What do they use it for? | **Answerable** (representative) | Pew 8 purposes, all-teen base |
| RQ3 | How much for schoolwork? | **Answerable, with measure differences shown** | Pew 54% ever / 10% all-or-most; CSM 70%; RAND HS 63% (needs check) |
| RQ4 | Behaviors suggesting offloading? | **Partially** (direct self-report) | CSM: 63% get answers (25% as-is), 10% go to AI first when stuck. Verification of AI output is **not measured** |
| RQ5 | What do teens report about learning? | **Answerable as perception** | CSM 66 / 51 / 39 / 38 (users); Pew helpfulness 26% |
| RQ6 | Evidence on critical-thinking outcomes? | **Perceptions only** | RAND belief items; Pew coded open-end (34% of the 354 pessimists) |
| RQ7 | Can we show causation? | **Insufficient evidence** for U.S. teens | One non-U.S. RCT on math learning (contextual) |
| RQ8 | Demographic differences? | **Answerable within-study only** | Pew race, age, income; RAND gender, grade |
| RQ9 | What about NYC? | **Policy and non-scientific feedback only** | NYCPS survey (limited) + policy timeline. No NYC student data |
| RQ10 | What's missing? | **Five documented gaps** | Causal CT, longitudinal, AI-literacy moderation, verification behavior, decision reliance, NYC students |

---

## Statistical analysis decision

The prompt's rule requires respondent-level data with AI use and a cognition or learning variable from the same population. **No audited source meets it.** Therefore:

- No correlations, regressions, synthetic indices, or confidence intervals will be computed by this project.
- Where sources report a margin of error (Pew ±3.3, Common Sense ±4.3, full sample only), the site may display it attributed to the source. Subgroup margins are larger and unreported, so they must not be invented.
- RAND's regression may be reported as RAND's finding, with its correlational caveat.

---

## Verification queue (blocked from display until resolved)

| Evidence id | Issue | How to resolve |
|---|---|---|
| `pew-chatbot-daily` (28%) | Category values come from AP reporting | Check Pew Dec 2025 topline; otherwise display Pew's wording "about three-in-ten" |
| `rand-hw-highschool` (63%) | Read from chart labels | Check RAND Figure 1 |
| `rand-ct-belief-highschool` (65%) | Read from chart labels | Check RAND Figure 2 |
| `nyc-policy-delay` | Chalkbeat reporting | Council hearing record or NYCPS statement |
| `nyc-policy-moratorium` | ABC News reporting | Official NYCPS announcement |
| `pew-2025-01-chatgpt-schoolwork` (source) | Not verified | Fetch Pew short read |
| NYCPS per-group concern columns | Column order unclear in extraction | Read the table on the NYCPS page directly; also get the student respondent count |

---

## Implications for the story (Phase 3 input)

- **Supported as written:** Hero, The Shift (64%), What are they using AI for (Pew 8 purposes), The Schoolwork Shift (with measure definitions), Answer vs Thinking (CSM's own answer/non-answer split maps onto the conceptual spectrum), What Teens Report (with the user-base caveat), What We Cannot Say, Evidence Gap, NYC (policy + feedback), Proposed Measurement Framework, Methodology, Source Explorer.
- **Change Section 07's evidence-strength bars.** Bars of different lengths read as magnitudes no matter how they are captioned. Use discrete categorical chips (Representative → Direct self-report → Perception only → Contextual → Gap) instead. The classification is already in the data.
- **The age explorer from the earlier prompt shrinks to two bands.** Pew provides 13–14 vs 15–17 for use and daily use only, and RAND provides grade bands. There is no purpose-by-age data, so render the rest as an explicit gap.
- **Pew's own critical-thinking signal is small and should be presented that way.** 34% of the ~25% of teens who expect AI to harm society cite overreliance. That's a striking detail, but it covers under one in ten teens overall.

---

## Next steps

1. Clear the verification queue (about 30 minutes of manual checking).
2. Phase 2: start the repo (commit 01, Next.js init), then commit the docs, registry and evidence in the planned order.
3. Optional data lead: email RAND Survey Panels about AYP data access, and set a reminder to recheck Pew's datasets page for the 2025 teen survey.

## Sources

- Pew Research Center, *Teens, Social Media and AI Chatbots 2025* — https://www.pewresearch.org/internet/2025/12/09/teens-social-media-and-ai-chatbots-2025/
- Pew Research Center, *How Teens Use and View AI* and topline — https://www.pewresearch.org/internet/2026/02/24/how-teens-use-and-view-ai/
- Pew Research Center, Datasets — https://www.pewresearch.org/datasets/
- Common Sense Media, *Teens in the AI Era: Schoolwork and Skills That Matter* — https://www.commonsensemedia.org/sites/default/files/research/report/commonsensemedia_teensaischoolworkskills_2026.pdf
- RAND, RR-A4742-1 — https://www.rand.org/pubs/research_reports/RRA4742-1.html
- NYC Public Schools, AI Public Feedback Survey — https://www.schools.nyc.gov/school-life/school-environment/artificial-intelligence-public-feedback-survey
- NYC Public Schools press release, 2026-03-24 — https://www.schools.nyc.gov/home/2026/03/24/new-york-city-public-schools-announces-release-of-ai-guidance-for-educators-and-school-leaders
- Chalkbeat New York, 2026-06-24 — https://www.chalkbeat.org/newyork/2026/06/24/nyc-education-department-delays-ai-guidance-after-backlash/
- ABC News / GMA, 2026-09-02 — https://www.goodmorningamerica.com/news/story/new-york-city-public-schools-banning-ai-middle-136134872
- Bastani et al., PNAS 2025 — https://doi.org/10.1073/pnas.2422633122
