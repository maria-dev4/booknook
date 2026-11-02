import Link from "next/link";
import { LogoMark } from "@/components/icons";

export default function NotFound() {
  return (
    <main className="flex-1 bg-ivory py-24 sm:py-32">
      <div className="mx-auto flex w-full max-w-xl flex-col items-center px-5 text-center sm:px-8">
        <LogoMark className="h-14" />
        <p className="mt-8 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
          Page not found
        </p>
        <h1 className="font-display mt-3 text-4xl font-semibold leading-[1.15] text-forest sm:text-5xl">
          This shelf is <span className="italic text-gold">empty</span>
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-muted">
          We couldn&apos;t find the book — or page — you were looking for. Perhaps it was
          borrowed a moment ago.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3.5">
          <Link
            href="/"
            className="inline-flex items-center rounded-full bg-forest px-6 py-3 text-sm font-semibold text-ivory shadow-soft transition-all duration-300 hover:bg-forest-deep hover:shadow-lift"
          >
            Back to the Nook
          </Link>
          <Link
            href="/new-arrivals"
            className="inline-flex items-center rounded-full border border-forest/25 px-6 py-3 text-sm font-semibold text-forest transition-colors duration-300 hover:bg-forest/5"
          >
            Browse the shelves
          </Link>
        </div>
      </div>
    </main>
  );
}
