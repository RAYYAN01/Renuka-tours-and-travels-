"use client";

import { useState, type FormEvent } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import Magnetic from "@/components/ui/Magnetic";
import { FormField, FormTextArea } from "@/components/ui/FormField";
import { whatsappHref } from "@/lib/site";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const lines = [
      `Name: ${form.get("name")}`,
      `Phone: ${form.get("phone")}`,
      form.get("email") && `Email: ${form.get("email")}`,
      form.get("subject") && `Subject: ${form.get("subject")}`,
      `Message: ${form.get("message")}`,
    ].filter(Boolean);

    window.open(whatsappHref(lines.join("\n")), "_blank", "noopener,noreferrer");
    setSent(true);
  }

  if (sent) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 rounded-2xl border border-forest-950/8 bg-ivory-50 p-10 text-center">
        <CheckCircle2 className="h-10 w-10 text-terracotta-600" strokeWidth={1.5} />
        <h3 className="font-serif-luxury text-2xl text-forest-950">Message sent</h3>
        <p className="max-w-sm text-sm text-forest-900/60">
          We&apos;ve opened WhatsApp with your message pre-filled — just hit
          send and our team will get back to you within the hour.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 rounded-2xl border border-forest-950/8 bg-ivory-50 p-7 sm:p-9"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Full Name" name="name" required />
        <FormField label="Phone Number" name="phone" type="tel" required />
      </div>
      <FormField label="Email" name="email" type="email" />
      <FormField label="Subject" name="subject" placeholder="e.g. Outstation trip to Coorg" />
      <FormTextArea label="Message" name="message" rows={4} required />
      <Magnetic strength={0.2} className="self-start">
        <button
          type="submit"
          className="group flex items-center gap-2 rounded-full bg-terracotta-600 px-6 py-3 text-sm font-semibold text-ivory-50 shadow-terracotta transition-colors hover:bg-terracotta-700"
        >
          Send Message
          <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </Magnetic>
    </form>
  );
}
