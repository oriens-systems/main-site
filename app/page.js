export const metadata = {
  title: "Oriens Systems — Reindustrializing North America",
  description:
    "Accelerating advanced manufacturing across aerospace, defense, and fusion energy. Closing the capacity gap with AI-powered CAM automation.",
  alternates: {
    canonical: "https://orienssystems.com",
  },
};

import Header from "./components/Header";
import Hero from "./components/Hero";
import Differentiation from "./components/Differentiation";
import Footer from "./components/Footer";
import CallToAction from "./components/CallToAction";

export default function Home() {
  return (
    <main className="relative">
      <Header />
      <Hero />
      <Differentiation />
      <CallToAction />
      <Footer />
    </main>
  );
}
