import Header from "./components/Header";
import Hero from "./components/Hero";
import Mission from "./components/Mission";
import Differentiation from "./components/Differentiation";
import Bottleneck from "./components/Bottleneck";
import Footer from "./components/Footer";
import Stakes from "./components/Stakes";
import ProofPoints from "./components/ProofPoints";
import Applications from "./components/Applications";


export default function Home() {
  return (
    <main className="relative">
      <Header />
      <Hero />
      <Mission />
      <Stakes />
      <Differentiation />
      <Bottleneck />
      <ProofPoints />
      <Applications />
      <Footer />
    </main>
  );
}
