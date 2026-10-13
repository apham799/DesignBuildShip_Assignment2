"use client";

// A hand-drawn style map of the lakefront. Pins are real buttons laid over the drawing,
// so they get hover, focus, pressed, and selected states like any other control.
import { statusBadge } from "@/components/design-systems/clubhouse";
import type { GuideFacility } from "./data";

const W = 320;
const H = 440;

// Shoreline from the North Shore down past the South Side, roughly to scale.
const shore = "M205 0 C 212 50, 226 100, 234 150 C 240 190, 236 205, 240 216 L 250 220 L 240 228 C 236 250, 242 280, 256 312 C 270 345, 284 390, 300 440";
const lake = `${shore} L ${W} ${H} L ${W} 0 Z`;

type Props = {
  facilities: GuideFacility[];
  all: GuideFacility[];
  selectedId: string | null;
  onSelect: (id: string) => void;
};

export function LakefrontMap({ facilities, all, selectedId, onSelect }: Props) {
  const shown = new Set(facilities.map((f) => f.id));
  return (
    <figure className="rounded border border-club-rule bg-club-surface">
      {/* pins are positioned against this box, which matches the drawing exactly */}
      <div className="relative">
        <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" aria-hidden>
          {/* street grid */}
          <g stroke="#1F4D3A" strokeOpacity="0.08">
            {Array.from({ length: 16 }, (_, i) => (
              <line key={`v${i}`} x1={i * 20} y1="0" x2={i * 20} y2={H} />
            ))}
            {Array.from({ length: 22 }, (_, i) => (
              <line key={`h${i}`} x1="0" y1={i * 20} x2={W} y2={i * 20} />
            ))}
          </g>
          {/* lakefront parks, then the lake */}
          <path d={shore} fill="none" stroke="#A7B98A" strokeWidth="12" />
          <path d={lake} fill="#3E6E8E" />
          <g stroke="#F3EBD8" strokeOpacity="0.25" fill="none">
            <path d="M268 80 q6 -3 12 0 t12 0" />
            <path d="M276 260 q6 -3 12 0 t12 0" />
            <path d="M290 380 q6 -3 12 0 t12 0" />
          </g>
          <text transform="translate(288 250) rotate(-84)" className="font-club-serif" fontStyle="italic" fontSize="15" fill="#F3EBD8" letterSpacing="3">
            Lake Michigan
          </text>
          {/* the Loop */}
          {/* label sits west of the box so it stays clear of the lakefront pins */}
          <g transform="translate(194 244)">
            <rect x="-8" y="-6" width="16" height="12" fill="none" stroke="#2B2A28" strokeWidth="1.5" />
            <text x="-13" y="3" textAnchor="end" className="font-club-sign" fontSize="8" letterSpacing="1.5" fill="#2B2A28">
              THE LOOP
            </text>
          </g>
          {/* region labels */}
          <g className="font-club-sign" fontSize="8" letterSpacing="2" fill="#5F5A50">
            <text x="96" y="24">NORTH SHORE</text>
            <text x="18" y="292">WEST SUBURBS</text>
            <text x="128" y="432">SOUTH SUBURBS</text>
          </g>
          {/* facilities hidden by the filters stay as faint dots for context */}
          {all
            .filter((f) => !shown.has(f.id))
            .map((f) => (
              <circle key={f.id} cx={f.map.x} cy={f.map.y} r="3" fill="#8A7D63" opacity="0.5" />
            ))}
          {/* compass */}
          <g transform="translate(32 400)">
            <circle r="14" fill="#F8F2E4" stroke="#2B2A28" strokeWidth="1" />
            <polygon points="0,-11 3.5,0 0,11 -3.5,0" fill="#2B2A28" />
            <polygon points="0,-11 3.5,0 -3.5,0" fill="#B23A2E" />
            <text y="-17" textAnchor="middle" className="font-club-sign" fontSize="8" fill="#2B2A28">
              N
            </text>
          </g>
        </svg>

        {facilities.map((f, i) => {
          const selected = f.id === selectedId;
          const side = f.map.x / W;
          const tagAlign = side < 0.35 ? "left-0" : side > 0.6 ? "right-0" : "left-1/2 -translate-x-1/2";
          const closed = f.status === "closed";
          return (
            <button
              key={f.id}
              type="button"
              aria-pressed={selected}
              aria-label={`${i + 1}. ${f.name}, ${statusBadge[f.status].label}`}
              onClick={() => onSelect(f.id)}
              className={[
                "group absolute grid size-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 font-club-sign text-sm transition-[transform,background-color,color] outline-none",
                "focus-visible:ring-2 focus-visible:ring-club-focus focus-visible:ring-offset-2 focus-visible:ring-offset-club-surface",
                "hover:scale-110 active:scale-95",
                selected
                  ? "z-20 scale-110 border-club-flag bg-club-flag text-club-surface shadow-md"
                  : closed
                    ? "z-10 border-dashed border-club-edge bg-club-surface text-club-muted hover:border-club-text hover:text-club-text"
                    : "z-10 border-club-text bg-club-surface text-club-text hover:bg-club-text hover:text-club-on-select",
              ].join(" ")}
              style={{ left: `${(f.map.x / W) * 100}%`, top: `${(f.map.y / H) * 100}%` }}
            >
              {i + 1}
              {/* name tag for the selected pin, and on hover or focus for the rest */}
              <span
                aria-hidden
                className={[
                  "pointer-events-none absolute bottom-full mb-2 whitespace-nowrap rounded-sm bg-club-text px-2 py-1 font-club-serif text-xs normal-case tracking-normal text-club-on-select shadow",
                  tagAlign,
                  selected ? "block" : "hidden group-hover:block group-focus-visible:block",
                ].join(" ")}
              >
                {f.name}
              </span>
            </button>
          );
        })}
      </div>
      <figcaption className="border-t border-club-rule px-3 py-2 font-club-mono text-[11px] text-club-muted">
        Pins match the numbered list · not to scale · sample listings
      </figcaption>
    </figure>
  );
}
