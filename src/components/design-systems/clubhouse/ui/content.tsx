// Content components: badge, stat, facility card, list row, detail panel.
import Link from "next/link";
import type { ReactNode } from "react";
import { statusBadge, type Facility } from "../../sample";
import { elevation } from "../tokens";
import { cx, type Force } from "./shared";

type Tone = "neutral" | "accent" | "flag" | "success" | "warning" | "error" | "info" | "outline";

const tones: Record<Tone, string> = {
  neutral: "bg-club-rule/70 text-club-text",
  accent: "bg-club-accent text-club-on-accent",
  flag: "bg-club-flag text-club-surface",
  success: "bg-club-success-tint text-club-success",
  warning: "bg-club-warning-tint text-club-warning",
  error: "bg-club-error-tint text-club-error",
  info: "bg-club-info-tint text-club-info",
  outline: "border border-club-edge text-club-muted",
};

export function Badge({ tone = "neutral", dot = false, children }: { tone?: Tone; dot?: boolean; children: ReactNode }) {
  return (
    <span
      className={cx(
        "inline-flex h-6 items-center gap-1.5 rounded-full px-2.5 font-club-sign text-[11px] font-medium uppercase tracking-[0.15em]",
        tones[tone],
      )}
    >
      {dot && <span className="size-1.5 rounded-full bg-current" aria-hidden />}
      {children}
    </span>
  );
}

export function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-club-sign text-[11px] font-medium uppercase tracking-[0.15em] text-club-muted">{label}</dt>
      <dd className="font-club-serif text-2xl leading-tight text-club-text">{value}</dd>
    </div>
  );
}

type CardProps = {
  facility: Facility;
  href?: string;
  saved?: boolean;
  force?: Force;
  action?: ReactNode;
};

// The whole card is one link (a stretched link on the title). Extra actions sit above it.
export function FacilityCard({ facility, href = "#", saved = false, force, action }: CardProps) {
  const badge = statusBadge[facility.status];
  return (
    <article
      data-force={force}
      className={cx(
        "relative flex flex-col rounded border border-club-rule bg-club-surface transition-[box-shadow,transform] state-hover:-translate-y-0.5 has-[a:hover]:-translate-y-0.5",
        elevation.paper,
        "state-hover:shadow-[0_2px_4px_rgba(43,42,40,0.12),0_16px_28px_-14px_rgba(31,77,58,0.55)] has-[a:hover]:shadow-[0_2px_4px_rgba(43,42,40,0.12),0_16px_28px_-14px_rgba(31,77,58,0.55)]",
        "has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-club-focus has-[a:focus-visible]:ring-offset-2 has-[a:focus-visible]:ring-offset-club-bg state-focus:ring-2 state-focus:ring-club-focus state-focus:ring-offset-2 state-focus:ring-offset-club-bg",
        saved && "border-club-flag",
      )}
    >
      <header className="flex items-center justify-between rounded-t bg-club-accent px-5 py-2.5 text-club-on-accent">
        <span className="font-club-sign text-[11px] font-medium uppercase tracking-[0.25em]">
          {facility.area} <span className="font-club-mono normal-case tracking-normal">· {facility.distance}</span>
        </span>
        {saved && (
          <span className="rounded-full bg-club-flag px-2.5 py-0.5 font-club-sign text-[11px] font-medium uppercase tracking-[0.15em] text-club-surface">
            ★ In your plan
          </span>
        )}
      </header>
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div>
          <h3 className="font-club-serif text-[1.375rem] font-semibold leading-tight text-club-text">
            <Link href={href} className="outline-none after:absolute after:inset-0 after:content-['']">
              {facility.name}
            </Link>
          </h3>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <Badge tone={badge.tone} dot>
              {badge.label}
            </Badge>
            <span className="font-club-mono text-xs text-club-muted">{facility.hours}</span>
          </div>
        </div>
        <ul className="flex flex-wrap gap-x-3 gap-y-1 font-club-serif text-sm text-club-muted">
          {facility.amenities.map((a) => (
            <li key={a} className="before:mr-1.5 before:text-club-brass before:content-['✦']">
              {a}
            </li>
          ))}
        </ul>
        <dl className="mt-auto grid grid-cols-3 border-y border-club-rule py-2 text-center">
          <Stat label="Bays" value={String(facility.bays)} />
          <Stat label="Bucket" value={facility.bucket} />
          <Stat label="Longest" value={facility.longest} />
        </dl>
        {action && <div className="relative z-10">{action}</div>}
      </div>
    </article>
  );
}

