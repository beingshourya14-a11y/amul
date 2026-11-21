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
  /** URL-safe slug used in /product/:slug routes */
  slug: string;
  name: string;
  size: string;
  price: number;
  image: string;
  blurb: string;
  details?: {
    description: string;
    highlights: string[];
    nutrition: { label: string; value: string }[];
    usage: string;
    storage: string;
  };
};

const COMMON_DETAILS = {
  highlights: [
    "100% Pure Cow Ghee — no adulterants",
    "No added preservatives or colours",
    "Rich in natural fat-soluble vitamins A, D, E & K",
    "100% Vegetarian — certified green mark",
    "Traditional bilona / butter-clarified process",
    "Best before 6 months from date of manufacture",
  ],
  nutrition: [
    { label: "Fat", value: "99.8%" },
    { label: "Moisture", value: "0.1%" },
    { label: "Free Fatty Acid", value: "≤ 0.5%" },
    { label: "Peroxide Value", value: "≤ 0.6 meq/kg" },
    { label: "Sodium", value: "110 mg / 100 g" },
    { label: "Energy", value: "~900 kcal / 100 g" },
  ],
  usage: "Ideal for cooking, tempering dals, spreading on rotis, and traditional sweets. Use at medium heat to preserve nutrients.",
  storage: "Store in a cool, dry place away from direct sunlight. Refrigeration not required.",
};

export const PRODUCTS: Product[] = [
  {
    id: "cow-ghee-200ml",
    slug: "cow-ghee-200ml",
    name: "Sri Parvathi Cow Ghee",
    size: "200 ml",
    price: 450,
    image: jarImage1,
    blurb: "Compact jar — perfect for gifting or trying for the first time.",
    details: {
      description: "Our 200 ml jar is the perfect introduction to Sri Parvathi Ghee — compact enough to gift, pure enough to trust. Made from fresh cow butter using the traditional clarification method, every drop carries the authentic flavour of homemade ghee.",
      ...COMMON_DETAILS,
    },
  },
  {
    id: "cow-ghee-500ml",
    slug: "cow-ghee-500ml",
    name: "Sri Parvathi Cow Ghee",
    size: "500 ml",
    price: 1000,
    image: jarImage2,
    blurb: "Glass jar — the everyday jar for your kitchen.",
    details: {
      description: "The 500 ml jar is our most popular size — just right for a family of four. Pure cow ghee with its natural golden colour and rich aroma, made with no added preservatives. A staple in every South Indian kitchen.",
      ...COMMON_DETAILS,
    },
  },
  {
    id: "cow-ghee-1l",
    slug: "cow-ghee-1l",
    name: "Sri Parvathi Cow Ghee",
    size: "1 L",
    price: 2000,
    image: jarImage3,
    blurb: "The family size, for homes that cook with ghee every day.",
    details: {
      description: "For households that cook with ghee every day, the 1 L jar ensures you never run short. Same pure, traditional cow ghee — just more of it. Best value for regular use.",
      ...COMMON_DETAILS,
    },
  },
  {
    id: "cow-ghee-multipack",
    slug: "cow-ghee-variety-pack",
    name: "Sri Parvathi Cow Ghee",
    size: "Variety Pack",
    price: 2500,
    image: jarImage4,
    blurb: "Assorted jar sizes — great for the whole family or bulk orders.",
    details: {
      description: "Can't decide on a size? Our Variety Pack includes an assortment of jar sizes — ideal for families who need different quantities, or as a thoughtful gift set. All jars carry the same Sri Parvathi purity promise.",
      ...COMMON_DETAILS,
    },
  },
  {
    id: "cow-ghee-500ml-premium",
    slug: "cow-ghee-500ml-premium",
    name: "Sri Parvathi Cow Ghee",
    size: "500 ml Premium",
    price: 1200,
    image: jarImage5,
    blurb: "Premium selection — same pure ghee in a special presentation.",
    details: {
      description: "Our premium 500 ml offering comes in a special presentation jar — the same authentic Sri Parvathi Ghee you trust, presented beautifully. Perfect for festivals, gifting, or treating yourself.",
      ...COMMON_DETAILS,
    },
  },
];

/** Look up a product by its URL slug */
export function getProductBySlug(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

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
