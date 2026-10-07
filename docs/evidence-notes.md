# Evidence notes

How each source's evidence points were entered into `research/evidence.jsonl`. Every row records the exact question wording, the respondent base, the evidence class and the verification status. Values come from the source's report or topline; sums noted below were checked against the topline categories.

## Pew Research Center (35 points)

Sources: *Teens, Social Media and AI Chatbots 2025* and *How Teens Use and View AI* (same survey, n=1,458 teens 13–17, Sept 25–Oct 9 2025, MOE ±3.3).

- **Base:** all rows use the all-teen base unless stated. Pew asks many items only of chatbot users (n=894) or schoolwork users (n=766); the all-teen figure is entered and the user-base figure is noted in the `question` field.
- **Combined categories:** "extremely or very" and similar groupings are sums of topline categories, recorded in `question` (e.g. helpfulness 8 + 18 = 26).
- **Within-survey comparisons only:** age, race/ethnicity and income rows carry `compareWith` so they are shown against their own counterpart, never against another survey.
- **Held back:** `pew-chatbot-daily` (28%) uses category values from AP reporting and is `secondary-only`; the site uses Pew's own wording ("about three-in-ten") until the topline is checked.
- **Not a cognition measure:** `pew-overreliance-reason` (34%) is a coded open-end among the 354 teens who expect AI to harm society.

## Common Sense Media / NORC (20 points)

Source: *Teens in the AI Era: Schoolwork and Skills That Matter* (n=1,017 teens 13–17, Apr 30–May 14 2026, hybrid probability/nonprobability sample, MOE ±4.3).

- **Two bases.** Use, first-action and skills items are among all teens (n=1,017). How-teens-use-AI and attitude items are among teens who use AI for schoolwork (n=665). Every row's `claim` text carries its base, so "38%" can only appear as "of teens who use AI for schoolwork say they come up with fewer of their own ideas".
- **Multi-select items** (ways of using AI, teacher discussion topics, skills) overlap and must never be summed or stacked.
- **Report over press release:** the teacher-safety item uses the report's 30%, not the press release's 27%.
- **Excluded:** the users-vs-non-users skills comparison, which conflicts with the overall figure for the same item.

## RAND American Youth Panel (11 points)

Source: *More Students Use AI for Homework, and More Believe It Harms Critical Thinking* (n=1,214 enrolled youth ages 12–29, Dec 2025–Jan 2026).

- **Not teen-only.** Headline rows (62% homework use, 67% critical-thinking belief) cover middle school through college and say so in their `base`.
- **Held back:** high-school values `rand-hw-highschool` (63%) and `rand-ct-belief-highschool` (65%) were read from chart labels and are `needs-check`.
- **Belief, not ability.** All critical-thinking rows measure agreement that AI use *will harm* students' critical thinking.
- **RAND's own regression** is entered as text (`rand-regression`): correlational, about beliefs and school rules, with no effect sizes in the report.

## New York City (12 points)

Sources: NYC Public Schools *AI Public Feedback Survey* (6,491 self-selected responses, Mar 25–May 8 2026) and the 2026 NYCPS AI policy timeline.

- **Every feedback row is `limited`** and its base is "self-selected respondents". Figures are attributed to respondents to the NYCPS public-feedback survey, never to NYC students, parents or educators as populations.
- **Respondent mix:** educators 47%, parents/families 44% (multi-select). The number of student respondents is not verified; the student cognitive-development value is excluded until the page's table columns are checked.
- **Policy timeline:** the March 2026 guidance release is verified from NYCPS. The June 2026 delay (Chalkbeat) and the 2026–27 moratorium for 2-K through grade 8 (ABC News) are `secondary-only` and appear only as "Policy report — verification pending".

## Pipeline

`research/build_evidence.py` validates every row (required fields, duplicate ids, percentage ranges, base sizes against the source sample, citations, methodology) and joins source metadata to produce `data/evidence.json`. Rows that are `needs-check` or `secondary-only` get `displayable: false`.

## Experimental context (1 point)

Source: Bastani et al., *Generative AI without guardrails can harm learning*, PNAS 2025: a randomized field experiment with nearly 1,000 high school math students in one Turkish school.

- The 17% is a **relative** reduction in grades after AI access was removed for the unrestricted GPT-4 condition (`unit: percent-relative`), not a share of students.
- Classed **contextual**: not U.S., one subject, math learning rather than critical thinking. The safeguarded tutor largely avoided the effect.

## Evidence gaps (6 points)

Gap rows have no source and no value (`evidence-gap`, `audit-finding`). They record questions the audit could not answer: causal effects on critical thinking, long-term effects, AI-literacy moderation, verification behavior, decision reliance and NYC student evidence.
