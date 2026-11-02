import Image from "next/image";
import Link from "next/link";
import type { Book } from "@/lib/data";
import { StarIcon } from "@/components/icons";

export function BookCard({ book }: { book: Book }) {
  return (
    <div className="group h-full [perspective:1000px]">
      <Link
        href={`/books/${book.id}`}
        className="relative block aspect-[2/3] overflow-hidden rounded-[4px] bg-ivory-deep ring-1 ring-forest/10 shadow-[0_2px_4px_rgba(31,61,43,0.08),0_10px_22px_-8px_rgba(31,61,43,0.35),0_32px_64px_-26px_rgba(31,61,43,0.45)] transition-[transform,box-shadow] duration-300 ease-out group-hover:[transform:translateY(-8px)_rotateY(-12deg)] group-hover:shadow-[0_4px_8px_rgba(31,61,43,0.1),0_18px_36px_-12px_rgba(31,61,43,0.45),0_48px_90px_-30px_rgba(31,61,43,0.55)] hover:ring-1 hover:ring-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
      >
        <Image
          src={book.cover}
          alt={`${book.title} book cover by ${book.author}`}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
          className="object-cover"
        />
        <div className="absolute inset-y-0 left-0 w-[7%] bg-gradient-to-r from-forest-deep/70 via-forest-deep/30 to-transparent" />
        <span className="absolute left-2 top-2 rounded-full bg-ivory/90 px-2.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-forest">
          {book.genre}
        </span>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest-deep/95 via-forest-deep/60 to-transparent px-3 pb-3 pt-10">
          <h3 className="font-display line-clamp-2 text-sm font-semibold leading-snug text-ivory sm:text-[0.95rem]">
            {book.title}
          </h3>
          <p className="mt-1 truncate text-[0.7rem] text-ivory/75 sm:text-xs">{book.author}</p>
          <div className="mt-1.5 flex items-center justify-between gap-2">
            <span
              className="flex items-center gap-0.5"
              aria-label={`Rated ${book.rating} out of 5`}
            >
              {[1, 2, 3, 4, 5].map((i) => (
                <StarIcon
                  key={i}
                  className={`h-3 w-3 ${
                    i <= Math.round(book.rating) ? "text-gold" : "text-ivory/25"
                  }`}
                />
              ))}
            </span>
            <span className="text-[0.65rem] font-medium text-ivory/60">{book.pages} pages</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
