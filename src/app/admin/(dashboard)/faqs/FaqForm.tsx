"use client";

export interface FaqFormValues {
  question?: string;
  answer?: string;
  sort_order?: number;
}

export default function FaqForm({
  action,
  initial,
  submitLabel,
}: {
  action: (formData: FormData) => void;
  initial?: FaqFormValues;
  submitLabel: string;
}) {
  return (
    <form action={action} className="flex max-w-2xl flex-col gap-5">
      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-medium text-forest-900">Question</span>
        <input
          name="question"
          defaultValue={initial?.question}
          required
          className="rounded-lg border border-forest-950/15 px-3 py-2 outline-none focus:border-forest-950/40"
        />
      </label>
      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-medium text-forest-900">Answer</span>
        <textarea
          name="answer"
          defaultValue={initial?.answer}
          rows={4}
          required
          className="rounded-lg border border-forest-950/15 px-3 py-2 text-sm outline-none focus:border-forest-950/40"
        />
      </label>
      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-medium text-forest-900">Sort Order (lower shows first)</span>
        <input
          name="sortOrder"
          type="number"
          defaultValue={initial?.sort_order ?? 0}
          className="w-32 rounded-lg border border-forest-950/15 px-3 py-2 outline-none focus:border-forest-950/40"
        />
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
