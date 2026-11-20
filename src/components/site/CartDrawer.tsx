import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { formatINR, freeShippingStatus, getProduct } from "@/lib/catalog";
import { useCart } from "@/lib/cart";

type Step = "cart" | "checkout" | "confirmed";

interface CheckoutForm {
  name: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  paymentMethod: "cod" | "upi";
}

const EMPTY_FORM: CheckoutForm = {
  name: "", phone: "", address: "", city: "", pincode: "", paymentMethod: "cod",
};

export function CartDrawer() {
  const { lines, subtotal, isOpen, setOpen, setQty, remove } = useCart();
  const shipping = freeShippingStatus(subtotal);
  const [step, setStep] = useState<Step>("cart");
  const [form, setForm] = useState<CheckoutForm>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<CheckoutForm>>({});

  function handleClose(v: boolean) {
    if (!v) { setStep("cart"); setErrors({}); }
    setOpen(v);
  }

  function validate() {
    const e: Partial<CheckoutForm> = {};
    if (!form.name.trim()) e.name = "Required";
    if (!/^\d{10}$/.test(form.phone.trim())) e.phone = "Enter a valid 10-digit number";
    if (!form.address.trim()) e.address = "Required";
    if (!form.city.trim()) e.city = "Required";
    if (!/^\d{6}$/.test(form.pincode.trim())) e.pincode = "Enter a valid 6-digit pincode";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handlePlaceOrder() {
    if (!validate()) return;
    setStep("confirmed");
  }

  const field = (
    id: keyof CheckoutForm,
    label: string,
    type = "text",
    placeholder = "",
  ) => (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-xs font-semibold text-forest uppercase tracking-wide">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={form[id]}
        onChange={(e) => setForm((f) => ({ ...f, [id]: e.target.value }))}
        className="rounded-lg border border-input bg-card px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-forest/40"
      />
      {errors[id] && <p className="text-xs text-destructive">{errors[id]}</p>}
    </div>
  );

  return (
    <Sheet open={isOpen} onOpenChange={handleClose}>
      {/* Mobile: bottom sheet at 75vh. Desktop: right panel. */}
      <SheetContent className="flex w-full flex-col gap-0 bg-cream-alt p-0 inset-x-0 bottom-0 top-auto h-[75vh] rounded-t-3xl sm:inset-y-0 sm:right-0 sm:left-auto sm:top-0 sm:bottom-0 sm:h-full sm:max-w-md sm:rounded-none">

        {/* ── STEP: CART ── */}
        {step === "cart" && (
          <>
            <SheetHeader className="border-b p-5">
              <SheetTitle className="font-serif text-2xl text-forest">Your Cart</SheetTitle>
              <SheetDescription>Prices are inclusive of GST.</SheetDescription>
            </SheetHeader>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
                <span className="flex size-16 items-center justify-center rounded-full bg-teal-light text-forest">
                  <ShoppingBag className="size-7" aria-hidden="true" />
                </span>
                <p className="font-serif text-xl text-forest">Your cart is empty</p>
                <p className="text-sm text-muted-foreground">Add a jar of Sri Parvathi Cow Ghee to get started.</p>
                <Button variant="cta" asChild onClick={() => setOpen(false)}>
                  <Link to="/shop">Shop Ghee</Link>
                </Button>
              </div>
            ) : (
              <>
                {/* Free-shipping bar */}
                <div className="border-b px-5 py-4">
                  <p className="text-sm font-medium text-forest">
                    {shipping.qualifies
                      ? "🎉 You've unlocked free shipping!"
                      : `Add ${formatINR(shipping.remaining)} more for free shipping`}
                  </p>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-teal-light" role="progressbar" aria-valuenow={shipping.percent} aria-valuemin={0} aria-valuemax={100} aria-label="Free shipping progress">
                    <div className="h-full rounded-full bg-success transition-all duration-500" style={{ width: `${shipping.percent}%` }} />
                  </div>
                </div>

                {/* Line items */}
                <ul className="flex-1 divide-y overflow-y-auto px-5">
                  {lines.map((line) => {
                    const p = getProduct(line.id);
                    if (!p) return null;
                    return (
                      <li key={line.id} className="flex gap-4 py-4">
                        <img src={p.image} alt="" className="size-20 rounded-xl border bg-card object-contain p-1" />
                        <div className="flex flex-1 flex-col gap-2">
                          <div className="flex justify-between gap-2">
                            <div>
                              <p className="font-semibold text-forest">{p.name}</p>
                              <p className="text-sm text-muted-foreground">{p.size}</p>
                            </div>
                            <p className="font-semibold">{formatINR(p.price * line.qty)}</p>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center rounded-lg border bg-card">
                              <Button variant="ghost" size="icon" className="size-8" onClick={() => setQty(line.id, line.qty - 1)} aria-label="Decrease quantity">
                                <Minus />
                              </Button>
                              <span className="w-8 text-center text-sm font-semibold" aria-live="polite">{line.qty}</span>
                              <Button variant="ghost" size="icon" className="size-8" onClick={() => setQty(line.id, line.qty + 1)} aria-label="Increase quantity">
                                <Plus />
                              </Button>
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => remove(line.id)} aria-label={`Remove ${p.size} jar`} className="text-muted-foreground">
                              <Trash2 /> Remove
                            </Button>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>

                {/* Summary + proceed */}
                <div className="border-t bg-card p-5">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Subtotal</span>
                    <span>{formatINR(subtotal)}</span>
                  </div>
                  <div className="mt-1 flex justify-between text-sm text-muted-foreground">
                    <span>Shipping</span>
                    <span>{shipping.qualifies ? "Free" : "Calculated at checkout"}</span>
                  </div>
                  <Button variant="cta" size="xl" className="mt-4 w-full" onClick={() => setStep("checkout")}>
                    Proceed to Checkout →
                  </Button>
                </div>
              </>
            )}
          </>
        )}

        {/* ── STEP: CHECKOUT FORM ── */}
        {step === "checkout" && (
          <>
            <SheetHeader className="border-b p-5">
              <div className="flex items-center gap-3">
                <button onClick={() => setStep("cart")} className="text-muted-foreground hover:text-forest" aria-label="Back to cart">
                  <ArrowLeft className="size-5" />
                </button>
                <div>
                  <SheetTitle className="font-serif text-2xl text-forest">Checkout</SheetTitle>
                  <SheetDescription>Fill in your delivery details.</SheetDescription>
                </div>
              </div>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-4">
              {/* Order summary */}
              <div className="rounded-xl border bg-card p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Order Summary</p>
                {lines.map((line) => {
                  const p = getProduct(line.id);
                  if (!p) return null;
                  return (
                    <div key={line.id} className="flex justify-between text-sm py-1">
                      <span className="text-forest">{p.name} {p.size} × {line.qty}</span>
                      <span className="font-semibold">{formatINR(p.price * line.qty)}</span>
                    </div>
                  );
                })}
                <div className="mt-2 border-t pt-2 flex justify-between font-semibold">
                  <span>Total</span>
                  <span className="text-forest">{formatINR(subtotal)}</span>
                </div>
              </div>

              {/* Delivery details */}
              <p className="text-sm font-bold text-forest">Delivery Details</p>
              {field("name", "Full Name", "text", "e.g. Arun Kumar")}
              {field("phone", "Phone Number", "tel", "10-digit mobile number")}
              {field("address", "Address", "text", "House / Street / Area")}
              <div className="grid grid-cols-2 gap-3">
                {field("city", "City", "text", "City")}
                {field("pincode", "Pincode", "text", "6-digit pincode")}
              </div>

              {/* Payment method */}
              <div className="flex flex-col gap-2">
                <p className="text-xs font-semibold text-forest uppercase tracking-wide">Payment Method</p>
                <div className="grid grid-cols-2 gap-3">
                  {(["cod", "upi"] as const).map((m) => (
                    <label
                      key={m}
                      className={`flex cursor-pointer items-center gap-2 rounded-xl border p-3 text-sm font-medium transition-colors ${form.paymentMethod === m ? "border-forest bg-teal-light text-forest" : "border-input bg-card text-muted-foreground"}`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={m}
                        checked={form.paymentMethod === m}
                        onChange={() => setForm((f) => ({ ...f, paymentMethod: m }))}
                        className="accent-forest"
                      />
                      {m === "cod" ? "Cash on Delivery" : "UPI / QR Code"}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t bg-card p-5">
              <Button variant="cta" size="xl" className="w-full" onClick={handlePlaceOrder}>
                Place Order · {formatINR(subtotal)}
              </Button>
            </div>
          </>
        )}

        {/* ── STEP: ORDER CONFIRMED ── */}
        {step === "confirmed" && (
          <div className="flex flex-1 flex-col items-center justify-center gap-5 p-8 text-center">
            <span className="flex size-20 items-center justify-center rounded-full bg-teal-light text-success">
              <CheckCircle2 className="size-10" />
            </span>
            <div>
              <p className="font-serif text-2xl font-bold text-forest">Order Placed!</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Thank you, <strong>{form.name}</strong>! We'll deliver your Sri Parvathi Ghee to{" "}
                <strong>{form.city}</strong> shortly.
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                We'll call you on <strong>{form.phone}</strong> to confirm.
              </p>
            </div>
            <Button
              variant="cta"
              onClick={() => {
                setStep("cart");
                setForm(EMPTY_FORM);
                setErrors({});
                setOpen(false);
              }}
            >
              Continue Shopping
            </Button>
          </div>
        )}

      </SheetContent>
    </Sheet>
  );
}
