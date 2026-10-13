// Layout helpers for the Design System 03 docs page.
import type { ReactNode } from "react";

export function Section({ id, index, title, intro, children }: { id: string; index: number; title: string; intro?: ReactNode; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-8">
      <p className="font-night-mono text-[11px] uppercase tracking-[0.3em] text-night-accent">Level {String(index).padStart(2, "0")}</p>
      <h2 className="mt-2 font-night-display text-4xl font-bold leading-[1.1]">{title}</h2>
      {intro && <div className="mt-3 max-w-2xl font-night-body text-base leading-relaxed text-night-muted">{intro}</div>}
      <div className="mt-8 space-y-10">{children}</div>
    </section>
  );
}

export function Block({ title, note, children }: { title: string; note?: ReactNode; children: ReactNode }) {
  return (
    <div>
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-night-display text-lg font-semibold">{title}</h3>
        {note && <p className="font-night-mono text-[10px] uppercase tracking-[0.1em] text-night-muted">{note}</p>}
      </div>
      {children}
    </div>
  );
}

// A labeled matrix: one row per variant, one column per state.
export function StateGrid({ columns, rows, minCell = "9rem" }: { columns: string[]; rows: { label?: string; cells: ReactNode[] }[]; minCell?: string }) {
  const hasLabels = rows.some((r) => r.label);
  const template = `${hasLabels ? "6.5rem " : ""}repeat(${columns.length}, minmax(${minCell}, 1fr))`;
  return (
    <div className="relative overflow-x-auto rounded-3xl border border-night-rule bg-night-surface">
      <div className="grid min-w-max gap-x-4 gap-y-5 p-5" style={{ gridTemplateColumns: template }}>
        {hasLabels && <span />}
        {columns.map((c) => (
          <span key={c} className="font-night-mono text-[10px] uppercase tracking-[0.12em] text-night-muted">
            {c}
          </span>
        ))}
        {rows.map((r, i) => (
          <Row key={i} label={r.label} cells={r.cells} hasLabels={hasLabels} />
        ))}
      </div>
    </div>
  );
}

function Row({ label, cells, hasLabels }: { label?: string; cells: ReactNode[]; hasLabels: boolean }) {
  return (
    <>
      {hasLabels && <span className="self-center font-night-mono text-[10px] uppercase tracking-[0.1em] text-night-accent">{label}</span>}
      {cells.map((c, i) => (
        <div key={i} className="flex items-center">
          {c}
        </div>
      ))}
    </>
  );
}

export function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-3xl border border-night-rule bg-night-surface p-6 ${className}`}>{children}</div>;
}

export function Caption({ children }: { children: ReactNode }) {
  return <p className="mb-2 font-night-mono text-[10px] uppercase tracking-[0.12em] text-night-muted">{children}</p>;
}
