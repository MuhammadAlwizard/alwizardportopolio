import { getExperience } from "@/lib/data";

export default async function Experience() {
  const experience = await getExperience();

  return (
    <section id="experience" className="py-24 md:py-32 border-t border-gold-500/10">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <p className="eyebrow mb-4">05 · Track Record</p>
        <h2 className="section-title text-3xl md:text-4xl text-ivory mb-14">
          Work Experience
        </h2>

        <div className="relative border-l border-gold-500/20 pl-8 space-y-12 max-w-3xl">
          {experience.map((e) => (
            <div key={e.id} className="relative">
              <span className="absolute -left-[38px] top-1.5 w-3 h-3 rounded-full bg-gold-500" />
              <p className="text-gold-500 text-sm mb-1">{e.period}</p>
              <h3 className="font-display text-xl text-ivory mb-1">{e.role}</h3>
              <p className="text-ivory/50 text-sm mb-4">{e.company}</p>
              <ul className="space-y-2">
                {e.points.split("\n").map((pt, i) => (
                  <li key={i} className="text-ivory/65 text-sm leading-relaxed flex gap-2">
                    <span className="text-gold-500 mt-1.5 block w-1 h-1 rounded-full bg-gold-500 shrink-0" />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {experience.length === 0 && (
            <p className="text-ivory/40 text-sm">Belum ada data pengalaman.</p>
          )}
        </div>
      </div>
    </section>
  );
}
