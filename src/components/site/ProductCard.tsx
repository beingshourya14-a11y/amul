import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatINR, type Product } from "@/lib/catalog";
import { useCart } from "@/lib/cart";
import { VegMark } from "./VegMark";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  return (
    <article className="card-brand flex flex-col overflow-hidden">
      <div className="relative overflow-hidden">
        <span className="absolute left-4 top-4 rounded-full bg-forest px-3 py-1 text-xs font-semibold text-forest-foreground">
          {product.size}
        </span>
        <VegMark className="absolute right-4 top-4 bg-card" />
        <img
          src={product.image}
          alt={`${product.name} ${product.size} glass jar with gold lid`}
          loading="lazy"
          width={400}
          height={400}
          className="aspect-[4/3] w-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="text-xl font-bold text-forest">
            {product.name} <span className="font-sans text-base font-medium text-muted-foreground">· {product.size}</span>
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">{product.blurb}</p>
        </div>
        <div className="mt-auto flex items-end justify-between gap-3">
          <div>
            <p className="text-2xl font-bold text-foreground">{formatINR(product.price)}</p>
            <p className="text-xs text-muted-foreground">Inclusive of GST</p>
          </div>
          <Button variant="cta" onClick={() => add(product.id)} aria-label={`Add ${product.size} jar to cart`}>
            <ShoppingBag /> Add to Cart
          </Button>
        </div>
      </div>
    </article>
  );
}
