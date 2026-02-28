import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

export const metadata = {
  metadataBase: new URL("https://suprnova.co"),
  title: {
    default: "Suprnova — Reindustrializing North America",
    template: "%s | Suprnova",
  },
  description:
    "Suprnova is building the next generation of autonomous manufacturing systems to accelerate advanced manufacturing across aerospace, defense, and fusion energy.",
  keywords: [
    "advanced manufacturing",
    "autonomous CAM",
    "CNC machining",
    "aerospace manufacturing",
    "defense manufacturing",
    "fusion energy components",
    "reindustrialization",
    "North America manufacturing",
    "factory automation",
    "CAM automation",
    "Suprnova",
  ],
  authors: [{ name: "Suprnova", url: "https://suprnova.co" }],
  creator: "Suprnova",
  publisher: "Suprnova",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://suprnova.co",
    siteName: "Suprnova",
    title: "Suprnova — Reindustrializing North America",
    description:
      "Building the next generation of autonomous manufacturing systems to accelerate advanced manufacturing across aerospace, defense, and fusion energy.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Suprnova — Reindustrializing North America",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Suprnova — Reindustrializing North America",
    description:
      "Building the next generation of autonomous manufacturing systems to accelerate advanced manufacturing.",
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
    canonical: "https://suprnova.co",
  },
};

export default function RootLayout({ children }) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Suprnova",
    url: "https://suprnova.co",
    logo: "https://suprnova.co/logo.png",
    description:
      "Building the next generation of autonomous manufacturing systems to accelerate advanced manufacturing across aerospace, defense, and fusion energy.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Toronto",
      addressRegion: "ON",
      addressCountry: "CA",
    },
    email: "hello@suprnova.co",
    sameAs: [],
    foundingDate: "2024",
    industry: "Advanced Manufacturing",
  };

  const webSiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Suprnova",
    url: "https://suprnova.co",
    description:
      "Suprnova is building the next generation of autonomous manufacturing systems to accelerate advanced manufacturing.",
    publisher: {
      "@type": "Organization",
      name: "Suprnova",
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
      <body className={`${poppins.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
