"use client";

import { useRef } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

// Slider horizontal: geser pakai jari/trackpad, atau tombol panah.
// Di ujung, tombol panah memutar kembali ke awal (atau ke akhir).
export default function Slider({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  const track = useRef<HTMLDivElement>(null);

  function go(dir: 1 | -1) {
    const el = track.current;
    if (!el) return;
    const first = el.firstElementChild as HTMLElement | null;
    const step = first ? first.offsetWidth + 20 : el.clientWidth;
    const max = el.scrollWidth - el.clientWidth;
    let next = el.scrollLeft + dir * step;
    if (dir === 1 && el.scrollLeft >= max - 4) next = 0;
    if (dir === -1 && el.scrollLeft <= 4) next = max;
    el.scrollTo({ left: next, behavior: "smooth" });
  }

  return (
    <div role="region" aria-roledescription="carousel" aria-label={label}>
      <div ref={track} className="slider-track pb-2" tabIndex={0}>
        {children}
      </div>
      <div className="mt-6 flex gap-2">
        {([-1, 1] as const).map((dir) => (
          <button
            key={dir}
            type="button"
            onClick={() => go(dir)}
            aria-label={dir === 1 ? "Next" : "Previous"}
            className="w-11 h-11 inline-flex items-center justify-center rounded-card border border-line hover:border-accent hover:text-accent transition-colors"
          >
            {dir === 1 ? <FiArrowRight aria-hidden /> : <FiArrowLeft aria-hidden />}
          </button>
        ))}
      </div>
    </div>
  );
}
