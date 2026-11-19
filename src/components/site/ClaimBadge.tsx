import { Leaf } from "lucide-react";
import { cn } from "@/lib/utils";
import { VegMark } from "./VegMark";

/** Pill badge — teal tint, deep green text. Use only for packaging claims. */
export function ClaimBadge({ label, className }: { label: string; className?: string }) {
  const isVeg = label.toLowerCase().includes("vegetarian");
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full bg-teal-light px-3 py-1 text-xs font-semibold text-forest",
        className,
      )}
    >
      {isVeg ? <VegMark className="size-3.5" /> : <Leaf className="size-3.5 text-success" aria-hidden="true" />}
      {label}
    </span>
  );
}
