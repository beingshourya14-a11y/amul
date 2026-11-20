import { useState } from "react";
import { Minus, Plus, ShoppingBag, CheckCircle2, Leaf, FlaskConical, Flame, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { formatINR, type Product } from "@/lib/catalog";
import { useCart } from "@/lib/cart";
import { VegMark } from "./VegMark";

interface Props {
  product: Product;
  open: boolean;
  onClose: () => void;
}

export function ProductDetailDialog({ product, open, onClose }: Props) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const d = product.details;

  function handleAdd() {
    add(product.id, qty);
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-h-[90vh] w-full max-w-3xl overflow-y-auto bg-cream-alt p-0 gap-0">

        {/* ── Top: image + headline ── */}
        <div className="grid md:grid-cols-2">
          {/* Image panel */}
          <div className="relative flex items-center justify-center bg-white p-6">
            <span className="absolute left-4 top-4 rounded-full bg-forest px-3 py-1 text-xs font-semibold text-forest-foreground">
              {product.size}
            </span>
            <VegMark className="absolute right-4 top-4 bg-white" />
            <img
              src={product.image}
              alt={`${product.name} ${product.size}`}
              className="h-64 w-full object-contain md:h-72"
            />
          </div>

          {/* Info panel */}
          <div className="flex flex-col gap-4 p-6">
            <DialogHeader>
              <DialogTitle className="font-serif text-2xl text-forest leading-snug">
                {product.name}
                <span className="ml-2 font-sans text-base font-medium text-muted-foreground">· {product.size}</span>
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground leading-relaxed">
                {d?.description ?? product.blurb}
              </DialogDescription>
            </DialogHeader>

            {/* Price */}
            <div>
              <p className="text-3xl font-bold text-forest">{formatINR(product.price)}</p>
              <p className="text-xs text-muted-foreground">Inclusive of GST · Free shipping above ₹999</p>
            </div>

            {/* Qty selector + Add to cart */}
            <div className="flex items-center gap-3">
              <div className="flex items-center rounded-lg border bg-card">
                <Button
                  variant="ghost" size="icon" className="size-9"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                >
                  <Minus className="size-4" />
                </Button>
                <span className="w-9 text-center text-sm font-semibold">{qty}</span>
                <Button
                  variant="ghost" size="icon" className="size-9"
                  onClick={() => setQty((q) => q + 1)}
                  aria-label="Increase quantity"
                >
                  <Plus className="size-4" />
                </Button>
              </div>
              <Button variant="cta" className="flex-1" onClick={handleAdd}>
                <ShoppingBag className="size-4" /> Add to Cart
              </Button>
            </div>

            {/* Quick highlights */}
            {d && (
              <ul className="mt-1 space-y-1.5">
                {d.highlights.slice(0, 4).map((h) => (
                  <li key={h} className="flex items-start gap-2 text-sm text-forest">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" />
                    {h}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* ── Bottom: tabs-style detail sections ── */}
        {d && (
          <div className="border-t grid gap-0 divide-y">

            {/* All highlights */}
            <section className="p-6">
              <h3 className="flex items-center gap-2 font-serif text-lg font-bold text-forest">
                <Leaf className="size-5 text-success" /> What's Inside
              </h3>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {d.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" />
                    {h}
                  </li>
                ))}
              </ul>
            </section>

            {/* Nutrition */}
            <section className="p-6">
              <h3 className="flex items-center gap-2 font-serif text-lg font-bold text-forest">
                <FlaskConical className="size-5 text-teal-dark" /> Nutrition Facts
              </h3>
              <div className="mt-3 overflow-hidden rounded-xl border">
                <table className="w-full text-sm">
                  <thead className="bg-forest text-forest-foreground">
                    <tr>
                      <th className="px-4 py-2 text-left font-semibold">Component</th>
                      <th className="px-4 py-2 text-right font-semibold">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {d.nutrition.map((n, i) => (
                      <tr key={n.label} className={i % 2 === 0 ? "bg-card" : "bg-cream-alt"}>
                        <td className="px-4 py-2 text-muted-foreground">{n.label}</td>
                        <td className="px-4 py-2 text-right font-medium text-forest">{n.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Usage & Storage */}
            <section className="grid gap-4 p-6 sm:grid-cols-2">
              <div>
                <h3 className="flex items-center gap-2 font-serif text-lg font-bold text-forest">
                  <Flame className="size-5 text-ghee" /> How to Use
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{d.usage}</p>
              </div>
              <div>
                <h3 className="flex items-center gap-2 font-serif text-lg font-bold text-forest">
                  <Package className="size-5 text-gold" /> Storage
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{d.storage}</p>
              </div>
            </section>

          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
