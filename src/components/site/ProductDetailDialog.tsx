import { useState } from "react";
import {
  Minus, Plus, ShoppingBag, CheckCircle2,
  Leaf, FlaskConical, Flame, Package, Star, Truck, ShieldCheck, Award,
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

interface Props {
  product: Product;
  open: boolean;
  onClose: () => void;
}

type Tab = "highlights" | "nutrition" | "usage";

const TABS: { id: Tab; label: string }[] = [
  { id: "highlights", label: "Highlights" },
  { id: "nutrition",  label: "Nutrition" },
  { id: "usage",      label: "Use & Store" },
];

const TRUST = [
  { icon: Truck,       label: "Free shipping above ₹999" },
  { icon: ShieldCheck, label: "No added preservatives"   },
  { icon: Award,       label: "100% Pure Cow Ghee"       },
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
          "max-h-[92vh] w-full max-w-4xl overflow-hidden p-0 gap-0",
          "bg-cream-alt border-0 shadow-[0_32px_80px_-16px_rgba(0,0,0,0.35)]",
          "rounded-2xl",
        )}
      >
        {/* Screenreader-only title */}
        <DialogTitle className="sr-only">{product.name} {product.size}</DialogTitle>
        <DialogDescription className="sr-only">{product.blurb}</DialogDescription>

        <div className="flex h-full max-h-[92vh] flex-col md:flex-row overflow-hidden">

          {/* ══ LEFT: Image panel ══ */}
          <div className="relative flex shrink-0 flex-col items-center justify-center bg-gradient-to-br from-[oklch(0.97_0.025_92)] to-[oklch(0.93_0.04_92)] md:w-[42%]">
            {/* Gold top bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />

            {/* Badges */}
            <div className="absolute left-4 top-5 flex flex-col gap-2">
              <span className="rounded-full bg-forest px-3 py-1 text-xs font-semibold text-forest-foreground shadow-sm">
                {product.size}
              </span>
            </div>
            <VegMark className="absolute right-4 top-5 bg-white/80 backdrop-blur-sm" />

            {/* Product image */}
            <div className="flex items-center justify-center p-10 md:p-12">
              <img
                src={product.image}
                alt={`${product.name} ${product.size}`}
                className="h-56 w-full object-contain drop-shadow-2xl md:h-72 transition-transform duration-700 hover:scale-105"
              />
            </div>

            {/* Star rating */}
            <div className="mb-6 flex items-center gap-1">
              {[1,2,3,4,5].map((s) => (
                <Star key={s} className="size-4 fill-gold text-gold" />
              ))}
              <span className="ml-2 text-xs text-muted-foreground font-medium">5.0 · Pure quality</span>
            </div>
          </div>

          {/* ══ RIGHT: Details panel ══ */}
          <div className="flex flex-1 flex-col overflow-hidden">

            {/* Header */}
            <div className="border-b bg-white px-7 py-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-dark">
                Sri Parvathi Ghee
              </p>
              <h2 className="mt-1 font-serif text-2xl font-bold leading-tight text-forest md:text-3xl">
                {product.name}
              </h2>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {product.size} · Pure Cow Ghee
              </p>

              {/* Price row */}
              <div className="mt-4 flex items-end gap-3">
                <span className="text-4xl font-extrabold tracking-tight text-forest">
                  {formatINR(product.price)}
                </span>
                <span className="mb-1 rounded-full bg-teal-light px-2.5 py-0.5 text-xs font-semibold text-teal-dark">
                  Incl. GST
                </span>
              </div>

              {/* Trust strip */}
              <div className="mt-4 flex flex-wrap gap-3">
                {TRUST.map(({ icon: Icon, label }) => (
                  <span key={label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Icon className="size-3.5 shrink-0 text-success" />
                    {label}
                  </span>
                ))}
              </div>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto px-7 py-5">

              {/* Short description */}
              {d && (
                <p className="text-sm text-muted-foreground leading-relaxed border-l-2 border-gold pl-3">
                  {d.description}
                </p>
              )}

              {/* Tabs */}
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

                  {/* Tab: Highlights */}
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

                  {/* Tab: Nutrition */}
                  {tab === "nutrition" && (
                    <div className="mt-4 overflow-hidden rounded-xl border shadow-sm">
                      <div className="bg-forest px-4 py-2.5 flex items-center gap-2">
                        <FlaskConical className="size-4 text-gold-light" />
                        <span className="text-sm font-semibold text-forest-foreground">Nutrition Facts (per 100 g)</span>
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
                    </div>
                  )}

                  {/* Tab: Use & Store */}
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
                </div>
              )}
            </div>

            {/* ── Sticky Buy Bar ── */}
            <div className="border-t bg-white px-7 py-5">
              <div className="flex items-center gap-4">
                {/* Qty */}
                <div className="flex items-center rounded-xl border-2 border-forest overflow-hidden">
                  <button
                    className="flex size-10 items-center justify-center text-forest hover:bg-forest hover:text-forest-foreground transition-colors"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    aria-label="Decrease"
                  >
                    <Minus className="size-4" />
                  </button>
                  <span className="w-10 text-center text-sm font-bold text-forest">{qty}</span>
                  <button
                    className="flex size-10 items-center justify-center text-forest hover:bg-forest hover:text-forest-foreground transition-colors"
                    onClick={() => setQty((q) => q + 1)}
                    aria-label="Increase"
                  >
                    <Plus className="size-4" />
                  </button>
                </div>

                {/* Add to cart */}
                <Button variant="cta" size="lg" className="flex-1 text-base font-bold" onClick={handleAdd}>
                  <ShoppingBag className="size-5" />
                  Add to Cart · {formatINR(product.price * qty)}
                </Button>
              </div>

              {/* Veg + disclaimer row */}
              <div className="mt-3 flex items-center gap-3">
                <VegMark className="bg-transparent" />
                <p className="text-xs text-muted-foreground">
                  100% Vegetarian · <span className="text-success font-medium">No added preservatives</span> · Best before 6 months from manufacture
                </p>
              </div>
            </div>

          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
