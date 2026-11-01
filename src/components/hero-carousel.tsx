"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { heroSlides } from "@/lib/data";
import { ArrowIcon, ChevronIcon, StarIcon } from "@/components/icons";

const AUTOPLAY_MS = 6500;

export function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback((next: number) => {
    setActive(((next % heroSlides.length) + heroSlides.length) % heroSlides.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    timer.current = setInterval(() => {
      setActive((current) => (current + 1) % heroSlides.length);
    }, AUTOPLAY_MS);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [paused]);

  return (
    <section id="home" aria-roledescription="carousel" aria-label="Featured collections">
      <div className="mx-auto w-full max-w-7xl px-5 pt-6 sm:px-8 sm:pt-10">
        <div
          className="relative overflow-hidden rounded-[2rem] shadow-card sm:rounded-[2.75rem]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {heroSlides.map((s, index) => (
            <div
              key={s.id}
              aria-hidden={index !== active}
              className={`transition-opacity duration-700 ease-out ${
                index === active ? "opacity-100" : "pointer-events-none absolute inset-0 opacity-0"
              }`}
            >
              <SlideHeroInner slide={s} />
            </div>
          ))}

          {/* Arrows */}
          <button
            type="button"
            onClick={() => go(active - 1)}
            aria-label="Previous slide"
            className="absolute left-4 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-forest/15 bg-cream/85 text-forest shadow-soft backdrop-blur transition-all hover:bg-cream hover:shadow-lift sm:inline-flex"
          >
            <ChevronIcon className="h-5 w-5 rotate-180" />
          </button>
          <button
            type="button"
            onClick={() => go(active + 1)}
            aria-label="Next slide"
            className="absolute right-4 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-forest/15 bg-cream/85 text-forest shadow-soft backdrop-blur transition-all hover:bg-cream hover:shadow-lift sm:inline-flex"
          >
            <ChevronIcon className="h-5 w-5" />
          </button>

          {/* Progress dots */}
          <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2.5">
            {heroSlides.map((s, index) => (
              <button
                key={s.id}
                type="button"
                onClick={() => go(index)}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === active}
                className={`h-2 rounded-full transition-all duration-500 ${
                  index === active
                    ? "w-8 bg-gold"
                    : "w-2 bg-forest/25 hover:bg-forest/50"
                } ${heroSlides[active].theme === "forest" && index !== active ? "bg-ivory/40 hover:bg-ivory/70" : ""}`}
              />
            ))}
          </div>
        </div>

        {/* Ticker strip */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 md:grid-cols-4">
          {[
            { stat: "3,000+", label: "Curated titles" },
            { stat: "850", label: "Active members" },
            { stat: "48 hrs", label: "Pick-up guarantee" },
            { stat: "4.9/5", label: "Reader satisfaction" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-forest/10 bg-cream px-5 py-4 text-center shadow-soft sm:py-5"
            >
              <p className="font-display text-2xl font-semibold text-forest sm:text-3xl">{item.stat}</p>
              <p className="mt-1 text-xs font-medium uppercase tracking-[0.18em] text-ink-muted">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SlideHeroInner({ slide }: { slide: (typeof heroSlides)[number] }) {
  const theme =
    slide.theme === "forest"
      ? {
          wrap: "bg-forest-deep text-ivory",
          eyebrow: "text-gold-soft",
          body: "text-ivory/75",
          primary: "bg-gold text-forest-deep hover:bg-gold-soft",
          secondary: "border-ivory/30 text-ivory hover:bg-ivory/10",
          chip: "border-ivory/25 bg-forest-deep/60 text-ivory/85",
          meta: "text-ivory/60",
          glow: "bg-gold/20",
          deco: "text-ivory/8",
          frame: "border-ivory/20 bg-ivory/5",
        }
      : slide.theme === "gold"
        ? {
            wrap: "bg-gold-pale text-ink",
            eyebrow: "text-gold",
            body: "text-ink-muted",
            primary: "bg-forest text-ivory hover:bg-forest-deep",
            secondary: "border-forest/25 text-forest hover:bg-forest/5",
            chip: "border-forest/15 bg-cream text-ink-muted",
            meta: "text-ink-muted",
            glow: "bg-gold/25",
            deco: "text-forest/8",
            frame: "border-forest/15 bg-forest/5",
          }
        : {
            wrap: "bg-ivory text-ink",
            eyebrow: "text-gold",
            body: "text-ink-muted",
            primary: "bg-forest text-ivory hover:bg-forest-deep",
            secondary: "border-forest/25 text-forest hover:bg-forest/5",
            chip: "border-forest/15 bg-cream text-ink-muted",
            meta: "text-ink-muted",
            glow: "bg-gold/15",
            deco: "text-forest/8",
            frame: "border-forest/15 bg-forest/5",
          };

  return (
    <div className={`relative grid gap-10 px-7 py-14 sm:px-12 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-6 lg:px-20 lg:py-0 ${theme.wrap}`}>
      {/* Photographic backdrop (book-themed slide) */}
      {slide.background ? (
        <div aria-hidden="true" className="absolute inset-0">
          <Image
            src={slide.background}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-forest-deep/95 via-forest-deep/80 to-forest-deep/55 lg:bg-[linear-gradient(to_right,rgba(16,38,26,0.96)_0%,rgba(16,38,26,0.82)_45%,rgba(16,38,26,0.45)_100%)]" />
        </div>
      ) : null}

      {/* Decorative oversized letter */}
      <span
        aria-hidden="true"
        className={`font-display pointer-events-none absolute -right-6 -top-10 select-none text-[16rem] font-bold leading-none ${theme.deco} hidden lg:block`}
      >
        B
      </span>
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full blur-3xl ${theme.glow}`}
      />

      {/* Copy */}
      <div className="relative z-10 lg:py-24">
        <p className={`text-xs font-semibold uppercase tracking-[0.3em] ${theme.eyebrow}`}>
          {slide.eyebrow}
        </p>
        <h1 className="font-display mt-4 text-[2.1rem] font-semibold leading-[1.15] sm:text-5xl lg:text-[3.4rem]">
          {renderTitle(slide.title, slide.highlight, theme.eyebrow)}
        </h1>
        <p className={`mt-5 max-w-md text-base leading-relaxed ${theme.body}`}>
          {slide.description}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3.5">
          <Link
            href={slide.ctaHref}
            className={`inline-flex items-center gap-2.5 rounded-full px-6 py-3 text-sm font-semibold shadow-soft transition-all duration-300 hover:shadow-lift ${theme.primary}`}
          >
            {slide.cta}
            <ArrowIcon className="h-4 w-4" />
          </Link>
          <Link
            href="/how-it-works"
            className={`inline-flex items-center rounded-full border px-6 py-3 text-sm font-semibold transition-colors duration-300 ${theme.secondary}`}
          >
            How borrowing works
          </Link>
        </div>

        <p className={`mt-9 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] ${theme.meta}`}>
          <StarIcon className="h-3.5 w-3.5 text-gold" />
          Rated {slide.book.rating.toFixed(1)}/5 · {slide.book.genre} · {slide.book.pages} pages
        </p>
      </div>

      {/* Book cover art */}
      <div className="relative z-10 mt-2 flex justify-center lg:my-16 lg:justify-end lg:pr-24 xl:pr-32">
        <div className="relative">
          <div
            aria-hidden="true"
            className={`absolute -inset-5 -rotate-6 rounded-3xl border ${theme.frame}`}
          />
          <div className="relative w-40 overflow-hidden rounded-2xl shadow-lift sm:w-52 lg:w-64">
            <div className="relative aspect-[2/3]">
              <Image
                src={slide.book.cover}
                alt={`${slide.book.title} book cover by ${slide.book.author}`}
                fill
                priority
                sizes="(max-width: 640px) 160px, (max-width: 1024px) 208px, 256px"
                className="object-cover"
              />
            </div>
          </div>

          <div
            className={`absolute -left-8 -top-5 rounded-2xl border px-4 py-3 shadow-soft backdrop-blur sm:-left-14 ${theme.chip}`}
          >
            <p className="text-[0.6rem] font-semibold uppercase tracking-[0.22em] opacity-80">
              {slide.book.genre}
            </p>
            <p className="mt-0.5 text-sm font-semibold">{slide.book.author}</p>
          </div>
          <div
            className={`absolute -bottom-6 -right-6 rounded-2xl border px-4 py-3 shadow-soft backdrop-blur sm:-right-10 ${theme.chip}`}
          >
            <p className="text-[0.6rem] font-semibold uppercase tracking-[0.22em] opacity-75">
              Status
            </p>
            <p className="mt-0.5 flex items-center gap-1.5 text-sm font-semibold">
              <span className="relative inline-flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
              </span>
              Available now
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function renderTitle(title: string, highlight: string, accentClass: string) {
  if (!highlight || !title.includes(highlight)) return title;
  const [before, after] = title.split(highlight);
  return (
    <>
      {before}
      <span className={`italic ${accentClass}`}>{highlight}</span>
      {after}
    </>
  );
}
