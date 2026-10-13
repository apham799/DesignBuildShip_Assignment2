"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { Alert, Button, Checkbox, Radio, Select, TextInput, Toggle } from "@/components/design-systems/clubhouse";
import { guideFacilities } from "./data";
import { facilityById, useGuide } from "./guide-context";
import { SaveControl } from "./save-control";

const buckets = [
  { id: "small", label: "Small bucket", balls: 40 },
  { id: "medium", label: "Medium bucket", balls: 70 },
  { id: "large", label: "Large bucket", balls: 100 },
] as const;

// What each focus area turns into on the card. Weight decides its share of the bucket.
const drills = [
  { id: "driver", label: "Driver", club: "DR", target: "Fairway gate · 240y", note: "hold the finish", weight: 1.2 },
  { id: "woods", label: "Fairway woods", club: "3W", target: "Lay-up · 210y", note: "sweep it", weight: 1 },
  { id: "irons", label: "Irons", club: "7i", target: "Flag · 150y", note: "ball first", weight: 1.4 },
  { id: "wedges", label: "Wedges", club: "PW–SW", target: "Ladder · 50/75/100y", note: "control the flight", weight: 1.2 },
  { id: "chipping", label: "Chipping", club: "SW", target: "Fringe · 10 ft circle", note: "quiet hands", weight: 0.8 },
  { id: "bunker", label: "Bunker", club: "SW", target: "Splash zone", note: "hit the sand", weight: 0.6 },
  { id: "putting", label: "Putting", club: "Putter", target: "3–6 ft circle", note: "15 minutes", weight: 0 },
] as const;
type DrillId = (typeof drills)[number]["id"];

type Row = { drill: string; club: string; target: string; balls: string; note: string };
type Card = { number: number; facilityId: string; facility: string; date: string; name: string; bucket: string; rows: Row[]; total: number };

const nameLimit = 24;

function buildCard(facilityId: string, bucketId: string, focus: DrillId[], warmup: boolean, name: string): Card {
  const bucket = buckets.find((b) => b.id === bucketId)!;
  const warm = warmup ? 10 : 0;
  const picked = drills.filter((d) => focus.includes(d.id));
  const weighted = picked.filter((d) => d.weight > 0);
  const totalWeight = weighted.reduce((s, d) => s + d.weight, 0);
  const pool = bucket.balls - warm;

  // Split the bucket by weight, then hand any rounding leftovers to the heaviest drill.
  const shares = new Map<string, number>(weighted.map((d) => [d.id, Math.floor((pool * d.weight) / totalWeight)]));
  const leftover = pool - [...shares.values()].reduce((s, n) => s + n, 0);
  if (weighted.length) {
    const heaviest = [...weighted].sort((a, b) => b.weight - a.weight)[0];
    shares.set(heaviest.id, (shares.get(heaviest.id) ?? 0) + leftover);
  }

  const rows: Row[] = [
    ...(warmup ? [{ drill: "Warm-up", club: "Wedge", target: "Easy half swings", balls: String(warm), note: "loosen up" }] : []),
    ...picked.map((d) => ({
      drill: d.label,
      club: d.club,
      target: d.target,
      balls: d.weight > 0 ? String(shares.get(d.id) ?? 0) : "—",
      note: d.note,
    })),
  ];
  return {
    number: Math.floor(1000 + Math.random() * 9000),
    facilityId,
    facility: facilityById(facilityId)?.name ?? "",
    date: new Date().toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }),
    name: name.trim(),
    bucket: `${bucket.label} · ${bucket.balls} balls`,
    rows,
    total: weighted.length ? bucket.balls : warm,
  };
}

