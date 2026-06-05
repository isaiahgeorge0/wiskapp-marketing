import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

type ButtonVariant = "primary" | "outline";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: ButtonVariant;
  href?: string;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-wisk-purple text-white hover:bg-[#8f88e3] border border-transparent",
  outline:
    "border border-wisk-border bg-transparent text-white hover:border-white/20 hover:bg-white/5",
};

export function Button({
  variant = "primary",
  href,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium transition-colors ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
