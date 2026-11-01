import { newArrivals } from "@/lib/data";
import { HeroCarousel } from "@/components/hero-carousel";
import { BookCard } from "@/components/book-card";
import { SectionHeading } from "@/components/section-heading";
import { PopularList } from "@/components/popular-list";
import { HowBorrowingWorks } from "@/components/how-borrowing-works";
import { ReaderReviews } from "@/components/reader-reviews";
import { CtaBand } from "@/components/cta-band";
import { ArrowIcon } from "@/components/icons";

export default function Home() {
  return (
    <main className="flex-1">
      <HeroCarousel />
      <NewArrivals />
      <PopularBooks />
      <HowBorrowingWorks />
      <ReaderReviews />
      <CtaBand />
    </main>
  );
}

function NewArrivals() {
  return (
    <section id="new-arrivals" className="scroll-mt-24 bg-ivory py-20 sm:py-28">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Fresh on the Shelves"
          title="New arrivals this month"
          highlight="this month"
          description="Six titles our curators can't stop talking about — reserved weekly, returned fast, loved always."
          action={
            <a
              href="/new-arrivals"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-forest transition-colors hover:text-gold"
            >
              View all arrivals
              <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          }
        />
        <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 md:gap-x-7 lg:grid-cols-6 xl:gap-x-8">
          {newArrivals.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PopularBooks() {
  return (
    <section id="popular" className="scroll-mt-24 bg-ivory-deep py-20 sm:py-28">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Community Favourites"
          title="The most borrowed books in the Nook"
          highlight="most borrowed"
          description="Ranked by member borrowing this season — re-drawn weekly, argued over daily."
          action={
            <a
              href="/popular"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-forest transition-colors hover:text-gold"
            >
              View the full ranking
              <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          }
        />

        <div className="mt-12">
          <PopularList />
        </div>
      </div>
    </section>
  );
}
