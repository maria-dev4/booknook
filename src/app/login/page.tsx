"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { SocialButton } from "@/components/social-button";

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
    <main className="mx-auto flex min-h-[70vh] w-full max-w-md items-center px-5 py-12">
      <div className="w-full rounded-3xl border border-forest/10 bg-white p-8 shadow-soft">
        <h1 className="font-display text-3xl text-forest">Welcome back</h1>
        <p className="mt-2 text-sm text-ink-muted">
          Login to borrow and manage your books.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            name="email"
            type="email"
            required
            placeholder="Email address"
            className="w-full rounded-xl border border-forest/15 px-4 py-3 text-sm outline-none focus:border-gold"
          />
          <input
            name="password"
            type="password"
            required
            placeholder="Password"
            className="w-full rounded-xl border border-forest/15 px-4 py-3 text-sm outline-none focus:border-gold"
          />
          <button
            type="button"
            onClick={() => toast("Password reset is not available yet")}
            className="text-sm font-medium text-forest hover:text-gold"
          >
            Forgot password?
          </button>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-forest px-5 py-3 text-sm font-semibold text-ivory transition-colors hover:bg-forest-deep disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="my-5 flex items-center gap-3 text-xs text-ink-muted">
          <span className="h-px flex-1 bg-forest/15" />
          or
          <span className="h-px flex-1 bg-forest/15" />
        </div>
        <div className="space-y-3">
          <SocialButton provider="google" />
        </div>

        <p className="mt-6 text-center text-sm text-ink-muted">
          New to BookNook?{" "}
          <Link
            href="/register"
            className="font-semibold text-forest hover:text-gold"
          >
            Register
          </Link>
        </p>
      </div>
    </main>
  );
}
