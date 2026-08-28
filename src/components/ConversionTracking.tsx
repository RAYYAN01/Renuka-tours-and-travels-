"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

/** Fires GA4 conversion-style events for the two things that actually
 * matter to this business: someone tapping "call" and someone tapping
 * "WhatsApp". A single delegated click listener catches every tel:/wa.me
 * link on the site automatically — the floating WhatsApp button, the
 * navbar/footer/MobileCtaBar phone links, every "Chat on WhatsApp" /
 * "Get Quote on WhatsApp" button — with no per-component wiring, and it
 * keeps working for any new one added later without touching this file. */
export default function ConversionTracking() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const link = (e.target as HTMLElement).closest("a[href]");
      if (!(link instanceof HTMLAnchorElement)) return;

      if (link.href.startsWith("tel:")) {
        trackEvent("call", { link_url: link.href });
      } else if (link.href.includes("wa.me") || link.href.includes("api.whatsapp.com")) {
        trackEvent("contact", { method: "whatsapp", link_url: link.href });
      }
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
