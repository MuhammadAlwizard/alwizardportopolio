
import Image from "next/image";
import { FiMail, FiPhone, FiMapPin, FiArrowDownRight, FiDownload } from "react-icons/fi";
import { FaLinkedin } from "react-icons/fa";
 
export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="absolute inset-0 grain-bg opacity-40 pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-[32rem] h-[32rem] rounded-full bg-gold-500/10 blur-3xl pointer-events-none" />
 
      <div className="max-w-6xl mx-auto px-6 md:px-10 relative grid md:grid-cols-[1.3fr_0.9fr] gap-12 items-center">
        <div>
          <p className="eyebrow mb-6">Information Systems · UNIKOM</p>
          <h1 className="section-title text-balance text-4xl sm:text-5xl md:text-6xl text-ivory mb-6">
            From Business Problems
            <br />
            to <span className="text-gold-500">Working Systems</span>
          </h1>
          <p className="text-ivory/70 text-lg max-w-xl mb-10 leading-relaxed">
            Information Systems graduate skilled in business process analysis and
            system development — turning business needs into functional,
            database-driven solutions, with additional experience in web
            development and visual content.
          </p>
 
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full bg-gold-500 text-navy-900 px-6 py-3 font-medium hover:bg-gold-400 transition-colors"
            >
              View Projects <FiArrowDownRight />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-ivory/20 px-6 py-3 text-ivory hover:border-gold-500/60 hover:text-gold-500 transition-colors"
            >
              Get in Touch
            </a>
            <a
              href="/cv.pdf"
              download
              className="inline-flex items-center gap-2 rounded-full border border-ivory/20 px-6 py-3 text-ivory hover:border-gold-500/60 hover:text-gold-500 transition-colors"
            >
              <FiDownload /> Download CV
            </a>
          </div>
 
          <dl className="mt-14 grid grid-cols-3 gap-6 max-w-md text-sm">
            <div className="flex items-center gap-2 text-ivory/60">
              <FiMail className="text-gold-500 shrink-0" />
              <a href="mailto:alwizard659@gmail.com" className="hover:text-gold-500 transition-colors truncate">
                alwizard659@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-2 text-ivory/60">
              <FiPhone className="text-gold-500 shrink-0" />
              <span>0822-4033-5051</span>
            </div>
            <div className="flex items-center gap-2 text-ivory/60">
              <FiMapPin className="text-gold-500 shrink-0" />
              <span>Bandung, ID</span>
            </div>
          </dl>
        </div>
 
        <div className="relative mx-auto">
          <div className="absolute -inset-4 rounded-[2rem] border border-gold-500/20" />
          <div className="relative w-64 sm:w-80 aspect-[4/5] rounded-3xl overflow-hidden card-surface">
            <Image
              src="/images/profile.jpg"
              alt="Muhammad Alwizard"
              fill
              className="object-cover"
              priority
            />
          </div>
          <a
            href="https://linkedin.com/in/alwizard"
            target="_blank"
            rel="noreferrer"
            className="absolute -bottom-5 -left-5 card-surface rounded-2xl px-4 py-3 flex items-center gap-2 shadow-xl"
          >
            <FaLinkedin className="text-gold-500" />
            <span className="text-xs text-ivory/80">linkedin.com/in/alwizard</span>
          </a>
        </div>
      </div>
    </section>
  );
}
 
