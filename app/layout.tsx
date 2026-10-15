import type { Metadata } from "next";
import "./globals.css";
import "./tokens.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.oneventurestudio.com"),
  title: "The Mosol9",
  description: "Weekly shipping cadence for early-stage founders and SMB leaders. We build, design, and launch with ownership - turning ambiguity into momentum.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "The Mosol9",
    description: "Weekly shipping cadence for early-stage founders and SMB leaders. We build, design, and launch with ownership - turning ambiguity into momentum.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "The Mosol9",
    description: "Weekly shipping cadence for early-stage founders and SMB leaders. We build, design, and launch with ownership - turning ambiguity into momentum.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
