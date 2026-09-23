import type { Metadata } from "next";
import { Bricolage_Grotesque, Instrument_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const body = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const SITE_URL = "https://alwizardportopolio.vercel.app";
const TITLE = "Muhammad Alwizard - Full-Stack Developer & Information Systems Graduate";
const DESCRIPTION =
  "Freelance full-stack developer from Bandung. I build websites, admin panels and business systems, from database design to deployment.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: SITE_URL,
    title: TITLE,
    description: DESCRIPTION,
    siteName: "Muhammad Alwizard",
    images: [{ url: "/images/profile.jpg", alt: "Muhammad Alwizard" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/images/profile.jpg"],
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Muhammad Alwizard",
  url: SITE_URL,
  image: `${SITE_URL}/images/profile.jpg`,
  jobTitle: "Full-Stack Developer",
  address: { "@type": "PostalAddress", addressLocality: "Bandung", addressCountry: "ID" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Universitas Komputer Indonesia (UNIKOM)" },
  sameAs: ["https://linkedin.com/in/alwizard"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="font-body bg-paper text-ink antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
