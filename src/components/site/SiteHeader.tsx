import { Link } from "@tanstack/react-router";
import { Heart, Menu, Phone, Search, ShoppingBag, Sparkles, User, X } from "lucide-react";
import { toast } from "sonner";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { AnnouncementBar } from "./AnnouncementBar";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Home", exact: true },
  { to: "/shop", label: "Shop", exact: false },
  { to: "/about", label: "About", exact: false },
] as const;

// Coming-soon nav entries that show in mobile drawer too
const NAV_SOON = [
  { label: "Benefits", icon: Sparkles },
  { label: "Contact", icon: Phone },
] as const;

const soon = (what: string) => () => toast(`${what} is coming soon`);

export function SiteHeader() {
  const { count, setOpen } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Shadow header on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Close drawer on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header className={cn("sticky top-0 z-40 transition-shadow duration-300", scrolled && "shadow-[0_2px_24px_-4px_color-mix(in_oklab,var(--forest)_30%,transparent)]")}>
        <AnnouncementBar />

        <div className="bg-forest text-forest-foreground">
          <div className="container-brand flex h-16 items-center justify-between gap-4 md:h-18">

            {/* ── Left: hamburger + logo ── */}
            <div className="flex items-center gap-2">
              <Button
                variant="onForest"
                size="icon"
                className="md:hidden"
                aria-label="Open menu"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen(true)}
              >
                <Menu className="size-5" />
              </Button>
              <Logo />
            </div>

            {/* ── Centre: desktop nav ── */}
            <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
              {NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  activeOptions={{ exact: item.exact }}
                  className="relative rounded-lg px-4 py-2 text-sm font-medium tracking-wide transition-colors hover:text-gold-light"
                  activeProps={{ className: "text-gold-light after:scale-x-100" }}
                  inactiveProps={{ className: "after:scale-x-0" }}
                >
                  <span className="relative">
                    {item.label}
                    <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-300 group-[.active]:scale-x-100" />
                  </span>
                </Link>
              ))}

              {NAV_SOON.map(({ label, icon: Icon }) => (
                <button
                  key={label}
                  type="button"
                  onClick={soon(label)}
                  className="relative rounded-lg px-4 py-2 text-sm font-medium tracking-wide text-forest-foreground/70 transition-colors hover:text-gold-light"
                >
                  {label}
                </button>
              ))}
            </nav>

            {/* ── Right: icon actions ── */}
            <div className="flex items-center gap-0.5">
              <Button variant="onForest" size="icon" aria-label="Search" onClick={soon("Search")} className="hidden sm:inline-flex">
                <Search className="size-4.5" />
              </Button>
              <Button variant="onForest" size="icon" aria-label="Your account" className="hidden sm:inline-flex" onClick={soon("Your account")}>
                <User className="size-4.5" />
              </Button>
              <Button variant="onForest" size="icon" aria-label="Wishlist" className="hidden sm:inline-flex" onClick={soon("Wishlist")}>
                <Heart className="size-4.5" />
              </Button>

              {/* Divider */}
              <span className="mx-1 hidden h-5 w-px bg-gold/20 sm:block" aria-hidden="true" />

              <Button
                variant="onForest"
                size="icon"
                aria-label={`Cart${count > 0 ? `, ${count} items` : ""}`}
                className="relative"
                onClick={() => setOpen(true)}
                data-cart-icon
              >
                <ShoppingBag className="size-5" />
                {count > 0 && (
                  <span data-cart-badge className="absolute -right-0.5 -top-0.5 flex min-w-5 items-center justify-center rounded-full bg-ghee px-1 text-[0.68rem] font-bold leading-none text-forest py-0.5">
                    {count > 99 ? "99+" : count}
                  </span>
                )}
              </Button>
            </div>
          </div>

          {/* Gold hairline */}
          <div className="gold-hairline" />
        </div>
      </header>

      {/* ── Mobile drawer overlay ── */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-50 bg-forest/60 backdrop-blur-sm"
          aria-hidden="true"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* ── Mobile drawer panel ── */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-forest text-forest-foreground shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          menuOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between p-4 pb-0">
          <Logo />
          <Button
            variant="onForest"
            size="icon"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          >
            <X className="size-5" />
          </Button>
        </div>

        <div className="gold-hairline mx-4 my-5" />

        {/* Primary nav */}
        <nav className="flex flex-col gap-1 px-3" aria-label="Mobile">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.exact }}
              className="rounded-xl px-4 py-3 font-serif text-lg transition-colors hover:bg-forest-hover"
              activeProps={{ className: "bg-forest-hover text-gold-light" }}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}

          {NAV_SOON.map(({ label, icon: Icon }) => (
            <button
              key={label}
              type="button"
              onClick={() => { setMenuOpen(false); soon(label)(); }}
              className="flex items-center gap-3 rounded-xl px-4 py-3 font-serif text-lg text-forest-foreground/60 transition-colors hover:bg-forest-hover hover:text-forest-foreground"
            >
              <Icon className="size-5" aria-hidden="true" />
              {label}
              <span className="ml-auto rounded-full bg-gold/20 px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wider text-gold-light">
                Soon
              </span>
            </button>
          ))}
        </nav>

        <div className="gold-hairline mx-4 my-5" />

        {/* Secondary actions */}
        <div className="flex flex-col gap-1 px-3">
          {[
            { icon: Search, label: "Search" },
            { icon: User, label: "Your account" },
            { icon: Heart, label: "Wishlist" },
          ].map(({ icon: Icon, label }) => (
            <button
              key={label}
              type="button"
              onClick={() => { setMenuOpen(false); soon(label)(); }}
              className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm text-forest-foreground/70 transition-colors hover:bg-forest-hover hover:text-forest-foreground"
            >
              <Icon className="size-4.5" aria-hidden="true" />
              {label}
            </button>
          ))}
        </div>

        {/* Drawer footer */}
        <div className="mt-auto border-t border-gold/10 px-5 py-5">
          <p className="text-[0.65rem] uppercase tracking-[0.2em] text-gold-light/70">
            100% Pure · Traditional · Homemade
          </p>
          <p className="mt-1 text-xs text-forest-foreground/50">
            Pure • Natural • Traditional
          </p>
        </div>
      </div>
    </>
  );
}
