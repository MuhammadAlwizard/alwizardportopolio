import Image from "next/image";
import type { ProjectWithImages } from "@/lib/data";
import { galleryOf, splitTitle, stackOf } from "@/lib/project-view";
import MarqueeGallery from "./MarqueeGallery";

const categoryLabel: Record<string, string> = {
  ACADEMIC: "Academic",
  WORK: "Work",
  PERSONAL: "Personal",
};

export default function Projects({ projects }: { projects: ProjectWithImages[] }) {
  if (projects.length === 0) return null;

  const selected = projects.filter((p) => p.featured);
  const side = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-20 md:py-28 border-t border-line">
      <div className="max-w-6xl mx-auto px-5 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
          <h2 className="font-display font-semibold tracking-tight text-4xl md:text-5xl leading-none">
            Projects
          </h2>
          <p className="text-ink-soft max-w-sm">
            Academic and work projects: system analysis, data mining, web systems and design.
          </p>
        </div>

        {/* Index rows: meta, story, thumbnail */}
        {selected.length > 0 && (
          <ol className="border-t border-line">
            {selected.map((p) => {
              const { name, tagline } = splitTitle(p.title);
              const cover = galleryOf(p)[0];
              return (
                <li key={p.id} id={p.slug} className="grid md:grid-cols-12 gap-5 md:gap-8 py-8 md:py-10 border-b border-line">
                  <div className="md:col-span-2 meta pt-1">
                    {categoryLabel[p.category] ?? p.category}
                    {p.period ? <span className="block">{p.period}</span> : null}
                  </div>
                  <div className="md:col-span-6">
                    <h3 className="font-display font-semibold text-2xl tracking-tight leading-tight">{name}</h3>
                    {tagline && <p className="text-ink-soft mt-1">{tagline}</p>}
                    <p className="text-ink-soft leading-relaxed mt-4">{p.summary}</p>
                    {p.result && <p className="mt-4 text-sm border-l-2 border-accent pl-4">{p.result}</p>}
                    <p className="meta mt-4">{stackOf(p).join(" / ")}</p>
                  </div>
                  <div className="md:col-span-4">
                    {cover && (
                      <div className="relative aspect-[16/10] rounded-card overflow-hidden border border-line bg-paper-raised">
                        <Image
                          src={cover.url}
                          alt={cover.caption ?? p.title}
                          fill
                          sizes="(min-width: 768px) 30vw, 100vw"
                          className="object-cover object-left-top"
                        />
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        )}

      </div>

      {side.length > 0 && (
        <div className={selected.length > 0 ? "mt-16" : ""}>
          <div className="max-w-6xl mx-auto px-5 md:px-10 flex flex-wrap items-end justify-between gap-2 mb-6">
            <h3 className="font-display font-semibold text-2xl tracking-tight">Side projects</h3>
            <p className="meta">Hover to pause, click to open</p>
          </div>
          <MarqueeGallery
            label="Side projects"
            items={side.map((p) => ({
              id: p.id,
              title: splitTitle(p.title).name,
              subtitle: [categoryLabel[p.category] ?? p.category, p.period].filter(Boolean).join(" · "),
              description: p.summary,
              images: galleryOf(p),
            }))}
          />
        </div>
      )}
    </section>
  );
}
