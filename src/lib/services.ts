import {
  Plane,
  Building2,
  Heart,
  MapPinned,
  Users2,
  Clock4,
  type LucideIcon,
} from "lucide-react";

export interface Service {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  pricingNote: string;
  image: string;
  imageAlt: string;
}

export const services: Service[] = [
  {
    id: "airport",
    icon: Plane,
    title: "Airport Transfers",
    description:
      "On-time pickups & drops with live flight tracking, so a delayed flight never means a missed ride.",
    features: [
      "Free waiting time for flight delays",
      "Meet & greet inside the terminal (on request)",
      "Fixed fares — no surge pricing",
    ],
    pricingNote: "Starting from ₹649 within city limits",
    image: "/fleet/etios-front-01.jpeg",
    imageAlt: "Toyota Etios used for airport transfers",
  },
  {
    id: "outstation",
    icon: MapPinned,
    title: "Outstation Trips",
    description:
      "Round trips & one-ways to any city in India, with an experienced driver who knows the highways.",
    features: [
      "Round trip & one-way options",
      "Multi-day itineraries supported",
      "Toll & driver allowance shown upfront",
    ],
    pricingNote: "Starting from ₹11 / km",
    image: "/gallery/ghat-road-mountain-viewpoint-01.jpg",
    imageAlt: "Mountain ghat road on an outstation route",
  },
  {
    id: "corporate",
    icon: Building2,
    title: "Corporate Travel",
    description:
      "Reliable fleets for teams, events & executives — with monthly billing and dedicated account support.",
    features: [
      "Monthly retainer & invoicing",
      "Dedicated account manager",
      "Priority vehicle availability",
    ],
    pricingNote: "Custom corporate rates on request",
    image: "/fleet/innova-crysta-front-01.jpeg",
    imageAlt: "Toyota Innova Crysta used for corporate travel",
  },
  {
    id: "wedding",
    icon: Heart,
    title: "Wedding Transport",
    description:
      "Decorated fleets for the baraat and seamless guest logistics across multi-day wedding functions.",
    features: [
      "Fleet decoration on request",
      "Multi-vehicle coordination",
      "Dedicated event-day coordinator",
    ],
    pricingNote: "Custom packages based on fleet size",
    image: "/fleet/force-urbania-front-01.jpeg",
    imageAlt: "Force Urbania luxury van used for wedding transport",
  },
  {
    id: "pilgrimage",
    icon: Users2,
    title: "Group & Pilgrimage Tours",
    description:
      "Tempo travellers & coaches for large groups heading to temples and pilgrimage circuits.",
    features: [
      "9 to 35 seater options",
      "Early-morning darshan departures",
      "Multi-day pilgrimage circuits",
    ],
    pricingNote: "Starting from ₹24 / km",
    image: "/gallery/tirupati-temple-entrance-01.jpg",
    imageAlt: "Vehicles at the base of the Tirupati temple hills on a pilgrimage trip",
  },
  {
    id: "local",
    icon: Clock4,
    title: "Hourly & Local Rentals",
    description:
      "Flexible city rentals billed by the hour — perfect for errands, meetings or a day of sightseeing.",
    features: [
      "4, 8 or 12 hour packages",
      "Extra km & hour billed transparently",
      "Same driver for the full package",
    ],
    pricingNote: "Starting from ₹1,499 for 8 hrs / 80 km",
    image: "/fleet/dzire-front-01.jpeg",
    imageAlt: "Maruti Suzuki Dzire used for hourly and local rentals",
  },
];
