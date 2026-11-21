import { Star, Quote, BadgeCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Review {
  name: string;
  city: string;
  rating: number; // 1-5
  product: string;
  text: string;
}

export function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="card-brand flex flex-col gap-3 p-5">
      <Quote className="size-6 text-gold opacity-60" aria-hidden="true" />
      <p className="flex-1 text-sm text-muted-foreground leading-relaxed">{review.text}</p>

      {/* Rating stars */}
      <div className="flex gap-0.5" aria-label={`${review.rating} out of 5 stars`}>
        {[1, 2, 3, 4, 5].map((s) => (
          <Star
            key={s}
            className={cn(
              "size-3.5",
              s <= review.rating ? "fill-gold text-gold" : "text-muted-foreground/30",
            )}
          />
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center gap-2 border-t pt-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-forest text-xs font-bold text-forest-foreground">
          {review.name[0]}
        </span>
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <p className="text-sm font-semibold text-forest truncate">{review.name}</p>
            <BadgeCheck className="size-3.5 shrink-0 text-success" aria-label="Verified Buyer" />
          </div>
          <p className="text-xs text-muted-foreground">
            {review.city} · {review.product}
          </p>
        </div>
      </div>
    </div>
  );
}
