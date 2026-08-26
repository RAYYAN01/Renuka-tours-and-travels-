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

function revalidatePublicPages() {
  revalidatePath("/services");
  revalidatePath("/", "layout");
}

export async function createService(formData: FormData) {
  await requireSession();

  const features = str(formData, "features")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

  await sql`
    INSERT INTO services (slug, title, icon, description, features, pricing_note, image, image_alt)
    VALUES
      (${str(formData, "slug")}, ${str(formData, "title")}, ${str(formData, "icon")},
       ${str(formData, "description")}, ${JSON.stringify(features)},
       ${str(formData, "pricingNote")}, ${str(formData, "image")}, ${str(formData, "imageAlt")})
  `;

  revalidatePublicPages();
  redirect("/admin/services");
}

export async function updateService(id: number, formData: FormData) {
  await requireSession();

  const features = str(formData, "features")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

  await sql`
    UPDATE services SET
      slug = ${str(formData, "slug")},
      title = ${str(formData, "title")},
      icon = ${str(formData, "icon")},
      description = ${str(formData, "description")},
      features = ${JSON.stringify(features)},
      pricing_note = ${str(formData, "pricingNote")},
      image = ${str(formData, "image")},
      image_alt = ${str(formData, "imageAlt")},
      updated_at = now()
    WHERE id = ${id}
  `;

  revalidatePublicPages();
  redirect("/admin/services");
}

export async function deleteService(id: number) {
  await requireSession();
  await sql`DELETE FROM services WHERE id = ${id}`;
  revalidatePublicPages();
  redirect("/admin/services");
}
