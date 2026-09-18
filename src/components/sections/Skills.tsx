"use client";

import { skills } from "@/data/resume";

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container-max">
        <div className="mono-chip inline-block">CAPABILITIES</div>
        <h2 className="mt-6 font-display text-4xl uppercase leading-tight md:text-5xl">
          Skills Matrix
        </h2>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {skills.map((group) => (
            <div key={group.category} className="glass-panel rounded-2xl p-6">
              <h3 className="font-display text-lg uppercase tracking-wide text-accent-bright">
                {group.category}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 px-4 py-1.5 text-sm text-text-dim transition-colors hover:border-accent-bright hover:text-text"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
