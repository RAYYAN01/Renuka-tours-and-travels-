import FleetForm from "../FleetForm";
import { createVehicle } from "../actions";

export default function NewVehiclePage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-serif-luxury text-3xl text-forest-950">Add Vehicle</h1>
      <FleetForm action={createVehicle} submitLabel="Create Vehicle" />
    </div>
  );
}
