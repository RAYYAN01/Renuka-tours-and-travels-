import { notFound } from "next/navigation";
import { sql } from "@/lib/db";
import FaqForm from "../FaqForm";
import { updateFaq, deleteFaq } from "../actions";

export default async function EditFaqPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const rows = await sql`SELECT * FROM faqs WHERE id = ${Number(id)}`;
  const faq = rows[0];
  if (!faq) notFound();

  const updateWithId = updateFaq.bind(null, faq.id);
  const deleteWithId = deleteFaq.bind(null, faq.id);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="font-serif-luxury text-3xl text-forest-950">Edit FAQ</h1>
        <form action={deleteWithId}>
          <button
            type="submit"
            className="rounded-full border border-red-300 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
          >
            Delete FAQ
          </button>
        </form>
      </div>
      <FaqForm action={updateWithId} initial={faq} submitLabel="Save Changes" />
    </div>
  );
}
