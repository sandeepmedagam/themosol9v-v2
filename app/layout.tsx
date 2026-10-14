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
    images: ["https://cdn.prod.website-files.com/69b293a8de2706e604a565ce/69c28b1677548b0b7ba02312_Open%20Graph%402x%201.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Mosol9",
    description: "Weekly shipping cadence for early-stage founders and SMB leaders. We build, design, and launch with ownership - turning ambiguity into momentum.",
    images: ["https://cdn.prod.website-files.com/69b293a8de2706e604a565ce/69c28b1677548b0b7ba02312_Open%20Graph%402x%201.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
