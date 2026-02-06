import JoinContent from "./JoinContent";

export const metadata = {
  title: "Join the Mission",
  description:
    "Join Suprnova's mission to reindustrialize North America. We're looking for people passionate about manufacturing, AI, and building critical infrastructure.",
  openGraph: {
    title: "Join the Mission — Suprnova",
    description:
      "Connect with Suprnova. We're building the future of autonomous manufacturing.",
    url: "https://suprnova.co/join",
  },
  alternates: {
    canonical: "https://suprnova.co/join",
  },
};

export default function JoinPage() {
  return <JoinContent />;
}