import { ArrowDown } from "lucide-react";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="mx-auto flex min-h-[88dvh] w-full max-w-6xl flex-col justify-end px-5 pb-16 md:px-10 md:pb-24"
    >
      <p className="font-sans text-ui text-graphite">U.S. teens, ages 13 to 17, with a New York City lens</p>
      <h1 id="hero-title" className="mt-6 text-display font-semibold tracking-[-0.035em] text-balance">
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
          href="#reading-guide"
          className="inline-flex items-center gap-2 justify-self-start font-sans text-ui font-semibold md:justify-self-end"
        >
          Explore the evidence
          <ArrowDown aria-hidden="true" className="size-4" strokeWidth={2} />
        </a>
      </div>
    </section>
  );
}
