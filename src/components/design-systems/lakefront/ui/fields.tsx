"use client";

import { useEffect, useId, useRef, useState, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes } from "react";
import { cx, focusRing, type Force } from "./shared";

const labelStyle = "font-line-sans text-xs font-semibold uppercase tracking-[0.08em]";

const controlBase =
  "h-12 w-full border-2 border-line-edge bg-line-surface px-3 font-line-sans text-base text-line-text placeholder:text-line-muted transition-colors outline-none state-hover:border-line-text state-focus:border-line-text state-focus:ring-[3px] state-focus:ring-line-focus state-focus:ring-offset-2 state-focus:ring-offset-line-surface aria-invalid:border-line-error disabled:cursor-not-allowed disabled:border-line-disabled-bg disabled:bg-line-disabled-bg disabled:text-line-disabled disabled:placeholder:text-line-disabled";

function MessageMark({ tone }: { tone: "error" | "success" }) {
  return (
    <span
      aria-hidden
      className={cx(
        "grid size-4 shrink-0 place-items-center font-line-sans text-[11px] font-black text-line-on-accent",
        tone === "error" ? "bg-line-error" : "bg-line-success",
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
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className={cx(labelStyle, disabled ? "text-line-disabled" : "text-line-text")}>
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-msg`} className="flex items-center gap-2 font-line-sans text-sm font-semibold text-line-error">
          <MessageMark tone="error" />
          {error}
        </p>
      ) : success ? (
        <p id={`${id}-msg`} className="flex items-center gap-2 font-line-sans text-sm font-semibold text-line-success">
          <MessageMark tone="success" />
          {success}
        </p>
      ) : hint ? (
        <p id={`${id}-msg`} className="font-line-sans text-sm text-line-muted">
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
        className={cx(controlBase, success && !error && "border-line-success", className)}
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
          className={cx(controlBase, "appearance-none pr-12", className)}
          {...rest}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        {/* chevron in its own ink block, like a sign arrow */}
        <span
          aria-hidden
          className={cx(
            "pointer-events-none absolute inset-y-0.5 right-0.5 grid w-10 place-items-center",
            disabled ? "bg-line-disabled-bg text-line-disabled" : "bg-line-accent text-line-on-accent",
          )}
        >
          <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M4 6 L8 10 L12 6" />
          </svg>
        </span>
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
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <div className="relative">
        <svg
          viewBox="0 0 16 16"
          aria-hidden
          className={cx("pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2", disabled ? "text-line-disabled" : "text-line-text")}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <circle cx="7" cy="7" r="4.5" />
          <path d="M10.5 10.5 L14 14" />
        </svg>
        <input
          id={id}
          type="search"
          data-force={force}
          disabled={disabled}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={cx(controlBase, "pl-9 pr-11 [&::-webkit-search-cancel-button]:hidden", className)}
          {...rest}
        />
        {value && !disabled && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => setValue("")}
            className={cx("absolute right-2 top-1/2 grid size-8 -translate-y-1/2 place-items-center text-line-text state-hover:bg-line-highlight", focusRing)}
          >
            <svg viewBox="0 0 16 16" className="size-3.5" aria-hidden fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M4 4 L12 12 M12 4 L4 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

const boxBase =
  "peer col-start-1 row-start-1 size-5 appearance-none border-2 border-line-edge bg-line-surface transition-colors state-hover:border-line-text disabled:cursor-not-allowed disabled:border-line-disabled disabled:bg-line-disabled-bg";

type CheckProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label: string;
  description?: string;
  force?: Force;
  indeterminate?: boolean;
};

function ChoiceLabel({ label, description, disabled }: { label: string; description?: string; disabled?: boolean }) {
  return (
    <span className="flex flex-col">
      <span className={cx("font-line-sans text-base font-medium leading-snug", disabled ? "text-line-disabled" : "text-line-text")}>{label}</span>
      {description && (
        <span className={cx("font-line-mono text-xs", disabled ? "text-line-disabled" : "text-line-muted")}>{description}</span>
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
            "checked:border-line-accent checked:bg-line-accent indeterminate:border-line-accent indeterminate:bg-line-accent checked:state-hover:border-line-accent-hover checked:state-hover:bg-line-accent-hover disabled:checked:border-line-disabled disabled:checked:bg-line-disabled disabled:indeterminate:bg-line-disabled",
            focusRing,
          )}
          {...rest}
        />
        <svg viewBox="0 0 16 16" aria-hidden className="pointer-events-none col-start-1 row-start-1 hidden size-3.5 text-line-on-accent peer-checked:block" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="square">
          <path d="M3.5 8.5 L6.5 11.5 L12.5 4.5" />
        </svg>
        <svg viewBox="0 0 16 16" aria-hidden className="pointer-events-none col-start-1 row-start-1 hidden size-3.5 text-line-on-accent peer-indeterminate:block">
          <rect x="3" y="6.8" width="10" height="2.4" fill="currentColor" />
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
            "rounded-full checked:border-line-accent checked:bg-line-accent checked:shadow-[inset_0_0_0_4px_#FFFFFF] checked:state-hover:border-line-accent-hover checked:state-hover:bg-line-accent-hover disabled:checked:border-line-disabled disabled:checked:bg-line-disabled",
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

// Square track; the thumb turns signal yellow when on.
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
          "group relative inline-flex h-7 w-12 shrink-0 items-center border-2 border-line-edge bg-line-surface transition-colors state-hover:border-line-text aria-checked:border-line-accent aria-checked:bg-line-accent aria-checked:state-hover:border-line-accent-hover aria-checked:state-hover:bg-line-accent-hover disabled:cursor-not-allowed disabled:border-line-disabled-bg disabled:bg-line-disabled-bg disabled:aria-checked:border-line-disabled disabled:aria-checked:bg-line-disabled",
          focusRing,
        )}
      >
        <span className="pointer-events-none size-4 translate-x-1 bg-line-edge transition-transform group-aria-checked:translate-x-6 group-aria-checked:bg-line-highlight group-disabled:bg-line-disabled group-disabled:group-aria-checked:bg-line-disabled-bg" />
      </button>
      <label htmlFor={id} className={cx("font-line-sans text-base font-medium", disabled ? "cursor-not-allowed text-line-disabled" : "cursor-pointer text-line-text")}>
        {label}
      </label>
    </span>
  );
}
