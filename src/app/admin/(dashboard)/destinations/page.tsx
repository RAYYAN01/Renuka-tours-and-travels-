import Link from "next/link";
import { sql } from "@/lib/db";

export default async function AdminDestinationsPage() {
  const destinations = await sql`
    SELECT id, slug, name, kind, distance, featured FROM destinations ORDER BY name
  `;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="font-serif-luxury text-3xl text-forest-950">
          Destinations ({destinations.length})
        </h1>
        <Link
          href="/admin/destinations/new"
          className="rounded-full bg-forest-950 px-4 py-2 text-sm font-semibold text-ivory hover:opacity-90"
        >
          + Add Destination
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-forest-950/10 bg-ivory-50">
        <table className="w-full text-sm">
          <thead className="bg-forest-950/5 text-left text-xs uppercase tracking-wide text-forest-900/60">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Kind</th>
              <th className="px-4 py-3">Distance</th>
              <th className="px-4 py-3">Featured</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-forest-950/5">
            {destinations.map((d) => (
              <tr key={d.id}>
                <td className="px-4 py-3 font-medium text-forest-950">{d.name}</td>
                <td className="px-4 py-3 text-forest-900/70">{d.kind}</td>
                <td className="px-4 py-3 text-forest-900/70">{d.distance}</td>
                <td className="px-4 py-3 text-forest-900/70">{d.featured ? "Yes" : "—"}</td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/destinations/${d.id}`}
                    className="text-sm font-medium text-terracotta-700 hover:underline"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
