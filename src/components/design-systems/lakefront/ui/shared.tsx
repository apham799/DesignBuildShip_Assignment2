// Shared helpers for Design System 02 components.
import type { FacilityKind } from "../../sample";
import { signals } from "../tokens";

// Forces a visual state through data-force (see the state-* variants in globals.css).
export type Force = "hover" | "focus" | "active";

export function cx(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export const focusRing =
  "outline-none state-focus:ring-[3px] state-focus:ring-line-focus state-focus:ring-offset-2 state-focus:ring-offset-line-surface";

// Three signal blocks that pulse in sequence, like a departure board waiting to update.
export function Spinner({ className = "h-3", label }: { className?: string; label?: string }) {
  return (
    <span role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true} className={cx("inline-flex items-center gap-0.5", className)}>
      {["#009B3A", "#00A1DE", "#F9E300"].map((c, i) => (
        <span
          key={c}
          className="aspect-square h-full motion-safe:animate-pulse"
          style={{ backgroundColor: c, animationDelay: `${i * 180}ms` }}
        />
      ))}
    </span>
  );
}

// A facility-type marker. Always render it next to a text label.
export function Bullet({ kind, size = 10 }: { kind: FacilityKind; size?: number }) {
  return <span aria-hidden className="inline-block shrink-0" style={{ width: size, height: size, backgroundColor: signals[kind].hex }} />;
}
