import { describe, expect, it } from "vitest";
import { cartSubtotal, freeShippingStatus, getProduct } from "@/lib/catalog";

describe("Dhenora pricing", () => {
  it("prices the 500 ml jar at ₹1,000", () => {
    expect(getProduct("cow-ghee-500ml")?.price).toBe(1000);
  });

  it("prices the 1 L jar at ₹2,000", () => {
    expect(getProduct("cow-ghee-1l")?.price).toBe(2000);
  });

  it("adds up cart lines by quantity", () => {
    expect(cartSubtotal([{ id: "cow-ghee-500ml", qty: 2 }, { id: "cow-ghee-1l", qty: 1 }])).toBe(4000);
  });

  it("gives free shipping on orders above ₹999", () => {
    expect(freeShippingStatus(1000).qualifies).toBe(true);
  });

  it("does not give free shipping at ₹999 or below", () => {
    expect(freeShippingStatus(999).qualifies).toBe(false);
  });
});
