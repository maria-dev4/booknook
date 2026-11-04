"use client";

import Link from "next/link";
import type { PointerEvent as ReactPointerEvent, ReactNode } from "react";

const POSE = { rx: 4, ry: 14 };
const MAX_TILT = { rx: 7, ry: 9 };

const CSS_VARS = ["--bn-rx", "--bn-ry", "--bn-sx", "--bn-sy"] as const;

function restPose(element: HTMLElement) {
  element.classList.remove("bn-live");
  for (const name of CSS_VARS) element.style.removeProperty(name);
}

export function Book3DCard({
  href,
  title,
  author,
  category,
  cover,
  meta,
  actions,
}: {
  href: string;
  title: string;
  author: string;
  category: string;
  cover: string;
  meta?: ReactNode;
  actions?: ReactNode;
}) {
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
    <article className="group mx-auto flex h-full w-full max-w-[16rem] flex-col">
      {/* 3D book scene — scene -> float -> tilted hardcover with pages, spine and ground shadow */}
      <div className="bn-scene bn-sm relative block w-full">
        <div className="bn-bob">
          <Link
            href={href}
            data-bn-book
            onPointerMove={handlePointerMove}
            onPointerLeave={(event) => restPose(event.currentTarget)}
            onPointerCancel={(event) => restPose(event.currentTarget)}
            aria-label={`${title} by ${author}`}
            className="bn-book relative block aspect-[2/3] focus-visible:outline-none"
          >
            <div aria-hidden="true" className="bn-pages" />
            <div aria-hidden="true" className="bn-spine" />

            <div className="bn-face">
              <img
                src={cover}
                alt={`${title} book cover by ${author}`}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
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

      {/* Details live below the cover — never over the image */}
      <div className="flex flex-1 flex-col px-1 pt-5">
        <span className="inline-block w-fit rounded-full bg-gold/15 px-2.5 py-1 text-[0.7rem] font-semibold tracking-wide text-forest">
          {category}
        </span>
        <h3 className="font-display mt-2.5 line-clamp-2 min-h-[2.9rem] text-lg leading-snug text-forest">
          <Link href={href} className="transition-colors hover:text-gold">
            {title}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-ink-muted">{author}</p>
        {meta ? <div className="mt-2.5">{meta}</div> : null}
        {actions ? <div className="mt-auto pt-4">{actions}</div> : null}
      </div>
    </article>
  );
}
