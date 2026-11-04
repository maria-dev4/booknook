import Image from "next/image";
import Link from "next/link";
import { reviews } from "@/lib/data";
import { AuthForm } from "@/components/auth-form";
import { LogoMark } from "@/components/icons";

const coverStrip = ["/covers/circe.jpg", "/covers/song-achilles.jpg", "/covers/piranesi.jpg"];

const perks = [
  "Unlimited borrowing, zero late fees",
  "48-hour holds and 21-day loans",
  "A hand-written note with every pickup",
];

export function AuthCard({ variant }: { variant: "login" | "register" }) {
  const isRegister = variant === "register";
  const featuredReview = reviews[0];

  return (
    <div className="relative mx-auto w-full max-w-4xl overflow-hidden rounded-[2rem] shadow-lift">
      <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
        {/* Decorative forest panel */}
        <div className="relative hidden flex-col justify-between bg-forest-deep p-10 text-ivory lg:flex">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-gold/10 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-32 -left-16 h-64 w-64 rounded-full bg-forest-soft/40 blur-3xl"
          />

          <div className="relative flex items-center gap-3">
            <LogoMark className="h-28 w-auto object-contain transition-transform duration-300 group-hover:scale-105" onDark />
          </div>

          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-soft">
              {isRegister ? "Join the Nook" : "Member Access"}
            </p>
            <h2 className="font-display mt-3 text-3xl font-semibold leading-[1.15]">
              {isRegister ? (
                <>
                  Start your{" "}
                  <span className="italic text-gold-soft">reading year</span>
                </>
              ) : (
                <>
                  Find your next{" "}
                  <span className="italic text-gold-soft">great read</span>
                </>
              )}
            </h2>
            <figure className="mt-6 border-l-2 border-gold-soft/40 pl-4">
              <blockquote className="font-display text-sm italic leading-relaxed text-ivory/70">
                “{featuredReview.quote}”
              </blockquote>
              <figcaption className="mt-3 text-xs font-medium uppercase tracking-[0.18em] text-ivory/40">
                {featuredReview.name} · {featuredReview.role}
              </figcaption>
            </figure>
          </div>

          <div className="relative">
            <ul className="flex flex-col gap-2.5">
              {perks.map((perk) => (
                <li
                  key={perk}
                  className="inline-flex items-center gap-2.5 text-sm text-ivory/70"
                >
                  <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold-soft" />
                  {perk}
                </li>
              ))}
            </ul>
            <div aria-hidden="true" className="mt-8 flex -space-x-3">
              {coverStrip.map((cover) => (
                <Image
                  key={cover}
                  src={cover}
                  alt=""
                  width={64}
                  height={96}
                  className="rounded-lg border border-ivory/20 object-cover shadow-soft"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Form panel */}
        <div className="bg-cream px-6 py-10 sm:px-10 sm:py-12">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            {isRegister ? "Join the Nook" : "Member Access"}
          </p>
          <h1 className="font-display mt-3 text-3xl font-semibold leading-[1.15] text-forest sm:text-4xl">
            {isRegister ? (
              <>
                Create your <span className="italic text-gold">member card</span>
              </>
            ) : (
              <>
                Welcome back to <span className="italic text-gold">the Nook</span>
              </>
            )}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted">
            {isRegister
              ? "A few fields and your card is stamped — reserve titles, renew online and keep every read in one place."
              : "Sign in to reserve, renew and pick up where your shelf left off."}
          </p>

          <AuthForm variant={variant} />

          <p className="mt-6 border-t border-forest/10 pt-6 text-sm text-ink-muted">
            {isRegister ? "Already a member? " : "New to the Nook? "}
            <Link
              href={isRegister ? "/login" : "/register"}
              className="font-semibold text-forest underline decoration-gold decoration-2 underline-offset-4 transition-colors hover:text-gold"
            >
              {isRegister ? "Sign in instead" : "Create your member card"}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
