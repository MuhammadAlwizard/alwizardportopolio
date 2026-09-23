import Image from "next/image";
import { FiArrowDownRight, FiDownload } from "react-icons/fi";

export default function Hero() {
  return (
    <section id="top" className="pt-14 pb-20 md:pt-24 md:pb-28">
      <div className="max-w-6xl mx-auto px-5 md:px-10 grid md:grid-cols-12 gap-10 md:gap-8 items-end">
        <div className="md:col-span-8">
          <p className="meta mb-6">Muhammad Alwizard · Bandung, Indonesia</p>
          <h1 className="font-display font-semibold tracking-tight text-[2.6rem] leading-[1.02] sm:text-6xl lg:text-[4.1rem] mb-7">
            Websites and systems <span className="text-accent">businesses run on.</span>
          </h1>
          <p className="text-ink-soft text-lg max-w-xl leading-relaxed mb-10">
            Freelance full-stack developer and Information Systems graduate, from database design to deployment.
          </p>

          <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-card bg-accent text-paper-raised px-6 py-3.5 font-medium hover:bg-accent-dark transition-colors"
            >
              Start a project <FiArrowDownRight aria-hidden />
            </a>
            <a
              href="/cv.pdf"
              download
              className="inline-flex items-center gap-2 font-medium underline decoration-line underline-offset-[6px] hover:decoration-accent transition-colors"
            >
              <FiDownload aria-hidden /> Download CV
            </a>
          </div>
        </div>

        <div className="md:col-span-4 md:pl-4">
          <div className="relative w-56 sm:w-64 md:w-full aspect-[4/5] rounded-card overflow-hidden bg-line">
            <Image
              src="/images/profile.jpg"
              alt="Portrait of Muhammad Alwizard"
              fill
              sizes="(min-width: 768px) 30vw, 16rem"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
