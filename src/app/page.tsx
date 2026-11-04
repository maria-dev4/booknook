import { NewArrivals } from "@/components/new-arrivals";
import { HeroCarousel } from "@/components/hero-carousel";
import { HowBorrowingWorks } from "@/components/how-borrowing-works";
import { ReaderReviews } from "@/components/reader-reviews";
import { CtaBand } from "@/components/cta-band";

export default function Home() {
  return (
    <main className="flex-1">
      <HeroCarousel />
      <NewArrivals />
      <HowBorrowingWorks />
      <ReaderReviews />
      <CtaBand />
    </main>
  );
}
