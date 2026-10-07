import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { evidence } from "@/lib/evidence";
import { VERIFICATION_LABELS } from "@/lib/evidence-classes";
import { canDisplay } from "@/lib/format";
import { auditDate, sources } from "@/lib/sources";

/**
 * Plain descriptions of withheld items. Their claim text is not printed
 * because it contains unverified numbers. Every withheld id must be listed
 * here, or the build fails.
 */
const WITHHELD_DESCRIPTIONS: Record<string, string> = {
  "pew-chatbot-daily": "Pew: exact share of teens who use chatbots daily (category values seen only in news reporting)",
  "rand-hw-highschool": "RAND: high-school students’ AI homework use (read from a chart label)",
  "rand-ct-belief-highschool": "RAND: high-school students’ belief that AI harms critical thinking (read from a chart label)",
  "nyc-policy-delay": "NYC: June 2026 delay of final AI guidance (news reporting only)",
  "nyc-policy-moratorium": "NYC: 2026–27 generative-AI moratorium for 2-K through grade 8 (news reporting only)",
};

const withheld = evidence.filter((e) => !canDisplay(e));
const sourced = evidence.filter((e) => e.sourceId !== null).length;
for (const w of withheld) {
  if (!WITHHELD_DESCRIPTIONS[w.id]) throw new Error(`Withheld evidence ${w.id} needs a description in Methodology`);
}

const LIMITATIONS: { title: string; body: string }[] = [
  {
    title: "Correlation is not causation",
    body: "Every survey here is observational. Even RAND’s regression shows only which beliefs and school rules go together with AI use, not what causes what.",
  },
  {
    title: "Self-report",
    body: "Teens report their own use, learning and idea generation. People misremember, and some answers may reflect what seems acceptable to say.",
  },
  {
    title: "Sampling",
    body: "Pew and RAND use probability-based panels. Common Sense combines a probability panel with a nonprobability one. NYC’s feedback survey was self-selected and may contain duplicates.",
  },
  {
    title: "Snapshots, not trajectories",
    body: "All teen surveys are cross-sectional. Nothing here follows the same teens over time, so long-term effects cannot be observed.",
  },
  {
    title: "Measuring beliefs, not abilities",
    body: "No audited source tests a teen’s critical thinking. “Fewer of my own ideas” and “AI harms critical thinking” are perceptions.",
  },
  {
    title: "National is not local",
    body: "National figures are never used as New York City estimates. NYC evidence is limited to policy and public feedback.",
  },
  {
    title: "No indices or validated scales",
    body: "This project builds no composite scores. The spectrum and measurement framework shown are proposals, not measured scales.",
  },
];

export function Methodology() {
  return (
    <>
      <Section
        id="methodology"
        labelledBy="methodology-title"
        margin={<p>Source audit completed {auditDate}. The full audit is in the project repository.</p>}
      >
        <SectionHeader
          id="methodology-title"
          title="Methodology"
          dek="How sources were chosen, how every figure was checked, and why this project runs no statistical models."
        />
        <div className="space-y-12">
          <p className="border-l-2 border-ink pl-5 text-lede text-pretty">
            Research integrity rule: incompatible aggregate statistics were not combined into artificial datasets or
            indices.
          </p>

          <div className="space-y-5">
            <h3 className="text-h3 font-medium">Sources</h3>
            <p className="text-pretty">
              The audit started from primary research organizations (Pew Research Center, Common Sense Media, RAND,
              NYC Public Schools) and peer-reviewed studies. News articles were used only to find primary sources or,
              where nothing else exists, for clearly labeled policy events. {sources.length} sources are registered;
              each lists its population, sample, method, variables and limitations in the source explorer below.
            </p>
          </div>

          <div className="space-y-5">
            <h3 className="text-h3 font-medium">Checking every figure</h3>
            <p className="text-pretty">
              The project holds {evidence.length} evidence points: {sourced} figures and findings from the sources,
              each entered with its exact question wording and the people who answered it and checked against the
              original report or topline, plus {evidence.length - sourced} evidence gaps recorded by the audit. A validation pipeline rejects
              figures without a source, without a recorded question, outside 0–100%, or with a respondent count
              larger than the study’s sample. {evidence.length - withheld.length} points are shown;{" "}
              {withheld.length} are withheld until verified:
            </p>
            <ul className="space-y-2 font-sans text-note">
              {withheld.map((w) => (
                <li key={w.id} className="border-l border-dashed border-graphite pl-3">
                  <span className="text-ink">{WITHHELD_DESCRIPTIONS[w.id]}</span>
                  <span className="block text-graphite">{VERIFICATION_LABELS[w.verification]}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-5">
            <h3 className="text-h3 font-medium">Why there are no statistical models</h3>
            <p className="text-pretty">
              Correlations, regressions and confidence intervals need respondent-level data: the AI use and the
              outcome of the same person. No public respondent-level data was found for the U.S. teen surveys used
              here, and the published reports contain only totals. Combining percentages from different surveys would mix different
              people, questions and dates into one invented dataset. So the site reports each study’s own figures,
              keeps them separate, and shows where they stop.
            </p>
            <p className="text-pretty">
              Causal claims require experiments or long-term data. The one experiment found is shown as context, and
              no claim on this site says AI causes changes in how teens think.
            </p>
          </div>
        </div>
      </Section>

      <Section id="limitations" labelledBy="limitations-title">
        <SectionHeader
          id="limitations-title"
          title="Limitations"
          dek="Read every figure on this page with these in mind."
        />
        <dl className="grid gap-x-10 gap-y-8 border-t-2 border-ink pt-8 sm:grid-cols-2">
          {LIMITATIONS.map((l) => (
            <div key={l.title}>
              <dt className="font-sans text-ui font-semibold text-ink">{l.title}</dt>
              <dd className="mt-2 text-pretty">{l.body}</dd>
            </div>
          ))}
        </dl>
      </Section>
    </>
  );
}
