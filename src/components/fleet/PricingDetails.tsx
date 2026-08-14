import { Route, Clock, UserCheck, Moon, Info } from "lucide-react";
import { formatINR, getMinimumDailyTotal, type FleetVehicle } from "@/lib/fleet";

/** The single source of truth for how a vehicle's pricing is displayed —
 * used on the fleet detail page (and anywhere else pricing needs to
 * appear) so the numbers and layout never drift between components. */
export default function PricingDetails({ vehicle }: { vehicle: FleetVehicle }) {
  if (vehicle.priceOnRequest) {
    return (
      <div className="flex flex-col gap-3 rounded-2xl bg-forest-950 p-6 text-ivory">
        <p className="font-serif-luxury text-2xl">Price on Request</p>
        <p className="text-sm text-ivory/70">
          Pricing for the {vehicle.name} depends on route, trip duration and group size —
          contact us for a custom quote.
        </p>
      </div>
    );
  }

  const minimumDailyTotal = getMinimumDailyTotal(vehicle);

  return (
    <div className="flex flex-col gap-5 rounded-2xl bg-forest-950 p-6 text-ivory">
      <div>
        <p className="text-xs uppercase tracking-wide text-ivory/50">Starting from</p>
        <p className="font-serif-luxury text-3xl">
          ₹{vehicle.priceFrom}
          <span className="ml-1 text-sm font-sans font-normal text-ivory/60">
            / {vehicle.priceUnit}
          </span>
        </p>
      </div>

      {(vehicle.minKmPerDay !== null || vehicle.driverBata !== null || vehicle.dutyStart) && (
        <dl className="grid grid-cols-2 gap-x-4 gap-y-3 border-t border-white/12 pt-5 text-sm sm:grid-cols-3">
          {vehicle.minKmPerDay !== null && (
            <div className="flex items-start gap-2">
              <Route className="mt-0.5 h-4 w-4 shrink-0 text-terracotta-300" strokeWidth={1.75} />
              <div>
                <dt className="text-[11px] uppercase tracking-wide text-ivory/50">Minimum</dt>
                <dd className="font-medium">{vehicle.minKmPerDay} km/day</dd>
              </div>
            </div>
          )}
          {vehicle.driverBata !== null && (
            <div className="flex items-start gap-2">
              <UserCheck className="mt-0.5 h-4 w-4 shrink-0 text-terracotta-300" strokeWidth={1.75} />
              <div>
                <dt className="text-[11px] uppercase tracking-wide text-ivory/50">Driver Bata</dt>
                <dd className="font-medium">₹{formatINR(vehicle.driverBata)}/day</dd>
              </div>
            </div>
          )}
          {vehicle.dutyStart && vehicle.dutyEnd && (
            <div className="flex items-start gap-2">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-terracotta-300" strokeWidth={1.75} />
              <div>
                <dt className="text-[11px] uppercase tracking-wide text-ivory/50">Duty Time</dt>
                <dd className="font-medium">
                  {vehicle.dutyStart} – {vehicle.dutyEnd}
                </dd>
              </div>
            </div>
          )}
        </dl>
      )}

      {vehicle.dutyEnd && (
        <p className="flex items-start gap-2 text-xs text-ivory/60">
          <Moon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-terracotta-300" strokeWidth={1.75} />
          Extra driver bata applies for driving after {vehicle.dutyEnd}.
        </p>
      )}

      {minimumDailyTotal !== null && (
        <div className="rounded-xl bg-white/5 px-4 py-3">
          <p className="text-[11px] uppercase tracking-wide text-ivory/50">
            Estimated minimum daily charge
          </p>
          <p className="font-serif-luxury text-xl">₹{formatINR(minimumDailyTotal)}</p>
          <p className="mt-0.5 text-[11px] text-ivory/50">
            {vehicle.priceFrom !== null && vehicle.minKmPerDay !== null && (
              <>
                ₹{vehicle.priceFrom} × {vehicle.minKmPerDay} km + ₹{formatINR(vehicle.driverBata!)} driver
                bata — an estimate, not a final fare.
              </>
            )}
          </p>
        </div>
      )}

      <p className="flex items-start gap-2 text-xs text-ivory/50">
        <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" strokeWidth={1.75} />
        Toll, parking, permit and state taxes are additional.
      </p>
    </div>
  );
}
