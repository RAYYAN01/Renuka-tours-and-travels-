import Link from "next/link";
import { cn } from "@/lib/cn";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  variant?: "filled" | "tonal" | "outlined" | "text" | "tertiary" | "whatsapp";
  size?: "md" | "lg";
  className?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  icon?: React.ReactNode;
};

const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  filled: "md-btn md-btn-filled text-[0.875rem]",
  tonal: "md-btn md-btn-tonal text-[0.875rem]",
  tertiary: "md-btn md-btn-tertiary text-[0.875rem]",
  outlined: "md-btn md-btn-outlined text-[0.875rem]",
  text: "md-btn-text md-btn text-[0.875rem]",
  whatsapp: "md-btn md-btn-whatsapp text-[0.875rem]",
};

const sizes: Record<NonNullable<ButtonProps["size"]>, string> = {
  md: "h-11 px-6",
  lg: "h-[3.25rem] px-7 text-base",
};

export default function Button({
  children,
  href,
  variant = "filled",
  size = "md",
  className,
  target,
  rel,
  onClick,
  type = "button",
  icon,
}: ButtonProps) {
  const classes = cn(
    "group focus-visible:outline-primary focus-visible:outline-2 focus-visible:outline-offset-2 transition-colors",
    variants[variant],
    sizes[size],
    className
  );

  // Wrapped so the label/icon paint above the glass sheen pseudo-element
  // (see .md-btn::after / .md-btn > * in globals.css).
  const inner = (
    <>
      <span>{children}</span>
      {icon}
    </>
  );

  return href ? (
    <Link href={href} className={classes} target={target} rel={rel} onClick={onClick}>
      {inner}
    </Link>
  ) : (
    <button type={type} onClick={onClick} className={classes}>
      {inner}
    </button>
  );
}
