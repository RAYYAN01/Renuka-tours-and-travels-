"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { MapPin, CalendarDays, Users, Search } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

const tabs = [
  { id: "outstation", label: "Outstation" },
  { id: "local", label: "Local Rental" },
  { id: "airport", label: "Airport Transfer" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export default function QuickSearch() {
  const [tab, setTab] = useState<TabId>("outstation");
  const router = useRouter();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const params = new URLSearchParams({ trip: tab });
    for (const [key, value] of form.entries()) {
      if (typeof value === "string" && value.trim()) params.set(key, value);
    }
    router.push(`/booking?${params.toString()}`);
  }

  return (
    <section className="relative z-20 -mt-16 pb-10 sm:-mt-20 sm:pb-14">
      <Container className="flex flex-col items-center gap-4">
        {/* Airbnb-style minimal tab row, floating over the hero */}
        <Reveal>
          <div className="flex items-center gap-1 rounded-full bg-black/20 p-1 backdrop-blur-sm">
            {tabs.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-semibold tracking-wide transition-colors",
                  tab === t.id
                    ? "bg-ivory-50 text-forest-950"
                    : "text-ivory/85 hover:text-ivory"
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Airbnb-style segmented pill search bar */}
        <Reveal delay={80} className="w-full">
          <form
            onSubmit={handleSubmit}
            className="mx-auto flex w-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-ivory-50 shadow-2xl lg:flex-row lg:items-center lg:rounded-full lg:p-2"
          >
            <Field
              icon={MapPin}
              label="Pickup Location"
              name="pickup"
              placeholder="e.g. Bengaluru Airport"
              className="lg:rounded-full lg:hover:bg-forest-950/5"
            />
            <Divider />
            <Field
              icon={MapPin}
              label={tab === "local" ? "Package" : "Drop / Destination"}
              name="destination"
              placeholder={tab === "local" ? "e.g. 8 Hrs / 80 Km" : "e.g. Mysuru"}
              className="lg:rounded-full lg:hover:bg-forest-950/5"
            />
            <Divider />
            <Field
              icon={CalendarDays}
              label="Pickup Date"
              name="date"
              type="date"
              className="lg:rounded-full lg:hover:bg-forest-950/5"
            />
            <Divider />
            <Field
              icon={Users}
              label="Passengers"
              name="passengers"
              type="number"
              placeholder="2"
              min={1}
              className="lg:rounded-full lg:hover:bg-forest-950/5"
            />

            <div className="p-3 lg:p-0 lg:pl-2">
              <button
                type="submit"
                aria-label="Search"
                className="md-btn md-btn-filled group flex h-12 w-full items-center justify-center gap-2 px-6 text-sm lg:w-12 lg:px-0"
              >
                <Search className="h-4.5 w-4.5 shrink-0" strokeWidth={2.25} />
                <span className="lg:hidden">Search</span>
              </button>
            </div>
          </form>
        </Reveal>
      </Container>
    </section>
  );
}

function Divider() {
  return <div className="mx-1 hidden h-8 w-px shrink-0 self-center bg-forest-950/10 lg:block" />;
}

function Field({
  icon: Icon,
  label,
  name,
  placeholder,
  type = "text",
  min,
  className,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
  min?: number;
  className?: string;
}) {
  return (
    <label
      className={cn(
        "flex flex-1 cursor-text flex-col gap-1 border-b border-forest-950/8 px-5 py-3 transition-colors last:border-b-0 lg:border-b-0 lg:px-5 lg:py-2",
        className
      )}
    >
      <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.08em] text-forest-950">
        <Icon className="h-3.5 w-3.5 text-forest-900/50" strokeWidth={1.75} />
        {label}
      </span>
      <input
        name={name}
        type={type}
        min={min}
        placeholder={placeholder}
        className="w-full border-none bg-transparent p-0 text-sm font-medium text-forest-900 placeholder:text-forest-900/40 focus:outline-none focus:ring-0"
      />
    </label>
  );
}
