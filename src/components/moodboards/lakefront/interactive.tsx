"use client";

// Faked-in-the-browser interactions. Nothing is stored; state resets on reload.
import { useEffect, useState } from "react";
import { Bullet, categories, stations, type Category } from "./data";

const boardRows = [
  { bay: "B14", tier: "UPPER", states: [["OPEN", "--"], ["HELD", "05"], ["OPEN", "--"]] },
  { bay: "A03", tier: "LOWER", states: [["BUSY", "12"], ["BUSY", "08"], ["OPEN", "--"]] },
  { bay: "S02", tier: "SIM", states: [["BUSY", "25"], ["BUSY", "20"], ["BUSY", "15"]] },
  { bay: "A21", tier: "LOWER", states: [["OPEN", "--"], ["BUSY", "30"], ["BUSY", "28"]] },
  { bay: "B40", tier: "UPPER", states: [["HELD", "03"], ["OPEN", "--"], ["OPEN", "--"]] },
];

function Flaps({ text, width, open = false }: { text: string; width: number; open?: boolean }) {
  return (
    <span className="flex gap-px">
      {text.padEnd(width).split("").map((ch, i) => (
        <span
          key={i}
          className={`flex h-6 w-4 items-center justify-center font-line-mono text-sm font-semibold ${open ? "text-line-green" : "text-line-paper"}`}
          style={{
            background: "linear-gradient(180deg, #23272b 0 49%, #0b0c0d 49% 51%, #1c1f22 51%)",
          }}
        >
          {ch}
        </span>
      ))}
    </span>
  );
}

export function DepartureBoard() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 2500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex h-full flex-col justify-center bg-line-ink p-5">
      <div className="mb-3 flex items-center justify-between">
        <p className="font-line-sans text-sm font-bold uppercase tracking-[0.2em] text-line-yellow">
          Next Open Bay
        </p>
        <p className="font-line-mono text-[10px] text-line-concrete">Belmont Harbor Tee · live*</p>
      </div>
      <div className="grid grid-cols-[auto_auto_auto_auto] justify-start gap-x-4 gap-y-1.5 overflow-x-auto">
        {["Bay", "Tier", "Status", "Min"].map((h) => (
          <span key={h} className="font-line-mono text-[9px] uppercase text-line-concrete">
            {h}
          </span>
        ))}
        {boardRows.map((row) => {
          const [status, wait] = row.states[tick % row.states.length];
          return [
            <Flaps key={`${row.bay}-b`} text={row.bay} width={3} />,
            <Flaps key={`${row.bay}-t`} text={row.tier} width={5} />,
            <Flaps key={`${row.bay}-s`} text={status} width={4} open={status === "OPEN"} />,
            <Flaps key={`${row.bay}-w`} text={wait} width={2} />,
          ];
        })}
      </div>
      <p className="mt-3 font-line-mono text-[9px] text-line-concrete">*Simulated. Rotates every few seconds.</p>
    </div>
  );
}

const startingBuckets = 10;

export function RangePass() {
  const [left, setLeft] = useState(startingBuckets);
  const [tapped, setTapped] = useState(false);

  function tap() {
    if (left === 0) {
      setLeft(startingBuckets);
      setTapped(false);
      return;
    }
    setLeft((n) => n - 1);
    setTapped(true);
  }

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 bg-line-aluminum p-5">
      <div className="relative aspect-[1.586] w-full max-w-72 overflow-hidden rounded-xl bg-line-ink p-4 text-line-paper shadow-lg">
        <span className="absolute -right-6 top-0 h-full w-24 -skew-x-12 bg-line-green" />
        <span className="absolute right-14 top-0 h-full w-3 -skew-x-12 bg-line-blue" />
        <p className="relative font-line-sans text-lg font-black uppercase tracking-tight [font-stretch:75%]">
          Range Pass
        </p>
        <span className="relative mt-3 block h-7 w-9 rounded bg-gradient-to-br from-[#d9c27a] to-[#a8893b]" />
        <p className="absolute bottom-10 left-4 font-line-mono text-xs tracking-widest">0418 2210 7731</p>
        <p className="absolute bottom-4 left-4 font-line-sans text-xs">
          <span className="text-2xl font-bold">{left}</span> buckets left
        </p>
      </div>
      <button
        type="button"
        onClick={tap}
        className="w-full max-w-72 bg-line-ink px-4 py-2.5 font-line-sans text-sm font-bold uppercase tracking-wider text-line-paper hover:bg-line-steel"
      >
        {left === 0 ? "Reload pass" : "Tap at kiosk"}
      </button>
      <p className="h-4 font-line-mono text-[10px] text-line-steel">
        {tapped && left > 0 ? `✓ Bucket dispensed · ${left} left` : left === 0 ? "Pass empty" : " "}
      </p>
    </div>
  );
}

const walkMinutes = [6, 12, 18, 22, 27, 34, 41, 48, 55];
const filters: ("all" | Category)[] = ["all", "range", "short", "sim"];

export function PhoneList() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("all");
  const rows = stations
    .map((s, i) => ({ ...s, minutes: walkMinutes[i] }))
    .filter((s) => filter === "all" || s.kinds.includes(filter))
    .slice(0, 5);

  return (
    <div className="flex h-full items-center justify-center bg-line-aluminum p-5">
      <div className="w-full max-w-64 rounded-[2rem] border-[7px] border-line-ink bg-line-paper">
        <div className="flex items-center justify-between px-5 pb-1 pt-2 font-line-mono text-[9px]">
          <span>18:40</span>
          <span>●●● ▮</span>
        </div>
        <div className="px-4 pb-2">
          <p className="font-line-sans text-xl font-bold tracking-tight">Ranges near you</p>
          <div className="mt-2 border border-line-ink px-2 py-1.5 font-line-sans text-[11px] text-line-steel">
            Search by street or line
          </div>
          <div className="mt-2 flex gap-1">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`border px-2 py-0.5 font-line-sans text-[10px] font-semibold ${
                  filter === f ? "border-line-ink bg-line-ink text-line-paper" : "border-line-ink/30"
                }`}
              >
                {f === "all" ? "All" : categories[f].label.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>
        <ul className="divide-y divide-line-ink/10 border-t border-line-ink/10">
          {rows.map((s) => (
            <li key={s.name} className="flex items-center gap-2 px-4 py-2">
              <span className="flex flex-col gap-0.5">
                {s.kinds.map((k) => (
                  <Bullet key={k} kind={k} size={7} />
                ))}
              </span>
              <span className="flex-1">
                <span className="block font-line-sans text-xs font-semibold leading-tight">{s.name}</span>
                <span className="font-line-mono text-[9px] text-line-steel">{s.grid}</span>
              </span>
              <span className="font-line-sans text-sm font-bold">
                {s.minutes}
                <span className="text-[9px] font-normal"> min</span>
              </span>
            </li>
          ))}
        </ul>
        <div className="mx-auto my-2 h-1 w-20 rounded-full bg-line-ink" />
      </div>
    </div>
  );
}
