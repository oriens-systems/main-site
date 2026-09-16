import "@fontsource/host-grotesk/latin.css";
import "@fontsource/host-grotesk/latin-italic.css";
import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://orienssystems.com"),
  title: {
    default: "Oriens Systems — Reindustrializing North America",
    template: "%s | Oriens Systems",
  },
  description:
    "Pushing the frontier of autonomous manufacturing. Oriens Systems is building autonomous production systems for aerospace, defense, and energy. Toronto, Canada.",
  keywords: [
    "advanced manufacturing",
    "AI in manufacturing",
    "AI manufacturing",
    "autonomous manufacturing",
    "autonomous factories",
    "smart factories",
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
      "Pushing the frontier of autonomous manufacturing. Building autonomous production systems for aerospace, defense, and energy. Toronto, Canada.",
    images: [
      {
        url: "/og-logo.png",
        width: 582,
        height: 300,
        alt: "Oriens Systems — Reindustrializing North America",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Oriens Systems — Reindustrializing North America",
    description:
      "Pushing the frontier of autonomous manufacturing. Toronto, Canada.",
    images: ["/og-logo.png"],
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
    apple: "/logo.png",
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
      "Oriens Systems is building autonomous production systems for aerospace, defense, and energy. Toronto, Canada.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Toronto",
      addressRegion: "ON",
      addressCountry: "CA",
    },
    email: "hello@oriens.systems",
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
      "Oriens Systems is building autonomous production systems for aerospace, defense, and energy. Toronto, Canada.",
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
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
