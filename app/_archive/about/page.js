import AboutContent from "./AboutContent";
import BreadcrumbJsonLd from "../components/BreadcrumbJsonLd";

export const metadata = {
  title: "About",
  description:
    "Learn about Oriens Systems' mission to reindustrialize North America with AI in manufacturing and autonomous factories. Building the automation layer that unlocks manufacturing capacity for a spacefaring future.",
  openGraph: {
    title: "About Oriens Systems",
    description:
      "Building the automation layer that unlocks manufacturing capacity with autonomous manufacturing and factory automation for a spacefaring future.",
    url: "https://orienssystems.com/about",
  },
  alternates: {
    canonical: "https://orienssystems.com/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "About", path: "/about" }]} />
      <AboutContent />
    </>
  );
}