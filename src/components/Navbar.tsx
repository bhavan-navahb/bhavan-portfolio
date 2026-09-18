"use client";

import { useEffect, useRef, useState } from "react";
import { navLinks, profile } from "@/data/resume";

export default function Navbar() {
  const [active, setActive] = useState(navLinks[0].href);
  const [open, setOpen] = useState(false);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector(l.href))
      .filter(Boolean) as Element[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = linkRefs.current[active];
    if (el) {
      setPillStyle({ left: el.offsetLeft, width: el.offsetWidth });
    }
  }, [active]);

  return (
    <header className="fixed top-4 left-1/2 z-50 w-[min(94vw,880px)] -translate-x-1/2">
      <nav className="glass-panel flex items-center justify-between rounded-full px-5 py-3">
        <a href="#" data-magnetic className="font-display text-lg tracking-wide">
          {profile.firstName}
          <span className="text-accent-bright">.</span>
        </a>

        <div className="relative hidden items-center gap-1 md:flex">
          <div
            className="absolute top-0 h-full rounded-full bg-white/5 transition-all duration-300 ease-out"
            style={{ left: pillStyle.left, width: pillStyle.width }}
          />
          {navLinks.map((link) => (
            <a
              key={link.href}
              ref={(el) => {
                linkRefs.current[link.href] = el;
              }}
              href={link.href}
              data-magnetic
              className={`relative z-10 px-4 py-2 text-sm transition-colors ${
                active === link.href ? "text-text" : "text-text-dim hover:text-text"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <button
          data-magnetic
          onClick={() => setOpen((v) => !v)}
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Toggle menu"
        >
          <span className={`h-px w-6 bg-text transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`h-px w-6 bg-text transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`h-px w-6 bg-text transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </nav>

      {open && (
        <div className="glass-panel mt-2 flex flex-col rounded-2xl p-4 md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="border-b border-white/5 py-3 text-sm text-text-dim last:border-none hover:text-text"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
