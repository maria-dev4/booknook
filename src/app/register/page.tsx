"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { SocialButton } from "@/components/social-button";
import { PasswordInput } from "@/components/password-input";
import { AuthShell, authInput, authLabel } from "@/components/auth-shell";

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
  // Live Photo URL preview: tracks the field value and per-URL load failures.
  const [photo, setPhoto] = useState("");
  const [previewFailedFor, setPreviewFailedFor] = useState<string | null>(
    null,
  );

  useEffect(() => {
    document.title = "BookNook | Register";
  }, []);

  // A preview only makes sense for valid http(s) image links.
  const trimmedPhotoUrl = photo.trim();
  let validPhotoUrl: string | null = null;
  try {
    const url = new URL(trimmedPhotoUrl);
    if (url.protocol === "http:" || url.protocol === "https:") {
      validPhotoUrl = trimmedPhotoUrl;
    }
  } catch {
    // Not a usable URL yet — no preview shown.
  }
  const previewFailed =
    validPhotoUrl != null && previewFailedFor === validPhotoUrl;

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
      toast.error(
        authError.message || `Registration failed (${authError.status})`,
      );
      return;
    }
    toast.success("Registration successful. Please login.");
    router.push("/login");
  };

  return (
    <AuthShell>
      <div className="mt-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
          Join the Nook
        </p>
        <h1 className="font-display mt-2 text-3xl font-semibold leading-tight text-forest sm:text-4xl">
          Create your account
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">
          Join BookNook and start borrowing books.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div className="space-y-1.5">
          <label htmlFor="register-name" className={authLabel}>
            Full Name
          </label>
          <input
            id="register-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your full name"
            className={authInput}
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="register-email" className={authLabel}>
            Email Address
          </label>
          <input
            id="register-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className={authInput}
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="register-photo" className={authLabel}>
            Photo URL
          </label>
          <input
            id="register-photo"
            name="photo"
            type="url"
            required
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
            placeholder="https://…"
            className={authInput}
          />
          {validPhotoUrl != null && (
            <div className="mt-2 flex items-center gap-3">
              <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-gold bg-cream">
                <img
                  src={
                    validPhotoUrl != null && !previewFailed
                      ? validPhotoUrl
                      : "/avatar.svg"
                  }
                  onError={() => setPreviewFailedFor(validPhotoUrl ?? null)}
                  alt="Profile image preview"
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="text-xs font-medium text-ink-muted">
                {previewFailed
                  ? "Image preview failed - a default avatar will be used."
                  : "This image will be your profile picture."}
              </p>
            </div>
          )}
        </div>
        <div className="space-y-1.5">
          <label htmlFor="register-password" className={authLabel}>
            Password
          </label>
          <PasswordInput id="register-password" />
          {passwordError && (
            <p className="text-sm text-error">{passwordError}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex w-full items-center justify-center rounded-full bg-forest px-6 py-3 text-sm font-semibold text-ivory shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:bg-forest-deep hover:shadow-lift active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:-translate-y-0"
        >
          {loading ? "Creating account..." : "Register"}
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
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-forest transition-colors hover:text-gold"
        >
          Login
        </Link>
      </p>
    </AuthShell>
  );
}
