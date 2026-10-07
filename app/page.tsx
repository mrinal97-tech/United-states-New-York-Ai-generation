import { ArrowDown } from "lucide-react";
import Link from "next/link";
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
        <section
          aria-labelledby="hero-title"
          className="mx-auto flex min-h-[88dvh] w-full max-w-6xl flex-col justify-end px-5 pb-16 md:px-10 md:pb-24"
        >
          <p className="font-sans text-ui text-graphite">U.S. teens, ages 13 to 17, with a New York City lens</p>
          <h1
            id="hero-title"
            className="mt-6 text-display font-semibold tracking-[-0.035em] text-balance"
          >
            The AI Generation
          </h1>
          <div className="mt-10 grid gap-6 md:grid-cols-[minmax(0,40rem)_1fr] md:items-end">
            <div className="space-y-5">
              <p className="text-lede text-pretty">
                An evidence map of how AI is changing how young people learn, think, and decide.
              </p>
              <p className="text-body text-graphite text-pretty">
                Artificial intelligence is entering classrooms, homework, search, creativity and everyday
                decision-making faster than researchers can measure its long-term effects.
              </p>
            </div>
            <a
              href="#evidence"
              className="inline-flex items-center gap-2 justify-self-start font-sans text-ui font-semibold md:justify-self-end"
            >
              Explore the evidence
              <ArrowDown aria-hidden="true" className="size-4" strokeWidth={2} />
            </a>
          </div>
        </section>

        <Section
          id="evidence"
          labelledBy="evidence-title"
          margin={
            <p>
              Every figure on this page will link to its original study and state who was asked.
            </p>
          }
        >
          <SectionHeader
            id="evidence-title"
            title="What the evidence says, and what it can’t"
            dek="Verified findings from national surveys, a youth panel, and New York City’s public feedback are being connected."
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
