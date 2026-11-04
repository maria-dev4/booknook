"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BookListCard } from "@/components/book-list-card";
import { Spinner } from "@/components/spinner";
import type { Book } from "@/lib/types";

export function NewArrivals() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/books?limit=6`)
      .then((res) => res.json())
      .then((data) => setBooks(Array.isArray(data) ? data : []))
      .catch(() => setBooks([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8">
      <div className="flex items-center gap-4">
        <span
          aria-hidden="true"
          className="h-px w-10 shrink-0 rounded-full bg-gold/50"
        />
        <h2 className="font-display text-3xl font-semibold leading-[1.15] text-forest sm:text-4xl">
          <span className="italic text-gold">New arrivals</span> this month
        </h2>
      </div>
      <p className="mt-3 max-w-xl text-[0.95rem] leading-relaxed text-ink-muted/90">
        The latest books added by our readers, fresh on the shelves.
      </p>

      {loading ? (
        <Spinner />
      ) : books.length === 0 ? (
        <p className="mt-10 text-ink-muted">No books have been added yet.</p>
      ) : (
        <div className="mt-8 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <BookListCard key={book._id} book={book} />
          ))}
        </div>
      )}

      <div className="mt-10 flex justify-center">
        <Link
          href="/books"
          className="inline-flex items-center rounded-full bg-forest px-7 py-3 text-sm font-semibold text-ivory shadow-soft transition-all duration-300 hover:bg-forest-deep hover:shadow-lift"
        >
          See All Books
        </Link>
      </div>
    </section>
  );
}