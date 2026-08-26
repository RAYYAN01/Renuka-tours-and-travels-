"use client";

import { ICON_NAMES } from "@/lib/icon-registry";

export interface ServiceFormValues {
  slug?: string;
  title?: string;
  icon?: string;
  description?: string;
  features?: string[];
  pricing_note?: string;
  image?: string;
  image_alt?: string;
}

export default function ServiceForm({
  action,
  initial,
  submitLabel,
}: {
  action: (formData: FormData) => void;
  initial?: ServiceFormValues;
  submitLabel: string;
}) {
  return (
    <form action={action} className="flex max-w-2xl flex-col gap-5">
      <Field label="Slug (id, e.g. 'airport')" name="slug" defaultValue={initial?.slug} required />
      <Field label="Title" name="title" defaultValue={initial?.title} required />

      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-medium text-forest-900">Icon</span>
        <select
          name="icon"
          defaultValue={initial?.icon}
          className="rounded-lg border border-forest-950/15 px-3 py-2 outline-none focus:border-forest-950/40"
        >
          {ICON_NAMES.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </label>

      <TextAreaField label="Description" name="description" defaultValue={initial?.description} />
      <TextAreaField
        label="Features (one per line)"
        name="features"
        defaultValue={initial?.features?.join("\n")}
      />
      <Field label="Pricing Note" name="pricingNote" defaultValue={initial?.pricing_note} required />
      <Field label="Image Path" name="image" defaultValue={initial?.image} required placeholder="/fleet/example.jpeg" />
      <Field label="Image Alt Text" name="imageAlt" defaultValue={initial?.image_alt} required />

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
