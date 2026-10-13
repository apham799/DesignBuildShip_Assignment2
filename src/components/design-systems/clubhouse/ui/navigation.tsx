"use client";

import { useId, useRef, useState, type ButtonHTMLAttributes, type KeyboardEvent, type ReactNode, type Ref } from "react";
import { cx, focusRing, type Force } from "./shared";

type TabProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  selected?: boolean;
  count?: number;
  force?: Force;
  ref?: Ref<HTMLButtonElement>;
};

// A single tab. Use inside <Tabs>, or alone in the docs to show its states.
export function Tab({ selected = false, count, force, className, children, ...rest }: TabProps) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={selected}
      data-force={force}
      className={cx(
        "-mb-px inline-flex h-11 items-center gap-2 rounded-t-sm border-b-[3px] border-transparent px-1 font-club-sign text-sm font-medium uppercase tracking-[0.18em] text-club-muted transition-colors state-hover:border-club-rule state-hover:text-club-text aria-selected:border-club-accent aria-selected:text-club-accent aria-selected:state-hover:border-club-accent disabled:cursor-not-allowed disabled:text-club-disabled",
        focusRing,
        className,
      )}
      {...rest}
    >
      {children}
      {count !== undefined && <span className="font-club-mono text-xs tracking-normal">{count}</span>}
    </button>
  );
}

type TabItem = { id: string; label: string; count?: number; disabled?: boolean; panel?: ReactNode };

export function Tabs({ items, label, defaultSelected }: { items: TabItem[]; label: string; defaultSelected?: string }) {
  const baseId = useId();
  const enabled = items.filter((i) => !i.disabled);
  const [selected, setSelected] = useState(defaultSelected ?? enabled[0]?.id);
  const refs = useRef(new Map<string, HTMLButtonElement>());

  // Arrow keys move between tabs; Home and End jump to the ends.
  function onKeyDown(e: KeyboardEvent) {
    const i = enabled.findIndex((t) => t.id === selected);
    const next =
      e.key === "ArrowRight" ? enabled[(i + 1) % enabled.length]
      : e.key === "ArrowLeft" ? enabled[(i - 1 + enabled.length) % enabled.length]
      : e.key === "Home" ? enabled[0]
      : e.key === "End" ? enabled[enabled.length - 1]
      : null;
    if (!next) return;
    e.preventDefault();
    setSelected(next.id);
    refs.current.get(next.id)?.focus();
  }

  const active = items.find((i) => i.id === selected);
  return (
    <div>
      <div role="tablist" aria-label={label} className="flex gap-6 border-b border-club-rule" onKeyDown={onKeyDown}>
        {items.map((t) => (
          <Tab
            key={t.id}
            id={`${baseId}-${t.id}`}
            ref={(el) => {
              if (el) refs.current.set(t.id, el);
            }}
            selected={t.id === selected}
            count={t.count}
            disabled={t.disabled}
            tabIndex={t.id === selected ? 0 : -1}
            aria-controls={`${baseId}-${t.id}-panel`}
            onClick={() => setSelected(t.id)}
          >
            {t.label}
          </Tab>
        ))}
      </div>
      {active?.panel && (
        <div
          role="tabpanel"
          id={`${baseId}-${active.id}-panel`}
          aria-labelledby={`${baseId}-${active.id}`}
          tabIndex={0}
          className={cx("pt-4", focusRing)}
        >
          {active.panel}
        </div>
      )}
    </div>
  );
}

type ChipProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  selected?: boolean;
  count?: number;
  force?: Force;
};

export function FilterChip({ selected = false, count, force, className, children, ...rest }: ChipProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      data-force={force}
      className={cx(
        "inline-flex h-8 items-center gap-1.5 rounded-full border border-club-edge bg-club-surface px-3 font-club-sign text-xs font-medium uppercase tracking-[0.15em] text-club-text transition-colors state-hover:border-club-accent state-hover:bg-club-accent/5 state-active:bg-club-accent/15 aria-pressed:border-club-accent aria-pressed:bg-club-accent aria-pressed:text-club-on-accent aria-pressed:state-hover:bg-club-accent-hover disabled:cursor-not-allowed disabled:border-club-disabled-bg disabled:bg-club-disabled-bg disabled:text-club-disabled",
        focusRing,
        className,
      )}
      {...rest}
    >
      {selected && (
        <svg viewBox="0 0 16 16" className="size-3" aria-hidden fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3.5 8.5 L6.5 11.5 L12.5 4.5" />
        </svg>
      )}
      {children}
      {count !== undefined && <span className="font-club-mono tracking-normal opacity-80">{count}</span>}
    </button>
  );
}
