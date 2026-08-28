import type { Stat } from "@/components/StatBlock";
import { site } from "@/lib/site";

/** Vehicle count is pulled from the real fleet size rather than
 * hard-coded, so it can't drift out of sync as the fleet changes. */
export function getCoreStats(fleetCount: number): Stat[] {
  return [
    { value: new Date().getFullYear() - site.founded, suffix: "+", label: "Years on the Road" },
    { value: fleetCount, suffix: "", label: "Vehicles in Fleet" },
  ];
}
