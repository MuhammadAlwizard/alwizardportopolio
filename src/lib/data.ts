import { prisma } from "./prisma";

// Semua fungsi di bawah ini mengambil data langsung dari MySQL lewat Prisma.
// Kalau nanti kamu insert baris baru ke database (project, sertifikat, dst),
// halaman ini otomatis menampilkannya tanpa perlu ubah kode.

export async function getProjects() {
  return prisma.project.findMany({
    orderBy: { sortOrder: "asc" },
    include: { images: { orderBy: { sortOrder: "asc" } } },
  });
}

export async function getFeaturedProjects() {
  return prisma.project.findMany({
    where: { featured: true },
    orderBy: { sortOrder: "asc" },
    include: { images: { orderBy: { sortOrder: "asc" } } },
  });
}

export async function getProjectBySlug(slug: string) {
  return prisma.project.findUnique({
    where: { slug },
    include: { images: { orderBy: { sortOrder: "asc" } } },
  });
}

export async function getCertificates() {
  return prisma.certificate.findMany({ orderBy: { sortOrder: "asc" } });
}

export async function getEducation() {
  return prisma.education.findMany({ orderBy: { sortOrder: "asc" } });
}

export async function getExperience() {
  return prisma.experience.findMany({ orderBy: { sortOrder: "asc" } });
}

export async function getSkills() {
  const skills = await prisma.skill.findMany({ orderBy: { sortOrder: "asc" } });
  const grouped: Record<string, string[]> = {};
  for (const s of skills) {
    if (!grouped[s.category]) grouped[s.category] = [];
    grouped[s.category].push(s.name);
  }
  return grouped;
}
