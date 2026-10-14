"use client";

import { useEffect, useRef, useState } from "react";

export default function ApproachSection({ items }: { items: string[][] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.15 });

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={`approach-section section-light${isVisible ? " is-visible" : ""}`} ref={sectionRef} aria-labelledby="approach-title">
      <header className="approach-section__heading">
        <p>We use a simple loop to turn chaos into consistent weekly progress, creating the momentum needed to achieve better outcomes.</p>
        <div className="approach-section__title">
          <span className="section-index">[ 01000 ]</span>
          <h2 id="approach-title">Our Approach</h2>
        </div>
      </header>
      <ol className="approach-steps">
        {items.map(([number, title, copy], index) => (
          <li className={`approach-step approach-step--${index + 1}`} key={number} tabIndex={0}>
            <span className="approach-step__fill" aria-hidden="true" />
            <h3>{title}</h3>
            <span className="approach-step__number">{number}</span>
            <p>{copy}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
