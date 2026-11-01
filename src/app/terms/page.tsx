import type { Metadata } from "next";
import { LegalArticle } from "@/components/legal-article";

export const metadata: Metadata = { title: "Terms of Service" };

const sections = [
  {
    heading: "Membership",
    body: "Becoming a BookNook member is free and open to everyone. Your membership card grants unlimited borrowing across the collection and is strictly personal to you.",
  },
  {
    heading: "Borrowing & loans",
    body: "Reservations are held for 48 hours at the pickup counter or locker. The standard loan is 21 days, renewable once, and there are no late fees — we ask only that lost or damaged copies be replaced at cost.",
  },
  {
    heading: "Care of the collection",
    body: "Books are shared treasures. We kindly ask members to treat them gently, keep them away from rain and paperwork, and return them on time so every reader gets their turn.",
  },
  {
    heading: "Fair use",
    body: "Content on this site — from blurbs to reading notes — is provided by our curators for personal, non-commercial use. Reproducing the full collection catalogue elsewhere is not permitted without written consent.",
  },
];

export default function TermsPage() {
  return (
    <LegalArticle
      eyebrow="Legal"
      title="Terms of Service"
      updated="Last updated · 1 March 2026"
      intro="The short version: be kind to books, to members, and to our librarians. The complete terms follow."
      sections={sections}
    />
  );
}
