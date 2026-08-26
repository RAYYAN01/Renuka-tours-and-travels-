import ServiceForm from "../ServiceForm";
import { createService } from "../actions";

export default function NewServicePage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-serif-luxury text-3xl text-forest-950">Add Service</h1>
      <ServiceForm action={createService} submitLabel="Create Service" />
    </div>
  );
}
