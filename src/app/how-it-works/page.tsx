import type { Metadata } from "next";
import { HowBorrowingWorks } from "@/components/how-borrowing-works";
import { CtaBand } from "@/components/cta-band";

export const metadata: Metadata = { title: "How Borrowing Works" };

export default function HowItWorksPage() {
  return (
    <main className="flex-1">
      <HowBorrowingWorks />
      <CtaBand />
    </main>
  );
}
