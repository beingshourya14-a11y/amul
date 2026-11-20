import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight, Award, Droplets, Flame, Leaf, Shield,
  ShieldCheck, Sprout, Star, Truck, Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ClaimBadge } from "@/components/site/ClaimBadge";
import { HillDivider } from "@/components/site/HillDivider";
import { ProductCard } from "@/components/site/ProductCard";
import { SectionHeading } from "@/components/site/SectionHeading";
import jarImage from "@/assets/ghee_4_all_jars_group_4k.png";
import kitchenImage from "@/assets/ghee_2_small_jar_4k.png";
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
  { icon: Droplets,   label: "Pure Cow Ghee"            },
  { icon: ShieldCheck,label: "No Added Preservatives"   },
  { icon: Sprout,     label: "Rich in Natural Nutrients" },
  { icon: Award,      label: "Trusted Since Decades"    },
  { icon: Truck,      label: "Fast Delivery"            },
];

const STATS = [
  { value: "99.8%", label: "Pure Fat Content"    },
  { value: "0%",    label: "Added Preservatives" },
  { value: "6mo",   label: "Shelf Life"          },
  { value: "100%",  label: "Vegetarian"          },
];

const BENEFITS = [
  {
    icon: Flame,
    title: "Boosts Immunity",
    text: "Rich in fat-soluble vitamins A, D, E & K that strengthen the immune system and support overall health.",
    color: "from-amber-500/20 to-orange-500/10",
    iconColor: "text-amber-400",
  },
  {
    icon: Zap,
    title: "Instant Energy",
    text: "Medium-chain fatty acids in cow ghee are metabolised quickly, providing clean, sustained energy throughout the day.",
    color: "from-yellow-500/20 to-amber-400/10",
    iconColor: "text-yellow-400",
  },
  {
    icon: Shield,
    title: "Gut & Digestive Health",
    text: "Butyric acid in ghee nourishes intestinal lining, aids digestion, and supports a healthy gut microbiome.",
    color: "from-green-500/20 to-teal-500/10",
    iconColor: "text-green-400",
  },
  {
    icon: Star,
    title: "Enhances Flavour",
    text: "A spoonful of pure cow ghee transforms any dish — dal, rice, roti — with its rich, nutty golden aroma.",
    color: "from-gold/20 to-ghee/10",
    iconColor: "text-gold-light",
  },
  {
    icon: Leaf,
    title: "100% Natural",
    text: "No additives, no colourants, no synthetic preservatives. Just pure cow butter, clarified the traditional way.",
    color: "from-emerald-500/20 to-green-400/10",
    iconColor: "text-emerald-400",
  },
  {
    icon: Droplets,
    title: "Lactose-Free Friendly",
    text: "The clarification process removes milk solids and water, making ghee suitable for those with lactose sensitivity.",
    color: "from-sky-400/20 to-teal-400/10",
    iconColor: "text-sky-400",
  },
];

/* ── Page ── */

function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <BenefitsSection />
      <Bestsellers />
      <StoryTeaser />
    </>
  );
}

/* ── Hero ── */

function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero">
      <div className="container-brand grid items-center gap-10 py-14 md:grid-cols-2 md:py-20 lg:py-28">
        <div className="relative z-10 flex flex-col items-start gap-6">
          {/* Eyebrow */}
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

        {/* Product image */}
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
    <section className="bg-benefits relative overflow-hidden py-20 md:py-28">

      {/* Subtle bg ornament */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)", backgroundSize: "60px 60px" }}
        aria-hidden="true"
      />

      <div ref={ref} className="reveal container-brand relative z-10">

        {/* Heading */}
        <div className="flex flex-col items-center text-center gap-4 mb-14">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-light/80">
            Why Choose Sri Parvathi Ghee
          </span>
          <h2 className="font-serif text-3xl font-bold text-forest-foreground md:text-5xl">
            Nature's Purest Gift,
            <span className="block mt-1 text-gold-light">In Every Drop</span>
          </h2>
          {/* Gold ornament line */}
          <div className="flex items-center gap-4 mt-1">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/60" />
            <span className="text-gold text-lg">✦</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/60" />
          </div>
          <p className="max-w-xl text-sm leading-relaxed text-forest-foreground/70 md:text-base">
            Pure cow ghee isn't just a cooking ingredient — it's a centuries-old superfood
            with proven benefits for your body, mind, and soul.
          </p>
        </div>

        {/* Stats row */}
        <div className="mb-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {STATS.map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center rounded-2xl border border-gold/20 bg-white/5 py-5 px-4 text-center backdrop-blur-sm">
              <span className="font-serif text-4xl font-bold text-gold-light md:text-5xl">{value}</span>
              <span className="mt-1.5 text-xs font-medium uppercase tracking-wider text-forest-foreground/60">{label}</span>
            </div>
          ))}
        </div>

        {/* Benefit cards grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map(({ icon: Icon, title, text, color, iconColor }) => (
            <div key={title} className="card-benefit group p-6">
              {/* Icon */}
              <div className={`mb-5 flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br ${color} border border-white/10`}>
                <Icon className={`size-7 ${iconColor}`} aria-hidden="true" />
              </div>

              {/* Content */}
              <h3 className="font-serif text-xl font-semibold text-forest-foreground">
                {title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-forest-foreground/65">
                {text}
              </p>

              {/* Hover bottom accent line */}
              <div className="mt-5 h-0.5 w-0 rounded-full bg-gradient-to-r from-gold to-ghee transition-all duration-500 group-hover:w-12" />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 flex flex-col items-center gap-4 text-center">
          <p className="font-script text-2xl text-gold-light/90 md:text-3xl">
            From our home to yours — pure, always.
          </p>
          <Button
            variant="cta"
            size="xl"
            asChild
            className="mt-1 shadow-[0_4px_24px_-4px_color-mix(in_oklab,var(--ghee)_50%,transparent)]"
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
        <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Story teaser ── */

function StoryTeaser() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="bg-cream py-16 md:py-24">
      <div ref={ref} className="reveal container-brand grid items-center gap-12 md:grid-cols-2">
        <div className="relative">
          <img
            src={kitchenImage}
            alt="Sri Parvathi Ghee jar"
            loading="lazy"
            width={800}
            height={900}
            className="w-full rounded-3xl object-contain shadow-lift"
          />
          {/* Floating badge */}
          <div className="absolute -right-4 -top-4 hidden rounded-2xl bg-forest px-5 py-4 text-center shadow-lift md:block">
            <p className="font-serif text-2xl font-bold text-gold-light">100%</p>
            <p className="text-[0.6rem] font-semibold uppercase tracking-widest text-forest-foreground/80">Pure Ghee</p>
          </div>
        </div>

        <div className="flex flex-col items-start gap-5">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-dark">Our Story</span>
          <h2 className="font-serif text-3xl font-bold leading-tight text-forest md:text-4xl">
            Pure · Traditional · <br/>
            <span className="text-teal-dark">Homemade</span>
          </h2>
          <p className="font-script text-2xl text-teal-dark">From our house to yours</p>
          <p className="text-muted-foreground leading-relaxed">
            Sri Parvathi Ghee is made the traditional way — pure cow ghee, no added preservatives,
            crafted with care to bring homemade goodness to your everyday cooking.
            Every jar carries our promise: nothing artificial, ever.
          </p>
          <div className="flex flex-wrap gap-2">
            {PACKAGING_CLAIMS.map((c) => <ClaimBadge key={c} label={c} />)}
          </div>
          <Button variant="forestOutline" size="lg" asChild>
            <Link to="/about">
              Read our story <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
