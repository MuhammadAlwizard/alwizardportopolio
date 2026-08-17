"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#certificates", label: "Certificates" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-navy-900/90 backdrop-blur border-b border-gold-500/10" : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <a href="#top" className="font-display text-lg tracking-wide text-ivory">
          M<span className="text-gold-500">.</span>Alwizard
        </a>

        <ul className="hidden md:flex items-center gap-8 text-sm text-ivory/80">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="hover:text-gold-500 transition-colors">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden md:inline-flex items-center rounded-full border border-gold-500/40 px-4 py-1.5 text-sm text-gold-500 hover:bg-gold-500 hover:text-navy-900 transition-colors"
        >
          Let&apos;s Talk
        </a>

        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-ivory p-2"
        >
          <span className="block w-6 h-px bg-current mb-1.5" />
          <span className="block w-6 h-px bg-current mb-1.5" />
          <span className="block w-4 h-px bg-current" />
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-navy-900 border-t border-gold-500/10 px-6 py-4">
          <ul className="flex flex-col gap-4 text-ivory/90">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
