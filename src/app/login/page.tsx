"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { SocialButton } from "@/components/social-button";
import { AuthShell, authInput, authLabel } from "@/components/auth-shell";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    document.title = "BookNook | Login";
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email"));
    const password = String(form.get("password"));

    setLoading(true);
    const { error } = await authClient.signIn.email({ email, password });
    setLoading(false);

    if (error) {
      toast.error(error.message || "Login failed");
      return;
    }
    toast.success("Logged in successfully");
    const redirect = new URLSearchParams(window.location.search).get(
      "redirect",
    );
    window.location.href = redirect || "/";
  };

  return (
    <AuthShell>
      <div className="mt-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
          Member Access
        </p>
        <h1 className="font-display mt-2 text-3xl font-semibold leading-tight text-forest sm:text-4xl">
          Welcome back
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">
          Log in to borrow, reserve and manage your books.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div className="space-y-1.5">
          <label htmlFor="login-email" className={authLabel}>
            Email Address
          </label>
          <input
            id="login-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className={authInput}
          />
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="login-password" className={authLabel}>
              Password
            </label>
            <button
              type="button"
              onClick={() => toast("Password reset is not available yet")}
              className="text-xs font-semibold text-forest transition-colors hover:text-gold"
            >
              Forgot password?
            </button>
          </div>
          <input
            id="login-password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            placeholder="Your password"
            className={authInput}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex w-full items-center justify-center rounded-full bg-forest px-6 py-3 text-sm font-semibold text-ivory shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:bg-forest-deep hover:shadow-lift active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:-translate-y-0"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="my-6 flex items-center gap-3 text-xs font-medium text-ink-muted">
        <span className="h-px flex-1 bg-forest/15" />
        or continue with
        <span className="h-px flex-1 bg-forest/15" />
      </div>

      <div className="space-y-3">
        <SocialButton provider="google" />
      </div>

      <p className="mt-7 text-center text-sm text-ink-muted">
        New to BookNook?{" "}
        <Link
          href="/register"
          className="font-semibold text-forest transition-colors hover:text-gold"
        >
          Create an account
        </Link>
      </p>
    </AuthShell>
  );
}
