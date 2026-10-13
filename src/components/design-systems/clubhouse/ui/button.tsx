import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cx, focusRing, Spinner, type Force } from "./shared";

type Variant = "primary" | "secondary" | "ghost" | "danger" | "success";
type Size = "sm" | "md";

const base =
  "inline-flex select-none items-center justify-center gap-2 rounded-sm border-2 font-club-sign font-medium uppercase tracking-[0.18em] transition-colors disabled:cursor-not-allowed state-active:translate-y-px";

const variants: Record<Variant, string> = {
  primary:
    "border-club-accent bg-club-accent text-club-on-accent state-hover:border-club-accent-hover state-hover:bg-club-accent-hover state-active:bg-club-accent-hover state-active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.35)] disabled:border-club-disabled-bg disabled:bg-club-disabled-bg disabled:text-club-disabled",
  secondary:
    "border-club-text bg-transparent text-club-text state-hover:bg-club-text/5 state-active:bg-club-text/10 disabled:border-club-disabled disabled:bg-transparent disabled:text-club-disabled",
  ghost:
    "border-transparent bg-transparent text-club-text underline-offset-4 state-hover:bg-club-text/5 state-hover:underline state-active:bg-club-text/10 disabled:text-club-disabled disabled:no-underline",
  danger:
    "border-club-flag bg-club-flag text-club-surface state-hover:border-club-flag-hover state-hover:bg-club-flag-hover state-active:bg-club-flag-hover state-active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.35)] disabled:border-club-disabled-bg disabled:bg-club-disabled-bg disabled:text-club-disabled",
  // The "done" state of an action, e.g. Save after saving. Use with aria-disabled so it
  // stays focusable and announced but has no hover or press feedback.
  success: "border-club-success/40 bg-club-success-tint text-club-success aria-disabled:cursor-default",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3 text-xs",
  md: "h-11 px-5 text-sm",
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

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: Variant;
  size?: Size;
  force?: Force;
};

// A link that looks like a button, for calls to action that navigate or jump to a section.
export function ButtonLink({ href, variant = "primary", size = "md", force, className, children, ...rest }: ButtonLinkProps) {
  return (
    <Link href={href} data-force={force} className={cx(base, variants[variant], sizes[size], focusRing, className)} {...rest}>
      {children}
    </Link>
  );
}

type TextLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  external?: boolean;
  force?: Force;
};

const linkStyle =
  "rounded-sm text-club-accent underline decoration-club-accent/40 decoration-1 underline-offset-[3px] transition-colors state-hover:decoration-club-accent state-hover:decoration-2 state-active:text-club-accent-hover";

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
