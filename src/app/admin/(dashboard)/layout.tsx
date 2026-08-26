import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { logoutAction } from "./logout-action";

const navLinks = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/fleet", label: "Fleet" },
  { href: "/admin/destinations", label: "Destinations" },
  { href: "/admin/services", label: "Services" },
  { href: "/admin/blog", label: "Blog" },
  { href: "/admin/faqs", label: "FAQs" },
];

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-[var(--md-surface)]">
      <header className="flex items-center justify-between border-b border-forest-950/10 bg-ivory-50 px-6 py-4">
        <div className="flex items-center gap-6">
          <span className="font-serif-luxury text-lg text-forest-950">Renuka Admin</span>
          <nav className="flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-3 py-1.5 text-sm font-medium text-forest-900/70 transition-colors hover:bg-forest-950/5 hover:text-forest-950"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-forest-900/60">{session.username}</span>
          <form action={logoutAction}>
            <button
              type="submit"
              className="rounded-full border border-forest-950/15 px-3 py-1.5 text-sm font-medium text-forest-900/70 hover:bg-forest-950/5"
            >
              Log Out
            </button>
          </form>
        </div>
      </header>
      <main className="mx-auto max-w-6xl p-6">{children}</main>
    </div>
  );
}
