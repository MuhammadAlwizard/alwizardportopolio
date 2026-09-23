import { prisma } from "./prisma";

// Semua fungsi di bawah ini mengambil data langsung dari MySQL lewat Prisma.
// Kalau nanti kamu insert baris baru ke database (project, sertifikat, dst),
// halaman ini otomatis menampilkannya tanpa perlu ubah kode.
//
// Kalau database sedang bermasalah, fungsi mengembalikan data kosong dan
// mencatat error di log server, supaya halaman tetap tampil (bagian yang
// datanya gagal dimuat cukup disembunyikan) dan tidak crash total.

// Em-dash / en-dash dipakai sebagai pemisah di sebagian data lama.
// Situs ini hanya memakai tanda hubung biasa, jadi diganti saat dibaca.
function noDash<T>(value: T): T {
  if (typeof value === "string") {
    return value.replace(/\s*[–—]\s*/g, " - ") as T;
  }
  if (Array.isArray(value)) return value.map(noDash) as T;
  if (value && typeof value === "object" && !(value instanceof Date)) {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value)) out[k] = noDash(v);
    return out as T;
  }
  return value;
}

async function safe<T>(label: string, query: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return noDash(await query());
  } catch (err) {
    console.error(`[data] ${label} failed`, err);
    return fallback;
  }
}

export async function getProjects() {
  return safe(
    "getProjects",
    () =>
      prisma.project.findMany({
        orderBy: { sortOrder: "asc" },
        include: { images: { orderBy: { sortOrder: "asc" } } },
      }),
    []
  );
}

export type ProjectWithImages = Awaited<ReturnType<typeof getProjects>>[number];

export async function getCertificates() {
  return safe("getCertificates", () => prisma.certificate.findMany({ orderBy: { sortOrder: "asc" } }), []);
}

export async function getEducation() {
  return safe("getEducation", () => prisma.education.findMany({ orderBy: { sortOrder: "asc" } }), []);
}

export async function getExperience() {
  return safe("getExperience", () => prisma.experience.findMany({ orderBy: { sortOrder: "asc" } }), []);
}

export async function getSkills() {
  const skills = await safe("getSkills", () => prisma.skill.findMany({ orderBy: { sortOrder: "asc" } }), []);
  const grouped: Record<string, string[]> = {};
  for (const s of skills) {
    if (!grouped[s.category]) grouped[s.category] = [];
    grouped[s.category].push(s.name);
  }
  return grouped;
}
