declare module "@/styles/globals.css";

import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "@/styles/globals.css";
import { SiteShell } from "@/components/layout/SiteShell";

// Fraunces: a variable serif with real optical-size/weight range, so
// display type can carry personality without a second serif face.
const displayFont = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display-loaded",
  display: "swap",
});

// Inter stands in for a Neue-Haas-style grotesk: neutral, workhorse,
// built for UI and body copy rather than display headlines.
const bodyFont = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body-loaded",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NØIR — The New Era",
  description:
    "Structured. Minimal. Unapologetic. NØIR Issue 001 — The New Era.",
  icon: {
    rel: "icon",
    type: "image/png",
    url: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
