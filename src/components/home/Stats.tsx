import Container from "@/components/ui/Container";
import StatBlock from "@/components/StatBlock";
import { coreStats } from "@/lib/stats";

const stats = [...coreStats, { value: 98, suffix: "%", label: "On-Time Pickups" }];

export default function Stats() {
  return (
    <section className="border-y border-forest-950/8 bg-ivory-50 py-16">
      <Container className="grid grid-cols-2 gap-10 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <StatBlock key={stat.label} stat={stat} delay={70 * i} />
        ))}
      </Container>
    </section>
  );
}
