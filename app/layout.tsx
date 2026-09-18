import type { Metadata } from "next";
import { B612_Mono, Barlow, Barlow_Condensed } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-barlow",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

const b612Mono = B612_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-b612-mono",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Salman Saadiq — Record of work", template: "%s — Salman Saadiq" },
  description: "Electrical & Electronics Engineering student with a passion for aeronautics. Projects from analysis to build to test.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${barlow.variable} ${barlowCondensed.variable} ${b612Mono.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full">
        {/* Marks the document as JS-capable before first paint so the stamp reveal never hides content without JS. */}
        <Script id="js-capable" strategy="beforeInteractive">{"document.documentElement.classList.add('js')"}</Script>
        {children}
      </body>
    </html>
  );
}
