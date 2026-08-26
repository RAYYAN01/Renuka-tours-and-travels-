"use client";

import { useActionState } from "react";
import { loginAction } from "./actions";

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, undefined);

  return (
    <div className="flex min-h-screen items-center justify-center bg-forest-950 px-4">
      <form
        action={formAction}
        className="flex w-full max-w-sm flex-col gap-4 rounded-2xl bg-ivory-50 p-8 shadow-xl"
      >
        <h1 className="font-serif-luxury text-2xl text-forest-950">Admin Login</h1>
        <p className="text-sm text-forest-900/60">Renuka Tours &amp; Travels — content admin</p>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="username" className="text-sm font-medium text-forest-900">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            required
            autoComplete="username"
            className="rounded-lg border border-forest-950/15 px-3 py-2 text-sm outline-none focus:border-forest-950/40"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className="text-sm font-medium text-forest-900">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="rounded-lg border border-forest-950/15 px-3 py-2 text-sm outline-none focus:border-forest-950/40"
          />
        </div>

        {state?.error && <p className="text-sm text-red-600">{state.error}</p>}

        <button
          type="submit"
          disabled={pending}
          className="mt-2 rounded-full bg-forest-950 px-4 py-2.5 text-sm font-semibold text-ivory transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {pending ? "Signing in…" : "Sign In"}
        </button>
      </form>
    </div>
  );
}
