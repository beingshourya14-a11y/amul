/**
 * Sri Parvathi Ghee logo mark — circular gold badge with fleur-de-lis and serif wordmark.
 * Inspired by the product label: dark green + gold palette.
 */
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 56 56" className={cn("h-8 w-auto sm:h-11", className)} aria-hidden="true">
      {/* Outer gold ring */}
      <circle cx="28" cy="28" r="27" fill="var(--ghee)" stroke="var(--gold)" strokeWidth="1.5" />
      {/* Inner cream fill */}
      <circle cx="28" cy="28" r="23.5" fill="oklch(0.98 0.02 90)" />
      {/* Fleur-de-lis top ornament */}
      <path
        d="M28 7c0 0-2 2-2 4s2 3 2 3 2-1 2-3-2-4-2-4z"
        fill="var(--gold)"
      />
      <path d="M25 10c-2-1-4 0-4 2s2 2 4 1z" fill="var(--gold)" />
      <path d="M31 10c2-1 4 0 4 2s-2 2-4 1z" fill="var(--gold)" />
      {/* "Sri Parvathi" in dark green */}
      <text
        x="28"
        y="27"
        textAnchor="middle"
        fontFamily="'Playfair Display', Georgia, serif"
        fontWeight="700"
        fontSize="7"
        fill="#1B4D2E"
        letterSpacing="0.3"
      >
        Sri Parvathi
      </text>
      {/* "GHEE" in gold */}
      <text
        x="28"
        y="35"
        textAnchor="middle"
        fontFamily="'Playfair Display', Georgia, serif"
        fontWeight="800"
        fontSize="8.5"
        fill="var(--gold)"
        letterSpacing="2"
      >
        GHEE
      </text>
      {/* Gold ghee drop */}
      <ellipse cx="28" cy="39" rx="1.2" ry="1.8" fill="var(--gold)" />
      {/* Bottom green banner arc */}
      <path d="M10 46 Q28 54 46 46" fill="#1B4D2E" />
      <text
        x="28"
        y="51"
        textAnchor="middle"
        fontFamily="'Inter', sans-serif"
        fontWeight="600"
        fontSize="4"
        fill="var(--ghee)"
        letterSpacing="0.5"
      >
        100% PURE
      </text>
    </svg>
  );
}

export function Logo({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  return (
    <Link to="/" className={cn("group flex items-center gap-2", className)} aria-label="Sri Parvathi Ghee home">
      <LogoMark />
      <span className="hidden sm:flex flex-col leading-none">
        <span
          className={cn(
            "font-serif text-xl font-bold tracking-tight leading-tight",
            tone === "light" ? "text-forest-foreground" : "text-forest",
          )}
        >
          Sri Parvathi<br />
          <span className={cn("text-sm font-extrabold tracking-[0.15em]", tone === "light" ? "text-gold-light" : "text-gold")}>
            GHEE
          </span>
        </span>
        <span className={cn("mt-1 text-[0.6rem] uppercase tracking-[0.2em]", tone === "light" ? "text-gold-light/80" : "text-gold/80")}>
          100% Pure · Traditional
        </span>
      </span>
    </Link>
  );
}
