import { ShieldCheck, Clock, MapPinned, BadgeCheck, Sparkle } from "lucide-react";

const items = [
  { icon: ShieldCheck, label: "Verified & Licensed Drivers" },
  { icon: Clock, label: "24 × 7 Support" },
  { icon: MapPinned, label: "Live GPS Tracking" },
  { icon: BadgeCheck, label: "No Hidden Charges" },
  { icon: Sparkle, label: "Sanitised, Serviced Fleet" },
];

export default function TrustBar() {
  return (
    <div className="relative z-10 overflow-hidden bg-[var(--md-secondary-container)] py-3.5 text-[var(--md-on-secondary-container)]">
      <div className="marquee-track">
        {[0, 1].map((rep) => (
          <div key={rep} className="flex shrink-0 items-center">
            {items.map(({ icon: Icon, label }, i) => (
              <div key={`${rep}-${i}`} className="flex items-center gap-2.5 px-8">
                <Icon className="h-4 w-4 shrink-0 text-[var(--md-on-secondary-container)]/80" strokeWidth={1.75} />
                <span className="whitespace-nowrap text-[13px] font-medium tracking-wide">
                  {label}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
