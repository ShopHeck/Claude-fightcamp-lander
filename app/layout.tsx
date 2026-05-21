import type { Metadata, Viewport } from "next";
import { Inter, Archivo_Black } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const display = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fight Camp — Train. Track. Win.",
  description:
    "The all-in-one fight camp app for boxing, MMA, Muay Thai, and combat sports. Plan your camp, hit your cut, time your rounds, and arrive fight-ready.",
  keywords: [
    "fight camp app",
    "boxing training app",
    "MMA training app",
    "round timer",
    "weight cut tracker",
    "muay thai",
    "combat sports training",
  ],
  openGraph: {
    title: "Fight Camp — Train. Track. Win.",
    description:
      "Plan your camp, time your rounds, hit your cut, and peak when it matters.",
    type: "website",
    siteName: "Fight Camp",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fight Camp — Train. Track. Win.",
    description:
      "Plan your camp, time your rounds, hit your cut, and peak when it matters.",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0B",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable}`}>
      <body className="bg-bg-base text-ink-primary font-sans antialiased">
        {/* TODO: drop analytics SDK here (Plausible, PostHog, etc.) */}
        {children}
      </body>
    </html>
  );
}
