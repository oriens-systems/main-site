import PilotContent from "./PilotContent";

export const metadata = {
  title: "Pilot Program",
  description:
    "Suprnova's pilot program in partnership with the Ontario Centre of Innovation to validate autonomous CAM automation for advanced manufacturing.",
  openGraph: {
    title: "Pilot Program — Suprnova",
    description:
      "Validating autonomous CAM automation in partnership with the Ontario Centre of Innovation.",
    url: "https://suprnova.co/pilot",
  },
  alternates: {
    canonical: "https://suprnova.co/pilot",
  },
};

export default function PilotPage() {
  return <PilotContent />;
}