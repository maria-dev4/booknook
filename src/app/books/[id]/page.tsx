import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allBooks, getBookById } from "@/lib/data";
import { BookCard } from "@/components/book-card";
import { CtaBand } from "@/components/cta-band";
import { BorrowButton } from "@/components/borrow-button";
import { Stars } from "@/components/stars";
import { ChevronIcon } from "@/components/icons";

export function generateStaticParams() {
  return allBooks.map((book) => ({ id: book.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/books/[id]">): Promise<Metadata> {
  const { id } = await params;
  const book = getBookById(Array.isArray(id) ? id[0] : id);
  if (!book) return { title: "Book not found" };
  return { title: `${book.title} by ${book.author}` };
}

export default async function BookPage({ params }: PageProps<"/books/[id]">) {
  const { id } = await params;
  const book = getBookById(Array.isArray(id) ? id[0] : id);
  if (!book) notFound();

  const related = allBooks
    .filter((b) => b.id !== book.id)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  const shelves = [
    { label: "Pages", value: `${book.pages}` },
    { label: "Published", value: `${book.year}` },
    { label: "Format", value: "Hardcover" },
    { label: "Language", value: "English" },
    { label: "Rating", value: `${book.rating.toFixed(1)}/5` },
    { label: "Shelf", value: "Aisle 4 · Nook Corner" },
  ];

  return (
    <main className="flex-1">
      <section className="bg-ivory-deep py-14 sm:py-20">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="text-xs font-medium uppercase tracking-[0.18em] text-ink-muted">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="transition-colors hover:text-forest">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronIcon className="h-3 w-3" />
              </li>
              <li>
                <Link href="/new-arrivals" className="transition-colors hover:text-forest">
                  Shelves
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronIcon className="h-3 w-3" />
              </li>
              <li className="text-forest" aria-current="page">
                {book.title}
              </li>
            </ol>
          </nav>

          <div className="mt-10 grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            {/* Cover */}
            <div className="relative mx-auto w-full max-w-sm">
              <div
                aria-hidden="true"
                className="absolute -inset-5 -rotate-3 rounded-3xl border border-gold/40 bg-cream/40"
              />
              <div className="relative overflow-hidden rounded-3xl shadow-lift">
                <div className="relative aspect-[2/3]">
                  <Image
                    src={book.cover}
                    alt={`${book.title} book cover by ${book.author}`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 384px, 420px"
                    className="object-cover"
                  />
                </div>
              </div>
              <p className="font-display mt-6 text-center text-sm italic text-ink-muted">
                Shelf Aisle 4 · Nook Corner — backlit every evening
              </p>
            </div>

            {/* Details */}
            <div>
              <span className="inline-flex rounded-full border border-forest/15 bg-cream px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-forest">
                {book.genre}
              </span>
              <h1 className="font-display mt-4 text-3xl font-semibold leading-[1.15] text-forest sm:text-4xl lg:text-[3rem]">
                {book.title}
              </h1>
              <p className="font-display mt-2 text-lg italic text-ink-muted">
                by {book.author} · {book.year}
              </p>

              <div className="mt-5 flex items-center gap-4">
                <Stars rating={book.rating} />
                <span className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.18em] text-ink-muted">
                  <span className="relative inline-flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
                  </span>
                  3 copies on shelf
                </span>
              </div>

              <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
                {book.blurb} A homegrown favourite at BookNook — ask our librarians for
                a reading note when you collect your copy.
              </p>

              <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 rounded-3xl border border-forest/10 bg-cream p-6 shadow-soft sm:grid-cols-3">
                {shelves.map((item) => (
                  <div key={item.label}>
                    <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-ink-muted">
                      {item.label}
                    </dt>
                    <dd className="font-display mt-1 text-lg font-semibold text-forest">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <BorrowButton />
                <Link
                  href="/how-it-works"
                  className="text-sm font-semibold text-forest underline decoration-gold decoration-2 underline-offset-4 transition-colors hover:text-gold"
                >
                  How borrowing works
                </Link>
              </div>
              <p className="mt-3 text-xs text-ink-muted">
                Free with BookNook membership · 21-day loan · renew once online
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="bg-ivory py-20">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <h2 className="font-display text-2xl font-semibold text-forest sm:text-3xl">
            More from <span className="italic text-gold">these shelves</span>
          </h2>
          <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 md:gap-x-7">
            {related.map((b) => (
              <BookCard key={b.id} book={b} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/new-arrivals"
              className="font-display inline-flex items-center gap-2 text-lg font-semibold text-forest transition-colors hover:text-gold"
            >
              ← Back to all shelves
            </Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </main>
  );
}
