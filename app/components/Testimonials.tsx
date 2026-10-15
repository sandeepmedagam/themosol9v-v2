"use client";

import { useState } from "react";

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  image: string;
};

export default function Testimonials({ items }: { items: Testimonial[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = items[activeIndex];
  const [roleTitle, ...companyParts] = active?.role.split(",") ?? [];
  const company = companyParts.join(",").trim();

  if (!active) return null;

  return (
    <section className="testimonials section-dark" aria-labelledby="testimonials-title">
      <header className="testimonials__heading">
        <span className="section-index">[ 00111 ]</span>
        <h2 id="testimonials-title">What our clients say</h2>
        <span className="testimonials__rule" aria-hidden="true" />
      </header>
      <div className="testimonials__layout">
        <figure className="testimonial-card__portrait" key={`portrait-${activeIndex}`}>
          <img src={active.image} alt={`Portrait of ${active.name}`} />
          <figcaption className="testimonial-card__attribution">
            <strong>{active.name}</strong>
            <span>{roleTitle}{company && <em>, {company}</em>}</span>
          </figcaption>
          <span className="testimonial-card__count" aria-hidden="true">{activeIndex + 1}</span>
        </figure>
        <div className="testimonial-card__content" aria-live="polite" aria-atomic="true">
          <span className="testimonial-card__quote-mark" aria-hidden="true">“</span>
          <blockquote key={`quote-${activeIndex}`}>
            <p>{active.quote}</p>
          </blockquote>
          <div className="testimonials__pagination" role="group" aria-label="Choose a client testimonial">
            {items.map((item, index) => (
              <button
                key={item.name}
                type="button"
                className={index === activeIndex ? "is-active" : ""}
                onClick={() => setActiveIndex(index)}
                aria-label={`Show testimonial ${index + 1} from ${item.name}`}
                aria-current={index === activeIndex ? "true" : undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
