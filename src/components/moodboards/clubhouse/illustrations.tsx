// Drawn artifacts: crest, range scenes, map, and iconography.

function starPoints(cx: number, cy: number, outer: number, inner: number, points = 6) {
  return Array.from({ length: points * 2 }, (_, i) => {
    const angle = (Math.PI / points) * i - Math.PI / 2;
    const radius = i % 2 === 0 ? outer : inner;
    return `${(cx + radius * Math.cos(angle)).toFixed(2)},${(cy + radius * Math.sin(angle)).toFixed(2)}`;
  }).join(" ");
}

export function Crest() {
  return (
    <div className="flex justify-center bg-club-page p-8">
      <svg viewBox="0 0 200 200" className="h-auto w-full max-w-60 drop-shadow-md">
        <defs>
          <path
            id="club-crest-arc"
            d="M 100,100 m -72,0 a 72,72 0 1,1 144,0 a 72,72 0 1,1 -144,0"
          />
        </defs>
        <circle cx="100" cy="100" r="97" fill="#1F4D3A" />
        <circle
          cx="100"
          cy="100"
          r="90"
          fill="none"
          stroke="#F3EBD8"
          strokeWidth="1.2"
          strokeDasharray="3 3"
        />
        <text className="font-club-sign" fontSize="12" fill="#F3EBD8" letterSpacing="2">
          <textPath href="#club-crest-arc" textLength="440" lengthAdjust="spacing">
            CHICAGO PUBLIC LINKS ★ PRACTICE SOCIETY ★
          </textPath>
        </text>
        <circle cx="100" cy="100" r="54" fill="#F3EBD8" />
        <circle cx="100" cy="100" r="50" fill="none" stroke="#B8893B" strokeWidth="1" />
        {/* crossed clubs */}
        <g stroke="#B8893B" strokeWidth="2.5" strokeLinecap="round">
          <line x1="74" y1="66" x2="124" y2="134" />
          <line x1="126" y1="66" x2="76" y2="134" />
        </g>
        <g fill="#B8893B">
          <rect x="118" y="130" width="14" height="6" rx="2" transform="rotate(-20 125 133)" />
          <rect x="68" y="130" width="14" height="6" rx="2" transform="rotate(20 75 133)" />
        </g>
        <polygon points={starPoints(100, 90, 24, 10)} fill="#B23A2E" />
        {/* ribbon banner across the clubs */}
        <path d="M60 120 H140 L136 127.5 L140 135 H60 L64 127.5 Z" fill="#1F4D3A" />
        <text
          x="100"
          y="130.5"
          textAnchor="middle"
          className="font-club-mono"
          fontSize="7.5"
          fill="#F3EBD8"
          letterSpacing="1"
        >
          EST · MCMXXII
        </text>
      </svg>
    </div>
  );
}

// Mowed bands from the horizon (y=70) down, widening to fake perspective.
const bandHeights = [6, 8, 11, 15, 20, 27, 43];
const turfBands = bandHeights.map((h, i) => ({
  y: 70 + bandHeights.slice(0, i).reduce((sum, n) => sum + n, 0),
  h,
  fill: i % 2 === 0 ? "#2F6B4F" : "#3A7A5B",
}));

