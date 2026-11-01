"use client";

import { useState, type FormEvent } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
  };

  if (subscribed) {
    return (
      <p className="mt-7 flex h-11 items-center rounded-full border border-gold-soft/40 bg-gold/10 px-5 text-sm font-medium text-gold-soft">
        ✓ You&apos;re on the list — see you in the next letter.
      </p>
    );
  }

  return (
    <form className="mt-5 flex gap-2" onSubmit={handleSubmit}>
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="you@readingcircle.com"
        className="h-11 w-full rounded-full border border-ivory/20 bg-ivory/5 px-5 text-sm text-ivory placeholder:text-ivory/35 outline-none transition-colors focus:border-gold-soft focus:bg-ivory/10"
      />
      <button
        type="submit"
        className="h-11 shrink-0 rounded-full bg-gold px-5 text-sm font-semibold text-forest-deep transition-colors hover:bg-gold-soft"
      >
        Subscribe
      </button>
    </form>
  );
}
