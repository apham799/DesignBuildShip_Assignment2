"use client";

// Faked-in-the-browser interactions. Nothing is stored; state resets on reload.
import { useState } from "react";

const clubs = {
  Driver: { speed: [145, 165], launch: [10, 14], spin: [2200, 2900], carry: [220, 265] },
  "7 Iron": { speed: [110, 122], launch: [15, 19], spin: [6200, 7200], carry: [150, 172] },
  PW: { speed: [88, 98], launch: [24, 29], spin: [8800, 9800], carry: [105, 122] },
} as const;
type Club = keyof typeof clubs;

const lerp = ([a, b]: readonly [number, number], t: number) => a + (b - a) * t;

type Shot = { id: number; speed: number; launch: number; spin: number; carry: number };

function makeShot(club: Club, id: number, t: number, l: number, s: number): Shot {
  const c = clubs[club];
  return { id, speed: lerp(c.speed, t), launch: lerp(c.launch, l), spin: lerp(c.spin, s), carry: lerp(c.carry, t) };
}

export function LaunchMonitor() {
  const [club, setClub] = useState<Club>("Driver");
  const [shot, setShot] = useState<Shot>(() => makeShot("Driver", 0, 0.6, 0.5, 0.4));

  function hit(nextClub = club) {
    setShot((prev) => makeShot(nextClub, prev.id + 1, Math.random(), Math.random(), Math.random()));
  }

  // Flight path: carry sets the landing point, launch angle sets the apex.
  const land = 20 + (shot.carry / 280) * 260;
  const apex = 100 - shot.launch * 2.6 - shot.carry / 12;

  const readouts = [
    ["Ball speed", shot.speed.toFixed(1), "mph"],
    ["Launch", shot.launch.toFixed(1), "°"],
    ["Spin", Math.round(shot.spin).toLocaleString("en-US"), "rpm"],
    ["Carry", Math.round(shot.carry).toString(), "yd"],
  ];

  return (
    <div className="flex h-full flex-col gap-4 p-5">
      <div className="flex items-center justify-between">
        <div className="flex gap-1 rounded-full bg-night-ink p-1">
          {(Object.keys(clubs) as Club[]).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => {
                setClub(c);
                hit(c);
              }}
              className={`rounded-full px-3 py-1 font-night-mono text-[11px] ${
                club === c ? "bg-night-lime text-night-ink" : "text-night-mist hover:text-night-flood"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <span className="font-night-mono text-[10px] text-night-mist">SHOT {String(shot.id + 1).padStart(3, "0")}</span>
      </div>
      <svg viewBox="0 0 300 110" className="block h-auto w-full rounded-xl bg-night-ink">
        <line x1="10" y1="100" x2="290" y2="100" stroke="#26304A" />
        {[100, 150, 200, 250].map((y) => {
          const x = 20 + (y / 280) * 260;
          return (
            <g key={y}>
              <line x1={x} y1="96" x2={x} y2="104" stroke="#26304A" />
              <text x={x} y="109" textAnchor="middle" fontSize="6" fill="#9AA4BF" className="font-night-mono">
                {y}
              </text>
            </g>
          );
        })}
        <path
          key={shot.id}
          d={`M20 100 Q ${(20 + land) / 2} ${apex.toFixed(1)} ${land.toFixed(1)} 100`}
          pathLength="1"
          strokeDasharray="1"
          fill="none"
          stroke="#C8FF4D"
          strokeWidth="2"
          strokeLinecap="round"
          style={{ filter: "drop-shadow(0 0 3px #C8FF4D)" }}
          className="motion-safe:animate-draw"
        />
        <circle cx={land.toFixed(1)} cy="100" r="2.5" fill="#F4F1E8" />
      </svg>
      <dl className="grid grid-cols-4 gap-2">
        {readouts.map(([label, value, unit]) => (
          <div key={label} className="rounded-xl bg-night-ink px-2 py-2">
            <dt className="font-night-mono text-[9px] uppercase text-night-mist">{label}</dt>
            <dd className="font-night-display text-lg font-bold text-night-flood">
              {value}
              <span className="ml-0.5 font-night-mono text-[9px] font-normal text-night-mist">{unit}</span>
            </dd>
          </div>
        ))}
      </dl>
      <button
        type="button"
        onClick={() => hit()}
        className="mt-auto rounded-full bg-night-lime py-2.5 font-night-display text-sm font-bold uppercase text-night-ink shadow-[0_0_24px_-4px_rgba(200,255,77,0.8)] hover:brightness-110"
      >
        Hit a shot
      </button>
    </div>
  );
}

export function LightsSwitch() {
  const [on, setOn] = useState(true);
  return (
    <div className="relative h-full min-h-72 overflow-hidden bg-night-ink">
      {/* floodlight wash */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${on ? "opacity-100" : "opacity-0"}`}
        style={{
          background:
            "radial-gradient(80% 70% at 20% 0%, rgba(244,241,232,0.32), transparent 60%), radial-gradient(80% 70% at 80% 0%, rgba(244,241,232,0.32), transparent 60%)",
        }}
      />
      {/* a row of bays seen from behind */}
      <div className="absolute inset-x-6 bottom-6 grid grid-cols-6 gap-2">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="flex flex-col items-center gap-1.5">
            <div
              className={`h-24 w-full rounded-t-lg border transition-colors duration-700 ${
                on ? "border-night-flood/30 bg-night-panel" : "border-night-line bg-night-navy"
              }`}
            >
              <div
                className={`mx-auto mt-2 h-1 w-2/3 rounded-full transition-all duration-700 ${
                  on ? "bg-night-flood shadow-[0_0_12px_3px_rgba(244,241,232,0.7)]" : "bg-night-line"
                }`}
              />
            </div>
            <div
              className={`h-3 w-full rounded transition-all duration-700 ${
                on ? "bg-night-turf shadow-[0_0_14px_-2px_rgba(200,255,77,0.6)]" : "bg-night-panel"
              }`}
            />
            <span className="font-night-mono text-[10px] text-night-mist">{String(i + 7).padStart(2, "0")}</span>
          </div>
        ))}
      </div>
      <div className="absolute left-5 top-5 flex items-center gap-3">
        <button
          type="button"
          role="switch"
          aria-checked={on}
          aria-label="Range lights"
          onClick={() => setOn((v) => !v)}
          className={`relative h-7 w-12 rounded-full transition-colors ${on ? "bg-night-amber" : "bg-night-line"}`}
        >
          <span
            className={`absolute top-1 size-5 rounded-full bg-night-flood transition-all ${
              on ? "left-6 shadow-[0_0_14px_2px_rgba(255,181,71,0.9)]" : "left-1"
            }`}
          />
        </button>
        <span className="font-night-display text-sm font-semibold text-night-flood">
          {on ? "Lights on · 6:48 PM" : "Lights come on at dusk"}
        </span>
      </div>
    </div>
  );
}

