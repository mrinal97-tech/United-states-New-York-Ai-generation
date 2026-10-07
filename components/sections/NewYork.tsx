import { EvidenceNote } from "@/components/evidence/EvidenceNote";
import { Statistic } from "@/components/evidence/Statistic";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { BarList } from "@/components/visualizations/BarList";
import { EvidenceChain } from "@/components/visualizations/EvidenceChain";
import { getEvidence, resolveVisualization } from "@/lib/evidence";
import { getSource } from "@/lib/sources";

const RESPONDENTS = "Self-selected respondents";
const POLICY_PENDING = "Policy report — verification pending";

// The policy timeline is one registry entry covering three publications; cite each item's own.
const timeline = getSource("nyc-policy-timeline-2026");
const [chalkbeatUrl, abcUrl] = timeline.additionalUrls ?? [];
const CITATIONS = {
  guidance: {
    organization: "New York City Public Schools",
    title: "NYCPS announces release of AI guidance for educators and school leaders",
    date: "2026-03-24",
    url: timeline.sourceUrl,
  },
  delay: { organization: "Chalkbeat New York", title: "NYC delays school AI guidance after backlash", date: "2026-06-24", url: chalkbeatUrl },
  moratorium: {
    organization: "ABC News",
    title: "New York City Public Schools banning AI use through middle school starting this year",
    date: "2026-09-02",
    url: abcUrl,
  },
};

const composition = resolveVisualization({
  id: "nyc-composition",
  question: "Who responded to the NYCPS public-feedback survey",
  evidenceIds: ["nyc-share-educators", "nyc-share-parents"],
  sharedBase: RESPONDENTS,
});

// Same item across respondent groups. Each row is a different group of respondents.
const cognitiveConcern = resolveVisualization({
  id: "nyc-cognitive-concern",
  question: "Respondents who named cognitive development (“AI doing the thinking students should do”) as a top concern",
  evidenceIds: ["nyc-cogdev-concern", "nyc-cogdev-parents", "nyc-cogdev-community"],
  sharedBase: null,
});

const guidance = resolveVisualization({
  id: "nyc-guidance",
  question: "What respondents said about the draft guidance",
  evidenceIds: ["nyc-clarity", "nyc-grade-band"],
  sharedBase: RESPONDENTS,
});

const nationalRules = resolveVisualization({
  id: "national-rules",
  question: "School AI rules, as U.S. teens describe them (national, not NYC)",
  evidenceIds: ["csm-rules-unclear", "csm-teacher-safety", "csm-teacher-accuracy"],
  sharedBase: "All U.S. teens 13-17",
});

export function NewYork() {
  return (
    <>
      <Section
        id="new-york"
        labelledBy="new-york-title"
        margin={
          <p>
            National figures describe U.S. teens as a whole. None of them is an estimate for New York City, and this
            page never treats them as one.
          </p>
        }
      >
        <SectionHeader
          id="new-york-title"
          title="What about New York City?"
          dek="The nation’s largest school district is making AI policy in public. What it lacks is representative evidence about its own students."
        />
        <EvidenceChain
          steps={[
            {
              step: "United States",
              evidence: "representative",
              basis: "National surveys of teens (Pew, Common Sense Media) and students (RAND).",
            },
            {
              step: "New York State",
              evidence: "evidence-gap",
              basis: "RAND oversampled New York State in May 2025, but the audited report publishes no New York estimates.",
            },
            {
              step: "New York City public schools",
              evidence: "limited",
              basis: "Policy documents and a self-selected public-feedback survey. No representative survey of NYC students was found.",
            },
          ]}
        />
      </Section>

      <Section
        id="nyc-feedback"
        labelledBy="nyc-feedback-title"
        margin={
          <p>
            NYCPS ran this as an anonymous online survey open to anyone with the link, from March 25 to May 8, 2026.
            Respondents could pick more than one role, and some responses may be duplicates.
          </p>
        }
      >
        <SectionHeader
          id="nyc-feedback-title"
          title="What NYC’s public feedback says"
          dek="Thousands responded to the city’s draft AI guidance. Most were educators and parents, and their top worry was AI doing students’ thinking for them."
        />
        <div className="space-y-14">
          <p
            role="note"
            className="border-l-2 border-dashed border-graphite pl-5 font-sans text-ui font-semibold text-ink"
          >
            This was not a scientific sample of NYC students, parents or educators. Every figure below describes
            respondents to the NYCPS public-feedback survey only.
          </p>
          <Statistic evidence={getEvidence("nyc-responses")} />
          <BarList
            title={composition.question}
            points={composition.points}
            sharedBase={RESPONDENTS}
            labels={{ "nyc-share-educators": "Educators", "nyc-share-parents": "Parents, caregivers and family" }}
            note="Respondents could select more than one role, so shares overlap. The number of student respondents is not reported here because it has not been verified."
          />
          <BarList
            title={cognitiveConcern.question}
            points={cognitiveConcern.points}
            labels={{
              "nyc-cogdev-concern": "All respondents",
              "nyc-cogdev-parents": "Parent and family respondents",
              "nyc-cogdev-community": "Community-member respondents",
            }}
            note="Respondents could choose up to three concerns. These are shares of each self-selected group, not of NYC parents or residents."
          />
          <EvidenceNote evidence={getEvidence("nyc-students-mentalhealth")} />
          <BarList
            title={guidance.question}
            points={guidance.points}
            sharedBase={RESPONDENTS}
            labels={{
              "nyc-clarity": "Found the guidance mostly or very clear",
              "nyc-grade-band": "Asked for grade-specific guidance",
            }}
          />
        </div>
      </Section>

      <Section
        id="nyc-policy"
        labelledBy="nyc-policy-title"
        margin={
          <p>
            Two of these events are known only from news reporting. They stay labeled as pending until an official
            NYCPS document confirms them.
          </p>
        }
      >
        <SectionHeader
          id="nyc-policy-title"
          title="How should schools teach AI without outsourcing thinking to it?"
          dek="New York City has not settled this, and neither has the evidence. Here is what the city has done, and what teens nationally say about school rules."
        />
        <div className="space-y-14">
          <ol className="space-y-6">
            <li>
              <EvidenceNote evidence={getEvidence("nyc-policy-guidance")} citation={CITATIONS.guidance} />
            </li>
            <li>
              <EvidenceNote evidence={getEvidence("nyc-policy-delay")} pendingLabel={POLICY_PENDING} citation={CITATIONS.delay} />
            </li>
            <li>
              <EvidenceNote evidence={getEvidence("nyc-policy-moratorium")} pendingLabel={POLICY_PENDING} citation={CITATIONS.moratorium} />
            </li>
          </ol>
          <BarList
            title={nationalRules.question}
            points={nationalRules.points}
            sharedBase="All U.S. teens 13-17"
            labels={{
              "csm-rules-unclear": "Don’t know or don’t understand their school’s AI rules",
              "csm-teacher-safety": "A teacher has discussed using AI safely",
              "csm-teacher-accuracy": "A teacher has discussed judging whether AI is accurate",
            }}
            note="These are national figures from Common Sense Media. They describe U.S. teens overall, not New York City students."
          />
        </div>
      </Section>
    </>
  );
}
