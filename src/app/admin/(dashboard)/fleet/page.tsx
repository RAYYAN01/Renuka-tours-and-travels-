import Link from "next/link";
import { sql } from "@/lib/db";

export default async function AdminFleetPage() {
  const vehicles = await sql`
    SELECT id, slug, name, category_label, seats, price_from, price_on_request
    FROM fleet_vehicles
    ORDER BY name
  `;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="font-serif-luxury text-3xl text-forest-950">Fleet ({vehicles.length})</h1>
        <Link
          href="/admin/fleet/new"
          className="rounded-full bg-forest-950 px-4 py-2 text-sm font-semibold text-ivory hover:opacity-90"
        >
          + Add Vehicle
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-forest-950/10 bg-ivory-50">
        <table className="w-full text-sm">
          <thead className="bg-forest-950/5 text-left text-xs uppercase tracking-wide text-forest-900/60">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Seats</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-forest-950/5">
            {vehicles.map((v) => (
              <tr key={v.id}>
                <td className="px-4 py-3 font-medium text-forest-950">{v.name}</td>
                <td className="px-4 py-3 text-forest-900/70">{v.category_label}</td>
                <td className="px-4 py-3 text-forest-900/70">{v.seats}</td>
                <td className="px-4 py-3 text-forest-900/70">
                  {v.price_on_request ? "Price on request" : `₹${v.price_from}/km`}
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/fleet/${v.id}`}
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
