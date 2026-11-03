"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const checkPassword = (value: string) => {
  if (!/[A-Z]/.test(value)) return "Password must have an uppercase letter";
  if (!/[a-z]/.test(value)) return "Password must have a lowercase letter";
  if (value.length < 6) return "Password must be at least 6 characters long";
  return "";
};

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name"));
    const email = String(form.get("email"));
    const image = String(form.get("photo"));
    const password = String(form.get("password"));

    const error = checkPassword(password);
    setPasswordError(error);
    if (error) return;

    setLoading(true);
    const { error: authError } = await authClient.signUp.email({
      name,
      email,
      password,
      image,
    });
    setLoading(false);

    if (authError) {
      toast.error(authError.message || "Registration failed");
      return;
    }
    toast.success("Registration successful. Please login.");
    router.push("/login");
  };

  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-md items-center px-5 py-12">
      <div className="w-full rounded-3xl border border-forest/10 bg-white p-8 shadow-soft">
        <h1 className="font-display text-3xl text-forest">Create your account</h1>
        <p className="mt-2 text-sm text-ink-muted">Join BookNook and start borrowing books.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            name="name"
            type="text"
            required
            placeholder="Full name"
            className="w-full rounded-xl border border-forest/15 px-4 py-3 text-sm outline-none focus:border-gold"
          />
          <input
            name="email"
            type="email"
            required
            placeholder="Email address"
            className="w-full rounded-xl border border-forest/15 px-4 py-3 text-sm outline-none focus:border-gold"
          />
          <input
            name="photo"
            type="url"
            required
            placeholder="Photo URL"
            className="w-full rounded-xl border border-forest/15 px-4 py-3 text-sm outline-none focus:border-gold"
          />
          <div>
            <input
              name="password"
              type="password"
              required
              placeholder="Password"
              className="w-full rounded-xl border border-forest/15 px-4 py-3 text-sm outline-none focus:border-gold"
            />
            {passwordError && <p className="mt-1.5 text-sm text-red-600">{passwordError}</p>}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-forest px-5 py-3 text-sm font-semibold text-ivory transition-colors hover:bg-forest-deep disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-ink-muted">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-forest hover:text-gold">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}