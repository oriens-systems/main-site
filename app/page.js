export const metadata = {
  title: "Autonomous Manufacturing | Oriens Systems",
  description:
    "Oriens Systems: AI in manufacturing and autonomous factories. Accelerating advanced manufacturing across aerospace, defense, and fusion energy. Closing the capacity gap with lights-out manufacturing and factory automation.",
  alternates: {
    canonical: "https://orienssystems.com",
  },
};

import Header from "./components/Header";
import Hero from "./components/Hero";
import ProblemSection from "./components/ProblemSection";
import MissionBeigeSection from "./components/MissionBeigeSection";
import Differentiation from "./components/Differentiation";
import Footer from "./components/Footer";
import CallToAction from "./components/CallToAction";

export default function Home() {
  return (
    <main className="relative">
      <Header />
      <Hero />
      <ProblemSection />
      <MissionBeigeSection />
      <Differentiation />
      <CallToAction />
      <Footer />
    </main>
  );
}
