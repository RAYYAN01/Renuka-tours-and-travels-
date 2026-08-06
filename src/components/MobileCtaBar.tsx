"use client";

import { MessageCircle, Phone, CalendarCheck } from "lucide-react";
import { site, telHref, whatsappHref } from "@/lib/site";
import Link from "next/link";

const barAction =
  "flex flex-1 flex-col items-center justify-center gap-0.5 rounded-2xl py-2.5 text-ivory/90 transition-colors hover:bg-white/10";

export default function MobileCtaBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 px-4 lg:hidden"
      style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
    >
      <div className="glass-dark flex items-center justify-between gap-1 rounded-[1.75rem] px-3 py-1">
        <div className="flex flex-1 items-stretch gap-1">
          <a href={telHref} className={barAction} aria-label={`Call ${site.phone}`}>
            <Phone className="h-5 w-5" strokeWidth={1.75} />
            <span className="text-[11px] font-medium tracking-wide">Call</span>
          </a>
          <a
            href={whatsappHref()}
            target="_blank"
            rel="noopener noreferrer"
            className={barAction}
          >
            <MessageCircle className="h-5 w-5 text-terracotta-300" strokeWidth={1.75} />
            <span className="text-[11px] font-medium tracking-wide text-terracotta-300">
              WhatsApp
            </span>
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
