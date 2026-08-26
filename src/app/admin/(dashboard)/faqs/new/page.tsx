import FaqForm from "../FaqForm";
import { createFaq } from "../actions";

export default function NewFaqPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-serif-luxury text-3xl text-forest-950">Add FAQ</h1>
      <FaqForm action={createFaq} submitLabel="Create FAQ" />
    </div>
  );
}
