"use client";

import { serializeSections, type Section } from "@/lib/sections-format";

export interface BlogFormValues {
  slug?: string;
  title?: string;
  meta_title?: string | null;
  excerpt?: string;
  category?: string;
  published_date?: string;
  reading_time?: string;
  cover_image?: string;
  cover_image_alt?: string;
  keywords?: string[];
  sections?: Section[];
}

export default function BlogForm({
  action,
  initial,
  submitLabel,
}: {
  action: (formData: FormData) => void;
  initial?: BlogFormValues;
  submitLabel: string;
}) {
  const publishedDate = initial?.published_date
    ? new Date(initial.published_date).toISOString().slice(0, 10)
    : undefined;

  return (
    <form action={action} className="flex max-w-2xl flex-col gap-5">
      <Field label="Slug (URL path)" name="slug" defaultValue={initial?.slug} required />
      <Field label="Title (full, on-page H1)" name="title" defaultValue={initial?.title} required />
      <Field
        label="Meta Title (short, for SEO — optional)"
        name="metaTitle"
        defaultValue={initial?.meta_title ?? undefined}
      />
      <TextAreaField label="Excerpt / Meta Description" name="excerpt" defaultValue={initial?.excerpt} rows={2} />

      <div className="grid grid-cols-3 gap-4">
        <Field label="Category" name="category" defaultValue={initial?.category} required />
        <Field label="Published Date" name="publishedDate" type="date" defaultValue={publishedDate} required />
        <Field label="Reading Time" name="readingTime" defaultValue={initial?.reading_time} placeholder="6 min read" required />
      </div>

      <Field label="Cover Image Path" name="coverImage" defaultValue={initial?.cover_image} required placeholder="/coorg.jpg" />
      <Field label="Cover Image Alt Text" name="coverImageAlt" defaultValue={initial?.cover_image_alt} required />
      <TextAreaField
        label="Keywords (one per line)"
        name="keywords"
        defaultValue={initial?.keywords?.join("\n")}
        rows={3}
      />

      <TextAreaField
        label={'Content sections — separate sections with a blank line. Start a section with "## Heading" for a subheading, or omit it for intro text.'}
        name="sections"
        defaultValue={initial?.sections ? serializeSections(initial.sections) : undefined}
        rows={16}
        mono
      />

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
  defaultValue?: string;
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
  rows = 3,
  mono,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  rows?: number;
  mono?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="font-medium text-forest-900">{label}</span>
      <textarea
        name={name}
        defaultValue={defaultValue}
        rows={rows}
        className={`rounded-lg border border-forest-950/15 px-3 py-2 text-sm outline-none focus:border-forest-950/40 ${mono ? "font-mono text-xs" : ""}`}
      />
    </label>
  );
}
