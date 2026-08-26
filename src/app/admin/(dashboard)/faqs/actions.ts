"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { sql } from "@/lib/db";
import { getSession } from "@/lib/auth";

async function requireSession() {
  const session = await getSession();
  if (!session) throw new Error("Not authenticated");
}

function str(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

function num(formData: FormData, key: string): number {
  return Number(formData.get(key) ?? 0) || 0;
}

function revalidatePublicPages() {
  revalidatePath("/");
}

export async function createFaq(formData: FormData) {
  await requireSession();
  await sql`
    INSERT INTO faqs (question, answer, sort_order)
    VALUES (${str(formData, "question")}, ${str(formData, "answer")}, ${num(formData, "sortOrder")})
  `;
  revalidatePublicPages();
  redirect("/admin/faqs");
}

export async function updateFaq(id: number, formData: FormData) {
  await requireSession();
  await sql`
    UPDATE faqs SET
      question = ${str(formData, "question")},
      answer = ${str(formData, "answer")},
      sort_order = ${num(formData, "sortOrder")},
      updated_at = now()
    WHERE id = ${id}
  `;
  revalidatePublicPages();
  redirect("/admin/faqs");
}

export async function deleteFaq(id: number) {
  await requireSession();
  await sql`DELETE FROM faqs WHERE id = ${id}`;
  revalidatePublicPages();
  redirect("/admin/faqs");
}
