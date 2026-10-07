import type { EvidencePoint } from "./types";

/** Formats an evidence value for display. Returns null when there is nothing to show. */
export function formatValue(point: Pick<EvidencePoint, "value" | "unit">): string | null {
  const { value, unit } = point;
  if (value === null) return null;
  switch (unit) {
    case "percent":
    case "percent-relative":
      return `${Number.isInteger(value) ? value : value.toFixed(1)}%`;
    case "count":
      return value.toLocaleString("en-US");
    case "text":
      return null;
  }
}

/** "2026-02-24" → "2026"; free-text dates are returned as-is. */
export function formatYear(date: string | null): string | null {
  if (!date) return null;
  const match = date.match(/^(\d{4})/);
  return match ? match[1] : date;
}

/** Only verified evidence may reach readers. */
export function canDisplay(point: Pick<EvidencePoint, "displayable" | "verification">): boolean {
  return (
    point.displayable &&
    (point.verification === "verified-primary" || point.verification === "audit-finding")
  );
}

const MONTHS = ["Jan.", "Feb.", "March", "April", "May", "June", "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."];

/** "2025-09-25 to 2025-10-09" → "Sept. 25 – Oct. 9, 2025". Other formats are returned unchanged. */
export function formatFieldDates(range: string | undefined): string | null {
  if (!range) return null;
  const m = range.match(/^(\d{4})-(\d{2})-(\d{2}) to (\d{4})-(\d{2})-(\d{2})/);
  if (!m) return range;
  const [, y1, m1, d1, y2, m2, d2] = m;
  const start = `${MONTHS[Number(m1) - 1]} ${Number(d1)}`;
  const end = `${m1 === m2 && y1 === y2 ? "" : `${MONTHS[Number(m2) - 1]} `}${Number(d2)}`;
  return y1 === y2 ? `${start} – ${end}, ${y2}` : `${start}, ${y1} – ${end}, ${y2}`;
}
