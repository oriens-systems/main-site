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
