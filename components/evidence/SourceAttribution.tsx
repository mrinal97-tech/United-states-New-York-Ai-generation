import { ExternalLink } from "lucide-react";
import { formatYear } from "@/lib/format";

interface SourceAttributionProps {
  organization: string;
  title: string;
  publicationDate: string | null;
  url: string;
}

/** Source marker that sits beside a statistic and links to the original publication. */
export function SourceAttribution({ organization, title, publicationDate, url }: SourceAttributionProps) {
  const year = formatYear(publicationDate);
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      title={title}
      className="inline-flex items-center gap-1.5 font-sans text-note"
    >
      <span>
        {organization}
        {year ? `, ${year}` : null}
      </span>
      <ExternalLink aria-hidden="true" className="size-3.5 shrink-0" strokeWidth={1.75} />
      <span className="sr-only">(opens “{title}” in a new tab)</span>
    </a>
  );
}
