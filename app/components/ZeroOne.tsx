"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

type TokenValue = 0 | 1;
type GameToken = { id: number; value: TokenValue };
type Flight = { value: TokenValue; x: number; y: number; toX: number; toY: number };
type SwiperTouch = { touches: { diff: number } };
type SwiperInstance = {
  destroy: (deleteInstance?: boolean, cleanStyles?: boolean) => void;
  on: (event: "touchEnd", callback: (swiper: SwiperTouch) => void) => void;
};
type GsapInstance = { fromTo: (target: Element, from: Record<string, unknown>, to: Record<string, unknown>) => void };
type SwiperConstructor = new (element: HTMLElement, options: Record<string, unknown>) => SwiperInstance;
const browserBundles = () => window as unknown as { gsap?: GsapInstance; Swiper?: SwiperConstructor };

const gsapSrc = "/gsap/3.15.0/gsap.min.js";
const initialTokens: GameToken[] = Array.from({ length: 20 }, (_, id) => ({
  id,
  value: (id < 14 ? 0 : 1) as TokenValue,
}));

function loadGsap() {
  return new Promise<void>((resolve, reject) => {
    if (browserBundles().gsap) return resolve();
    const existing = document.querySelector<HTMLScriptElement>(`script[data-gsap-src="${gsapSrc}"]`);
    const script = existing ?? document.createElement("script");
    const onLoad = () => {
      script.dataset.loaded = "true";
      resolve();
    };
    script.addEventListener("load", onLoad, { once: true });
    script.addEventListener("error", () => reject(new Error("GSAP failed to load")), { once: true });
    if (!existing) {
      script.src = gsapSrc;
      script.async = true;
      script.dataset.gsapSrc = gsapSrc;
      document.head.appendChild(script);
    } else if (existing.dataset.loaded === "true" || browserBundles().gsap) {
      resolve();
    }
  });
}

