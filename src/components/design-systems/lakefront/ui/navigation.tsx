"use client";

import { useId, useRef, useState, type ButtonHTMLAttributes, type KeyboardEvent, type ReactNode, type Ref } from "react";
import type { FacilityKind } from "../../sample";
import { Bullet, cx, focusRing, type Force } from "./shared";

type TabProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  selected?: boolean;
  count?: number;
  force?: Force;
  ref?: Ref<HTMLButtonElement>;
};

// Tabs read as one segmented sign: the selected segment is filled with ink.
export function Tab({ selected = false, count, force, className, children, ...rest }: TabProps) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={selected}
      data-force={force}
      className={cx(
        "relative inline-flex h-11 items-center gap-2 border-l-2 border-line-accent bg-line-surface px-4 font-line-sans text-sm font-bold text-line-text transition-colors first:border-l-0 state-hover:bg-line-highlight-tint state-focus:z-10 aria-selected:bg-line-accent aria-selected:text-line-on-accent aria-selected:state-hover:bg-line-accent disabled:cursor-not-allowed disabled:bg-line-disabled-bg disabled:text-line-disabled",
        focusRing,
        className,
      )}
      {...rest}
    >
      {children}
      {count !== undefined && <span className="font-line-mono text-xs font-medium">{count}</span>}
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
      <div role="tablist" aria-label={label} className="inline-flex border-2 border-line-accent" onKeyDown={onKeyDown}>
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
        <div role="tabpanel" id={`${baseId}-${active.id}-panel`} aria-labelledby={`${baseId}-${active.id}`} tabIndex={0} className={cx("pt-4", focusRing)}>
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
  // Optional signal marker for chips that filter by facility type.
  kind?: FacilityKind;
};

export function FilterChip({ selected = false, count, force, kind, className, children, ...rest }: ChipProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      data-force={force}
      className={cx(
        "inline-flex h-9 items-center gap-2 border-2 border-line-edge bg-line-surface px-3 font-line-sans text-sm font-semibold text-line-text transition-colors state-hover:border-line-text state-active:bg-line-bg aria-pressed:border-line-accent aria-pressed:bg-line-accent aria-pressed:text-line-on-accent aria-pressed:state-hover:border-line-accent-hover aria-pressed:state-hover:bg-line-accent-hover disabled:cursor-not-allowed disabled:border-line-disabled-bg disabled:bg-line-disabled-bg disabled:text-line-disabled",
        focusRing,
        className,
      )}
      {...rest}
    >
      {kind && <Bullet kind={kind} />}
      {selected && !kind && <span aria-hidden>✓</span>}
      {children}
      {count !== undefined && <span className="font-line-mono text-xs font-medium opacity-80">{count}</span>}
    </button>
  );
}
