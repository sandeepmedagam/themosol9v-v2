"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

const cardPairs = [0, 5, 9, 2, 11, 4, 13, 6, 1, 8, 3, 12, 7, 10, 2, 11, 4, 13, 6, 1, 8, 3, 12, 0, 7, 10, 5, 9];

function MemoryBlob() {
  return <img className="memory-game__blob" src="https://cdn.prod.website-files.com/69b293a8de2706e604a565ce/69b39e12e42317f4ae002c9f_gameicon.avif" alt="" loading="lazy" />;
}

export default function MemoryGame() {
  const [revealed, setRevealed] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([0, 23]);
  const [score, setScore] = useState(1);
  const [locked, setLocked] = useState(false);
  const mismatchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (mismatchTimer.current) clearTimeout(mismatchTimer.current);
  }, []);

  function revealCard(index: number) {
    if (locked || matched.includes(index) || revealed.includes(index)) return;

    if (revealed.length === 0) {
      setRevealed([index]);
      return;
    }

    const first = revealed[0];
    setRevealed([first, index]);
    if (cardPairs[first] === cardPairs[index]) {
      setMatched((cards) => [...cards, first, index]);
      setScore((value) => value + 1);
      setRevealed([]);
      return;
    }

    setLocked(true);
    mismatchTimer.current = setTimeout(() => {
      setRevealed([]);
      setLocked(false);
      mismatchTimer.current = null;
    }, 800);
  }

  return (
    <section className="memory-game" aria-labelledby="play-title">
      <div className="memory-game__annotation" aria-hidden="true">
        <img src="https://cdn.prod.website-files.com/69b293a8de2706e604a565ce/69d8f3f3eb53df1056280750_memory%20game%20float%20indicator.svg" alt="" />
      </div>
      <div className="memory-game__board" role="group" aria-label="Memory game board">
        {cardPairs.map((pair, index) => {
          const isMatched = matched.includes(index);
          const isRevealed = revealed.includes(index);
          const isOpen = isMatched || isRevealed;

          return (
            <button
              className={`memory-game__tile${isOpen ? " is-open" : ""}${isMatched ? " is-matched" : ""}`}
              key={index}
              type="button"
              onClick={() => revealCard(index)}
              aria-label={isMatched ? `Matched card ${index + 1}` : isRevealed ? `Revealed card ${index + 1}` : `Reveal card ${index + 1}`}
              aria-pressed={isOpen}
            >
              {isOpen && <span className="memory-game__tile-face" style={{ "--pair-hue": `${pair * 42}deg` } as CSSProperties}><MemoryBlob /></span>}
            </button>
          );
        })}

        <div className="memory-game__center">
          <div className="memory-game__score" aria-live="polite"><span>[Score]</span><strong>{score}</strong></div>
          <h2 id="play-title">Building<br />should feel<br />like fun?</h2>
        </div>
      </div>
    </section>
  );
}
