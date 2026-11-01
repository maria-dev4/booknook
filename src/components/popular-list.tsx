import Image from "next/image";
import Link from "next/link";
import { popularBooks } from "@/lib/data";
import { Stars } from "@/components/stars";
import { BookmarkIcon } from "@/components/icons";

const borrows: Record<string, number> = {
  "song-achilles": 168,
  "evelyn-hugo": 154,
  pachinko: 141,
  dune: 137,
  "atomic-habits": 133,
  "midnight-library": 128,
};

export function PopularList() {
  return (
    <div className="flex flex-col gap-4">
      {popularBooks.map((book, index) => (
        <article
          key={book.id}
          className="group grid grid-cols-[auto_1fr] items-center gap-5 rounded-3xl border border-forest/10 bg-cream p-4 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/40 hover:shadow-lift sm:grid-cols-[auto_auto_1fr_auto] sm:gap-7 sm:p-5"
        >
          <span className="font-display pl-2 text-4xl font-semibold text-gold-soft transition-colors duration-300 group-hover:text-gold sm:pl-4 sm:text-5xl">
            {String(index + 1).padStart(2, "0")}
          </span>

          <div className="relative mx-auto w-16 shrink-0 overflow-hidden rounded-xl shadow-soft sm:h-24 sm:w-16">
            <div className="relative aspect-[2/3] sm:aspect-auto sm:h-24">
              <Image
                src={book.cover}
                alt={`${book.title} book cover by ${book.author}`}
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>
          </div>

          <div className="pr-2">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <h3 className="font-display text-lg font-semibold text-forest sm:text-xl">
                <Link href={`/books/${book.id}`} className="transition-colors hover:text-gold">
                  {book.title}
                </Link>
              </h3>
              <span className="rounded-full border border-forest/15 bg-ivory px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                {book.genre}
              </span>
            </div>
            <p className="mt-1 text-sm text-ink-muted">
              {book.author} · {book.year}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-4">
              <Stars rating={book.rating} />
            </div>
          </div>

          <div className="col-span-2 flex flex-wrap items-center justify-between gap-4 border-t border-forest/10 pt-4 sm:col-span-1 sm:min-w-[190px] sm:justify-end sm:gap-6 sm:border-l sm:border-t-0 sm:pl-7 sm:pt-0">
            <p className="inline-flex items-center gap-2 text-sm text-ink-muted sm:text-right">
              <BookmarkIcon className="h-4 w-4 text-gold" />
              <span className="font-display text-sm font-semibold text-forest">
                {borrows[book.id] ?? 120}
              </span>
              borrows
            </p>
            <Link
              href={`/books/${book.id}`}
              className="rounded-full border border-forest px-5 py-2 text-sm font-semibold text-forest transition-all duration-300 hover:bg-forest hover:text-ivory"
            >
              Reserve
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
