const stats = [
  { value: "2023", label: "Started S1 Information Systems, UNIKOM" },
  { value: "4+", label: "Academic projects: data mining, 3D, web systems" },
  { value: "3", label: "Work / internship roles in content & design" },
  { value: "5", label: "Certificates & trainings completed" },
];

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 border-t border-gold-500/10">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-[0.7fr_1.3fr] gap-12">
          <div>
            <p className="eyebrow mb-4">02 · Profile</p>
            <h2 className="section-title text-3xl md:text-4xl text-ivory">About Me</h2>
          </div>
          <div>
            <p className="text-ivory/70 text-lg leading-relaxed max-w-2xl">
              Fresh graduate in Information Systems with a strong foundation in
              business process analysis, system development, and data mining.
              Experienced in translating business needs into functional technical
              solutions, and comfortable applying the System Development Life Cycle
              (SDLC) to build database-driven systems — supported by additional
              hands-on experience in web development and visual content design.
            </p>

            <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-8">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-3xl md:text-4xl text-gold-500 mb-2">
                    {s.value}
                  </p>
                  <p className="text-sm text-ivory/60 leading-snug">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
