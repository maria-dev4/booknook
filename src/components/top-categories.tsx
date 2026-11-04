"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { Spinner } from "@/components/spinner";

const categories = ["Fiction", "Science", "History", "Kids", "Others"];

export function TopCategories() {
  const [counts, setCounts] = useState<Record<string, number> | null>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/books`)
      .then((res) => res.json())
      .then((books) => {
        const tally: Record<string, number> = {};
        for (const category of categories) tally[category] = 0;
        if (Array.isArray(books)) {
          for (const book of books) {
            if (book.category && book.category in tally) {
              tally[book.category] += 1;
            }
          }
        }
        setCounts(tally);
      })
      .catch(() => {
        const empty: Record<string, number> = {};
        for (const category of categories) empty[category] = 0;
        setCounts(empty);
      });
  }, []);

  return (
    <section className="bg-ivory py-16 sm:py-24">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Browse By Shelf"
          title="Top categories at the Nook"
          highlight="categories"
          description="Five shelves, endlessly restocked by our readers — pick a direction and wander."
          action={
            <Link
              href="/books"
              className="inline-flex items-center rounded-full border border-forest/25 px-5 py-2.5 text-sm font-semibold text-forest transition-all duration-300 hover:bg-forest hover:text-ivory"
            >
              Browse all shelves
            </Link>
          }
        />

        <div className="mt-12">
          {counts === null ? (
            <Spinner />
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-5">
              {categories.map((category) => {
                const count = counts[category] ?? 0;
                return (
                  <Link
                    key={category}
                    href="/books"
                    className="group flex flex-col items-center rounded-3xl border border-forest/10 bg-cream px-4 py-8 text-center shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/40 hover:shadow-lift"
                  >
                    <span className="font-display inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-forest text-xl font-semibold text-ivory transition-colors duration-300 group-hover:bg-forest-deep">
                      {category.charAt(0)}
                    </span>
                    <span className="font-display mt-4 text-lg font-semibold text-forest transition-colors duration-300 group-hover:text-gold">
                      {category}
                    </span>
                    <span className="mt-1 text-sm text-ink-muted">
                      {count === 0 ? "No titles yet" : `${count} titles`}
                    </span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
