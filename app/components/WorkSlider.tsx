"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";

export type WorkItem = {
  category: string;
  title: string;
  description: string;
};

type SwiperInstance = {
  realIndex: number;
  slideNext: () => void;
  slidePrev: () => void;
  destroy: (deleteInstance?: boolean, cleanStyles?: boolean) => void;
};

declare global {
  interface Window {
    Swiper?: new (
      element: HTMLElement,
      options: {
        slidesPerView: number;
        spaceBetween: number;
        speed: number;
        effect: "fade";
        fadeEffect: { crossFade: boolean };
        on: { slideChange: (swiper: SwiperInstance) => void };
      },
    ) => SwiperInstance;
  }
}

export default function WorkSlider({ items }: { items: WorkItem[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<SwiperInstance | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const initialize = useCallback(() => {
    const Swiper = window.Swiper;
    if (!Swiper || !containerRef.current || swiperRef.current) return;

    swiperRef.current = new Swiper(containerRef.current, {
      slidesPerView: 1,
      spaceBetween: 24,
      speed: 850,
      effect: "fade",
      fadeEffect: { crossFade: true },
      on: {
        slideChange: (swiper) => setActiveIndex(swiper.realIndex),
      },
    });
  }, []);

  useEffect(() => {
    return () => {
      swiperRef.current?.destroy(true, true);
      swiperRef.current = null;
    };
  }, []);

  const total = items.length;

  return (
    <div className="work-slider-component">
      <Script src="/swiper-bundle.min.js" strategy="afterInteractive" onReady={initialize} />
      <div className="work-slider__stage">
        <div className="swiper work-slider" ref={containerRef} role="region" aria-roledescription="carousel" aria-label="Selected work">
          <div className="swiper-wrapper">
            {items.map((item, index) => (
              <article className="swiper-slide work-slider__slide" key={item.title} aria-roledescription="slide" aria-label={`${index + 1} of ${total}`} aria-hidden={index !== activeIndex}>
                <div className="work-slider__content">
                  <div className="work-slider__progress" role="progressbar" aria-label="Work slide" aria-valuemin={1} aria-valuemax={total} aria-valuenow={index + 1}>
                    <span />
                  </div>
                  <span className="work-slider__count" aria-live={index === activeIndex ? "polite" : undefined}>{String(index + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}</span>
                  <div className="work-slider__metadata">
                    <div className="work-slider__category">{item.category.split("/").map((tag) => <span key={tag.trim()}>{tag.trim()}</span>)}</div>
                    <p>{item.description}</p>
                  </div>
                  <h3>{item.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="work-slider__navigation">
          <button type="button" onClick={() => swiperRef.current?.slidePrev()} disabled={activeIndex === 0} aria-label="Previous project">←</button>
          <button type="button" onClick={() => swiperRef.current?.slideNext()} disabled={activeIndex === total - 1} aria-label="Next project">→</button>
        </div>
      </div>
    </div>
  );
}
