/**
 * useSparkToCart
 *
 * Fires a glowing spark from a source element (the clicked "Add to Cart" button)
 * toward the navbar cart icon, then calls the real cart `add()` function.
 *
 * Uses the Web Animations API + CSS keyframes — no extra dependencies.
 * All DOM nodes are created and cleaned up imperatively to avoid React re-renders.
 *
 * Usage:
 *   const { sparkAdd } = useSparkToCart();
 *   <button onClick={(e) => sparkAdd(e.currentTarget, productId)} />
 */

import { useCallback, useRef } from "react";
import { useCart } from "@/lib/cart";

/** Find the cart icon in the navbar via its data attribute. */
function getCartIconRect(): DOMRect | null {
  const el = document.querySelector<HTMLElement>("[data-cart-icon]");
  return el ? el.getBoundingClientRect() : null;
}

/** Cubic bezier control points for a smooth arc trajectory. */
function cubicBezier(t: number, p0: number, p1: number, p2: number, p3: number) {
  const u = 1 - t;
  return u * u * u * p0 + 3 * u * u * t * p1 + 3 * u * t * t * p2 + t * t * t * p3;
}

interface SparkParticle {
  el: HTMLElement;
  startX: number;
  startY: number;
  startTime: number;
  duration: number;
  delay: number;
  cp1x: number;
  cp1y: number;
  cp2x: number;
  cp2y: number;
  endX: number;
  endY: number;
}

