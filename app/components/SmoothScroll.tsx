"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef } from "react";

type LenisInstance = {
  raf: (time: number) => void;
  destroy: () => void;
};

declare global {
  interface Window {
    Lenis?: new (options: { duration: number; smoothWheel: boolean; anchors: boolean }) => LenisInstance;
  }
}

export default function SmoothScroll() {
  const lenisRef = useRef<LenisInstance | null>(null);
  const frameRef = useRef<number | null>(null);

  const initialize = useCallback(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const Lenis = window.Lenis;
    if (!Lenis || lenisRef.current) return;

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true, anchors: true });
    lenisRef.current = lenis;

    const animate = (time: number) => {
      lenis.raf(time);
      frameRef.current = window.requestAnimationFrame(animate);
    };

    frameRef.current = window.requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <Script src="/lenis.min.js" strategy="afterInteractive" onReady={initialize} />;
}
