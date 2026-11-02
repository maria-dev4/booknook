"use client";

import Image from "next/image";
import Link from "next/link";
import type { PointerEvent as ReactPointerEvent } from "react";
import type { Book } from "@/lib/data";
import { Stars } from "@/components/stars";

/** Max tilt, in degrees. Kept subtle so tight 6-column grids still read cleanly. */
const MAX_TILT = { rx: 9, ry: 13 };

const CSS_VARS = ["--bn-rx", "--bn-ry", "--bn-sx", "--bn-sy"] as const;

/** Return the card to its resting pose and let CSS focus/hover rules take over again. */
function restPose(element: HTMLElement) {
  element.classList.remove("bn-live");
  for (const name of CSS_VARS) element.style.removeProperty(name);
}

export function BookCard({ book }: { book: Book }) {
  const handlePointerMove = (event: ReactPointerEvent<HTMLAnchorElement>) => {
    if (event.pointerType === "touch") return;
    const cover = event.currentTarget;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      restPose(cover);
      return;
    }

    const rect = cover.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5; // -0.5 … 0.5
    const py = (event.clientY - rect.top) / rect.height - 0.5;

    cover.classList.add("bn-live");
    cover.style.setProperty("--bn-ry", `${(px * MAX_TILT.ry).toFixed(2)}deg`);
    cover.style.setProperty("--bn-rx", `${(-py * MAX_TILT.rx).toFixed(2)}deg`);
    cover.style.setProperty("--bn-sx", `${((px + 0.5) * 100).toFixed(1)}%`);
    cover.style.setProperty("--bn-sy", `${((py + 0.5) * 100).toFixed(1)}%`);
  };

  return (
    <article className="group flex h-full flex-col">
      {/* 3D scene — perspective + soft ground shadow live here */}
      <div className="bn-scene relative block">
        {/* Idle float layers the pointer tilt on top without clashing */}
        <div className="bn-bob">
          <Link
            href={`/books/${book.id}`}
            data-bn-book
            onPointerMove={handlePointerMove}
            onPointerLeave={(event) => restPose(event.currentTarget)}
            onPointerCancel={(event) => restPose(event.currentTarget)}
            className="bn-book group/bn relative block aspect-[2/3] focus-visible:outline-none"
          >
            {/* Paper block behind the cover — peeks on the right like a closed book */}
            <div
              aria-hidden="true"
              className="bn-slab pointer-events-none absolute top-[3px] bottom-[3px] left-[10px] -right-[3px] rounded-[3px] bg-cream shadow-[0_14px_26px_-16px_rgba(20,42,29,0.5)] [background-image:repeating-linear-gradient(90deg,rgba(30,42,34,0.06)_0px_1px,transparent_1px_4px),linear-gradient(90deg,#c9bfa4,#ece5d1_58%,#f7f1e1)]"
            />

            {/* Front cover */}
            <div className="bn-face absolute inset-0 overflow-hidden rounded-[10px] bg-ivory-deep">
              <Image
                src={book.cover}
                alt={`${book.title} book cover by ${book.author}`}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                className="object-cover transition-transform duration-700 ease-out group-hover/bn:scale-[1.055]"
              />
              {/* Bound spine impression + gold foil line */}
              <div
                aria-hidden="true"
                className="absolute inset-y-0 left-0 w-[8%] bg-[linear-gradient(90deg,rgba(10,22,15,0.45),rgba(10,22,15,0.16)_52%,rgba(10,22,15,0)_100%)]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-y-0 left-[8%] w-px bg-gold-soft/40"
              />
              {/* Light sweep that tracks the pointer */}
              <div aria-hidden="true" className="bn-sheen absolute inset-0" />
            </div>

            {/* Floating genre tag */}
            <span className="bn-badge absolute left-3 top-3 inline-flex rounded-full bg-ivory px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-forest shadow-[0_4px_10px_rgba(20,42,29,0.18)]">
              {book.genre}
            </span>

            {/* Borrow hint, hovering above the cover while it tilts */}
            <div className="bn-veil absolute inset-x-3 bottom-3 rounded-xl bg-forest/95 py-2.5 text-center text-xs font-semibold uppercase tracking-[0.2em] text-ivory">
              Borrow now
            </div>
          </Link>
        </div>

        {/* Floating-contact ground shadow */}
        <div aria-hidden="true" className="bn-ground" />
      </div>

      <div className="flex flex-1 flex-col px-1 pt-4">
        <h3 className="font-display text-[1.05rem] font-semibold leading-snug text-forest">
          <Link href={`/books/${book.id}`} className="transition-colors hover:text-gold">
            {book.title}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-ink-muted">{book.author}</p>
        <div className="mt-2.5 flex items-center justify-between">
          <Stars rating={book.rating} />
          <span className="text-xs font-medium text-ink-muted">{book.pages} pages</span>
        </div>
      </div>
    </article>
  );
}
