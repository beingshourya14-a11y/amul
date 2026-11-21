import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight, Award, BadgeCheck, CheckCircle2, Droplets, Filter,
  Quote, ShieldCheck, Sprout, Star, Truck, Flame, Package, Leaf,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ClaimBadge } from "@/components/site/ClaimBadge";
import { HillDivider } from "@/components/site/HillDivider";
import { ProductCard } from "@/components/site/ProductCard";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ReviewCard, type Review } from "@/components/site/ReviewCard";
import jarImage from "@/assets/ghee_4_all_jars_group_4k.png";
import aboutImage from "@/assets/ghee_2_small_jar_4k.png";
import { PACKAGING_CLAIMS, PRODUCTS } from "@/lib/catalog";
import { SHOW_DEMO_LABEL, OG_IMAGE_URL } from "@/lib/config";
import { useReveal } from "@/lib/use-reveal";
import { cn } from "@/lib/utils";

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
      { property: "og:image", content: OG_IMAGE_URL },
      { property: "og:url", content: "https://sriparvathighee.in" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: OG_IMAGE_URL },
    ],
  }),
  component: Home,
});

/* ── Static data ── */

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

const HOW_STEPS = [
  {
    num: "01",
    icon: Leaf,
    title: "Quality Sourcing",
    body: "We start with carefully selected, wholesome ingredients — fresh cow butter sourced from trusted dairy farmers who share our values.",
  },
  {
    num: "02",
    icon: Filter,
    title: "Traditional Method",
    body: "Made the time-honoured way with no shortcuts. The butter is gently separated and clarified using the traditional Indian process.",
  },
  {
    num: "03",
    icon: Flame,
    title: "Slow Heating",
    body: "Gently cooked on low heat until it turns golden, releasing that rich, unmistakable aroma that only authentic ghee can have.",
  },
  {
    num: "04",
    icon: Package,
    title: "Pure and Packed",
    body: "Filtered, cooled, and sealed in glass jars with care. No added preservatives — just pure ghee, as nature intended.",
  },
];

const REVIEWS: Review[] = [
  { name: "Priya S.",   city: "Chennai",    rating: 5, product: "500 ml",         text: "The aroma when you open the jar is incredible — exactly like the ghee my grandmother made. We've switched completely." },
  { name: "Rajan M.",   city: "Bangalore",  rating: 5, product: "1 L",            text: "No strange aftertaste and a lovely golden colour. My kids love it on hot rotis." },
  { name: "Deepa K.",   city: "Hyderabad",  rating: 5, product: "500 ml",         text: "Ordered for Diwali sweets and everyone asked where I bought the ghee. Delivery was quick too." },
  { name: "Suresh P.",  city: "Coimbatore", rating: 4, product: "1 L",            text: "Genuine quality and good value in the 1 L jar. Packaging was safe. Will order again." },
  { name: "Lakshmi N.", city: "Madurai",    rating: 5, product: "200 ml",         text: "Bought the small jar to try it. The taste is pure and rich — reordered the 500 ml within a week." },
  { name: "Karthik R.", city: "Coimbatore", rating: 4, product: "Variety Pack",   text: "Gave the variety pack as a festival gift and the family loved it. Would like more gift packaging options." },
  { name: "Anitha V.",  city: "Vijayawada", rating: 5, product: "500 ml Premium", text: "Smooth texture and a rich aroma. Perfect for pongal and sweets." },
  { name: "Mohan T.",   city: "Chennai",    rating: 5, product: "1 L",            text: "Tastes like the ghee from my village growing up. Totally worth it." },
];

const RATING_BARS: [number, number][] = [[5, 75], [4, 17], [3, 5], [2, 2], [1, 1]];

/* ── Page ── */

function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <BenefitsSection />
      <HowItsMade />
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

/* ── Benefits section — has id="benefits" for anchor nav ── */

function BenefitsSection() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="benefits" className="bg-benefits relative overflow-hidden py-20 md:py-32">

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

/* ── How It's Made ── */

function HowItsMade() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="bg-cream py-16 md:py-24">
      <div ref={ref} className="reveal container-brand">
        <SectionHeading
          eyebrow="Crafted with Care"
          title="How It's Made"
          subtitle="Four simple steps. No shortcuts, no additives — just the same process our grandmothers trusted."
        />

        {/* Vertical timeline on mobile, horizontal on desktop */}
        <div className="mt-12 relative">

          {/* Desktop connector line */}
          <div className="hidden md:block absolute top-10 left-[calc(12.5%-1px)] right-[calc(12.5%-1px)] h-0.5 bg-gradient-to-r from-transparent via-gold/50 to-transparent" aria-hidden="true" />

          <ol className="grid gap-8 md:grid-cols-4 md:gap-6">
            {HOW_STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <li key={step.num} className="relative flex gap-5 md:flex-col md:items-center md:gap-4 md:text-center">
                  {/* Mobile vertical line */}
                  {i < HOW_STEPS.length - 1 && (
                    <div className="absolute left-6 top-16 bottom-[-2rem] w-0.5 bg-gradient-to-b from-gold/40 to-transparent md:hidden" aria-hidden="true" />
                  )}

                  {/* Step icon circle */}
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
  );
}

/* ── About section ── */

