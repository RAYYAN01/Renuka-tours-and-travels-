"use server";

import { redirect } from "next/navigation";
import { login } from "@/lib/auth";

export async function loginAction(
  _prevState: { error?: string } | undefined,
  formData: FormData
): Promise<{ error?: string }> {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!username || !password) {
    return { error: "Username and password are required." };
  }

  const user = await login(username, password);
  if (!user) {
    return { error: "Invalid username or password." };
  }

  redirect("/admin");
}
