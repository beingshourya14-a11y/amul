import { useState, useEffect } from "react";
import { MapPin, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { SERVICEABLE_PREFIXES } from "@/lib/config";
import { productWaUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "sri-parvathi-last-pincode";

function loadSaved(): string {
  try {
    return window.localStorage.getItem(STORAGE_KEY) ?? "";
  } catch {
    return "";
  }
}
function savePincode(pin: string) {
  try {
    window.localStorage.setItem(STORAGE_KEY, pin);
  } catch {
    /* ignore */
  }
}

type Status = "idle" | "checking" | "available" | "unavailable";

interface Props {
  /** compact: used inside cart drawer; default: used on product page */
  compact?: boolean;
}

export function PincodeChecker({ compact = false }: Props) {
  const [pin, setPin] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  // Restore last pincode
  useEffect(() => {
    const saved = loadSaved();
    if (saved) {
      setPin(saved);
      check(saved, false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function check(value: string, save = true) {
    const v = value.trim();
    if (!/^\d{6}$/.test(v)) {
      setStatus("idle");
      return;
    }
    setStatus("checking");
    // Simulate async (keeps the door open for a real API later)
    setTimeout(() => {
      const prefix = v.slice(0, 2);
      const ok = SERVICEABLE_PREFIXES.includes(prefix);
      setStatus(ok ? "available" : "unavailable");
      if (save) savePincode(v);
    }, 300);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value.replace(/\D/g, "").slice(0, 6);
    setPin(v);
    if (v.length < 6) setStatus("idle");
  }

  function handleKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") check(pin);
  }

  return (
    <div className={cn("rounded-xl border bg-card p-4", compact && "rounded-lg p-3")}>
      <div className="flex items-center gap-2 mb-2">
        <MapPin className="size-4 text-forest shrink-0" />
        <span className={cn("font-semibold text-forest", compact ? "text-xs" : "text-sm")}>
          Check delivery
        </span>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          inputMode="numeric"
          pattern="\d*"
          maxLength={6}
          placeholder="Enter 6-digit pincode"
          value={pin}
          onChange={handleChange}
          onKeyDown={handleKey}
          aria-label="Pincode"
          className={cn(
            "flex-1 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-forest/40",
            compact ? "h-9" : "h-10",
          )}
        />
        <button
          type="button"
          onClick={() => check(pin)}
          disabled={pin.length !== 6}
          className={cn(
            "rounded-lg bg-forest px-4 font-semibold text-forest-foreground transition-opacity",
            "disabled:opacity-40 hover:opacity-90",
            compact ? "h-9 text-xs" : "h-10 text-sm",
          )}
        >
          {status === "checking" ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            "Check"
          )}
        </button>
      </div>

      {/* Result */}
      {status === "available" && (
        <div className="mt-2 flex items-start gap-1.5 text-sm text-success">
          <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
          <span>Delivery available in 3–5 days · COD available</span>
        </div>
      )}
      {status === "unavailable" && (
        <div className="mt-2 text-sm text-destructive">
          <div className="flex items-start gap-1.5">
            <XCircle className="mt-0.5 size-4 shrink-0" />
            <span>Sorry, we don't deliver to this pincode yet.</span>
          </div>
          <a
            href={productWaUrl("Sri Parvathi Cow Ghee", "", 0)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-forest underline underline-offset-2"
          >
            Order on WhatsApp — we'll try to help →
          </a>
        </div>
      )}
    </div>
  );
}
