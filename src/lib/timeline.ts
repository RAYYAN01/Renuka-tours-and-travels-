import { site } from "@/lib/site";

interface TimelineMilestone {
  year: string;
  text: string;
}

/** The final milestone cites the current fleet size, so it's built from the
 * real count rather than a hard-coded number that would go stale as the
 * fleet changes. */
export function getTimeline(fleetCount: number): TimelineMilestone[] {
  return [
    { year: `${site.founded}`, text: "Started with two sedans serving Bengaluru's IT corridor." },
    { year: `${site.founded + 4}`, text: "Added our first SUVs and tempo travellers for group travel." },
    { year: `${site.founded + 8}`, text: "Crossed 10,000 trips; launched corporate retainer plans." },
    { year: `${site.founded + 12}`, text: "Expanded the fleet with premium vans and mini coaches." },
    {
      year: `${new Date().getFullYear()}`,
      text: `${fleetCount} vehicles, serving families, corporates and pilgrims daily.`,
    },
  ];
}
