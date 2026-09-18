"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Lenis from "@studio-freight/lenis";

export default function LenisProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    let rafId = requestAnimationFrame(raf);

    // Update the shared scroll-progress bar and expose progress for other components
    lenis.on("scroll", (instance: { progress: number }) => {
      const progress = instance?.progress ?? 0;
      document.documentElement.style.setProperty("--scroll-progress", String(progress));
      window.dispatchEvent(new CustomEvent("lenis-scroll", { detail: { progress } }));
    });

    // Smooth-scroll for in-page anchor links
    function onClick(e: MouseEvent) {
      const target = (e.target as HTMLElement)?.closest("a[href^='#']") as HTMLAnchorElement | null;
      if (!target) return;
      const id = target.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        lenis.scrollTo(el as HTMLElement, { offset: -20 });
      }
    }
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
