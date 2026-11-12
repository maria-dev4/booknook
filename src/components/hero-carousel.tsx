"use client";
import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import { heroSlides } from "@/lib/data";
import type { Book } from "@/lib/types";
import { ArrowIcon, ChevronIcon, StarIcon } from "@/components/icons";

const clientSnapshot = () => true;
const serverSnapshot = () => false;
const noopSubscribe = () => () => {};

/**
 * Returns false during SSR/prerender and true after client hydration,
 * without a setState-in-effect (React Compiler friendly).
 */
function useMounted() {
  return useSyncExternalStore(noopSubscribe, clientSnapshot, serverSnapshot);
}

/* Cover tilt — mirrors the BookCard 3D interaction, tuned subtler for the hero */
const COVER_CSS_VARS = ["--bn-rx", "--bn-ry", "--bn-sx", "--bn-sy"] as const;
const COVER_POSE = { rx: 4, ry: 16 };
const COVER_MAX_TILT = { rx: 8, ry: 12 };

function resetCoverPose(element: HTMLElement) {
  element.classList.remove("bn-live");
  for (const name of COVER_CSS_VARS) element.style.removeProperty(name);
}

function handleCoverMove(event: ReactPointerEvent<HTMLAnchorElement>) {
  if (event.pointerType === "touch") return;
  const cover = event.currentTarget;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    resetCoverPose(cover);
    return;
  }

  const rect = cover.getBoundingClientRect();
  const px = (event.clientX - rect.left) / rect.width - 0.5;
  const py = (event.clientY - rect.top) / rect.height - 0.5;

  cover.classList.add("bn-live");
  cover.style.setProperty("--bn-ry", `${(COVER_POSE.ry + px * COVER_MAX_TILT.ry).toFixed(2)}deg`);
  cover.style.setProperty("--bn-rx", `${(COVER_POSE.rx - py * COVER_MAX_TILT.rx).toFixed(2)}deg`);
  cover.style.setProperty("--bn-sx", `${((px + 0.5) * 100).toFixed(1)}%`);
  cover.style.setProperty("--bn-sy", `${((py + 0.5) * 100).toFixed(1)}%`);
}

/* Hero palette — warm ivory · soft blush · dusty rose · muted sage · charcoal · burgundy */
type ThemeName = "forest" | "ivory" | "gold";

type ThemeSpec = {
  wrap: string;
  eyebrow: string;
  hairline: string;
  body: string;
  primary: string;
  chip: string;
  meta: string;
  deco: string;
  glowA: string;
  glowB: string;
  counter: string;
  counterAccent: string;
  barIdle: string;
  barTrack: string;
  barFill: string;
  navBtn: string;
  dot: string;
  star: string;
};

