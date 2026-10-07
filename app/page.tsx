import Link from "next/link";
import { Adoption } from "@/components/sections/Adoption";
import { Hero } from "@/components/sections/Hero";
import { LearningAndThinking } from "@/components/sections/LearningAndThinking";
import { ReadingGuide } from "@/components/sections/ReadingGuide";
import { DataPending } from "@/components/ui/DataPending";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

export default function Home() {
  return (
    <>
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 pt-6 md:px-10">
        <Link href="/" className="font-sans text-ui font-semibold text-ink no-underline">
          The AI Generation
        </Link>
      </header>

      <main id="main">
        <Hero />
        <ReadingGuide />
        <Adoption />

        <LearningAndThinking />

        <Section id="evidence" labelledBy="evidence-title">
          <SectionHeader
            id="evidence-title"
            title="What we know, and what we don’t"
            dek="The evidence map and the New York City lens are being connected next."
          />
          <DataPending title="Research data loading">
            No figures are shown until they trace to a verified source.
          </DataPending>
        </Section>
      </main>

      <footer className="mx-auto w-full max-w-6xl px-5 pb-12 font-sans text-note text-graphite md:px-10">
        <p className="border-t border-rule pt-8">
          Research integrity: this project does not combine figures from different surveys, build composite
          scores, or claim that AI causes changes in how teens think.
        </p>
      </footer>
    </>
  );
}
