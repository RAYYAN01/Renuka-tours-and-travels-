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

function bool(formData: FormData, key: string): boolean {
  return formData.get(key) === "on";
}

function revalidatePublicPages() {
  revalidatePath("/destinations");
  revalidatePath("/", "layout");
}

export async function createDestination(formData: FormData) {
  await requireSession();

  await sql`
    INSERT INTO destinations
      (slug, name, kind, distance, duration, estimated_cost, recommended_vehicle,
       image, description, featured, official_tourism_board)
    VALUES
      (${str(formData, "slug")}, ${str(formData, "name")}, ${str(formData, "kind")},
       ${str(formData, "distance")}, ${str(formData, "duration")}, ${str(formData, "estimatedCost")},
       ${str(formData, "recommendedVehicle")}, ${str(formData, "image")},
       ${str(formData, "description")}, ${bool(formData, "featured")},
       ${str(formData, "officialTourismBoard")})
  `;

  revalidatePublicPages();
  redirect("/admin/destinations");
}

export async function updateDestination(id: number, formData: FormData) {
  await requireSession();

  await sql`
    UPDATE destinations SET
      slug = ${str(formData, "slug")},
      name = ${str(formData, "name")},
      kind = ${str(formData, "kind")},
      distance = ${str(formData, "distance")},
      duration = ${str(formData, "duration")},
      estimated_cost = ${str(formData, "estimatedCost")},
      recommended_vehicle = ${str(formData, "recommendedVehicle")},
      image = ${str(formData, "image")},
      description = ${str(formData, "description")},
      featured = ${bool(formData, "featured")},
      official_tourism_board = ${str(formData, "officialTourismBoard")},
      updated_at = now()
    WHERE id = ${id}
  `;

  revalidatePublicPages();
  revalidatePath(`/destinations/${str(formData, "slug")}`);
  redirect("/admin/destinations");
}

export async function deleteDestination(id: number) {
  await requireSession();
  await sql`DELETE FROM destinations WHERE id = ${id}`;
  revalidatePublicPages();
  redirect("/admin/destinations");
}
