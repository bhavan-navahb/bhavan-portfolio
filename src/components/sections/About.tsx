"use client";

import { profile, achievements } from "@/data/resume";

const strengths = [
  { label: "Batch Automation", detail: "Control-M workload design, calendars, forecasting, RCA" },
  { label: "Cross-Platform Ops", detail: "Tandem NonStop, IBM AS/400, Mainframe, Windows Server" },
  { label: "Incident & Change Mgmt", detail: "24x7 production support, RCA, preventive fixes" },
  { label: "Security & Compliance", detail: "Access control, PAM migrations, data confidentiality" },
];

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container-max grid gap-12 md:grid-cols-2">
        <div>
          <div className="mono-chip inline-block">ABOUT</div>
          <h2 className="mt-6 font-display text-4xl uppercase leading-tight md:text-5xl">
            The engineer behind
            <br />
            the console.
          </h2>

          <div className="mt-8 glass-panel rounded-2xl p-6 font-mono text-sm leading-relaxed text-text-dim">
            <p className="text-accent-bright">$ whoami</p>
            <p className="mt-2 text-text">{profile.fullName}</p>
            <p className="mt-4 text-accent-bright">$ cat bio.txt</p>
            <p className="mt-2">{profile.bio}</p>
            <p className="mt-4 text-accent-bright">$ location --current</p>
            <p className="mt-2">{profile.location}</p>
          </div>

          <ul className="mt-8 space-y-3">
            {achievements.map((a) => (
              <li key={a} className="flex gap-3 text-sm text-text-dim">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-bright" />
                {a}
              </li>
            ))}
          </ul>
        </div>

        <div className="grid content-start gap-4">
          {strengths.map((s) => (
            <div
              key={s.label}
              className="glass-panel rounded-xl border-l-2 border-l-accent-red p-5 transition-colors hover:border-l-accent-bright"
            >
              <div className="font-display text-lg uppercase tracking-wide">{s.label}</div>
              <div className="mt-1 text-sm text-text-dim">{s.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
