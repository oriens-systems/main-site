import JoinContent from "./JoinContent";
import BreadcrumbJsonLd from "../components/BreadcrumbJsonLd";

export const metadata = {
  title: "Join the Mission",
  description:
    "Join Oriens Systems' mission to reindustrialize North America. We're looking for people passionate about manufacturing, AI in manufacturing, and building autonomous factories and critical infrastructure.",
  openGraph: {
    title: "Join the Mission — Oriens Systems",
    description:
      "Connect with Oriens Systems. We're building the future of autonomous manufacturing and autonomous factories.",
    url: "https://orienssystems.com/join",
  },
  alternates: {
    canonical: "https://orienssystems.com/join",
  },
};

export default function JoinPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Join the Mission", path: "/join" }]} />
      <JoinContent />
    </>
  );
}