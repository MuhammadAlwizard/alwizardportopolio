import Image from "next/image";
import type { ProjectWithImages } from "@/lib/data";
import { galleryOf, splitTitle, stackOf } from "@/lib/project-view";
import ImageSlideshow from "./ImageSlideshow";
import Slider from "./Slider";

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

        {side.length > 0 && (
          <div className={selected.length > 0 ? "mt-16" : ""}>
            <h3 className="font-display font-semibold text-2xl tracking-tight mb-6">Side projects</h3>
            <Slider label="Side projects">
              {side.map((p) => {
                const { name } = splitTitle(p.title);
                return (
                  <article
                    key={p.id}
                    id={p.slug}
                    className="w-[82%] sm:w-[46%] lg:w-[31%] rounded-card border border-line bg-paper-raised overflow-hidden"
                  >
                    <div className="relative aspect-[4/3] border-b border-line">
                      <ImageSlideshow images={galleryOf(p)} alt={p.title} sizes="(min-width: 1024px) 30vw, 80vw" />
                    </div>
                    <div className="p-5">
                      <p className="meta mb-2">
                        {[categoryLabel[p.category] ?? p.category, p.period].filter(Boolean).join(" · ")}
                      </p>
                      <h4 className="font-display font-semibold text-lg leading-snug">{name}</h4>
                      <p className="text-ink-soft text-sm leading-relaxed mt-2 line-clamp-3">{p.summary}</p>
                    </div>
                  </article>
                );
              })}
            </Slider>
          </div>
        )}
      </div>
    </section>
  );
}
