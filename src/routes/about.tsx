import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Flame, Filter, Leaf, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ClaimBadge } from "@/components/site/ClaimBadge";
import { SectionHeading } from "@/components/site/SectionHeading";
import kitchenImage from "@/assets/ghee_4_all_jars_group_4k.png";
import { PACKAGING_CLAIMS } from "@/lib/catalog";
import { OG_IMAGE_URL } from "@/lib/config";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — Sri Parvathi Ghee" },
      {
        name: "description",
        content: "Sri Parvathi Ghee — 100% pure, traditional, homemade cow ghee crafted with care.",
      },
      { property: "og:title", content: "Our Story — Sri Parvathi Ghee" },
      { property: "og:description", content: "100% Pure · Traditional · Homemade cow ghee." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: OG_IMAGE_URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: OG_IMAGE_URL },
    ],
  }),
  component: About,
});

const HOW_STEPS = [
  { num: "01", icon: Leaf,    title: "Quality Sourcing",  body: "We start with carefully selected, wholesome ingredients — fresh cow butter sourced from trusted dairy farmers who share our values." },
  { num: "02", icon: Filter,  title: "Traditional Method", body: "Made the time-honoured way with no shortcuts. The butter is gently separated and clarified using the traditional Indian process." },
  { num: "03", icon: Flame,   title: "Slow Heating",       body: "Gently cooked on low heat until it turns golden, releasing that rich, unmistakable aroma that only authentic ghee can have." },
  { num: "04", icon: Package, title: "Pure and Packed",    body: "Filtered, cooled, and sealed in glass jars with care. No added preservatives — just pure ghee, as nature intended." },
];

function About() {
  return (
    <>
      <section className="bg-hero py-16 md:py-24">
        <div className="container-brand max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-forest">100% Pure · Traditional · Homemade</p>
          <h1 className="mt-4 text-4xl font-extrabold text-forest md:text-6xl">The Goodness of Pure Cow Milk</h1>
          <p className="mt-4 font-script text-3xl text-teal-dark md:text-4xl">The Goodness of Pure Cow Milk</p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-brand grid items-center gap-10 md:grid-cols-2">
          <img
            src={kitchenImage}
            alt="Golden ghee in a brass bowl in a traditional kitchen"
            loading="lazy"
            className="aspect-[4/3] w-full rounded-2xl object-cover shadow-lift"
          />
          <div className="flex flex-col items-start gap-5">
            <SectionHeading align="left" title="Pure • Natural • Traditional" />
            <p className="text-muted-foreground">
              Sri Parvathi Ghee brings you pure, traditional, homemade cow ghee — crafted the old way,
              with no added preservatives, delivered in a glass jar with a gold lid.
            </p>
            <p className="text-muted-foreground">
              We keep our promise simple and print it on every jar, so you always know exactly what you're
              getting.
            </p>
            <div className="flex flex-wrap gap-2">
              {PACKAGING_CLAIMS.map((c) => (
                <ClaimBadge key={c} label={c} />
              ))}
            </div>
            <Button variant="cta" size="xl" asChild>
              <Link to="/shop">
                Shop Sri Parvathi Ghee <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It's Made */}
      <section className="bg-cream py-16 md:py-24">
        <div className="container-brand">
          <SectionHeading
            eyebrow="Crafted with Care"
            title="How It's Made"
            subtitle="Four simple steps. No shortcuts, no additives — just the same process our grandmothers trusted."
          />
          <div className="mt-12 relative">
            <div className="hidden md:block absolute top-10 left-[calc(12.5%-1px)] right-[calc(12.5%-1px)] h-0.5 bg-gradient-to-r from-transparent via-gold/50 to-transparent" aria-hidden="true" />
            <ol className="grid gap-8 md:grid-cols-4 md:gap-6">
              {HOW_STEPS.map((step, i) => {
                const Icon = step.icon;
                return (
                  <li key={step.num} className="relative flex gap-5 md:flex-col md:items-center md:gap-4 md:text-center">
                    {i < HOW_STEPS.length - 1 && (
                      <div className="absolute left-6 top-16 bottom-[-2rem] w-0.5 bg-gradient-to-b from-gold/40 to-transparent md:hidden" aria-hidden="true" />
                    )}
                    <div className="relative shrink-0 flex size-12 items-center justify-center rounded-full border-2 border-gold/40 bg-cream-alt shadow-sm z-10">
                      <Icon className="size-5 text-forest" aria-hidden="true" />
                      <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-forest text-[0.55rem] font-bold text-forest-foreground">
                        {step.num}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-bold text-forest">{step.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{step.body}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
