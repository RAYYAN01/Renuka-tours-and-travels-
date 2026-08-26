import Link from "next/link";
import { sql } from "@/lib/db";

export default async function AdminFaqsPage() {
  const faqs = await sql`SELECT id, question, sort_order FROM faqs ORDER BY sort_order`;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="font-serif-luxury text-3xl text-forest-950">FAQs ({faqs.length})</h1>
        <Link
          href="/admin/faqs/new"
          className="rounded-full bg-forest-950 px-4 py-2 text-sm font-semibold text-ivory hover:opacity-90"
        >
          + Add FAQ
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-forest-950/10 bg-ivory-50">
        <table className="w-full text-sm">
          <thead className="bg-forest-950/5 text-left text-xs uppercase tracking-wide text-forest-900/60">
            <tr>
              <th className="px-4 py-3">Question</th>
              <th className="px-4 py-3">Order</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-forest-950/5">
            {faqs.map((f) => (
              <tr key={f.id}>
                <td className="px-4 py-3 font-medium text-forest-950">{f.question}</td>
                <td className="px-4 py-3 text-forest-900/70">{f.sort_order}</td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/faqs/${f.id}`}
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
