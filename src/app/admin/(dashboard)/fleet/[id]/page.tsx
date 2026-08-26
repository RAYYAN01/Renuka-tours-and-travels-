import { notFound } from "next/navigation";
import { sql } from "@/lib/db";
import FleetForm from "../FleetForm";
import { updateVehicle, deleteVehicle } from "../actions";

export default async function EditVehiclePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const rows = await sql`SELECT * FROM fleet_vehicles WHERE id = ${Number(id)}`;
  const vehicle = rows[0];
  if (!vehicle) notFound();

  const updateWithId = updateVehicle.bind(null, vehicle.id);
  const deleteWithId = deleteVehicle.bind(null, vehicle.id);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="font-serif-luxury text-3xl text-forest-950">Edit {vehicle.name}</h1>
        <form action={deleteWithId}>
          <button
            type="submit"
            className="rounded-full border border-red-300 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
          >
            Delete Vehicle
          </button>
        </form>
      </div>
      <FleetForm action={updateWithId} initial={vehicle} submitLabel="Save Changes" />
    </div>
  );
}
