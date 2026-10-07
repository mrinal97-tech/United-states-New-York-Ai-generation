import { EvidenceChip } from "@/components/evidence/EvidenceChip";
import { EvidenceNote } from "@/components/evidence/EvidenceNote";
import { Statistic } from "@/components/evidence/Statistic";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { BarList } from "@/components/visualizations/BarList";
import { EvidenceChain } from "@/components/visualizations/EvidenceChain";
import { ProposedSpectrum } from "@/components/visualizations/ProposedSpectrum";
import { getEvidence, resolveVisualization } from "@/lib/evidence";
import { STATUS_LABELS, getResearchQuestion } from "@/lib/research-questions";

const ALL_TEENS = "All U.S. teens 13-17";
const SCHOOLWORK_USERS = "Teens who use AI for schoolwork";

const schoolTasks = resolveVisualization({
  id: "school-tasks",
  question: "What have teens used chatbots to help with for school?",
  evidenceIds: ["pew-schoolwork-research", "pew-schoolwork-math", "pew-schoolwork-editing"],
  sharedBase: ALL_TEENS,
});

const answerModes = resolveVisualization({
  id: "answer-modes",
  question: "Using AI to get an answer",
  evidenceIds: ["csm-answer-any", "csm-answer-improve", "csm-answer-rewrite", "csm-answer-as-is"],
  sharedBase: SCHOOLWORK_USERS,
});

const helpModes = resolveVisualization({
  id: "help-modes",
  question: "Using AI without getting a direct answer",
  evidenceIds: ["csm-nonanswer-any", "csm-brainstorm", "csm-check-answer", "csm-feedback"],
  sharedBase: SCHOOLWORK_USERS,
});

const stuck = resolveVisualization({
  id: "stuck-first",
  question: "The first thing teens usually do when stuck on schoolwork",
  evidenceIds: ["csm-stuck-self-first", "csm-stuck-ai-first"],
  sharedBase: ALL_TEENS,
});

// Same respondents, same base: shown together as the two sides of one tension.
const helps = ["csm-helps-understand", "csm-more-successful"].map(getEvidence);
const costs = ["csm-missing-learning", "csm-fewer-ideas"].map(getEvidence);

