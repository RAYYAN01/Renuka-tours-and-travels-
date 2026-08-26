import DestinationForm from "../DestinationForm";
import { createDestination } from "../actions";

export default function NewDestinationPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-serif-luxury text-3xl text-forest-950">Add Destination</h1>
      <DestinationForm action={createDestination} submitLabel="Create Destination" />
    </div>
  );
}
