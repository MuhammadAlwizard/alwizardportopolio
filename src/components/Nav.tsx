"use client";

import { useState } from "react";

const links = [
  { href: "#work", label: "Client work" },
  { href: "#projects", label: "Projects" },
  { href: "#background", label: "Background" },
  { href: "#certificates", label: "Certificates" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-paper/90 backdrop-blur border-b border-line">
      <nav className="max-w-6xl mx-auto px-5 md:px-10 h-16 flex items-center justify-between">
        <a href="#top" className="font-display text-lg font-semibold tracking-tight">
          Alwizard<span className="text-accent">.</span>
        </a>

        <ul className="hidden md:flex items-center gap-8 text-sm text-ink-soft">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="hover:text-accent transition-colors">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden p-2 -mr-2"
        >
          <span className="block w-6 h-px bg-current mb-1.5" />
          <span className="block w-6 h-px bg-current mb-1.5" />
          <span className="block w-4 h-px bg-current" />
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-line px-5 py-4 bg-paper">
          <ul className="flex flex-col gap-4">
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