export function LearningAndThinking() {
  const rq7 = getResearchQuestion("RQ7");

  return (
    <>
      <Section
        id="schoolwork"
        labelledBy="schoolwork-title"
        margin={
          <p>
            Pew’s figures are shares of all teens, including the 45% who have not used chatbots for schoolwork. Among
            teens who have, 79% have used one on a math problem.
          </p>
        }
      >
        <SectionHeader
          id="schoolwork-title"
          title="The classroom is where the change shows most"
          dek="For one in ten teens, chatbots help with all or most of their schoolwork. For many more, they help with some or a little of it."
        />
        <div className="space-y-16">
          <Statistic evidence={getEvidence("pew-schoolwork-all-most")} />
          <BarList
            title={schoolTasks.question}
            points={schoolTasks.points}
            sharedBase={ALL_TEENS}
            labels={{
              "pew-schoolwork-research": "Researching a topic",
              "pew-schoolwork-math": "Solving a math problem",
              "pew-schoolwork-editing": "Editing something they wrote",
            }}
            note="These items record that a chatbot helped, not how. Explaining a method and supplying the answer both count."
          />
          <p className="text-lede text-pretty">But using AI is not the same as outsourcing thinking.</p>
        </div>
      </Section>

      <Section
        id="answer-vs-thinking"
        labelledBy="answer-vs-thinking-title"
        margin={
          <p>
            Teens could pick every way they use AI. The same teen can get answers on one assignment and brainstorm on
            another, so the two groups overlap and must not be added together.
          </p>
        }
      >
        <SectionHeader
          id="answer-vs-thinking-title"
          title="Getting answers, getting help"
          dek="Teens who use AI for schoolwork report doing both. Getting an answer is common; so is using AI without one."
        />
        <div className="space-y-14">
          <ProposedSpectrum
            steps={[
              "Work independently",
              "Brainstorm with AI",
              "Check an answer with AI",
              "Improve your own work with AI",
              "Ask AI for the answer",
              "Use AI output unchanged",
            ]}
            fromLabel="More thinking by the student"
            toLabel="More thinking handed to AI"
          />
          <div className="grid gap-14 lg:gap-10">
            <BarList
              title={answerModes.question}
              points={answerModes.points}
              sharedBase={SCHOOLWORK_USERS}
              labels={{
                "csm-answer-any": "Any of these three",
                "csm-answer-improve": "Get an answer, then fix or improve it",
                "csm-answer-rewrite": "Get an answer, then rewrite it in their voice",
                "csm-answer-as-is": "Get an answer and use it as-is",
              }}
            />
            <BarList
              title={helpModes.question}
              points={helpModes.points}
              sharedBase={SCHOOLWORK_USERS}
              labels={{
                "csm-nonanswer-any": "Any of these three",
                "csm-brainstorm": "Generate ideas or plan how to start",
                "csm-check-answer": "Check their answer after finishing",
                "csm-feedback": "Get feedback after writing their own answer",
              }}
              note="“Check their answer” means the AI checks the student’s work. How often teens check the AI’s work was not measured."
            />
          </div>
          <BarList
            title={stuck.question}
            points={stuck.points}
            sharedBase={ALL_TEENS}
            labels={{
              "csm-stuck-self-first": "Try to figure it out on their own",
              "csm-stuck-ai-first": "Use an AI app or tool",
            }}
            note="Teens picked one answer. Others ask a teacher or parent (26%) or a friend (14%), or search the internet with (12%) or without (10%) an AI summary."
          />
        </div>
      </Section>

      <Section
        id="what-teens-report"
        labelledBy="what-teens-report-title"
        margin={
          <p>
            All four figures come from the same Common Sense Media survey and the same teens: the 665 who use AI for
            schoolwork. The same teen can agree with both sides.
          </p>
        }
      >
        <SectionHeader
          id="what-teens-report-title"
          title="AI can help. AI can also offload."
          dek="Teens who use AI for schoolwork describe both. These are their own perceptions; learning and idea generation were not measured."
        />
        <div className="grid gap-x-12 gap-y-16 md:grid-cols-2">
          <div className="space-y-12">
            <h3 className="font-sans text-ui font-semibold text-ink">What helps</h3>
            {helps.map((e) => (
              <Statistic key={e.id} evidence={e} />
            ))}
          </div>
          <div className="space-y-12">
            <h3 className="font-sans text-ui font-semibold text-ink">What it may cost</h3>
            {costs.map((e) => (
              <Statistic key={e.id} evidence={e} />
            ))}
          </div>
        </div>
      </Section>

      <Section
        id="critical-thinking"
        labelledBy="critical-thinking-title"
        margin={
          <p>
            RAND’s figures cover students from middle school through college, ages 12 to 29. Its high-school-only
            figures are withheld here until they are verified against the report.
          </p>
        }
      >
        <SectionHeader
          id="critical-thinking-title"
          title="So does AI reduce critical thinking?"
          dek="Most students in RAND’s youth panel believe it does. Belief is not measurement, and no study found has measured it for U.S. teens."
        />
        <div className="space-y-16">
          <Statistic evidence={getEvidence("rand-ct-belief-overall")} />
          <div className="space-y-6">
            <EvidenceNote evidence={getEvidence("rand-ct-belief-users")} />
            <EvidenceNote evidence={getEvidence("rand-ct-belief-female")} />
            <EvidenceNote evidence={getEvidence("pew-overreliance-reason")} />
            <EvidenceNote evidence={getEvidence("rand-regression")} />
          </div>

          <div className="space-y-6">
            <h3 className="text-h3 font-medium">How far the evidence reaches</h3>
            <p className="text-pretty">
              Each step below is a claim someone might make. The label shows what kind of evidence exists for it. The
              chain is solid while there is evidence and dashed where it runs out.
            </p>
            <EvidenceChain
              steps={[
                {
                  step: "Teens use AI",
                  evidence: "representative",
                  basis: "Pew’s probability-based national survey of teens.",
                },
                {
                  step: "Teens use AI for schoolwork",
                  evidence: "representative",
                  basis: "Pew and Common Sense Media, measured with different questions.",
                },
                {
                  step: "Some teens report offloading",
                  evidence: "direct",
                  basis: "Teens who use AI for schoolwork report getting answers and generating fewer of their own ideas.",
                },
                {
                  step: "Students believe AI harms critical thinking",
                  evidence: "representative",
                  basis: "RAND’s youth panel, ages 12 to 29. A perception about students in general.",
                },
                {
                  step: "AI use is linked to measured critical thinking in U.S. teens",
                  evidence: "evidence-gap",
                  basis: "No audited source measures a teen’s critical thinking alongside their AI use.",
                },
                {
                  step: "AI use causes changes in teens’ critical thinking",
                  evidence: "evidence-gap",
                  basis: "No randomized or long-term study of U.S. teens. One non-U.S. experiment on math learning is context only.",
                },
              ]}
            />
          </div>

          <div className="rounded-sm border border-dashed border-graphite p-6">
            <p className="font-sans text-note font-semibold text-graphite">{STATUS_LABELS[rq7.status]}</p>
            <p className="mt-2 text-lede text-pretty">{rq7.question}</p>
            <p className="mt-3 text-pretty text-graphite">{rq7.verdict}</p>
            <div className="mt-4">
              <EvidenceChip strength={rq7.strongestEvidence} />
            </div>
          </div>
        </div>
      </Section>

      <Section
        id="experiments"
        labelledBy="experiments-title"
        margin={
          <p>
            This is the only randomized study found in the audit. It is classed as contextual: different country,
            one school, one subject, and a math-learning outcome rather than critical thinking.
          </p>
        }
      >
        <SectionHeader
          id="experiments-title"
          title="What experiments tell us"
          dek="One field experiment tested what happens to learning when students practice with AI and then lose access."
        />
        <div className="space-y-8">
          <Statistic evidence={getEvidence("bastani-gpt-base")} />
          <p className="text-pretty">
            Nearly a thousand high school math students in one Turkish school practiced with an unrestricted GPT-4
            tutor, a version with safeguards designed to protect learning, or no AI. Students who leaned on the
            unrestricted tutor did worse once it was taken away. The safeguarded tutor largely avoided that effect.
          </p>
          <p className="text-pretty">
            The finding raises a design question rather than settling the critical-thinking one: how an AI tool is
            built may matter as much as whether students use it. It does not show that AI reduces U.S. teens’
            critical thinking.
          </p>
        </div>
      </Section>
    </>
  );
}
