import { notFound } from "next/navigation";
import { sql } from "@/lib/db";
import DestinationForm from "../DestinationForm";
import { updateDestination, deleteDestination } from "../actions";

export default async function EditDestinationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const rows = await sql`SELECT * FROM destinations WHERE id = ${Number(id)}`;
  const destination = rows[0];
  if (!destination) notFound();

  const updateWithId = updateDestination.bind(null, destination.id);
  const deleteWithId = deleteDestination.bind(null, destination.id);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="font-serif-luxury text-3xl text-forest-950">Edit {destination.name}</h1>
        <form action={deleteWithId}>
          <button
            type="submit"
            className="rounded-full border border-red-300 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
          >
            Delete Destination
          </button>
        </form>
      </div>
      <DestinationForm action={updateWithId} initial={destination} submitLabel="Save Changes" />
    </div>
  );
}
