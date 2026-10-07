import type { ReactNode } from "react";

interface SectionHeaderProps {
  /** Used by Section's aria-labelledby. */
  id: string;
  title: ReactNode;
  /** One or two sentences that frame the question the section answers. */
  dek?: ReactNode;
}

export function SectionHeader({ id, title, dek }: SectionHeaderProps) {
  return (
    <header className="mb-10 max-w-[var(--spacing-measure)]">
      <h2 id={id} className="text-h2 font-medium tracking-[-0.015em] text-balance">
        {title}
      </h2>
      {dek ? <p className="mt-4 text-lede text-graphite text-pretty">{dek}</p> : null}
    </header>
  );
}
