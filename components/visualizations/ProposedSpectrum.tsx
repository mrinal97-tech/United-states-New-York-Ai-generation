interface ProposedSpectrumProps {
  steps: string[];
  fromLabel: string;
  toLabel: string;
}

/**
 * A conceptual spectrum drawn in the "not measured" style (dashed). It
 * carries no values: it is a proposed framework, not a measured scale.
 */
export function ProposedSpectrum({ steps, fromLabel, toLabel }: ProposedSpectrumProps) {
  return (
    <figure className="rounded-sm border border-dashed border-graphite/70 p-5 md:p-6">
      <figcaption className="mb-5 font-sans text-note">
        <span className="font-semibold text-ink">Conceptual spectrum</span>
        <span className="text-graphite"> — proposed framework, not a measured scale. No survey has measured where teens fall on it.</span>
      </figcaption>
      <ol className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {steps.map((s) => (
          <li
            key={s}
            className="flex min-h-16 items-end rounded-sm border border-dashed border-rule px-3 py-2 font-sans text-note leading-snug text-ink"
          >
            {s}
          </li>
        ))}
      </ol>
      <div aria-hidden="true" className="mt-3 flex justify-between font-sans text-note text-graphite">
        <span>{fromLabel}</span>
        <span>{toLabel}</span>
      </div>
      <p className="sr-only">
        Ordered from {fromLabel.toLowerCase()} to {toLabel.toLowerCase()}.
      </p>
    </figure>
  );
}
