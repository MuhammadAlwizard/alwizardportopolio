"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type SlideshowImage = { url: string; caption?: string | null };

export default function ImageSlideshow({
  images,
  alt,
  intervalMs = 3000,
}: {
  images: SlideshowImage[];
  alt: string;
  intervalMs?: number;
}) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % images.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [images.length, intervalMs]);

  if (images.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <span className="text-ivory/25 text-xs">No preview</span>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      {images.map((img, i) => (
        <div
          key={img.url + i}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={img.url}
            alt={img.caption ?? alt}
            fill
            className="object-cover"
          />
        </div>
      ))}

      {images.length > 1 && (
        <div className="absolute bottom-2 inset-x-0 flex justify-center gap-1.5 z-10">
          {images.map((_, i) => (
            <span
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                i === active ? "bg-gold-500" : "bg-ivory/30"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
