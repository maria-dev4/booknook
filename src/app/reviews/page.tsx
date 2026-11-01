import type { Metadata } from "next";
import { ReaderReviews } from "@/components/reader-reviews";
import { CtaBand } from "@/components/cta-band";

export const metadata: Metadata = { title: "Reader Reviews" };

export default function ReviewsPage() {
  return (
    <main className="flex-1">
      <ReaderReviews />
      <CtaBand />
    </main>
  );
}
