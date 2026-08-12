import Reveal from "@/components/ui/Reveal";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

export interface Stat {
  value: number;
  suffix?: string;
  label: string;
}

export default function StatBlock({
  stat,
  delay = 0,
  align = "left",
}: {
  stat: Stat;
  delay?: number;
  align?: "left" | "center";
}) {
  return (
    <Reveal delay={delay} className={align === "center" ? "text-center" : "text-center lg:text-left"}>
      <p className="font-serif-luxury leading-none text-4xl text-forest-950 tabular-nums sm:text-5xl">
        <AnimatedCounter value={stat.value} suffix={stat.suffix} />
      </p>
      <p className="mt-4 text-xs font-medium uppercase tracking-[0.18em] text-forest-900/70">
        {stat.label}
      </p>
    </Reveal>
  );
}
