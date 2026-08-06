import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Tilt from "@/components/ui/Tilt";
import type { Destination } from "@/lib/destinations";

export default function DestinationCard({ destination: d }: { destination: Destination }) {
  return (
    <Tilt max={5}>
      <Link
        href={`/destinations/${d.slug}`}
        className="group relative flex aspect-[4/3] flex-col justify-between overflow-hidden rounded-2xl p-4 shadow-[var(--md-elevation-2)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--md-elevation-3)]"
      >
        <Image
          src={d.image}
          alt={`${d.name}, ${d.kind}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/25" />

        <span className="glass-chip relative w-fit rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide">
          {d.kind}
        </span>

        <div className="glass-dark relative flex flex-col gap-2 rounded-2xl p-4">
          <h3 className="font-serif-luxury text-2xl leading-none text-ivory">{d.name}</h3>
          <div className="flex items-end justify-between pt-1">
            <span className="text-xs text-ivory/70">
              {d.distance} · {d.duration}
            </span>
            <span className="glass-chip-light flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold">
              View Trip
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </div>
      </Link>
    </Tilt>
  );
}
