"use client";

import CinematicVideo from "@/components/CinematicVideo";
import { profile, metrics } from "@/data/resume";

export default function Hero() {
  return (
    <section id="hero" className="relative flex min-h-screen items-center overflow-hidden">
      <CinematicVideo />

      {/* Watermark */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-10 left-0 select-none whitespace-nowrap font-display font-bold uppercase leading-none tracking-tight"
        style={{
          fontSize: "clamp(6rem, 22vw, 20rem)",
          WebkitTextStroke: "2px rgba(196, 0, 36, 0.35)",
          color: "transparent",
          textShadow: "0 0 50px rgba(196, 0, 36, 0.18)",
        }}
      >
        {profile.firstName}
      </div>

      <div className="container-max relative z-10 w-full px-6 md:px-16">
        <div className="mono-chip inline-block">{profile.eyebrow}</div>

        <h1 className="mt-6 max-w-full font-display uppercase leading-[0.95] md:max-w-[13ch]">
          <span
            className="block font-semibold text-white"
            style={{ fontSize: "clamp(2.75rem, 8vw, 6rem)" }}
          >
            Building Ideas
          </span>
          <span
            className="text-gradient-red block font-semibold"
            style={{ fontSize: "clamp(2.75rem, 8vw, 6rem)" }}
          >
            Into Experiences
            <span style={{ color: "#e0002a", textShadow: "0 0 24px rgba(224,0,42,0.8)" }}>.</span>
          </span>
        </h1>

        <p className="mt-6 max-w-md text-sm text-text-dim md:text-base">{profile.bio}</p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#projects"
            data-magnetic
            className="rounded-full bg-accent-red px-7 py-3 text-sm font-medium tracking-wide text-white transition-transform hover:scale-105"
          >
            EXPLORE WORK →
          </a>
          <a
            href="/Bhavan_Seshu_Pokala_Resume.pdf"
            download
            data-magnetic
            className="rounded-full border border-white/20 px-7 py-3 text-sm font-medium tracking-wide text-white transition-colors hover:border-white/50"
          >
            DOWNLOAD RÉSUMÉ
          </a>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-6 md:grid-cols-4">
          {metrics.map((m) => (
            <div key={m.label}>
              <div className="font-mono text-2xl text-accent-bright md:text-3xl">{m.value}</div>
              <div className="mt-1 text-xs uppercase tracking-wide text-text-dim">{m.label}</div>
            </div>
          ))}
          <div className="col-span-2 flex items-center gap-2 md:col-span-4">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="text-xs uppercase tracking-wide text-text-dim">{profile.status}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
