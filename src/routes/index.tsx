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
    <section className="bg-benefits relative overflow-hidden py-20 md:py-32">

      {/* Large blurred gold orb — top right */}
      <div
        className="pointer-events-none absolute -right-40 -top-40 h-[36rem] w-[36rem] rounded-full opacity-[0.07]"
        style={{ background: "radial-gradient(circle, var(--gold) 0%, transparent 70%)" }}
        aria-hidden="true"
      />
      {/* Large blurred teal orb — bottom left */}
      <div
        className="pointer-events-none absolute -bottom-32 -left-32 h-[28rem] w-[28rem] rounded-full opacity-[0.06]"
        style={{ background: "radial-gradient(circle, var(--teal) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div ref={ref} className="reveal container-brand relative z-10">

        {/* ── Heading block ── */}
        <div className="flex flex-col items-center gap-5 text-center mb-16">
          {/* Pill eyebrow */}
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-5 py-2 text-[0.7rem] font-bold uppercase tracking-[0.25em] text-gold-light backdrop-blur-sm">
            <span className="size-1.5 rounded-full bg-gold-light animate-pulse" />
            Why Choose Sri Parvathi Ghee
          </span>

          <h2 className="font-serif text-4xl font-bold leading-tight text-white md:text-6xl">
            Nature's Purest Gift,
            <span className="block mt-1" style={{ color: "var(--gold-light)" }}>In Every Drop</span>
          </h2>

          {/* Ornament */}
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

        {/* ── Stats strip ── */}
        <div className="mb-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {STATS.map(({ value, label }) => (
            <div
              key={label}
              className="group relative flex flex-col items-center overflow-hidden rounded-2xl border border-gold/25 px-5 py-7 text-center"
              style={{ background: "linear-gradient(145deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)" }}
            >
              {/* Inner gold shimmer */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
              <span className="font-serif text-5xl font-bold tracking-tight text-gold-light md:text-6xl">
                {value}
              </span>
              <span className="mt-2 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/50">
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* ── Benefit cards ── */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map(({ icon: Icon, title, text, color, iconColor }, i) => (
            <div
              key={title}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/8 p-7 transition-all duration-500 hover:-translate-y-1"
              style={{ background: "linear-gradient(145deg, rgba(255,255,255,0.075) 0%, rgba(255,255,255,0.03) 100%)" }}
            >
              {/* Top gold line on hover */}
              <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-gold/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              {/* Icon */}
              <div className={`mb-6 flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br ${color}`}
                style={{ boxShadow: "0 4px 20px -4px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.12)" }}>
                <Icon className={`size-8 ${iconColor} drop-shadow-sm`} aria-hidden="true" />
              </div>

              {/* Number badge */}
              <span className="mb-3 font-serif text-xs font-semibold text-gold/50">
                0{i + 1}
              </span>

              <h3 className="font-serif text-xl font-semibold text-white md:text-2xl">
                {title}
              </h3>

              <div className="my-3 h-px w-8 bg-gradient-to-r from-gold/70 to-transparent transition-all duration-500 group-hover:w-16" />

              <p className="text-sm leading-relaxed text-white/55 md:text-[0.9rem]">
                {text}
              </p>
            </div>
          ))}
        </div>

        {/* ── Bottom CTA ── */}
        <div className="mt-16 flex flex-col items-center gap-5 text-center">
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



