export interface Service {
  id: string;
  /** Icon name as stored in the `services` table — resolve via
   * ICON_REGISTRY (src/lib/icon-registry.ts) to render it. */
  icon: string;
  title: string;
  description: string;
  features: string[];
  pricingNote: string;
  image: string;
  imageAlt: string;
}
