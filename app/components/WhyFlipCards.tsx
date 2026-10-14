"use client";

import { useState } from "react";

const illustrations = [
  "M64 8 108 34 64 60 20 34 64 8Zm-44 26v48l44 26V60m44-26v48l-44 26M36 43l28 17 28-17M36 43v31l28 17 28-17V43M50 51l14 9 14-9v16l-14 9-14-9V51Z",
  "M20 38 64 12l44 26-44 26-44-26Zm0 0v48l44 26V64m44-26v48l-44 26M42 51l22 13 22-13M42 51v24l22 13 22-13V51m-44 24 22 13 22-13",
  "M18 30h60l28 16H46L18 30Zm0 0v57l28 17V46m60 0v57l-60 1M33 39h58m-58 9h58m-58 9h58m-58 9h58",
  "M64 8 99 28v40L64 88 29 68V28L64 8Zm0 0v40m35-20L64 48 29 28m0 40 35-20 35 20M64 48v40m-17-30v18l17 10 17-10V58m-17-10L46 58l18 10 18-10-18-10Z",
];

function ReasonIllustration({ index }: { index: number }) {
  return <svg className="reason-card__illustration" viewBox="0 0 128 112" fill="none" aria-hidden="true"><path d={illustrations[index % illustrations.length]} /></svg>;
}

export default function WhyFlipCards({ items }: { items: string[][] }) {
  const [openCards, setOpenCards] = useState<number[]>([]);

  function toggle(index: number) {
    setOpenCards((cards) => cards.includes(index) ? cards.filter((card) => card !== index) : [...cards, index]);
  }

  return (
    <div className="reason-grid">
      {items.map(([title, copy], index) => {
        const isOpen = openCards.includes(index);
        return (
          <button className={`reason-card${isOpen ? " is-open" : ""}`} key={title} type="button" onClick={() => toggle(index)} aria-expanded={isOpen}>
            <span className="reason-card__face reason-card__front" aria-hidden={isOpen}><span className="reason-card__title">{title}</span><span className="reason-card__toggle" aria-hidden="true">+</span><ReasonIllustration index={index} /></span>
            <span className="reason-card__face reason-card__back" aria-hidden={!isOpen}><span className="reason-card__copy">{copy}</span><span className="reason-card__toggle" aria-hidden="true">−</span></span>
          </button>
        );
      })}
    </div>
  );
}
