import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ClaimBadge } from "@/components/site/ClaimBadge";
import { SectionHeading } from "@/components/site/SectionHeading";
import kitchenImage from "@/assets/ghee_4_all_jars_group_4k.png";
import { PACKAGING_CLAIMS } from "@/lib/catalog";

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
    </>
  );
}
