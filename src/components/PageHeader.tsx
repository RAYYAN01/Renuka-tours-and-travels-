import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SplitReveal from "@/components/ui/SplitReveal";

export default function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-[var(--md-surface)] pb-16 pt-36 sm:pb-20 sm:pt-44">
      <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-[var(--md-primary-container)]/70 blur-[100px]" />
      <Container className="relative flex flex-col gap-5">
        <Reveal>
          <p className="md-eyebrow flex items-center gap-2">
            <span className="h-px w-8 bg-[var(--md-primary)]" />
            {eyebrow}
          </p>
        </Reveal>
        <SplitReveal
          as="h1"
          delay={100}
          className="font-serif-luxury text-balance text-4xl leading-[1.05] tracking-tight text-forest-950 sm:text-6xl"
        >
          {title}
        </SplitReveal>
        {description && (
          <Reveal delay={250}>
            <p className="max-w-xl text-balance text-lg leading-relaxed text-forest-900/65">
              {description}
            </p>
          </Reveal>
        )}
      </Container>
    </section>
  );
}