const themes: Record<ThemeName, ThemeSpec> = {
  /* Slide 1 — deep charcoal editorial bed, burgundy CTA, rose accents */
  forest: {
    wrap: "bg-[radial-gradient(120%_120%_at_90%_-10%,rgba(183,124,134,0.16)_0%,transparent_55%),linear-gradient(135deg,#25272d_0%,#292b32_58%,#32353d_130%)] text-[#F7F3EE]",
    eyebrow: "text-[#EFE3E1]",
    hairline: "bg-[#B77C86]",
    body: "text-[#F7F3EE]/75",
    primary:
      "bg-gradient-to-b from-[#84505b] to-[#70434D] text-[#F7F3EE] shadow-[0_14px_34px_-12px_rgba(112,67,77,0.55)] hover:shadow-[0_20px_44px_-12px_rgba(112,67,77,0.7)]",
    chip: "border-[#F7F3EE]/20 bg-[#F7F3EE]/10 text-[#F7F3EE]",
    meta: "text-[#F7F3EE]/65",
    deco: "text-[#F7F3EE]/8",
    glowA: "bg-[radial-gradient(closest-side,rgba(183,124,134,0.16),transparent)]",
    glowB: "bg-[radial-gradient(closest-side,rgba(168,181,162,0.1),transparent)]",
    counter: "text-[#F7F3EE]/60",
    counterAccent: "text-[#EFE3E1]",
    barIdle: "bg-[#F7F3EE]/30 hover:bg-[#F7F3EE]/60",
    barTrack: "bg-[#F7F3EE]/20",
    barFill: "bg-[#EFE3E1]",
    navBtn:
      "border-[#F7F3EE]/20 bg-[#F7F3EE]/10 text-[#F7F3EE] backdrop-blur hover:border-[#F7F3EE] hover:bg-[#F7F3EE] hover:text-[#292B32]",
    dot: "bg-[#B77C86]",
    star: "text-[#B77C86]",
  },
  /* Slide 2 — warm ivory into soft blush */
  ivory: {
    wrap: "bg-[radial-gradient(120%_120%_at_88%_-10%,rgba(183,124,134,0.14)_0%,transparent_55%),linear-gradient(150deg,#F7F3EE_0%,#EFE3E1_55%,#e6d6d2_130%)] text-[#292B32]",
    eyebrow: "text-[#70434D]",
    hairline: "bg-[#B77C86]",
    body: "text-[#292B32]/75",
    primary:
      "bg-gradient-to-b from-[#3a3d45] to-[#292B32] text-[#F7F3EE] shadow-[0_14px_34px_-12px_rgba(41,43,50,0.45)] hover:shadow-[0_20px_44px_-12px_rgba(41,43,50,0.6)]",
    chip: "border-[#292B32]/10 bg-[#F7F3EE]/75 text-[#292B32]",
    meta: "text-[#292B32]/65",
    deco: "text-[#292B32]/8",
    glowA: "bg-[radial-gradient(closest-side,rgba(183,124,134,0.22),transparent)]",
    glowB: "bg-[radial-gradient(closest-side,rgba(168,181,162,0.2),transparent)]",
    counter: "text-[#292B32]/60",
    counterAccent: "text-[#70434D]",
    barIdle: "bg-[#292B32]/25 hover:bg-[#292B32]/55",
    barTrack: "bg-[#292B32]/12",
    barFill: "bg-[#70434D]",
    navBtn:
      "border-[#292B32]/12 bg-[#F7F3EE]/80 text-[#292B32] backdrop-blur hover:border-[#70434D] hover:bg-[#70434D] hover:text-[#F7F3EE]",
    dot: "bg-[#70434D]",
    star: "text-[#70434D]",
  },
  /* Slide 3 — muted sage wash bridging blush and ivory */
  gold: {
    wrap: "bg-[radial-gradient(120%_120%_at_10%_-10%,rgba(168,181,162,0.26)_0%,transparent_55%),linear-gradient(140deg,#e0e4d8_0%,#EFE3E1_55%,#F7F3EE_120%)] text-[#292B32]",
    eyebrow: "text-[#70434D]",
    hairline: "bg-[#A8B5A2]",
    body: "text-[#292B32]/75",
    primary:
      "bg-gradient-to-b from-[#84505b] to-[#70434D] text-[#F7F3EE] shadow-[0_14px_34px_-12px_rgba(112,67,77,0.5)] hover:shadow-[0_20px_44px_-12px_rgba(112,67,77,0.65)]",
    chip: "border-[#292B32]/10 bg-[#F7F3EE]/75 text-[#292B32]",
    meta: "text-[#292B32]/65",
    deco: "text-[#292B32]/8",
    glowA: "bg-[radial-gradient(closest-side,rgba(168,181,162,0.24),transparent)]",
    glowB: "bg-[radial-gradient(closest-side,rgba(183,124,134,0.18),transparent)]",
    counter: "text-[#292B32]/60",
    counterAccent: "text-[#70434D]",
    barIdle: "bg-[#292B32]/25 hover:bg-[#292B32]/55",
    barTrack: "bg-[#292B32]/12",
    barFill: "bg-[#70434D]",
    navBtn:
      "border-[#292B32]/12 bg-[#F7F3EE]/80 text-[#292B32] backdrop-blur hover:border-[#70434D] hover:bg-[#70434D] hover:text-[#F7F3EE]",
    dot: "bg-[#70434D]",
    star: "text-[#70434D]",
  },
};

