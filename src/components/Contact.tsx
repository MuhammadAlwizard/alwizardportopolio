"use client";

import { useState } from "react";
import { FiMail, FiPhone, FiMapPin, FiCheck } from "react-icons/fi";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMsg(json.error ?? "Gagal mengirim pesan.");
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMsg("Tidak bisa terhubung ke server. Coba lagi.");
    }
  }

  return (
    <section id="contact" className="py-24 md:py-32 border-t border-gold-500/10 bg-navy-950/40">
      <div className="max-w-6xl mx-auto px-6 md:px-10 grid md:grid-cols-[0.8fr_1.2fr] gap-14">
        <div>
          <p className="eyebrow mb-4">08 · Contact</p>
          <h2 className="section-title text-3xl md:text-4xl text-ivory mb-6">
            Let&apos;s Collaborate
          </h2>
          <p className="text-ivory/60 leading-relaxed mb-10">
            Open to internships, entry-level roles, and collaborations in systems
            analysis, web development, or content design. Send a message and I&apos;ll
            get back to you.
          </p>

          <ul className="space-y-4 text-sm">
            <li className="flex items-center gap-3 text-ivory/70">
              <FiMail className="text-gold-500" /> alwizard659@gmail.com
            </li>
            <li className="flex items-center gap-3 text-ivory/70">
              <FiPhone className="text-gold-500" /> 0822-4033-5051
            </li>
            <li className="flex items-center gap-3 text-ivory/70">
              <FiMapPin className="text-gold-500" /> Bandung, Indonesia
            </li>
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="card-surface rounded-2xl p-8 space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm text-ivory/70 mb-2">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full bg-navy-900 border border-gold-500/15 rounded-lg px-4 py-3 text-ivory placeholder:text-ivory/30 focus:border-gold-500/60 outline-none transition-colors"
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm text-ivory/70 mb-2">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full bg-navy-900 border border-gold-500/15 rounded-lg px-4 py-3 text-ivory placeholder:text-ivory/30 focus:border-gold-500/60 outline-none transition-colors"
              placeholder="you@email.com"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm text-ivory/70 mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              className="w-full bg-navy-900 border border-gold-500/15 rounded-lg px-4 py-3 text-ivory placeholder:text-ivory/30 focus:border-gold-500/60 outline-none transition-colors resize-none"
              placeholder="Tell me about the opportunity or project..."
            />
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gold-500 text-navy-900 px-6 py-3 font-medium hover:bg-gold-400 transition-colors disabled:opacity-50"
          >
            {status === "loading" ? "Sending..." : "Send Message"}
          </button>

          {status === "success" && (
            <p className="flex items-center gap-2 text-sm text-green-400">
              <FiCheck /> Pesan terkirim. Terima kasih!
            </p>
          )}
          {status === "error" && <p className="text-sm text-red-400">{errorMsg}</p>}
        </form>
      </div>
    </section>
  );
}
