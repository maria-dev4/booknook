import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/icons";

export function CtaBand() {
  return (
    <section id="membership" className="scroll-mt-24 py-20 sm:py-24">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-[2rem] shadow-lift sm:rounded-[2.75rem]">
          <Image
            src="/hero/hero-1.jpg"
            alt="Warmly lit reading room of the BookNook library"
            width={1920}
            height={1126}
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-forest-deep/85" />
          <div className="relative flex flex-col items-start gap-7 px-8 py-16 sm:px-16 sm:py-20 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-soft">
                Join the Nook
              </p>
              <h2 className="font-display mt-4 text-3xl font-semibold leading-[1.15] text-ivory sm:text-4xl lg:text-[2.8rem]">
                Your next <span className="italic text-gold-soft">great read</span> lives here
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ivory/70">
                Membership is open all year — unlimited borrowing, zero late fees, and first
                access to every shelf we restock.
              </p>
            </div>
            <div className="flex flex-wrap gap-3.5">
              <a
                href="#newsletter"
                className="inline-flex items-center gap-2.5 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-forest-deep transition-all duration-300 hover:bg-gold-soft hover:shadow-lift"
              >
                Become a member
                <ArrowIcon className="h-4 w-4" />
              </a>
              <Link
                href="/new-arrivals"
                className="inline-flex items-center rounded-full border border-ivory/30 px-7 py-3.5 text-sm font-semibold text-ivory transition-colors duration-300 hover:bg-ivory/10"
              >
                Browse the shelves
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
