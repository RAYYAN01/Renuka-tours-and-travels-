"use client";

const TOURISM_BOARDS = [
  "Karnataka",
  "Kerala",
  "Tamil Nadu",
  "Goa",
  "Puducherry",
  "Andhra Pradesh",
  "TTD",
];

export interface DestinationFormValues {
  slug?: string;
  name?: string;
  kind?: string;
  distance?: string;
  duration?: string;
  estimated_cost?: string;
  recommended_vehicle?: string;
  image?: string;
  description?: string;
  featured?: boolean;
  official_tourism_board?: string;
}

export default function DestinationForm({
  action,
  initial,
  submitLabel,
}: {
  action: (formData: FormData) => void;
  initial?: DestinationFormValues;
  submitLabel: string;
}) {
  return (
    <form action={action} className="flex max-w-2xl flex-col gap-5">
      <Field label="Slug (URL path)" name="slug" defaultValue={initial?.slug} required />
      <Field label="Name" name="name" defaultValue={initial?.name} required />
      <Field label="Kind (e.g. Hill Station)" name="kind" defaultValue={initial?.kind} required />

      <div className="grid grid-cols-2 gap-4">
        <Field label="Distance" name="distance" defaultValue={initial?.distance} placeholder="260 km" required />
        <Field label="Duration" name="duration" defaultValue={initial?.duration} placeholder="~6 hrs" required />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field
          label="Estimated Cost"
          name="estimatedCost"
          defaultValue={initial?.estimated_cost}
          placeholder="₹5,500 – ₹7,800"
          required
        />
        <Field
          label="Recommended Vehicle"
          name="recommendedVehicle"
          defaultValue={initial?.recommended_vehicle}
          placeholder="SUV or Tempo Traveller"
          required
        />
      </div>

      <Field label="Image Path" name="image" defaultValue={initial?.image} required placeholder="/coorg.jpg" />
      <TextAreaField label="Description" name="description" defaultValue={initial?.description} />

      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-medium text-forest-900">Official Tourism Board</span>
        <select
          name="officialTourismBoard"
          defaultValue={initial?.official_tourism_board}
          className="rounded-lg border border-forest-950/15 px-3 py-2 outline-none focus:border-forest-950/40"
        >
          {TOURISM_BOARDS.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </label>

      <label className="flex items-center gap-2 text-sm text-forest-900">
        <input type="checkbox" name="featured" defaultChecked={initial?.featured ?? false} className="h-4 w-4" />
        Featured on Homepage
      </label>

      <button
        type="submit"
        className="mt-2 w-fit rounded-full bg-forest-950 px-5 py-2.5 text-sm font-semibold text-ivory hover:opacity-90"
      >
        {submitLabel}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  defaultValue,
  required,
  placeholder,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="font-medium text-forest-900">{label}</span>
      <input
        name={name}
        defaultValue={defaultValue}
        required={required}
        placeholder={placeholder}
        className="rounded-lg border border-forest-950/15 px-3 py-2 outline-none focus:border-forest-950/40"
      />
    </label>
  );
}

function TextAreaField({
  label,
  name,
  defaultValue,
}: {
  label: string;
  name: string;
  defaultValue?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="font-medium text-forest-900">{label}</span>
      <textarea
        name={name}
        defaultValue={defaultValue}
        rows={3}
        className="rounded-lg border border-forest-950/15 px-3 py-2 text-sm outline-none focus:border-forest-950/40"
      />
    </label>
  );
}
