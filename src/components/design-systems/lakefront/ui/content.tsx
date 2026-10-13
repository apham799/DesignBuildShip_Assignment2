// Content components: badge, stat, facility card, list row, detail panel.
import Link from "next/link";
import type { ReactNode } from "react";
import { statusBadge, type Facility } from "../../sample";
import { signals } from "../tokens";
import { Bullet, cx, type Force } from "./shared";

type Tone = "neutral" | "accent" | "flag" | "success" | "warning" | "error" | "info" | "outline";

const tones: Record<Tone, string> = {
  neutral: "bg-line-bg text-line-text",
  accent: "bg-line-accent text-line-on-accent",
  // In this system the "flag" emphasis is the signal yellow.
  flag: "bg-line-highlight text-line-text",
  success: "bg-line-success-tint text-line-success",
  warning: "bg-line-warning-tint text-line-warning",
  error: "bg-line-error-tint text-line-error",
  info: "bg-line-info-tint text-line-info",
  outline: "border border-line-text text-line-text",
};

export function Badge({ tone = "neutral", dot = false, children }: { tone?: Tone; dot?: boolean; children: ReactNode }) {
  return (
    <span className={cx("inline-flex h-6 items-center gap-1.5 px-2 font-line-sans text-[11px] font-bold uppercase tracking-[0.06em]", tones[tone])}>
      {dot && <span className="size-2 bg-current" aria-hidden />}
      {children}
    </span>
  );
}

export function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-line-mono text-[10px] uppercase tracking-[0.06em] text-line-muted">{label}</dt>
      <dd className="font-line-sans text-3xl font-bold leading-none tracking-tight [font-stretch:75%]">{value}</dd>
    </div>
  );
}

function Kinds({ facility }: { facility: Facility }) {
  return (
    <ul className="flex flex-wrap gap-x-3 gap-y-1">
      {facility.kinds.map((k) => (
        <li key={k} className="flex items-center gap-1.5 font-line-sans text-xs font-semibold">
          <Bullet kind={k} />
          {signals[k].label}
        </li>
      ))}
    </ul>
  );
}

function SignalStripe({ facility }: { facility: Facility }) {
  return (
    <div className="flex h-2" aria-hidden>
      {facility.kinds.map((k) => (
        <span key={k} className="flex-1" style={{ backgroundColor: signals[k].hex }} />
      ))}
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
        "relative flex flex-col border border-line-text bg-line-surface transition-[box-shadow,transform]",
        "state-hover:-translate-x-0.5 state-hover:-translate-y-0.5 state-hover:shadow-[4px_4px_0_#111315] has-[a:hover]:-translate-x-0.5 has-[a:hover]:-translate-y-0.5 has-[a:hover]:shadow-[4px_4px_0_#111315]",
        "has-[a:focus-visible]:ring-[3px] has-[a:focus-visible]:ring-line-focus has-[a:focus-visible]:ring-offset-2 has-[a:focus-visible]:ring-offset-line-bg state-focus:ring-[3px] state-focus:ring-line-focus state-focus:ring-offset-2 state-focus:ring-offset-line-bg",
        saved && "border-l-[6px] border-l-line-highlight",
      )}
    >
      <SignalStripe facility={facility} />
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <span className="font-line-mono text-xs text-line-muted">
            {facility.grid} · {facility.distance}
          </span>
          {saved ? <Badge tone="flag">★ Saved</Badge> : <Badge tone={badge.tone} dot>{badge.label}</Badge>}
        </div>
        <h3 className="font-line-sans text-2xl font-bold leading-tight tracking-[-0.01em]">
          <Link href={href} className="outline-none after:absolute after:inset-0 after:content-['']">
            {facility.name}
          </Link>
        </h3>
        <Kinds facility={facility} />
        <dl className="mt-auto grid grid-cols-3 border-y border-line-text">
          {[
            ["Bays", String(facility.bays)],
            ["Bucket", facility.bucket],
            ["Max", facility.longest],
          ].map(([k, v], i) => (
            <div key={k} className={cx("py-2", i > 0 && "border-l border-line-text pl-3")}>
              <Stat label={k} value={v} />
            </div>
          ))}
        </dl>
        <p className="flex items-center gap-2 font-line-sans text-xs">
          <span aria-hidden className="grid size-5 shrink-0 place-items-center rounded-full bg-line-accent text-[10px] font-black text-line-on-accent">
            T
          </span>
          {facility.transit}
        </p>
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

