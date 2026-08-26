import {
  Plane,
  Building2,
  Heart,
  MapPinned,
  UsersRound,
  Clock4,
  Car,
  Bus,
  Briefcase,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

/** Maps icon name strings (as stored in the `services` table) to their
 * lucide-react component, since a database can't store a component
 * reference. Add new icons here as new services need them. */
export const ICON_REGISTRY: Record<string, LucideIcon> = {
  Plane,
  Building2,
  Heart,
  MapPinned,
  UsersRound,
  Clock4,
  Car,
  Bus,
  Briefcase,
  ShieldCheck,
};

export const ICON_NAMES = Object.keys(ICON_REGISTRY);
