"use client";

const CATEGORIES = [
  { value: "sedan", label: "Sedan" },
  { value: "suv", label: "SUV" },
  { value: "traveller", label: "Tempo Traveller" },
  { value: "luxury-van", label: "Luxury Van" },
  { value: "coach", label: "Coach" },
];

export interface FleetFormValues {
  slug?: string;
  name?: string;
  tagline?: string;
  category?: string;
  category_label?: string;
  seats?: number;
  luggage?: string;
  ac?: boolean;
  fuel?: string;
  price_from?: number | null;
  min_km_per_day?: number | null;
  driver_bata?: number | null;
  duty_start?: string | null;
  duty_end?: string | null;
  price_on_request?: boolean;
  image?: string;
  gallery?: string[];
  featured?: boolean;
}

export default function FleetForm({
  action,
  initial,
  submitLabel,
}: {
  action: (formData: FormData) => void;
  initial?: FleetFormValues;
  submitLabel: string;
}) {
  return (
    <form action={action} className="flex max-w-2xl flex-col gap-5">
      <Field label="Slug (URL path)" name="slug" defaultValue={initial?.slug} required />
      <Field label="Name" name="name" defaultValue={initial?.name} required />
      <Field label="Tagline" name="tagline" defaultValue={initial?.tagline} required />

      <div className="grid grid-cols-2 gap-4">
        <SelectField
          label="Category"
          name="category"
          defaultValue={initial?.category}
          options={CATEGORIES}
        />
        <Field
          label="Category Label"
          name="categoryLabel"
          defaultValue={initial?.category_label}
          required
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Field label="Seats" name="seats" type="number" defaultValue={initial?.seats} required />
        <Field label="Luggage" name="luggage" defaultValue={initial?.luggage} required />
        <Field label="Fuel" name="fuel" defaultValue={initial?.fuel} required />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Field
          label="Price From (₹/km)"
          name="priceFrom"
          type="number"
          defaultValue={initial?.price_from ?? undefined}
        />
        <Field
          label="Min km/day"
          name="minKmPerDay"
          type="number"
          defaultValue={initial?.min_km_per_day ?? undefined}
        />
        <Field
          label="Driver Bata (₹/day)"
          name="driverBata"
          type="number"
          defaultValue={initial?.driver_bata ?? undefined}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Duty Start" name="dutyStart" defaultValue={initial?.duty_start ?? undefined} placeholder="6:00 AM" />
        <Field label="Duty End" name="dutyEnd" defaultValue={initial?.duty_end ?? undefined} placeholder="10:00 PM" />
      </div>

      <Field label="Main Image Path" name="image" defaultValue={initial?.image} required placeholder="/fleet/example.jpeg" />
      <TextAreaField
        label="Gallery Image Paths (one per line)"
        name="gallery"
        defaultValue={initial?.gallery?.join("\n")}
      />

      <div className="flex gap-6">
        <Checkbox label="AC" name="ac" defaultChecked={initial?.ac ?? true} />
        <Checkbox label="Price on Request" name="priceOnRequest" defaultChecked={initial?.price_on_request ?? false} />
        <Checkbox label="Featured on Homepage" name="featured" defaultChecked={initial?.featured ?? false} />
      </div>

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
  type = "text",
  defaultValue,
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string | number;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="font-medium text-forest-900">{label}</span>
      <input
        name={name}
        type={type}
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
        rows={4}
        className="rounded-lg border border-forest-950/15 px-3 py-2 font-mono text-xs outline-none focus:border-forest-950/40"
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  defaultValue,
  options,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="font-medium text-forest-900">{label}</span>
      <select
        name={name}
        defaultValue={defaultValue}
        className="rounded-lg border border-forest-950/15 px-3 py-2 outline-none focus:border-forest-950/40"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function Checkbox({
  label,
  name,
  defaultChecked,
}: {
  label: string;
  name: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex items-center gap-2 text-sm text-forest-900">
      <input type="checkbox" name={name} defaultChecked={defaultChecked} className="h-4 w-4" />
      {label}
    </label>
  );
}
