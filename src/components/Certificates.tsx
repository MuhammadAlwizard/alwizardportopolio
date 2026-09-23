import Image from "next/image";
import { getCertificates } from "@/lib/data";
import Slider from "./Slider";

export default async function Certificates() {
  const certificates = await getCertificates();
  if (certificates.length === 0) return null;

  return (
    <section id="certificates" className="py-20 md:py-28 border-t border-line">
      <div className="max-w-6xl mx-auto px-5 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <h2 className="font-display font-semibold tracking-tight text-4xl md:text-5xl leading-none">
            Certificates
          </h2>
          <p className="meta">{certificates.length} certificates and trainings</p>
        </div>

        <Slider label="Certificates">
          {certificates.map((c) => (
            <figure
              key={c.id}
              className="w-[78%] sm:w-[44%] lg:w-[30%] rounded-card border border-line bg-paper-raised overflow-hidden"
            >
              <div className="relative aspect-[4/3] bg-paper border-b border-line">
                {c.image ? (
                  <Image
                    src={c.image}
                    alt={`${c.title} certificate`}
                    fill
                    sizes="(min-width: 1024px) 30vw, 78vw"
                    className="object-contain p-4"
                  />
                ) : null}
              </div>
              <figcaption className="p-5">
                <p className="font-display font-semibold leading-snug">{c.title}</p>
                <p className="text-sm text-ink-soft mt-1">{c.issuer}</p>
                {c.date && <p className="meta mt-2">{c.date}</p>}
              </figcaption>
            </figure>
          ))}
        </Slider>
      </div>
    </section>
  );
}
