import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { PopularList } from "@/components/popular-list";

export function PopularBooks() {
  return (
    <section className="bg-ivory-deep py-16 sm:py-24">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Community Favourites"
          title="The most borrowed books in the Nook"
          highlight="most borrowed"
          description="Ranked by member borrowing this season — re-drawn weekly, argued over daily."
          action={
            <Link
              href="/popular"
              className="inline-flex items-center rounded-full border border-forest/25 px-5 py-2.5 text-sm font-semibold text-forest transition-all duration-300 hover:bg-forest hover:text-ivory"
            >
              View the full chart
            </Link>
          }
        />
        <div className="mt-12">
          <PopularList />
        </div>
      </div>
    </section>
  );
}
