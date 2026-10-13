// Wayfinding and print: palette, type, platform sign, pictograms, poster.
import { Bullet, categories } from "./data";

const neutrals = [
  { name: "Signal White", hex: "#F2F2EE", dark: false },
  { name: "Aluminum", hex: "#D9DCDF", dark: false },
  { name: "Concrete", hex: "#9AA0A6", dark: false },
  { name: "Steel", hex: "#3B4046", dark: true },
  { name: "Ink", hex: "#111315", dark: true },
];

export function Palette() {
  return (
    <div className="flex h-full flex-col">
      <div className="grid flex-1 grid-cols-5">
        {neutrals.map((n) => (
          <div
            key={n.hex}
            className={`flex flex-col justify-end p-2 ${n.dark ? "text-line-paper" : "text-line-ink"}`}
            style={{ backgroundColor: n.hex }}
          >
            <span className="font-line-sans text-[11px] font-semibold leading-tight">{n.name}</span>
            <span className="font-line-mono text-[9px] opacity-70">{n.hex}</span>
          </div>
        ))}
      </div>
      <div className="divide-y divide-line-ink/10 border-t border-line-ink">
        {Object.entries(categories).map(([key, c]) => (
          <div key={key} className="flex items-center gap-3 px-3 py-2">
            <span className="h-3 w-10" style={{ backgroundColor: c.color }} />
            <span className="flex-1 font-line-sans text-sm font-semibold">{c.label}</span>
            <span className="font-line-mono text-[10px] text-line-steel">{c.color}</span>
          </div>
        ))}
        <div className="flex items-center gap-3 px-3 py-2">
          <span className="h-3 w-10 bg-line-yellow" />
          <span className="flex-1 font-line-sans text-sm font-semibold">Lit at Night</span>
          <span className="font-line-mono text-[10px] text-line-steel">#F9E300</span>
        </div>
      </div>
    </div>
  );
}

export function TypeSpecimen() {
  return (
    <div className="flex h-full flex-col justify-between gap-6 p-6">
      <div className="flex items-start justify-between">
        <span className="font-line-sans text-[120px] font-black leading-[0.8] tracking-tighter [font-stretch:75%]">
          Rr
        </span>
        <dl className="grid grid-cols-[auto_auto] gap-x-3 font-line-mono text-[10px] text-line-steel">
          <dt>Family</dt>
          <dd className="text-line-ink">Archivo</dd>
          <dt>Width</dt>
          <dd className="text-line-ink">62–125</dd>
          <dt>Data</dt>
          <dd className="text-line-ink">IBM Plex Mono</dd>
        </dl>
      </div>
      <div className="space-y-1">
        <p className="font-line-sans text-4xl font-black uppercase leading-none tracking-tight [font-stretch:62%]">
          Range Open Until 11 PM
        </p>
        <p className="font-line-sans text-2xl font-semibold leading-tight tracking-tight">
          Find a bay, catch a train, hit a bucket.
        </p>
        <p className="font-line-sans text-sm font-medium uppercase tracking-[0.25em] [font-stretch:125%]">
          Northbound · Lakefront
        </p>
      </div>
      <p className="border-t border-line-ink pt-2 font-line-mono text-xs">
        BAY 14 · TIER 2 · 3200 N 500 W · 07:42
      </p>
    </div>
  );
}

export function StationSign() {
  return (
    <div className="flex h-full flex-col justify-center bg-line-aluminum p-6">
      <div className="bg-line-ink text-line-paper">
        <div className="flex h-2">
          <span className="flex-1 bg-line-green" />
          <span className="flex-1 bg-line-purple" />
        </div>
        <div className="flex items-start gap-3 px-5 pb-5 pt-4">
          <div className="flex flex-col gap-1 pt-2">
            <Bullet kind="range" size={14} />
            <Bullet kind="sim" size={14} />
          </div>
          <div className="flex-1">
            <p className="font-line-sans text-4xl font-bold leading-none tracking-tight">
              Belmont Harbor Tee
            </p>
            <p className="mt-2 font-line-sans text-sm text-line-aluminum">
              Driving Range &amp; Simulators · Lit until 11 PM
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 border-t border-line-paper/20 font-line-sans text-sm font-semibold">
          <span className="px-5 py-3">← Lower Tier · Bays 1–30</span>
          <span className="border-l border-line-paper/20 px-5 py-3 text-right">
            Upper Tier · Bays 31–60 →
          </span>
        </div>
      </div>
    </div>
  );
}

