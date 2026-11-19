import { createFileRoute } from "@tanstack/react-router";
import { ProductCard } from "@/components/site/ProductCard";
import { ClaimBadge } from "@/components/site/ClaimBadge";
import { SectionHeading } from "@/components/site/SectionHeading";
import { FREE_SHIPPING_THRESHOLD, formatINR, PACKAGING_CLAIMS, PRODUCTS } from "@/lib/catalog";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop Dhenora Cow Ghee — 500 ml & 1 L Jars" },
      {
        name: "description",
        content: "Buy Dhenora pure cow ghee online: 500 ml for ₹1,000 and 1 L for ₹2,000, inclusive of GST. Free shipping above ₹999.",
      },
      { property: "og:title", content: "Shop Dhenora Cow Ghee — 500 ml & 1 L Jars" },
      { property: "og:description", content: "Pure cow ghee in glass jars with gold lids. Cash on Delivery available." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Shop,
});

function Shop() {
  return (
    <section className="py-14 md:py-20">
      <div className="container-brand">
        <SectionHeading
          eyebrow="Shop"
          title="Dhenora Cow Ghee"
          subtitle={`Prices include GST. Free shipping on orders above ${formatINR(FREE_SHIPPING_THRESHOLD)}.`}
        />
        <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
          {PRODUCTS.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <div className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-2">
          {PACKAGING_CLAIMS.map((c) => (
            <ClaimBadge key={c} label={c} />
          ))}
        </div>
      </div>
    </section>
  );
}
