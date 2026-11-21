import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft, CheckCircle2, Flame, FlaskConical, Minus, Package, Plus,
  ShoppingBag, Star, Truck, ShieldCheck, Award, BadgeCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { VegMark } from "@/components/site/VegMark";
import { PincodeChecker } from "@/components/site/PincodeChecker";
import { ProductCard } from "@/components/site/ProductCard";
import { formatINR, getProductBySlug, PRODUCTS } from "@/lib/catalog";
import { FSSAI_NUMBER, OG_IMAGE_URL } from "@/lib/config";
import { useSparkToCart } from "@/lib/use-spark-to-cart";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/product/$slug")({
  head: ({ params }) => {
    const p = getProductBySlug(params.slug);
    if (!p) return { meta: [{ title: "Product Not Found" }] };
    return {
      meta: [
        { title: `${p.name} ${p.size} — Sri Parvathi Ghee` },
        { name: "description", content: `Buy ${p.name} ${p.size} at ${formatINR(p.price)} (Incl. GST). ${p.blurb} Free shipping above ₹999.` },
        { property: "og:title", content: `${p.name} ${p.size} — Sri Parvathi Ghee` },
        { property: "og:description", content: p.blurb },
        { property: "og:type", content: "product" },
        { property: "og:image", content: OG_IMAGE_URL },
        { property: "og:url", content: `https://sriparvathighee.in/product/${p.slug}` },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: OG_IMAGE_URL },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            name: `${p.name} ${p.size}`,
            image: OG_IMAGE_URL,
            description: p.blurb,
            brand: { "@type": "Brand", name: "Sri Parvathi Ghee" },
            offers: {
              "@type": "Offer",
              priceCurrency: "INR",
              price: p.price,
              availability: "https://schema.org/InStock",
              url: `https://sriparvathighee.in/product/${p.slug}`,
            },
          }),
        },
      ],
    };
  },
  loader: ({ params }) => {
    const p = getProductBySlug(params.slug);
    if (!p) throw notFound();
    return p;
  },
  component: ProductPage,
});

/** Rating bar data: [stars, percentage] */
const RATING_BARS: [number, number][] = [[5, 75], [4, 17], [3, 5], [2, 2], [1, 1]];

const TRUST = [
  { icon: Truck,       label: "Free shipping above ₹999" },
  { icon: ShieldCheck, label: "No added preservatives"   },
  { icon: Award,       label: "100% Pure Cow Ghee"       },
];

const REVIEWS = [
  { name: "Priya S.",   city: "Chennai",    rating: 5, product: "500 ml",         text: "The aroma when you open the jar is incredible — exactly like the ghee my grandmother made. We've switched completely." },
  { name: "Rajan M.",   city: "Bangalore",  rating: 5, product: "1 L",            text: "No strange aftertaste and a lovely golden colour. My kids love it on hot rotis." },
  { name: "Deepa K.",   city: "Hyderabad",  rating: 5, product: "500 ml",         text: "Ordered for Diwali sweets and everyone asked where I bought the ghee. Delivery was quick too." },
  { name: "Suresh P.",  city: "Coimbatore", rating: 4, product: "1 L",            text: "Genuine quality and good value in the 1 L jar. Packaging was safe. Will order again." },
  { name: "Lakshmi N.", city: "Madurai",    rating: 5, product: "200 ml",         text: "Bought the small jar to try it. The taste is pure and rich — reordered the 500 ml within a week." },
  { name: "Karthik R.", city: "Coimbatore", rating: 4, product: "Variety Pack",   text: "Gave the variety pack as a festival gift and the family loved it. Would like more gift packaging options." },
  { name: "Anitha V.",  city: "Vijayawada", rating: 5, product: "500 ml Premium", text: "Smooth texture and a rich aroma. Perfect for pongal and sweets." },
  { name: "Mohan T.",   city: "Chennai",    rating: 5, product: "1 L",            text: "Tastes like the ghee from my village growing up. Totally worth it." },
];

type AccordionKey = "highlights" | "nutrition" | "usage";

