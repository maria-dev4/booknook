import type { Metadata } from "next";
import { allBooks } from "@/lib/data";
import { SectionHeading } from "@/components/section-heading";
import { BooksExplorer } from "@/components/books-explorer";
import { CtaBand } from "@/components/cta-band";

export const metadata: Metadata = { title: "All Books" };

export default function BooksPage() {
  return (
    <main className="flex-1">
      <section className="bg-ivory py-16 sm:py-24">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="The Whole Collection"
            title="All books on our shelves"
            highlight="our shelves"
            description="Every title in the Nook, from sunlit fiction to midnight sci-fi. Search by name, filter by category, and sort the shelves your way."
          />
          <BooksExplorer books={allBooks} />
        </div>
      </section>
      <CtaBand />
    </main>
  );
}
