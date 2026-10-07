import Link from "next/link";

const NAV = [
  { href: "#the-shift", label: "The shift" },
  { href: "#schoolwork", label: "Learning" },
  { href: "#new-york", label: "New York" },
  { href: "#evidence-map", label: "The evidence" },
  { href: "#methodology", label: "Methodology" },
  { href: "#sources", label: "Sources" },
];

export function SiteHeader() {
  return (
    <header className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-5 pt-6 md:flex-row md:items-baseline md:justify-between md:px-10">
      <Link href="/" className="font-sans text-ui font-semibold text-ink no-underline">
        The AI Generation
      </Link>
      <nav aria-label="Sections" className="-mx-5 overflow-x-auto px-5 md:mx-0 md:px-0">
        <ul className="flex gap-5 font-sans text-note whitespace-nowrap">
          {NAV.map((n) => (
            <li key={n.href}>
              <a href={n.href} className="text-graphite no-underline hover:text-ink hover:underline">
                {n.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
