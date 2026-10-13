"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { elevation } from "../tokens";
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
      className={cx(
        "m-auto w-[min(36rem,calc(100vw-2rem))] border border-line-text bg-line-surface p-0 text-line-text backdrop:bg-line-text/70",
        elevation.offsetLarge,
      )}
    >
      {children}
    </dialog>
  );
}

// Sized for the ink header of DetailPanel.
export function CloseButton({ onClick, label = "Close" }: { onClick?: () => void; label?: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cx(
        "grid size-10 shrink-0 place-items-center border-2 border-line-on-accent text-line-on-accent transition-colors state-hover:bg-line-highlight state-hover:text-line-text state-hover:border-line-highlight",
        focusRing,
        "state-focus:ring-offset-line-accent",
      )}
    >
      <svg viewBox="0 0 16 16" className="size-4" aria-hidden fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M4 4 L12 12 M12 4 L4 12" />
      </svg>
    </button>
  );
}
