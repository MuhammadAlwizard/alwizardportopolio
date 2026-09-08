import Image from "next/image";
import { getProjects } from "@/lib/data";
import ImageSlideshow from "./ImageSlideshow";

const categoryLabel: Record<string, string> = {
  ACADEMIC: "Academic Project",
  WORK: "Work Portfolio",
  PERSONAL: "Personal Project",
};

export default async function Projects() {
  const projects = await getProjects();
  const topProjects = projects.filter((p) => p.featured);
  const sideProjects = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-24 md:py-32 border-t border-gold-500/10 bg-navy-950/40">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <p className="eyebrow mb-4">06 · Selected Work</p>
        <h2 className="section-title text-3xl md:text-4xl text-ivory mb-14 max-w-xl">
          Projects
        </h2>

        {/* ===== TOP PROJECTS — showcase besar ===== */}
        <div className="space-y-16">
          {topProjects.map((p, idx) => {
            const stackList = p.stack.split(",").map((s) => s.trim()).filter(Boolean);
            const gallery = p.images.length > 0 ? p.images : p.coverImage ? [{ id: 0, url: p.coverImage, caption: p.title }] : [];
            const reversed = idx % 2 === 1;

            return (
              <article
                key={p.id}
                id={p.slug}
                className={`grid lg:grid-cols-2 gap-10 items-center ${
                  reversed ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div>
                  <p className="text-xs uppercase tracking-wider text-gold-500 mb-3">
                    {categoryLabel[p.category] ?? p.category}
                    {p.period ? ` · ${p.period}` : ""}
                  </p>
                  <h3 className="font-display text-2xl md:text-3xl text-ivory mb-4">
                    {p.title}
                  </h3>
                  <p className="text-ivory/70 leading-relaxed mb-4">{p.summary}</p>

                  {p.businessProblem && (
                    <div className="mb-4">
                      <p className="text-ivory/40 text-xs uppercase tracking-wider mb-1">
                        Business Problem
                      </p>
                      <p className="text-ivory/65 text-sm leading-relaxed">
                        {p.businessProblem}
                      </p>
                    </div>
                  )}

                  <p className="text-ivory/65 text-sm leading-relaxed mb-4">
                    {p.description}
                  </p>

                  {p.result && (
                    <p className="text-gold-500 text-sm font-medium mb-4">↳ {p.result}</p>
                  )}

                  {stackList.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {stackList.map((s) => (
                        <span
                          key={s}
                          className="text-xs rounded-full px-3 py-1.5 bg-navy-800 border border-gold-500/10 text-ivory/70"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  {gallery.length > 0 ? (
                    <div className={`grid gap-3 ${gallery.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
                      {gallery.slice(0, 4).map((img, i) => (
                        <div
                          key={img.id ?? i}
                          className={`relative rounded-2xl overflow-hidden card-surface aspect-[4/3] ${
                            gallery.length === 3 && i === 0 ? "col-span-2" : ""
                          }`}
                        >
                          <Image
                            src={img.url}
                            alt={img.caption ?? p.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-2xl card-surface aspect-[4/3] flex items-center justify-center">
                      <span className="text-ivory/30 text-sm">Gallery coming soon</span>
                    </div>
                  )}
                </div>
              </article>
            );
          })}

          {topProjects.length === 0 && (
            <p className="text-ivory/40 text-sm">
              Belum ada project unggulan. Tandai project sebagai featured di database.
            </p>
          )}
        </div>

        {/* ===== SIDE PROJECTS — grid kecil dengan slideshow ===== */}
        {sideProjects.length > 0 && (
          <div className="mt-24 pt-16 border-t border-gold-500/10">
            <p className="eyebrow mb-4">More Work</p>
            <h3 className="font-display text-2xl md:text-3xl text-ivory mb-10">
              Side Projects
            </h3>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sideProjects.map((p) => {
                const stackList = p.stack.split(",").map((s) => s.trim()).filter(Boolean);
                const gallery =
                  p.images.length > 0
                    ? p.images.map((img) => ({ url: img.url, caption: img.caption }))
                    : p.coverImage
                    ? [{ url: p.coverImage, caption: p.title }]
                    : [];

                return (
                  <div
                    key={p.id}
                    id={p.slug}
                    className="card-surface rounded-2xl overflow-hidden group"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-navy-800">
                      <ImageSlideshow images={gallery} alt={p.title} intervalMs={3000} />
                    </div>
                    <div className="p-5">
                      <p className="text-[11px] uppercase tracking-wider text-gold-500 mb-2">
                        {categoryLabel[p.category] ?? p.category}
                        {p.period ? ` · ${p.period}` : ""}
                      </p>
                      <h4 className="font-display text-lg text-ivory mb-2">{p.title}</h4>
                      <p className="text-ivory/60 text-sm leading-relaxed mb-3 line-clamp-3">
                        {p.summary}
                      </p>
                      {stackList.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {stackList.slice(0, 3).map((s) => (
                            <span
                              key={s}
                              className="text-[11px] rounded-full px-2.5 py-1 bg-navy-800 border border-gold-500/10 text-ivory/60"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
