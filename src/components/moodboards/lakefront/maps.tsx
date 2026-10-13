// Diagrams: the practice line map, the street grid, and lake wind.
import { Bullet, categories, stations } from "./data";

// Transit-map path built from vertical runs and 45° jogs, north to south.
const linePath = "M190 16 V110 L230 150 V250 L270 290 V392";
const lakePath = "M250 0 V110 L290 150 V250 L330 290 V400 H480 V0 Z";
const stationPoints = [
  [190, 28], [190, 64], [190, 100], [230, 172], [230, 206],
  [230, 240], [270, 312], [270, 348], [270, 384],
];

export function LineMap() {
  return (
    <div className="flex h-full flex-col">
      <svg viewBox="0 0 480 400" className="block h-auto w-full">
        <path d={lakePath} className="fill-line-lake" />
        <text
          transform="translate(410 200) rotate(90)"
          textAnchor="middle"
          className="fill-line-blue font-line-sans"
          fontSize="13"
          fontWeight="700"
          letterSpacing="6"
        >
          LAKE MICHIGAN
        </text>
        {/* Madison St, the 0 N/S baseline */}
        <line x1="0" y1="223" x2="480" y2="223" className="stroke-line-ink" strokeWidth="0.75" strokeDasharray="3 3" />
        <text x="4" y="218" className="fill-line-ink font-line-mono" fontSize="7">
          MADISON · 0 N/S
        </text>
        <path d={linePath} fill="none" className="stroke-line-ink" strokeWidth="7" strokeLinejoin="round" />
        {stations.map((s, i) => {
          const [x, y] = stationPoints[i];
          return (
            <g key={s.name}>
              <circle cx={x} cy={y} r="6" className="fill-line-paper stroke-line-ink" strokeWidth="2.5" />
              {s.kinds.map((k, j) => (
                <rect key={k} x={x + 12 + j * 9} y={y - 3.5} width="7" height="7" fill={categories[k].color} />
              ))}
              <text x={x - 12} y={y - 1} textAnchor="end" className="fill-line-ink font-line-sans" fontSize="9.5" fontWeight="700">
                {s.name}
              </text>
              <text x={x - 12} y={y + 8} textAnchor="end" className="fill-line-steel font-line-mono" fontSize="6.5">
                {s.grid}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="mt-auto flex flex-wrap gap-x-4 gap-y-1 border-t border-line-ink px-4 py-3">
        {(Object.keys(categories) as (keyof typeof categories)[]).map((k) => (
          <span key={k} className="flex items-center gap-1.5 font-line-sans text-[11px] font-semibold">
            <Bullet kind={k} />
            {categories[k].label}
          </span>
        ))}
        <span className="ml-auto font-line-mono text-[9px] text-line-steel">Sample data</span>
      </div>
    </div>
  );
}

// 1 mile = 800 address numbers = 40px. Origin is State & Madison.
const ox = 150;
const oy = 200;
const mile = 40;

export function GridDiagram() {
  const north = [1, 2, 3, 4];
  const west = [1, 2, 3];
  const fx = ox - (600 / 800) * mile;
  const fy = oy - (2800 / 800) * mile;
  return (
    <div className="flex h-full flex-col p-4">
      <p className="font-line-sans text-lg font-bold leading-tight tracking-tight">
        Every address is a coordinate.
      </p>
      <svg viewBox="0 0 240 230" className="mt-3 block h-auto w-full">
        <path d="M176 0 L168 70 L174 140 L182 210 H240 V0 Z" className="fill-line-lake" />
        {north.map((m) => (
          <g key={`n${m}`}>
            <line x1="20" y1={oy - m * mile} x2="176" y2={oy - m * mile} className="stroke-line-ink/15" strokeWidth="0.75" />
            <text x={ox + 4} y={oy - m * mile - 2} className="fill-line-steel font-line-mono" fontSize="6">
              {m * 800} N
            </text>
          </g>
        ))}
        {west.map((m) => (
          <g key={`w${m}`}>
            <line x1={ox - m * mile} y1="0" x2={ox - m * mile} y2={oy} className="stroke-line-ink/15" strokeWidth="0.75" />
            <text x={ox - m * mile + 2} y={oy + 9} className="fill-line-steel font-line-mono" fontSize="6">
              {m * 800} W
            </text>
          </g>
        ))}
        <line x1={ox} y1="0" x2={ox} y2={oy + 14} className="stroke-line-ink" strokeWidth="1.5" />
        <line x1="10" y1={oy} x2="176" y2={oy} className="stroke-line-ink" strokeWidth="1.5" />
        <text x={ox + 4} y={oy + 20} className="fill-line-ink font-line-mono" fontSize="6.5" fontWeight="600">
          STATE · 0 E/W
        </text>
        <text x="12" y={oy - 4} className="fill-line-ink font-line-mono" fontSize="6.5" fontWeight="600">
          MADISON · 0 N/S
        </text>
        <g className="stroke-line-green" strokeWidth="1" strokeDasharray="2 2">
          <line x1={fx} y1={fy} x2={ox} y2={fy} />
          <line x1={fx} y1={fy} x2={fx} y2={oy} />
        </g>
        <rect x={fx - 5} y={fy - 5} width="10" height="10" className="fill-line-green" />
        <text x={fx - 8} y={fy - 9} textAnchor="end" className="fill-line-ink font-line-sans" fontSize="8" fontWeight="700">
          Range at 2800 N · 600 W
        </text>
      </svg>
      <p className="mt-auto pt-2 font-line-mono text-[10px] text-line-steel">
        800 address numbers = 1 mile
      </p>
    </div>
  );
}

// Share of breezy afternoons by direction (sample), N first, clockwise.
const windShare = [5, 7, 12, 14, 9, 5, 4, 4, 6, 7, 6, 5, 4, 3, 3, 4];
const compass = ["N", "E", "S", "W"];

export function WindRose() {
  const cx = 110;
  const cy = 110;
  return (
    <div className="flex h-full flex-col p-4">
      <div className="flex items-baseline justify-between">
        <p className="font-line-sans text-lg font-bold tracking-tight">Lake wind</p>
        <p className="font-line-mono text-[10px] text-line-steel">May–Sep · sample</p>
      </div>
      <svg viewBox="0 0 220 220" className="mx-auto mt-2 block h-auto w-full max-w-64">
        {[30, 60, 90].map((r) => (
          <circle key={r} cx={cx} cy={cy} r={r} fill="none" className="stroke-line-ink/15" />
        ))}
        {windShare.map((v, i) => {
          const a = (i * 22.5 - 90) * (Math.PI / 180);
          const r0 = 12;
          const r1 = r0 + v * 6;
          const fromLake = i >= 2 && i <= 4;
          return (
            <line
              key={i}
              x1={(cx + r0 * Math.cos(a)).toFixed(2)}
              y1={(cy + r0 * Math.sin(a)).toFixed(2)}
              x2={(cx + r1 * Math.cos(a)).toFixed(2)}
              y2={(cy + r1 * Math.sin(a)).toFixed(2)}
              strokeWidth="9"
              className={fromLake ? "stroke-line-blue" : "stroke-line-concrete"}
            />
          );
        })}
        {compass.map((d, i) => {
          const a = (i * 90 - 90) * (Math.PI / 180);
          return (
            <text
              key={d}
              x={(cx + 102 * Math.cos(a)).toFixed(2)}
              y={(cy + 102 * Math.sin(a) + 3).toFixed(2)}
              textAnchor="middle"
              className="fill-line-ink font-line-mono"
              fontSize="8"
              fontWeight="600"
            >
              {d}
            </text>
          );
        })}
      </svg>
      <p className="mt-auto font-line-sans text-xs">
        <span className="mr-1.5 inline-block size-2 bg-line-blue" />
        Off the lake: plays one club longer into it.
      </p>
    </div>
  );
}
