import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { type ExplorerSource, type Geography, type Topic, SourceExplorer } from "@/components/visualizations/SourceExplorer";
import { evidence } from "@/lib/evidence";
import { sources } from "@/lib/sources";
import type { ResearchSource } from "@/lib/types";

function geographyOf(s: ResearchSource): Geography {
  if (/New York City/i.test(s.geography)) return "nyc";
  if (/United States/i.test(s.geography)) return "us";
  return "non-us";
}

function topicsOf(s: ResearchSource): Topic[] {
  const topics: Topic[] = [];
  if (s.aiUseVariables.length) topics.push("AI use");
  if (s.learningVariables.length) topics.push("Learning");
  if (s.cognitionVariables.length) topics.push("Cognition");
  if (s.id.includes("policy") || s.id.startsWith("nycps")) topics.push("Policy");
  return topics;
}

const explorerSources: ExplorerSource[] = sources.map((s) => ({
  ...s,
  geo: geographyOf(s),
  topics: topicsOf(s),
  evidenceCount: evidence.filter((e) => e.sourceId === s.id).length,
}));

export function Sources() {
  return (
    <Section
      id="sources"
      labelledBy="sources-title"
      margin={
        <p>
          One registered source, Pew’s January 2025 note on ChatGPT and schoolwork, is listed but not used on this
          site because it has not been verified yet.
        </p>
      }
    >
      <SectionHeader
        id="sources-title"
        title="Sources"
        dek="Every study behind this page, with its sample, method, variables and limitations. Open a source to inspect it."
      />
      <SourceExplorer sources={explorerSources} />
    </Section>
  );
}
