"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type SlideshowImage = { url: string; caption?: string | null };

// Crossfade antar gambar dalam satu kotak. Berjalan otomatis kecuali
// pengunjung memilih "reduce motion"; titik di bawah bisa diklik.
export default function ImageSlideshow({
  images,
  alt,
  intervalMs = 3500,
  fit = "cover",
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: {
  images: SlideshowImage[];
  alt: string;
  intervalMs?: number;
  fit?: "cover" | "contain";
  sizes?: string;
}) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (images.length <= 1 || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % images.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [images.length, intervalMs, paused]);

  if (images.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <span className="meta">No preview</span>
      </div>
    );
  }

  return (
    <div
      className="relative w-full h-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {images.map((img, i) => (
        <div
          key={img.url + i}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={i !== active}
        >
          <Image
            src={img.url}
            alt={img.caption ?? alt}
            fill
            sizes={sizes}
            className={fit === "contain" ? "object-contain p-3" : "object-cover object-left-top"}
          />
        </div>
      ))}

      {images.length > 1 && (
        <div className="absolute bottom-3 left-3 z-10 flex gap-1.5 rounded-full bg-paper-raised/90 px-2 py-1.5">
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show image ${i + 1}: ${img.caption ?? alt}`}
              onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === active ? "w-5 bg-accent" : "w-1.5 bg-ink-faint/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
