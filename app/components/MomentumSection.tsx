"use client";

import { useEffect, useRef, useState } from "react";

function StepIcon({ index }: { index: number }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

  if (index === 0) return <svg viewBox="0 0 32 32" aria-hidden="true"><circle {...common} cx="16" cy="17" r="10" /><path {...common} d="M16 11v6l4-3M12 3h8M16 3v4" /></svg>;
  if (index === 1) return <svg viewBox="0 0 32 32" aria-hidden="true"><path {...common} d="M6 11h20v13H6zM10 7h12M12 16h8m-8 4h5" /><path {...common} d="m9 28 3-4" /></svg>;
  if (index === 2) return <svg viewBox="0 0 32 32" aria-hidden="true"><rect {...common} x="6" y="5" width="20" height="22" rx="4" /><path {...common} d="M11 3v5m10-5v5M11 15h10m-10 5 3 3 6-7" /></svg>;
  return <svg viewBox="0 0 32 32" aria-hidden="true"><rect {...common} x="5" y="5" width="22" height="22" rx="5" /><path {...common} d="M11 16h10M16 11v10M9 9l14 14" /></svg>;
}

export default function MomentumSection({ items }: { items: string[][] }) {
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
    }, { threshold: 0.12 });

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={`momentum-section section-dark${isVisible ? " is-visible" : ""}`} ref={sectionRef} aria-labelledby="momentum-title">
      <header className="momentum-section__heading">
        <span className="section-index">[ 01001 ]</span>
        <h2 id="momentum-title">Build momentum<br />in days not weeks</h2>
      </header>
      <div className="momentum-flow">
        <svg className="momentum-flow__lines" viewBox="0 0 1600 800" preserveAspectRatio="none" aria-hidden="true">
          <path d="M-40 90 C280 -10 425 45 670 165 S1125 300 1640 175" />
          <path d="M-40 180 C260 75 430 110 675 220 S1125 330 1640 235" />
          <path d="M-40 280 C270 190 445 205 675 285 S1120 365 1640 300" />
          <path d="M-40 380 C270 330 445 320 675 355 S1135 390 1640 375" />
          <path d="M-40 500 C270 555 465 515 690 425 S1135 390 1640 445" />
          <path d="M-40 610 C250 715 450 655 700 490 S1150 420 1640 535" />
          <path d="M-40 700 C260 830 460 755 710 535 S1160 445 1640 625" />
        </svg>
        <ol className="momentum-flow__steps">
          {items.map(([number, title, copy], index) => (
            <li className={`momentum-flow__step momentum-flow__step--${index + 1}`} key={number} tabIndex={0}>
              <span className="momentum-flow__icon"><StepIcon index={index} /></span>
              <div className="momentum-flow__copy">
                <span className="momentum-flow__index">{number}</span>
                <h3>{title}</h3>
                {index === 2 ? (
                  <ul>{copy.split(", ").map((deliverable) => <li key={deliverable}>{deliverable}</li>)}</ul>
                ) : <p>{copy}</p>}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