export default function ZeroOne() {
  const [tokens, setTokens] = useState(initialTokens);
  const [flight, setFlight] = useState<Flight | null>(null);
  const [status, setStatus] = useState("");
  const boardRef = useRef<HTMLDivElement>(null);
  const zeroBinRef = useRef<HTMLDivElement>(null);
  const oneBinRef = useRef<HTMLDivElement>(null);
  const flightRef = useRef<HTMLSpanElement>(null);
  const swiperRef = useRef<SwiperInstance | null>(null);
  const busyRef = useRef(false);

  const moveToken = useCallback((value: TokenValue, source?: HTMLElement | null) => {
    if (busyRef.current) return;
    const destination = value === 0 ? oneBinRef.current : zeroBinRef.current;
    const sourceBin = value === 0 ? zeroBinRef.current : oneBinRef.current;
    const token = source ?? sourceBin?.querySelector<HTMLElement>(`[data-token-value="${value}"]`);
    if (!destination || !token) return;

    const from = token.getBoundingClientRect();
    const to = destination.getBoundingClientRect();
    const nextValue: TokenValue = value === 0 ? 1 : 0;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTokens((current) => current.map((item) => item.id === Number(token.dataset.tokenId) ? { ...item, value: nextValue } : item));
      setStatus(nextValue === 1 ? "A zero became one. Keep the momentum going." : "One moved back to zero.");
      return;
    }
    busyRef.current = true;
    setFlight({
      value: nextValue,
      x: from.left + from.width / 2,
      y: from.top + from.height / 2,
      toX: to.left + to.width / 2,
      toY: to.top + to.height * 0.74,
    });
    setTokens((current) => current.map((item) => item.value === value && item.id === Number(token.dataset.tokenId)
      ? { ...item, value: nextValue }
      : item));
    setStatus(nextValue === 1 ? "A zero became one. Keep the momentum going." : "One moved back to zero.");
  }, []);

  useEffect(() => {
    void loadGsap().catch(() => undefined);
    return () => {
      swiperRef.current?.destroy(true, true);
      swiperRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!flight || !flightRef.current) return;
    let cancelled = false;
    void loadGsap().then(() => {
      if (cancelled || !flightRef.current || !browserBundles().gsap) return;
      const node = flightRef.current;
      browserBundles().gsap?.fromTo(node,
        { x: flight.x - 16, y: flight.y - 16, scale: 0.7, opacity: 0.25, rotate: -18 },
        {
          x: flight.toX - 16,
          y: flight.toY - 16,
          scale: 1.15,
          opacity: 1,
          rotate: 8,
          duration: 0.72,
          ease: "power3.inOut",
          onComplete: () => {
            setFlight(null);
            busyRef.current = false;
          },
        },
      );
    }).catch(() => {
      setFlight(null);
      busyRef.current = false;
    });
    return () => { cancelled = true; };
  }, [flight]);

  const initializeSwiper = useCallback(() => {
    const Swiper = browserBundles().Swiper;
    if (!boardRef.current || !Swiper || swiperRef.current) return;
    const swiper = new Swiper(boardRef.current, {
      slidesPerView: 1,
      allowTouchMove: true,
      threshold: 16,
      resistanceRatio: 0,
      touchStartPreventDefault: false,
      nested: true,
    });
    swiper.on("touchEnd", ({ touches }) => {
      if (Math.abs(touches.diff) < 45) return;
      moveToken(touches.diff < 0 ? 0 : 1);
    });
    swiperRef.current = swiper;
  }, [moveToken]);

  const zeros = tokens.filter((token) => token.value === 0);
  const ones = tokens.filter((token) => token.value === 1);

  return (
    <section className="zero-section" aria-labelledby="zero-one-title">
      <Script src="/swiper-bundle.min.js" strategy="afterInteractive" onReady={initializeSwiper} />
      <h2 id="zero-one-title">Zero to one is a journey,<br />not a formula.</h2>
      <div className="zero-one__game">
        <div className="zero-one__swipe swiper" ref={boardRef} aria-label="Zero to one game. Swipe left or right to move a token.">
          <div className="swiper-wrapper">
            <div className="swiper-slide zero-one__board">
              <div className="zero-one__bin zero-one__bin--zero" ref={zeroBinRef} role="group" aria-label={`Zero bin, ${zeros.length} tokens`}>
                <div className="zero-one__tokens" aria-label="Zero tokens">
                  {zeros.map((token, index) => (
                    <button
                      className="zero-one__token"
                      key={token.id}
                      type="button"
                      data-token-id={token.id}
                      data-token-value={token.value}
                      style={{ "--token-order": index % 5 - 2 } as CSSProperties}
                      onClick={(event) => moveToken(0, event.currentTarget)}
                      aria-label="Move zero to one"
                    >Ø</button>
                  ))}
                </div>
              </div>
              <div className="zero-one__middle">
                <button className="zero-one__move" type="button" onClick={() => moveToken(zeros.length ? 0 : 1)}>
                  [ CLICK TO <strong>MOVE</strong> ]
                </button>
                <span className="zero-one__arrow" aria-hidden="true">↔</span>
              </div>
              <div className="zero-one__bin zero-one__bin--one" ref={oneBinRef} role="group" aria-label={`One bin, ${ones.length} tokens`}>
                <div className="zero-one__tokens" aria-label="One tokens">
                  {ones.map((token, index) => (
                    <button
                      className="zero-one__token"
                      key={token.id}
                      type="button"
                      data-token-id={token.id}
                      data-token-value={token.value}
                      style={{ "--token-order": index % 5 - 2 } as CSSProperties}
                      onClick={(event) => moveToken(1, event.currentTarget)}
                      aria-label="Move one to zero"
                    >1</button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {flight && <span className="zero-one__flight" ref={flightRef} aria-hidden="true">{flight.value === 0 ? "Ø" : "1"}</span>}
        </div>
        <span className="sr-only" aria-live="polite">{status}</span>
      </div>
    </section>
  );
}
