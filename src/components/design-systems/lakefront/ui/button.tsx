import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cx, focusRing, Spinner, type Force } from "./shared";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md";

const base =
  "inline-flex select-none items-center justify-center gap-2 border-2 font-line-sans font-bold transition-colors disabled:cursor-not-allowed state-active:translate-y-px";

const variants: Record<Variant, string> = {
  primary:
    "border-line-accent bg-line-accent text-line-on-accent state-hover:border-line-accent-hover state-hover:bg-line-accent-hover state-active:border-black state-active:bg-black disabled:border-line-disabled-bg disabled:bg-line-disabled-bg disabled:text-line-disabled",
  // Hover fills with the signal yellow, like a lit platform sign.
  secondary:
    "border-line-accent bg-line-surface text-line-text state-hover:bg-line-highlight state-active:bg-line-highlight state-active:shadow-[inset_0_2px_0_rgba(0,0,0,0.25)] disabled:border-line-disabled disabled:bg-line-surface disabled:text-line-disabled",
  ghost:
    "border-transparent bg-transparent text-line-text underline decoration-2 underline-offset-4 state-hover:bg-line-highlight-tint state-active:bg-line-highlight disabled:text-line-disabled disabled:no-underline",
  danger:
    "border-line-danger bg-line-danger text-line-on-accent state-hover:border-line-danger-hover state-hover:bg-line-danger-hover state-active:bg-line-danger-hover disabled:border-line-disabled-bg disabled:bg-line-disabled-bg disabled:text-line-disabled",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-12 px-5 text-base",
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  force?: Force;
  icon?: ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  force,
  icon,
  className,
  children,
  disabled,
  type = "button",
  onClick,
  ...rest
}: ButtonProps) {
  // While loading the button keeps its color but ignores clicks (aria-disabled, not disabled,
  // so it stays focusable and screen readers hear that it is busy).
  return (
    <button
      type={loading ? "button" : type}
      data-force={force}
      disabled={disabled}
      aria-disabled={loading || undefined}
      aria-busy={loading || undefined}
      onClick={loading ? undefined : onClick}
      className={cx(base, variants[variant], sizes[size], focusRing, loading && "cursor-progress", className)}
      {...rest}
    >
      {loading ? <Spinner /> : icon}
      {children}
    </button>
  );
}

type TextLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  external?: boolean;
  force?: Force;
};

// Hover paints a highlighter swipe behind the text and switches it to ink.
const linkStyle =
  "font-semibold text-line-link underline decoration-2 underline-offset-[3px] transition-colors state-hover:bg-line-highlight-tint state-hover:text-line-text state-active:bg-line-highlight state-active:text-line-text";

export function TextLink({ href, external = false, force, className, children, ...rest }: TextLinkProps) {
  const classes = cx(linkStyle, focusRing, className);
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" data-force={force} className={classes} {...rest}>
        {children}
        <span aria-hidden> ↗</span>
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }
  return (
    <Link href={href} data-force={force} className={classes} {...rest}>
      {children}
    </Link>
  );
}
