import { Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { formatINR, freeShippingStatus, getProduct } from "@/lib/catalog";
import { useCart } from "@/lib/cart";

export function CartDrawer() {
  const { lines, subtotal, isOpen, setOpen, setQty, remove } = useCart();
  const shipping = freeShippingStatus(subtotal);

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent className="flex w-full flex-col gap-0 bg-cream-alt p-0 sm:max-w-md">
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
            <div className="border-b px-5 py-4">
              <p className="text-sm font-medium text-forest">
                {shipping.qualifies
                  ? "You've unlocked free shipping!"
                  : `Add ${formatINR(shipping.remaining)} more for free shipping`}
              </p>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-teal-light" role="progressbar" aria-valuenow={shipping.percent} aria-valuemin={0} aria-valuemax={100} aria-label="Free shipping progress">
                <div className="h-full rounded-full bg-success transition-all duration-500" style={{ width: `${shipping.percent}%` }} />
              </div>
            </div>
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
            <div className="border-t bg-card p-5">
              <div className="flex justify-between text-lg font-semibold">
                <span>Subtotal</span>
                <span>{formatINR(subtotal)}</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">Shipping and coupons are applied at checkout.</p>
              <Button variant="cta" size="xl" className="mt-4 w-full" disabled>
                Checkout — coming soon
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