function AboutSection() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="bg-ivory py-16 md:py-24">
      <div ref={ref} className="reveal container-brand grid items-center gap-10 md:grid-cols-2">

        <div className="relative order-2 md:order-1">
          <img
            src={aboutImage}
            alt="Sri Parvathi Ghee jar"
            loading="lazy"
            width={800}
            height={900}
            className="w-full max-h-[480px] rounded-3xl object-contain shadow-lift"
          />
          <div className="absolute -right-3 -top-3 rounded-2xl bg-forest px-4 py-3 text-center shadow-lift md:-right-5 md:-top-5">
            <p className="font-serif text-2xl font-bold text-gold-light">100%</p>
            <p className="text-[0.6rem] font-semibold uppercase tracking-widest text-forest-foreground/80">Pure</p>
          </div>
        </div>

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
    <section className="bg-cream py-16 md:py-24">
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
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", rating: "5", comment: "" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className="bg-ivory py-16 md:py-24">
      <div ref={ref} className="reveal container-brand">
        <SectionHeading
          eyebrow="Customer Reviews"
          title="What Our Customers Say"
          subtitle="Thousands of families trust Sri Parvathi Ghee every day."
        />

        {/* Rating summary */}
        <div className="mx-auto mt-8 mb-10 flex max-w-sm items-center gap-6 rounded-2xl border bg-card p-5 shadow-sm">
          <div className="flex flex-col items-center">
            <span className="font-serif text-6xl font-bold text-forest">4.8</span>
            <div className="mt-1 flex gap-0.5">
              {[1,2,3,4,5].map((s) => <Star key={s} className="size-4 fill-gold text-gold" />)}
            </div>
            <span className="mt-1 text-xs text-muted-foreground text-center">Based on 200+ reviews</span>
          </div>
          <div className="flex-1 flex flex-col gap-1.5">
            {RATING_BARS.map(([stars, pct]) => (
              <div key={stars} className="flex items-center gap-2">
                <span className="text-xs w-3 text-muted-foreground">{stars}</span>
                <Star className="size-3 fill-gold text-gold shrink-0" />
                <div className="flex-1 h-2 rounded-full bg-teal-light overflow-hidden">
                  <div className="h-full rounded-full bg-gold" style={{ width: `${pct}%` }} />
                </div>
                <span className="text-xs text-muted-foreground w-8 text-right">{pct}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: horizontal scroll carousel; md+: 3-col grid */}
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory md:grid md:grid-cols-3 md:overflow-visible md:pb-0">
          {REVIEWS.map((r) => (
            <div key={r.name} className="shrink-0 w-[85vw] snap-start sm:w-[65vw] md:w-auto">
              <ReviewCard review={r} />
            </div>
          ))}
        </div>

        {/* Demo label */}
        {SHOW_DEMO_LABEL && (
          <p className="mt-4 text-center text-xs text-muted-foreground">
            Sample reviews shown for demo purposes.
          </p>
        )}

        {/* Write a review */}
        <div className="mt-8 flex justify-center">
          {!showForm ? (
            <Button variant="forestOutline" className="min-h-[44px]" onClick={() => setShowForm(true)}>
              Write a Review
            </Button>
          ) : submitted ? (
            <div className="flex items-center gap-3 rounded-2xl border bg-card px-6 py-5 shadow-sm">
              <CheckCircle2 className="size-6 text-success shrink-0" />
              <p className="text-sm font-medium text-forest">Thank you! Your review has been submitted.</p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-md rounded-2xl border bg-card p-5 shadow-sm flex flex-col gap-4"
            >
              <h3 className="font-serif text-xl font-bold text-forest">Write a Review</h3>
              <div className="flex flex-col gap-1">
                <label htmlFor="rev-name" className="text-sm font-semibold text-forest">Your Name</label>
                <input
                  id="rev-name"
                  required
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="h-11 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-forest/40"
                  placeholder="e.g. Priya S."
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="rev-rating" className="text-sm font-semibold text-forest">Rating</label>
                <select
                  id="rev-rating"
                  value={form.rating}
                  onChange={(e) => setForm((f) => ({ ...f, rating: e.target.value }))}
                  className="h-11 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-forest/40"
                >
                  {[5,4,3,2,1].map((n) => (
                    <option key={n} value={n}>{n} star{n > 1 ? "s" : ""}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="rev-comment" className="text-sm font-semibold text-forest">Your Review</label>
                <textarea
                  id="rev-comment"
                  required
                  rows={3}
                  value={form.comment}
                  onChange={(e) => setForm((f) => ({ ...f, comment: e.target.value }))}
                  className="rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-forest/40 resize-none"
                  placeholder="Tell us what you thought…"
                />
              </div>
              <div className="flex gap-3">
                <Button type="submit" variant="cta" className="flex-1 min-h-[44px]">Submit Review</Button>
                <Button type="button" variant="forestOutline" className="min-h-[44px]" onClick={() => setShowForm(false)}>Cancel</Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

/* ── Suggested Products ── */

function SuggestedProducts() {
  const ref = useReveal<HTMLDivElement>();
  const suggested = PRODUCTS.filter((p) => p.id !== "cow-ghee-multipack").slice(0, 3);
  return (
    <section className="bg-cream py-16 md:py-24">
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
