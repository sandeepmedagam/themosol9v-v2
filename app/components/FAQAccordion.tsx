"use client";

import { useState } from "react";

type FAQItem = readonly [question: string, answer: string];

export default function FAQAccordion({ items }: { items: readonly FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="faq-list">
      {items.map(([question, answer], index) => {
        const isOpen = openIndex === index;
        const answerId = `faq-answer-${index}`;

        return (
          <article className={`faq-item${isOpen ? " is-open" : ""}`} key={question}>
            <button
              className="faq-item__trigger"
              type="button"
              aria-expanded={isOpen}
              aria-controls={answerId}
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
            >
              <span>{question}</span>
              <span className="faq-item__icon" aria-hidden="true">{isOpen ? "−" : "+"}</span>
            </button>
            <div className="faq-item__panel" id={answerId} aria-hidden={!isOpen}>
              <div className="faq-item__panel-inner"><p>{answer}</p></div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
