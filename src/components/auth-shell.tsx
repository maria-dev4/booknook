import type { ReactNode } from "react";
import { LogoMark } from "@/components/icons";

/**
 * Shared premium shell for the Login & Register pages:
 * a warm BookNook gradient backdrop, floating glow orbs and a single
 * elegant rounded card with a soft shadow.
 */
export function AuthShell({ children }: { children: ReactNode }) {
  return (
    <main className="relative flex flex-1 items-center justify-center overflow-hidden px-5 py-14 sm:py-20">
      {/* Warm ivory -> sand gradient with gold glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(130%_90%_at_50%_-10%,#fffdf8_0%,#faf6ee_38%,#f2ecdf_68%,#e9dfc6_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-gold/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 -right-20 h-80 w-80 rounded-full bg-forest-soft/15 blur-3xl"
      />

      <div className="auth-rise relative w-full max-w-md">
        <div className="rounded-[2rem] border border-forest/10 bg-white/90 px-6 py-9 shadow-lift backdrop-blur-md sm:px-9">
          <div className="flex justify-center">
            <LogoMark className="h-12 w-auto" />
          </div>
          {children}
        </div>
      </div>
    </main>
  );
}

/** Consistent label style for all auth fields */
export const authLabel =
  "block text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted";

/** Consistent modern field style: soft border, hover tint, gold focus ring */
export const authInput =
  "w-full rounded-xl border border-forest/15 bg-cream px-4 py-3 text-sm text-ink outline-none transition-all duration-200 hover:border-forest/30 focus:border-gold focus:bg-white focus:ring-4 focus:ring-gold/15";
