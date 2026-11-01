import { reviews } from "@/lib/data";
import { SectionHeading } from "@/components/section-heading";
import { Stars } from "@/components/stars";
import { QuoteIcon } from "@/components/icons";

export function ReaderReviews() {
  return (
    <section id="reviews" className="scroll-mt-24 bg-ivory py-20 sm:py-28">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Reader Reviews"
          title="Loved by readers of every kind"
          highlight="every kind"
          align="center"
          description="A few words from the members who make the Nook hum — writers, night-owls, parents and slow-page dreamers."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {reviews.map((review) => (
            <figure
              key={review.name}
              className="group relative flex h-full flex-col rounded-3xl border border-forest/10 bg-cream p-8 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-lift"
            >
              <QuoteIcon className="h-8 w-8 text-gold-soft transition-colors duration-300 group-hover:text-gold" />
              <blockquote className="font-display mt-5 flex-1 text-[1.1rem] italic leading-relaxed text-ink">
                “{review.quote}”
              </blockquote>
              <figcaption className="mt-7 flex items-center gap-4 border-t border-forest/10 pt-6">
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-forest font-display text-lg font-semibold text-ivory">
                  {review.initials}
                </span>
                <span className="flex flex-col gap-0.5">
                  <span className="text-sm font-semibold text-forest">{review.name}</span>
                  <span className="text-xs text-ink-muted">{review.role}</span>
                  <Stars rating={review.rating} className="mt-1" />
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
