export const metadata = {
  title: "Suprnova — Reindustrializing North America",
  description:
    "Suprnova builds autonomous manufacturing systems to accelerate advanced manufacturing across aerospace, defense, and fusion energy. Closing the capacity gap with AI-powered CAM automation.",
  alternates: {
    canonical: "https://suprnova.co",
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
