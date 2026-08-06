"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import VehicleCard from "@/components/fleet/VehicleCard";
import { cn } from "@/lib/cn";
import { fleet, fleetCategories, type FleetCategory } from "@/lib/fleet";

export default function FleetGrid() {
  const searchParams = useSearchParams();
  const initial = searchParams.get("category") as FleetCategory | null;
  const [active, setActive] = useState<FleetCategory | "all">(initial ?? "all");

  const filtered = useMemo(
    () => (active === "all" ? fleet : fleet.filter((v) => v.category === active)),
    [active]
  );

  return (
    <section className="bg-ivory pb-24 pt-10 sm:pb-32 sm:pt-14">
      <Container>
        <div className="surface-press flex flex-wrap gap-1 rounded-full p-1">
          <FilterPill active={active === "all"} onClick={() => setActive("all")}>
            All Vehicles
          </FilterPill>
          {fleetCategories.map((c) => (
            <FilterPill key={c.id} active={active === c.id} onClick={() => setActive(c.id)}>
              {c.label}
            </FilterPill>
          ))}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((vehicle, i) => (
            <Reveal key={vehicle.slug} delay={50 * (i % 3)}>
              <VehicleCard vehicle={vehicle} />
            </Reveal>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-10 text-center text-forest-900/60">
            No vehicles in this category yet.
          </p>
        )}
      </Container>
    </section>
  );
}

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "shrink-0 rounded-full px-4 py-1.5 text-sm font-semibold tracking-wide transition-all duration-200",
        active
          ? "btn-skeuo btn-skeuo-forest text-ivory-50"
          : "text-forest-900/65 hover:text-forest-950"
      )}
    >
      <span>{children}</span>
    </button>
  );
}