import Link from "next/link";
import { Adoption } from "@/components/sections/Adoption";
import { Closing } from "@/components/sections/Closing";
import { EvidenceGap } from "@/components/sections/EvidenceGap";
import { Hero } from "@/components/sections/Hero";
import { LearningAndThinking } from "@/components/sections/LearningAndThinking";
import { NewYork } from "@/components/sections/NewYork";
import { ReadingGuide } from "@/components/sections/ReadingGuide";

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
        <NewYork />
        <EvidenceGap />
        <Closing />
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
