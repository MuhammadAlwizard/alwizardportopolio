import type { ProjectWithImages } from "@/lib/data";
import { galleryOf, splitTitle, stackOf } from "@/lib/project-view";
import ImageSlideshow from "./ImageSlideshow";

function CaseText({ p, large = false }: { p: ProjectWithImages; large?: boolean }) {
  const { name, tagline } = splitTitle(p.title);
  const stack = stackOf(p);

  return (
    <div>
      <p className="meta mb-3">
        {[p.role, p.period].filter(Boolean).join(" · ")}
      </p>
      <h3 className={`font-display font-semibold tracking-tight leading-tight ${large ? "text-3xl md:text-4xl" : "text-2xl"}`}>
        {name}
      </h3>
      {tagline && <p className="text-ink-soft mt-1">{tagline}</p>}

      <p className="text-ink-soft leading-relaxed mt-5">{p.summary}</p>

      {p.result && (
        <p className="mt-5 border-l-2 border-accent pl-4 text-sm leading-relaxed">{p.result}</p>
      )}

      {stack.length > 0 && <p className="meta mt-5">{stack.join(" / ")}</p>}

      {(p.businessProblem || p.description) && (
        <details className="group mt-6 border-t border-line pt-4">
          <summary className="text-sm font-medium inline-flex items-center gap-2 hover:text-accent transition-colors">
            <span className="group-open:hidden">Read the full case</span>
            <span className="hidden group-open:inline">Close</span>
            <span aria-hidden className="transition-transform group-open:rotate-45">+</span>
          </summary>
          <div className="mt-4 space-y-4 text-sm leading-relaxed text-ink-soft">
            {p.businessProblem && (
              <div>
                <p className="meta mb-1">The problem</p>
                <p>{p.businessProblem}</p>
              </div>
            )}
            <div>
              <p className="meta mb-1">What I built</p>
              <p>{p.description}</p>
            </div>
          </div>
        </details>
      )}
    </div>
  );
}

function Media({ p, ratio, sizes }: { p: ProjectWithImages; ratio: string; sizes: string }) {
  return (
    <div className={`relative ${ratio} rounded-card overflow-hidden border border-line bg-paper-raised`}>
      <ImageSlideshow images={galleryOf(p)} alt={p.title} sizes={sizes} />
    </div>
  );
}

export default function ClientWork({ projects }: { projects: ProjectWithImages[] }) {
  if (projects.length === 0) return null;

  const [lead, ...rest] = projects;
  const names = projects.map((p) => splitTitle(p.title).name);

  return (
    <section id="work" className="py-20 md:py-28 border-t border-line">
      <div className="max-w-6xl mx-auto px-5 md:px-10">
        <div className="grid md:grid-cols-12 gap-6 mb-14 md:mb-20">
          <h2 className="md:col-span-6 font-display font-semibold tracking-tight text-4xl md:text-6xl leading-none">
            Client work
          </h2>
          <p className="md:col-span-6 text-ink-soft text-lg leading-relaxed md:pt-2">
            Websites and systems I built as a freelancer for {names.length} businesses:{" "}
            <span className="text-ink">{names.join(", ")}</span>.
          </p>
        </div>

        <article id={lead.slug} className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          <div className="lg:col-span-8">
            <Media p={lead} ratio="aspect-[16/10]" sizes="(min-width: 1024px) 66vw, 100vw" />
          </div>
          <div className="lg:col-span-4">
            <CaseText p={lead} large />
          </div>
        </article>

        {rest.length > 0 && (
          <div className="mt-20 md:mt-28 grid md:grid-cols-2 gap-x-10 gap-y-16">
            {rest.map((p, i) => (
              <article key={p.id} id={p.slug} className={i % 2 === 1 ? "md:mt-24" : ""}>
                <Media
                  p={p}
                  ratio="aspect-[16/10]"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
                <div className="mt-6">
                  <CaseText p={p} />
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
