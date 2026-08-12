const fieldClasses =
  "rounded-xl border border-forest-950/12 bg-ivory px-4 py-3 text-sm text-forest-950 outline-none transition-colors focus:border-terracotta-500";

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs font-medium uppercase tracking-wide text-forest-900/70">
      {children}
    </span>
  );
}

export function FormField({
  label,
  name,
  type = "text",
  required,
  defaultValue,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
  placeholder?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <FieldLabel>{label}</FieldLabel>
      <input
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className={fieldClasses}
      />
    </label>
  );
}

export function FormTextArea({
  label,
  name,
  rows = 3,
  required,
}: {
  label: string;
  name: string;
  rows?: number;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <FieldLabel>{label}</FieldLabel>
      <textarea name={name} rows={rows} required={required} className={fieldClasses} />
    </label>
  );
}
