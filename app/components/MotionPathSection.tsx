"use client";

import { useEffect, useRef } from "react";

type ScrollTriggerInstance = {
  kill: () => void;
};

type TimelineInstance = {
  to: (target: Element, vars: Record<string, unknown>, position?: number) => TimelineInstance;
  scrollTrigger?: ScrollTriggerInstance;
  kill: () => void;
};

type GsapInstance = {
  registerPlugin: (...plugins: unknown[]) => void;
  set: (target: Element | Element[], vars: Record<string, unknown>) => void;
  timeline: (vars: Record<string, unknown>) => TimelineInstance;
};

declare global {
  interface Window {
    gsap?: GsapInstance;
    ScrollTrigger?: unknown;
    DrawSVGPlugin?: unknown;
    MotionPathPlugin?: unknown;
  }
}

const gsapFiles = [
  "/gsap/3.15.0/gsap.min.js",
  "/gsap/3.15.0/ScrollTrigger.min.js",
  "/gsap/3.15.0/DrawSVGPlugin.min.js",
  "/gsap/3.15.0/MotionPathPlugin.min.js",
];

function loadScript(src: string) {
  return new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[data-gsap-src="${src}"]`);
    if (existing?.dataset.loaded === "true") {
      resolve();
      return;
    }

    const script = existing ?? document.createElement("script");
    const onLoad = () => {
      script.dataset.loaded = "true";
      resolve();
    };
    const onError = () => reject(new Error(`Could not load ${src}`));
    script.addEventListener("load", onLoad, { once: true });
    script.addEventListener("error", onError, { once: true });
    if (!existing) {
      script.src = src;
      script.async = true;
      script.dataset.gsapSrc = src;
      document.head.appendChild(script);
    }
  });
}

export default function MotionPathSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let cancelled = false;
    let timeline: TimelineInstance | undefined;

    const initialize = async () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      try {
        for (const src of gsapFiles) await loadScript(src);
        if (cancelled || !sectionRef.current || !window.gsap || !window.ScrollTrigger || !window.DrawSVGPlugin || !window.MotionPathPlugin) return;

        const section = sectionRef.current;
        const path = section.querySelector<SVGPathElement>(".motion-feature__path");
        const orb = section.querySelector<SVGGElement>(".motion-feature__orb");
        const topText = section.querySelector<HTMLElement>(".motion-feature__top-copy");
        const arrow = section.querySelector<HTMLElement>(".motion-feature__arrow");
        const bottomText = section.querySelector<HTMLElement>(".motion-feature__bottom-copy");
        const link = section.querySelector<HTMLElement>(".motion-feature__link");
        if (!path || !orb || !topText || !arrow || !bottomText || !link) return;

        const gsap = window.gsap;
        gsap.registerPlugin(window.ScrollTrigger, window.DrawSVGPlugin, window.MotionPathPlugin);
        section.classList.add("motion-feature--enhanced");

        gsap.set(path, { drawSVG: "0%" });
        gsap.set(orb, { autoAlpha: 0, scale: 0.25, transformOrigin: "50% 50%" });
        gsap.set([topText, arrow, bottomText, link], { autoAlpha: 0, y: 24 });

        const desktop = window.matchMedia("(min-width: 761px)").matches;
        timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: desktop ? "top top" : "top 80%",
            end: desktop ? "+=1500" : "bottom 25%",
            scrub: 1,
            pin: desktop,
            anticipatePin: desktop ? 1 : 0,
            invalidateOnRefresh: true,
          },
        });

        timeline
          .to(path, { drawSVG: "100%", ease: "none", duration: 1 }, 0)
          .to(orb, { autoAlpha: 1, scale: 1, duration: 0.14, ease: "power2.out" }, 0.08)
          .to(orb, {
            motionPath: { path, align: path, alignOrigin: [0.5, 0.5], start: 0, end: 1 },
            ease: "none",
            duration: 1,
          }, 0)
          .to(topText, { autoAlpha: 1, y: 0, duration: 0.18, ease: "power2.out" }, 0.3)
          .to(arrow, { autoAlpha: 1, y: 0, duration: 0.15, ease: "power2.out" }, 0.64)
          .to(bottomText, { autoAlpha: 1, y: 0, duration: 0.2, ease: "power2.out" }, 0.68)
          .to(link, { autoAlpha: 1, y: 0, duration: 0.16, ease: "power2.out" }, 0.82);
      } catch (error) {
        console.error("Motion path animation could not initialize.", error);
      }
    };

    void initialize();

    return () => {
      cancelled = true;
      timeline?.scrollTrigger?.kill();
      timeline?.kill();
    };
  }, []);

  return (
    <section className="motion-feature section-dark" ref={sectionRef} aria-labelledby="motion-feature-title">
      <div className="motion-feature__canvas">
        <svg className="motion-feature__svg" viewBox="0 0 1600 800" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <radialGradient id="motion-orb-gradient" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="35%" stopColor="#fff2a3" />
              <stop offset="100%" stopColor="#ffdd00" />
            </radialGradient>
            <filter id="motion-orb-glow" x="-300%" y="-300%" width="700%" height="700%">
              <feGaussianBlur stdDeviation="24" />
            </filter>
          </defs>
          <path className="motion-feature__path" d="M-30 360 C190 650 440 655 700 420 S1160 20 1630 285" />
          <g className="motion-feature__orb">
            <circle r="54" fill="#ffdd00" opacity=".48" filter="url(#motion-orb-glow)" />
            <circle r="20" fill="url(#motion-orb-gradient)" />
          </g>
        </svg>
        <h2 className="motion-feature__top-copy" id="motion-feature-title">big ideas<br /><em>deserve</em></h2>
        <span className="motion-feature__arrow" aria-hidden="true">↗</span>
        <p className="motion-feature__bottom-copy">sharp<br />backers</p>
        <a className="motion-feature__link" href="https://one-venturestudio.notion.site/One-Venture-Fund-coming-soon-33e465a6e52180799061e84fb9a75505">One Venture Fund <span aria-hidden="true">↗</span></a>
      </div>
    </section>
  );
}
