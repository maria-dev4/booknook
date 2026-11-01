"use client";

import { useMemo, useState } from "react";
import type { Book } from "@/lib/data";
import { BookCard } from "@/components/book-card";
import { ChevronIcon, SearchIcon } from "@/components/icons";

type SortKey = "featured" | "title" | "author" | "rating" | "newest";

const sortOptions: { key: SortKey; label: string }[] = [
  { key: "featured", label: "Featured order" },
  { key: "title", label: "Title A–Z" },
  { key: "author", label: "Author A–Z" },
  { key: "rating", label: "Highest rated" },
  { key: "newest", label: "Newest first" },
];

export function BooksExplorer({ books }: { books: Book[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState<SortKey>("featured");

  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    for (const book of books) {
      counts.set(book.genre, (counts.get(book.genre) ?? 0) + 1);
    }
    return [
      { name: "All", count: books.length },
      ...[...counts.entries()]
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => a.name.localeCompare(b.name)),
    ];
  }, [books]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = books.filter((book) => {
      const inCategory = category === "All" || book.genre === category;
      const haystack = `${book.title} ${book.author} ${book.genre} ${book.blurb}`.toLowerCase();
      return inCategory && (!q || haystack.includes(q));
    });

    const sorted = [...filtered];
    switch (sort) {
      case "title":
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "author":
        sorted.sort((a, b) => a.author.localeCompare(b.author));
        break;
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        sorted.sort((a, b) => b.year - a.year);
        break;
    }
    return sorted;
  }, [books, category, sort, query]);

  const resetFilters = () => {
    setQuery("");
    setCategory("All");
    setSort("featured");
  };

  return (
    <div className="mt-12">
      {/* Controls panel */}
      <div className="flex flex-col gap-5 rounded-3xl border border-forest/10 bg-cream p-5 shadow-soft sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Search bar */}
          <div className="relative w-full lg:max-w-md">
            <label htmlFor="book-search" className="sr-only">
              Search the collection
            </label>
            <SearchIcon className="pointer-events-none absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
            <input
              id="book-search"
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search titles, authors, genres…"
              className="h-11 w-full rounded-full border border-forest/15 bg-ivory pl-11 pr-4 text-sm text-ink placeholder:text-ink-muted/60 outline-none transition-colors focus:border-gold"
            />
          </div>

          {/* Sort options */}
          <div className="relative w-full sm:w-56 lg:w-64">
            <label htmlFor="book-sort" className="sr-only">
              Sort the collection
            </label>
            <select
              id="book-sort"
              value={sort}
              onChange={(event) => setSort(event.target.value as SortKey)}
              className="h-11 w-full cursor-pointer appearance-none rounded-full border border-forest/15 bg-ivory pl-5 pr-10 text-sm font-medium text-forest outline-none transition-colors focus:border-gold"
            >
              {sortOptions.map((option) => (
                <option key={option.key} value={option.key}>
                  Sort by · {option.label}
                </option>
              ))}
            </select>
            <ChevronIcon className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 rotate-90 text-ink-muted" />
          </div>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2.5" role="group" aria-label="Filter by category">
          {categories.map((cat) => {
            const active = category === cat.name;
            return (
              <button
                key={cat.name}
                type="button"
                onClick={() => setCategory(cat.name)}
                aria-pressed={active}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-all duration-300 ${
                  active
                    ? "border-forest bg-forest text-ivory shadow-soft"
                    : "border-forest/15 bg-ivory text-ink-muted hover:border-gold/50 hover:text-forest"
                }`}
              >
                {cat.name}
                <span className={active ? "text-gold-soft" : "text-forest/40"}>{cat.count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Result count */}
      <p className="mt-8 text-sm text-ink-muted" aria-live="polite">
        Showing <span className="font-semibold text-forest">{visible.length}</span> of {books.length} titles
      </p>

      {/* Book grid / empty state */}
      {visible.length === 0 ? (
        <div className="mt-8 rounded-3xl border border-forest/10 bg-cream p-12 text-center shadow-soft sm:p-16">
          <p className="font-display text-2xl italic text-forest sm:text-3xl">
            Nothing on this shelf yet
          </p>
          <p className="mt-3 text-sm text-ink-muted">
            No titles match your search. Try another word, or clear the filters to browse
            everything.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="font-display mt-7 inline-flex items-center rounded-full bg-forest px-6 py-3 text-sm font-semibold text-ivory shadow-soft transition-all duration-300 hover:bg-forest-deep hover:shadow-lift"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 md:gap-x-7 lg:grid-cols-6 xl:gap-x-8">
          {visible.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}
