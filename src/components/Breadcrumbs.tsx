import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { type BreadcrumbItem, breadcrumbJsonLd, jsonLdScriptProps } from "@/lib/seo";

export default function Breadcrumbs({
  items,
  tone = "light",
}: {
  items: BreadcrumbItem[];
  tone?: "light" | "dark";
}) {
  return (
    <>
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1.5 text-xs">
          {items.map((item, i) => {
            const isLast = i === items.length - 1;
            return (
              <li key={item.label} className="flex items-center gap-1.5">
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className={
                      tone === "light"
                        ? "text-ivory/60 transition-colors hover:text-ivory"
                        : "text-forest-900/70 transition-colors hover:text-forest-950"
                    }
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    className={tone === "light" ? "text-ivory/90" : "text-forest-950/80"}
                    aria-current={isLast ? "page" : undefined}
                  >
                    {item.label}
                  </span>
                )}
                {!isLast && (
                  <ChevronRight
                    className={tone === "light" ? "h-3 w-3 text-ivory/40" : "h-3 w-3 text-forest-900/30"}
                  />
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScriptProps(breadcrumbJsonLd(items))}
      />
    </>
  );
}
