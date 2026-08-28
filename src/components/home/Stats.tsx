import Container from "@/components/ui/Container";
import StatBlock from "@/components/StatBlock";
import { getCoreStats } from "@/lib/stats";
import { getFleet } from "@/lib/fleet-data";

export default async function Stats() {
  const fleet = await getFleet();
  const stats = getCoreStats(fleet.length);
  return (
    <section className="border-y border-forest-950/8 bg-ivory-50 py-16">
      <Container className="flex flex-wrap justify-center gap-10 sm:gap-16">
        {stats.map((stat, i) => (
          <StatBlock key={stat.label} stat={stat} delay={70 * i} />
        ))}
      </Container>
    </section>
  );
}
