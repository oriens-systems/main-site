import { Exo_2 } from "next/font/google";
import "./globals.css";

const exo2 = Exo_2({
  variable: "--font-exo-2",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

export const metadata = {
  metadataBase: new URL("https://orienssystems.com"),
  title: {
    default: "Oriens Systems — Reindustrializing North America",
    template: "%s | Oriens Systems",
  },
  description:
    "Oriens Systems is accelerating advanced manufacturing and autonomous factories with AI in manufacturing. Closing the capacity gap with AI-powered CAM automation and factory automation.",
  keywords: [
    "advanced manufacturing",
    "AI in manufacturing",
    "AI manufacturing",
    "autonomous manufacturing",
    "autonomous factories",
    "smart factories",
    "lights-out manufacturing",
    "factory automation",
    "autonomous CAM",
    "CNC machining",
    "aerospace manufacturing",
    "defense manufacturing",
    "fusion energy components",
    "reindustrialization",
    "North America manufacturing",
    "CAM automation",
    "Oriens",
    "Oriens Systems",
    "Orien Systems",
    "Orien",
  ],
  authors: [{ name: "Oriens Systems", url: "https://orienssystems.com" }],
  creator: "Oriens Systems",
  publisher: "Oriens Systems",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://orienssystems.com",
    siteName: "Oriens Systems",
    title: "Oriens Systems — Reindustrializing North America",
    description:
      "AI in manufacturing and autonomous factories. Building the next generation of autonomous manufacturing systems to accelerate advanced manufacturing across aerospace, defense, and fusion energy.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Oriens Systems — Reindustrializing North America",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Oriens Systems — Reindustrializing North America",
    description:
      "AI in manufacturing and autonomous factories. Building the next generation of autonomous manufacturing systems to accelerate advanced manufacturing.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  alternates: {
    canonical: "https://orienssystems.com",
  },
};

export default function RootLayout({ children }) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Oriens Systems",
    url: "https://orienssystems.com",
    logo: "https://orienssystems.com/logo.png",
    description:
      "Oriens Systems delivers AI in manufacturing and factory automation for autonomous factories. Building the next generation of autonomous manufacturing systems to accelerate advanced manufacturing across aerospace, defense, and fusion energy.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Toronto",
      addressRegion: "ON",
      addressCountry: "CA",
    },
    email: "hello@orienssystems.com",
    sameAs: [],
    foundingDate: "2024",
    industry: "Advanced Manufacturing",
  };

  const webSiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Oriens Systems",
    url: "https://orienssystems.com",
    description:
      "Oriens Systems is building AI-powered autonomous manufacturing and autonomous factories to accelerate advanced manufacturing across aerospace, defense, and fusion energy.",
    publisher: {
      "@type": "Organization",
      name: "Oriens Systems",
    },
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(webSiteJsonLd),
          }}
        />
      </head>
      <body className={`${exo2.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
