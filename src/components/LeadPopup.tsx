"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { X, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { useWhatsAppSubmit } from "@/lib/useWhatsAppSubmit";

const STORAGE_KEY = "lead-popup-dismissed";
const DELAY_MS = 8000;
// Pages where a popup asking "want to book?" would be redundant or
// intrusive — the visitor is either already booking, or this is a legal/
// admin page that shouldn't show marketing chrome.
const SKIP_PREFIXES = ["/booking", "/admin"];

export default function LeadPopup({ vehicleNames }: { vehicleNames: string[] }) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const { sent, handleSubmit } = useWhatsAppSubmit((form) => {
    const lines = [
      "Hi, I'd like to enquire about a booking.",
      `Name: ${form.get("name")}`,
      `Phone: ${form.get("phone")}`,
      form.get("vehicle") && `Vehicle: ${form.get("vehicle")}`,
      form.get("date") && `Date: ${form.get("date")}`,
    ].filter(Boolean);
    return lines.join("\n");
  });

  useEffect(() => {
    if (SKIP_PREFIXES.some((p) => pathname.startsWith(p))) return;
    // Reads sessionStorage, a browser-only API — see CookieConsent for the
    // same one-tick-later pattern.
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    const timer = setTimeout(() => setVisible(true), DELAY_MS);
    return () => clearTimeout(timer);
  }, [pathname]);

  function dismiss() {
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // Private browsing / storage blocked — still dismiss for this view.
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[95] flex items-center justify-center bg-forest-950/60 p-4"
      onClick={dismiss}
      role="dialog"
      aria-modal="true"
      aria-label="Quick enquiry"
    >
      <div
        className="relative w-full max-w-md rounded-3xl bg-ivory-50 p-7 shadow-luxury sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Close"
          onClick={dismiss}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-forest-900/60 transition-colors hover:bg-forest-950/5 hover:text-forest-950"
        >
          <X className="h-5 w-5" />
        </button>

        {sent ? (
          <div className="flex flex-col items-center gap-3 py-6 text-center">
            <h3 className="font-serif-luxury text-2xl text-forest-950">Sent on WhatsApp</h3>
            <p className="text-sm text-forest-900/70">
              Our team will confirm your vehicle and price shortly.
            </p>
          </div>
        ) : (
          <>
            <h3 className="font-serif-luxury text-2xl text-forest-950">Plan your trip?</h3>
            <p className="mt-1.5 text-sm text-forest-900/70">
              Share a few details and we&apos;ll confirm a vehicle and price on WhatsApp.
            </p>
            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
              <FormField label="Name" name="name" required />
              <FormField label="Phone Number" name="phone" type="tel" required />
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-medium uppercase tracking-wide text-forest-900/70">
                  Which Vehicle
                </span>
                <select
                  name="vehicle"
                  defaultValue=""
                  className="rounded-xl border border-forest-950/12 bg-ivory px-4 py-3 text-sm text-forest-950 outline-none transition-colors focus:border-terracotta-500"
                >
                  <option value="">Not sure yet</option>
                  {vehicleNames.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </label>
              <FormField label="Travel Date" name="date" type="date" />
              <Button type="submit" variant="shine" className="mt-1 w-full justify-center" icon={<ArrowRight className="h-4 w-4" />}>
                Send on WhatsApp
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
