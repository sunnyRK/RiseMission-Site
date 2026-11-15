import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@/components/analytics/analytics";
import { SiteFooter } from "@/components/site/footer";
import { SiteHeader } from "@/components/site/header";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans-face", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Rise Mission: Alarm Clock for Heavy Sleepers", template: `%s | ${SITE_NAME}` },
  applicationName: SITE_NAME,
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.BING_SITE_VERIFICATION ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION } : undefined,
  },
  // Smart App Banner on iOS Safari — native "Open / Get" for the app.
  other: { "apple-itunes-app": "app-id=6791305078" },
  alternates: {
    types: { "application/rss+xml": [{ url: "/blog/feed.xml", title: "Rise Mission Blog" }] },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0c10" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sans.variable} antialiased`}>
      <body className="min-h-dvh flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-card focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
