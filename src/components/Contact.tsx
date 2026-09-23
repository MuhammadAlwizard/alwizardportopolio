"use client";

import { useState } from "react";
import { FiArrowUpRight, FiCheck } from "react-icons/fi";

const inputClass =
  "w-full bg-paper-raised border border-line rounded-card px-4 py-3 placeholder:text-ink-faint focus:border-accent outline-none transition-colors";

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
        setErrorMsg(json.error ?? "Could not send the message.");
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMsg("Could not reach the server. Please try again, or email me directly.");
    }
  }

  return (
    <section id="contact" className="py-20 md:py-28 border-t border-line">
      <div className="max-w-6xl mx-auto px-5 md:px-10 grid md:grid-cols-12 gap-12 md:gap-8">
        <div className="md:col-span-6">
          <h2 className="font-display font-semibold tracking-tight text-4xl md:text-6xl leading-[1.02] text-balance mb-6">
            Have a project or a role in mind?
          </h2>
          <p className="text-ink-soft text-lg leading-relaxed max-w-md mb-10">
            I take on freelance builds and I am open to full-time roles in web development and
            systems analysis. Tell me what you need.
          </p>

          <a
            href="mailto:alwizard659@gmail.com"
            className="group inline-flex items-center gap-2 font-display font-semibold text-2xl md:text-3xl tracking-tight underline decoration-line decoration-2 underline-offset-8 hover:decoration-accent transition-colors break-all"
          >
            alwizard659@gmail.com
            <FiArrowUpRight aria-hidden className="shrink-0 text-accent transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>

          <p className="meta mt-8">
            <a href="https://wa.me/6282240335051" className="hover:text-accent transition-colors">
              WhatsApp 0822-4033-5051
            </a>
            {" · "}
            <a href="https://linkedin.com/in/alwizard" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">
              LinkedIn
            </a>
            {" · "}Bandung, Indonesia
          </p>
        </div>

        <form onSubmit={handleSubmit} className="md:col-span-6 space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Name
            </label>
            <input id="name" name="name" type="text" required maxLength={100} autoComplete="name" className={inputClass} />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input id="email" name="email" type="email" required maxLength={150} autoComplete="email" className={inputClass} />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              What do you need?
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              maxLength={3000}
              className={`${inputClass} resize-none`}
              placeholder="A website for your business, an admin panel, a job opening..."
            />
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-card bg-ink text-paper-raised px-7 py-3.5 font-medium hover:bg-accent transition-colors disabled:opacity-50"
          >
            {status === "loading" ? "Sending..." : "Send message"}
          </button>

          <div aria-live="polite">
            {status === "success" && (
              <p className="flex items-center gap-2 text-sm">
                <FiCheck aria-hidden className="text-accent" /> Message sent. Thank you, I will get back to you soon.
              </p>
            )}
            {status === "error" && <p className="text-sm text-accent">{errorMsg}</p>}
          </div>
        </form>
      </div>
    </section>
  );
}
