import { getEducation, getSkills } from "@/lib/data";

export default async function EducationSkills() {
  const [education, skills] = await Promise.all([getEducation(), getSkills()]);

  return (
    <section id="skills" className="py-24 md:py-32 border-t border-gold-500/10">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <p className="eyebrow mb-4">03 · Background</p>
        <h2 className="section-title text-3xl md:text-4xl text-ivory mb-14">
          Education &amp; Skills
        </h2>

        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <h3 className="text-gold-500 font-medium mb-6 text-sm uppercase tracking-wider">
              Education
            </h3>
            <div className="space-y-6">
              {education.map((e) => (
                <div key={e.id} className="card-surface rounded-2xl p-6">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h4 className="font-display text-lg text-ivory">{e.degree}</h4>
                    <span className="shrink-0 text-xs rounded-full px-3 py-1 border border-gold-500/30 text-gold-500">
                      {e.status === "GRADUATED" ? "Graduated" : "Ongoing"}
                    </span>
                  </div>
                  <p className="text-ivory/60 text-sm mb-1">{e.institution}</p>
                  <p className="text-ivory/40 text-sm mb-3">
                    {e.startYear} — {e.endYear ?? "Present"}
                    {e.gpa ? ` · GPA ${e.gpa}` : ""}
                  </p>
                  {e.description && (
                    <p className="text-ivory/60 text-sm leading-relaxed">{e.description}</p>
                  )}
                </div>
              ))}
              {education.length === 0 && (
                <p className="text-ivory/40 text-sm">Belum ada data pendidikan.</p>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-gold-500 font-medium mb-6 text-sm uppercase tracking-wider">
              Skills
            </h3>
            <div className="space-y-6">
              {Object.entries(skills).map(([category, names]) => (
                <div key={category}>
                  <p className="text-ivory/80 text-sm font-medium mb-3">{category}</p>
                  <div className="flex flex-wrap gap-2">
                    {names.map((n) => (
                      <span
                        key={n}
                        className="text-xs rounded-full px-3 py-1.5 bg-navy-800 border border-gold-500/10 text-ivory/70"
                      >
                        {n}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
