// Shared helpers for Design System 01 components.

// Forces a visual state through data-force (see the state-* variants in globals.css).
// Only the docs should pass this; real usage relies on the pseudo-classes.
export type Force = "hover" | "focus" | "active";

export function cx(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export const focusRing =
  "outline-none state-focus:ring-2 state-focus:ring-club-focus state-focus:ring-offset-2 state-focus:ring-offset-club-surface";

// A golf ball that rolls. Stops rolling for reduced-motion users but stays visible.
export function Spinner({ className = "size-4", label }: { className?: string; label?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={cx("motion-safe:animate-spin", className)}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <circle cx="10" cy="10" r="8" fill="currentColor" opacity="0.25" />
      <path d="M10 2 A8 8 0 0 1 18 10" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="8" cy="8" r="1" fill="currentColor" />
      <circle cx="12" cy="9" r="1" fill="currentColor" />
      <circle cx="9" cy="12" r="1" fill="currentColor" />
    </svg>
  );
}
