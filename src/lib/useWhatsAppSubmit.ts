"use client";

import { useState, type FormEvent } from "react";
import { whatsappHref } from "@/lib/site";

/** Shared submit handler for forms that deliver via a WhatsApp deep-link
 * instead of a backend: builds a message from the submitted form data,
 * opens WhatsApp with it pre-filled, and flips a `sent` flag the caller
 * uses to swap in a confirmation state. */
export function useWhatsAppSubmit(buildMessage: (form: FormData) => string) {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    window.open(whatsappHref(buildMessage(form)), "_blank", "noopener,noreferrer");
    setSent(true);
  }

  return { sent, handleSubmit };
}
