"use client";

import { usePathname } from "next/navigation";

/** Hides the public marketing chrome (navbar, footer, mobile CTA bar,
 * WhatsApp FAB) on /admin/* routes, which have their own self-contained
 * header/nav in the admin layout and shouldn't show site-visitor UI. */
export default function SiteChromeGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  return <>{children}</>;
}
