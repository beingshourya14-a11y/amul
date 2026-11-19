import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ClaimBadge } from "@/components/site/ClaimBadge";
import { SectionHeading } from "@/components/site/SectionHeading";
import kitchenImage from "@/assets/ghee-kitchen.jpg";
import { PACKAGING_CLAIMS } from "@/lib/catalog";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — Amul, The Taste of India" },
      {
        name: "description",
        content: "Amul carries a legacy of trust since 70+ years — pure, natural, traditional cow ghee.",
      },
      { property: "og:title", content: "Our Story — Amul, The Taste of India" },
      { property: "og:description", content: "A legacy of trust since 70+ years. Pure • Natural • Traditional." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <section className="bg-hero py-16 md:py-24">
        <div className="container-brand max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-forest">The Taste of India</p>
          <h1 className="mt-4 text-4xl font-extrabold text-forest md:text-6xl">A Legacy of Trust Since 70+ Years</h1>
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
              For more than seventy years, Amul has earned the trust of families. Amul brings that
              same trust to your kitchen in a glass jar with a gold lid — pure cow ghee with no added
              preservatives.
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
              Shop Amul Ghee <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
