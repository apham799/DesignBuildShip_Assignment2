// Data displays: carry chart, hours timeline, facility card.
import { Bullet } from "./data";

const carries = [
  { club: "DR", yards: 240 },
  { club: "3W", yards: 215 },
  { club: "5i", yards: 180 },
  { club: "7i", yards: 155 },
  { club: "9i", yards: 130 },
  { club: "PW", yards: 110 },
  { club: "SW", yards: 85 },
];
const maxYards = 300;

export function CarryChart() {
  return (
    <div className="flex h-full flex-col p-5">
      <div className="flex items-baseline justify-between">
        <p className="font-line-sans text-lg font-bold tracking-tight">Carry by club</p>
        <p className="font-line-mono text-[10px] text-line-steel">yards · sample session</p>
      </div>
      <div className="relative mt-4 flex-1">
        <div className="absolute inset-y-0 left-8 right-10 flex justify-between">
          {[0, 100, 200, 300].map((t) => (
            <span key={t} className="relative h-full w-px bg-line-ink/15">
              <span className="absolute -bottom-4 -translate-x-1/2 font-line-mono text-[9px] text-line-steel">
                {t}
              </span>
            </span>
          ))}
        </div>
        <ul className="relative space-y-1.5">
          {carries.map((c) => (
            <li key={c.club} className="flex items-center gap-2">
              <span className="w-6 font-line-mono text-xs font-semibold">{c.club}</span>
              <span className="relative mr-10 h-4 flex-1">
                <span
                  className="absolute inset-y-0 left-0 bg-line-ink"
                  style={{ width: `${(c.yards / maxYards) * 100}%` }}
                />
                <span
                  className="absolute inset-y-0 w-1 bg-line-green"
                  style={{ left: `${(c.yards / maxYards) * 100}%` }}
                />
                <span
                  className="absolute top-1/2 -translate-y-1/2 pl-2 font-line-mono text-[10px]"
                  style={{ left: `${(c.yards / maxYards) * 100}%` }}
                >
                  {c.yards}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const schedule = [
  { name: "Montrose Range", open: 6, close: 23, kind: "range" as const },
  { name: "Belmont Harbor", open: 7, close: 23, kind: "range" as const },
  { name: "Fullerton Short", open: 6, close: 20, kind: "short" as const },
  { name: "North Ave Sim", open: 9, close: 24, kind: "sim" as const },
  { name: "Streeterville Dome", open: 8, close: 22, kind: "dome" as const },
];
const dayStart = 5;
const dayEnd = 24;
const sunset = 19.5;
const now = 18.67;
const pct = (h: number) => `${((h - dayStart) / (dayEnd - dayStart)) * 100}%`;

export function HoursTimeline() {
  return (
    <div className="flex h-full flex-col p-5">
      <div className="flex items-baseline justify-between">
        <p className="font-line-sans text-lg font-bold tracking-tight">Open now</p>
        <p className="font-line-mono text-[10px] text-line-steel">
          <span className="mr-1 inline-block h-2 w-3 bg-line-yellow align-middle" />
          lit after sunset
        </p>
      </div>
      <div className="relative mt-6 space-y-2">
        {/* "now" marker, laid over the bar column */}
        <div className="pointer-events-none absolute inset-y-0 left-[8rem] right-0">
          <span className="absolute -top-2 bottom-0 z-10 w-0.5 bg-line-red" style={{ left: pct(now) }}>
            <span className="absolute -top-4 -translate-x-1/2 font-line-mono text-[9px] font-semibold text-line-red">
              18:40
            </span>
          </span>
        </div>
        {schedule.map((s) => (
          <div key={s.name} className="grid grid-cols-[7.5rem_1fr] items-center gap-2">
            <span className="flex items-center gap-1.5 truncate font-line-sans text-xs font-semibold">
              <Bullet kind={s.kind} size={8} />
              {s.name}
            </span>
            <span className="relative h-3 bg-line-aluminum">
              <span
                className="absolute inset-y-0 bg-line-ink"
                style={{ left: pct(s.open), width: `calc(${pct(Math.min(s.close, sunset))} - ${pct(s.open)})` }}
              />
              {s.close > sunset && (
                <span
                  className="absolute inset-y-0 bg-line-yellow"
                  style={{ left: pct(sunset), width: `calc(${pct(s.close)} - ${pct(sunset)})` }}
                />
              )}
            </span>
          </div>
        ))}
      </div>
      <div className="relative mt-1 grid grid-cols-[7.5rem_1fr] gap-2">
        <span />
        <span className="relative h-4 font-line-mono text-[9px] text-line-steel">
          {[6, 12, 18, 24].map((h) => (
            <span key={h} className="absolute -translate-x-1/2" style={{ left: pct(h) }}>
              {h === 24 ? "24" : String(h).padStart(2, "0")}
            </span>
          ))}
        </span>
      </div>
    </div>
  );
}

export function FacilityCard() {
  return (
    <article className="flex h-full flex-col p-5">
      <div className="flex items-center justify-between">
        <span className="flex gap-1">
          <Bullet kind="range" size={12} />
          <Bullet kind="sim" size={12} />
        </span>
        <span className="font-line-mono text-[10px]">3200 N · 500 W</span>
      </div>
      <h3 className="mt-6 font-line-sans text-3xl font-bold leading-none tracking-tight">
        Belmont Harbor Tee
      </h3>
      <p className="mt-2 font-line-sans text-sm text-line-steel">
        Two-tier range with heated upper bays and four simulators.
      </p>
      <dl className="mt-6 grid grid-cols-3 border-y border-line-ink">
        {[
          ["Bays", "60"],
          ["Tiers", "2"],
          ["Max", "300y"],
        ].map(([k, v], i) => (
          <div key={k} className={`py-3 ${i > 0 ? "border-l border-line-ink pl-3" : ""}`}>
            <dt className="font-line-mono text-[9px] uppercase text-line-steel">{k}</dt>
            <dd className="font-line-sans text-3xl font-bold tracking-tight [font-stretch:75%]">{v}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-auto flex flex-wrap items-center gap-2 pt-5">
        <span className="bg-line-yellow px-2 py-0.5 font-line-sans text-xs font-bold">Lit until 11 PM</span>
        <span className="font-line-sans text-xs">
          <span className="mr-1 inline-block size-2 rounded-full bg-line-red" />
          Red Line · Belmont · 12 min walk
        </span>
      </div>
    </article>
  );
}
