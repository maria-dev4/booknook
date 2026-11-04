"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BookListCard } from "@/components/book-list-card";
import { Spinner } from "@/components/spinner";
import { apiFetch } from "@/lib/api";
import type { Book } from "@/lib/types";

export default function AllBooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "BookNook | All Books";
    apiFetch("/books")
      .then(setBooks)
      .catch(() => toast.error("Could not load books"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner />;

  return (
    <main className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-8">
      <h1 className="font-display text-4xl text-forest">All Books</h1>
      <p className="mt-2 text-ink-muted">
        Browse every book shared by our readers.
      </p>

      {books.length === 0 ? (
        <p className="mt-10 text-ink-muted">No books have been added yet.</p>
      ) : (
        <div className="mt-8 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <BookListCard key={book._id} book={book} />
          ))}
        </div>
      )}
    </main>
  );
}
