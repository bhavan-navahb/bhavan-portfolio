"use client";

import { useRef, type MouseEvent } from "react";
import { projects } from "@/data/resume";

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  const cardRef = useRef<HTMLDivElement>(null);

  function onMouseMove(e: MouseEvent<HTMLDivElement>) {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = x / rect.width;
    const py = y / rect.height;
    const rotateX = (0.5 - py) * 10;
    const rotateY = (px - 0.5) * 10;
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`;
    card.style.setProperty("--spot-x", `${px * 100}%`);
    card.style.setProperty("--spot-y", `${py * 100}%`);
  }

  function onMouseLeave() {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="glass-panel group relative overflow-hidden rounded-2xl p-8 transition-transform duration-200 ease-out"
      style={{
        backgroundImage:
          "radial-gradient(600px circle at var(--spot-x,50%) var(--spot-y,50%), rgba(196,0,36,0.12), transparent 40%)",
      }}
    >
      <div className="mono-chip inline-block">{project.type}</div>
      <h3 className="mt-4 font-display text-2xl uppercase leading-snug md:text-3xl">{project.title}</h3>
      <p className="mt-4 text-sm text-text-dim md:text-base">{project.description}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {project.stack.map((s) => (
          <span key={s} className="mono-chip">
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container-max">
        <div className="mono-chip inline-block">SELECTED WORK</div>
        <h2 className="mt-6 font-display text-4xl uppercase leading-tight md:text-5xl">Projects</h2>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
