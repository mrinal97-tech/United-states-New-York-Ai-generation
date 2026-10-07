import { Statistic } from "@/components/evidence/Statistic";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { BarList } from "@/components/visualizations/BarList";
import { SeparateMeasures } from "@/components/visualizations/SeparateMeasures";
import { getEvidence, resolveVisualization } from "@/lib/evidence";

const ALL_TEENS = "All U.S. teens 13-17";

const chatbots = resolveVisualization({
  id: "which-chatbots",
  question: "Which chatbots do teens use?",
  evidenceIds: ["pew-chatgpt", "pew-gemini", "pew-metaai"],
  sharedBase: ALL_TEENS,
});

const purposes = resolveVisualization({
  id: "use-purposes",
  question: "What have teens used AI chatbots for?",
  evidenceIds: [
    "pew-purpose-info",
    "pew-purpose-schoolwork",
    "pew-purpose-fun",
    "pew-purpose-summarize",
    "pew-purpose-images",
    "pew-purpose-news",
    "pew-purpose-casual",
    "pew-purpose-emotional",
  ],
  sharedBase: ALL_TEENS,
});

// Within-survey subgroup comparisons. Bases differ by design (each row is a subgroup).
const byAge = resolveVisualization({
  id: "use-by-age",
  question: "Share who use AI chatbots, by age",
  evidenceIds: ["pew-use-age-13-14", "pew-use-age-15-17"],
  sharedBase: null,
});
const byIncome = resolveVisualization({
  id: "use-by-income",
  question: "Share who use AI chatbots, by household income",
  evidenceIds: ["pew-use-income-low", "pew-use-income-high"],
  sharedBase: null,
});
const dailyByRace = resolveVisualization({
  id: "daily-by-race",
  question: "Share who use AI chatbots daily, by race and ethnicity",
  evidenceIds: ["pew-daily-black", "pew-daily-hispanic", "pew-daily-white"],
  sharedBase: null,
});

export function Adoption() {
  return (
    <>
      <Section
        id="the-shift"
        labelledBy="the-shift-title"
        margin={
          <p>
            Pew surveyed 1,458 teens and their parents through Ipsos KnowledgePanel, a probability-based panel, in
            fall 2025. It was the first time Pew asked teens broadly about chatbot use, so there is no earlier
            figure to compare against.
          </p>
        }
      >
        <SectionHeader
          id="the-shift-title"
          title="AI adoption among teenagers is no longer hypothetical"
          dek="Most U.S. teens use AI chatbots, and about one in six use one several times a day or more."
        />
        <div className="space-y-16">
          <Statistic evidence={getEvidence("pew-chatbot-use")} size="hero" animate />
          <Statistic evidence={getEvidence("pew-chatbot-heavy")} />
          <BarList
            title={chatbots.question}
            points={chatbots.points}
            sharedBase={ALL_TEENS}
            labels={{ "pew-chatgpt": "ChatGPT", "pew-gemini": "Gemini", "pew-metaai": "Meta AI" }}
            note="Pew also asked about Copilot, Character.ai and Claude, each used by fewer teens."
          />
          <div className="space-y-4">
            <p className="text-pretty">
              Parents and teens in the same households see this differently.
            </p>
            <Statistic evidence={getEvidence("pew-parent-aware")} />
          </div>
        </div>
      </Section>

      <Section
        id="different-measures"
        labelledBy="different-measures-title"
        margin={
          <p>
            Wording matters. The two Pew figures come from one survey and ask about chatbots. The Common Sense
            figure asks about any AI tool, in a different sample surveyed about seven months later.
          </p>
        }
      >
        <SectionHeader
          id="different-measures-title"
          title="Three numbers, three different questions"
          dek="Headlines often line these figures up as if adoption grew from one to the next. They measure different things."
        />
        <SeparateMeasures
          items={[
            { evidenceId: "pew-chatbot-use", measure: "Ever use an AI chatbot, for anything" },
            { evidenceId: "pew-purpose-schoolwork", measure: "Have used a chatbot for help with schoolwork" },
            { evidenceId: "csm-schoolwork-use", measure: "Use any AI tool for schoolwork" },
          ]}
          note="These figures measure different forms of AI use in different surveys and should not be interpreted as a time trend."
        />
      </Section>

      <Section
        id="uses"
        labelledBy="uses-title"
        margin={
          <p>
            Each bar is a separate yes/no question asked of every teen. Teens could say yes to several, so the bars
            do not add up to 100%.
          </p>
        }
      >
        <SectionHeader
          id="uses-title"
          title="What are teens using AI for?"
          dek="Looking things up and schoolwork lead. Emotional support is the least common use asked about, though it still reaches about one in eight teens."
        />
        <BarList
          title={purposes.question}
          points={purposes.points}
          sharedBase={ALL_TEENS}
          labels={{
            "pew-purpose-info": "Search for information",
            "pew-purpose-schoolwork": "Help with schoolwork",
            "pew-purpose-fun": "Fun or entertainment",
            "pew-purpose-summarize": "Summarize an article, book or video",
            "pew-purpose-images": "Create or edit images or videos",
            "pew-purpose-news": "Get news",
            "pew-purpose-casual": "Casual conversation",
            "pew-purpose-emotional": "Emotional support or advice",
          }}
          note="Teens who do not use chatbots count as “no”, so these are shares of all teens. Among chatbot users, the shares are higher; see each bar’s details."
        />
      </Section>

      <Section
        id="who"
        labelledBy="who-title"
        margin={
          <p>
            Every comparison here comes from the same Pew survey. Groups are compared only with each other, never
            with figures from another study.
          </p>
        }
      >
        <SectionHeader
          id="who-title"
          title="Who uses chatbots most"
          dek="Older teens, teens in higher-income households, and Black and Hispanic teens report more use."
        />
        <div className="space-y-14">
          <BarList
            title={byAge.question}
            points={byAge.points}
            labels={{ "pew-use-age-13-14": "Ages 13–14", "pew-use-age-15-17": "Ages 15–17" }}
          />
          <BarList
            title={byIncome.question}
            points={byIncome.points}
            labels={{ "pew-use-income-low": "Under $30,000", "pew-use-income-high": "$75,000 or more" }}
            note="Teens in households earning $30,000–$74,999 did not differ significantly from either group."
          />
          <BarList
            title={dailyByRace.question}
            points={dailyByRace.points}
            labels={{ "pew-daily-black": "Black teens", "pew-daily-hispanic": "Hispanic teens", "pew-daily-white": "White teens" }}
            note="There were not enough Asian teens in the sample to report them separately."
          />
        </div>
      </Section>
    </>
  );
}
