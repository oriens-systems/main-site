import ApplicationsContent from "./ApplicationsContent";
import BreadcrumbJsonLd from "../components/BreadcrumbJsonLd";

export const metadata = {
  title: "Applications",
  description:
    "Oriens Systems manufactures mission-critical components for aerospace, defense, and fusion energy with AI in manufacturing. Precision CNC machining for rocket engines, turbopumps, armor plates, and plasma-facing components.",
  openGraph: {
    title: "Applications — Oriens Systems",
    description:
      "Mission-critical advanced manufacturing and autonomous manufacturing for aerospace, defense, and fusion energy industries.",
    url: "https://orienssystems.com/applications",
  },
  alternates: {
    canonical: "https://orienssystems.com/applications",
  },
};

export default function ApplicationsPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Applications", path: "/applications" }]} />
      <ApplicationsContent />
    </>
  );
}