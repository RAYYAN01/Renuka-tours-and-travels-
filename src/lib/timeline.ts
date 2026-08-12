import { site } from "@/lib/site";

interface TimelineMilestone {
  year: string;
  text: string;
}

export const timeline: TimelineMilestone[] = [
  { year: `${site.founded}`, text: "Started with two sedans serving Bengaluru's IT corridor." },
  { year: `${site.founded + 4}`, text: "Added our first SUVs and tempo travellers for group travel." },
  { year: `${site.founded + 8}`, text: "Crossed 10,000 trips; launched corporate retainer plans." },
  { year: `${site.founded + 12}`, text: "Expanded the fleet with premium vans and mini coaches." },
  { year: `${new Date().getFullYear()}`, text: "40+ vehicles, serving families, corporates and pilgrims daily." },
];
