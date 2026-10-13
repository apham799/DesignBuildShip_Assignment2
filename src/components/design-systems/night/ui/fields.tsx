"use client";

import { useEffect, useId, useRef, useState, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes } from "react";
import { cx, focusRing, type Force } from "./shared";

const labelStyle = "font-night-mono text-[11px] font-medium uppercase tracking-[0.12em]";

// Focus turns the edge cyan, adds a 1px cyan ring (2px total), and a glow.
const controlBase =
  "h-12 w-full rounded-xl border border-night-edge bg-night-field px-4 font-night-body text-base text-night-text placeholder:text-night-muted outline-none transition-[border-color,box-shadow] state-hover:border-night-muted state-focus:border-night-focus state-focus:ring-1 state-focus:ring-night-focus state-focus:shadow-[0_0_20px_-4px_rgba(92,225,230,0.7)] aria-invalid:border-night-error aria-invalid:shadow-[0_0_16px_-6px_rgba(255,138,142,0.8)] disabled:cursor-not-allowed disabled:border-night-disabled-bg disabled:bg-night-disabled-bg disabled:text-night-disabled disabled:placeholder:text-night-disabled";

function MessageMark({ tone }: { tone: "error" | "success" }) {
  return (
    <span
      aria-hidden
      className={cx(
        "grid size-4 shrink-0 place-items-center rounded-full font-night-mono text-[10px] font-bold text-night-on-accent",
        tone === "error" ? "bg-night-error shadow-[0_0_8px_rgba(255,138,142,0.8)]" : "bg-night-success shadow-[0_0_8px_rgba(166,242,138,0.8)]",
      )}
    >
      {tone === "error" ? "!" : "✓"}
    </span>
  );
}

type FieldProps = {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  success?: string;
  disabled?: boolean;
  children: ReactNode;
};