const pictograms: { label: string; glyph: React.ReactNode }[] = [
  {
    label: "Range",
    glyph: (
      <>
        <path d="M5 19 Q12 2 20 15" fill="none" strokeDasharray="2 2" />
        <circle cx="20" cy="16" r="1.8" fill="currentColor" stroke="none" />
        <rect x="3" y="19" width="18" height="2" fill="currentColor" stroke="none" />
      </>
    ),
  },
  {
    label: "Putting",
    glyph: (
      <>
        <ellipse cx="12" cy="19" rx="8" ry="2.5" fill="currentColor" stroke="none" />
        <rect x="12" y="4" width="1.6" height="15" fill="currentColor" stroke="none" />
        <path d="M13.6 4 L20 7 L13.6 10 Z" fill="currentColor" stroke="none" />
      </>
    ),
  },
  {
    label: "Bunker",
    glyph: <path d="M2 20 Q12 6 22 20 Z" fill="currentColor" stroke="none" />,
  },
  {
    label: "Lights",
    glyph: (
      <>
        <rect x="6" y="3" width="12" height="5" fill="currentColor" stroke="none" />
        <rect x="11" y="8" width="2" height="13" fill="currentColor" stroke="none" />
        <path d="M8 10 L4 16 M16 10 L20 16" />
      </>
    ),
  },
  {
    label: "Heated",
    glyph: (
      <>
        <path d="M7 20 q3 -3 0 -6 q-3 -3 0 -6" fill="none" />
        <path d="M12 20 q3 -3 0 -6 q-3 -3 0 -6" fill="none" />
        <path d="M17 20 q3 -3 0 -6 q-3 -3 0 -6" fill="none" />
      </>
    ),
  },
  {
    label: "Simulator",
    glyph: (
      <>
        <rect x="3" y="4" width="18" height="12" fill="none" />
        <circle cx="12" cy="10" r="2" fill="currentColor" stroke="none" />
        <rect x="9" y="18" width="6" height="2" fill="currentColor" stroke="none" />
      </>
    ),
  },
  {
    label: "Parking",
    glyph: (
      <text x="12" y="18" textAnchor="middle" fontSize="16" fontWeight="800" fill="currentColor" stroke="none" className="font-line-sans">
        P
      </text>
    ),
  },
  {
    label: "Transit",
    glyph: (
      <>
        <rect x="6" y="3" width="12" height="14" rx="2" fill="currentColor" stroke="none" />
        <rect x="8" y="6" width="8" height="4" className="fill-line-ink" stroke="none" />
        <path d="M8 20 L10 17 M16 20 L14 17" />
      </>
    ),
  },
];

export function Pictograms() {
  return (
    <div className="grid h-full grid-cols-4 content-center gap-2 p-4">
      {pictograms.map((p) => (
        <div key={p.label} className="flex flex-col items-center gap-1.5">
          <div className="flex aspect-square w-full items-center justify-center bg-line-ink text-line-paper">
            <svg
              viewBox="0 0 24 24"
              className="size-3/5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="square"
            >
              {p.glyph}
            </svg>
          </div>
          <span className="font-line-mono text-[9px] uppercase">{p.label}</span>
        </div>
      ))}
    </div>
  );
}

export function Poster() {
  return (
    <div className="relative flex h-full min-h-96 flex-col justify-between overflow-hidden bg-line-paper p-5">
      <span className="absolute -right-16 -top-16 size-56 rounded-full bg-line-red" />
      <p className="relative font-line-mono text-[10px] uppercase leading-relaxed">
        City ranges
        <br />
        Open to everyone
        <br />
        No membership
      </p>
      <h3 className="relative font-line-sans text-[64px] font-black uppercase leading-[0.82] tracking-tighter [font-stretch:62%]">
        Practice
        <br />
        is
        <br />
        public.
      </h3>
      <div className="relative grid grid-cols-3 gap-2 border-t-4 border-line-ink pt-2 font-line-mono text-[10px]">
        <span>9 ranges</span>
        <span>5 lines</span>
        <span>1 lake</span>
      </div>
    </div>
  );
}