export function DistanceMarkers() {
  const signs = [
    { yards: 250, x: 232, y: 74, scale: 0.45 },
    { yards: 200, x: 88, y: 84, scale: 0.6 },
    { yards: 150, x: 206, y: 104, scale: 0.8 },
    { yards: 100, x: 62, y: 132, scale: 1.1 },
  ];
  return (
    <svg viewBox="0 0 320 200" className="block h-auto w-full">
      <rect width="320" height="70" fill="#F3EBD8" />
      {/* tree line */}
      <path
        d="M0 70 Q10 58 20 66 Q30 54 42 64 Q54 52 66 63 Q80 55 92 64 Q104 50 118 62 Q130 56 142 65 Q156 52 170 63 Q184 55 196 64 Q210 50 224 62 Q238 56 250 65 Q264 52 278 63 Q292 56 304 64 Q314 58 320 66 L320 70 Z"
        fill="#16362A"
      />
      {turfBands.map((b) => (
        <rect key={b.y} x="0" y={b.y} width="320" height={b.h} fill={b.fill} />
      ))}
      {/* netting poles */}
      <g stroke="#2B2A28" strokeWidth="1.5">
        <line x1="6" y1="10" x2="6" y2="200" />
        <line x1="314" y1="10" x2="314" y2="200" />
      </g>
      {signs.map((s) => (
        <g key={s.yards} transform={`translate(${s.x} ${s.y}) scale(${s.scale})`}>
          <line x1="0" y1="20" x2="0" y2="46" stroke="#F3EBD8" strokeWidth="2.5" />
          <rect x="-22" y="0" width="44" height="22" fill="#F3EBD8" stroke="#1F4D3A" strokeWidth="1.5" />
          <text
            x="0"
            y="17"
            textAnchor="middle"
            className="font-club-sign"
            fontSize="17"
            fill="#1F4D3A"
          >
            {s.yards}
          </text>
          <line x1="18" y1="-20" x2="18" y2="0" stroke="#2B2A28" strokeWidth="1.5" />
          <path d="M18 -20 L32 -15 L18 -10 Z" fill="#B23A2E" />
        </g>
      ))}
    </svg>
  );
}

const buildings: [number, number, number, number][] = [
  [20, 128, 14, 22], [36, 118, 10, 32], [48, 124, 16, 26], [66, 100, 12, 50],
  [80, 112, 12, 38], [118, 120, 12, 30], [132, 108, 10, 42], [144, 96, 14, 54],
  [198, 114, 12, 36], [212, 104, 10, 46], [224, 120, 16, 30], [242, 110, 10, 40],
  [254, 126, 14, 24], [270, 118, 10, 32], [282, 130, 18, 20],
];

const litWindows: [number, number][] = [
  [69, 108], [72, 120], [84, 118], [135, 114], [148, 104], [152, 120],
  [176, 72], [180, 90], [170, 110], [186, 104], [215, 112], [245, 118], [227, 128],
];

export function DuskSkyline() {
  return (
    <svg viewBox="0 0 320 200" className="block h-auto w-full">
      <defs>
        <linearGradient id="club-dusk-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3E6E8E" />
          <stop offset="0.55" stopColor="#C9A16A" />
          <stop offset="1" stopColor="#F0D9AE" />
        </linearGradient>
        <radialGradient id="club-dusk-glow">
          <stop offset="0" stopColor="#FFF4D6" stopOpacity="0.9" />
          <stop offset="1" stopColor="#FFF4D6" stopOpacity="0" />
        </radialGradient>
        <pattern id="club-dusk-net" width="7" height="7" patternUnits="userSpaceOnUse">
          <path d="M0 0 L7 7 M7 0 L0 7" stroke="#16362A" strokeWidth="0.4" />
        </pattern>
      </defs>
      <rect width="320" height="150" fill="url(#club-dusk-sky)" />
      <circle cx="232" cy="140" r="22" fill="#F7E2B5" />
      <g fill="#16362A">
        {buildings.map(([x, y, w, h]) => (
          <rect key={`${x}-${y}`} x={x} y={y} width={w} height={h} />
        ))}
        {/* tapered tower with twin masts */}
        <polygon points="95,150 99,78 111,78 115,150" />
        {/* stepped tower with twin masts */}
        <polygon points="164,150 164,92 168,92 168,74 172,74 172,62 186,62 186,80 190,80 190,96 194,96 194,150" />
      </g>
      <g stroke="#16362A" strokeWidth="1.2">
        <line x1="102" y1="78" x2="102" y2="60" />
        <line x1="108" y1="78" x2="108" y2="62" />
        <line x1="175" y1="62" x2="175" y2="42" />
        <line x1="183" y1="62" x2="183" y2="46" />
      </g>
      <g fill="#E9C46A">
        {litWindows.map(([x, y]) => (
          <rect key={`${x}-${y}`} x={x} y={y} width="2" height="2" />
        ))}
      </g>
      {/* range netting in front of the skyline */}
      <rect x="0" y="30" width="320" height="120" fill="url(#club-dusk-net)" opacity="0.35" />
      {/* turf */}
      <rect y="150" width="320" height="50" fill="#1F4D3A" />
      <g fill="#2F6B4F">
        <polygon points="40,150 80,150 30,200 -20,200" />
        <polygon points="120,150 160,150 140,200 90,200" />
        <polygon points="200,150 240,150 250,200 200,200" />
        <polygon points="280,150 320,150 340,200 300,200" />
      </g>
      {/* light poles */}
      {[28, 292].map((x) => (
        <g key={x}>
          <circle cx={x} cy="44" r="26" fill="url(#club-dusk-glow)" />
          <line x1={x} y1="46" x2={x} y2="168" stroke="#2B2A28" strokeWidth="2" />
          <rect x={x - 9} y="38" width="18" height="7" fill="#2B2A28" />
          <rect x={x - 7} y="44" width="14" height="2" fill="#FFF4D6" />
        </g>
      ))}
    </svg>
  );
}

