import Image from "next/image";
import { getCertificates } from "@/lib/data";

export default async function Certificates() {
  const certificates = await getCertificates();

  return (
    <section id="certificates" className="py-24 md:py-32 border-t border-gold-500/10">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <p className="eyebrow mb-4">07 · Credentials</p>
        <h2 className="section-title text-3xl md:text-4xl text-ivory mb-14 max-w-xl">
          Certificates &amp; Training
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((c) => (
            <div key={c.id} className="card-surface rounded-2xl overflow-hidden group">
              {c.image && (
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={c.image}
                    alt={c.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              <div className="p-5">
                <h3 className="font-display text-lg text-ivory mb-1">{c.title}</h3>
                <p className="text-gold-500 text-sm mb-1">{c.issuer}</p>
                {c.date && <p className="text-ivory/40 text-xs mb-2">{c.date}</p>}
                {c.description && (
                  <p className="text-ivory/60 text-sm leading-relaxed">{c.description}</p>
                )}
              </div>
            </div>
          ))}

          {certificates.length === 0 && (
            <p className="text-ivory/40 text-sm">Belum ada sertifikat.</p>
          )}
        </div>
      </div>
    </section>
  );
}
