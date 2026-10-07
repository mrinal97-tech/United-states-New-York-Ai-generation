# Research framework

This document defines what the project asks, how evidence is classified, and the rules every claim on the site must follow. It is the reference for every later commit.

## Central question

How is generative AI changing the way young people in the United States learn, think, generate ideas and make decisions, and what do we actually know versus what are we assuming?

**Population:** U.S. adolescents ages 13–17. **Lens:** New York City, kept separate from national evidence.

**Working thesis:** AI adoption among young people is moving faster than our ability to measure its long-term cognitive effects. The project tests this thesis rather than assuming harm; it shows where AI appears to help, where teens report offloading, and where evidence is missing.

## Research questions

| ID | Question |
|---|---|
| RQ1 | How prevalent is AI use among U.S. adolescents? |
| RQ2 | What are young people using generative AI for? |
| RQ3 | How much are young people using AI for schoolwork? |
| RQ4 | Which directly measured behaviors suggest cognitive offloading? |
| RQ5 | What do young people themselves report about AI's effect on their learning? |
| RQ6 | What evidence exists about AI and critical-thinking-related outcomes among adolescents? |
| RQ7 | Can we determine whether AI use causes changes in critical thinking? |
| RQ8 | What demographic differences exist, within a single study? |
| RQ9 | What do we know specifically about New York City? |
| RQ10 | What evidence is still missing? |

Each question's verdict from the Phase 1 audit is stored in `data/research-questions.json`.

## Evidence classes

Every evidence point carries exactly one class. Classes are **categories, not scores**. The site never encodes them as length, size, position on a scale or a number.

| Class | Meaning |
|---|---|
| **Direct evidence** | The target population answered the relevant question themselves (e.g. teens reporting how they use AI for schoolwork). |
| **Representative** | Comes from a study with a credible representative sampling design for its stated population. |
| **Contextual** | Useful but does not measure the target population or outcome directly (e.g. a non-U.S. experiment, a policy document). |
| **Limited** | Small, self-selected, non-representative or indirectly measured. |
| **Evidence gap** | Available evidence cannot answer the question. A gap is a finding, shown on purpose. |

A point can be both direct and representative in substance; the class records the property that matters most for interpreting that specific claim.

## Verification status

| Status | Displayed? |
|---|---|
| `verified-primary` | Yes. Checked against the original report or topline. |
| `audit-finding` | Yes. A conclusion of the source audit itself (used for evidence gaps). |
| `needs-check` | No. Read from a chart or otherwise not yet confirmed. |
| `secondary-only` | No numbers. Policy events may be mentioned only with the label "Policy report — verification pending". |

## Claim rules

These rules are enforced in data, in components and in review.

1. **Keep the denominator.** A figure is always stated with who was asked. Common Sense's 38%, 39% and 66% are among *teens who use AI for schoolwork* (n=665), never "teens".
2. **Different surveys are not a trend.** Pew's 64% (any chatbot use) and Common Sense's 70% (AI for schoolwork) are different measures from different instruments. They are shown side by side, never connected by a line or ordered in time. Pew's comparable schoolwork figure is 54%.
3. **Beliefs are not measurements.** RAND's critical-thinking item measures what students believe about AI's effect on students in general. It is described as a perception.
4. **Respect the population.** RAND's headline figures include students up to age 29 and are labeled as such. Teen-specific RAND values are shown only after verification.
5. **Experiments are context.** The only causal evidence found (Bastani et al., PNAS 2025) is one Turkish high school, one subject and a math-learning outcome. It appears under "What experiments tell us" and is never used to make claims about U.S. adolescents' critical thinking.
6. **NYC respondents are not NYC students.** NYC Public Schools' feedback survey was anonymous, self-selected and not a scientific sample. Its figures are always attributed to "respondents to the NYCPS public-feedback survey".
7. **Comparisons stay within one study.** Demographic differences are shown only when the same survey reports both groups.
8. **Multi-select items are never summed or stacked** as if they were shares of a whole.

## What this project does not do

The public evidence for U.S. teens is aggregate only; no respondent-level dataset is available. Therefore the project performs **no inferential statistics**:

- no correlations, regressions, p-values or computed confidence intervals
- no moderation, prediction or causal modeling
- no synthetic datasets built by merging surveys
- no composite indices or scores (no "cognitive offloading index", "critical thinking score" or similar)

Margins of error are shown only where a source reports them, and only for the sample they describe. Findings that sources computed themselves, such as RAND's correlational regression, are reported as the source's finding with its caveats.

A conceptual structure may appear only when labeled **Proposed measurement framework**, never as measured data.
