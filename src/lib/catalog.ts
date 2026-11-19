/**
 * Amul product catalog and pricing rules.
 * Prices are in INR and inclusive of GST.
 * (Phase 2 moves products into the database; these values seed it.)
 */
import jarImage from "@/assets/ghee-jar.jpg";

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
    id: "cow-ghee-500ml",
    name: "Amul Cow Ghee",
    size: "500 ml",
    price: 1000,
    image: jarImage,
    blurb: "Glass jar with gold lid — the everyday jar for your kitchen.",
  },
  {
    id: "cow-ghee-1l",
    name: "Amul Cow Ghee",
    size: "1 L",
    price: 2000,
    image: jarImage,
    blurb: "The family size, for homes that cook with ghee every day.",
  },
];

/** Only the claims printed on the Amul jar. Do not add others. */
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
