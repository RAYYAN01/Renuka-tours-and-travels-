"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { sql } from "@/lib/db";
import { getSession } from "@/lib/auth";

function requireSession() {
  return getSession().then((session) => {
    if (!session) throw new Error("Not authenticated");
  });
}

function num(formData: FormData, key: string): number | null {
  const v = formData.get(key);
  if (v === null || v === "") return null;
  const n = Number(v);
  return Number.isNaN(n) ? null : n;
}

function str(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

function bool(formData: FormData, key: string): boolean {
  return formData.get(key) === "on";
}

function revalidatePublicPages() {
  revalidatePath("/fleet");
  revalidatePath("/sitemap.xml");
  revalidatePath("/", "layout");
}

export async function createVehicle(formData: FormData) {
  await requireSession();

  const gallery = str(formData, "gallery")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

  await sql`
    INSERT INTO fleet_vehicles
      (slug, name, tagline, category, category_label, seats, luggage, ac, fuel,
       driver_included, price_from, price_unit, min_km_per_day, driver_bata,
       duty_start, duty_end, price_on_request, image, hero_image, gallery, featured)
    VALUES
      (${str(formData, "slug")}, ${str(formData, "name")}, ${str(formData, "tagline")},
       ${str(formData, "category")}, ${str(formData, "categoryLabel")}, ${num(formData, "seats")},
       ${str(formData, "luggage")}, ${bool(formData, "ac")}, ${str(formData, "fuel")}, ${true},
       ${num(formData, "priceFrom")}, ${"per km"}, ${num(formData, "minKmPerDay")},
       ${num(formData, "driverBata")}, ${str(formData, "dutyStart") || null},
       ${str(formData, "dutyEnd") || null}, ${bool(formData, "priceOnRequest")},
       ${str(formData, "image")}, ${str(formData, "heroImage") || null},
       ${JSON.stringify(gallery)}, ${bool(formData, "featured")})
  `;

  revalidatePublicPages();
  redirect("/admin/fleet");
}

export async function updateVehicle(id: number, formData: FormData) {
  await requireSession();

  const gallery = str(formData, "gallery")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

  await sql`
    UPDATE fleet_vehicles SET
      slug = ${str(formData, "slug")},
      name = ${str(formData, "name")},
      tagline = ${str(formData, "tagline")},
      category = ${str(formData, "category")},
      category_label = ${str(formData, "categoryLabel")},
      seats = ${num(formData, "seats")},
      luggage = ${str(formData, "luggage")},
      ac = ${bool(formData, "ac")},
      fuel = ${str(formData, "fuel")},
      price_from = ${num(formData, "priceFrom")},
      min_km_per_day = ${num(formData, "minKmPerDay")},
      driver_bata = ${num(formData, "driverBata")},
      duty_start = ${str(formData, "dutyStart") || null},
      duty_end = ${str(formData, "dutyEnd") || null},
      price_on_request = ${bool(formData, "priceOnRequest")},
      image = ${str(formData, "image")},
      hero_image = ${str(formData, "heroImage") || null},
      gallery = ${JSON.stringify(gallery)},
      featured = ${bool(formData, "featured")},
      updated_at = now()
    WHERE id = ${id}
  `;

  revalidatePublicPages();
  revalidatePath(`/fleet/${str(formData, "slug")}`);
  redirect("/admin/fleet");
}

export async function deleteVehicle(id: number) {
  await requireSession();
  await sql`DELETE FROM fleet_vehicles WHERE id = ${id}`;
  revalidatePublicPages();
  redirect("/admin/fleet");
}
