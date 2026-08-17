import Image from "next/image";
import { getProjects } from "@/lib/data";

const categoryLabel: Record<string, string> = {
  ACADEMIC: "Academic Project",
  WORK: "Work Portfolio",
  PERSONAL: "Personal Project",
};

export default async function Projects() {
  const projects = await getProjects();

  return (
    <section id="projects" className="py-24 md:py-32 border-t border-gold-500/10 bg-navy-950/40">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <p className="eyebrow mb-4">06 · Selected Work</p>
        <h2 className="section-title text-3xl md:text-4xl text-ivory mb-14 max-w-xl">
          Projects
        </h2>

        <div className="space-y-16">
          {projects.map((p, idx) => {
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

          {projects.length === 0 && (
            <p className="text-ivory/40 text-sm">
              Belum ada project. Tambahkan lewat database (tabel Project).
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
