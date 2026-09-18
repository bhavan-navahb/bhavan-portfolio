"use client";

import { useEffect, useRef } from "react";

export default function CinematicVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const targetRef = useRef(0);
  const currentRef = useRef(0);
  const readyRef = useRef(false);
  const durationRef = useRef(0);

  const cursorX = useRef(0.5);
  const cursorY = useRef(0.5);
  const tiltX = useRef(0);
  const tiltY = useRef(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    function onLoaded() {
      if (!video) return;
      readyRef.current = true;
      durationRef.current = video.duration || 0;
      video.pause();
      try {
        video.currentTime = 0;
      } catch {
        /* ignore seek errors on unready buffers */
      }
    }
    video.addEventListener("loadedmetadata", onLoaded);
    video.addEventListener("canplay", onLoaded);

    function computeTarget() {
      if (!durationRef.current) return;
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;
      // Blend scroll progress (dominant driver) with cursor X (fine-grained scrub)
      const blended = scrollProgress * 0.75 + cursorX.current * 0.25;
      targetRef.current = Math.min(1, Math.max(0, blended)) * durationRef.current;
    }

    function onScroll() {
      computeTarget();
      if (progressRef.current) {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const p = docHeight > 0 ? window.scrollY / docHeight : 0;
        progressRef.current.style.transform = `scaleX(${Math.min(1, Math.max(0, p))})`;
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("lenis-scroll" as any, onScroll as any);

    function onMouseMove(e: MouseEvent) {
      const xp = e.clientX / window.innerWidth;
      const yp = e.clientY / window.innerHeight;
      cursorX.current = xp;
      cursorY.current = yp;
      tiltX.current = xp - 0.5;
      tiltY.current = yp - 0.5;
      computeTarget();

      if (glowRef.current) {
        glowRef.current.style.background = `radial-gradient(at ${xp * 100}% ${yp * 100}%, rgba(196,0,36,0.18), transparent 60%)`;
      }
      if (containerRef.current) {
        const dx = tiltX.current;
        const dy = tiltY.current;
        containerRef.current.style.transform = `scale(1.06) translate3d(${dx * -15}px, ${dy * -15}px, 0) rotateX(${dy * -2}deg) rotateY(${dx * 2}deg)`;
      }
    }
    window.addEventListener("mousemove", onMouseMove);

    let rafId: number;
    function loop() {
      currentRef.current += (targetRef.current - currentRef.current) * 0.1;
      if (video && Math.abs(video.currentTime - currentRef.current) > 0.001) {
        try {
          video.currentTime = currentRef.current;
        } catch {
          /* seek queue busy — next frame will retry */
        }
      }
      rafId = requestAnimationFrame(loop);
    }
    rafId = requestAnimationFrame(loop);

    onScroll();

    return () => {
      video.removeEventListener("loadedmetadata", onLoaded);
      video.removeEventListener("canplay", onLoaded);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("lenis-scroll" as any, onScroll as any);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-bg">
      <div
        ref={containerRef}
        className="absolute inset-0 will-change-transform"
        style={{ transformStyle: "preserve-3d" }}
      >
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          src="/video/portfolio-background.mp4"
          playsInline
          muted
          preload="auto"
        />
      </div>
      <div className="cine-vignette" />
      <div id="cine-glow" ref={glowRef} className="cine-glow" />
      <div className="cine-grain" />
      <div className="cine-scan" />
      <div ref={progressRef} className="scroll-progress" style={{ transform: "scaleX(0)" }} />
    </div>
  );
}
