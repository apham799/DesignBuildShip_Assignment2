import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cx, focusRing, Spinner, type Force } from "./shared";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md";

const base =
  "inline-flex select-none items-center justify-center gap-2 rounded-full font-night-display font-bold uppercase tracking-[0.06em] transition-[background-color,box-shadow,transform,color] disabled:cursor-not-allowed state-active:scale-[0.97]";

// Fills get brighter and glow on hover, like a lit arcade button.
const variants: Record<Variant, string> = {
  primary:
    "bg-night-accent text-night-on-accent state-hover:bg-night-accent-hover state-hover:shadow-[0_0_24px_-4px_rgba(200,255,77,0.75)] state-active:bg-night-accent state-active:shadow-[inset_0_2px_6px_rgba(0,0,0,0.45)] disabled:bg-night-disabled-bg disabled:text-night-disabled disabled:shadow-none",
  secondary:
    "border-2 border-night-select bg-transparent text-night-select state-hover:bg-night-select/10 state-hover:shadow-[0_0_20px_-4px_rgba(92,225,230,0.7)] state-active:bg-night-select/20 disabled:border-night-disabled disabled:bg-transparent disabled:text-night-disabled disabled:shadow-none",
  ghost:
    "bg-transparent text-night-text state-hover:bg-white/5 state-active:bg-white/10 disabled:text-night-disabled",
  danger:
    "bg-night-danger text-night-on-accent state-hover:bg-night-danger-hover state-hover:shadow-[0_0_22px_-4px_rgba(255,107,112,0.7)] state-active:shadow-[inset_0_2px_6px_rgba(0,0,0,0.45)] disabled:bg-night-disabled-bg disabled:text-night-disabled disabled:shadow-none",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[11px]",
  md: "h-12 px-6 text-xs",
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

// Hover switches the link to tracer lime with a faint glow.
const linkStyle =
  "rounded-sm text-night-link underline decoration-night-link/50 underline-offset-4 transition-colors state-hover:text-night-accent state-hover:decoration-night-accent state-hover:[text-shadow:0_0_12px_rgba(200,255,77,0.6)] state-active:text-night-accent-hover";

export function TextLink({ href, external = false, force, className, children, ...rest }: TextLinkProps) {
  const classes = cx(linkStyle, focusRing, className);
  if (external) {
    return (
      // relative keeps the visually hidden "(opens in a new tab)" inside the link, so it
      // can't escape a scroll container and widen the page.
      <a href={href} target="_blank" rel="noopener noreferrer" data-force={force} className={cx("relative", classes)} {...rest}>
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
