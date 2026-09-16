export const metadata = {
  title: "Autonomous Manufacturing | Oriens Systems",
  description:
    "Oriens Systems is building autonomous production systems for aerospace, defense, and energy. Toronto, Canada.",
  alternates: {
    canonical: "https://orienssystems.com",
  },
};

import Hero from "./components/Hero";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen min-h-dvh flex flex-col">
      <Hero />
      <Footer />
    </main>
  );
}
