/**
 * Sri Parvathi Ghee product catalog and pricing rules.
 * Prices are in INR and inclusive of GST.
 * (Phase 2 moves products into the database; these values seed it.)
 */
import jarImage1 from "@/assets/ghee_1_ayudha_pooja_jar_4k.png";
import jarImage2 from "@/assets/ghee_2_small_jar_4k.png";
import jarImage3 from "@/assets/ghee_3_large_jar_4k.png";
import jarImage4 from "@/assets/ghee_4_all_jars_group_4k.png";
import jarImage5 from "@/assets/ghee_5_single_jar_closeup_4k.png";

export { jarImage2 as heroJarImage };

export const FREE_SHIPPING_THRESHOLD = 999; // free shipping on orders above ₹999

export type Product = {
  id: string;
  name: string;
  size: string;
  price: number;
  image: string;
  blurb: string;
};

export const PRODUCTS: Product[] = [
  {
    id: "cow-ghee-200ml",
    name: "Sri Parvathi Cow Ghee",
    size: "200 ml",
    price: 450,
    image: jarImage1,
    blurb: "Compact jar — perfect for gifting or trying for the first time.",
  },
  {
    id: "cow-ghee-500ml",
    name: "Sri Parvathi Cow Ghee",
    size: "500 ml",
    price: 1000,
    image: jarImage2,
    blurb: "Glass jar — the everyday jar for your kitchen.",
  },
  {
    id: "cow-ghee-1l",
    name: "Sri Parvathi Cow Ghee",
    size: "1 L",
    price: 2000,
    image: jarImage3,
    blurb: "The family size, for homes that cook with ghee every day.",
  },
  {
    id: "cow-ghee-multipack",
    name: "Sri Parvathi Cow Ghee",
    size: "Variety Pack",
    price: 2500,
    image: jarImage4,
    blurb: "Assorted jar sizes — great for the whole family or bulk orders.",
  },
  {
    id: "cow-ghee-500ml-premium",
    name: "Sri Parvathi Cow Ghee",
    size: "500 ml Premium",
    price: 1200,
    image: jarImage5,
    blurb: "Premium selection — same pure ghee in a special presentation.",
  },
];

/** Only the claims printed on the Sri Parvathi Ghee jar. Do not add others. */
export const PACKAGING_CLAIMS = [
  "Pure Cow Ghee",
  "No Added Preservatives",
  "Rich in Natural Nutrients",
  "100% Vegetarian",
] as const;

export function getProduct(id: string) {
  return PRODUCTS.find((p) => p.id === id);
}

export function formatINR(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export type CartLine = { id: string; qty: number };

export function cartSubtotal(lines: CartLine[]) {
  return lines.reduce((sum, l) => sum + (getProduct(l.id)?.price ?? 0) * l.qty, 0);
}

/** Free-shipping status for a cart subtotal (free only when strictly above the threshold). */
export function freeShippingStatus(subtotal: number) {
  const qualifies = subtotal > FREE_SHIPPING_THRESHOLD;
  const remaining = qualifies ? 0 : FREE_SHIPPING_THRESHOLD + 1 - subtotal;
  const percent = Math.min(100, Math.round((subtotal / (FREE_SHIPPING_THRESHOLD + 1)) * 100));
  return { qualifies, remaining, percent };
}
