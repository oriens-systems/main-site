import PilotContent from "./PilotContent";
import BreadcrumbJsonLd from "../components/BreadcrumbJsonLd";

export const metadata = {
  title: "Pilot Program",
  description:
    "Oriens Systems' pilot program in partnership with the Ontario Centre of Innovation to validate autonomous CAM automation and AI in manufacturing for advanced manufacturing.",
  openGraph: {
    title: "Pilot Program — Oriens Systems",
    description:
      "Validating autonomous CAM automation and AI in manufacturing in partnership with the Ontario Centre of Innovation.",
    url: "https://orienssystems.com/pilot",
  },
  alternates: {
    canonical: "https://orienssystems.com/pilot",
  },
};

export default function PilotPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Pilot Program", path: "/pilot" }]} />
      <PilotContent />
    </>
  );
}