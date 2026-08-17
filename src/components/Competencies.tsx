const items = [
  {
    title: "Understand the Problem",
    desc: "Start by identifying the real business need before jumping into a solution.",
  },
  {
    title: "Design with Structure",
    desc: "Translate requirements into clear system designs — ERDs, flowcharts, and use cases.",
  },
  {
    title: "Build & Validate",
    desc: "Develop the system, then test it against real user requirements before delivery.",
  },
  {
    title: "Communicate Clearly",
    desc: "Document and present technical work in a way stakeholders can act on.",
  },
];

export default function Competencies() {
  return (
    <section className="py-24 md:py-32 border-t border-gold-500/10 bg-navy-950/40">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <p className="eyebrow mb-4">04 · How I Work</p>
        <h2 className="section-title text-3xl md:text-4xl text-ivory mb-14 max-w-xl">
          Core Competencies
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <div key={item.title} className="card-surface rounded-2xl p-6">
              <p className="font-display text-2xl text-gold-500 mb-4">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="text-ivory font-medium mb-2">{item.title}</h3>
              <p className="text-ivory/60 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
