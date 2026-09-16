"use client";

import { useState, useEffect } from "react";

export default function ProblemSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const updateIsMobile = () => setIsMobile(mediaQuery.matches);

    updateIsMobile();
    mediaQuery.addEventListener("change", updateIsMobile);

    return () => mediaQuery.removeEventListener("change", updateIsMobile);
  }, []);

  return (
    <section
      id="problem"
      className="relative w-full bg-[#0a0a0a] pt-24 pb-24 lg:pt-32 lg:pb-32"
    >
      <div className="relative z-10 mx-auto max-w-[1240px] px-6 md:px-10">
        <div className="border-b border-white/8 pb-20">
          <div
            className={`mb-12 flex items-center gap-4 lg:mb-16 ${isMobile ? "" : "opacity-0"}`}
          >
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-[11px] uppercase tracking-[0.15em] text-white/40">
              The Problem
            </span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <h2
            className="mb-16 text-center text-3xl font-light text-white md:text-4xl lg:text-5xl"
            style={{ letterSpacing: "0.04em" }}
          >
            Precision manufacturing is broken.
          </h2>

          <div className="mb-16 w-full overflow-x-auto">
            <div className="grid grid-cols-1 gap-0 md:grid-cols-2">
              <div className="border border-white/8 bg-[#111111] p-6">
                <h3 className="mb-3 text-[13px] uppercase tracking-[0.15em] text-white/90">
                  Job Shops
                </h3>
                <p className="text-[14px] leading-relaxed text-white/55">
                  4–8 week lead times. Phone and fax quoting. Aging workforce
                  with no succession plan. One shop closes every 34 hours.
                </p>
              </div>
              <div className="border border-white/8 bg-[#111111] p-6">
                <h3 className="mb-3 text-[13px] uppercase tracking-[0.15em] text-white/90">
                  Online Marketplaces
                </h3>
                <p className="text-[14px] leading-relaxed text-white/55">
                  Routed to the same overloaded shops. Quality variance, no
                  production control. Marketplace margin stacked on top of shop
                  costs.
                </p>
              </div>
              <div className="border border-white/8 bg-[#111111] p-6">
                <h3 className="mb-3 text-[13px] uppercase tracking-[0.15em] text-white/90">
                  Overseas Manufacturing
                </h3>
                <p className="text-[14px] leading-relaxed text-white/55">
                  Weeks of freight. Revision cycles measured in days. IP
                  vulnerability, tariff exposure, fixed capacity.
                </p>
              </div>
              <div className="border border-white/8 bg-[#111111] p-6">
                <h3 className="mb-3 text-[13px] uppercase tracking-[0.15em] text-white/90">
                  In-House Shops
                </h3>
                <p className="text-[14px] leading-relaxed text-white/55">
                  Major CapEx to start. Competing for a shrinking talent pool.
                  Capacity that doesn&apos;t scale with demand.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
