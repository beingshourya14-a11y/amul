import { Award, Leaf, ShieldCheck, Sprout, Truck, Wallet } from "lucide-react";
import { FREE_SHIPPING_THRESHOLD, formatINR } from "@/lib/catalog";

const ITEMS = [
  { icon: Truck, text: `Free shipping above ${formatINR(FREE_SHIPPING_THRESHOLD)}` },
  { icon: Wallet, text: "Cash on Delivery available" },
  { icon: ShieldCheck, text: "No added preservatives" },
  { icon: Sprout, text: "Rich in natural nutrients" },
  { icon: Leaf, text: "100% Vegetarian" },
  { icon: Award, text: "10+ years of trust" },
  { icon: Truck, text: `Free shipping above ${formatINR(FREE_SHIPPING_THRESHOLD)}` },
  { icon: Wallet, text: "Cash on Delivery available" },
  { icon: ShieldCheck, text: "No added preservatives" },
  { icon: Sprout, text: "Rich in natural nutrients" },
  { icon: Leaf, text: "100% Vegetarian" },
  { icon: Award, text: "10+ years of trust" },
];

export function AnnouncementBar() {
  return (
    <div className="bg-ghee text-forest overflow-hidden" aria-label="Site announcements">
      <div className="flex animate-marquee gap-0 py-2 will-change-transform">
        {ITEMS.map(({ icon: Icon, text }, i) => (
          <span
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            className="inline-flex shrink-0 items-center gap-1.5 px-6 text-xs font-semibold md:text-sm"
          >
            <Icon className="size-3.5 shrink-0" aria-hidden="true" />
            {text}
            <span className="ml-6 opacity-40" aria-hidden="true">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
