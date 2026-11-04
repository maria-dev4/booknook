import Link from "next/link";
import type { Book } from "@/lib/types";

export function BookListCard({ book }: { book: Book }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-forest/10 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className="h-72 w-full overflow-hidden bg-forest/5">
        <img
          src={book.image}
          alt={book.title}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <span className="w-fit rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold text-forest">
          {book.category}
        </span>
        <h3 className="mt-3 line-clamp-2 min-h-[3.5rem] font-display text-xl text-forest">
          {book.title}
        </h3>
        <p className="mt-1 text-sm text-ink-muted">{book.author}</p>
        <Link
          href={`/books/${book._id}`}
          className="mt-5 inline-flex items-center justify-center rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-ivory shadow-soft transition-all duration-300 hover:bg-forest-deep hover:shadow-lift"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}