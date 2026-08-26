import { config } from "dotenv";
config({ path: ".env.local" });
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

const { fleet } = await import("../src/lib/fleet.ts");
const { destinations } = await import("../src/lib/destinations.ts");
const { services } = await import("../src/lib/services.ts");
const { blogPosts } = await import("../src/lib/blog.ts");
const { faqs } = await import("../src/lib/faq.ts");

console.log(
  `Seeding: ${fleet.length} vehicles, ${destinations.length} destinations, ${services.length} services, ${blogPosts.length} blog posts, ${faqs.length} FAQs`
);

for (const [i, v] of fleet.entries()) {
  await sql`
    INSERT INTO fleet_vehicles
      (slug, name, tagline, category, category_label, seats, luggage, ac, fuel,
       driver_included, price_from, price_unit, min_km_per_day, driver_bata,
       duty_start, duty_end, price_on_request, image, gallery, featured, sort_order)
    VALUES
      (${v.slug}, ${v.name}, ${v.tagline}, ${v.category}, ${v.categoryLabel}, ${v.seats},
       ${v.luggage}, ${v.ac}, ${v.fuel}, ${v.driverIncluded}, ${v.priceFrom}, ${v.priceUnit},
       ${v.minKmPerDay}, ${v.driverBata}, ${v.dutyStart}, ${v.dutyEnd}, ${v.priceOnRequest},
       ${v.image}, ${JSON.stringify(v.gallery)}, ${v.featured ?? false}, ${i})
    ON CONFLICT (slug) DO NOTHING
  `;
}

for (const [i, d] of destinations.entries()) {
  await sql`
    INSERT INTO destinations
      (slug, name, kind, distance, duration, estimated_cost, recommended_vehicle,
       image, description, featured, official_tourism_board, sort_order)
    VALUES
      (${d.slug}, ${d.name}, ${d.kind}, ${d.distance}, ${d.duration}, ${d.estimatedCost},
       ${d.recommendedVehicle}, ${d.image}, ${d.description}, ${d.featured ?? false},
       ${d.officialTourismBoard}, ${i})
    ON CONFLICT (slug) DO NOTHING
  `;
}

for (const [i, s] of services.entries()) {
  const iconName = s.icon.displayName || s.icon.name;
  await sql`
    INSERT INTO services
      (slug, title, icon, description, features, pricing_note, image, image_alt, sort_order)
    VALUES
      (${s.id}, ${s.title}, ${iconName}, ${s.description}, ${JSON.stringify(s.features)},
       ${s.pricingNote}, ${s.image}, ${s.imageAlt}, ${i})
    ON CONFLICT (slug) DO NOTHING
  `;
}

for (const p of blogPosts) {
  await sql`
    INSERT INTO blog_posts
      (slug, title, meta_title, excerpt, category, published_date, reading_time,
       cover_image, cover_image_alt, keywords, sections)
    VALUES
      (${p.slug}, ${p.title}, ${p.metaTitle ?? null}, ${p.excerpt}, ${p.category},
       ${p.publishedDate}, ${p.readingTime}, ${p.coverImage}, ${p.coverImageAlt},
       ${JSON.stringify(p.keywords)}, ${JSON.stringify(p.sections)})
    ON CONFLICT (slug) DO NOTHING
  `;
}

for (const [i, f] of faqs.entries()) {
  await sql`
    INSERT INTO faqs (question, answer, sort_order)
    VALUES (${f.question}, ${f.answer}, ${i})
  `;
}

const counts = await sql`
  SELECT
    (SELECT count(*) FROM fleet_vehicles) AS fleet,
    (SELECT count(*) FROM destinations) AS destinations,
    (SELECT count(*) FROM services) AS services,
    (SELECT count(*) FROM blog_posts) AS blog_posts,
    (SELECT count(*) FROM faqs) AS faqs
`;
console.log("DB row counts after seed:", counts[0]);
