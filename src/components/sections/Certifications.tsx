"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import { certifications, type Certification } from "@/data/resume";

function useRadius() {
  const [radius, setRadius] = useState(480);
  useEffect(() => {
    function update() {
      const w = window.innerWidth;
      if (w < 640) setRadius(275);
      else if (w < 1024) setRadius(380);
      else setRadius(480);
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return radius;
}

export default function Certifications() {
  const N = certifications.length;
  const step = 360 / N;
  const radius = useRadius();

  const rotationRef = useRef(0);
  const [, forceRender] = useState(0);
  const velocityRef = useRef(0);
  const isDraggingRef = useRef(false);
  const dragStartX = useRef(0);
  const dragStartRotation = useRef(0);
  const samplesRef = useRef<{ x: number; t: number }[]>([]);
  const [autoSpin, setAutoSpin] = useState(true);
  const [activeCert, setActiveCert] = useState<Certification | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number;
    function loop() {
      if (!isDraggingRef.current) {
        if (Math.abs(velocityRef.current) > 0.01) {
          rotationRef.current += velocityRef.current;
          velocityRef.current *= 0.945;
        } else if (autoSpin) {
          rotationRef.current += 0.06;
        }
      }
      if (trackRef.current) {
        trackRef.current.style.transform = `translateZ(-${radius}px) rotateY(${rotationRef.current}deg)`;
      }
      rafId = requestAnimationFrame(loop);
    }
    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, [autoSpin, radius]);

  // Periodically sync the front-index indicator (dots / click targeting) without
  // re-rendering on every animation frame.
  useEffect(() => {
    const id = setInterval(() => forceRender((n) => n + 1), 180);
    return () => clearInterval(id);
  }, []);

  function onPointerDown(e: PointerEvent) {
    isDraggingRef.current = true;
    velocityRef.current = 0;
    dragStartX.current = e.clientX;
    dragStartRotation.current = rotationRef.current;
    samplesRef.current = [{ x: e.clientX, t: performance.now() }];
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: PointerEvent) {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - dragStartX.current;
    rotationRef.current = dragStartRotation.current + dx * 0.25;
    samplesRef.current.push({ x: e.clientX, t: performance.now() });
    if (samplesRef.current.length > 6) samplesRef.current.shift();
  }

  function onPointerUp() {
    isDraggingRef.current = false;
    const samples = samplesRef.current;
    if (samples.length >= 2) {
      const first = samples[0];
      const last = samples[samples.length - 1];
      const dt = last.t - first.t || 16;
      const dx = last.x - first.x;
      velocityRef.current = (dx / dt) * 4 * 0.25;
    }
  }

  function focusCard(index: number) {
    const targetAngle = -index * step;
    // shortest rotational delta to bring card to front (0deg)
    const current = rotationRef.current % 360;
    let delta = targetAngle - current;
    delta = ((delta + 180) % 360) - 180;
    rotationRef.current += delta;
    velocityRef.current = 0;
  }

  const frontIndex = (() => {
    const norm = ((-rotationRef.current % 360) + 360) % 360;
    return Math.round(norm / step) % N;
  })();

  return (
    <section id="certifications" className="section overflow-hidden">
      <div className="container-max">
        <div className="mono-chip inline-block">VERIFIED CREDENTIALS</div>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <h2 className="font-display text-4xl uppercase leading-tight md:text-5xl">Certifications</h2>
          <button
            onClick={() => setAutoSpin((v) => !v)}
            data-magnetic
            className="mono-chip"
          >
            {autoSpin ? "AUTO-SPIN ON" : "AUTO-SPIN PAUSED"}
          </button>
        </div>

        <div
          className="gallery-drag-surface relative mt-16 h-[420px] select-none"
          style={{ perspective: "1400px" }}
          onPointerDown={onPointerDown}
          onPointerMove={(e) => {
            onPointerMove(e);
            forceRender((n) => n + 1);
          }}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <div
            ref={trackRef}
            className="absolute left-1/2 top-1/2 h-0 w-0"
            style={{ transformStyle: "preserve-3d", transform: `translateZ(-${radius}px)` }}
          >
            {certifications.map((cert, i) => {
              const angle = i * step;
              return (
                <div
                  key={cert.id}
                  onClick={() => (i === frontIndex ? setActiveCert(cert) : focusCard(i))}
                  className="absolute left-1/2 top-1/2 flex h-[260px] w-[220px] cursor-pointer flex-col rounded-2xl border border-white/10 bg-[#0c0c0c] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
                  style={{
                    transform: `translate(-50%, -50%) rotateY(${angle}deg) translateZ(${radius}px)`,
                    backfaceVisibility: "hidden",
                  }}
                >
                  <div className="h-1 w-12 rounded-full bg-accent-bright shadow-[0_0_12px_rgba(224,0,42,0.9)]" />
                  <div className="mt-4 font-mono text-[10px] uppercase tracking-wide text-text-dim">
                    {cert.code}
                  </div>
                  <h3 className="mt-3 font-display text-lg uppercase leading-snug">{cert.title}</h3>
                  <div className="mt-2 text-xs text-text-dim">{cert.issuer}</div>
                  <div className="mt-auto text-xs text-accent-bright">{cert.date}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-10 flex justify-center gap-2">
          {certifications.map((c, i) => (
            <button
              key={c.id}
              onClick={() => focusCard(i)}
              aria-label={`Focus ${c.title}`}
              className={`h-2 w-2 rounded-full transition-all ${
                frontIndex === i ? "w-6 bg-accent-bright" : "bg-white/20"
              }`}
            />
          ))}
        </div>
      </div>

      {activeCert && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/80 p-6"
          onClick={() => setActiveCert(null)}
        >
          <div
            className="glass-panel w-full max-w-md rounded-2xl p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mono-chip inline-block">VERIFIED</div>
            <h3 className="mt-4 font-display text-2xl uppercase">{activeCert.title}</h3>
            <div className="mt-1 text-sm text-accent-bright">{activeCert.issuer}</div>
            <div className="mt-4 break-all rounded-lg border border-white/10 bg-black/40 p-3 font-mono text-xs text-emerald-400">
              {activeCert.hash}
            </div>
            <div className="mt-4 text-xs uppercase tracking-wide text-text-dim">Issued {activeCert.date}</div>
            <div className="mt-6 flex flex-wrap gap-2">
              {activeCert.competencies.map((c) => (
                <span key={c} className="mono-chip">
                  {c}
                </span>
              ))}
            </div>
            <button
              onClick={() => setActiveCert(null)}
              data-magnetic
              className="mt-8 w-full rounded-full border border-white/15 py-3 text-sm hover:border-accent-bright"
            >
              CLOSE
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
