import { StarIcon } from "@/components/icons";

export function Stars({ rating, className = "" }: { rating: number; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 ${className}`} aria-label={`Rated ${rating} out of 5`}>
      <span className="flex" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((i) => (
          <StarIcon
            key={i}
            className={`h-3.5 w-3.5 ${i <= Math.round(rating) ? "text-gold" : "text-forest/15"}`}
          />
        ))}
      </span>
      <span className="text-xs font-semibold text-ink-muted">{rating.toFixed(1)}</span>
    </span>
  );
}
