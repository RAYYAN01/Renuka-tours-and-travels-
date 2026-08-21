"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { animate, stagger, createScope, type Scope } from "animejs";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/cn";
import Button from "@/components/ui/Button";
import { site, telHref } from "@/lib/site";

const links = [
  { href: "/", label: "Home" },
  { href: "/fleet", label: "Our Fleet" },
  { href: "/destinations", label: "Destinations" },
  { href: "/gallery", label: "Gallery" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const scope = useRef<Scope | null>(null);

  useEffect(() => {
    const onScrollHandler = () => setScrolled(window.scrollY > 16);
    onScrollHandler();
    window.addEventListener("scroll", onScrollHandler, { passive: true });
    return () => window.removeEventListener("scroll", onScrollHandler);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open || !menuRef.current) return;
    scope.current = createScope({ root: menuRef }).add(() => {
      animate(menuRef.current!, {
        opacity: [0, 1],
        translateY: [-12, 0],
        duration: 220,
        ease: "outQuad",
      });
      animate(".mobile-nav-link", {
        opacity: [0, 1],
        translateX: [-12, 0],
        duration: 350,
        delay: stagger(50, { start: 60 }),
        ease: "outExpo",
      });
    });
    return () => scope.current?.revert();
  }, [open]);

  const isHome = pathname === "/";
  const showGlass = scrolled || open || !isHome;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        showGlass ? "glass-nav-dark" : "bg-transparent",
        scrolled ? "py-2.5" : "py-4"
      )}
    >
      <div className="mx-auto flex w-full max-w-8xl items-center justify-between px-6 sm:px-8 lg:px-12">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/logo.png"
            alt={site.name}
            width={44}
            height={44}
            className="h-10 w-10 rounded-full object-cover sm:h-11 sm:w-11"
            priority
          />
          <span className="hidden text-xs font-semibold uppercase tracking-[0.24em] text-terracotta-300 sm:inline">
            Tours &amp; Travels
          </span>
        </Link>

        <nav className="hidden items-center lg:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative shrink-0 whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium transition-colors hover:bg-white/10",
                  active ? "text-terracotta-300" : "text-ivory/80 hover:text-ivory"
                )}
              >
                {link.label}
                {active && (
                  <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-terracotta-300" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          <a
            href={telHref}
            className="flex items-center gap-2 whitespace-nowrap text-sm font-medium text-ivory/85 transition-colors hover:text-terracotta-300"
          >
            <Phone className="h-4 w-4" strokeWidth={1.75} />
            {site.phone}
          </a>
          <Button href="/booking" size="md">
            Book a Ride
          </Button>
        </div>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 items-center justify-center rounded-full text-ivory transition-colors hover:bg-white/10 lg:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div
          ref={menuRef}
          className="glass-dark mx-4 mt-2 overflow-hidden rounded-2xl lg:hidden"
        >
          <div className="flex flex-col gap-1 p-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "mobile-nav-link rounded-lg px-4 py-3 text-base font-medium text-ivory/90 transition-colors hover:bg-white/10",
                  pathname === link.href && "text-terracotta-300"
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="mobile-nav-link mt-2 flex flex-col gap-3 border-t border-white/15 pt-3 px-4 pb-2">
              <a
                href={telHref}
                className="flex items-center gap-2 text-sm font-medium text-ivory/85"
              >
                <Phone className="h-4 w-4" strokeWidth={1.75} />
                {site.phone}
              </a>
              <Button
                href="/booking"
                size="lg"
                className="w-full"
                onClick={() => setOpen(false)}
              >
                Book a Ride
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
