// Layout helpers for the Design System 01 docs page.
import type { ReactNode } from "react";

export function Section({ id, kicker, title, intro, children }: { id: string; kicker: string; title: string; intro?: ReactNode; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-8 border-t-[3px] border-double border-club-accent pt-8">
      <p className="font-club-sign text-xs font-medium uppercase tracking-[0.25em] text-club-flag">{kicker}</p>
      <h2 className="mt-1 font-club-serif text-[2.5rem] leading-[1.1] text-club-text">{title}</h2>
      {intro && <div className="mt-3 max-w-2xl font-club-serif text-base leading-relaxed text-club-muted">{intro}</div>}
      <div className="mt-8 space-y-10">{children}</div>
    </section>
  );
}

export function Block({ title, note, children }: { title: string; note?: ReactNode; children: ReactNode }) {
  return (
    <div>
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2 border-b border-club-rule pb-2">
        <h3 className="font-club-serif text-[1.375rem] font-semibold text-club-text">{title}</h3>
        {note && <p className="font-club-mono text-xs text-club-muted">{note}</p>}
      </div>
      {children}
    </div>
  );
}

// A labeled matrix: one row per variant, one column per state.
export function StateGrid({ columns, rows, minCell = "9rem" }: { columns: string[]; rows: { label?: string; cells: ReactNode[] }[]; minCell?: string }) {
  const hasLabels = rows.some((r) => r.label);
  const template = `${hasLabels ? "7rem " : ""}repeat(${columns.length}, minmax(${minCell}, 1fr))`;
  return (
    <div className="overflow-x-auto rounded border border-club-rule bg-club-surface">
      <div className="grid min-w-max gap-x-4 gap-y-5 p-5" style={{ gridTemplateColumns: template }}>
        {hasLabels && <span />}
        {columns.map((c) => (
          <span key={c} className="font-club-sign text-[11px] font-medium uppercase tracking-[0.2em] text-club-muted">
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
      {hasLabels && <span className="self-center font-club-mono text-xs text-club-muted">{label}</span>}
      {cells.map((c, i) => (
        <div key={i} className="flex items-center">
          {c}
        </div>
      ))}
    </>
  );
}

export function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded border border-club-rule bg-club-surface p-5 ${className}`}>{children}</div>;
}
