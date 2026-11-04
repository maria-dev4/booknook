"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { PrivateRoute } from "@/components/private-route";
import { Spinner } from "@/components/spinner";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";
import type { Book } from "@/lib/types";

const readOnlyClass =
  "w-full rounded-xl border border-forest/15 bg-forest/5 px-4 py-3 text-sm text-ink-muted outline-none";

function BookDetails() {
  const params = useParams();
  const id = String(params.id);
  const { data: session } = authClient.useSession();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const loadBook = useCallback(async () => {
    try {
      const data = await apiFetch(`/books/${id}`);
      setBook(data);
    } catch {
      setBook(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadBook();
  }, [loadBook]);

  useEffect(() => {
    document.title = book ? `BookNook | ${book.title}` : "BookNook | Book Details";
  }, [book]);

  const handleBorrow = async () => {
    setSubmitting(true);
    try {
      await apiFetch("/borrows", {
        method: "POST",
        body: JSON.stringify({ bookId: id, userName: session?.user.name }),
      });
      toast.success("Book borrowed successfully");
      setModalOpen(false);
      await loadBook();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not borrow the book");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Spinner />;

  if (!book) {
    return (
      <main className="mx-auto max-w-3xl px-5 py-20 text-center">
        <h1 className="font-display text-3xl text-forest">Book not found</h1>
        <Link
          href="/books"
          className="mt-6 inline-flex rounded-full bg-forest px-6 py-3 text-sm font-semibold text-ivory"
        >
          Back to All Books
        </Link>
      </main>
    );
  }

  const available = book.copies > 0;

  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-12 sm:px-8">
      <div className="grid gap-10 md:grid-cols-[320px_1fr]">
        <div className="h-[28rem] overflow-hidden rounded-2xl bg-forest/5 shadow-soft">
          <img src={book.image} alt={book.title} className="h-full w-full object-cover" />
        </div>

        <div>
          <span className="rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold text-forest">
            {book.category}
          </span>
          <h1 className="mt-4 font-display text-4xl text-forest">{book.title}</h1>
          <p className="mt-2 text-lg text-ink-muted">by {book.author}</p>
          <p className="mt-6 leading-relaxed text-ink-muted">{book.description}</p>

          <div className="mt-6 space-y-1 text-sm text-ink-muted">
            <p>
              Added by <span className="font-semibold text-forest">{book.addedByName}</span> (
              {book.addedByEmail})
            </p>
            <p>Added on {new Date(book.createdAt).toLocaleDateString()}</p>
            <p>
              Copies available:{" "}
              <span className="font-semibold text-forest">{book.copies}</span>
            </p>
          </div>

          <button
            type="button"
            disabled={!available}
            onClick={() => setModalOpen(true)}
            className="mt-8 inline-flex items-center rounded-full bg-forest px-7 py-3 text-sm font-semibold text-ivory shadow-soft transition-all duration-300 hover:bg-forest-deep hover:shadow-lift disabled:cursor-not-allowed disabled:opacity-50"
          >
            {available ? "Borrow This Book" : "Not Available"}
          </button>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-5">
          <div className="w-full max-w-md rounded-3xl bg-ivory p-8 shadow-lift">
            <h2 className="font-display text-2xl text-forest">Borrow "{book.title}"</h2>
            <div className="mt-5 space-y-3">
              <input readOnly value={session?.user.name ?? ""} className={readOnlyClass} />
              <input readOnly value={session?.user.email ?? ""} className={readOnlyClass} />
            </div>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="flex-1 rounded-full border border-forest/20 px-5 py-3 text-sm font-semibold text-forest"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={submitting}
                onClick={handleBorrow}
                className="flex-1 rounded-full bg-forest px-5 py-3 text-sm font-semibold text-ivory disabled:opacity-60"
              >
                {submitting ? "Please wait..." : "Confirm Borrow"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default function BookDetailsPage() {
  return (
    <PrivateRoute>
      <BookDetails />
    </PrivateRoute>
  );
}