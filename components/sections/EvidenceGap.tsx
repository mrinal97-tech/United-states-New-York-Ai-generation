import { EvidenceNote } from "@/components/evidence/EvidenceNote";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { EvidenceMap } from "@/components/visualizations/EvidenceMap";
import { evidence } from "@/lib/evidence";

const gaps = evidence.filter((e) => e.evidenceStrength === "evidence-gap");

const CAN_SAY = [
  "Most U.S. teens use AI chatbots.",
  "Many teens use AI for schoolwork.",
  "Among teens who use AI for schoolwork, many get answers from it, and many use it without getting answers.",
  "Some of those teens say they come up with fewer of their own ideas because AI is available.",
];
const CANNOT_SAY = [
  "AI causes poor critical thinking.",
  "AI makes teenagers less intelligent.",
  "Heavy AI users will lose critical-thinking ability.",
];
const DO_NOT_KNOW = [
  "What happens after years of relying on AI.",
  "Whether teaching AI literacy changes how teens use it.",
  "How often teens check what AI tells them.",
];

const FRAMEWORK: { area: string; items: string[] }[] = [
  { area: "AI exposure", items: ["Frequency", "Duration", "Platform", "Purpose", "School vs personal use"] },
  {
    area: "Cognitive behavior",
    items: [
      "Attempts the task before using AI",
      "Generates own ideas",
      "Verifies AI output",
      "Compares alternatives",
      "Challenges AI",
      "Accepts AI recommendations",
    ],
  },
  { area: "Learning", items: ["Understanding", "Retention", "Confidence", "Can explain the work without AI"] },
  {
    area: "Decision-making",
    items: ["Uses AI recommendations", "Independent judgment", "Generates alternatives", "Checks before deciding"],
  },
  { area: "Context", items: ["Grade", "Age band", "School AI rules", "AI literacy instruction", "Access to devices"] },
];

function ClaimList({ title, items, kind }: { title: string; items: string[]; kind: "can" | "cannot" | "unknown" }) {
  const border = kind === "can" ? "border-ink" : "border-dashed border-graphite";
  return (
    <div className={`border-t-2 pt-4 ${border}`}>
      <h3 className="font-sans text-ui font-semibold text-ink">{title}</h3>
      <ul className="mt-3 space-y-3">
        {items.map((i) => (
          <li key={i} className="text-body text-pretty">
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function EvidenceGap() {
  return (
    <>
      <Section
        id="the-limit"
        labelledBy="the-limit-title"
        margin={<p>“Cannot say” means the evidence does not support the claim, not that the claim is false.</p>}
      >
        <SectionHeader
          id="the-limit-title"
          title="The data has a limit"
          dek="Everything above supports a few careful statements. It does not support the ones that make headlines."
        />
        <div className="grid gap-10 md:grid-cols-3">
          <ClaimList title="We can say" items={CAN_SAY} kind="can" />
          <ClaimList title="We cannot say" items={CANNOT_SAY} kind="cannot" />
          <ClaimList title="We do not yet know" items={DO_NOT_KNOW} kind="unknown" />
        </div>
      </Section>

      <Section
        id="evidence-map"
        labelledBy="evidence-map-title"
        margin={
          <p>
            The evidence is strongest on what teens do with AI and weakest on what AI does to their thinking, the
            questions in the middle of this list.
          </p>
        }
      >
        <SectionHeader
          id="evidence-map-title"
          title="What we know. What we don’t."
          dek="The ten questions this project set out to answer, and how far public evidence gets on each."
        />
        <EvidenceMap />
      </Section>

      <Section
        id="gaps"
        labelledBy="gaps-title"
        margin={<p>Each gap is a finding of this project’s source audit, not a claim from any one study.</p>}
      >
        <SectionHeader
          id="gaps-title"
          title="The gaps are the finding"
          dek="AI adoption among young people is moving faster than research can measure its effects. These are the questions still open."
        />
        <div className="space-y-6">
          {gaps.map((g) => (
            <EvidenceNote key={g.id} evidence={g} />
          ))}
        </div>
      </Section>

      <Section
        id="what-to-measure"
        labelledBy="what-to-measure-title"
        margin={
          <p>
            Answering these questions would take respondent-level, ideally long-term data from teens, collected with
            parental consent, teen assent and ethics review.
          </p>
        }
      >
        <SectionHeader
          id="what-to-measure-title"
          title="What would we need to measure?"
          dek="A study that could answer the open questions would need to measure these, in the same teens, over time."
        />
        <figure className="rounded-sm border border-dashed border-graphite/70 p-5 md:p-6">
          <figcaption className="mb-6 font-sans text-note">
            <span className="font-semibold text-ink">Proposed measurement framework</span>
            <span className="text-graphite"> — not collected data. No values exist for any item below.</span>
          </figcaption>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {FRAMEWORK.map((f) => (
              <div key={f.area}>
                <h3 className="font-sans text-ui font-semibold text-ink">{f.area}</h3>
                <ul className="mt-2 space-y-1 font-sans text-note text-graphite">
                  {f.items.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </figure>
      </Section>
    </>
  );
}
