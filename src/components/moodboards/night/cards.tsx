// Static cards: palette, type, forecast, bay status, dispersion, wristband, quote.
import { seeded } from "./scenes";

const swatches = [
  { name: "Midnight", hex: "#07090F", role: "Ground" },
  { name: "Floodlight", hex: "#F4F1E8", role: "Light" },
  { name: "Sodium", hex: "#FFB547", role: "Warmth" },
  { name: "Tracer", hex: "#C8FF4D", role: "Action" },
  { name: "Ice", hex: "#5CE1E6", role: "Cool" },
  { name: "Flag", hex: "#FF5A5F", role: "Alert" },
  { name: "Sim", hex: "#8B7CFF", role: "Indoor" },
  { name: "Night Turf", hex: "#1E6B4A", role: "Field" },
];

export function Palette() {
  return (
    <div className="grid h-full grid-cols-2 content-center gap-x-4 gap-y-5 p-6">
      {swatches.map((s) => (
        <div key={s.hex} className="flex items-center gap-3">
          <span
            className="size-10 shrink-0 rounded-full ring-1 ring-night-line"
            style={{ backgroundColor: s.hex, boxShadow: `0 0 22px -2px ${s.hex}99` }}
          />
          <span>
            <span className="block font-night-display text-xs font-semibold text-night-flood">{s.name}</span>
            <span className="font-night-mono text-[10px] text-night-mist">
              {s.role} · {s.hex}
            </span>
          </span>
        </div>
      ))}
    </div>
  );
}

export function TypeSpecimen() {
  return (
    <div className="flex h-full flex-col justify-between gap-5 p-6">
      <div className="flex items-start justify-between">
        <span className="font-night-display text-7xl font-black leading-none text-night-flood">Ag</span>
        <span className="text-right font-night-mono text-[10px] leading-relaxed text-night-mist">
          Unbounded — display
          <br />
          JetBrains Mono — data
          <br />
          Instrument Serif — voice
        </span>
      </div>
      <p className="font-night-display text-3xl font-bold uppercase leading-[0.95] text-night-flood">
        Last bucket
        <br />
        <span className="text-night-lime">at 11:40</span>
      </p>
      <p className="font-night-mono text-sm text-night-cyan">BALL 152.4 MPH · LAUNCH 12.1° · SPIN 2,480</p>
      <p className="font-night-serif text-2xl italic leading-snug text-night-amber">
        the best swings happen after everyone else goes home
      </p>
    </div>
  );
}

