import { useState } from "react";
import {
  Minus, Plus, ShoppingBag, CheckCircle2,
  FlaskConical, Flame, Package, Star, Truck, ShieldCheck, Award, BadgeCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { formatINR, type Product } from "@/lib/catalog";
import { useCart } from "@/lib/cart";
import { VegMark } from "./VegMark";
import { PincodeChecker } from "./PincodeChecker";

interface Props {
  product: Product;
  open: boolean;
  onClose: () => void;
}

type Tab = "highlights" | "nutrition" | "usage" | "reviews";

const TABS: { id: Tab; label: string }[] = [
  { id: "highlights", label: "Highlights" },
  { id: "nutrition",  label: "Nutrition" },
  { id: "usage",      label: "Use & Store" },
  { id: "reviews",    label: "Reviews" },
];

const TRUST = [
  { icon: Truck,       label: "Free shipping above ₹999" },
  { icon: ShieldCheck, label: "No added preservatives"   },
  { icon: Award,       label: "100% Pure Cow Ghee"       },
];

/** Rating bar data: [stars, percentage] */
const RATING_BARS: [number, number][] = [
  [5, 75],
  [4, 17],
  [3, 5],
  [2, 2],
  [1, 1],
];

const REVIEWS = [
  { name: "Priya S.",   location: "Chennai",    rating: 5, text: "The aroma when you open the jar is incredible — exactly like the ghee my grandmother made. We've switched completely.",                   date: "Oct 2026" },
  { name: "Rajan M.",   location: "Bangalore",  rating: 5, text: "No strange aftertaste and a lovely golden colour. My kids love it on hot rotis.",                                                         date: "Sep 2026" },
  { name: "Deepa K.",   location: "Hyderabad",  rating: 5, text: "Ordered for Diwali sweets and everyone asked where I bought the ghee. Delivery was quick too.",                                           date: "Nov 2026" },
  { name: "Suresh P.",  location: "Coimbatore", rating: 4, text: "Genuine quality and good value in the 1 L jar. Packaging was safe. Will order again.",                                                   date: "Oct 2026" },
  { name: "Lakshmi N.", location: "Madurai",    rating: 5, text: "Bought the small jar to try it. The taste is pure and rich — reordered the 500 ml within a week.",                                      date: "Nov 2026" },
];

export function ProductDetailDialog({ product, open, onClose }: Props) {
  const { add } = useCart();
  const [qty, setQty]   = useState(1);
  const [tab, setTab]   = useState<Tab>("highlights");
  const d = product.details;

  function handleAdd() {
    add(product.id, qty);
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) onClose(); }}>
      <DialogContent
        className={cn(
          "max-h-[92vh] w-full max-w-4xl p-0 gap-0",
          "bg-cream-alt border-0 shadow-[0_32px_80px_-16px_rgba(0,0,0,0.35)]",
          "rounded-2xl overflow-y-auto",
        )}
      >
        <DialogTitle className="sr-only">{product.name} {product.size}</DialogTitle>
        <DialogDescription className="sr-only">{product.blurb}</DialogDescription>

        <div className="flex flex-col md:flex-row md:h-[88vh] md:max-h-[88vh] md:overflow-hidden">

          {/* ══ LEFT: Image panel ══ */}
          <div className="relative flex shrink-0 flex-col items-center justify-center bg-gradient-to-br from-[oklch(0.97_0.025_92)] to-[oklch(0.93_0.04_92)] md:w-[42%]">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />

            <div className="absolute left-4 top-5 flex flex-col gap-2">
              <span className="rounded-full bg-forest px-3 py-1 text-xs font-semibold text-forest-foreground shadow-sm">
                {product.size}
              </span>
            </div>
            <VegMark className="absolute right-4 top-5 bg-white/80 backdrop-blur-sm" />

            <div className="flex items-center justify-center p-8 md:p-12">
              <img
                src={product.image}
                alt={`${product.name} ${product.size}`}
                className="h-48 w-full object-contain drop-shadow-2xl md:h-72 transition-transform duration-700 hover:scale-105"
              />
            </div>

            <div className="mb-5 flex items-center gap-1">
              {[1,2,3,4,5].map((s) => (
                <Star key={s} className={cn("size-4", s <= 5 ? "fill-gold text-gold" : "text-muted-foreground/30")} />
              ))}
              <span className="ml-2 text-xs text-muted-foreground font-medium">4.8 · 200+ reviews</span>
            </div>
          </div>

          {/* ══ RIGHT: Details panel ══ */}
          <div className="flex flex-1 flex-col md:overflow-hidden">

            {/* Header */}
            <div className="border-b bg-white px-5 py-5 md:px-7 md:py-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-dark">
                Sri Parvathi Ghee
              </p>
              <h2 className="mt-1 font-serif text-xl font-bold leading-tight text-forest md:text-3xl">
                {product.name}
              </h2>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {product.size} · Pure Cow Ghee
              </p>

              <div className="mt-3 flex items-end gap-3">
                <span className="text-3xl font-extrabold tracking-tight text-forest md:text-4xl">
                  {formatINR(product.price)}
                </span>
                <span className="mb-1 rounded-full bg-teal-light px-2.5 py-0.5 text-xs font-semibold text-teal-dark">
                  Incl. GST
                </span>
              </div>

              <div className="mt-3 flex flex-wrap gap-3">
                {TRUST.map(({ icon: Icon, label }) => (
                  <span key={label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Icon className="size-3.5 shrink-0 text-success" />
                    {label}
                  </span>
                ))}
              </div>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto px-5 py-5 md:px-7">

              {d && (
                <p className="text-sm text-muted-foreground leading-relaxed border-l-2 border-gold pl-3">
                  {d.description}
                </p>
              )}

              {d && (
                <div className="mt-6">
                  <div className="flex gap-0 rounded-xl border overflow-hidden bg-card">
                    {TABS.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setTab(t.id)}
                        className={cn(
                          "flex-1 py-2.5 text-xs font-semibold uppercase tracking-wide transition-colors duration-200",
                          tab === t.id
                            ? "bg-forest text-forest-foreground"
                            : "text-muted-foreground hover:bg-teal-light hover:text-forest",
                        )}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>

                  {/* Highlights */}
                  {tab === "highlights" && (
                    <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                      {d.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2.5 rounded-lg bg-card p-3 text-sm text-forest shadow-sm">
                          <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Nutrition */}
                  {tab === "nutrition" && (
                    <div className="mt-4 overflow-hidden rounded-xl border shadow-sm">
                      <div className="bg-forest px-4 py-2.5 flex items-center gap-2">
                        <FlaskConical className="size-4 text-gold-light" />
                        <span className="text-sm font-semibold text-forest-foreground">Nutrition Facts (per 10 g)</span>
                      </div>
                      <table className="w-full text-sm">
                        <tbody>
                          {d.nutrition.map((n, i) => (
                            <tr key={n.label} className={i % 2 === 0 ? "bg-card" : "bg-cream-alt"}>
                              <td className="px-4 py-2.5 text-muted-foreground font-medium">{n.label}</td>
                              <td className="px-4 py-2.5 text-right font-bold text-forest">{n.value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <p className="px-4 py-2 text-xs text-muted-foreground italic">Placeholder values — replace with FSSAI-approved lab data.</p>
                    </div>
                  )}

                  {/* Use & Store */}
                  {tab === "usage" && (
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-xl bg-card p-4 shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="flex size-8 items-center justify-center rounded-lg bg-ghee/20">
                            <Flame className="size-4 text-ghee-hover" />
                          </span>
                          <h4 className="font-semibold text-forest text-sm">How to Use</h4>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">{d.usage}</p>
                      </div>
                      <div className="rounded-xl bg-card p-4 shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="flex size-8 items-center justify-center rounded-lg bg-teal-light">
                            <Package className="size-4 text-teal-dark" />
                          </span>
                          <h4 className="font-semibold text-forest text-sm">Storage</h4>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">{d.storage}</p>
                      </div>
                    </div>
                  )}

                  {/* Reviews */}
                  {tab === "reviews" && (
                    <div className="mt-4 flex flex-col gap-3">
                      {/* Summary */}
                      <div className="flex items-center gap-4 rounded-xl border bg-card p-4 shadow-sm">
                        <div className="flex flex-col items-center">
                          <span className="font-serif text-5xl font-bold text-forest">4.8</span>
                          <div className="mt-1 flex gap-0.5">
                            {[1,2,3,4,5].map((s) => <Star key={s} className="size-3.5 fill-gold text-gold" />)}
                          </div>
                          <span className="mt-1 text-xs text-muted-foreground">200+ reviews</span>
                        </div>
                        <div className="flex-1 flex flex-col gap-1.5">
                          {RATING_BARS.map(([stars, pct]) => (
                            <div key={stars} className="flex items-center gap-2">
                              <span className="text-xs w-3 text-muted-foreground">{stars}</span>
                              <Star className="size-3 fill-gold text-gold shrink-0" />
                              <div className="flex-1 h-1.5 rounded-full bg-teal-light overflow-hidden">
                                <div className="h-full rounded-full bg-gold transition-all" style={{ width: `${pct}%` }} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {REVIEWS.map((r) => (
                        <div key={r.name} className="rounded-xl border bg-card p-4 shadow-sm">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="flex items-center gap-1.5">
                                <p className="font-semibold text-forest text-sm">{r.name}</p>
                                <BadgeCheck className="size-3.5 text-success shrink-0" aria-label="Verified Buyer" />
                              </div>
                              <p className="text-xs text-muted-foreground">{r.location} · {r.date}</p>
                            </div>
                            <div className="flex gap-0.5 shrink-0">
                              {[1,2,3,4,5].map((s) => (
                                <Star key={s} className={cn("size-3.5", s <= r.rating ? "fill-gold text-gold" : "text-muted-foreground/30")} />
                              ))}
                            </div>
                          </div>
                          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{r.text}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Pincode checker */}
              <div className="mt-6">
                <PincodeChecker />
              </div>

              <div className="h-4 md:hidden" />
            </div>

            {/* ── Sticky Buy Bar ── */}
            <div className="border-t bg-white px-5 py-4 md:px-7 md:py-5">
              <div className="flex items-center gap-3">
                <div className="flex items-center rounded-xl border-2 border-forest overflow-hidden">
                  <button
                    className="flex size-11 items-center justify-center text-forest hover:bg-forest hover:text-forest-foreground transition-colors"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    aria-label="Decrease"
                  >
                    <Minus className="size-4" />
                  </button>
                  <span className="w-9 text-center text-sm font-bold text-forest">{qty}</span>
                  <button
                    className="flex size-11 items-center justify-center text-forest hover:bg-forest hover:text-forest-foreground transition-colors"
                    onClick={() => setQty((q) => q + 1)}
                    aria-label="Increase"
                  >
                    <Plus className="size-4" />
                  </button>
                </div>

                <Button variant="cta" size="lg" className="flex-1 min-h-[44px] text-sm font-bold md:text-base" onClick={handleAdd}>
                  <ShoppingBag className="size-4" />
                  Add to Cart · {formatINR(product.price * qty)}
                </Button>
              </div>

              <div className="mt-2 flex items-center gap-2">
                <VegMark className="bg-transparent" />
                <p className="text-xs text-muted-foreground">
                  100% Vegetarian · <span className="text-success font-medium">No added preservatives</span>
                </p>
              </div>
            </div>

          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
