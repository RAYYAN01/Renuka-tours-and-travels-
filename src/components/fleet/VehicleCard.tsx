import Image from "next/image";
import Link from "next/link";
import { Users, Snowflake, ArrowUpRight } from "lucide-react";
import Tilt from "@/components/ui/Tilt";
import { vehicleImageAlt, type FleetVehicle } from "@/lib/fleet";

export default function VehicleCard({ vehicle }: { vehicle: FleetVehicle }) {
  return (
    <Tilt max={6}>
      <Link
        href={`/fleet/${vehicle.slug}`}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl shadow-[var(--md-elevation-2)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--md-elevation-3)]"
      >
        <div className="relative aspect-[3/2] w-full overflow-hidden bg-forest-900">
          <Image
            src={vehicle.image}
            alt={vehicleImageAlt(vehicle, vehicle.image)}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-950/85 via-forest-950/10 to-transparent" />

          <span className="glass-chip absolute left-3 top-3 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide">
            {vehicle.categoryLabel}
          </span>

          {/* Overlaid frosted-glass detail card */}
          <div className="absolute inset-x-3 bottom-3 flex flex-col gap-2.5 rounded-2xl bg-transparent p-3.5">
            <div>
              <h3 className="font-serif-luxury text-lg leading-tight text-ivory">
                {vehicle.name}
              </h3>
              <p className="mt-0.5 text-xs text-ivory/65">{vehicle.tagline}</p>
            </div>

            <div className="flex items-center gap-3 text-[11px] font-medium text-ivory/75">
              <span className="flex items-center gap-1">
                <Users className="h-3.5 w-3.5 text-terracotta-300" strokeWidth={1.75} />
                {vehicle.seats} Seats
              </span>
              {vehicle.ac && (
                <span className="flex items-center gap-1">
                  <Snowflake className="h-3.5 w-3.5 text-terracotta-300" strokeWidth={1.75} />
                  AC
                </span>
              )}
            </div>

            <div className="flex items-end justify-between border-t border-white/15 pt-2.5">
              <div>
                <p className="text-[10px] uppercase tracking-wide text-ivory/50">From</p>
                <p className="font-serif-luxury text-base text-ivory">
                  ₹{vehicle.priceFrom}
                  <span className="ml-1 text-[11px] font-sans font-normal text-ivory/55">
                    /{vehicle.priceUnit}
                  </span>
                </p>
              </div>
              <span className="glass-chip-light flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold">
                <span>Book Now</span>
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </Tilt>
  );
}
