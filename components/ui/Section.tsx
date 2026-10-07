import type { ReactNode } from "react";

interface SectionProps {
  id: string;
  /** id of the heading that names this section, for assistive technology. */
  labelledBy?: string;
  /** Margin column: provenance, definitions, reading notes. Stacks below the text on small screens. */
  margin?: ReactNode;
  children: ReactNode;
  className?: string;
}

/**
 * Page section on the two-column reading grid: a narrow margin for
 * provenance on the left and the reading column on the right.
 */
export function Section({ id, labelledBy, margin, children, className = "" }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`mx-auto w-full max-w-6xl scroll-mt-8 px-5 py-20 md:px-10 md:py-28 ${className}`}
    >
      <div className="grid gap-x-12 gap-y-8 lg:grid-cols-[minmax(0,13rem)_minmax(0,var(--spacing-measure))]">
        <div className="order-2 lg:order-1">
          {margin ? (
            <aside className="font-sans text-note text-graphite lg:sticky lg:top-8">{margin}</aside>
          ) : null}
        </div>
        <div className="order-1 min-w-0 lg:order-2">{children}</div>
      </div>
    </section>
  );
}
