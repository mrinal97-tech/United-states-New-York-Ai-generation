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
