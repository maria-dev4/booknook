import type { Metadata } from "next";
import { newArrivals } from "@/lib/data";
import { BookCard } from "@/components/book-card";
import { SectionHeading } from "@/components/section-heading";
import { CtaBand } from "@/components/cta-band";

export const metadata: Metadata = { title: "New Arrivals" };

export default function NewArrivalsPage() {
  return (
    <main className="flex-1">
      <section className="bg-ivory py-16 sm:py-24">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Fresh on the Shelves"
            title="New arrivals this month"
            highlight="this month"
            description="Six titles our curators can't stop talking about — reserved weekly, returned fast, loved always. Shelves are refreshed every Monday morning."
          />
          <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 md:gap-x-7 lg:grid-cols-6 xl:gap-x-8">
            {newArrivals.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </main>
  );
}
