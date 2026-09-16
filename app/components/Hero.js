import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative isolate flex-1 flex items-center justify-center bg-[#0a0a0a] px-6">
      <div className="grid-overlay" />

      <div className="relative z-10 flex flex-col items-center text-center gap-8 max-w-5xl mx-auto py-20">
        {/* Wordmark */}
        <div className="fade-up w-32 h-9 md:w-40 md:h-11 relative">
          <Image
            src="/logos/logo.svg"
            alt="Oriens Systems"
            fill
            className="object-contain opacity-80"
            priority
          />
        </div>

        <div className="fade-up" style={{ animationDelay: "0.1s" }}>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-[1.1] text-white text-balance"
            style={{ letterSpacing: "0.04em" }}
          >
            pushing the frontier of autonomous manufacturing.
          </h1>
        </div>
      </div>
    </section>
  );
}