const pins = [
  { n: 1, x: 132, y: 62 },
  { n: 2, x: 140, y: 140 },
  { n: 3, x: 78, y: 196 },
  { n: 4, x: 152, y: 252 },
];

export function LakefrontMap() {
  const gridLines = Array.from({ length: 16 }, (_, i) => i * 20);
  return (
    <svg viewBox="0 0 240 300" className="block h-auto w-full bg-club-paper">
      <g stroke="#1F4D3A" strokeOpacity="0.14" strokeWidth="0.8">
        {gridLines.map((p) => (
          <line key={`v${p}`} x1={p} y1="0" x2={p} y2="300" />
        ))}
        {gridLines.map((p) => (
          <line key={`h${p}`} x1="0" y1={p} x2="240" y2={p} />
        ))}
      </g>
      {/* diagonal avenues */}
      <g stroke="#B8893B" strokeOpacity="0.55" strokeWidth="1.5">
        <line x1="20" y1="300" x2="130" y2="30" />
        <line x1="0" y1="120" x2="110" y2="10" />
      </g>
      {/* lakefront park strip */}
      <path
        d="M150 0 C 145 40, 160 70, 155 110 S 175 170, 170 210 S 190 270, 188 300"
        fill="none"
        stroke="#A7B98A"
        strokeWidth="14"
      />
      {/* lake */}
      <path
        d="M156 0 C 151 40, 166 70, 161 110 S 181 170, 176 210 S 196 270, 194 300 L240 300 L240 0 Z"
        fill="#3E6E8E"
      />
      <g stroke="#F3EBD8" strokeOpacity="0.25" fill="none">
        <path d="M190 40 q6 -3 12 0 t12 0" />
        <path d="M200 120 q6 -3 12 0 t12 0" />
        <path d="M196 230 q6 -3 12 0 t12 0" />
      </g>
      <text
        transform="translate(214 196) rotate(-82)"
        className="font-club-serif"
        fontStyle="italic"
        fontSize="15"
        fill="#F3EBD8"
        letterSpacing="3"
      >
        Lake Michigan
      </text>
      {pins.map((p) => (
        <g key={p.n} transform={`translate(${p.x} ${p.y})`}>
          <path
            d="M0 0 C -2 -4, -8 -8, -8 -14 A 8 8 0 1 1 8 -14 C 8 -8, 2 -4, 0 0 Z"
            fill="#B23A2E"
            stroke="#F3EBD8"
            strokeWidth="1"
          />
          <text
            y="-11"
            textAnchor="middle"
            className="font-club-sign"
            fontSize="9"
            fill="#F3EBD8"
          >
            {p.n}
          </text>
        </g>
      ))}
      {/* compass */}
      <g transform="translate(34 262)">
        <circle r="16" fill="#F8F2E4" stroke="#1F4D3A" strokeWidth="1" />
        <polygon points="0,-13 4,0 0,13 -4,0" fill="#1F4D3A" />
        <polygon points="0,-13 4,0 -4,0" fill="#B23A2E" />
        <text y="-19" textAnchor="middle" className="font-club-sign" fontSize="9" fill="#1F4D3A">
          N
        </text>
      </g>
    </svg>
  );
}

