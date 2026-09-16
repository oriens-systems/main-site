import ContactContent from "./ContactContent";
import BreadcrumbJsonLd from "../components/BreadcrumbJsonLd";

export const metadata = {
  title: "Contact",
  description:
    "Contact Oriens Systems to discuss your advanced manufacturing and autonomous factory requirements. Precision CNC machining for aerospace, defense, and fusion energy components. Based in Toronto, ON.",
  openGraph: {
    title: "Contact Oriens Systems",
    description:
      "Ready to manufacture mission-critical components? Get in touch with Oriens Systems.",
    url: "https://orienssystems.com/contact",
  },
  alternates: {
    canonical: "https://orienssystems.com/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }]} />
      <ContactContent />
    </>
  );
}