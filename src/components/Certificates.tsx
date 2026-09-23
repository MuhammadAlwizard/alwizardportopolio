import { getCertificates } from "@/lib/data";
import MarqueeGallery from "./MarqueeGallery";

export default async function Certificates() {
  const certificates = await getCertificates();
  if (certificates.length === 0) return null;

  return (
    <section id="certificates" className="py-20 md:py-28 border-t border-line">
      <div className="max-w-6xl mx-auto px-5 md:px-10 flex flex-wrap items-end justify-between gap-4 mb-10">
        <h2 className="font-display font-semibold tracking-tight text-4xl md:text-5xl leading-none">
          Certificates
        </h2>
        <p className="meta">{certificates.length} certificates and trainings · click to enlarge</p>
      </div>

      <MarqueeGallery
        label="Certificates"
        fit="contain"
        reverse
        items={certificates.map((c) => ({
          id: c.id,
          title: c.title,
          subtitle: [c.issuer, c.date].filter(Boolean).join(" · "),
          description: c.description,
          images: c.image ? [{ url: c.image, caption: `${c.title} certificate` }] : [],
        }))}
      />
    </section>
  );
}
