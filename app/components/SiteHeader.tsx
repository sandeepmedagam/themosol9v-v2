"use client";

import { useEffect, useState } from "react";

const navItems = [
  { label: "About us", href: "#about" },
  { label: "Services", href: "#what-we-do" },
  { label: "Our works", href: "#our-work" },
  { label: "Blogs", href: "#blogs" },
];

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL || "https://calendar.app.google/mCygswQWvcXfkyLk9";

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <header className="site-header">
      <a className="wordmark wordmark--ovs" href="#home" aria-label="The Mosol9 home">
        <span>The</span><span>Mosol9<span className="wordmark__dot">.</span></span>
      </a>

      <button
        className="menu-toggle"
        type="button"
        aria-expanded={menuOpen}
        aria-controls="primary-navigation"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span className="menu-toggle__label">Menu</span>
        <span className="menu-toggle__icon" aria-hidden="true"><i /><i /></span>
      </button>

      <nav
        className={`primary-navigation${menuOpen ? " is-open" : ""}`}
        id="primary-navigation"
        aria-label="Primary navigation"
      >
        {navItems.map((item) => (
          <a href={item.href} key={item.href} onClick={() => setMenuOpen(false)}>
            {item.label}
          </a>
        ))}
      </nav>

      <a className="book-call" href={bookingUrl}>
        <span className="book-call__dot" aria-hidden="true" />
        <span>Book a call</span>
      </a>
    </header>
  );
}