// A row reads as a stop on the line: a vertical rail runs through every station dot.
// index is accepted for API parity with Design System 01; stations replace numbers here.
export function ListRow({ facility, href = "#", selected = false, force }: RowProps) {
  const badge = statusBadge[facility.status];
  const disabled = facility.status === "closed";
  const inner = (
    <>
      <span aria-hidden className="relative flex w-6 shrink-0 justify-center self-stretch">
        <span className={cx("absolute inset-y-0 w-1", disabled ? "bg-line-disabled" : "bg-line-accent")} />
        <span
          className={cx(
            "relative z-10 my-auto size-4 rounded-full border-[3px] bg-line-surface",
            disabled ? "border-line-disabled" : "border-line-accent",
          )}
        />
      </span>
      <span className="min-w-0 flex-1 py-3">
        <span className={cx("block truncate font-line-sans text-lg font-bold leading-tight", disabled ? "text-line-disabled" : "text-line-text")}>
          {facility.name}
        </span>
        <span className="font-line-mono text-xs text-line-muted">
          {facility.grid} · {facility.distance} · {facility.hours}
        </span>
      </span>
      <span className="hidden gap-1 sm:flex" aria-hidden>
        {facility.kinds.map((k) => (
          <Bullet key={k} kind={k} size={12} />
        ))}
      </span>
      <Badge tone={badge.tone}>{badge.label}</Badge>
      <span aria-hidden className={cx("font-line-sans text-lg font-bold", disabled ? "text-line-disabled" : "text-line-text")}>
        →
      </span>
    </>
  );
  const rowBase = "flex min-w-0 items-center gap-4 px-4";

  if (disabled) {
    return (
      <div aria-disabled="true" className={cx(rowBase, "cursor-not-allowed bg-line-disabled-bg/50")}>
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
        "transition-colors outline-none state-hover:bg-line-bg state-active:bg-line-rule aria-[current=true]:bg-line-highlight-tint state-focus:ring-[3px] state-focus:ring-inset state-focus:ring-line-focus",
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

// Full details for one facility, headed like a platform sign. Inline or inside <Modal>.
export function DetailPanel({ facility, titleId, onCloseSlot, actions }: PanelProps) {
  const badge = statusBadge[facility.status];
  return (
    <section className="flex flex-col bg-line-surface text-line-text">
      <header className="bg-line-accent text-line-on-accent">
        <SignalStripe facility={facility} />
        <div className="flex items-start justify-between gap-4 px-6 pb-5 pt-4">
          <div>
            <p className="font-line-mono text-xs text-line-rule">
              {facility.grid} · {facility.area}
            </p>
            <h2 id={titleId} className="mt-1 font-line-sans text-[1.75rem] font-bold leading-tight tracking-[-0.01em]">
              {facility.name}
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge tone={badge.tone} dot>
                {badge.label}
              </Badge>
              <span className="font-line-mono text-xs text-line-rule self-center">{facility.hours}</span>
            </div>
          </div>
          {onCloseSlot}
        </div>
      </header>
      <div className="space-y-5 px-6 py-5">
        <p className="font-line-sans text-base leading-relaxed">{facility.summary}</p>
        <Kinds facility={facility} />
        <dl className="grid grid-cols-3 border-y border-line-text">
          {[
            ["Bays", String(facility.bays)],
            ["Small bucket", facility.bucket],
            ["Max", facility.longest],
          ].map(([k, v], i) => (
            <div key={k} className={cx("py-3", i > 0 && "border-l border-line-text pl-3")}>
              <Stat label={k} value={v} />
            </div>
          ))}
        </dl>
        <div>
          <h3 className="font-line-sans text-xs font-semibold uppercase tracking-[0.08em]">Hours</h3>
          <table className="mt-2 w-full border-collapse font-line-mono text-sm">
            <tbody>
              {facility.schedule.map((s) => (
                <tr key={s.days} className="border-b border-line-rule">
                  <th scope="row" className="py-1.5 text-left font-normal text-line-muted">
                    {s.days}
                  </th>
                  <td className="py-1.5 text-right font-medium">{s.hours}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="font-line-sans text-sm">
          <span className="font-semibold">Getting there:</span> {facility.transit}
        </p>
      </div>
      {actions && <footer className="flex flex-wrap gap-3 border-t border-line-text px-6 py-4">{actions}</footer>}
    </section>
  );
}
