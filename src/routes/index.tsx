import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Award, Droplets, Quote, ShieldCheck, Sprout, Star, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ClaimBadge } from "@/components/site/ClaimBadge";
import { HillDivider } from "@/components/site/HillDivider";
import { ProductCard } from "@/components/site/ProductCard";
import { SectionHeading } from "@/components/site/SectionHeading";
import jarImage from "@/assets/ghee_4_all_jars_group_4k.png";
import aboutImage from "@/assets/ghee_2_small_jar_4k.png";
import { PACKAGING_CLAIMS, PRODUCTS } from "@/lib/catalog";
import { useReveal } from "@/lib/use-reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sri Parvathi Cow Ghee — 100% Pure · Traditional · Homemade" },
      {
        name: "description",
        content:
          "Pure cow ghee with no added preservatives, from Sri Parvathi Ghee. Available in multiple sizes. Free shipping above ₹999, Cash on Delivery available.",
      },
      { property: "og:title", content: "Sri Parvathi Cow Ghee — 100% Pure · Traditional · Homemade" },
      { property: "og:description", content: "100% Pure · Traditional · Homemade cow ghee." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

/* ── Data ── */

const TRUST = [
  { icon: Droplets,    label: "Pure Cow Ghee"             },
  { icon: ShieldCheck, label: "No Added Preservatives"    },
  { icon: Sprout,      label: "Rich in Natural Nutrients" },
  { icon: Award,       label: "Trusted Since Decades"     },
  { icon: Truck,       label: "Fast Delivery"             },
];

const STATS = [
  { value: "99.8%", label: "Pure Fat Content"    },
  { value: "0%",    label: "Added Preservatives" },
  { value: "6mo",   label: "Shelf Life"          },
  { value: "100%",  label: "Vegetarian"          },
];

const TESTIMONIALS = [
  {
    name: "Priya S.",
    location: "Chennai",
    rating: 5,
    text: "The aroma when you open the jar is incredible — exactly like homemade ghee from my grandmother's kitchen. We've switched completely.",
  },
  {
    name: "Rajan M.",
    location: "Bangalore",
    rating: 5,
    text: "Best ghee I've had in years. No strange aftertaste, pure golden colour, and the kids love it on their rotis.",
  },
  {
    name: "Deepa K.",
    location: "Hyderabad",
    rating: 5,
    text: "Ordered for Diwali sweets and everyone kept asking where I bought the ghee. Fast delivery too!",
  },
  {
    name: "Suresh P.",
    location: "Coimbatore",
    rating: 5,
    text: "Genuine product, no compromise on quality. The 1L jar is great value. Will definitely order again.",
  },
];

/* ── Page ── */

function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <BenefitsSection />
      <AboutSection />
      <Bestsellers />
      <ReviewsSection />
      <SuggestedProducts />
    </>
  );
}

/* ── Hero ── */

function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero">
      <div className="container-brand grid items-center gap-10 py-14 md:grid-cols-2 md:py-20 lg:py-28">
        <div className="relative z-10 flex flex-col items-start gap-6">
          <span className="flex items-center gap-2 rounded-full border border-forest/20 bg-white/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-forest backdrop-blur-sm">
            <span className="size-1.5 rounded-full bg-success" />
            100% Pure · Traditional · Homemade
          </span>

          <h1 className="text-4xl font-bold leading-[1.08] text-forest sm:text-5xl md:text-6xl lg:text-7xl">
            The Goodness of
            <span className="mt-1 block font-script text-5xl text-teal-dark sm:text-6xl md:text-7xl lg:text-8xl">
              Pure Cow Milk
            </span>
          </h1>

          <p className="max-w-md text-base leading-relaxed text-forest/80 md:text-lg">
            Crafted the traditional way. No shortcuts, no additives — just pure cow ghee
            with the aroma and richness your kitchen deserves.
          </p>

          <div className="flex flex-wrap gap-3">
            <Button variant="cta" size="xl" asChild>
              <Link to="/shop">Shop Now <ArrowRight className="size-4" /></Link>
            </Button>
            <Button variant="forestOutline" size="xl" asChild>
              <Link to="/about">Our Story</Link>
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {PACKAGING_CLAIMS.map((c) => (
              <ClaimBadge key={c} label={c} className="bg-white/70 backdrop-blur-sm" />
            ))}
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="absolute aspect-square w-[110%] max-w-[36rem] rounded-full bg-sun opacity-70" aria-hidden="true" />
          <div className="relative rounded-3xl border-2 border-gold/40 bg-white/60 p-5 shadow-[0_8px_48px_-12px_color-mix(in_oklab,var(--forest)_25%,transparent)] backdrop-blur-sm md:p-7">
            <img
              src={jarImage}
              alt="Sri Parvathi Cow Ghee jars"
              width={560}
              height={560}
              className="animate-float-soft w-64 object-contain sm:w-80 md:w-96"
            />
          </div>
        </div>
      </div>
      <HillDivider className="-mb-px text-cream" />
    </section>
  );
}