export function Forecast() {
  return (
    <div className="flex h-full flex-col justify-between gap-4 p-6">
      <div className="flex items-start justify-between">
        <span className="font-night-mono text-[10px] uppercase tracking-widest text-night-mist">Tonight · Lakefront</span>
        <span className="rounded-full bg-night-amber/15 px-2 py-0.5 font-night-mono text-[10px] text-night-amber">
          Heaters on
        </span>
      </div>
      <div className="flex items-end gap-2">
        <span className="font-night-display text-7xl font-bold leading-none text-night-flood">28°</span>
        <span className="pb-2 font-night-serif text-xl italic text-night-cyan">clear &amp; cold</span>
      </div>
      <dl className="grid grid-cols-3 gap-2 border-t border-night-line pt-3">
        {[
          ["Wind", "NE 9"],
          ["Sunset", "4:22"],
          ["Lights", "4:10"],
        ].map(([k, v]) => (
          <div key={k}>
            <dt className="font-night-mono text-[9px] uppercase text-night-mist">{k}</dt>
            <dd className="font-night-display text-sm font-semibold text-night-flood">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

const bayStatus: ("open" | "busy" | "held")[] = [
  "busy", "open", "busy", "busy", "held", "open",
  "busy", "open", "open", "busy", "held", "busy",
];
const statusStyle = {
  open: { color: "#C8FF4D", label: "Open" },
  busy: { color: "#FF5A5F", label: "In use" },
  held: { color: "#FFB547", label: "Held" },
};

export function BayTags() {
  return (
    <div className="flex h-full flex-col justify-center gap-4 p-6">
      <div className="grid grid-cols-3 gap-2">
        {bayStatus.map((s, i) => (
          <span
            key={i}
            className="flex items-center justify-between rounded-full border px-3 py-1.5"
            style={{ borderColor: `${statusStyle[s].color}55`, boxShadow: `inset 0 0 12px -6px ${statusStyle[s].color}` }}
          >
            <span className="font-night-mono text-[11px] text-night-flood">{String(i + 1).padStart(2, "0")}</span>
            <span
              className="size-2 rounded-full"
              style={{ backgroundColor: statusStyle[s].color, boxShadow: `0 0 8px ${statusStyle[s].color}` }}
            />
          </span>
        ))}
      </div>
      <div className="flex gap-4">
        {Object.values(statusStyle).map((s) => (
          <span key={s.label} className="flex items-center gap-1.5 font-night-mono text-[10px] text-night-mist">
            <span className="size-2 rounded-full" style={{ backgroundColor: s.color }} />
            {s.label}
          </span>
        ))}
      </div>
    </div>
  );
}

// Sample 7-iron session: offsets in yards from the target line (x) and pin (y).
const shotRand = seeded(11);
const shots = Array.from({ length: 22 }, () => {
  const u = shotRand() + shotRand() + shotRand() - 1.5;
  const v = shotRand() + shotRand() + shotRand() - 1.5;
  return { x: u * 14 + 3, y: v * 9 - 2 };
});

export function Dispersion() {
  const cx = 150;
  const cy = 110;
  const scale = 4;
  return (
    <div className="flex h-full flex-col p-5">
      <div className="flex items-baseline justify-between">
        <p className="font-night-display text-sm font-semibold text-night-flood">7-iron · 22 shots</p>
        <p className="font-night-mono text-[10px] text-night-mist">sample</p>
      </div>
      <svg viewBox="0 0 300 220" className="mt-2 block h-auto w-full">
        {[1, 2, 3].map((r) => (
          <ellipse
            key={r}
            cx={cx}
            cy={cy}
            rx={r * 10 * scale * 0.9}
            ry={r * 10 * scale * 0.55}
            fill="none"
            stroke="#26304A"
          />
        ))}
        <line x1={cx} y1="10" x2={cx} y2="210" stroke="#26304A" strokeDasharray="3 4" />
        <ellipse
          cx={cx + 3 * scale}
          cy={cy - 2 * scale}
          rx={14 * scale * 0.9}
          ry={9 * scale * 0.7}
          fill="#5CE1E6"
          fillOpacity="0.06"
          stroke="#5CE1E6"
          strokeDasharray="4 3"
        />
        {shots.map((s, i) => (
          <circle
            key={i}
            cx={(cx + s.x * scale).toFixed(1)}
            cy={(cy + s.y * scale).toFixed(1)}
            r="3.5"
            fill="#C8FF4D"
            style={{ filter: "drop-shadow(0 0 4px #C8FF4D)" }}
          />
        ))}
        <circle cx={cx} cy={cy} r="4" fill="#FF5A5F" />
        <text x={cx + 8} y={cy + 3} fill="#FF5A5F" fontSize="9" className="font-night-mono">
          PIN
        </text>
      </svg>
      <p className="mt-auto font-night-mono text-[10px] text-night-mist">
        Avg miss <span className="text-night-cyan">3 yd right, 2 short</span>
      </p>
    </div>
  );
}

export function Wristband() {
  return (
    <div className="flex h-full items-center justify-center p-6">
      <div className="relative w-full -rotate-3 overflow-hidden rounded-full bg-night-flood shadow-[0_0_40px_-8px_rgba(200,255,77,0.6)]">
        <div className="flex items-stretch">
          <div
            className="w-16 shrink-0"
            style={{
              background:
                "conic-gradient(from 90deg, #C8FF4D, #5CE1E6, #8B7CFF, #FF5A5F, #FFB547, #C8FF4D)",
            }}
          />
          <div className="flex-1 px-4 py-3">
            <p className="font-night-display text-xs font-black uppercase leading-tight text-night-ink">
              Late Bucket · Unlimited
            </p>
            <p className="font-night-mono text-[10px] text-night-ink/70">9 PM – 12 AM tonight</p>
          </div>
          <div
            className="w-14 shrink-0"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, #07090F 0 2px, transparent 2px 4px, #07090F 4px 5px, transparent 5px 8px)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export function Quote() {
  return (
    <div className="flex h-full flex-col justify-center p-7">
      <p className="font-night-display text-2xl font-bold uppercase leading-tight text-night-flood md:text-3xl">
        The city clocks out.
      </p>
      <p
        className="mt-1 font-night-serif text-4xl italic leading-tight text-night-lime md:text-5xl"
        style={{ textShadow: "0 0 24px rgba(200,255,77,0.45)" }}
      >
        The range lights up.
      </p>
    </div>
  );
}
