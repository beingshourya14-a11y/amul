import { cn } from "@/lib/utils";

/** Faint green hill curve used between sections. */
export function HillDivider({ className, flip }: { className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 1440 60"
      preserveAspectRatio="none"
      className={cn("block h-10 w-full md:h-14", flip && "rotate-180", className)}
      aria-hidden="true"
    >
      <path d="M0 60V35C240 5 480 0 720 20s480 35 720 5v35z" fill="currentColor" />
    </svg>
  );
}
