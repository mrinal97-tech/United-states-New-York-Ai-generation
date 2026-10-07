import { EvidenceLegend } from "@/components/evidence/EvidenceLegend";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function ReadingGuide() {
  return (
    <Section
      id="reading-guide"
      labelledBy="reading-guide-title"
      margin={
        <p>
          Classes are categories, not a ranking. A representative survey can still only measure what people
          report.
        </p>
      }
    >
      <SectionHeader
        id="reading-guide-title"
        title="How to read the evidence"
        dek="Every figure here comes with who was asked, where it came from, and what kind of evidence it is."
      />
      <div className="space-y-6">
        <p className="text-pretty">
          Each finding carries one of five labels. They describe what a claim can support, so a confident
          number from a self-selected survey is never mistaken for a population estimate, and a gap in the
          research is shown as a gap rather than filled with a guess.
        </p>
        <EvidenceLegend />
        <p className="text-pretty">
          Figures that could not be confirmed against their original report are withheld until they are. Open
          “How this was measured” under any figure to see the exact question, the respondents, the method and
          the caveats.
        </p>
      </div>
    </Section>
  );
}
