import type { Stat } from "@/components/StatBlock";
import { site } from "@/lib/site";

export const coreStats: Stat[] = [
  { value: new Date().getFullYear() - site.founded, suffix: "+", label: "Years on the Road" },
  { value: 40, suffix: "+", label: "Vehicles in Fleet" },
  { value: 28000, suffix: "+", label: "Trips Completed" },
];
