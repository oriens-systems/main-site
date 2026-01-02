import Header from "./components/Header";
import Hero from "./components/Hero";
import Mission from "./components/Mission";
import Differentiation from "./components/Differentiation";
import Bottleneck from "./components/Bottleneck";
import Footer from "./components/Footer";
import ProofPoints from "./components/ProofPoints";
import Applications from "./components/Applications";
import CallToAction from "./components/CallToAction";

export default function Home() {
  return (
    <main className="relative">
      <Header />
      <Hero />
      <Mission />
      <Differentiation />
      <Bottleneck />
      <ProofPoints />
      <Applications />
      <CallToAction />
      <Footer />
    </main>
  );
}