export function Planner() {
  const { plannerFacility, setPlannerFacility } = useGuide();
  const [bucket, setBucket] = useState<string>("medium");
  const [focus, setFocus] = useState<DrillId[]>(["irons", "wedges"]);
  const [warmup, setWarmup] = useState(true);
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [card, setCard] = useState<Card | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const focusError = useId();

  const errors = {
    facility: !plannerFacility ? "Choose a facility for the card." : undefined,
    focus: focus.length === 0 ? "Pick at least one thing to work on." : undefined,
    name: name.length > nameLimit ? `Keep it to ${nameLimit} characters so it fits on the card.` : undefined,
  };
  const errorList = Object.values(errors).filter(Boolean);
  const show = (e?: string) => (submitted ? e : undefined);

  const allPicked = focus.length === drills.length;
  const somePicked = focus.length > 0 && !allPicked;

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    if (errorList.length) {
      // Move focus to the first problem so keyboard and screen reader users land on it.
      const first = errors.facility ? 'select[name="facility"]' : errors.focus ? 'input[name="focus"]' : 'input[name="name"]';
      formRef.current?.querySelector<HTMLElement>(first)?.focus();
      return;
    }
    const next = buildCard(plannerFacility, bucket, focus, warmup, name);
    setCard((prev) => {
      if (!prev) return next;
      const edited = new Map(prev.rows.map((r) => [r.drill, r.note]));
      return { ...next, number: prev.number, rows: next.rows.map((r) => ({ ...r, note: edited.get(r.drill) ?? r.note })) };
    });
    requestAnimationFrame(() => document.getElementById("session-card")?.focus());
  }

  function reset() {
    setPlannerFacility("");
    setBucket("medium");
    setFocus(["irons", "wedges"]);
    setWarmup(true);
    setName("");
    setSubmitted(false);
    setCard(null);
  }

  const facilityOptions = [
    { value: "", label: "Choose a facility" },
    ...guideFacilities
      .filter((f) => f.status !== "closed")
      .map((f) => ({ value: f.id, label: f.status === "seasonal" ? `${f.name} (${f.hours.toLowerCase()})` : f.name })),
  ];

  return (
    <section id="planner" aria-labelledby="planner-title" className="scroll-mt-24">
      <div className="max-w-2xl print:hidden">
        <p className="font-club-sign text-xs uppercase tracking-[0.25em] text-club-flag">The session planner</p>
        <h2 id="planner-title" className="mt-1 font-club-serif text-[2rem] leading-[1.1] sm:text-[2.5rem]">
          Plan a practice session
        </h2>
        <p className="mt-3 font-club-serif text-base leading-relaxed text-club-muted sm:text-lg">
          Pick a range, a bucket, and what you want to work on. We&rsquo;ll split the balls into a session card you can
          print and bring to the tee.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 items-start gap-8 lg:grid-cols-2">
        <form ref={formRef} noValidate onSubmit={onSubmit} className="space-y-6 rounded border border-club-rule bg-club-surface p-4 sm:p-6 print:hidden">
          {submitted && errorList.length > 0 && (
            <Alert tone="error" title={errorList.length === 1 ? "One thing needs a look" : `${errorList.length} things need a look`}>
              <ul className="mt-1 list-disc pl-5">
                {errorList.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
            </Alert>
          )}

          <Select
            label="Facility"
            name="facility"
            value={plannerFacility}
            onChange={(e) => setPlannerFacility(e.target.value)}
            options={facilityOptions}
            error={show(errors.facility)}
            hint="Closed facilities aren’t listed."
          />

          <fieldset>
            <legend className="mb-3 font-club-sign text-xs font-medium uppercase tracking-[0.2em]">
              Bucket size
            </legend>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {buckets.map((b) => (
                <Radio
                  key={b.id}
                  name="bucket"
                  value={b.id}
                  label={b.label.replace(" bucket", "")}
                  description={`${b.balls} balls`}
                  checked={bucket === b.id}
                  onChange={() => setBucket(b.id)}
                />
              ))}
            </div>
          </fieldset>

          <fieldset aria-describedby={show(errors.focus) ? focusError : undefined}>
            <legend className="mb-3 font-club-sign text-xs font-medium uppercase tracking-[0.2em]">
              What to work on
            </legend>
            <div className="mb-3 border-b border-club-rule pb-3">
              <Checkbox
                label="A bit of everything"
                checked={allPicked}
                indeterminate={somePicked}
                onChange={() => setFocus(allPicked ? [] : drills.map((d) => d.id))}
              />
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {drills.map((d) => (
                <Checkbox
                  key={d.id}
                  name="focus"
                  value={d.id}
                  label={d.label}
                  description={d.weight > 0 ? `${d.club} · ${d.target}` : "On the practice green"}
                  checked={focus.includes(d.id)}
                  onChange={() => setFocus((cur) => (cur.includes(d.id) ? cur.filter((x) => x !== d.id) : [...cur, d.id]))}
                />
              ))}
            </div>
            {show(errors.focus) && (
              <p id={focusError} className="mt-3 font-club-serif text-sm text-club-error">
                {errors.focus}
              </p>
            )}
          </fieldset>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:items-end">
            <TextInput
              label="Name on the card"
              name="name"
              placeholder="Optional"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={show(errors.name)}
              hint={`Up to ${nameLimit} characters.`}
            />
            <div className="flex h-11 items-center">
              <Toggle label="Start with a warm-up" on={warmup} onChange={setWarmup} />
            </div>
          </div>

          <div className="flex flex-wrap gap-3 border-t border-club-rule pt-5">
            <Button type="submit">{card ? "Update my card" : "Make my session card"}</Button>
            <Button variant="ghost" onClick={reset}>
              Start over
            </Button>
          </div>
        </form>

        <div aria-live="polite">
          {card ? (
            <div className="space-y-4">
              <div className="print:hidden">
                <Alert tone="success" title="Your session card is ready">
                  {card.total} balls at {card.facility}. Print it, or keep it open on your phone at the tee.
                </Alert>
              </div>
              <SessionCard
                card={card}
                onNoteChange={(drill, note) =>
                  setCard((c) => c && { ...c, rows: c.rows.map((r) => (r.drill === drill ? { ...r, note } : r)) })
                }
              />
              {/* One row at every width, so nothing moves. Print is icon-only to leave the save
                  control room; compact size, like the save buttons on the facility cards. */}
              <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-2 print:hidden">
                <Button variant="secondary" size="sm" className="w-9 px-0" aria-label="Print card" title="Print card" onClick={() => window.print()}>
                  {/* viewBox cropped to the drawing so the printer fills the button */}
                  <svg viewBox="2.5 2.5 19 19" className="size-7 shrink-0" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
                    <path d="M7 9 V3.5 H17 V9" />
                    <rect x="3.5" y="9" width="17" height="8" rx="1.5" />
                    <path d="M7 14 H17 V20.5 H7 Z" fill="var(--color-club-surface, #F8F2E4)" />
                    <circle cx="17.5" cy="11.75" r="0.9" fill="currentColor" stroke="none" />
                  </svg>
                </Button>
                <SaveControl facilityId={card.facilityId} />
              </div>
            </div>
          ) : (
            <div className="flex min-h-80 flex-col items-center justify-center gap-2 rounded border border-dashed border-club-edge bg-club-surface/60 px-6 py-12 text-center print:hidden">
              <p className="font-club-sign text-xs uppercase tracking-[0.25em] text-club-muted">Range session card</p>
              <p className="font-club-serif text-[1.375rem] font-semibold">Your card will appear here</p>
              <p className="max-w-xs font-club-serif text-base text-club-muted">Fill in the form and choose “Make my session card.”</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function SessionCard({ card, onNoteChange }: { card: Card; onNoteChange: (drill: string, note: string) => void }) {
  return (
    <article
      id="session-card"
      tabIndex={-1}
      aria-label={`Session card for ${card.facility}`}
      className="rounded border border-club-rule bg-club-paper p-5 shadow-[0_1px_2px_rgba(43,42,40,0.12),0_8px_20px_-12px_rgba(31,77,58,0.45)] outline-none focus-visible:ring-2 focus-visible:ring-club-focus sm:p-6 print:shadow-none"
    >
      <header className="flex flex-wrap items-baseline justify-between gap-2 border-b-[3px] border-double border-club-text pb-3">
        <h3 className="font-club-sign text-sm uppercase tracking-[0.25em] text-club-accent">Range session card</h3>
        <span className="font-club-mono text-xs">No. {card.number}</span>
      </header>
      <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 font-club-mono text-xs sm:grid-cols-4">
        <div className="col-span-2">
          <dt className="text-club-muted">Facility</dt>
          <dd className="font-club-serif text-base">{card.facility}</dd>
        </div>
        <div>
          <dt className="text-club-muted">Date</dt>
          <dd>{card.date}</dd>
        </div>
        <div>
          <dt className="text-club-muted">Player</dt>
          <dd className="font-club-hand text-xl leading-none text-club-lake">{card.name || "________"}</dd>
        </div>
      </dl>
      <div className="mt-2 flex flex-wrap items-baseline justify-between gap-2">
        <p className="font-club-mono text-xs text-club-muted">{card.bucket}</p>
        <p className="font-club-serif text-sm text-club-muted print:hidden">Tap a note to rewrite it.</p>
      </div>
      {/* scroll sideways on narrow phones rather than squeezing the columns */}
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[30rem] border-collapse font-club-mono text-xs">
          <thead>
            <tr className="bg-club-text text-club-on-select">
              {["Drill", "Club", "Target", "Balls", "Notes ✎"].map((h) => (
                <th key={h} scope="col" className="border border-club-text px-2 py-1.5 text-left font-normal uppercase tracking-wider">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {card.rows.map((r) => (
              <tr key={r.drill}>
                <th scope="row" className="border border-club-edge/50 px-2 py-1.5 text-left font-bold">
                  {r.drill}
                </th>
                <td className="border border-club-edge/50 px-2 py-1.5">{r.club}</td>
                <td className="border border-club-edge/50 px-2 py-1.5">{r.target}</td>
                <td className="border border-club-edge/50 px-2 py-1.5 tabular-nums">{r.balls}</td>
                <td className="border border-club-edge/50 p-0">
                  {/* Written in pencil, so it stays editable: hover tints the cell, focus shows the ring. */}
                  <input
                    type="text"
                    value={r.note}
                    maxLength={40}
                    onChange={(e) => onNoteChange(r.drill, e.target.value)}
                    aria-label={`Notes for ${r.drill}`}
                    placeholder="add a note"
                    className="block w-full min-w-[9rem] bg-transparent px-2 py-1 font-club-hand text-lg leading-tight text-club-lake placeholder:text-club-muted outline-none transition-colors hover:bg-club-sand/30 focus:bg-club-field focus:ring-2 focus:ring-inset focus:ring-club-focus"
                  />
                </td>
              </tr>
            ))}
            <tr className="bg-club-sand/40 font-bold">
              <th scope="row" colSpan={3} className="border border-club-edge/50 px-2 py-1.5 text-left">
                Total
              </th>
              <td className="border border-club-edge/50 px-2 py-1.5 tabular-nums">{card.total}</td>
              <td className="border border-club-edge/50 px-2 py-1.5" />
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-3 font-club-mono text-[10px] uppercase tracking-wider text-club-muted">
        Attest ________________ &nbsp; Wind ____ &nbsp; Felt good on ____
      </p>
    </article>
  );
}
