"use client";

import { useState } from "react";
import { timeline } from "@/data/resume";

type Filter = "all" | "work" | "education";

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "work", label: "Work Experience" },
  { id: "education", label: "Education" },
];

export default function Experience() {
  const [filter, setFilter] = useState<Filter>("all");

  const items = timeline.filter((t) => filter === "all" || t.kind === filter);

  return (
    <section id="experience" className="section">
      <div className="container-max">
        <div className="mono-chip inline-block">JOURNEY</div>
        <h2 className="mt-6 font-display text-4xl uppercase leading-tight md:text-5xl">
          Experience & Education
        </h2>

        <div className="mt-8 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              data-magnetic
              className={`rounded-full border px-5 py-2 text-sm transition-all duration-300 ${
                filter === f.id
                  ? "border-accent-bright bg-accent-red/20 text-white"
                  : "border-white/15 text-text-dim hover:border-white/30"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="relative mt-16">
          <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-accent-red via-accent-bright to-transparent shadow-[0_0_12px_rgba(224,0,42,0.6)] md:left-1/2" />

          <div className="flex flex-col gap-10">
            {items.map((item, i) => {
              const leftSide = i % 2 === 0;
              return (
                <div key={item.id} className="relative grid gap-6 md:grid-cols-2">
                  <span
                    className={`absolute left-4 top-2 -translate-x-1/2 md:left-1/2 h-3 w-3 rounded-full ${
                      item.status === "active"
                        ? "bg-emerald-400 shadow-[0_0_0_6px_rgba(52,211,153,0.15)]"
                        : "bg-accent-bright shadow-[0_0_0_6px_rgba(224,0,42,0.15)]"
                    }`}
                  />
                  <div
                    className={`pl-12 md:pl-0 ${
                      leftSide ? "md:col-start-1 md:pr-14 md:text-right" : "md:col-start-2 md:pl-14"
                    }`}
                  >
                    <div className="glass-panel rounded-2xl p-6">
                      <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-wide text-text-dim md:justify-end">
                        {leftSide ? (
                          <>
                            <span>{item.period}</span>
                            <span className="mono-chip">{item.kind === "work" ? "Work" : "Education"}</span>
                          </>
                        ) : (
                          <>
                            <span className="mono-chip">{item.kind === "work" ? "Work" : "Education"}</span>
                            <span>{item.period}</span>
                          </>
                        )}
                      </div>
                      <h3 className="mt-3 font-display text-xl uppercase">{item.title}</h3>
                      <div className="mt-1 text-sm text-accent-bright">{item.org}</div>
                      {item.meta && <div className="mt-1 text-xs text-text-dim">{item.meta}</div>}
                      <ul className={`mt-4 space-y-2 text-sm text-text-dim ${leftSide ? "md:text-right" : ""}`}>
                        {item.points.map((p) => (
                          <li key={p}>{p}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  {/* spacer for the opposite column on desktop */}
                  <div className={leftSide ? "hidden md:block" : "hidden md:block md:order-first"} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