const slots = ["6:00", "6:30", "7:00", "7:30", "8:00", "8:30", "9:00", "9:30", "10:00", "10:30", "11:00", "11:30"];
const taken = new Set(["6:30", "7:00", "7:30", "8:30", "9:00"]);

export function SlotPicker() {
  const [picked, setPicked] = useState<string | null>("9:30");
  const [held, setHeld] = useState(false);
  return (
    <div className="flex h-full flex-col gap-4 p-5">
      <div className="flex items-baseline justify-between">
        <p className="font-night-display text-sm font-semibold text-night-flood">Book a bay tonight</p>
        <p className="font-night-mono text-[10px] text-night-mist">PM</p>
      </div>
      <div className="grid grid-cols-4 gap-1.5">
        {slots.map((s) => {
          const isTaken = taken.has(s);
          const isPicked = picked === s;
          return (
            <button
              key={s}
              type="button"
              disabled={isTaken}
              onClick={() => {
                setPicked(s);
                setHeld(false);
              }}
              className={`rounded-lg py-1.5 font-night-mono text-[11px] transition ${
                isTaken
                  ? "cursor-not-allowed text-night-line line-through"
                  : isPicked
                    ? "bg-night-cyan text-night-ink shadow-[0_0_16px_-2px_rgba(92,225,230,0.8)]"
                    : "bg-night-ink text-night-flood hover:bg-night-line"
              }`}
            >
              {s}
            </button>
          );
        })}
      </div>
      <div className="mt-auto rounded-xl bg-night-ink p-3">
        <p className="font-night-mono text-[11px] text-night-mist">
          {picked ? `Bay 07 · ${picked} PM · 60 min` : "Pick a time"}
        </p>
        <p className="font-night-display text-xl font-bold text-night-flood">$28</p>
      </div>
      <button
        type="button"
        disabled={!picked}
        onClick={() => setHeld(true)}
        className="rounded-full border border-night-cyan py-2 font-night-display text-xs font-bold uppercase text-night-cyan hover:bg-night-cyan hover:text-night-ink"
      >
        {held ? "✓ Held (demo only)" : "Hold this bay"}
      </button>
    </div>
  );
}
