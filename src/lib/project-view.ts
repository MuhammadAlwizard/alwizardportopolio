import type { ProjectWithImages } from "./data";

// Gambar untuk galeri: pakai tabel ProjectImage, kalau kosong pakai coverImage.
export function galleryOf(p: ProjectWithImages) {
  if (p.images.length > 0) return p.images.map((img) => ({ url: img.url, caption: img.caption }));
  if (p.coverImage) return [{ url: p.coverImage, caption: p.title }];
  return [];
}

// "Enjaz Instan Properti - Rental & Travel Platform" -> nama + keterangan.
export function splitTitle(title: string) {
  const i = title.indexOf(" - ");
  if (i === -1) return { name: title, tagline: null };
  return { name: title.slice(0, i), tagline: title.slice(i + 3) };
}

export function stackOf(p: ProjectWithImages) {
  return p.stack
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}
