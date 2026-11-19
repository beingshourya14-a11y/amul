import { cn } from "@/lib/utils";

/** Indian vegetarian symbol: green dot in a green square. */
export function VegMark({ className }: { className?: string }) {
  return (
    <span
      role="img"
      aria-label="Vegetarian"
      className={cn("inline-flex size-4 items-center justify-center rounded-[3px] border-2 border-veg", className)}
    >
      <span className="size-1.5 rounded-full bg-veg" />
    </span>
  );
}
