import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  action,
  align = "left",
  tone = "default",
}: {
  eyebrow: string;
  title: string;
  highlight?: string;
  description?: string;
  action?: ReactNode;
  align?: "left" | "center";
  tone?: "default" | "inverted";
}) {
  const accent = tone === "inverted" ? "text-gold-soft" : "text-gold";
  const muted = tone === "inverted" ? "text-ivory/60" : "text-ink-muted";

  return (
    <div
      className={`flex flex-col gap-6 ${
        align === "center"
          ? "items-center text-center"
          : "sm:flex-row sm:items-end sm:justify-between"
      }`}
    >
      <div className={align === "center" ? "max-w-2xl" : "max-w-2xl"}>
        <p
          className={`text-xs font-semibold uppercase tracking-[0.3em] ${accent}`}
        >
          {eyebrow}
        </p>
        <h2
          className={`font-display mt-3 text-3xl font-semibold leading-[1.15] sm:text-4xl lg:text-[2.8rem] ${
            tone === "inverted" ? "text-ivory" : "text-forest"
          }`}
        >
          {highlight && title.includes(highlight) ? (
            <>
              {title.split(highlight)[0]}
              <span className={`italic ${tone === "inverted" ? "text-gold-soft" : "text-gold"}`}>
                {highlight}
              </span>
              {title.split(highlight)[1]}
            </>
          ) : (
            title
          )}
        </h2>
        {description ? (
          <p className={`mt-4 text-base leading-relaxed ${muted}`}>{description}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
