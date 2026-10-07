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

