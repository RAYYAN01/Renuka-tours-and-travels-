import type { CSSProperties, ReactNode } from "react";

/**
 * Scopes a heading/body font pairing to one page's content. Wraps the page
 * in a div that (a) sets font-family directly so plain text inherits it, and
 * (b) overrides the --font-serif/--font-sans theme tokens so any component
 * using .font-serif-luxury or Tailwind's font-sans utility picks it up too.
 * Navbar/Footer live outside this scope and keep the site-wide default.
 */
export default function PageFontScope({
  heading,
  body,
  children,
}: {
  heading: string;
  body: string;
  children: ReactNode;
}) {
  const style = {
    fontFamily: body,
    "--font-serif": heading,
    "--font-sans": body,
  } as CSSProperties;

  return <div style={style}>{children}</div>;
}
