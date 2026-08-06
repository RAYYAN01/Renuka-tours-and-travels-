import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[70svh] items-center bg-ivory py-24">
      <Container className="flex flex-col items-center gap-6 text-center">
        <span className="font-serif-luxury text-7xl text-terracotta-600">404</span>
        <h1 className="font-serif-luxury text-balance max-w-lg text-3xl text-forest-950 sm:text-4xl">
          This road doesn&apos;t lead anywhere — yet.
        </h1>
        <p className="max-w-md text-forest-900/65">
          We&apos;re still building this part of the site. Head back home, or
          book your ride directly.
        </p>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
          <Button href="/" size="lg" icon={<ArrowLeft className="h-4 w-4" />}>
            Back to Home
          </Button>
          <Button href="/booking" variant="outlined" size="lg">
            Book a Ride
          </Button>
        </div>
        <Link
          href="/"
          className="mt-1 text-xs font-medium uppercase tracking-[0.2em] text-forest-900/40"
        >
          Renuka Tours &amp; Travels
        </Link>
      </Container>
    </section>
  );
}
