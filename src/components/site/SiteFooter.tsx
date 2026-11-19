import { Link } from "@tanstack/react-router";
import { Leaf } from "lucide-react";
import { PACKAGING_CLAIMS } from "@/lib/catalog";
import { HillDivider } from "./HillDivider";
import { Logo } from "./Logo";

const SOCIAL = [
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true">
        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    icon: (
      <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "https://wa.me",
    icon: (
      <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
      </svg>
    ),
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="mt-auto">
      <HillDivider className="text-forest" />
      <div className="bg-forest text-forest-foreground">
        <div className="container-brand grid gap-10 py-12 md:grid-cols-4">

          {/* Brand column */}
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-4 font-script text-2xl text-gold-light">The Goodness of Pure Cow Milk</p>
            <p className="mt-2 max-w-sm text-sm opacity-85">
              A Legacy of Trust Since 70+ Years. Pure, natural, traditional cow ghee — from Amul to yours.
            </p>

            {/* Social links */}
            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-light/70">Follow us</p>
              <div className="mt-3 flex items-center gap-2">
                {SOCIAL.map(({ label, href, icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex size-9 items-center justify-center rounded-full border border-gold/20 text-forest-foreground/70 transition-colors duration-200 hover:border-gold/60 hover:bg-gold/10 hover:text-gold-light"
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Shop links */}
          <div>
            <h3 className="font-serif text-lg text-gold-light">Shop</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/shop" className="opacity-85 hover:opacity-100 hover:text-gold-light">All products</Link></li>
              <li><Link to="/shop" className="opacity-85 hover:opacity-100 hover:text-gold-light">Cow Ghee 500 ml</Link></li>
              <li><Link to="/shop" className="opacity-85 hover:opacity-100 hover:text-gold-light">Cow Ghee 1 L</Link></li>
              <li><Link to="/about" className="opacity-85 hover:opacity-100 hover:text-gold-light">Our Story</Link></li>
            </ul>
          </div>

          {/* Promise */}
          <div>
            <h3 className="font-serif text-lg text-gold-light">Our Promise</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {PACKAGING_CLAIMS.map((c) => (
                <li key={c} className="flex items-center gap-2 opacity-85">
                  <Leaf className="size-3.5 shrink-0 text-gold-light" aria-hidden="true" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="gold-hairline" />

        <div className="container-brand flex flex-col items-center justify-between gap-2 py-5 text-xs opacity-75 md:flex-row">
          <p>© {new Date().getFullYear()} Amul™ · The Taste of India</p>
          <p>Pure • Natural • Traditional</p>
        </div>
      </div>
    </footer>
  );
}