/* ── Trust strip ── */

function TrustStrip() {
  return (
    <section aria-label="Trust signals" className="bg-cream border-b border-gold/15">
      <div className="container-brand">
        <ul className="grid grid-cols-2 gap-x-4 gap-y-3 py-7 sm:grid-cols-3 lg:grid-cols-5">
          {TRUST.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-gold/8 text-forest shadow-sm">
                <Icon className="size-4.5" aria-hidden="true" />
              </span>
              <span className="text-sm font-medium text-forest/90">{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ── Benefits section ── */

function BenefitsSection() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="bg-benefits relative overflow-hidden py-20 md:py-32">

      {/* Ambient orbs */}
      <div
        className="pointer-events-none absolute -right-40 -top-40 h-[36rem] w-[36rem] rounded-full opacity-[0.07]"
        style={{ background: "radial-gradient(circle, var(--gold) 0%, transparent 70%)" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-32 -left-32 h-[28rem] w-[28rem] rounded-full opacity-[0.06]"
        style={{ background: "radial-gradient(circle, var(--teal) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div ref={ref} className="reveal container-brand relative z-10">

        {/* Heading */}
        <div className="flex flex-col items-center gap-5 text-center mb-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-5 py-2 text-[0.7rem] font-bold uppercase tracking-[0.25em] text-gold-light backdrop-blur-sm">
            <span className="size-1.5 rounded-full bg-gold-light animate-pulse" />
            Why Choose Sri Parvathi Ghee
          </span>

          <h2 className="font-serif text-4xl font-bold leading-tight text-white md:text-6xl">
            Nature's Purest Gift,
            <span className="block mt-1" style={{ color: "var(--gold-light)" }}>In Every Drop</span>
          </h2>

          <div className="flex items-center gap-3">
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-gold/50 to-gold/80" />
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 2l2.5 7.5H22l-6 4.5 2.5 7.5L12 17l-6.5 4.5L8 14 2 9.5h7.5z" fill="var(--gold)" fillOpacity="0.8" />
            </svg>
            <div className="h-px w-20 bg-gradient-to-l from-transparent via-gold/50 to-gold/80" />
          </div>

          <p className="max-w-2xl text-base leading-relaxed text-white/60 md:text-lg">
            Pure cow ghee is a centuries-old superfood — packed with nutrients, free from additives,
            and crafted with traditional care your family can taste.
          </p>
        </div>

        {/* Stats */}
        <div className="mb-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {STATS.map(({ value, label }) => (
            <div
              key={label}
              className="relative flex flex-col items-center overflow-hidden rounded-2xl border border-gold/25 px-5 py-7 text-center"
              style={{ background: "linear-gradient(145deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)" }}
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
              <span className="font-serif text-5xl font-bold tracking-tight text-gold-light md:text-6xl">{value}</span>
              <span className="mt-2 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/50">{label}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-5 text-center">
          <p className="font-script text-3xl text-gold-light/80 md:text-4xl">
            From our home to yours — pure, always.
          </p>
          <Button
            variant="cta"
            size="xl"
            asChild
            className="px-10 text-base font-bold shadow-[0_6px_32px_-4px_color-mix(in_oklab,var(--ghee)_55%,transparent)] transition-shadow hover:shadow-[0_8px_40px_-4px_color-mix(in_oklab,var(--ghee)_70%,transparent)]"
          >
            <Link to="/shop">
              Shop Sri Parvathi Ghee <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

      </div>
    </section>
  );
}

/* ── About section ── */

function AboutSection() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="bg-cream py-16 md:py-24">
      <div ref={ref} className="reveal container-brand grid items-center gap-10 md:grid-cols-2">

        {/* Image side */}
        <div className="relative order-2 md:order-1">
          <img
            src={aboutImage}
            alt="Sri Parvathi Ghee jar"
            loading="lazy"
            width={800}
            height={900}
            className="w-full max-h-[480px] rounded-3xl object-contain shadow-lift"
          />
          {/* Floating badge */}
          <div className="absolute -right-3 -top-3 rounded-2xl bg-forest px-4 py-3 text-center shadow-lift md:-right-5 md:-top-5">
            <p className="font-serif text-2xl font-bold text-gold-light">100%</p>
            <p className="text-[0.6rem] font-semibold uppercase tracking-widest text-forest-foreground/80">Pure</p>
          </div>
        </div>

        {/* Content side */}
        <div className="order-1 md:order-2 flex flex-col items-start gap-5">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-dark">Our Story</span>
          <h2 className="font-serif text-3xl font-bold leading-tight text-forest md:text-4xl">
            Pure · Traditional ·{" "}
            <span className="text-teal-dark">Homemade</span>
          </h2>
          <p className="font-script text-2xl text-teal-dark">From our home to yours</p>
          <p className="text-muted-foreground leading-relaxed">
            Sri Parvathi Ghee is made the traditional way — pure cow ghee, no added preservatives,
            crafted with care to bring homemade goodness to your everyday cooking.
            Every jar carries our promise: nothing artificial, ever.
          </p>
          <div className="flex flex-wrap gap-2">
            {PACKAGING_CLAIMS.map((c) => <ClaimBadge key={c} label={c} />)}
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="cta" size="lg" asChild>
              <Link to="/shop">Shop Now <ArrowRight className="size-4" /></Link>
            </Button>
            <Button variant="forestOutline" size="lg" asChild>
              <Link to="/about">Read Our Story <ArrowRight className="size-4" /></Link>
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
}

/* ── Bestsellers ── */

function Bestsellers() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="bg-ivory py-16 md:py-24">
      <div ref={ref} className="reveal container-brand">
        <SectionHeading
          eyebrow="Shop"
          title="Choose Your Jar"
          subtitle="Every size, the same 100% pure Sri Parvathi cow ghee. Prices include GST."
        />
        <div className="mx-auto mt-12 grid max-w-5xl gap-4 grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Reviews ── */

function ReviewsSection() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="bg-cream py-16 md:py-24">
      <div ref={ref} className="reveal container-brand">
        <SectionHeading
          eyebrow="Customer Reviews"
          title="What Our Customers Say"
          subtitle="Thousands of families trust Sri Parvathi Ghee every day."
        />

        {/* Rating bar */}
        <div className="mx-auto mt-8 mb-10 flex max-w-xs flex-col items-center gap-2">
          <span className="font-serif text-6xl font-bold text-forest">5.0</span>
          <div className="flex gap-1">
            {[1,2,3,4,5].map((s) => <Star key={s} className="size-5 fill-gold text-gold" />)}
          </div>
          <span className="text-sm text-muted-foreground">Based on 200+ verified purchases</span>
        </div>

        {/* Cards grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TESTIMONIALS.map((r) => (
            <div
              key={r.name}
              className="card-brand flex flex-col gap-3 p-5"
            >
              <Quote className="size-6 text-gold opacity-60" aria-hidden="true" />
              <p className="flex-1 text-sm text-muted-foreground leading-relaxed">{r.text}</p>
              <div className="flex items-center gap-2 border-t pt-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-forest text-xs font-bold text-forest-foreground">
                  {r.name[0]}
                </span>
                <div>
                  <p className="text-sm font-semibold text-forest">{r.name}</p>
                  <p className="text-xs text-muted-foreground">{r.location}</p>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {[1,2,3,4,5].map((s) => (
                    <Star key={s} className={`size-3 ${s <= r.rating ? "fill-gold text-gold" : "text-muted-foreground/30"}`} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Suggested Products ── */

function SuggestedProducts() {
  const ref = useReveal<HTMLDivElement>();
  // Show top 3 products as suggestions (excluding variety pack)
  const suggested = PRODUCTS.filter((p) => p.id !== "cow-ghee-multipack").slice(0, 3);
  return (
    <section className="bg-ivory py-16 md:py-24">
      <div ref={ref} className="reveal container-brand">
        <SectionHeading
          eyebrow="You May Also Like"
          title="Popular Picks"
          subtitle="Our customers' most loved jars — same pure ghee, every size."
        />
        <div className="mx-auto mt-10 grid max-w-3xl gap-5 grid-cols-1 sm:grid-cols-3">
          {suggested.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Button variant="forestOutline" size="lg" asChild>
            <Link to="/shop">View All Products <ArrowRight className="size-4" /></Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
