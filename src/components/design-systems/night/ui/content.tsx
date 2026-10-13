// Content components: badge, stat readout, facility card, list row, detail panel.
import Link from "next/link";
import type { ReactNode } from "react";
import { statusBadge, type Facility } from "../../sample";
import { cx, type Force } from "./shared";

type Tone = "neutral" | "accent" | "flag" | "success" | "warning" | "error" | "info" | "outline";

const tones: Record<Tone, string> = {
  neutral: "bg-white/10 text-night-text",
  accent: "bg-night-accent text-night-on-accent",
  // In this system the "flag" emphasis is violet, used for saved items.
  flag: "bg-night-special/20 text-night-special",
  success: "bg-night-success-tint text-night-success",
  warning: "bg-night-warning-tint text-night-warning",
  error: "bg-night-error-tint text-night-error",
  info: "bg-night-info-tint text-night-info",
  outline: "border border-night-edge text-night-muted",
};

export function Badge({ tone = "neutral", dot = false, children }: { tone?: Tone; dot?: boolean; children: ReactNode }) {
  return (
    <span className={cx("inline-flex h-6 items-center gap-1.5 rounded-full px-2.5 font-night-mono text-[10px] font-medium uppercase tracking-[0.1em]", tones[tone])}>
      {dot && <span className="size-1.5 rounded-full bg-current shadow-[0_0_6px_currentColor]" aria-hidden />}
      {children}
    </span>
  );
}

