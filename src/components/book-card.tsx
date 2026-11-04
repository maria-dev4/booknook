"use client";

import Image from "next/image";
import Link from "next/link";
import type { PointerEvent as ReactPointerEvent } from "react";
import type { Book } from "@/lib/data";
import { Stars } from "@/components/stars";

const POSE = { rx: 4, ry: 14 };
const MAX_TILT = { rx: 7, ry: 9 };

const CSS_VARS = ["--bn-rx", "--bn-ry", "--bn-sx", "--bn-sy"] as const;

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
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;

    cover.classList.add("bn-live");
    cover.style.setProperty("--bn-ry", `${(POSE.ry + px * MAX_TILT.ry).toFixed(2)}deg`);
    cover.style.setProperty("--bn-rx", `${(POSE.rx - py * MAX_TILT.rx).toFixed(2)}deg`);
    cover.style.setProperty("--bn-sx", `${((px + 0.5) * 100).toFixed(1)}%`);
    cover.style.setProperty("--bn-sy", `${((py + 0.5) * 100).toFixed(1)}%`);
  };

  return (
    <article className="group flex h-full flex-col">
      <div className="bn-scene relative block">
        <div className="bn-bob">
          <Link
            href={`/books/${book.id}`}
            data-bn-book
            onPointerMove={handlePointerMove}
            onPointerLeave={(event) => restPose(event.currentTarget)}
            onPointerCancel={(event) => restPose(event.currentTarget)}
            className="bn-book group/bn relative block aspect-[2/3] focus-visible:outline-none"
          >
            <div aria-hidden="true" className="bn-pages" />
            <div aria-hidden="true" className="bn-spine" />

            <div className="bn-face">
              <Image
                src={book.cover}
                alt={`${book.title} book cover by ${book.author}`}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                className="object-cover transition-transform duration-700 ease-out group-hover/bn:scale-[1.04]"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 left-0 w-[13%] bg-[linear-gradient(90deg,rgba(8,18,12,0.42),rgba(8,18,12,0.14)_45%,rgba(8,18,12,0)_100%)]"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 left-[13%] w-px bg-gold-soft/40"
              />
              <div aria-hidden="true" className="bn-sheen pointer-events-none absolute inset-0" />
            </div>
          </Link>
        </div>

        <div aria-hidden="true" className="bn-ground" />
      </div>

      <div className="flex flex-1 flex-col px-1 pt-4">
        <span className="inline-block w-fit rounded-full bg-gold-pale px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-forest">
          {book.genre}
        </span>
        <h3 className="font-display mt-2 text-[1.05rem] font-semibold leading-snug text-forest">
          <Link href={`/books/${book.id}`} className="transition-colors hover:text-gold">
            {book.title}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-ink-muted">{book.author}</p>
        <div className="mt-auto flex items-center justify-between pt-3">
          <Stars rating={book.rating} />
          <span className="text-xs font-medium text-ink-muted">{book.pages} pages</span>
        </div>
      </div>
    </article>
  );
}
