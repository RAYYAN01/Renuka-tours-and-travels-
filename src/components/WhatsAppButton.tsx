import { WhatsappIcon } from "@/components/ui/SocialIcons";
import { whatsappHref } from "@/lib/site";

// Floating WhatsApp chat button. Mobile already gets a WhatsApp tab inside
// MobileCtaBar, so this only needs to appear from `lg` up — where that bar
// is hidden and desktop visitors would otherwise have no persistent
// WhatsApp entry point outside individual page CTAs.
export default function WhatsAppButton() {
  return (
    // The positioning lives on this wrapper, not the .md-fab element itself —
    // .md-fab sets its own `position: relative` (for its pseudo-element
    // sheen), which as plain unlayered CSS outranks Tailwind's layered
    // `fixed` utility in the cascade and would silently win if applied to
    // the same element, leaving the button in normal document flow instead
    // of pinned to the viewport.
    <div className="fixed bottom-6 right-6 z-40 hidden lg:block">
      <a
        href={whatsappHref()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="md-fab md-fab-whatsapp"
      >
        <WhatsappIcon className="h-6 w-6" />
      </a>
    </div>
  );
}
