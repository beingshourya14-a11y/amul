import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Award, Droplets, Leaf, ShieldCheck, Sprout, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ClaimBadge } from "@/components/site/ClaimBadge";
import { HillDivider } from "@/components/site/HillDivider";
import { ProductCard } from "@/components/site/ProductCard";
import { SectionHeading } from "@/components/site/SectionHeading";
import jarImage from "@/assets/ghee-jar.jpg";
import kitchenImage from "@/assets/ghee-kitchen.jpg";
import { PACKAGING_CLAIMS, PRODUCTS } from "@/lib/catalog";
import { useReveal } from "@/lib/use-reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Amul Cow Ghee — The Goodness of Pure Cow Milk" },
      {
        name: "description",
        content:
          "Pure cow ghee with no added preservatives, from Amul. 500 ml and 1 L glass jars. Free shipping above ₹999, Cash on Delivery available.",
      },
      { property: "og:title", content: "Amul Cow Ghee — The Goodness of Pure Cow Milk" },
      {
        property: "og:description",
        content: "Pure • Natural • Traditional cow ghee. A legacy of trust since 70+ years, from Amul.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const TRUST = [
  { icon: Droplets, label: "Pure Cow Ghee" },
  { icon: ShieldCheck, label: "No Added Preservatives" },
  { icon: Sprout, label: "Rich in Natural Nutrients" },
  { icon: Award, label: "70+ Years of Trust" },
  { icon: Truck, label: "Fast Delivery" },
];

const WHY = [
  { icon: Droplets, title: "Pure Cow Ghee", text: "Made from the goodness of pure cow milk — nothing more." },
  { icon: ShieldCheck, title: "No Added Preservatives", text: "Just ghee, the way it has always been made at home." },
  { icon: Sprout, title: "Rich in Natural Nutrients", text: "The natural richness of cow milk ghee in every spoon." },
  { icon: Leaf, title: "100% Vegetarian", text: "Carries the green vegetarian mark on every jar." },
];

function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <WhyAmul />
      <Bestsellers />
      <StoryTeaser />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero">
      <div className="container-brand grid items-center gap-10 py-14 md:grid-cols-2 md:py-20 lg:py-24">
        <div className="relative z-10 flex flex-col items-start gap-6">
          <span className="rounded-full border border-forest/20 bg-cream-alt/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-forest">
            Pure • Natural • Traditional
          </span>
          <h1 className="text-4xl font-extrabold leading-[1.05] text-forest sm:text-5xl md:text-6xl lg:text-7xl">
            The Goodness of
            <span className="mt-2 block font-script text-5xl font-bold text-teal-dark sm:text-6xl md:text-7xl lg:text-8xl">
              Pure Cow Milk
            </span>
          </h1>
          <p className="max-w-md text-lg text-forest/85">
            Golden cow ghee in a glass jar, from a name families have trusted for over seventy years —
            Amul.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button variant="cta" size="xl" asChild>
              <Link to="/shop">
                Shop Now <ArrowRight />
              </Link>
            </Button>
            <Button variant="forestOutline" size="xl" asChild>
              <Link to="/about">Our Story</Link>
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {PACKAGING_CLAIMS.map((c) => (
              <ClaimBadge key={c} label={c} className="bg-cream-alt" />
            ))}
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          {/* gold sun arc echoing the logo */}
          <div className="absolute aspect-square w-[105%] max-w-[34rem] rounded-full bg-sun" aria-hidden="true" />
          <div className="relative rounded-full border-[3px] border-gold-light p-3 md:p-4">
            <img
              src={jarImage}
              alt="Amul Cow Ghee 500 ml glass jar with gold lid"
              width={560}
              height={560}
              className="animate-float-soft aspect-square w-64 rounded-full object-cover shadow-lift sm:w-80 md:w-96"
            />
          </div>
        </div>
      </div>
      <HillDivider className="-mb-px text-cream" />
    </section>
  );
}

function TrustStrip() {
  return (
    <section aria-label="Why customers trust Amul" className="bg-cream">
      <div className="container-brand">
        <ul className="grid grid-cols-2 gap-4 py-8 sm:grid-cols-3 lg:grid-cols-5">
          {TRUST.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-3">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-card text-forest">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <span className="text-sm font-semibold text-forest">{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function WhyAmul() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="bg-card py-16 md:py-24">
      <div ref={ref} className="reveal container-brand">
        <SectionHeading eyebrow="Why Amul" title="Simple, honest ghee" subtitle="Everything we promise is printed right on the jar." />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {WHY.map(({ icon: Icon, title, text }) => (
            <div key={title} className="card-brand p-6">
              <span className="flex size-12 items-center justify-center rounded-xl bg-teal-light text-forest">
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-xl font-bold text-forest">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Bestsellers() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="bg-teal-light/50 py-16 md:py-24">
      <div ref={ref} className="reveal container-brand">
        <SectionHeading eyebrow="Shop" title="Choose your jar" subtitle="Two sizes, the same pure cow ghee. Prices include GST." />
        <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
          {PRODUCTS.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StoryTeaser() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="bg-cream py-16 md:py-24">
      <div ref={ref} className="reveal container-brand grid items-center gap-10 md:grid-cols-2">
        <img
          src={kitchenImage}
          alt="A brass bowl of golden ghee beside fresh rotis"
          loading="lazy"
          width={1312}
          height={1199}
          className="aspect-[4/3] w-full rounded-2xl object-cover shadow-lift"
        />
        <div className="flex flex-col items-start gap-5">
          <SectionHeading align="left" eyebrow="From Amul" title="A legacy of trust since 70+ years" />
          <p className="font-script text-3xl text-teal-dark">From our house to yours</p>
          <p className="text-muted-foreground">
            Amul carries forward a name families have relied on for more than seven decades. Every jar is
            filled with the same care — pure cow ghee, no added preservatives, made to bring traditional
            goodness to your everyday cooking.
          </p>
          <Button variant="forestOutline" asChild>
            <Link to="/about">
              Read our story <ArrowRight />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
