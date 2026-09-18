"use client";

import { useState, type FormEvent } from "react";
import { profile } from "@/data/resume";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name || "a visitor"}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <section id="contact" className="section">
      <div className="container-max grid gap-12 md:grid-cols-2">
        <div>
          <div className="mono-chip inline-block">GET IN TOUCH</div>
          <h2 className="mt-6 font-display text-4xl uppercase leading-tight md:text-5xl">
            Let&apos;s build the
            <br />
            next uptime win.
          </h2>
          <p className="mt-6 max-w-sm text-sm text-text-dim md:text-base">
            Open to opportunities in enterprise systems, data center operations, and workload automation.
          </p>

          <button
            onClick={copyEmail}
            data-magnetic
            className="mt-8 flex items-center gap-3 rounded-full border border-white/15 px-6 py-3 text-sm transition-colors hover:border-accent-bright"
          >
            <span className="font-mono">{profile.email}</span>
            <span className="text-accent-bright">{copied ? "Copied ✓" : "Copy"}</span>
          </button>

          <div className="mt-6 flex flex-wrap gap-4 text-sm text-text-dim">
            <a href={`tel:${profile.phone}`} data-magnetic className="hover:text-text">
              {profile.phone}
            </a>
            <span>·</span>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" data-magnetic className="hover:text-text">
              LinkedIn
            </a>
            <span>·</span>
            <span>{profile.location}</span>
          </div>
        </div>

        <form onSubmit={onSubmit} className="glass-panel rounded-2xl p-8">
          <div className="mb-2 font-mono text-xs uppercase tracking-wide text-accent-bright">
            transmit://message
          </div>
          <div className="grid gap-4">
            <input
              required
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="border-b border-white/15 bg-transparent py-3 text-sm outline-none placeholder:text-text-dim focus:border-accent-bright"
            />
            <input
              required
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="border-b border-white/15 bg-transparent py-3 text-sm outline-none placeholder:text-text-dim focus:border-accent-bright"
            />
            <textarea
              required
              placeholder="Message"
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="border-b border-white/15 bg-transparent py-3 text-sm outline-none placeholder:text-text-dim focus:border-accent-bright"
            />
          </div>
          <button
            type="submit"
            data-magnetic
            className="mt-6 w-full rounded-full bg-accent-red py-3 text-sm font-medium tracking-wide text-white transition-transform hover:scale-[1.02]"
          >
            {sent ? "OPENING MAIL CLIENT…" : "SEND MESSAGE →"}
          </button>
        </form>
      </div>

      <div className="container-max mt-20 border-t border-white/5 pt-8 text-center text-xs text-text-dim">
        © {new Date().getFullYear()} {profile.fullName}. Built with Next.js.
      </div>
    </section>
  );
}
