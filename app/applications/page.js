import ApplicationsContent from "./ApplicationsContent";

export const metadata = {
  title: "Applications",
  description:
    "Suprnova manufactures mission-critical components for aerospace, defense, and fusion energy. Precision CNC machining for rocket engines, turbopumps, armor plates, and plasma-facing components.",
  openGraph: {
    title: "Applications — Suprnova",
    description:
      "Mission-critical manufacturing for aerospace, defense, and fusion energy industries.",
    url: "https://suprnova.co/applications",
  },
  alternates: {
    canonical: "https://suprnova.co/applications",
  },
};

export default function ApplicationsPage() {
  return <ApplicationsContent />;
}