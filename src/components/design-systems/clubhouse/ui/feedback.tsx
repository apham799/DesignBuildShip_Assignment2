// Feedback: alerts, toast, skeletons, and the empty / loading / error / success blocks.
import type { ReactNode } from "react";
import { cx, Spinner } from "./shared";

type AlertTone = "success" | "warning" | "error" | "info";

const alertTone: Record<AlertTone, { box: string; icon: ReactNode }> = {
  success: {
    box: "border-club-success bg-club-success-tint text-club-success",
    icon: <path d="M5 10.5 L8.5 14 L15 6.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />,
  },
  warning: {
    box: "border-club-warning bg-club-warning-tint text-club-warning",
    icon: (
      <>
        <path d="M10 3 L18 17 H2 Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <rect x="9.1" y="8" width="1.8" height="4.6" fill="currentColor" />
        <rect x="9.1" y="13.8" width="1.8" height="1.8" fill="currentColor" />
      </>
    ),
  },
  error: {
    box: "border-club-error bg-club-error-tint text-club-error",
    icon: (
      <>
        <circle cx="10" cy="10" r="7.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path d="M7 7 L13 13 M13 7 L7 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </>
    ),
  },
  info: {
    box: "border-club-info bg-club-info-tint text-club-info",
    icon: (
      <>
        <circle cx="10" cy="10" r="7.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <rect x="9.1" y="9" width="1.8" height="5" fill="currentColor" />
        <rect x="9.1" y="5.6" width="1.8" height="1.8" fill="currentColor" />
      </>
    ),
  },
};

type AlertProps = { tone: AlertTone; title: string; children?: ReactNode; action?: ReactNode };

export function Alert({ tone, title, children, action }: AlertProps) {
  const t = alertTone[tone];
  return (
    <div
      role={tone === "error" ? "alert" : "status"}
      className={cx("flex items-start gap-3 rounded-sm border-l-4 px-4 py-3", t.box)}
    >
      <svg viewBox="0 0 20 20" className="mt-0.5 size-5 shrink-0" aria-hidden>
        {t.icon}
      </svg>
      <div className="min-w-0 flex-1">
        <p className="font-club-serif text-base font-semibold">{title}</p>
        {children && <div className="font-club-serif text-sm text-club-text">{children}</div>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export function Toast({ children, action }: { children: ReactNode; action?: ReactNode }) {
  return (
    <div
      role="status"
      className="flex items-center gap-4 rounded-sm bg-club-select px-4 py-3 text-club-on-select shadow-[0_24px_60px_-20px_rgba(22,54,42,0.6)]"
    >
      <svg viewBox="0 0 20 20" className="size-5 shrink-0" aria-hidden fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 10.5 L8.5 14 L15 6.5" />
      </svg>
      <p className="flex-1 font-club-serif text-base">{children}</p>
      {action}
    </div>
  );
}

export function Skeleton({ className }: { className?: string }) {
  return <span aria-hidden className={cx("block rounded-sm bg-club-rule/70 motion-safe:animate-pulse", className)} />;
}

export function FacilityCardSkeleton() {
  return (
    <div className="flex flex-col rounded border border-club-rule bg-club-surface" aria-hidden>
      <Skeleton className="h-9 rounded-b-none rounded-t" />
      <div className="space-y-3 p-5">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-5 w-1/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-14 w-full" />
      </div>
    </div>
  );
}

function StateBlock({ icon, title, children, action }: { icon: ReactNode; title: string; children: ReactNode; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded border border-dashed border-club-edge bg-club-surface px-6 py-10 text-center">
      {icon}
      <h3 className="font-club-serif text-[1.375rem] font-semibold leading-tight text-club-text">{title}</h3>
      <div className="max-w-sm font-club-serif text-base text-club-muted">{children}</div>
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
        <svg viewBox="0 0 64 48" className="h-12 w-16 text-club-accent" aria-hidden>
          <ellipse cx="32" cy="40" rx="26" ry="6" fill="#A7B98A" />
          <ellipse cx="36" cy="40" rx="5" ry="1.8" fill="#2B2A28" />
          <line x1="36" y1="40" x2="36" y2="6" stroke="currentColor" strokeWidth="2" />
          <path d="M36 6 L50 11 L36 16 Z" fill="#B23A2E" />
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
          <svg viewBox="0 0 64 48" className="h-12 w-16" aria-hidden>
            <path d="M8 40 Q32 30 56 40" fill="none" stroke="#8A7D63" strokeWidth="2" />
            <line x1="28" y1="40" x2="22" y2="16" stroke="#2B2A28" strokeWidth="2" />
            <line x1="34" y1="40" x2="42" y2="18" stroke="#2B2A28" strokeWidth="2" />
            <path d="M22 16 L28 22 M42 18 L36 23" stroke="#A3342A" strokeWidth="2.5" strokeLinecap="round" />
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
    <p role="status" className="flex items-center gap-2 font-club-serif text-base text-club-muted">
      <Spinner className="size-5 text-club-accent" />
      {children}
    </p>
  );
}
