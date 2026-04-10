import InterestContent from "./InterestContent";
import BreadcrumbJsonLd from "../components/BreadcrumbJsonLd";

export const metadata = {
  title: "Register Your Interest",
  description:
    "Register your interest in Oriens Systems.",
  openGraph: {
    title: "Register Your Interest | Oriens Systems",
    description:
      "Be first in line for autonomous manufacturing from Oriens Systems.",
    url: "https://orienssystems.com/interest",
  },
  alternates: {
    canonical: "https://orienssystems.com/interest",
  },
};

export default function InterestPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Register Interest", path: "/interest" }]} />
      <InterestContent />
    </>
  );
}
