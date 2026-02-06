import ContactContent from "./ContactContent";

export const metadata = {
  title: "Contact",
  description:
    "Contact Suprnova to discuss your advanced manufacturing requirements. Precision CNC machining for aerospace, defense, and fusion energy components. Based in Toronto, ON.",
  openGraph: {
    title: "Contact Suprnova",
    description:
      "Ready to manufacture mission-critical components? Get in touch with Suprnova.",
    url: "https://suprnova.co/contact",
  },
  alternates: {
    canonical: "https://suprnova.co/contact",
  },
};

export default function ContactPage() {
  return <ContactContent />;
}