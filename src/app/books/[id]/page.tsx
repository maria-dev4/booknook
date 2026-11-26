"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { PrivateRoute } from "@/components/private-route";
import { Spinner } from "@/components/spinner";
import { ArrowIcon, ClockIcon, CloseIcon, RepeatIcon } from "@/components/icons";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";
import type { Book } from "@/lib/types";
import type { ReactNode } from "react";

const readOnlyClass =
  "w-full rounded-xl border border-forest/15 bg-forest/5 px-4 py-3 text-sm text-ink-muted outline-none";

function InfoRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="py-3.5">
      <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-ink-muted/80">
        {label}
      </dt>
      <dd className="mt-1 text-sm font-medium leading-relaxed text-forest">{children}</dd>
    </div>
  );
}

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
    let active = true;

    apiFetch(`/books/${id}`)
      .then((data) => {
        if (active) setBook(data);
      })
      .catch(() => {
        if (active) setBook(null);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [id]);

  useEffect(() => {
    document.title = book ? `BookNook | ${book.title}` : "BookNook | Book Details";
  }, [book]);

  useEffect(() => {
    if (!modalOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setModalOpen(false);
    };
    const previousOverflow = document.body.style.overflow;

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [modalOpen]);

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
  const availabilityLabel = available
    ? `${book.copies} ${book.copies === 1 ? "copy" : "copies"} available`
    : "Currently unavailable";
  const addedOn = new Date(book.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="mx-auto w-full max-w-6xl px-5 pb-16 pt-7 sm:px-8 sm:pb-20 sm:pt-9">
      <div className="w-full">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex min-w-0 items-center gap-2.5 text-sm text-ink-muted">
          <Link
            href="/books"
            className="inline-flex shrink-0 items-center gap-2 transition-colors duration-200 hover:text-forest"
          >
            <ArrowIcon className="h-4 w-4 rotate-180" />
            All books
          </Link>
          <span aria-hidden="true" className="text-forest/25">
            /
          </span>
          <span className="truncate text-forest/70">{book.title}</span>
        </nav>

        {/* Hero */}
        <section className="mt-7 grid gap-10 md:mt-9 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:items-start md:gap-8 lg:gap-10">
          {/* Cover presentation — a single clean surface, no nested frame */}
          <div className="mx-auto w-full max-w-[15rem] sm:max-w-[16rem] md:max-w-[18rem] lg:max-w-[19rem]">
            <Image
              src={book.image}
              alt={`${book.title} book cover`}
              width={640}
              height={960}
              unoptimized
              sizes="(max-width: 768px) 60vw, 18rem"
              loading="eager"
              className="h-auto w-full rounded-md shadow-[0_2px_5px_rgba(20,42,29,0.14),0_18px_36px_-14px_rgba(20,42,29,0.4),0_36px_60px_-28px_rgba(20,42,29,0.3)]"
            />
          </div>

          {/* Book information */}
          <div className="min-w-0">
            <span className="inline-flex items-center rounded-full border border-gold/25 bg-gold-pale/70 px-3 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-forest">
              {book.category}
            </span>

            <h1 className="font-display mt-4 text-balance text-[2.1rem] font-semibold leading-[1.08] tracking-[-0.01em] text-forest sm:text-[2.55rem] lg:text-[2.9rem]">
              {book.title}
            </h1>

            <p className="font-display mt-3 text-lg italic leading-snug text-ink-muted sm:text-xl">
              by {book.author}
            </p>

            <p className="mt-5 line-clamp-3 max-w-xl text-sm leading-7 text-ink-muted sm:text-[0.95rem]">
              {book.description}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-ink-muted">
              <span className="inline-flex items-center gap-2 font-semibold text-forest">
                <span
                  aria-hidden="true"
                  className={`h-1.5 w-1.5 rounded-full ${
                    available ? "bg-forest" : "bg-error"
                  }`}
                />
                {availabilityLabel}
              </span>
              <span aria-hidden="true" className="h-3 w-px bg-forest/15" />
              <span>Added {addedOn}</span>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                disabled={!available}
                onClick={() => setModalOpen(true)}
                className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-forest px-6 py-3.5 text-sm font-semibold text-ivory shadow-soft transition-all duration-300 hover:bg-forest-deep hover:shadow-lift disabled:cursor-not-allowed disabled:opacity-50"
              >
                {available ? "Borrow this book" : "Not available"}
                <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </button>
              <Link
                href="/books"
                className="inline-flex items-center justify-center rounded-full border border-forest/20 px-6 py-3.5 text-sm font-semibold text-forest transition-all duration-300 hover:border-forest/40 hover:bg-cream"
              >
                Browse collection
              </Link>
            </div>
          </div>
        </section>

        {/* Details */}
        <section aria-labelledby="book-details-heading" className="mt-10 sm:mt-12">
          <div className="rounded-2xl border border-forest/10 bg-ivory-deep/60 p-6 sm:p-8 lg:p-10">
            <div className="grid gap-8 md:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] md:gap-10 lg:gap-14">
              {/* Left column */}
              <div className="min-w-0">
                <h2
                  id="book-details-heading"
                  className="font-display text-[1.6rem] font-semibold leading-tight text-forest sm:text-[1.75rem]"
                >
                  Description
                </h2>
                <p className="mt-3 whitespace-pre-line text-sm leading-7 text-ink-muted sm:text-[0.95rem]">
                  {book.description}
                </p>

                <div className="mt-7 border-t border-forest/10 pt-6">
                  <h2 className="font-display text-[1.6rem] font-semibold leading-tight text-forest sm:text-[1.75rem]">
                    About the Book
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-ink-muted sm:text-[0.95rem]">
                    <span className="font-medium text-forest">{book.title}</span> sits in the{" "}
                    {book.category} collection at BookNook, shared by{" "}
                    <span className="font-medium text-forest">{book.addedByName}</span> and added to
                    our shelves on {addedOn}.
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-ink-muted">
                    <span className="inline-flex items-center gap-1.5">
                      <ClockIcon className="h-3.5 w-3.5 text-gold" />
                      48-hour reservation hold
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <RepeatIcon className="h-3.5 w-3.5 text-gold" />
                      21-day loan period
                    </span>
                  </div>
                </div>
              </div>

              {/* Right column — only fields present in the book record */}
              <aside className="min-w-0 border-t border-forest/10 pt-7 md:border-l md:border-t-0 md:pl-10 md:pt-0 lg:pl-12">
                <h2 className="font-display text-[1.6rem] font-semibold leading-tight text-forest sm:text-[1.75rem]">
                  Book Details
                </h2>

                <dl className="mt-2 divide-y divide-forest/10">
                  <InfoRow label="Author">{book.author}</InfoRow>
                  <InfoRow label="Category">{book.category}</InfoRow>
                  <InfoRow label="Availability">
                    <span className={available ? "text-forest" : "text-error"}>
                      {availabilityLabel}
                    </span>
                  </InfoRow>
                  <InfoRow label="Shared by">
                    <span className="block">{book.addedByName}</span>
                    <span className="mt-0.5 block break-all text-xs font-normal text-ink-muted">
                      {book.addedByEmail}
                    </span>
                  </InfoRow>
                  <InfoRow label="Date added">{addedOn}</InfoRow>
                </dl>
              </aside>
            </div>
          </div>
        </section>
      </div>

      {/* Borrow confirmation modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-forest-deep/55 p-0 backdrop-blur-sm sm:items-center sm:px-5"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setModalOpen(false);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="borrow-dialog-title"
            className="relative max-h-[92vh] w-full max-w-md overflow-y-auto rounded-t-[2rem] border border-forest/10 bg-cream p-6 shadow-lift sm:rounded-[2rem] sm:p-8"
          >
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              aria-label="Close borrow dialog"
              className="absolute right-5 top-5 inline-flex h-9 w-9 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-forest/5 hover:text-forest"
            >
              <CloseIcon className="h-5 w-5" />
            </button>

            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-gold">
              Confirm Borrow
            </p>
            <h2
              id="borrow-dialog-title"
              className="font-display mt-2 pr-8 text-2xl font-semibold text-forest sm:text-3xl"
            >
              Borrow this book
            </h2>

            <div className="mt-5 flex items-center gap-4 rounded-2xl border border-forest/10 bg-ivory/70 p-3">
              <Image
                src={book.image}
                alt=""
                width={56}
                height={84}
                unoptimized
                className="h-[5.25rem] w-14 shrink-0 rounded-lg object-cover shadow-soft"
              />
              <div className="min-w-0">
                <p className="font-display text-base font-semibold leading-snug text-forest">
                  {book.title}
                </p>
                <p className="mt-1 text-xs text-ink-muted">{book.author}</p>
                <p className="mt-1.5 text-[0.7rem] font-medium uppercase tracking-wide text-gold">
                  {book.category}
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold text-forest">Name</span>
                <input readOnly value={session?.user.name ?? ""} className={readOnlyClass} />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold text-forest">Email</span>
                <input readOnly value={session?.user.email ?? ""} className={readOnlyClass} />
              </label>
            </div>

            <p className="mt-4 text-xs leading-relaxed text-ink-muted">
              Your reservation will be held for 48 hours. Collect your copy from the Nook counter
              within that window.
            </p>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="flex-1 rounded-full border border-forest/20 px-5 py-3 text-sm font-semibold text-forest transition-colors hover:bg-forest/5"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={submitting}
                onClick={handleBorrow}
                className="flex-1 rounded-full bg-forest px-5 py-3 text-sm font-semibold text-ivory shadow-soft transition-colors hover:bg-forest-deep disabled:opacity-60"
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
