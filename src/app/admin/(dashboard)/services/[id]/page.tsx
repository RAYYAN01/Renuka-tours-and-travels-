import { notFound } from "next/navigation";
import { sql } from "@/lib/db";
import ServiceForm from "../ServiceForm";
import { updateService, deleteService } from "../actions";

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const rows = await sql`SELECT * FROM services WHERE id = ${Number(id)}`;
  const service = rows[0];
  if (!service) notFound();

  const updateWithId = updateService.bind(null, service.id);
  const deleteWithId = deleteService.bind(null, service.id);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="font-serif-luxury text-3xl text-forest-950">Edit {service.title}</h1>
        <form action={deleteWithId}>
          <button
            type="submit"
            className="rounded-full border border-red-300 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
          >
            Delete Service
          </button>
        </form>
      </div>
      <ServiceForm action={updateWithId} initial={service} submitLabel="Save Changes" />
    </div>
  );
}
