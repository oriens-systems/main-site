import Header from "./components/Header";
import Hero from "./components/Hero";
import Mission from "./components/Mission";
import Stakes from "./components/Stakes";
import Differentiation from "./components/Differentiation";
import Bottleneck from "./components/Bottleneck";
import ProofPoints from "./components/ProofPoints";
import Applications from "./components/Applications";
import Future from "./components/Future";
import CallToAction from "./components/CallToAction";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Header />
      <Hero />
      <Mission />
      {/* <Stakes /> */}
      <Differentiation />
      <Bottleneck />
      {/* <ProofPoints /> */}
      {/* <Applications /> */}
      {/* <Future /> */}
      {/* <CallToAction /> */}
      <Footer />
    </main>
  );
}
