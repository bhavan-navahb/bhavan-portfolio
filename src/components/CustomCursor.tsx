"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const touch = window.matchMedia("(pointer: coarse)").matches;
    setIsTouch(touch);
    if (touch) return;

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const dot = { x: mouse.x, y: mouse.y };
    const ring = { x: mouse.x, y: mouse.y };

    function onMove(e: MouseEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      const el = document.elementFromPoint(e.clientX, e.clientY);
      const magnetic = el?.closest("[data-magnetic]");
      setActive(!!magnetic);
    }
    window.addEventListener("mousemove", onMove);

    let rafId: number;
    function tick() {
      dot.x += (mouse.x - dot.x) * 0.35;
      dot.y += (mouse.y - dot.y) * 0.35;
      ring.x += (mouse.x - ring.x) * 0.15;
      ring.y += (mouse.y - ring.y) * 0.15;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dot.x}px, ${dot.y}px, 0) translate(-50%,-50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%,-50%)`;
      }
      rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (isTouch) return null;

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden />
      <div ref={ringRef} className={`cursor-ring ${active ? "is-active" : ""}`} aria-hidden />
    </>
  );
}
