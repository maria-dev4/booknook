import Image from "next/image";
import Link from "next/link";
import type { Book } from "@/lib/data";
import { Stars } from "@/components/stars";

export function BookCard({ book }: { book: Book }) {
  return (
    <article className="group flex h-full flex-col">
      <Link
        href={`/books/${book.id}`}
        className="relative block overflow-hidden rounded-2xl bg-ivory-deep shadow-soft transition-all duration-500 group-hover:-translate-y-1.5 group-hover:shadow-lift"
      >
        <div className="relative aspect-[2/3]">
          <Image
            src={book.cover}
            alt={`${book.title} book cover by ${book.author}`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        </div>
        <span className="absolute left-3 top-3 rounded-full bg-ivory/90 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-forest shadow-soft backdrop-blur">
          {book.genre}
        </span>
        {/* Hover borrow veil */}
        <div className="absolute inset-x-3 bottom-3 translate-y-3 rounded-xl bg-forest/90 py-2.5 text-center text-xs font-semibold uppercase tracking-[0.2em] text-ivory opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          Borrow now
        </div>
      </Link>

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
