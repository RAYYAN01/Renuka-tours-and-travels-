import { cn } from "@/lib/cn";

export default function Container({
  children,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}) {
  return (
    <Tag className={cn("mx-auto w-full max-w-8xl px-6 sm:px-8 lg:px-12", className)}>
      {children}
    </Tag>
  );
}
