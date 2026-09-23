"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FiX } from "react-icons/fi";
import ImageSlideshow from "./ImageSlideshow";

export type MarqueeItem = {
  id: number | string;
  title: string;
  subtitle?: string | null;
  description?: string | null;
  images: { url: string; caption?: string | null }[];
};

// Deretan kartu yang terus berjalan ke samping. Berhenti saat di-hover atau
// difokus keyboard; klik kartu untuk membuka versi besar (lightbox).
export default function MarqueeGallery({
  label,
  items,
  fit = "cover",
  reverse = false,
  secondsPerItem = 7,
}: {
  label: string;
  items: MarqueeItem[];
  fit?: "cover" | "contain";
  reverse?: boolean;
  secondsPerItem?: number;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState<MarqueeItem | null>(null);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  const card = (item: MarqueeItem, hidden: boolean) => {
    const cover = item.images[0];
    return (
      <div key={`${hidden ? "b" : "a"}-${item.id}`} className="pr-5 shrink-0 flex">
        <button
          type="button"
          onClick={() => setOpen(item)}
          tabIndex={hidden ? -1 : 0}
          aria-label={hidden ? undefined : `Open ${item.title}`}
          className="group flex flex-col w-64 sm:w-72 text-left rounded-card border border-line bg-paper-raised overflow-hidden hover:border-accent transition-colors"
        >
          <div className="relative aspect-[4/3] border-b border-line bg-paper">
            {cover && (
              <Image
                src={cover.url}
                alt={hidden ? "" : cover.caption ?? item.title}
                fill
                sizes="18rem"
                className={
                  fit === "contain"
                    ? "object-contain p-3"
                    : "object-cover object-left-top transition-transform duration-500 group-hover:scale-[1.03]"
                }
              />
            )}
          </div>
          <div className="px-4 py-3">
            <p className="font-display font-semibold leading-snug line-clamp-2">{item.title}</p>
            {item.subtitle && <p className="meta mt-1 truncate">{item.subtitle}</p>}
          </div>
        </button>
      </div>
    );
  };

  return (
    <>
      <div className="marquee" role="region" aria-label={label}>
        <div
          className="marquee-track"
          data-reverse={reverse}
          style={{ ["--marquee-duration" as string]: `${Math.max(items.length, 3) * secondsPerItem}s` }}
        >
          <div className="flex">{items.map((it) => card(it, false))}</div>
          <div className="flex" aria-hidden="true">{items.map((it) => card(it, true))}</div>
        </div>
      </div>

      <dialog
        ref={dialog}
        className="lightbox w-[min(64rem,calc(100vw-2rem))] max-h-[calc(100vh-2rem)] rounded-card bg-paper-raised p-0 text-ink"
        onClose={() => setOpen(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setOpen(null);
        }}
      >
        {open && (
          <div className="p-4 md:p-6">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <p className="font-display font-semibold text-xl md:text-2xl leading-snug">{open.title}</p>
                {open.subtitle && <p className="meta mt-1">{open.subtitle}</p>}
              </div>
              <button
                type="button"
                onClick={() => setOpen(null)}
                aria-label="Close"
                className="shrink-0 w-10 h-10 inline-flex items-center justify-center rounded-card border border-line hover:border-accent hover:text-accent transition-colors"
              >
                <FiX aria-hidden />
              </button>
            </div>
            <div className="relative aspect-[16/10] max-h-[70vh] w-full rounded-card overflow-hidden border border-line bg-paper">
              <ImageSlideshow images={open.images} alt={open.title} fit="contain" sizes="(min-width: 1024px) 64rem, 100vw" />
            </div>
            {open.description && (
              <p className="text-ink-soft leading-relaxed mt-4 max-w-2xl">{open.description}</p>
            )}
          </div>
        )}
      </dialog>
    </>
  );
}
