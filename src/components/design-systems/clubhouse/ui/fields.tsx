"use client";

import { useEffect, useId, useRef, useState, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes } from "react";
import { cx, focusRing, type Force } from "./shared";

const labelStyle = "font-club-sign text-xs font-medium uppercase tracking-[0.2em]";

const controlBase =
  "h-11 w-full rounded-sm border border-club-edge bg-club-field px-3 font-club-serif text-base text-club-text placeholder:text-club-muted transition-colors outline-none state-hover:border-club-text state-focus:border-club-text state-focus:ring-2 state-focus:ring-club-focus state-focus:ring-offset-2 state-focus:ring-offset-club-surface aria-invalid:border-2 aria-invalid:border-club-error disabled:cursor-not-allowed disabled:border-club-disabled-bg disabled:bg-club-disabled-bg disabled:text-club-disabled disabled:placeholder:text-club-disabled";

function ErrorIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4 shrink-0" aria-hidden>
      <circle cx="8" cy="8" r="7" fill="currentColor" />
      <rect x="7.1" y="3.8" width="1.8" height="5.4" fill="#F8F2E4" />
      <rect x="7.1" y="10.6" width="1.8" height="1.8" fill="#F8F2E4" />
    </svg>
  );
}

function CheckIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={cx("shrink-0", className)} aria-hidden fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3.5 8.5 L6.5 11.5 L12.5 4.5" />
    </svg>
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
      <label htmlFor={id} className={cx(labelStyle, disabled ? "text-club-disabled" : "text-club-text")}>
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-msg`} className="flex items-center gap-1.5 font-club-serif text-sm text-club-error">
          <ErrorIcon />
          {error}
        </p>
      ) : success ? (
        <p id={`${id}-msg`} className="flex items-center gap-1.5 font-club-serif text-sm text-club-success">
          <CheckIcon />
          {success}
        </p>
      ) : hint ? (
        <p id={`${id}-msg`} className="font-club-serif text-sm text-club-muted">
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
        className={cx(controlBase, success && !error && "border-club-success", className)}
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
          className={cx(controlBase, "appearance-none pr-10", className)}
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
          className={cx(
            "pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2",
            disabled ? "text-club-disabled" : "text-club-text",
          )}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
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
  // Pass value to control the field from outside; otherwise it keeps its own state.
  value?: string;
  onValueChange?: (value: string) => void;
};

export function SearchField({ label, force, defaultValue = "", value: controlled, disabled, className, onValueChange, ...rest }: SearchFieldProps) {
  const id = useId();
  const [internal, setInternal] = useState(String(defaultValue));
  const value = controlled ?? internal;
  const setValue = (v: string) => {
    setInternal(v);
    onValueChange?.(v);
  };
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <div className="relative">
        <svg
          viewBox="0 0 16 16"
          aria-hidden
          className={cx("pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2", disabled ? "text-club-disabled" : "text-club-muted")}
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
          className={cx(controlBase, "pl-9 pr-10 [&::-webkit-search-cancel-button]:hidden", className)}
          {...rest}
        />
        {value && !disabled && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => setValue("")}
            className={cx(
              "absolute right-2 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-sm text-club-muted state-hover:bg-club-text/5 state-hover:text-club-text",
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
  "peer col-start-1 row-start-1 size-5 appearance-none border-2 border-club-edge bg-club-field transition-colors state-hover:border-club-text disabled:cursor-not-allowed disabled:border-club-disabled disabled:bg-club-disabled-bg";

type CheckProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label: string;
  description?: string;
  force?: Force;
  indeterminate?: boolean;
};

function ChoiceLabel({ label, description, disabled }: { label: string; description?: string; disabled?: boolean }) {
  return (
    <span className="flex flex-col">
      <span className={cx("font-club-serif text-base leading-snug", disabled ? "text-club-disabled" : "text-club-text")}>
        {label}
      </span>
      {description && (
        <span className={cx("font-club-serif text-sm", disabled ? "text-club-disabled" : "text-club-muted")}>
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
            "rounded-sm checked:border-club-select checked:bg-club-select indeterminate:border-club-select indeterminate:bg-club-select checked:state-hover:border-club-select-hover checked:state-hover:bg-club-select-hover disabled:checked:border-club-disabled disabled:checked:bg-club-disabled disabled:indeterminate:bg-club-disabled",
            focusRing,
          )}
          {...rest}
        />
        <CheckIcon className="pointer-events-none col-start-1 row-start-1 hidden size-3.5 text-club-on-select peer-checked:block" />
        <svg viewBox="0 0 16 16" aria-hidden className="pointer-events-none col-start-1 row-start-1 hidden size-3.5 text-club-on-select peer-indeterminate:block">
          <rect x="3" y="7" width="10" height="2.2" rx="1" fill="currentColor" />
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
            "rounded-full checked:border-club-select checked:bg-club-select checked:shadow-[inset_0_0_0_3px_#FFFCF4] checked:state-hover:border-club-select-hover checked:state-hover:bg-club-select-hover disabled:checked:border-club-disabled disabled:checked:bg-club-disabled",
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
  // Pass on to control the toggle from outside; otherwise it keeps its own state.
  on?: boolean;
  disabled?: boolean;
  force?: Force;
  onChange?: (on: boolean) => void;
};

export function Toggle({ label, defaultOn = false, on: controlled, disabled, force, onChange }: ToggleProps) {
  const id = useId();
  const [internal, setOn] = useState(defaultOn);
  const on = controlled ?? internal;
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
          "group relative inline-flex h-6 w-11 shrink-0 items-center rounded-full bg-club-edge transition-colors state-hover:bg-club-text aria-checked:bg-club-select aria-checked:state-hover:bg-club-select-hover disabled:cursor-not-allowed disabled:bg-club-disabled-bg disabled:aria-checked:bg-club-disabled",
          focusRing,
        )}
      >
        <span className="pointer-events-none size-4 translate-x-1 rounded-full bg-club-surface shadow-sm transition-transform group-aria-checked:translate-x-6" />
      </button>
      <label
        htmlFor={id}
        className={cx("font-club-serif text-base", disabled ? "cursor-not-allowed text-club-disabled" : "cursor-pointer text-club-text")}
      >
        {label}
      </label>
    </span>
  );
}
