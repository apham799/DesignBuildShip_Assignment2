"use client";

import { useEffect, useId, useState } from "react";
import { Badge, Button, CloseButton, EmptyState, Modal, statusBadge } from "@/components/design-systems/clubhouse";
import { facilityById, useGuide } from "./guide-context";

const links = [
  { href: "#finder", label: "Find a range" },
  { href: "#planner", label: "Plan a session" },
  { href: "#about", label: "About" },
];

export function BrandMark({ className = "size-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <circle cx="20" cy="20" r="19" fill="#1F4D3A" />
      <circle cx="20" cy="20" r="15.5" fill="none" stroke="#F3EBD8" strokeWidth="1" strokeDasharray="2 2" />
      <line x1="17" y1="10" x2="17" y2="29" stroke="#F3EBD8" strokeWidth="1.8" />
      <path d="M17 10 L27 13.5 L17 17 Z" fill="#B23A2E" />
      <ellipse cx="20" cy="29.5" rx="7" ry="2" fill="#F3EBD8" />
    </svg>
  );
}

const navLink =
  "rounded-sm px-1 py-1 font-club-sign text-sm font-medium uppercase tracking-[0.18em] text-club-text underline-offset-8 outline-none transition-colors hover:text-club-accent hover:underline focus-visible:ring-2 focus-visible:ring-club-focus focus-visible:ring-offset-2 focus-visible:ring-offset-club-bg";

export function SiteHeader() {
  const { plan, setPlanOpen } = useGuide();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();

  // Esc closes the mobile menu.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-30 border-b-[3px] border-double border-club-text bg-club-bg/95 backdrop-blur print:hidden">
      <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 sm:gap-4 sm:px-6 lg:px-8">
        <a href="#top" className="flex min-w-0 items-center gap-2 rounded-sm outline-none sm:gap-3 focus-visible:ring-2 focus-visible:ring-club-focus focus-visible:ring-offset-2 focus-visible:ring-offset-club-bg">
          <BrandMark className="size-8 shrink-0 sm:size-9" />
          <span className="min-w-0 leading-none">
            <span className="block font-club-serif text-xl text-club-accent sm:text-2xl">Clubhouse Almanac</span>
            <span className="mt-1 block font-club-sign text-[10px] uppercase tracking-[0.25em] text-club-muted sm:text-[11px]">
              Chicago practice facility guide
            </span>
          </span>
        </a>

        <nav aria-label="Sections" className="ml-auto hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className={navLink}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-2 md:ml-6">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setPlanOpen(true)}
            aria-label={`Practice plan, ${plan.length} ${plan.length === 1 ? "facility" : "facilities"}`}
          >
            <span className="hidden sm:inline">Practice plan</span>
            <span className="sm:hidden">Plan</span>
            <span className="grid min-w-5 place-items-center rounded-full bg-club-text px-1.5 font-club-mono text-[11px] tracking-normal text-club-on-select">
              {plan.length}
            </span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-9 px-0 md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls={menuId}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <svg viewBox="0 0 16 16" className="size-4" aria-hidden fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {menuOpen ? <path d="M4 4 L12 12 M12 4 L4 12" /> : <path d="M2.5 4.5 H13.5 M2.5 8 H13.5 M2.5 11.5 H13.5" />}
            </svg>
          </Button>
        </div>
      </div>

      {/* mobile menu */}
      <nav id={menuId} aria-label="Sections" hidden={!menuOpen} className="border-t border-club-rule px-4 pb-4 pt-2 md:hidden">
        <ul className="flex flex-col">
          {links.map((l) => (
            <li key={l.href} className="border-b border-club-rule last:border-0">
              <a href={l.href} onClick={() => setMenuOpen(false)} className={`${navLink} block py-3`}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <PlanDialog />
    </header>
  );
}

function PlanDialog() {
  const { plan, planOpen, setPlanOpen, removeFromPlan, planSessionAt } = useGuide();
  const titleId = useId();
  const saved = plan.map(facilityById).filter((f) => f !== undefined);
  // The planner only lists facilities that are open or opening, so closed ones can't start a session.
  const firstPlannable = saved.find((f) => f.status !== "closed");

  return (
    <Modal open={planOpen} onClose={() => setPlanOpen(false)} labelledBy={titleId}>
      <div className="flex items-start justify-between gap-4 border-b-[3px] border-double border-club-text px-6 pb-4 pt-6">
        <div>
          <p className="font-club-sign text-xs uppercase tracking-[0.2em] text-club-flag">Your practice plan</p>
          <h2 id={titleId} className="mt-1 font-club-serif text-[1.75rem] font-medium leading-tight">
            {saved.length === 0 ? "Nothing saved yet" : `${saved.length} ${saved.length === 1 ? "facility" : "facilities"} saved`}
          </h2>
        </div>
        <CloseButton onClick={() => setPlanOpen(false)} />
      </div>

      <div className="max-h-[60vh] overflow-y-auto px-6 py-5">
        {saved.length === 0 ? (
          <EmptyState
            title="Start a plan"
            action={
              <Button
                onClick={() => {
                  setPlanOpen(false);
                  requestAnimationFrame(() => document.getElementById("finder")?.scrollIntoView());
                }}
              >
                Find a range
              </Button>
            }
          >
            Save the ranges you want to try, then turn one into a session card.
          </EmptyState>
        ) : (
          <ul className="divide-y divide-club-rule rounded border border-club-rule bg-club-surface">
            {saved.map((f) => (
              <li key={f.id} className="flex flex-wrap items-center gap-3 px-4 py-3">
                <span className="min-w-0 flex-1">
                  <span className="block font-club-serif text-lg leading-tight">{f.name}</span>
                  <span className="font-club-mono text-xs text-club-muted">
                    {f.area} · {f.hours}
                  </span>
                </span>
                <Badge tone={statusBadge[f.status].tone}>{statusBadge[f.status].label}</Badge>
                <span className="flex gap-1">
                  <Button
                    variant="secondary"
                    size="sm"
                    disabled={f.status === "closed"}
                    title={f.status === "closed" ? "Closed for the season" : undefined}
                    onClick={() => planSessionAt(f.id)}
                  >
                    Plan session
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => removeFromPlan(f.id)} aria-label={`Remove ${f.name}`}>
                    Remove
                  </Button>
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {saved.length > 0 && (
        <div className="flex flex-wrap justify-end gap-3 border-t border-club-rule px-6 py-4">
          <Button variant="ghost" onClick={() => setPlanOpen(false)}>
            Keep browsing
          </Button>
          <Button disabled={!firstPlannable} onClick={() => firstPlannable && planSessionAt(firstPlannable.id)}>
            Plan a session
          </Button>
        </div>
      )}
    </Modal>
  );
}