const icons: { label: string; paths: React.ReactNode }[] = [
  {
    label: "Driving Range",
    paths: (
      <>
        <path d="M5 24 Q15 4 26 21" strokeDasharray="2 2.5" />
        <circle cx="26.5" cy="22" r="1.6" />
        <line x1="3" y1="26" x2="29" y2="26" />
      </>
    ),
  },
  {
    label: "Putting Green",
    paths: (
      <>
        <ellipse cx="16" cy="24" rx="12" ry="4" />
        <ellipse cx="18" cy="24" rx="2" ry="0.8" fill="currentColor" />
        <line x1="18" y1="24" x2="18" y2="6" />
        <path d="M18 6 L26 9 L18 12 Z" fill="currentColor" />
      </>
    ),
  },
  {
    label: "Chipping Area",
    paths: (
      <>
        <line x1="5" y1="4" x2="14" y2="23" />
        <path d="M14 23 L21 24 L20 27 L13 26 Z" />
        <path d="M22 22 Q26 10 30 20" strokeDasharray="2 2" />
        <line x1="3" y1="28" x2="29" y2="28" />
      </>
    ),
  },
  {
    label: "Practice Bunker",
    paths: (
      <>
        <path d="M3 25 Q16 11 29 25 Z" />
        <circle cx="12" cy="21" r="0.6" fill="currentColor" />
        <circle cx="17" cy="19" r="0.6" fill="currentColor" />
        <circle cx="21" cy="22" r="0.6" fill="currentColor" />
        <circle cx="15" cy="23" r="0.6" fill="currentColor" />
      </>
    ),
  },
  {
    label: "Lit at Night",
    paths: (
      <>
        <line x1="16" y1="28" x2="16" y2="10" />
        <rect x="10" y="5" width="12" height="5" />
        <line x1="12" y1="13" x2="8" y2="20" strokeDasharray="1.5 2" />
        <line x1="20" y1="13" x2="24" y2="20" strokeDasharray="1.5 2" />
      </>
    ),
  },
  {
    label: "Heated Bays",
    paths: (
      <>
        <path d="M4 14 L16 6 L28 14" />
        <line x1="6" y1="13" x2="6" y2="28" />
        <line x1="26" y1="13" x2="26" y2="28" />
        <path d="M12 26 q2 -2 0 -4 q-2 -2 0 -4" />
        <path d="M16 26 q2 -2 0 -4 q-2 -2 0 -4" />
        <path d="M20 26 q2 -2 0 -4 q-2 -2 0 -4" />
      </>
    ),
  },
];

export function IconSet() {
  return (
    <div className="grid grid-cols-3 gap-px bg-club-green/20">
      {icons.map((icon) => (
        <div
          key={icon.label}
          className="flex flex-col items-center gap-2 bg-club-paper px-2 py-5 text-club-green"
        >
          <svg
            viewBox="0 0 32 32"
            className="size-10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {icon.paths}
          </svg>
          <span className="text-center font-club-sign text-[10px] uppercase tracking-[0.15em]">
            {icon.label}
          </span>
        </div>
      ))}
    </div>
  );
}
