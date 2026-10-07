import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "../styles/globals.css";

// Fonts are bundled (SIL OFL 1.1, see app/fonts/) so builds never depend on a font CDN.
const newsreader = localFont({
  src: [
    { path: "./fonts/newsreader-latin-normal.woff2", style: "normal", weight: "200 800" },
    { path: "./fonts/newsreader-latin-italic.woff2", style: "italic", weight: "200 800" },
  ],
  variable: "--font-newsreader",
  display: "swap",
});

const atkinson = localFont({
  src: [
    { path: "./fonts/atkinson-next-latin-normal.woff2", style: "normal", weight: "200 800" },
    { path: "./fonts/atkinson-next-latin-italic.woff2", style: "italic", weight: "200 800" },
  ],
  variable: "--font-atkinson",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The AI Generation",
  description:
    "An evidence map of how AI is changing how young people learn, think, and decide, and of what we do not yet know.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f7f5" },
    { media: "(prefers-color-scheme: dark)", color: "#151b21" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${newsreader.variable} ${atkinson.variable} antialiased`}>
      <body className="min-h-dvh">
        <a
          href="#main"
          className="sr-only z-50 bg-paper-raised px-4 py-2 font-sans text-ui focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
