declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** Fires a GA4 event via the gtag.js snippet already loaded in the root
 * layout. Safe to call even before gtag has loaded (e.g. slow connection,
 * ad blocker) — silently does nothing rather than throwing. These events
 * (generate_lead, contact, call) are GA4's own recommended event names,
 * so once this site is linked to Google Ads, they can be imported
 * directly as conversion actions without any further code changes. */
export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}
