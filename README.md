# The AI Generation

An interactive evidence map of how generative AI is changing how U.S. teens (ages 13–17) learn, think and decide, with a New York City lens. It separates what is measured from what is assumed.

> Status: engineering foundation. Research content is added in later commits; the full README, findings and limitations arrive with the final documentation commit.

## Principles

- Every figure traces to a primary source and states who was asked.
- No inferential statistics, synthetic indices or merged datasets: the public evidence is aggregate only.
- Different surveys are shown side by side, never as a trend.
- Evidence classes (direct, representative, contextual, limited, evidence gap) are categories, not scores.

## Stack

Next.js (App Router) · React · TypeScript · Tailwind CSS · D3 · Framer Motion · Lucide. A small Python pipeline validates research data and emits the JSON the site reads.

## Run locally

Requires Node 20.9+ (developed on Node 22).

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run typecheck
npm run build
```

## Structure

```text
app/                    routes, layout, bundled fonts (OFL)
components/
  ui/                   layout primitives (Section, SectionHeader, DataPending)
  evidence/             EvidenceChip, SourceAttribution, Statistic
  sections/             story chapters
  visualizations/       chart components
lib/                    shared types and formatting
styles/                 design tokens and global styles
public/                 static assets
```

## Fonts

Newsreader and Atkinson Hyperlegible Next, both under the SIL Open Font License 1.1 (licenses in `app/fonts/`).
