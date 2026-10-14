"use client";

import { useState, type FormEvent } from "react";

export default function ContactForm() {
  const [notice, setNotice] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const subject = `Project inquiry from ${values.get("name")}`;
    const body = [
      `Name: ${values.get("name")}`,
      `Email: ${values.get("email")}`,
      `Phone: ${values.get("phone") || "Not provided"}`,
      "",
      "What we are building:",
      values.get("message"),
    ].join("\n");

    setNotice("Your email app should open with your message ready to send.");
    window.location.href = `mailto:themosol9@reachus.si?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form className="contact-form" onSubmit={submit}>
      <label>Name<input name="name" autoComplete="name" required /></label>
      <label>Email<input name="email" type="email" autoComplete="email" required /></label>
      <label>Phone number<input name="phone" type="tel" autoComplete="tel" required /></label>
      <label>What you’re building?<textarea name="message" rows={3} required /></label>
      <button className="primary-cta" type="submit"><span className="contact-form__button-dot" aria-hidden="true" />Submit Details</button>
      <p className="contact-form__notice" role="status">{notice}</p>
    </form>
  );
}