export function Field({ id, label, hint, error, success, disabled, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className={cx(labelStyle, disabled ? "text-night-disabled" : "text-night-text")}>
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-msg`} className="flex items-center gap-2 font-night-body text-sm text-night-error">
          <MessageMark tone="error" />
          {error}
        </p>
      ) : success ? (
        <p id={`${id}-msg`} className="flex items-center gap-2 font-night-body text-sm text-night-success">
          <MessageMark tone="success" />
          {success}
        </p>
      ) : hint ? (
        <p id={`${id}-msg`} className="font-night-body text-sm text-night-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

type TextInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "id"> & {
  label: string;
  hint?: string;
  error?: string;
  success?: string;
  force?: Force;
};

export function TextInput({ label, hint, error, success, force, disabled, className, ...rest }: TextInputProps) {
  const id = useId();
  const hasMessage = Boolean(error || success || hint);
  return (
    <Field id={id} label={label} hint={hint} error={error} success={success} disabled={disabled}>
      <input
        id={id}
        data-force={force}
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        aria-describedby={hasMessage ? `${id}-msg` : undefined}
        className={cx(controlBase, success && !error && "border-night-success", className)}
        {...rest}
      />
    </Field>
  );
}

type SelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, "id"> & {
  label: string;
  hint?: string;
  error?: string;
  force?: Force;
  options: { value: string; label: string }[];
};

export function Select({ label, hint, error, force, disabled, options, className, ...rest }: SelectProps) {
  const id = useId();
  return (
    <Field id={id} label={label} hint={hint} error={error} disabled={disabled}>
      <div className="relative">
        <select
          id={id}
          data-force={force}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={error || hint ? `${id}-msg` : undefined}
          className={cx(controlBase, "appearance-none pr-11 [&>option]:bg-night-field", className)}
          {...rest}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <svg
          viewBox="0 0 16 16"
          aria-hidden
          className={cx("pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2", disabled ? "text-night-disabled" : "text-night-select")}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <path d="M4 6 L8 10 L12 6" />
        </svg>
      </div>
    </Field>
  );
}

type SearchFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "type"> & {
  label: string;
  force?: Force;
};

export function SearchField({ label, force, defaultValue = "", disabled, className, ...rest }: SearchFieldProps) {
  const id = useId();
  const [value, setValue] = useState(String(defaultValue));
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <div className="relative">
        <svg
          viewBox="0 0 16 16"
          aria-hidden
          className={cx("pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2", disabled ? "text-night-disabled" : "text-night-muted")}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="7" cy="7" r="4.5" />
          <path d="M10.5 10.5 L14 14" strokeLinecap="round" />
        </svg>
        <input
          id={id}
          type="search"
          data-force={force}
          disabled={disabled}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={cx(controlBase, "rounded-full pl-10 pr-12 [&::-webkit-search-cancel-button]:hidden", className)}
          {...rest}
        />
        {value && !disabled && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => setValue("")}
            className={cx(
              "absolute right-2 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full text-night-muted state-hover:bg-white/10 state-hover:text-night-text",
              focusRing,
            )}
          >
            <svg viewBox="0 0 16 16" className="size-3.5" aria-hidden fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 4 L12 12 M12 4 L4 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

const boxBase =
  "peer col-start-1 row-start-1 size-5 appearance-none border-2 border-night-edge bg-night-field transition-[background-color,border-color,box-shadow] state-hover:border-night-muted disabled:cursor-not-allowed disabled:border-night-disabled disabled:bg-night-disabled-bg";

type CheckProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label: string;
  description?: string;
  force?: Force;
  indeterminate?: boolean;
};

function ChoiceLabel({ label, description, disabled }: { label: string; description?: string; disabled?: boolean }) {
  return (
    <span className="flex flex-col">
      <span className={cx("font-night-body text-base leading-snug", disabled ? "text-night-disabled" : "text-night-text")}>{label}</span>
      {description && (
        <span className={cx("font-night-mono text-[11px] uppercase tracking-[0.08em]", disabled ? "text-night-disabled" : "text-night-muted")}>
          {description}
        </span>
      )}
    </span>
  );
}

export function Checkbox({ label, description, force, indeterminate = false, disabled, className, ...rest }: CheckProps) {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (ref.current) ref.current.indeterminate = indeterminate;
  }, [indeterminate]);

  return (
    <label className={cx("inline-flex items-start gap-3", disabled ? "cursor-not-allowed" : "cursor-pointer", className)}>
      <span className="mt-0.5 inline-grid shrink-0 place-items-center">
        <input
          ref={ref}
          type="checkbox"
          data-force={force}
          disabled={disabled}
          className={cx(
            boxBase,
            "rounded-md checked:border-night-accent checked:bg-night-accent indeterminate:border-night-accent indeterminate:bg-night-accent checked:state-hover:border-night-accent-hover checked:state-hover:bg-night-accent-hover checked:state-hover:shadow-[0_0_14px_-2px_rgba(200,255,77,0.8)] disabled:checked:border-night-disabled disabled:checked:bg-night-disabled disabled:indeterminate:bg-night-disabled",
            focusRing,
          )}
          {...rest}
        />
        <svg viewBox="0 0 16 16" aria-hidden className="pointer-events-none col-start-1 row-start-1 hidden size-3.5 text-night-on-accent peer-checked:block" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3.5 8.5 L6.5 11.5 L12.5 4.5" />
        </svg>
        <svg viewBox="0 0 16 16" aria-hidden className="pointer-events-none col-start-1 row-start-1 hidden size-3.5 text-night-on-accent peer-indeterminate:block">
          <rect x="3" y="6.8" width="10" height="2.4" rx="1.2" fill="currentColor" />
        </svg>
      </span>
      <ChoiceLabel label={label} description={description} disabled={disabled} />
    </label>
  );
}

export function Radio({ label, description, force, disabled, className, ...rest }: Omit<CheckProps, "indeterminate">) {
  return (
    <label className={cx("inline-flex items-start gap-3", disabled ? "cursor-not-allowed" : "cursor-pointer", className)}>
      <span className="mt-0.5 inline-grid shrink-0 place-items-center">
        <input
          type="radio"
          data-force={force}
          disabled={disabled}
          className={cx(
            boxBase,
            // The dot is a gradient, not an inset shadow, so the focus glow (a box-shadow) can't erase it.
            "rounded-full checked:border-night-accent checked:bg-[radial-gradient(circle,#C8FF4D_0_36%,#0E1424_42%)] checked:state-hover:border-night-accent-hover checked:state-hover:bg-[radial-gradient(circle,#DDFF8A_0_36%,#0E1424_42%)] disabled:checked:border-night-disabled disabled:checked:bg-[radial-gradient(circle,#5A6480_0_36%,#1A2032_42%)]",
            focusRing,
          )}
          {...rest}
        />
      </span>
      <ChoiceLabel label={label} description={description} disabled={disabled} />
    </label>
  );
}

type ToggleProps = {
  label: string;
  defaultOn?: boolean;
  disabled?: boolean;
  force?: Force;
  onChange?: (on: boolean) => void;
};

// The track lights up lime when on, like a powered-up switch.
export function Toggle({ label, defaultOn = false, disabled, force, onChange }: ToggleProps) {
  const id = useId();
  const [on, setOn] = useState(defaultOn);
  return (
    <span className="inline-flex items-center gap-3">
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={on}
        disabled={disabled}
        data-force={force}
        onClick={() => {
          setOn(!on);
          onChange?.(!on);
        }}
        className={cx(
          "group relative inline-flex h-7 w-12 shrink-0 items-center rounded-full border border-night-edge bg-night-field transition-[background-color,border-color,box-shadow] state-hover:border-night-muted aria-checked:border-night-accent aria-checked:bg-night-accent aria-checked:state-hover:bg-night-accent-hover aria-checked:state-hover:shadow-[0_0_18px_-2px_rgba(200,255,77,0.8)] disabled:cursor-not-allowed disabled:border-night-disabled-bg disabled:bg-night-disabled-bg disabled:aria-checked:border-night-disabled disabled:aria-checked:bg-night-disabled",
          focusRing,
        )}
      >
        <span className="pointer-events-none size-5 translate-x-0.5 rounded-full bg-night-muted transition-transform group-aria-checked:translate-x-6 group-aria-checked:bg-night-on-accent group-disabled:bg-night-disabled" />
      </button>
      <label htmlFor={id} className={cx("font-night-body text-base", disabled ? "cursor-not-allowed text-night-disabled" : "cursor-pointer text-night-text")}>
        {label}
      </label>
    </span>
  );
}
