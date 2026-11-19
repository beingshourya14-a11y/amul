/**
 * Stand-in Amul mark (sun arc, leaves, green hill) + serif wordmark.
 * Swap for the real logo file once supplied.
 */
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 40" className={cn("h-9 w-auto", className)} aria-hidden="true">
      {/* golden sun arc */}
      <path d="M8 30a16 16 0 0 1 32 0" fill="none" stroke="var(--gold)" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="24" cy="26" r="6" fill="var(--ghee)" />
      {/* leaves */}
      <path d="M24 8c-3 2-4 5-2 8 3-1 4-5 2-8z" fill="var(--success)" />
      <path d="M24 8c3 2 4 5 2 8-3-1-4-5-2-8z" fill="var(--teal)" />
      {/* green hill */}
      <path d="M2 38c8-8 18-10 24-8s14 4 20 8z" fill="var(--success)" />
    </svg>
  );
}

export function Logo({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  return (
    <Link to="/" className={cn("group flex items-center gap-2", className)} aria-label="Amul home">
      <LogoMark />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-serif text-2xl font-bold tracking-tight",
            tone === "light" ? "text-forest-foreground" : "text-forest",
          )}
        >
          Amul<sup className="ml-0.5 align-super text-[0.5em] font-normal">™</sup>
        </span>
        <span className={cn("mt-1 text-[0.6rem] uppercase tracking-[0.2em]", tone === "light" ? "text-gold-light" : "text-gold")}>
          The Taste of India
        </span>
      </span>
    </Link>
  );
}
