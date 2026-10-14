"use client";

import { useRef, useState, type CSSProperties, type PointerEvent } from "react";

export default function HeroBrand() {
  const pointerStart = useRef<{ x: number; y: number; offsetX: number; offsetY: number } | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.button !== 0) return;
    pointerStart.current = { x: event.clientX, y: event.clientY, offsetX: offset.x, offsetY: offset.y };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    const start = pointerStart.current;
    if (!start) return;
    const hero = event.currentTarget.parentElement;
    if (!hero) return;
    const rect = hero.getBoundingClientRect();
    const maxX = Math.max(0, rect.width * .45);
    const minX = -Math.max(0, rect.width * .45);
    const maxY = Math.max(0, rect.height * .38);
    const minY = -Math.max(0, rect.height * .45);
    setOffset({
      x: Math.min(maxX, Math.max(minX, start.offsetX + event.clientX - start.x)),
      y: Math.min(maxY, Math.max(minY, start.offsetY + event.clientY - start.y)),
    });
  }

  function onPointerUp() {
    pointerStart.current = null;
  }

  return (
    <div
      className="hero__brand"
      role="group"
      aria-label="Draggable THE9 wordmark"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      style={{ transform: `translate3d(${offset.x}px, ${offset.y}px, 0)` }}
    >
      {["T", "H", "E", "9"].map((letter, index) => (
        <span className={index === 3 ? "hero__brand-accent" : undefined} style={{ "--letter-index": index } as CSSProperties} key={index}>{letter}</span>
      ))}
    </div>
  );
}
