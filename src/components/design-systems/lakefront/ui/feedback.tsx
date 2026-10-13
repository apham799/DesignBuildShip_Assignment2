// Feedback: alerts, toast, skeletons, and the empty / loading / error / success blocks.
import type { ReactNode } from "react";
import { cx, Spinner } from "./shared";

type AlertTone = "success" | "warning" | "error" | "info";

const alertTone: Record<AlertTone, { box: string; mark: string; glyph: string }> = {
  success: { box: "border-line-success bg-line-success-tint", mark: "bg-line-success", glyph: "✓" },
  warning: { box: "border-line-warning bg-line-warning-tint", mark: "bg-line-warning", glyph: "!" },
  error: { box: "border-line-error bg-line-error-tint", mark: "bg-line-error", glyph: "×" },
  info: { box: "border-line-info bg-line-info-tint", mark: "bg-line-info", glyph: "i" },
};

const titleTone: Record<AlertTone, string> = {
  success: "text-line-success",
  warning: "text-line-warning",
  error: "text-line-error",
  info: "text-line-info",
};

type AlertProps = { tone: AlertTone; title: string; children?: ReactNode; action?: ReactNode };

export function Alert({ tone, title, children, action }: AlertProps) {
  const t = alertTone[tone];
  return (
    <div role={tone === "error" ? "alert" : "status"} className={cx("flex items-start gap-3 border-l-[6px] px-4 py-3", t.box)}>
      <span aria-hidden className={cx("grid size-6 shrink-0 place-items-center font-line-sans text-sm font-black text-line-on-accent", t.mark)}>
        {t.glyph}
      </span>
      <div className="min-w-0 flex-1">
        <p className={cx("font-line-sans text-base font-bold", titleTone[tone])}>{title}</p>
        {children && <div className="font-line-sans text-sm text-line-text">{children}</div>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export function Toast({ children, action }: { children: ReactNode; action?: ReactNode }) {
  return (
    <div role="status" className="flex items-center gap-4 border border-line-text bg-line-accent px-4 py-3 text-line-on-accent shadow-[4px_4px_0_#F9E300]">
      <span aria-hidden className="grid size-6 shrink-0 place-items-center bg-line-highlight font-line-sans text-sm font-black text-line-text">
        ✓
      </span>
      <p className="flex-1 font-line-sans text-base font-semibold">{children}</p>
      {action}
    </div>
  );
}

export function Skeleton({ className }: { className?: string }) {
  return <span aria-hidden className={cx("block bg-line-rule motion-safe:animate-pulse", className)} />;
}

export function FacilityCardSkeleton() {
  return (
    <div className="flex flex-col border border-line-rule bg-line-surface" aria-hidden>
      <Skeleton className="h-2" />
      <div className="space-y-3 p-5">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-7 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-16 w-full" />
      </div>
    </div>
  );
}

function StateBlock({ mark, title, children, action }: { mark: ReactNode; title: string; children: ReactNode; action?: ReactNode }) {
  return (
    <div className="flex items-start gap-5 border border-line-text bg-line-surface p-6">
      {mark}
      <div className="flex flex-col gap-2">
        <h3 className="font-line-sans text-xl font-bold leading-tight">{title}</h3>
        <div className="max-w-sm font-line-sans text-base text-line-muted">{children}</div>
        {action && <div className="mt-2">{action}</div>}
      </div>
    </div>
  );
}

export function EmptyState({ title, children, action }: { title: string; children: ReactNode; action?: ReactNode }) {
  return (
    <StateBlock
      title={title}
      action={action}
      mark={
        <span aria-hidden className="grid size-16 shrink-0 place-items-center bg-line-accent">
          <svg viewBox="0 0 24 24" className="size-9 text-line-on-accent">
            <ellipse cx="12" cy="19" rx="8" ry="2.5" fill="currentColor" />
            <rect x="12" y="4" width="1.6" height="15" fill="currentColor" />
            <path d="M13.6 4 L20 7 L13.6 10 Z" fill="#F9E300" />
          </svg>
        </span>
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
        mark={
          <span aria-hidden className="grid size-16 shrink-0 place-items-center bg-line-error font-line-sans text-4xl font-black text-line-on-accent">
            !
          </span>
        }
      >
        {children}
      </StateBlock>
    </div>
  );
}

export function LoadingNote({ children }: { children: ReactNode }) {
  return (
    <p role="status" className="flex items-center gap-3 font-line-sans text-base font-semibold">
      <Spinner className="h-3" />
      {children}
    </p>
  );
}
