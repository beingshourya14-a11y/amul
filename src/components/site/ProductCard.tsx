import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatINR, type Product } from "@/lib/catalog";
import { productWaUrl } from "@/lib/whatsapp";
import { useSparkToCart } from "@/lib/use-spark-to-cart";
import { VegMark } from "./VegMark";
import { ProductDetailDialog } from "./ProductDetailDialog";

/** Inline WhatsApp SVG to avoid an extra icon dep */
function WaIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-3.5 fill-current shrink-0" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const { sparkAdd } = useSparkToCart();
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
          <div className="absolute inset-0 bg-forest/0 group-hover:bg-forest/5 transition-colors duration-300" />
        </div>

        <div className="flex flex-1 flex-col gap-2 p-3 md:p-5">
          <div>
            <h3 className="text-sm font-bold text-forest md:text-xl">
              {product.name}{" "}
              <span className="font-sans text-xs font-medium text-muted-foreground md:text-base">· {product.size}</span>
            </h3>
            <p className="mt-0.5 hidden text-sm text-muted-foreground md:block">{product.blurb}</p>
          </div>

          <div className="mt-auto flex flex-col gap-2">
            <div className="flex items-end justify-between gap-2">
              <div>
                <p className="text-lg font-bold text-foreground md:text-2xl">{formatINR(product.price)}</p>
                <p className="text-[0.6rem] text-muted-foreground md:text-xs">Incl. GST</p>
              </div>
              <Button
                variant="cta"
                size="sm"
                className="min-h-[44px] text-xs md:text-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  sparkAdd(e.currentTarget, product.id);
                }}
                aria-label={`Add ${product.size} jar to cart`}
              >
                <ShoppingBag className="size-3 md:size-4" />
                <span className="hidden sm:inline">Add to Cart</span>
                <span className="sm:hidden">Add</span>
              </Button>
            </div>

            {/* WhatsApp order button */}
            <a
              href={productWaUrl(product.name, product.size, product.price)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex min-h-[44px] items-center justify-center gap-1.5 rounded-lg border border-[#25D366] bg-[#25D366]/10 px-3 py-2 text-xs font-semibold text-[#1a8a44] transition-colors hover:bg-[#25D366]/20 md:text-sm"
            >
              <WaIcon />
              <span className="hidden sm:inline">Order on WhatsApp</span>
              <span className="sm:hidden">WhatsApp</span>
            </a>

            {/* Full details link */}
            <Link
              to="/product/$slug"
              params={{ slug: product.slug }}
              onClick={(e) => e.stopPropagation()}
              className="text-center text-xs font-medium text-forest/60 underline underline-offset-2 hover:text-forest"
            >
              Full details →
            </Link>
          </div>
        </div>
      </article>

      <ProductDetailDialog product={product} open={open} onClose={() => setOpen(false)} />
    </>
  );
}
