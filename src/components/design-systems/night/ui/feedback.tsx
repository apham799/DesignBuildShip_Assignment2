// Feedback: alerts, toast, skeletons, and the empty / loading / error / success blocks.
import type { ReactNode } from "react";
import { cx, Spinner } from "./shared";

type AlertTone = "success" | "warning" | "error" | "info";

const alertTone: Record<AlertTone, { box: string; title: string; mark: string; glyph: string }> = {
  success: { box: "border-night-success/40 bg-night-success-tint", title: "text-night-success", mark: "bg-night-success shadow-[0_0_10px_rgba(166,242,138,0.8)]", glyph: "✓" },
  warning: { box: "border-night-warning/40 bg-night-warning-tint", title: "text-night-warning", mark: "bg-night-warning shadow-[0_0_10px_rgba(255,194,102,0.8)]", glyph: "!" },
  error: { box: "border-night-error/40 bg-night-error-tint", title: "text-night-error", mark: "bg-night-error shadow-[0_0_10px_rgba(255,138,142,0.8)]", glyph: "×" },
  info: { box: "border-night-info/40 bg-night-info-tint", title: "text-night-info", mark: "bg-night-info shadow-[0_0_10px_rgba(111,230,235,0.8)]", glyph: "i" },
};

type AlertProps = { tone: AlertTone; title: string; children?: ReactNode; action?: ReactNode };

export function Alert({ tone, title, children, action }: AlertProps) {
  const t = alertTone[tone];
  return (
    <div role={tone === "error" ? "alert" : "status"} className={cx("flex items-start gap-3 rounded-xl border px-4 py-3", t.box)}>
      <span aria-hidden className={cx("mt-0.5 grid size-5 shrink-0 place-items-center rounded-full font-night-mono text-[11px] font-bold text-night-on-accent", t.mark)}>
        {t.glyph}
      </span>
      <div className="min-w-0 flex-1">
        <p className={cx("font-night-display text-sm font-semibold", t.title)}>{title}</p>
        {children && <div className="mt-0.5 font-night-body text-sm text-night-text">{children}</div>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export function Toast({ children, action }: { children: ReactNode; action?: ReactNode }) {
  return (
    <div
      role="status"
      className="flex items-center gap-3 rounded-full border border-night-accent/50 bg-night-raised py-2 pl-2 pr-5 text-night-text shadow-[0_0_24px_-4px_rgba(200,255,77,0.75)]"
    >
      <span aria-hidden className="grid size-8 shrink-0 place-items-center rounded-full bg-night-accent font-night-mono text-sm font-bold text-night-on-accent">
        ✓
      </span>
      <p className="flex-1 font-night-body text-sm font-medium">{children}</p>
      {action}
    </div>
  );
}

export function Skeleton({ className }: { className?: string }) {
  return <span aria-hidden className={cx("block rounded-lg bg-night-rule motion-safe:animate-pulse", className)} />;
}

export function FacilityCardSkeleton() {
  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-night-rule bg-night-surface p-5" aria-hidden>
      <Skeleton className="h-3 w-1/3" />
      <Skeleton className="h-6 w-3/4" />
      <div className="flex gap-1.5">
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
      <div className="grid grid-cols-3 gap-2">
        <Skeleton className="h-14 rounded-xl" />
        <Skeleton className="h-14 rounded-xl" />
        <Skeleton className="h-14 rounded-xl" />
      </div>
    </div>
  );
}

function StateBlock({ icon, title, children, action }: { icon: ReactNode; title: string; children: ReactNode; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-3xl border border-night-rule bg-night-surface px-6 py-10 text-center">
      {icon}
      <h3 className="font-night-display text-lg font-semibold">{title}</h3>
      <div className="max-w-sm font-night-body text-base text-night-muted">{children}</div>
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}

export function EmptyState({ title, children, action }: { title: string; children: ReactNode; action?: ReactNode }) {
  return (
    <StateBlock
      title={title}
      action={action}
      icon={
        <svg viewBox="0 0 64 64" className="size-16" aria-hidden>
          <ellipse cx="32" cy="32" rx="28" ry="9" fill="none" stroke="#6B78A0" strokeWidth="1.5" transform="rotate(-18 32 32)" />
          <circle cx="32" cy="32" r="12" fill="#141B2E" stroke="#5CE1E6" strokeWidth="2" />
          <circle cx="56" cy="24" r="3.5" fill="#C8FF4D" style={{ filter: "drop-shadow(0 0 4px #C8FF4D)" }} />
        </svg>
      }
    >
      {children}
    </StateBlock>
  );
}

export function ErrorState({ title, children, action }: { title: string; children: ReactNode; action?: ReactNode }) {
  return (
    <div role="alert">
      <StateBlock
        title={title}
        action={action}
        icon={
          <svg viewBox="0 0 64 64" className="size-16" aria-hidden fill="none" stroke="#FF8A8E" strokeWidth="2.5" strokeLinecap="round">
            <path d="M14 26 Q32 10 50 26" opacity="0.35" />
            <path d="M20 33 Q32 23 44 33" opacity="0.6" />
            <circle cx="32" cy="42" r="3" fill="#FF8A8E" stroke="none" style={{ filter: "drop-shadow(0 0 6px #FF8A8E)" }} />
            <path d="M46 40 L54 48 M54 40 L46 48" />
          </svg>
        }
      >
        {children}
      </StateBlock>
    </div>
  );
}

export function LoadingNote({ children }: { children: ReactNode }) {
  return (
    <p role="status" className="flex items-center gap-3 font-night-mono text-xs uppercase tracking-[0.1em] text-night-muted">
      <Spinner className="size-5 text-night-accent" />
      {children}
    </p>
  );
}
