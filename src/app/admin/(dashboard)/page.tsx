import Link from "next/link";
import { sql } from "@/lib/db";

export default async function AdminDashboardPage() {
  const [counts] = await sql`
    SELECT
      (SELECT count(*) FROM fleet_vehicles) AS fleet,
      (SELECT count(*) FROM destinations) AS destinations,
      (SELECT count(*) FROM services) AS services,
      (SELECT count(*) FROM blog_posts) AS blog_posts,
      (SELECT count(*) FROM faqs) AS faqs
  `;

  const cards = [
    { label: "Fleet Vehicles", count: counts.fleet, href: "/admin/fleet" },
    { label: "Destinations", count: counts.destinations, href: "/admin/destinations" },
    { label: "Services", count: counts.services, href: "/admin/services" },
    { label: "Blog Posts", count: counts.blog_posts, href: "/admin/blog" },
    { label: "FAQs", count: counts.faqs, href: "/admin/faqs" },
  ];

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-serif-luxury text-3xl text-forest-950">Dashboard</h1>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="flex flex-col gap-1 rounded-2xl border border-forest-950/10 bg-ivory-50 p-5 transition-shadow hover:shadow-md"
          >
            <span className="text-3xl font-semibold text-forest-950">{c.count}</span>
            <span className="text-sm text-forest-900/60">{c.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
