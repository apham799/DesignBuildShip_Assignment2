"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cx, focusRing } from "./shared";

// Native <dialog> with showModal(): focus is trapped, Esc closes, and the page behind is inert.
export function Modal({
  open,
  onClose,
  labelledBy,
  children,
}: {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={labelledBy}
      onClose={onClose}
      // A click on the backdrop lands on the dialog element itself.
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      className="m-auto w-[min(36rem,calc(100vw-2rem))] overflow-hidden rounded-3xl border border-night-rule bg-night-raised p-0 text-night-text shadow-[0_0_60px_-10px_rgba(92,225,230,0.35)] backdrop:bg-night-bg/75 backdrop:backdrop-blur-sm"
    >
      {children}
    </dialog>
  );
}

export function CloseButton({ onClick, label = "Close" }: { onClick?: () => void; label?: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cx(
        "grid size-10 shrink-0 place-items-center rounded-full border border-night-edge text-night-text transition-colors state-hover:border-night-muted state-hover:bg-white/10",
        focusRing,
        "state-focus:ring-offset-night-raised",
      )}
    >
      <svg viewBox="0 0 16 16" className="size-4" aria-hidden fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M4 4 L12 12 M12 4 L4 12" />
      </svg>
    </button>
  );
}
