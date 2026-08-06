"use client";

import { Send, CheckCircle2 } from "lucide-react";
import Button from "@/components/ui/Button";
import { FormField, FormTextArea } from "@/components/ui/FormField";
import { useWhatsAppSubmit } from "@/lib/useWhatsAppSubmit";

export default function ContactForm() {
  const { sent, handleSubmit } = useWhatsAppSubmit((form) => {
    const lines = [
      `Name: ${form.get("name")}`,
      `Phone: ${form.get("phone")}`,
      form.get("email") && `Email: ${form.get("email")}`,
      form.get("subject") && `Subject: ${form.get("subject")}`,
      `Message: ${form.get("message")}`,
    ].filter(Boolean);
    return lines.join("\n");
  });

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
      <Button
        type="submit"
        size="lg"
        className="self-start"
        icon={<Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />}
      >
        Send Message
      </Button>
    </form>
  );
}
