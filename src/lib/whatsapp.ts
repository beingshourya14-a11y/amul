import { WHATSAPP_NUMBER } from "./config";
import type { CartLine } from "./catalog";
import { getProduct, formatINR } from "./catalog";

function waUrl(text: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

/** Pre-filled message for a single product */
export function productWaUrl(name: string, size: string, price: number) {
  return waUrl(`Hi, I want to order Sri Parvathi Cow Ghee ${size} (${formatINR(price)})`);
}

/** Pre-filled message for the whole cart */
export function cartWaUrl(lines: CartLine[], subtotal: number) {
  const items = lines
    .map((l) => {
      const p = getProduct(l.id);
      if (!p) return null;
      return `• ${p.name} ${p.size} × ${l.qty} = ${formatINR(p.price * l.qty)}`;
    })
    .filter(Boolean)
    .join("\n");

  const text = `Hi, I want to place an order on Sri Parvathi Ghee:\n\n${items}\n\nTotal: ${formatINR(subtotal)}\n\nPlease confirm availability and delivery details. Thank you!`;
  return waUrl(text);
}

/** Pre-filled message for the contact form */
export function contactWaUrl(name: string, phone: string, message: string) {
  const text = `Name: ${name}\nPhone: ${phone}\n\n${message}`;
  return waUrl(text);
}
