import Image from "next/image";
import Link from "next/link";
import { Users, Snowflake, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { vehicleImageAlt, type FleetVehicle } from "@/lib/fleet";

export default function VehicleCard({ vehicle }: { vehicle: FleetVehicle }) {
  return (
    <Link
      href={`/fleet/${vehicle.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl shadow-[var(--md-elevation-2)] transition-all duration-300 [@media(hover:hover)]:hover:-translate-y-1 [@media(hover:hover)]:hover:shadow-[var(--md-elevation-3)]"
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
              {vehicle.priceOnRequest ? (
                <p className="font-serif-luxury text-base text-ivory">Price on Request</p>
              ) : (
                <>
                  <p className="text-[10px] uppercase tracking-wide text-ivory/50">From</p>
                  <p className="font-serif-luxury text-base text-ivory">
                    ₹{vehicle.priceFrom}
                    <span className="ml-1 text-[11px] font-sans font-normal text-ivory/55">
                      /{vehicle.priceUnit}
                    </span>
                  </p>
                  {vehicle.minKmPerDay !== null && (
                    <p className="text-[10px] text-ivory/50">Min {vehicle.minKmPerDay} km/day</p>
                  )}
                </>
              )}
            </div>
            <span
              className={cn(
                "flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold",
                vehicle.priceOnRequest ? "glass-chip-light" : "md-btn md-btn-shine"
              )}
            >
              <span>{vehicle.priceOnRequest ? "Get Quote" : "Book Now"}</span>
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
