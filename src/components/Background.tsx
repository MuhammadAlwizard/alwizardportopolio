import { getEducation, getExperience, getSkills } from "@/lib/data";

export default async function Background() {
  const [experience, education, skills] = await Promise.all([
    getExperience(),
    getEducation(),
    getSkills(),
  ]);
  const skillGroups = Object.entries(skills);

  return (
    <section id="background" className="py-20 md:py-28 border-t border-line bg-paper-deep tex-grid">
      <div className="max-w-6xl mx-auto px-5 md:px-10 grid md:grid-cols-12 gap-12 md:gap-8">
        <div className="md:col-span-4">
          <div className="md:sticky md:top-24">
            <h2 className="font-display font-semibold tracking-tight text-4xl md:text-5xl leading-none mb-6">
              Background
            </h2>
            <p className="text-ink-soft leading-relaxed">
              Information Systems graduate from UNIKOM with a base in business process analysis,
              system development and data mining. I start from the business need, design the system
              around it with the SDLC, then build and ship it myself.
            </p>
          </div>
        </div>

        <div className="md:col-span-8 space-y-16">
          {experience.length > 0 && (
            <div>
              <h3 className="meta mb-2">Experience</h3>
              <ol>
                {experience.map((e) => (
                  <li key={e.id} className="grid sm:grid-cols-[9rem_1fr] gap-2 sm:gap-6 py-6 border-b border-line">
                    <p className="meta pt-1">{e.period}</p>
                    <div>
                      <p className="font-display font-semibold text-xl leading-snug">{e.role}</p>
                      <p className="text-ink-soft text-sm mb-3">{e.company}</p>
                      <ul className="space-y-1.5 text-sm text-ink-soft leading-relaxed list-disc pl-4 marker:text-line">
                        {e.points
                          .split("\n")
                          .filter((pt) => pt.trim())
                          .map((pt, i) => (
                            <li key={i}>{pt}</li>
                          ))}
                      </ul>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {education.length > 0 && (
            <div>
              <h3 className="meta mb-2">Education</h3>
              <ol>
                {education.map((e) => (
                  <li key={e.id} className="grid sm:grid-cols-[9rem_1fr] gap-2 sm:gap-6 py-6 border-b border-line">
                    <p className="meta pt-1">
                      {e.startYear} - {e.endYear ?? "now"}
                    </p>
                    <div>
                      <p className="font-display font-semibold text-xl leading-snug">{e.degree}</p>
                      <p className="text-ink-soft text-sm">
                        {e.institution}
                        {e.gpa ? ` · GPA ${e.gpa}` : ""}
                        {e.status === "ONGOING" ? " · in progress" : ""}
                      </p>
                      {e.description && (
                        <p className="text-sm text-ink-soft leading-relaxed mt-3">{e.description}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {skillGroups.length > 0 && (
            <div>
              <h3 className="meta mb-2">Skills</h3>
              <dl>
                {skillGroups.map(([category, names]) => (
                  <div key={category} className="grid sm:grid-cols-[9rem_1fr] gap-2 sm:gap-6 py-5 border-b border-line">
                    <dt className="meta pt-0.5">{category}</dt>
                    <dd className="leading-relaxed">{names.join(", ")}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
