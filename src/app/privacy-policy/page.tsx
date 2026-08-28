import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Container from "@/components/ui/Container";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses and protects your information.`,
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        description="Last updated August 2026."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}
      />
      <section className="bg-ivory pb-24 pt-4 sm:pb-32">
        <Container>
          <div className="mx-auto flex max-w-2xl flex-col gap-8 text-forest-900/85">
            <p className="text-lg leading-relaxed">
              {site.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) respects your privacy. This page
              explains what information we collect through this website, why, and how it&apos;s
              handled.
            </p>

            <div className="flex flex-col gap-3">
              <h2 className="font-serif-luxury text-2xl text-forest-950">
                Information you provide
              </h2>
              <p className="leading-relaxed">
                Our booking and contact forms ask for your name, phone number, and trip details
                (pickup, destination, date, passenger count) or your message. When you submit
                either form, this information is <strong>not stored on our servers</strong> — it
                is formatted into a message and opened directly in WhatsApp, addressed to our
                operations team, so you can review and send it yourself. We receive it only when
                you choose to send that WhatsApp message.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <h2 className="font-serif-luxury text-2xl text-forest-950">
                Information collected automatically
              </h2>
              <p className="leading-relaxed">
                We use Google Analytics to understand how visitors use this site (pages viewed,
                approximate location, device type). This is aggregated, standard web analytics —
                we do not use it to identify individual visitors. Google Analytics may set
                cookies in your browser as part of this; you can control or block cookies through
                your browser settings.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <h2 className="font-serif-luxury text-2xl text-forest-950">
                WhatsApp and phone communication
              </h2>
              <p className="leading-relaxed">
                Once you contact us via WhatsApp, phone, or email, that conversation is subject to
                WhatsApp&apos;s / your phone carrier&apos;s own privacy practices in addition to
                ours. We use the details you share only to arrange, confirm, and support your
                booking, and we do not sell or rent your information to third parties.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <h2 className="font-serif-luxury text-2xl text-forest-950">No online payments</h2>
              <p className="leading-relaxed">
                This website does not process payments or store any payment/card information.
                Fares are confirmed and settled directly with our team by phone, WhatsApp, or in
                person.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <h2 className="font-serif-luxury text-2xl text-forest-950">Your choices</h2>
              <p className="leading-relaxed">
                You can choose not to submit our forms and instead contact us directly by phone or
                WhatsApp using the details on our{" "}
                <a href="/contact" className="underline hover:text-terracotta-700">
                  Contact page
                </a>
                . You can also block analytics cookies in your browser at any time.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <h2 className="font-serif-luxury text-2xl text-forest-950">Contact us</h2>
              <p className="leading-relaxed">
                Questions about this policy? Reach us at{" "}
                <a href={`mailto:${site.email}`} className="underline hover:text-terracotta-700">
                  {site.email}
                </a>{" "}
                or {site.phone}.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
