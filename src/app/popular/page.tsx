import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";
import { PopularList } from "@/components/popular-list";
import { CtaBand } from "@/components/cta-band";

export const metadata: Metadata = { title: "Popular Books" };

export default function PopularPage() {
  return (
    <main className="flex-1">
      <section className="scroll-mt-24 bg-ivory-deep py-16 sm:py-24">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Community Favourites"
            title="The most borrowed books in the Nook"
            highlight="most borrowed"
            description="Ranked by member borrowing this season — re-drawn weekly, argued over daily."
          />
          <div className="mt-12">
            <PopularList />
          </div>
        </div>
      </section>
      <CtaBand />
    </main>
  );
}
