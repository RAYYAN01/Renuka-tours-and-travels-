"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie } from "lucide-react";

const STORAGE_KEY = "cookie-consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Reads localStorage, a browser-only API with no SSR-safe read — the
    // one-tick-later reveal is the intentional tradeoff (same pattern used
    // for query-param prefill elsewhere on this site).
    /* eslint-disable-next-line react-hooks/set-state-in-effect */
    if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
  }, []);

  function accept() {
    try {
      localStorage.setItem(STORAGE_KEY, "accepted");
    } catch {
      // Private browsing / storage blocked — still dismiss for this visit.
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="glass-dark fixed inset-x-4 bottom-4 z-[90] flex flex-col gap-3 rounded-2xl p-5 text-ivory shadow-luxury sm:inset-x-auto sm:bottom-6 sm:left-6 sm:max-w-sm">
      <div className="flex items-start gap-3">
        <Cookie className="mt-0.5 h-5 w-5 shrink-0 text-terracotta-300" strokeWidth={1.75} />
        <p className="text-sm leading-relaxed text-ivory/85">
          We use cookies for basic site analytics. See our{" "}
          <Link href="/privacy-policy" className="underline hover:text-ivory">
            Privacy Policy
          </Link>{" "}
          for details.
        </p>
      </div>
      <button
        type="button"
        onClick={accept}
        className="md-btn md-btn-filled ml-auto w-fit px-5 py-2 text-sm"
      >
        <span>Got it</span>
      </button>
    </div>
  );
}