// A launch-monitor style readout set into the surface.
export function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-night-field px-3 py-2">
      <dt className="font-night-mono text-[10px] uppercase tracking-[0.1em] text-night-muted">{label}</dt>
      <dd className="font-night-mono text-xl font-bold tabular-nums text-night-text">{value}</dd>
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
        "relative flex flex-col overflow-hidden rounded-3xl border bg-night-surface transition-[border-color,box-shadow,transform]",
        saved
          ? "border-night-special/60 shadow-[0_0_24px_-6px_rgba(169,157,255,0.8)]"
          : "border-night-rule state-hover:border-night-accent/50 state-hover:shadow-[0_0_24px_-4px_rgba(200,255,77,0.75)] has-[a:hover]:border-night-accent/50 has-[a:hover]:shadow-[0_0_24px_-4px_rgba(200,255,77,0.75)]",
        "state-hover:-translate-y-0.5 has-[a:hover]:-translate-y-0.5",
        "has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-night-focus has-[a:focus-visible]:ring-offset-2 has-[a:focus-visible]:ring-offset-night-bg state-focus:ring-2 state-focus:ring-night-focus state-focus:ring-offset-2 state-focus:ring-offset-night-bg",
      )}
    >
      {/* a glow at the top, like light spilling over the range */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-24"
        style={{ background: "radial-gradient(60% 100% at 50% 0%, rgba(200,255,77,0.14), transparent 70%)" }}
      />
      <div className="relative flex flex-1 flex-col gap-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <span className="font-night-mono text-[11px] uppercase tracking-[0.1em] text-night-muted">
            {facility.area} · {facility.distance}
          </span>
          {saved ? <Badge tone="flag">★ Saved</Badge> : <Badge tone={badge.tone} dot>{badge.label}</Badge>}
        </div>
        <h3 className="font-night-display text-lg font-semibold leading-snug text-night-text">
          <Link href={href} className="outline-none after:absolute after:inset-0 after:content-['']">
            {facility.name}
          </Link>
        </h3>
        <ul className="flex flex-wrap gap-1.5">
          {facility.amenities.map((a) => (
            <li key={a} className="rounded-full bg-night-field px-2.5 py-1 font-night-mono text-[10px] uppercase tracking-[0.08em] text-night-muted">
              {a}
            </li>
          ))}
        </ul>
        <dl className="mt-auto grid grid-cols-3 gap-2">
          <Stat label="Bays" value={String(facility.bays)} />
          <Stat label="Bucket" value={facility.bucket} />
          <Stat label="Max" value={facility.longest} />
        </dl>
        <p className="font-night-body text-xs text-night-muted">{facility.hours}</p>
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

// A row reads like a high-score table: rank, name, then status.
export function ListRow({ facility, index, href = "#", selected = false, force }: RowProps) {
  const badge = statusBadge[facility.status];
  const disabled = facility.status === "closed";
  const inner = (
    <>
      <span
        className={cx(
          "grid size-10 shrink-0 place-items-center rounded-lg bg-night-field font-night-mono text-sm font-bold tabular-nums",
          disabled ? "text-night-disabled" : "text-night-accent",
        )}
      >
        {String(index).padStart(2, "0")}
      </span>
      <span className="min-w-0 flex-1">
        <span className={cx("block truncate font-night-display text-sm font-semibold", disabled ? "text-night-disabled" : "text-night-text")}>
          {facility.name}
        </span>
        <span className="font-night-mono text-[11px] uppercase tracking-[0.06em] text-night-muted">
          {facility.area} · {facility.distance} · {facility.hours}
        </span>
      </span>
      <Badge tone={badge.tone} dot={!disabled}>
        {badge.label}
      </Badge>
      <svg viewBox="0 0 16 16" aria-hidden className={cx("size-4 shrink-0", disabled ? "text-night-disabled" : "text-night-muted")} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M6 3 L11 8 L6 13" />
      </svg>
    </>
  );
  const rowBase = "flex items-center gap-4 px-4 py-3";

  if (disabled) {
    return (
      <div aria-disabled="true" className={cx(rowBase, "cursor-not-allowed opacity-80")}>
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
        "transition-colors outline-none state-hover:bg-white/5 state-active:bg-white/10 aria-[current=true]:bg-night-select/10 aria-[current=true]:shadow-[inset_3px_0_0_#5CE1E6] state-focus:ring-2 state-focus:ring-inset state-focus:ring-night-focus",
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

// Full details for one facility. Transparent, so it takes the surface it sits on:
// a card surface inline, or the raised surface inside <Modal>.
export function DetailPanel({ facility, titleId, onCloseSlot, actions }: PanelProps) {
  const badge = statusBadge[facility.status];
  return (
    <section className="flex flex-col text-night-text">
      <header
        className="flex items-start justify-between gap-4 border-b border-night-rule px-6 pb-5 pt-6"
        style={{ background: "radial-gradient(80% 120% at 0% 0%, rgba(200,255,77,0.12), transparent 60%), radial-gradient(60% 120% at 100% 0%, rgba(92,225,230,0.10), transparent 60%)" }}
      >
        <div>
          <p className="font-night-mono text-[11px] uppercase tracking-[0.12em] text-night-muted">
            {facility.area} · {facility.distance}
          </p>
          <h2 id={titleId} className="mt-1 font-night-display text-2xl font-semibold leading-tight">
            {facility.name}
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
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
        <p className="font-night-body text-base leading-relaxed">{facility.summary}</p>
        <dl className="grid grid-cols-3 gap-2">
          <Stat label="Bays" value={String(facility.bays)} />
          <Stat label="Small bucket" value={facility.bucket} />
          <Stat label="Max" value={facility.longest} />
        </dl>
        <div>
          <h3 className="font-night-mono text-[11px] font-medium uppercase tracking-[0.12em] text-night-muted">Hours</h3>
          <table className="mt-2 w-full border-collapse font-night-mono text-sm">
            <tbody>
              {facility.schedule.map((s) => (
                <tr key={s.days} className="border-b border-night-rule">
                  <th scope="row" className="py-2 text-left font-normal text-night-muted">
                    {s.days}
                  </th>
                  <td className="py-2 text-right tabular-nums">{s.hours}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="font-night-body text-sm text-night-muted">
          <span className="text-night-text">Getting there:</span> {facility.transit}
        </p>
      </div>
      {actions && <footer className="flex flex-wrap gap-3 border-t border-night-rule px-6 py-4">{actions}</footer>}
    </section>
  );
}
