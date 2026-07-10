import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

type ButtonVariant = "primary" | "outline" | "gradient";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: ButtonVariant;
  href?: string;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-wisk-lime text-wisk-bg hover:brightness-95 border border-transparent",
  outline:
    "border border-wisk-lime/30 bg-transparent text-white hover:border-wisk-lime/50 hover:bg-wisk-lime/5",
  gradient:
    "bg-wisk-lime text-wisk-bg border border-transparent shadow-[0_10px_30px_-10px_rgba(195,255,50,0.4)] hover:shadow-[0_15px_40px_-10px_rgba(195,255,50,0.55)] hover:-translate-y-px hover:brightness-95",
};

function isExternal(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

export function Button({
  variant = "primary",
  href,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium transition-all ${variantClasses[variant]} ${className}`;

  if (href) {
    if (isExternal(href)) {
      return (
        <a href={href} className={classes}>
          {children}
        </a>
      );
    }

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
