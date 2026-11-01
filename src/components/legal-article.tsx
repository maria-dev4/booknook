import Link from "next/link";
import { ChevronIcon } from "@/components/icons";

export function LegalArticle({
  eyebrow,
  title,
  updated,
  intro,
  sections,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  intro: string;
  sections: { heading: string; body: string }[];
}) {
  return (
    <main className="flex-1">
      <section className="bg-ivory py-16 sm:py-24">
        <div className="mx-auto w-full max-w-3xl px-5 sm:px-8">
          <nav aria-label="Breadcrumb" className="text-xs font-medium uppercase tracking-[0.18em] text-ink-muted">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="transition-colors hover:text-forest">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronIcon className="h-3 w-3" />
              </li>
              <li className="text-forest" aria-current="page">
                {title}
              </li>
            </ol>
          </nav>

          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            {eyebrow}
          </p>
          <h1 className="font-display mt-3 text-4xl font-semibold leading-[1.15] text-forest sm:text-5xl">
            {title}
          </h1>
          <p className="mt-2 text-sm text-ink-muted">{updated}</p>
          <p className="mt-6 text-base leading-relaxed text-ink-muted sm:text-lg">{intro}</p>

          <div className="mt-10 flex flex-col gap-8">
            {sections.map((section) => (
              <div key={section.heading} className="rounded-3xl border border-forest/10 bg-cream p-7 shadow-soft sm:p-8">
                <h2 className="font-display text-xl font-semibold text-forest sm:text-2xl">
                  {section.heading}
                </h2>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-muted">
                  {section.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
