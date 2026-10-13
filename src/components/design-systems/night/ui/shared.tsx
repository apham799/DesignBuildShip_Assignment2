// Shared helpers for Design System 03 components.

// Forces a visual state through data-force (see the state-* variants in globals.css).
export type Force = "hover" | "focus" | "active";

export function cx(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

// Cyan ring plus a soft glow, so focus reads as light on the dark ground.
export const focusRing =
  "outline-none state-focus:ring-2 state-focus:ring-night-focus state-focus:ring-offset-2 state-focus:ring-offset-night-surface state-focus:shadow-[0_0_20px_-2px_rgba(92,225,230,0.8)]";

// A ball in orbit. Stops orbiting for reduced-motion users but stays visible.
export function Spinner({ className = "size-4", label }: { className?: string; label?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={cx("motion-safe:animate-spin", className)}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <circle cx="10" cy="10" r="7" fill="none" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" />
      <circle cx="10" cy="3" r="2.6" fill="currentColor" />
    </svg>
  );
}
