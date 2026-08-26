import "server-only";
import { sql } from "@/lib/db";
import type { FAQItem } from "@/lib/faq";

export async function getFaqs(): Promise<FAQItem[]> {
  const rows = await sql`SELECT question, answer FROM faqs ORDER BY sort_order`;
  return rows.map((r) => ({ question: r.question as string, answer: r.answer as string }));
}
