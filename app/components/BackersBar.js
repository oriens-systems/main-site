"use client";

import { useState } from "react";

const BACKER_IMAGES = [
  { src: "/images/oci_logo.png", alt: "OCI" },
  { src: "/images/mmri_logo.png", alt: "MMRI" },
  {
    src: "/images/western_logo.png",
    alt: "Western Morissiette Institute",
    large: true,
  },
];

function BackerLogo({ src, alt, large }) {
  const [errored, setErrored] = useState(false);
  const sizeClass = large ? "h-20 w-40 md:h-24 md:w-48" : "h-14 w-28 md:h-16 md:w-32";

  if (errored) {
    return (
      <div
        className={`flex-shrink-0 ${sizeClass} rounded border border-white/10 bg-white/5`}
        aria-hidden
      />
    );
  }

  return (
    <div
      className={`flex-shrink-0 ${sizeClass} flex items-center justify-center grayscale opacity-70 transition-all duration-300 hover:grayscale-0 hover:opacity-100`}
    >
      <img
        src={src}
        alt={alt}
        className="max-h-full max-w-full w-auto object-contain"
        onError={() => setErrored(true)}
      />
    </div>
  );
}

export default function BackersBar() {
  return (
    <section className="relative overflow-hidden border-b border-white/8 bg-[#0a0a0a] py-8 md:py-10">
      <div className="relative w-full overflow-hidden">
        <div className="animate-backer-scroll flex w-max items-center gap-16 py-2 md:gap-24">
          {[...BACKER_IMAGES, ...BACKER_IMAGES, ...BACKER_IMAGES].map((item, i) => (
            <BackerLogo key={`${item.alt}-${i}`} src={item.src} alt={item.alt} large={item.large} />
          ))}
        </div>
      </div>
    </section>
  );
}
