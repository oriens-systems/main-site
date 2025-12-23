import Header from "./components/Header";
import Hero from "./components/Hero";
import Mission from "./components/Mission";
import Differentiation from "./components/Differentiation";
import Bottleneck from "./components/Bottleneck";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Header />
      <Hero />
      <Mission />
      <Differentiation />
      <Bottleneck />
      <Footer />
    </main>
  );
}
