"use client";

import { useId, useRef, useState, type ButtonHTMLAttributes, type KeyboardEvent, type ReactNode, type Ref } from "react";
import { cx, focusRing, type Force } from "./shared";

type TabProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  selected?: boolean;
  count?: number;
  force?: Force;
  ref?: Ref<HTMLButtonElement>;
};

// Pill segments inside a dark track; the selected one lights up floodlight white.
export function Tab({ selected = false, count, force, className, children, ...rest }: TabProps) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={selected}
      data-force={force}
      className={cx(
        "inline-flex h-9 items-center gap-2 rounded-full px-4 font-night-display text-[11px] font-semibold uppercase tracking-[0.08em] text-night-muted transition-colors state-hover:bg-white/5 state-hover:text-night-text aria-selected:bg-night-text aria-selected:text-night-on-accent aria-selected:state-hover:bg-night-text disabled:cursor-not-allowed disabled:text-night-disabled",
        focusRing,
        "state-focus:ring-offset-night-field",
        className,
      )}
      {...rest}
    >
      {children}
      {count !== undefined && <span className="font-night-mono text-[10px] font-medium tracking-normal">{count}</span>}
    </button>
  );
}

export const tabTrack = "inline-flex gap-1 rounded-full border border-night-rule bg-night-field p-1";

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
      <div role="tablist" aria-label={label} className={tabTrack} onKeyDown={onKeyDown}>
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
        <div role="tabpanel" id={`${baseId}-${active.id}-panel`} aria-labelledby={`${baseId}-${active.id}`} tabIndex={0} className={cx("rounded-xl pt-4", focusRing)}>
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

// Selected chips glow ice cyan; lime is saved for actions.
export function FilterChip({ selected = false, count, force, className, children, ...rest }: ChipProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      data-force={force}
      className={cx(
        "inline-flex h-9 items-center gap-2 rounded-full border border-night-edge bg-transparent px-4 font-night-mono text-xs font-medium uppercase tracking-[0.08em] text-night-text transition-[background-color,border-color,box-shadow] state-hover:border-night-muted state-hover:bg-white/5 state-active:bg-white/10 aria-pressed:border-night-select aria-pressed:bg-night-select/15 aria-pressed:text-night-select aria-pressed:shadow-[0_0_20px_-4px_rgba(92,225,230,0.7)] aria-pressed:state-hover:bg-night-select/25 disabled:cursor-not-allowed disabled:border-night-disabled-bg disabled:bg-night-disabled-bg disabled:text-night-disabled",
        focusRing,
        className,
      )}
      {...rest}
    >
      {selected && (
        <svg viewBox="0 0 16 16" className="size-3" aria-hidden fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3.5 8.5 L6.5 11.5 L12.5 4.5" />
        </svg>
      )}
      {children}
      {count !== undefined && <span className="tracking-normal opacity-70">{count}</span>}
    </button>
  );
}
