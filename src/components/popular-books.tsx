"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { Book3DCard } from "@/components/book-3d-card";
import { Spinner } from "@/components/spinner";
import { BookmarkIcon } from "@/components/icons";
import { popularBooks } from "@/lib/data";
import type { Book } from "@/lib/types";

/* Curated favourites are matched against the real library collection,
 * so every card links to a genuine MongoDB `_id`. Remaining real books
 * fill the grid so guests always see a full, working shelf. */
const favouriteTitles = new Set(
  popularBooks.map((b) => b.title.trim().toLowerCase()),
);

export function PopularBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/books`)
      .then((res) => res.json())
      .then((data) => setBooks(Array.isArray(data) ? data : []))
      .catch(() => setBooks([]))
      .finally(() => setLoading(false));
  }, []);

  const favourites = useMemo(() => {
    const match = (b: Book) => favouriteTitles.has(b.title.trim().toLowerCase());
    const namedMatches = books.filter(match);
    const fillers = books.filter((b) => !match(b));
    return [...namedMatches, ...fillers].slice(0, 6);
  }, [books]);

  return (
    <section className="bg-ivory-deep py-16 sm:py-24">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Community Favourites"
          title="The most borrowed books in the Nook"
          highlight="most borrowed"
          description="Ranked by member borrowing this season — re-drawn weekly, argued over daily."
          action={
            <Link
              href="/popular"
              className="inline-flex items-center rounded-full border border-forest/25 px-5 py-2.5 text-sm font-semibold text-forest transition-all duration-300 hover:bg-forest hover:text-ivory"
            >
              View the full chart
            </Link>
          }
        />
        <div className="mt-12 grid grid-cols-1 gap-y-12 gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            <Spinner />
          ) : books.length === 0 ? (
            <p className="text-ink-muted">No books have been added yet.</p>
          ) : (
            favourites.map((book) => (
              <Book3DCard
                key={book._id}
                href={`/books/${book._id}`}
                title={book.title}
                author={book.author}
                category={book.category}
                cover={book.image}
                meta={
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-muted">
                      <BookmarkIcon className="h-4 w-4 text-gold" />
                      {book.copies > 0
                        ? `${book.copies} ${book.copies === 1 ? "copy" : "copies"} left`
                        : "Waitlist open"}
                    </span>
                    <span className="text-xs text-ink-muted/80">
                      Added by {book.addedByName}
                    </span>
                  </div>
                }
                actions={
                  <Link
                    href={`/books/${book._id}`}
                    className="inline-flex items-center justify-center rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-ivory shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:bg-forest-deep hover:shadow-lift"
                  >
                    View Details
                  </Link>
                }
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
