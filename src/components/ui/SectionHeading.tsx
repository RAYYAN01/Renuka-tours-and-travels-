import { cn } from "@/lib/cn";
import Reveal from "@/components/ui/Reveal";
import SplitReveal from "@/components/ui/SplitReveal";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "dark",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {eyebrow && (
        <Reveal>
          <p
            className={cn(
              "flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em]",
              tone === "dark" ? "md-eyebrow" : "text-terracotta-300",
              align === "center" && "justify-center"
            )}
          >
            <span
              className={cn(
                "h-px w-8",
                tone === "dark" ? "bg-[var(--md-primary)]" : "bg-terracotta-300/70"
              )}
            />
            {eyebrow}
            {align === "center" && (
              <span
                className={cn(
                  "h-px w-8",
                  tone === "dark" ? "bg-[var(--md-primary)]" : "bg-terracotta-300/70"
                )}
              />
            )}
          </p>
        </Reveal>
      )}
      <SplitReveal
        as="h2"
        delay={80}
        className={cn(
          "font-serif-luxury text-balance text-4xl leading-[1.1] tracking-tight sm:text-5xl",
          tone === "dark" ? "text-forest-950" : "text-ivory"
        )}
      >
        {title}
      </SplitReveal>
      {description && (
        <Reveal delay={140}>
          <p
            className={cn(
              "max-w-2xl text-balance text-lg leading-relaxed",
              tone === "dark" ? "text-forest-900/78" : "text-ivory/82"
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}