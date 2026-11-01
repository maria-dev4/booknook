import Image from "next/image";
import { borrowingSteps } from "@/lib/data";
import { SectionHeading } from "@/components/section-heading";
import { BadgeIcon, BookmarkIcon, RepeatIcon, SearchIcon } from "@/components/icons";

const stepIcons = [SearchIcon, BookmarkIcon, BadgeIcon, RepeatIcon];

export function HowBorrowingWorks() {
  return (
    <section id="how-it-works" className="relative scroll-mt-24 bg-ivory-deep py-20 sm:py-28">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        {/* Visual + intro */}
        <div>
          <SectionHeading
            eyebrow="The BookNook Method"
            title="Borrowing, made beautifully simple"
            highlight="simply"
            description="No queues, no paperwork, no due-date dread. A library ritual refined into four calm steps."
          />
          <div className="relative mt-10 hidden overflow-hidden rounded-3xl shadow-card lg:block">
            <Image
              src="/hero/hero-1.jpg"
              alt="Inside the BookNook reading room, shelves of glowing books"
              width={1920}
              height={1126}
              sizes="(max-width: 1024px) 0px, 480px"
              className="h-64 w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/80 via-forest-deep/10 to-transparent" />
            <p className="font-display absolute bottom-5 left-6 z-10 max-w-xs text-lg italic leading-snug text-ivory">
              “A not-so-secret nook for the city’s devoted readers.”
            </p>
          </div>
        </div>

        {/* Steps */}
        <ol className="flex flex-col gap-5">
          {borrowingSteps.map((step, index) => {
            const Icon = stepIcons[index];
            return (
              <li
                key={step.number}
                className="group relative flex gap-5 rounded-3xl border border-forest/10 bg-cream p-6 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/40 hover:shadow-lift sm:gap-7 sm:p-7"
              >
                <div className="flex flex-col items-center">
                  <span className="font-display text-2xl font-semibold text-gold sm:text-3xl">
                    {step.number}
                  </span>
                  {index < borrowingSteps.length - 1 ? (
                    <span className="mt-3 h-full w-px flex-1 bg-gradient-to-b from-gold/50 to-transparent" />
                  ) : null}
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-forest text-ivory">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="font-display text-xl font-semibold text-forest">
                      {step.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-muted">
                    {step.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
