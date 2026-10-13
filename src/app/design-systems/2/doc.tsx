// Layout helpers for the Design System 02 docs page.
import type { ReactNode } from "react";

export function Section({ id, index, title, intro, children }: { id: string; index: number; title: string; intro?: ReactNode; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-8 border-t-4 border-line-text pt-6">
      <div className="grid gap-4 md:grid-cols-[5rem_1fr]">
        <span className="font-line-sans text-5xl font-black leading-none tracking-tight [font-stretch:62%]">
          {String(index).padStart(2, "0")}
        </span>
        <div>
          <h2 className="font-line-sans text-[2.5rem] font-extrabold leading-[1.05] tracking-[-0.01em]">{title}</h2>
          {intro && <div className="mt-3 max-w-2xl font-line-sans text-base leading-normal text-line-muted">{intro}</div>}
        </div>
      </div>
      <div className="mt-8 space-y-10">{children}</div>
    </section>
  );
}

export function Block({ title, note, children }: { title: string; note?: ReactNode; children: ReactNode }) {
  return (
    <div>
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-line-sans text-xl font-bold">{title}</h3>
        {note && <p className="font-line-mono text-[11px] uppercase tracking-[0.06em] text-line-muted">{note}</p>}
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
    <div className="relative overflow-x-auto border border-line-text bg-line-surface">
      <div className="grid min-w-max" style={{ gridTemplateColumns: template }}>
        {hasLabels && <span className="border-b border-line-text bg-line-text" />}
        {columns.map((c) => (
          <span key={c} className="border-b border-line-text bg-line-text px-4 py-2 font-line-mono text-[11px] uppercase tracking-[0.06em] text-line-on-accent">
            {c}
          </span>
        ))}
        {rows.map((r, i) => (
          <Row key={i} label={r.label} cells={r.cells} hasLabels={hasLabels} last={i === rows.length - 1} />
        ))}
      </div>
    </div>
  );
}

function Row({ label, cells, hasLabels, last }: { label?: string; cells: ReactNode[]; hasLabels: boolean; last: boolean }) {
  const line = last ? "" : "border-b border-line-rule";
  return (
    <>
      {hasLabels && <span className={`flex items-center px-4 py-4 font-line-mono text-[11px] uppercase text-line-muted ${line}`}>{label}</span>}
      {cells.map((c, i) => (
        <div key={i} className={`flex items-center px-4 py-4 ${line}`}>
          {c}
        </div>
      ))}
    </>
  );
}

export function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`border border-line-text bg-line-surface p-5 ${className}`}>{children}</div>;
}

export function Caption({ children }: { children: ReactNode }) {
  return <p className="mb-2 font-line-mono text-[11px] uppercase tracking-[0.06em] text-line-muted">{children}</p>;
}
