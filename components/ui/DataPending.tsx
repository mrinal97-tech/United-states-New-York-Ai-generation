import type { ReactNode } from "react";

interface DataPendingProps {
  title: string;
  children?: ReactNode;
}

/**
 * Stand-in for content that is not connected or not verified yet.
 * Uses the project's "not measured" motif (dashed outline) and never shows numbers.
 */
export function DataPending({ title, children }: DataPendingProps) {
  return (
    <div
      role="status"
      className="rounded-sm border border-dashed border-graphite/60 px-6 py-5 font-sans"
    >
      <p className="text-ui font-semibold text-ink">{title}</p>
      {children ? <div className="mt-1 text-note text-graphite">{children}</div> : null}
    </div>
  );
}
