"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Users, Snowflake, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { vehicleImageAlt, type FleetVehicle } from "@/lib/fleet";

const SLIDE_MS = 3200;

export default function VehicleCard({ vehicle }: { vehicle: FleetVehicle }) {
  // Fall back to just the main photo for vehicles with no gallery on
  // record — every vehicle always has at least this one.
  const images = vehicle.gallery.length > 0 ? vehicle.gallery : [vehicle.image];
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (images.length < 2 || paused) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, SLIDE_MS);
    return () => clearInterval(id);
  }, [images.length, paused]);

  return (
    <Link
      href={`/fleet/${vehicle.slug}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl shadow-[var(--md-elevation-2)] transition-all duration-300 [@media(hover:hover)]:hover:-translate-y-1 [@media(hover:hover)]:hover:shadow-[var(--md-elevation-3)]"
    >
      <div className="relative aspect-[3/2] w-full overflow-hidden bg-forest-900">
        {images.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt={vehicleImageAlt(vehicle, src)}
            fill
            priority={i === 0}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={cn(
              "object-cover transition-opacity duration-700 ease-in-out",
              i === index ? "opacity-100" : "opacity-0"
            )}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950/85 via-forest-950/10 to-transparent" />

        {images.length > 1 && (
          <div className="absolute left-3 top-3 z-10 flex gap-1">
            {images.map((src, i) => (
              <span
                key={src}
                className={cn(
                  "h-1.5 rounded-full bg-ivory transition-all duration-300",
                  i === index ? "w-4 opacity-90" : "w-1.5 opacity-40"
                )}
              />
            ))}
          </div>
        )}

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
