import Image from "next/image";
import { borrowingSteps } from "@/lib/data";
import { SectionHeading } from "@/components/section-heading";
import { BadgeIcon, BookmarkIcon, RepeatIcon, SearchIcon } from "@/components/icons";

const stepIcons = [SearchIcon, BookmarkIcon, BadgeIcon, RepeatIcon];

/** Gentle staircase indent for the step cards on desktop (editorial rhythm). */
const stepOffsets = ["lg:ml-0", "lg:ml-9", "lg:ml-[4.5rem]", "lg:ml-[6.75rem]"];

export function HowBorrowingWorks() {
  return (
    <section id="how-it-works" className="relative scroll-mt-24 overflow-x-clip bg-ivory-deep py-20 sm:py-28">
      {/* Soft gold glow washing the upper half of the section */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[26rem] w-[44rem] -translate-x-1/2 rounded-full bg-gold/10 blur-3xl"
      />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        {/* Left — editorial image composition */}
        <div>
          <SectionHeading
            eyebrow="The BookNook Method"
            title="Borrowing, made beautifully simple"
            highlight="simply"
            description="No queues, no paperwork, no due-date dread. A library ritual refined into four calm steps."
          />

          <div className="relative mt-12 pb-12 lg:mt-14">
            {/* Rotated gold frame grounding the composition */}
            <div
              aria-hidden="true"
              className="absolute -inset-3 -rotate-2 rounded-[2.5rem] border border-gold/30 bg-gold/5 sm:-inset-4"
            />
            {/* Warm gold orb tucked behind the image's top edge */}
            <div
              aria-hidden="true"
              className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-gold/20 blur-3xl"
            />

            {/* Main reading-room photograph */}
            <div className="relative overflow-hidden rounded-[2rem] shadow-card ring-1 ring-gold/20">
              <Image
                src="/hero/hero-1.jpg"
                alt="Inside the BookNook reading room, shelves of glowing books"
                width={1920}
                height={1126}
                sizes="(max-width: 640px) 92vw, (max-width: 1024px) 60vw, 480px"
                className="h-64 w-full object-cover sm:h-80 lg:h-[23rem]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/60 via-transparent to-transparent" />
            </div>

            {/* Floating secondary snapshot — an open book */}
            <div className="absolute -top-8 right-6 hidden rotate-2 overflow-hidden rounded-2xl border-[6px] border-cream shadow-lift transition-transform duration-300 hover:rotate-0 sm:block">
              <Image
                src="/hero/hero-open-book.jpg"
                alt="An open book resting on a sunlit reading table"
                width={400}
                height={500}
                sizes="120px"
                className="h-32 w-24 object-cover sm:h-40 sm:w-28"
              />
            </div>

            {/* Floating reader quote card */}
            <figure className="absolute -bottom-3 left-4 max-w-[17rem] rounded-2xl border border-gold/25 bg-cream/95 px-5 py-4 shadow-lift backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1 sm:left-8 lg:-left-6">
              <blockquote className="font-display text-sm italic leading-relaxed text-forest">
                “A not-so-secret nook for the city’s devoted readers.”
              </blockquote>
            </figure>
          </div>
        </div>

        {/* Right — borrowing steps as layered editorial cards */}
        <ol className="relative flex flex-col gap-5 lg:gap-7">
          {borrowingSteps.map((step, index) => {
            const Icon = stepIcons[index];
            return (
              <li
                key={step.number}
                className={`group relative flex gap-5 rounded-3xl border border-forest/10 bg-cream p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-lift sm:gap-6 sm:p-7 ${stepOffsets[index]}`}
              >
                <div className="flex flex-col items-center">
                  <span className="font-display text-2xl font-semibold text-gold transition-colors duration-300 group-hover:text-forest sm:text-3xl">
                    {step.number}
                  </span>
                  {index < borrowingSteps.length - 1 ? (
                    <span className="mt-3 h-full w-px flex-1 bg-gradient-to-b from-gold/50 to-transparent" />
                  ) : null}
                </div>
                <div>
                  <div className="flex items-center gap-3.5">
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-forest text-ivory shadow-soft transition-all duration-300 group-hover:bg-forest-deep group-hover:shadow-lift">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="font-display text-xl font-semibold text-forest sm:text-[1.35rem]">
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