const pad = (n: number) => String(n).padStart(2, "0");

export function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [books, setBooks] = useState<Record<string, Book>>({});
  const progressRef = useRef<HTMLDivElement | null>(null);
  /*
   * Safe client-side mounting: Swiper's Autoplay module reads `new Date()`
   * during instance initialization, which Next 16 rejects on a prerendered
   * route ("unstable value in a Client Component"). Swiper is therefore only
   * mounted after hydration; SSR serves the static first slide instead.
   */
  const mounted = useMounted();

  /*
   * The featured books live in the MongoDB database, reached through the
   * same API the All Books page uses — the slide copy stays static, but every
   * cover image, title and author is the live database record, not a copy.
   */
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/books`)
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data)) return;
        setBooks(Object.fromEntries(data.map((b: Book) => [b._id, b])));
      })
      .catch(() => {
        // Slides keep their copy without covers until the API answers.
      });
  }, []);

  return (
    <section
      id="home"
      aria-roledescription="carousel"
      aria-label="Featured collections"
    >
      <div className="mx-auto w-full max-w-7xl px-5 pt-6 sm:px-8 sm:pt-10">
        <div className="relative overflow-hidden rounded-[1.75rem] shadow-card sm:rounded-[2.75rem]">
          {mounted ? (
            <Swiper
              modules={[Autoplay, EffectFade]}
              effect="fade"
              fadeEffect={{ crossFade: true }}
              loop
              speed={700}
              autoplay={{
                delay: 6500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              onSwiper={setSwiper}
              onSlideChange={(s) => setActive(s.realIndex)}
              /*
               * Live autoplay progress for the active indicator: Swiper emits
               * the remaining fraction of the current delay (1 -> 0), so the
               * fill grows to 1 just before the next slide. Written straight
               * to a CSS variable — no re-render per frame.
               */
              onAutoplayTimeLeft={(_swiper, timeLeft, percentage) => {
                const el = progressRef.current;
                if (el) el.style.setProperty("--bn-hero-progress", String(1 - percentage));
              }}
            >
              {heroSlides.map((s) => (
                <SwiperSlide key={s.id}>
                  <SlideHeroInner slide={s} book={books[s.bookId]} books={books} />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <SlideHeroInner
              slide={heroSlides[0]}
              book={books[heroSlides[0].bookId]}
              books={books}
            />
          )}

          {/* Editorial control bar: slide counter, autoplay progress bars, arrows */}
          <div className="absolute inset-x-0 bottom-0 z-20 flex items-end justify-center gap-4 px-4 pb-3.5 sm:justify-between sm:px-8 sm:pb-5 lg:px-12">
            <div className="flex items-end gap-4">
              <p
                className={`font-display pb-0.5 text-sm leading-none tracking-wide ${themes[heroSlides[active].theme].counter}`}
              >
                <span
                  className={`text-lg font-semibold ${themes[heroSlides[active].theme].counterAccent}`}
                >
                  {pad(active + 1)}
                </span>
                {" / "}
                {pad(heroSlides.length)}
              </p>
              <div ref={progressRef} className="flex items-center gap-2.5 pb-0.5">
                {heroSlides.map((s, index) => {
                  const isActive = index === active;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => swiper?.slideToLoop(index)}
                      aria-label={`Go to slide ${index + 1}`}
                      aria-current={isActive || undefined}
                      className="group rounded-full p-2 -m-2 focus-visible:outline-none"
                    >
                      {isActive ? (
                        <span
                          className={`relative block h-1.5 w-12 overflow-hidden rounded-full ${themes[heroSlides[active].theme].barTrack}`}
                        >
                          <span className={`block h-full w-full origin-left rounded-full ${themes[heroSlides[active].theme].barFill} will-change-transform [transform:scaleX(var(--bn-hero-progress,0))]`} />
                        </span>
                      ) : (
                        <span
                          className={`block h-1.5 w-5 rounded-full transition-all duration-300 group-hover:w-7 ${themes[heroSlides[active].theme].barIdle}`}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="hidden items-center gap-2.5 sm:flex">
              <button
                type="button"
                onClick={() => swiper?.slidePrev()}
                aria-label="Previous slide"
                className={`inline-flex h-11 w-11 items-center justify-center rounded-full border shadow-soft transition-all duration-300 hover:-translate-x-0.5 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B77C86] ${themes[heroSlides[active].theme].navBtn}`}
              >
                <ChevronIcon className="h-5 w-5 rotate-180" />
              </button>
              <button
                type="button"
                onClick={() => swiper?.slideNext()}
                aria-label="Next slide"
                className={`inline-flex h-11 w-11 items-center justify-center rounded-full border shadow-soft transition-all duration-300 hover:translate-x-0.5 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B77C86] ${themes[heroSlides[active].theme].navBtn}`}
              >
                <ChevronIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

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
              <p className="font-display text-2xl font-semibold text-forest sm:text-3xl">
                {item.stat}
              </p>
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

function SlideHeroInner({
  slide,
  book,
  books,
}: {
  slide: (typeof heroSlides)[number];
  book?: Book;
  books: Record<string, Book>;
}) {
  const theme = themes[slide.theme];

  /* The two covers layered behind the featured one — the other database books */
  const ghostBooks = heroSlides
    .filter((s) => s.id !== slide.id)
    .map((s) => books[s.bookId])
    .filter((b): b is Book => Boolean(b));

  return (
    <div
      className={`relative grid min-h-[540px] gap-10 px-6 pb-24 pt-12 sm:px-10 sm:pb-16 sm:pt-14 lg:min-h-[560px] lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-6 lg:px-16 lg:py-0 xl:px-20 ${theme.wrap}`}
    >
      {/* Ambient editorial gradients */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -top-28 left-[8%] h-[26rem] w-[26rem] ${theme.glowA}`}
      />
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -bottom-32 right-[4%] h-[30rem] w-[30rem] ${theme.glowB}`}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#B77C86]/40 to-transparent"
      />

      {/* Decorative oversized letter */}
      <span
        aria-hidden="true"
        className={`font-display pointer-events-none absolute -right-6 -top-10 select-none text-[16rem] font-bold leading-none ${theme.deco} hidden lg:block`}
      >
        B
      </span>

      {/* Copy */}
      <div className="relative z-10 lg:py-24">
        <p
          className={`flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.32em] ${theme.eyebrow}`}
        >
          <span aria-hidden="true" className={`h-px w-8 ${theme.hairline}`} />
          {slide.eyebrow}
        </p>
        <h1 className="font-display mt-5 text-[2.35rem] font-semibold leading-[1.06] tracking-[-0.015em] sm:text-5xl lg:text-[3.55rem] xl:text-[4.1rem]">
          {renderTitle(slide.title, slide.highlight, theme.eyebrow)}
        </h1>
        <p className={`mt-6 max-w-md text-base leading-[1.75] ${theme.body}`}>
          {slide.description}
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3.5">
          <Link
            href="/books"
            className={`group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 ${theme.primary}`}
          >
            Browse Books
            <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -translate-x-[150%] bg-[linear-gradient(105deg,transparent_35%,rgba(247,243,238,0.45)_50%,transparent_65%)] transition-transform duration-700 ease-out group-hover:translate-x-[150%]"
            />
          </Link>
        </div>

        {/* Shelf metadata straight from the database record */}
        {book ? (
          <p
            className={`mt-9 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] ${theme.meta}`}
          >
            <StarIcon className={`h-3.5 w-3.5 ${theme.star}`} />
            {book.category} · {book.copies} copies available
          </p>
        ) : null}
      </div>

      {/* Layered floating book covers — the live database image URLs */}
      {book ? (
        <div className="relative z-10 flex justify-center lg:my-24 lg:justify-end lg:pr-14 xl:pr-24">
          <div className="relative w-fit">
            {/* Layered ghost covers (other database records) */}
            {ghostBooks[0] ? (
              <div
                aria-hidden="true"
                className="bn-bob absolute -right-2 -top-9 w-16 rotate-6 sm:-right-12 sm:-top-12 sm:w-20 lg:w-24"
                style={{ animationDelay: "-1.4s" }}
              >
                <div className="relative aspect-[2/3] overflow-hidden rounded-xl shadow-lift ring-1 ring-[#292B32]/10">
                  <img
                    src={ghostBooks[0].image}
                    alt=""
                    width={160}
                    height={240}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <span className="absolute inset-0 bg-[#292B32]/15" />
                </div>
              </div>
            ) : null}
            {ghostBooks[1] ? (
              <div
                aria-hidden="true"
                className="bn-bob absolute -bottom-8 -left-3 w-14 -rotate-6 sm:-bottom-10 sm:-left-14 sm:w-18 lg:w-[5.5rem]"
                style={{ animationDelay: "-2.75s" }}
              >
                <div className="relative aspect-[2/3] overflow-hidden rounded-xl shadow-lift ring-1 ring-[#292B32]/10">
                  <img
                    src={ghostBooks[1].image}
                    alt=""
                    width={160}
                    height={240}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <span className="absolute inset-0 bg-[#292B32]/15" />
                </div>
              </div>
            ) : null}

            {/* Featured cover — floating 3D hardcover (shared BookNook cover system) */}
            <div className="bn-scene relative z-10 w-36 sm:w-44 lg:w-52 xl:w-60">
              <div className="bn-bob">
                <Link
                  href={`/books/${book._id}`}
                  aria-label={`${book.title} by ${book.author}`}
                  data-bn-book
                  className="bn-book relative block aspect-[2/3] focus-visible:outline-none"
                  onPointerMove={handleCoverMove}
                  onPointerLeave={(event) => resetCoverPose(event.currentTarget)}
                  onPointerCancel={(event) => resetCoverPose(event.currentTarget)}
                >
                  <div aria-hidden="true" className="bn-pages" />
                  <div aria-hidden="true" className="bn-spine" />

                  <div className="bn-face">
                    <img
                      src={book.image}
                      width={640}
                      height={960}
                      fetchPriority="high"
                      decoding="async"
                      alt={`${book.title} book cover by ${book.author}`}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-y-0 left-0 w-[13%] bg-[linear-gradient(90deg,rgba(8,18,12,0.42),rgba(8,18,12,0.14)_45%,rgba(8,18,12,0)_100%)]"
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-y-0 left-[13%] w-px bg-[#B77C86]/35"
                    />
                    <div aria-hidden="true" className="bn-sheen pointer-events-none absolute inset-0" />
                  </div>
                </Link>
              </div>

              <div aria-hidden="true" className="bn-ground" />
            </div>

            {/* Floating glass chips live outside the 3D transform context */}
            <div
              className={`absolute -left-3 -top-4 z-20 rounded-2xl border px-3.5 py-2.5 shadow-soft backdrop-blur-md sm:-left-10 sm:-top-6 sm:px-4 sm:py-3 ${theme.chip}`}
            >
              <p className="text-[0.55rem] font-semibold uppercase tracking-[0.2em] opacity-80 sm:text-[0.6rem]">
                {book.category}
              </p>
              <p className="mt-0.5 text-xs font-semibold sm:text-sm">{book.author}</p>
            </div>
            <div
              className={`absolute -bottom-4 right-0 z-20 rounded-2xl border px-3.5 py-2.5 shadow-soft backdrop-blur-md sm:-bottom-6 sm:-right-8 sm:px-4 sm:py-3 ${theme.chip}`}
            >
              <p className="text-[0.55rem] font-semibold uppercase tracking-[0.2em] opacity-75 sm:text-[0.6rem]">
                Status
              </p>
              <p className="mt-0.5 flex items-center gap-1.5 text-xs font-semibold sm:text-sm">
                <span className="relative inline-flex h-2 w-2">
                  <span
                    className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 ${theme.dot}`}
                  />
                  <span
                    className={`relative inline-flex h-2 w-2 rounded-full ${theme.dot}`}
                  />
                </span>
                Available now
              </p>
            </div>
          </div>
        </div>
      ) : null}
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