type RowProps = {
  facility: Facility;
  index: number;
  href?: string;
  selected?: boolean;
  force?: Force;
};

export function ListRow({ facility, index, href = "#", selected = false, force }: RowProps) {
  const badge = statusBadge[facility.status];
  const disabled = facility.status === "closed";
  const inner = (
    <>
      <span
        className={cx(
          "grid size-9 shrink-0 place-items-center rounded-full border-2 font-club-sign text-sm",
          disabled ? "border-club-disabled text-club-disabled" : "border-club-accent text-club-accent",
        )}
      >
        {index}
      </span>
      <span className="min-w-0 flex-1">
        <span className={cx("block truncate font-club-serif text-lg leading-tight", disabled ? "text-club-disabled" : "text-club-text")}>
          {facility.name}
        </span>
        <span className="font-club-mono text-xs text-club-muted">
          {facility.area} · {facility.distance} · {facility.hours}
        </span>
      </span>
      <Badge tone={badge.tone}>{badge.label}</Badge>
      <svg viewBox="0 0 16 16" aria-hidden className={cx("size-4 shrink-0", disabled ? "text-club-disabled" : "text-club-muted")} fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M6 3 L11 8 L6 13" />
      </svg>
    </>
  );
  const rowBase = "flex items-center gap-4 border-l-4 px-4 py-3";

  if (disabled) {
    return (
      <div aria-disabled="true" className={cx(rowBase, "cursor-not-allowed border-transparent bg-club-disabled-bg/60")}>
        {inner}
      </div>
    );
  }
  return (
    <Link
      href={href}
      data-force={force}
      aria-current={selected ? "true" : undefined}
      className={cx(
        rowBase,
        "border-transparent transition-colors outline-none state-hover:bg-club-accent/5 state-active:bg-club-accent/10 aria-[current=true]:border-club-accent aria-[current=true]:bg-club-accent/10 state-focus:ring-2 state-focus:ring-inset state-focus:ring-club-focus",
      )}
    >
      {inner}
    </Link>
  );
}

type PanelProps = {
  facility: Facility;
  titleId?: string;
  onCloseSlot?: ReactNode;
  actions?: ReactNode;
};

// Full details for one facility. Renders inline as a side panel, or inside <Modal>.
export function DetailPanel({ facility, titleId, onCloseSlot, actions }: PanelProps) {
  const badge = statusBadge[facility.status];
  return (
    <section className="flex flex-col bg-club-surface text-club-text">
      <header className="flex items-start justify-between gap-4 border-b-[3px] border-double border-club-accent px-6 pb-4 pt-6">
        <div>
          <p className="font-club-sign text-xs font-medium uppercase tracking-[0.2em] text-club-flag">
            {facility.area} · {facility.distance}
          </p>
          <h2 id={titleId} className="mt-1 font-club-serif text-[1.75rem] font-medium leading-tight">
            {facility.name}
          </h2>
          <div className="mt-2 flex flex-wrap gap-2">
            <Badge tone={badge.tone} dot>
              {badge.label}
            </Badge>
            {facility.amenities.slice(0, 2).map((a) => (
              <Badge key={a} tone="outline">
                {a}
              </Badge>
            ))}
          </div>
        </div>
        {onCloseSlot}
      </header>
      <div className="space-y-5 px-6 py-5">
        <p className="font-club-serif text-base leading-relaxed">{facility.summary}</p>
        <dl className="grid grid-cols-3 gap-4">
          <Stat label="Bays" value={String(facility.bays)} />
          <Stat label="Small bucket" value={facility.bucket} />
          <Stat label="Longest" value={facility.longest} />
        </dl>
        <div>
          <h3 className="font-club-sign text-xs font-medium uppercase tracking-[0.2em] text-club-muted">Hours</h3>
          <table className="mt-2 w-full border-collapse font-club-mono text-sm">
            <tbody>
              {facility.schedule.map((s) => (
                <tr key={s.days} className="border-b border-club-rule">
                  <th scope="row" className="py-1.5 text-left font-normal text-club-muted">
                    {s.days}
                  </th>
                  <td className="py-1.5 text-right">{s.hours}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {actions && <footer className="flex flex-wrap gap-3 border-t border-club-rule px-6 py-4">{actions}</footer>}
    </section>
  );
}