function ProductPage() {
  const product = Route.useLoaderData();
  const { sparkAdd } = useSparkToCart();
  const [qty, setQty] = useState(1);
  const [expanded, setExpanded] = useState<AccordionKey | null>("highlights");
  const d = product.details;

  const toggle = (key: AccordionKey) => setExpanded((v) => (v === key ? null : key));

  // "You may also like" — other products, excluding current
  const related = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div className="bg-cream-alt min-h-screen">
      {/* Back link */}
      <div className="container-brand pt-6">
        <Link
          to="/shop"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-forest/70 hover:text-forest transition-colors"
        >
          <ArrowLeft className="size-4" /> Back to Shop
        </Link>
      </div>

      {/* Hero: image + buy panel */}
      <section className="container-brand py-8 md:py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:gap-16">

          {/* Image */}
          <div className="relative flex items-center justify-center rounded-3xl bg-gradient-to-br from-[oklch(0.97_0.025_92)] to-[oklch(0.93_0.04_92)] p-8 shadow-lift md:p-12">
            <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />
            <span className="absolute left-4 top-4 rounded-full bg-forest px-3 py-1 text-xs font-semibold text-forest-foreground shadow-sm">
              {product.size}
            </span>
            <VegMark className="absolute right-4 top-4 bg-white/80 backdrop-blur-sm" />
            <img
              src={product.image}
              alt={`${product.name} ${product.size} glass jar`}
              width={500}
              height={500}
              className="w-56 object-contain drop-shadow-2xl transition-transform duration-700 hover:scale-105 md:w-80"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col gap-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-dark">Sri Parvathi Ghee</p>
              <h1 className="mt-1 font-serif text-3xl font-bold leading-tight text-forest md:text-4xl">
                {product.name}
              </h1>
              <p className="mt-1 text-muted-foreground">{product.size} · Pure Cow Ghee</p>
            </div>

            {/* Price */}
            <div className="flex items-end gap-3">
              <span className="text-4xl font-extrabold tracking-tight text-forest">{formatINR(product.price)}</span>
              <span className="mb-1 rounded-full bg-teal-light px-2.5 py-0.5 text-xs font-semibold text-teal-dark">Incl. GST</span>
            </div>

            {/* Trust */}
            <div className="flex flex-wrap gap-3">
              {TRUST.map(({ icon: Icon, label }) => (
                <span key={label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Icon className="size-3.5 shrink-0 text-success" />
                  {label}
                </span>
              ))}
            </div>

            {/* Short description */}
            {d && (
              <p className="text-sm text-muted-foreground leading-relaxed border-l-2 border-gold pl-3">
                {d.description}
              </p>
            )}

            {/* Size selector */}
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-forest">Other sizes</p>
              <div className="flex flex-wrap gap-2">
                {PRODUCTS.map((p) => (
                  <Link
                    key={p.id}
                    to="/product/$slug"
                    params={{ slug: p.slug }}
                    className={cn(
                      "rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors",
                      p.id === product.id
                        ? "border-forest bg-forest text-forest-foreground"
                        : "border-input bg-card text-muted-foreground hover:border-forest hover:text-forest",
                    )}
                  >
                    {p.size}
                  </Link>
                ))}
              </div>
            </div>

            {/* Qty + Add to Cart */}
            <div className="flex items-center gap-3">
              <div className="flex items-center rounded-xl border-2 border-forest overflow-hidden">
                <button
                  className="flex size-11 items-center justify-center text-forest hover:bg-forest hover:text-forest-foreground transition-colors"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                >
                  <Minus className="size-4" />
                </button>
                <span className="w-10 text-center text-sm font-bold text-forest">{qty}</span>
                <button
                  className="flex size-11 items-center justify-center text-forest hover:bg-forest hover:text-forest-foreground transition-colors"
                  onClick={() => setQty((q) => q + 1)}
                  aria-label="Increase quantity"
                >
                  <Plus className="size-4" />
                </button>
              </div>
              <Button
                variant="cta"
                size="lg"
                className="flex-1 min-h-[44px] font-bold"
                onClick={(e) => sparkAdd(e.currentTarget, product.id, qty)}
                aria-label={`Add ${product.size} jar to cart`}
              >
                <ShoppingBag className="size-4" />
                Add to Cart · {formatINR(product.price * qty)}
              </Button>
            </div>

            {/* Veg + FSSAI */}
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <VegMark className="bg-transparent" />
              <span>100% Vegetarian</span>
              <span className="font-mono">FSSAI: {FSSAI_NUMBER}</span>
            </div>

            {/* Pincode */}
            <PincodeChecker />
          </div>
        </div>
      </section>

      {/* Accordions: Ingredients / Nutrition / How to Use / Storage */}
      {d && (
        <section className="container-brand pb-10">
          <div className="max-w-3xl rounded-2xl border bg-card shadow-sm overflow-hidden">

            {/* Ingredients */}
            <details className="border-b group" open>
              <summary className="flex cursor-pointer items-center justify-between px-6 py-4 font-semibold text-forest list-none select-none hover:bg-cream-alt transition-colors">
                Ingredients
                <span className="text-gold transition-transform group-open:rotate-45">+</span>
              </summary>
              <div className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed">
                100% pure cow ghee. No added preservatives, artificial colours or flavours.
                Made from fresh cow butter using the traditional clarification method.
              </div>
            </details>

            {/* Nutrition */}
            <details className="border-b group" open={expanded === "nutrition"}>
              <summary
                className="flex cursor-pointer items-center justify-between px-6 py-4 font-semibold text-forest list-none select-none hover:bg-cream-alt transition-colors"
                onClick={(e) => { e.preventDefault(); toggle("nutrition"); }}
              >
                <span className="flex items-center gap-2">
                  <FlaskConical className="size-4 text-gold" />
                  Nutrition Facts (per 10 g)
                </span>
                <span className="text-gold">{expanded === "nutrition" ? "−" : "+"}</span>
              </summary>
              {expanded === "nutrition" && (
                <div className="px-6 pb-5">
                  <table className="w-full text-sm">
                    <tbody>
                      {d.nutrition.map((n, i) => (
                        <tr key={n.label} className={i % 2 === 0 ? "bg-card" : "bg-cream-alt"}>
                          <td className="py-2 text-muted-foreground font-medium">{n.label}</td>
                          <td className="py-2 text-right font-bold text-forest">{n.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="mt-2 text-xs text-muted-foreground italic">Placeholder values — replace with FSSAI-approved lab data.</p>
                </div>
              )}
            </details>

            {/* How to Use */}
            <details className="border-b group">
              <summary
                className="flex cursor-pointer items-center justify-between px-6 py-4 font-semibold text-forest list-none select-none hover:bg-cream-alt transition-colors"
                onClick={(e) => { e.preventDefault(); toggle("usage"); }}
              >
                <span className="flex items-center gap-2">
                  <Flame className="size-4 text-gold" />
                  How to Use
                </span>
                <span className="text-gold">{expanded === "usage" ? "−" : "+"}</span>
              </summary>
              {expanded === "usage" && (
                <div className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed">
                  {d.usage} Perfect for cooking, tempering dals, spreading on rotis, and making traditional sweets like halwa, pongal and kheer.
                  Also excellent as a finishing drizzle on dosa, rice or idli. Use a clean, dry spoon to maintain freshness.
                </div>
              )}
            </details>

            {/* Storage */}
            <details className="group">
              <summary
                className="flex cursor-pointer items-center justify-between px-6 py-4 font-semibold text-forest list-none select-none hover:bg-cream-alt transition-colors"
                onClick={(e) => { e.preventDefault(); toggle("highlights"); }}
              >
                <span className="flex items-center gap-2">
                  <Package className="size-4 text-gold" />
                  Storage & Shelf Life
                </span>
                <span className="text-gold">{expanded === "highlights" ? "−" : "+"}</span>
              </summary>
              {expanded === "highlights" && (
                <div className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed">
                  {d.storage} Best before 6 months from the date of manufacture. Always use a clean, dry spoon to prevent moisture contamination.
                  Do not refrigerate — ghee is naturally shelf-stable at room temperature.
                </div>
              )}
            </details>

          </div>
        </section>
      )}

      {/* Reviews section */}
      <section className="container-brand pb-16">
        <h2 className="font-serif text-2xl font-bold text-forest mb-6 md:text-3xl">Customer Reviews</h2>

        {/* Rating summary */}
        <div className="mb-8 flex items-center gap-6 rounded-2xl border bg-card p-5 shadow-sm max-w-md">
          <div className="flex flex-col items-center">
            <span className="font-serif text-6xl font-bold text-forest">4.8</span>
            <div className="mt-1 flex gap-0.5">
              {[1,2,3,4,5].map((s) => <Star key={s} className="size-4 fill-gold text-gold" />)}
            </div>
            <span className="mt-1 text-xs text-muted-foreground">Based on 200+ reviews</span>
          </div>
          <div className="flex-1 flex flex-col gap-2">
            {RATING_BARS.map(([stars, pct]) => (
              <div key={stars} className="flex items-center gap-2">
                <span className="text-xs w-3 text-muted-foreground">{stars}</span>
                <Star className="size-3 fill-gold text-gold shrink-0" />
                <div className="flex-1 h-2 rounded-full bg-teal-light overflow-hidden">
                  <div className="h-full rounded-full bg-gold transition-all" style={{ width: `${pct}%` }} />
                </div>
                <span className="text-xs text-muted-foreground w-7 text-right">{pct}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {REVIEWS.map((r) => (
            <div key={r.name} className="card-brand p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="flex size-8 items-center justify-center rounded-full bg-forest text-xs font-bold text-forest-foreground shrink-0">
                    {r.name[0]}
                  </span>
                  <div>
                    <div className="flex items-center gap-1">
                      <p className="text-sm font-semibold text-forest">{r.name}</p>
                      <BadgeCheck className="size-3.5 text-success shrink-0" aria-label="Verified Buyer" />
                    </div>
                    <p className="text-xs text-muted-foreground">{r.city} · {r.product}</p>
                  </div>
                </div>
                <div className="flex gap-0.5 shrink-0">
                  {[1,2,3,4,5].map((s) => (
                    <Star key={s} className={cn("size-3", s <= r.rating ? "fill-gold text-gold" : "text-muted-foreground/30")} />
                  ))}
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{r.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* You may also like */}
      <section className="container-brand pb-20">
        <h2 className="font-serif text-2xl font-bold text-forest mb-6 md:text-3xl">You May Also Like</h2>
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
