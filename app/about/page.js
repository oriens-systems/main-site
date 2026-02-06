import AboutContent from "./AboutContent";

export const metadata = {
  title: "About",
  description:
    "Learn about Suprnova's mission to reindustrialize North America by building the automation layer that unlocks manufacturing capacity for a spacefaring future.",
  openGraph: {
    title: "About Suprnova",
    description:
      "Building the automation layer that unlocks manufacturing capacity for a spacefaring future.",
    url: "https://suprnova.co/about",
  },
  alternates: {
    canonical: "https://suprnova.co/about",
  },
};

export default function AboutPage() {
  return <AboutContent />;
}