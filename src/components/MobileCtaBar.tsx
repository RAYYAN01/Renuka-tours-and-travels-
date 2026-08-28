"use client";

import { Phone, CalendarCheck } from "lucide-react";
import Link from "next/link";
import { WhatsappIcon } from "@/components/ui/SocialIcons";
import { site, telHref, whatsappHref } from "@/lib/site";

const barAction =
  "flex flex-1 flex-col items-center justify-center gap-1.5 rounded-2xl py-2 text-ivory/90 transition-colors hover:bg-white/10";

const iconBadge = "flex h-9 w-9 items-center justify-center rounded-full shadow-[0_3px_10px_-3px_rgba(0,0,0,0.5)]";

export default function MobileCtaBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 px-4 lg:hidden"
      style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
    >
      <div className="glass-dark flex items-center justify-between gap-1 rounded-[1.75rem] px-3 py-2">
        <div className="flex flex-1 items-stretch gap-1">
          <a href={telHref} className={barAction} aria-label={`Call ${site.phone}`}>
            <span className={iconBadge} style={{ background: "#2563eb" }}>
              <Phone className="h-4 w-4 text-white" strokeWidth={2} />
            </span>
            <span className="text-[11px] font-medium tracking-wide">Call</span>
          </a>
          <a
            href={whatsappHref()}
            target="_blank"
            rel="noopener noreferrer"
            className={barAction}
          >
            <span className={iconBadge} style={{ background: "var(--color-whatsapp)" }}>
              <WhatsappIcon className="h-[18px] w-[18px] text-white" />
            </span>
            <span className="text-[11px] font-medium tracking-wide">WhatsApp</span>
          </a>
        </div>
        <Link
          href="/booking"
          aria-label="Book a ride"
          className="md-fab -mt-10 h-14 w-14 rounded-[1.5rem]"
        >
          <CalendarCheck className="h-6 w-6" strokeWidth={1.75} />
        </Link>
        <div className="flex-1" />
      </div>
    </div>
  );
}
