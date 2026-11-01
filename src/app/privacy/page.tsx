import type { Metadata } from "next";
import { LegalArticle } from "@/components/legal-article";

export const metadata: Metadata = { title: "Privacy Policy" };

const sections = [
  {
    heading: "What we keep",
    body: "To run the library we store only the essentials: your name, contact details, borrowing history and shelf reservations. We never sell, trade or share member data with advertisers — reading habits belong to the reader.",
  },
  {
    heading: "How we use it",
    body: "Your information is used to hold and renew reservations, calculate loan periods, and — only if you opt in — send the monthly Nook Letter. Every email includes a one-tap unsubscribe.",
  },
  {
    heading: "Cookies & analytics",
    body: "The BookNook app uses a small number of functional cookies to remember your reading shelf between visits. We use privacy-friendly, aggregated analytics to understand which shelves our members love, without tracking individual people.",
  },
  {
    heading: "Your rights",
    body: "You may request a copy of your data, correct it, or ask us to delete your account entirely at any time by writing to hello@booknook.club. We respond to every request within 14 days.",
  },
];

export default function PrivacyPage() {
  return (
    <LegalArticle
      eyebrow="Legal"
      title="Privacy Policy"
      updated="Last updated · 1 March 2026"
      intro="BookNook is a quiet place. Our privacy approach is equally considerate — the minimum data, maximum respect."
      sections={sections}
    />
  );
}