export function useSparkToCart() {
  const { add } = useCart();
  const inFlight = useRef(false);

  const sparkAdd = useCallback(
    (sourceEl: HTMLElement, productId: string, qty = 1) => {
      // Guard: call add() only once per click even if the callback fires multiple times
      if (inFlight.current) {
        add(productId, qty);
        return;
      }
      inFlight.current = true;

      const cartRect = getCartIconRect();
      const sourceRect = sourceEl.getBoundingClientRect();

      if (!cartRect || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        add(productId, qty);
        inFlight.current = false;
        return;
      }

      // Source centre
      const sx = sourceRect.left + sourceRect.width / 2;
      const sy = sourceRect.top + sourceRect.height / 2;
      // Target centre
      const tx = cartRect.left + cartRect.width / 2;
      const ty = cartRect.top + cartRect.height / 2;

      // Bezier control points — creates a natural upward arc
      const dx = tx - sx;
      const dy = ty - sy;
      const cp1x = sx + dx * 0.25;
      const cp1y = sy - Math.abs(dy) * 0.6 - Math.abs(dx) * 0.2;
      const cp2x = sx + dx * 0.75;
      const cp2y = ty - Math.abs(dy) * 0.3;

      const DURATION = 900; // ms — total spark travel time

      // ── Create the main spark orb ──
      const spark = document.createElement("div");
      spark.style.cssText = `
        position: fixed;
        z-index: 9999;
        pointer-events: none;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: radial-gradient(circle, #fff 0%, #d4a537 45%, rgba(212,165,55,0) 100%);
        box-shadow: 0 0 12px 4px rgba(212,165,55,0.8), 0 0 24px 8px rgba(212,165,55,0.4);
        transform: translate(-50%, -50%) scale(1);
        left: ${sx}px;
        top: ${sy}px;
        will-change: transform, opacity, left, top;
      `;
      document.body.appendChild(spark);

      // ── Trail particles ──
      const NUM_TRAILS = 6;
      const trails: SparkParticle[] = Array.from({ length: NUM_TRAILS }, (_, i) => {
        const el = document.createElement("div");
        const size = 6 + Math.random() * 6;
        const jitter = (Math.random() - 0.5) * 20;
        el.style.cssText = `
          position: fixed;
          z-index: 9998;
          pointer-events: none;
          width: ${size}px;
          height: ${size}px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(212,165,55,0.6) 60%, transparent 100%);
          transform: translate(-50%, -50%) scale(1);
          left: ${sx}px;
          top: ${sy}px;
          opacity: 0;
          will-change: transform, opacity, left, top;
        `;
        document.body.appendChild(el);
        return {
          el,
          startX: sx,
          startY: sy,
          startTime: performance.now() + i * 70,
          duration: DURATION * 0.75,
          delay: i * 0.08,
          cp1x: cp1x + jitter,
          cp1y: cp1y + jitter,
          cp2x: cp2x + jitter,
          cp2y: cp2y + jitter,
          endX: tx,
          endY: ty,
        };
      });

      // ── Add product to cart immediately — animation is fire-and-forget ──
      add(productId, qty);

      // ── rAF animation loop ──
      let startTime: number | null = null;
      let rafId: number;

      function animate(now: number) {
        if (!startTime) startTime = now;
        const elapsed = now - startTime;
        const t = Math.min(elapsed / DURATION, 1);

        // Ease: accelerate then decelerate (ease-in-out cubic)
        const te = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

        // Move main spark along bezier
        const cx = cubicBezier(te, sx, cp1x, cp2x, tx);
        const cy = cubicBezier(te, sy, cp1y, cp2y, ty);
        const scale = t < 0.85 ? 1 - t * 0.4 : (1 - t) / 0.15 * 0.6;
        const opacity = t < 0.85 ? 1 : (1 - t) / 0.15;

        spark.style.left = `${cx}px`;
        spark.style.top = `${cy}px`;
        spark.style.transform = `translate(-50%, -50%) scale(${Math.max(0, scale)})`;
        spark.style.opacity = `${Math.max(0, opacity)}`;

        // Move trail particles — each follows the same bezier but lagged
        for (const p of trails) {
          const pElapsed = now - p.startTime;
          if (pElapsed < 0) continue;
          const pt = Math.min(pElapsed / p.duration, 1);
          const pte = pt < 0.5 ? 4 * pt * pt * pt : 1 - Math.pow(-2 * pt + 2, 3) / 2;
          const px = cubicBezier(pte, p.startX, p.cp1x, p.cp2x, p.endX);
          const py = cubicBezier(pte, p.startY, p.cp1y, p.cp2y, p.endY);
          const ps = Math.max(0, 1 - pt * 1.2);
          const po = Math.max(0, pt < 0.7 ? pt * 1.2 : (1 - pt) / 0.3);
          p.el.style.left = `${px}px`;
          p.el.style.top = `${py}px`;
          p.el.style.transform = `translate(-50%, -50%) scale(${ps})`;
          p.el.style.opacity = `${po}`;
        }

        if (t < 1) {
          rafId = requestAnimationFrame(animate);
        } else {
          // Spark reached the cart — cleanup and trigger cart icon bounce
          spark.remove();
          trails.forEach((p) => p.el.remove());

          // Cart icon bounce
          const cartEl = document.querySelector<HTMLElement>("[data-cart-icon]");
          if (cartEl) {
            cartEl.style.animation = "none";
            // Force reflow
            void cartEl.offsetWidth;
            cartEl.style.animation = "cart-ping 400ms cubic-bezier(0.34,1.56,0.64,1) forwards, cart-glow 600ms ease forwards";
            setTimeout(() => {
              cartEl.style.animation = "";
              // Pop the count badge
              const badge = cartEl.querySelector<HTMLElement>("[data-cart-badge]");
              if (badge) {
                badge.style.animation = "none";
                void badge.offsetWidth;
                badge.style.animation = "count-pop 300ms cubic-bezier(0.34,1.56,0.64,1) forwards";
                setTimeout(() => { badge.style.animation = ""; }, 400);
              }
            }, 450);
          }

          inFlight.current = false;
        }
      }

      rafId = requestAnimationFrame(animate);

      // Safety cleanup after 2s in case something goes wrong
      setTimeout(() => {
        spark.remove();
        trails.forEach((p) => p.el.remove());
        cancelAnimationFrame(rafId);
        inFlight.current = false;
      }, 2000);
    },
    [add],
  );

  return { sparkAdd };
}
