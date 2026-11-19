import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-3", align === "center" ? "items-center text-center" : "items-start", className)}>
      {eyebrow && <span className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-dark">{eyebrow}</span>}
      <h2 className="text-3xl font-bold text-forest md:text-4xl">{title}</h2>
      <span className="gold-rule" aria-hidden="true" />
      {subtitle && <p className="max-w-2xl text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
