import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatINR, type Product } from "@/lib/catalog";
import { useCart } from "@/lib/cart";
import { VegMark } from "./VegMark";
import { ProductDetailDialog } from "./ProductDetailDialog";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <>
      <article
        className="card-brand flex flex-col overflow-hidden cursor-pointer group"
        onClick={() => setOpen(true)}
        role="button"
        tabIndex={0}
        aria-label={`View details for ${product.name} ${product.size}`}
        onKeyDown={(e) => e.key === "Enter" && setOpen(true)}
      >
        <div className="relative overflow-hidden">
          <span className="absolute left-4 top-4 rounded-full bg-forest px-3 py-1 text-xs font-semibold text-forest-foreground z-10">
            {product.size}
          </span>
          <VegMark className="absolute right-4 top-4 bg-card z-10" />
          <img
            src={product.image}
            alt={`${product.name} ${product.size} glass jar`}
            loading="lazy"
            width={400}
            height={400}
            className="aspect-[4/3] w-full object-contain bg-cream-alt p-4 transition-transform duration-500 group-hover:scale-105"
          />
          {/* Hover overlay hint */}
          <div className="absolute inset-0 bg-forest/0 group-hover:bg-forest/5 transition-colors duration-300" />
        </div>
        <div className="flex flex-1 flex-col gap-3 p-5">
          <div>
            <h3 className="text-xl font-bold text-forest">
              {product.name}{" "}
              <span className="font-sans text-base font-medium text-muted-foreground">· {product.size}</span>
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">{product.blurb}</p>
          </div>
          <div className="mt-auto flex items-end justify-between gap-3">
            <div>
              <p className="text-2xl font-bold text-foreground">{formatINR(product.price)}</p>
              <p className="text-xs text-muted-foreground">Inclusive of GST</p>
            </div>
            <Button
              variant="cta"
              onClick={(e) => { e.stopPropagation(); add(product.id); }}
              aria-label={`Add ${product.size} jar to cart`}
            >
              <ShoppingBag /> Add to Cart
            </Button>
          </div>
        </div>
      </article>

      <ProductDetailDialog product={product} open={open} onClose={() => setOpen(false)} />
    </>
  );
}
