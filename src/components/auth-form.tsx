"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { EyeIcon, EyeOffIcon } from "@/components/icons";

type Variant = "login" | "register";

type Errors = { name?: string; email?: string; password?: string };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateName(value: string): string {
  if (!value.trim()) return "Please tell us your name.";
  if (value.trim().length < 2) return "That name looks a little short.";
  return "";
}

function validateEmail(value: string): string {
  if (!value.trim()) return "Please enter your email address.";
  if (!emailPattern.test(value.trim())) return "That email doesn't look right yet.";
  return "";
}

function validatePassword(value: string): string {
  if (!value) return "Please enter a password.";
  if (value.length < 8) return "Use at least 8 characters.";
  return "";
}

export function AuthForm({ variant }: { variant: Variant }) {
  const isRegister = variant === "register";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  const clearError = (field: keyof Errors) =>
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });

  const runValidation = (): Errors => {
    const next: Errors = {};
    if (isRegister) next.name = validateName(name);
    next.email = validateEmail(email);
    next.password = validatePassword(password);
    return Object.fromEntries(
      Object.entries(next).filter(([, message]) => message !== "")
    ) as Errors;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = runValidation();
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    // Static UI only — no authentication happens here.
    setSubmitted(true);
  };

  const inputClass = (error?: string) =>
    `h-11 w-full rounded-full border bg-ivory px-5 text-sm text-ink placeholder:text-ink-muted/60 outline-none transition-colors ${
      error ? "border-error focus:border-error" : "border-forest/15 focus:border-gold"
    }`;

  const labelClass = "text-xs font-semibold uppercase tracking-[0.18em] text-forest";

  if (submitted) {
    return (
      <div className="mt-8">
        <div className="rounded-2xl border border-gold-soft/40 bg-gold/10 px-5 py-4 text-sm font-medium text-forest">
          ✓ {isRegister ? "Member card created — welcome to the Nook!" : "Signed in — welcome back!"}
        </div>
        <p className="mt-3 text-xs text-ink-muted">
          Static demo — nothing was sent or stored. While you&apos;re here, browse{" "}
          <Link
            href="/books"
            className="font-semibold text-forest underline decoration-gold decoration-2 underline-offset-4 transition-colors hover:text-gold"
          >
            the shelves
          </Link>
          .
        </p>
      </div>
    );
  }

  return (
    <form className="mt-8 flex flex-col gap-5" noValidate onSubmit={handleSubmit}>
      {isRegister ? (
        <div>
          <label htmlFor={`${variant}-name`} className={labelClass}>
            Full name
          </label>
          <input
            id={`${variant}-name`}
            type="text"
            autoComplete="name"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              clearError("name");
            }}
            onBlur={() => setErrors((prev) => ({ ...prev, name: validateName(name) || undefined }))}
            placeholder="Amara Chen"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${variant}-name-error` : undefined}
            className={`mt-2 ${inputClass(errors.name)}`}
          />
          {errors.name ? (
            <p id={`${variant}-name-error`} role="alert" className="mt-1.5 text-xs font-medium text-error">
              {errors.name}
            </p>
          ) : null}
        </div>
      ) : null}

      <div>
        <label htmlFor={`${variant}-email`} className={labelClass}>
          Email address
        </label>
        <input
          id={`${variant}-email`}
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            clearError("email");
          }}
          onBlur={() => setErrors((prev) => ({ ...prev, email: validateEmail(email) || undefined }))}
          placeholder="you@readingcircle.com"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? `${variant}-email-error` : undefined}
          className={`mt-2 ${inputClass(errors.email)}`}
        />
        {errors.email ? (
          <p id={`${variant}-email-error`} role="alert" className="mt-1.5 text-xs font-medium text-error">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor={`${variant}-password`} className={labelClass}>
          Password
        </label>
        <div className="relative mt-2">
          <input
            id={`${variant}-password`}
            type={showPassword ? "text" : "password"}
            autoComplete={isRegister ? "new-password" : "current-password"}
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              clearError("password");
            }}
            onBlur={() => setErrors((prev) => ({ ...prev, password: validatePassword(password) || undefined }))}
            placeholder={isRegister ? "At least 8 characters" : "Your password"}
            aria-invalid={Boolean(errors.password)}
            aria-describedby={errors.password ? `${variant}-password-error` : undefined}
            className={inputClass(errors.password) + " pr-12"}
          />
          <button
            type="button"
            onClick={() => setShowPassword((visible) => !visible)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            aria-pressed={showPassword}
            className="absolute right-4 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-ink-muted transition-colors hover:text-forest"
          >
            {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
          </button>
        </div>
        {errors.password ? (
          <p id={`${variant}-password-error`} role="alert" className="mt-1.5 text-xs font-medium text-error">
            {errors.password}
          </p>
        ) : null}
      </div>

      <button
        type="submit"
        className="mt-2 inline-flex h-11 w-full items-center justify-center rounded-full bg-forest px-6 text-sm font-semibold text-ivory shadow-soft transition-all duration-300 hover:bg-forest-deep hover:shadow-lift"
      >
        {isRegister ? "Create member card" : "Sign in to the Nook"}
      </button>

      {isRegister ? (
        <p className="text-center text-xs leading-relaxed text-ink-muted">
          By joining you agree to our{" "}
          <Link href="/terms" className="font-medium text-forest underline decoration-gold decoration-2 underline-offset-4 transition-colors hover:text-gold">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="font-medium text-forest underline decoration-gold decoration-2 underline-offset-4 transition-colors hover:text-gold">
            Privacy Policy
          </Link>
          .
        </p>
      ) : null}
    </form>
  );
}
