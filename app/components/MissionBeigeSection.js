"use client";

import { useLayoutEffect, useMemo, useRef } from "react";

const GREY = "rgb(82, 82, 82)";
const WHITE = "rgb(250, 250, 250)";

function countWords(text) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

/** Base scroll progress 0→1 as the section crosses the viewport. */
function getSectionScrollProgress(sectionEl) {
  const rect = sectionEl.getBoundingClientRect();
  const vh = window.innerHeight;
  const scrollRange = rect.height + vh;
  if (scrollRange <= 0) return 0;
  const scrolled = vh - rect.top;
  return Math.min(1, Math.max(0, scrolled / scrollRange));
}

/**
 * Scales section progress so words flip to white sooner (still 1:1 with scroll delta;
 * larger factor = faster full reveal over the same physical scroll distance).
 */
const SCROLL_REVEAL_RATE = 2.85;

export default function MissionBeigeSection() {
  const sectionRef = useRef(null);
  const wordRefs = useRef([]);
  /** Anchor section scroll progress the first frame "Decouple" reaches viewport mid-height; cleared when it falls back below. */
  const gateAnchorRawRef = useRef(null);
  const decoupleWordRef = useRef(null);

  const blocks = useMemo(
    () => [
      // {
      //   label: "Our Mission",
      //   text: "Safeguarding humanity through precision.",
      //   className:
      //     "mb-24 text-4xl font-semibold italic leading-tight md:mb-28 md:text-5xl lg:text-6xl xl:text-7xl",
      //   style: { letterSpacing: "0.02em" },
      // },
      {
        label: "The Solution",
        text: "Decouple production from human intervention.",
        className:
          "mb-10 text-4xl font-semibold leading-tight md:text-5xl lg:text-6xl xl:text-7xl",
        style: { letterSpacing: "0.04em" },
      },
      {
        label: null,
        text:
          "We are building a fully autonomous CNC factory. Upload a design file and an automated process planning system handles toolpath generation, quoting, machine scheduling, and inspection. No backlogs. No manual handoffs. Near full lights-out production.",
        className:
          "max-w-none text-lg font-medium leading-relaxed md:text-xl lg:text-2xl",
        style: undefined,
      },
    ],
    []
  );

  const totalWords = useMemo(
    () => blocks.reduce((sum, b) => sum + countWords(b.text), 0),
    [blocks]
  );

  useLayoutEffect(() => {
    const updateColors = () => {
      const section = sectionRef.current;
      if (!section || totalWords === 0) return;

      const vh = window.innerHeight;
      const midY = vh * 0.5;
      const decoupleEl = decoupleWordRef.current;

      let decoupleAtOrAboveCenter = false;
      if (decoupleEl) {
        const r = decoupleEl.getBoundingClientRect();
        const cy = r.top + r.height / 2;
        decoupleAtOrAboveCenter = cy <= midY;
      }

      if (!decoupleAtOrAboveCenter) {
        gateAnchorRawRef.current = null;
        for (let i = 0; i < totalWords; i++) {
          const el = wordRefs.current[i];
          if (el) el.style.color = GREY;
        }
        return;
      }

      const raw = getSectionScrollProgress(section);

      if (gateAnchorRawRef.current === null) {
        gateAnchorRawRef.current = raw;
      }

      const anchor = gateAnchorRawRef.current;
      const tail = Math.max(1e-6, 1 - anchor);
      let adjustedRaw = (raw - anchor) / tail;
      adjustedRaw = Math.min(1, Math.max(0, adjustedRaw));

      const progress = Math.min(1, adjustedRaw * SCROLL_REVEAL_RATE);

      for (let i = 0; i < totalWords; i++) {
        const el = wordRefs.current[i];
        if (!el) continue;
        const threshold =
          totalWords === 1 ? 0.5 : (i + 1) / totalWords;
        el.style.color = progress >= threshold ? WHITE : GREY;
      }
    };

    let rafId = 0;
    const scheduleUpdate = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateColors);
    };

    updateColors();

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    document.addEventListener("scroll", scheduleUpdate, {
      passive: true,
      capture: true,
    });
    window.addEventListener("resize", scheduleUpdate);
    if (typeof window !== "undefined" && window.visualViewport) {
      window.visualViewport.addEventListener("scroll", scheduleUpdate);
    }

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", scheduleUpdate);
      document.removeEventListener("scroll", scheduleUpdate, true);
      window.removeEventListener("resize", scheduleUpdate);
      if (typeof window !== "undefined" && window.visualViewport) {
        window.visualViewport.removeEventListener("scroll", scheduleUpdate);
      }
    };
  }, [totalWords]);

  let wordIndex = 0;

  return (
    <section
      ref={sectionRef}
      id="mission"
      className="relative w-full border-b border-stone-500/25 bg-[#c9bfb0]"
    >
      <div className="mx-auto max-w-[1240px] py-24 pl-3 pr-10 text-left sm:pl-4 md:py-32 md:pl-5 md:pr-16 lg:py-36 lg:pl-6 lg:pr-20">
        <div className="w-full max-w-4xl lg:max-w-5xl">
          {blocks.map((block, bi) => (
            <div key={bi}>
              {block.label ? (
                <p className="mb-10 text-[11px] uppercase tracking-[0.15em] text-stone-600">
                  {block.label}
                </p>
              ) : null}
              <p className={`text-left ${block.className}`} style={block.style}>
                {block.text.split(/(\s+)/).filter(Boolean).map((token, ti) => {
                  if (/^\s+$/.test(token)) {
                    return <span key={`${bi}-s-${ti}`}>{token}</span>;
                  }
                  const idx = wordIndex;
                  wordIndex += 1;
                  return (
                    <span
                      key={`${bi}-w-${ti}`}
                      ref={(el) => {
                        wordRefs.current[idx] = el;
                        if (token === "Decouple") {
                          decoupleWordRef.current = el;
                        }
                      }}
                      className="transition-[color] duration-200 ease-out"
                      style={{ color: GREY }}
                    >
                      {token}
                    </span>
                  );
                })}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
