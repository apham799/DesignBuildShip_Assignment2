// Paper goods and printed matter: palette chips, type specimen, cards, tickets, signage.

const swatches = [
  { name: "Fairway", hex: "#1F4D3A", role: "Primary", dark: true },
  { name: "Scorecard", hex: "#F3EBD8", role: "Paper", dark: false },
  { name: "Flagstick", hex: "#B23A2E", role: "Accent", dark: true },
  { name: "Brass Tee", hex: "#B8893B", role: "Detail", dark: true },
  { name: "Lake Michigan", hex: "#3E6E8E", role: "Water", dark: true },
  { name: "Bunker", hex: "#D9C49A", role: "Neutral", dark: false },
  { name: "Graphite", hex: "#2B2A28", role: "Ink", dark: true },
];

export function Palette() {
  const [hero, ...rest] = swatches;
  return (
    <div className="bg-club-paper p-3">
      <div
        className="flex h-36 flex-col justify-between p-4 text-club-cream"
        style={{ backgroundColor: hero.hex }}
      >
        <span className="font-club-sign text-xs uppercase tracking-[0.3em]">
          {hero.role}
        </span>
        <div className="flex items-end justify-between">
          <span className="font-club-serif text-3xl">{hero.name}</span>
          <span className="font-club-mono text-xs">{hero.hex}</span>
        </div>
      </div>
      {rest.map((s) => (
        <div
          key={s.hex}
          className={`flex h-11 items-center justify-between px-4 ${
            s.dark ? "text-club-cream" : "text-club-ink"
          }`}
          style={{ backgroundColor: s.hex }}
        >
          <span className="font-club-serif text-lg">{s.name}</span>
          <span className="font-club-mono text-xs opacity-80">
            {s.role} · {s.hex}
          </span>
        </div>
      ))}
    </div>
  );
}

export function TypeSpecimen() {
  return (
    <div className="space-y-5 bg-club-paper p-6 text-club-ink">
      <div className="flex items-end justify-between border-b border-club-green/30 pb-3">
        <span className="font-club-serif text-8xl leading-none text-club-green">
          Aa
        </span>
        <span className="text-right font-club-mono text-[11px] leading-snug text-club-ink/70">
          Fraunces
          <br />
          Display serif
          <br />
          soft optical sizes
        </span>
      </div>
      <p className="font-club-serif text-3xl leading-tight">
        Where Chicago <em className="text-club-red">practices</em> before it
        plays.
      </p>
      <div>
        <p className="font-club-sign text-lg uppercase tracking-[0.18em] text-club-green">
          Range Open · 6 am – 10 pm
        </p>
        <p className="font-club-mono text-[11px] text-club-ink/60">
          Oswald — signage, labels, wayfinding
        </p>
      </div>
      <div>
        <p className="font-club-mono text-sm">Bay 14 · Large bucket · 90 balls</p>
        <p className="font-club-mono text-[11px] text-club-ink/60">
          Courier Prime — tickets, data, yardages
        </p>
      </div>
      <div>
        <p className="font-club-hand text-3xl text-club-lake">
          keep the tempo, hold the finish
        </p>
        <p className="font-club-mono text-[11px] text-club-ink/60">
          Caveat — pencil notes in the margins
        </p>
      </div>
    </div>
  );
}

const sessionRows = [
  { club: "PW", target: 100, balls: 10, made: 7, note: "crisp" },
  { club: "9i", target: 125, balls: 10, made: 6, note: "" },
  { club: "7i", target: 150, balls: 15, made: 9, note: "tempo!" },
  { club: "5i", target: 175, balls: 10, made: 4, note: "" },
  { club: "3W", target: 210, balls: 10, made: 5, note: "tee it low" },
  { club: "DR", target: 240, balls: 15, made: 8, note: "hold finish" },
];

export function SessionCard() {
  const totalBalls = sessionRows.reduce((sum, r) => sum + r.balls, 0);
  const totalMade = sessionRows.reduce((sum, r) => sum + r.made, 0);
  return (
    <div className="bg-club-paper p-5 text-club-ink">
      <div className="mb-3 flex items-baseline justify-between">
        <h3 className="font-club-sign text-sm uppercase tracking-[0.25em] text-club-green">
          Range Session Card
        </h3>
        <span className="font-club-mono text-[11px]">No. 0418</span>
      </div>
      <table className="w-full border-collapse font-club-mono text-xs">
        <thead>
          <tr className="bg-club-green text-club-cream">
            {["Club", "Target", "Balls", "On Line", "Notes"].map((h) => (
              <th
                key={h}
                className="border border-club-green px-2 py-1 text-left font-normal uppercase tracking-wider"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sessionRows.map((r) => (
            <tr key={r.club}>
              <td className="border border-club-green/40 px-2 py-1 font-bold">
                {r.club}
              </td>
              <td className="border border-club-green/40 px-2 py-1">
                {r.target}
                <span className="text-club-ink/50">y</span>
              </td>
              <td className="border border-club-green/40 px-2 py-1">{r.balls}</td>
              <td className="border border-club-green/40 px-2 py-0 font-club-hand text-xl leading-none text-club-lake">
                {r.made >= r.balls * 0.7 ? (
                  <span className="inline-block rounded-full border border-club-red px-1.5 text-club-red">
                    {r.made}
                  </span>
                ) : (
                  r.made
                )}
              </td>
              <td className="border border-club-green/40 px-2 py-0 font-club-hand text-lg leading-none text-club-lake">
                {r.note}
              </td>
            </tr>
          ))}
          <tr className="bg-club-sand/40 font-bold">
            <td className="border border-club-green/40 px-2 py-1" colSpan={2}>
              TOTAL
            </td>
            <td className="border border-club-green/40 px-2 py-1">{totalBalls}</td>
            <td className="border border-club-green/40 px-2 py-1">{totalMade}</td>
            <td className="border border-club-green/40 px-2 py-1" />
          </tr>
        </tbody>
      </table>
      <p className="mt-3 font-club-mono text-[10px] uppercase tracking-wider text-club-ink/60">
        Attest ________________ &nbsp; Wind ____ &nbsp; Date __ / __
      </p>
    </div>
  );
}

export function BucketTicket() {
  return (
    <div className="bg-club-page p-5">
      <div className="relative flex -rotate-2 bg-club-sand text-club-red shadow-md">
        {/* stub */}
        <div className="flex w-20 flex-col items-center justify-center gap-1 border-r-2 border-dashed border-club-red/50 px-2 py-4">
          <span className="font-club-sign text-[10px] uppercase tracking-widest">
            Bay
          </span>
          <span className="font-club-sign text-4xl leading-none">14</span>
          <span className="font-club-mono text-[9px]">004127</span>
        </div>
        {/* body */}
        <div className="flex-1 px-4 py-3">
          <p className="font-club-sign text-[10px] uppercase tracking-[0.35em]">
            Admit One Bucket
          </p>
          <p className="font-club-serif text-2xl leading-tight">Large · 90 Balls</p>
          <div className="mt-2 flex items-center justify-between border-t border-club-red/40 pt-2 font-club-mono text-[10px] uppercase">
            <span>Good day of issue</span>
            <span>No. 004127</span>
          </div>
        </div>
        {/* punched notches on the perforation */}
        <span className="absolute -top-2 left-[74px] size-4 rounded-full bg-club-page" />
        <span className="absolute -bottom-2 left-[74px] size-4 rounded-full bg-club-page" />
      </div>
    </div>
  );
}

export function YardageBook() {
  return (
    <div className="bg-club-paper p-5 text-club-ink">
      <div className="mb-2 flex items-baseline justify-between border-b border-club-ink/20 pb-2">
        <span className="font-club-serif text-2xl">Hole 7</span>
        <span className="font-club-mono text-xs">PAR 4 · 382 YDS</span>
      </div>
      <svg viewBox="0 0 160 260" className="mx-auto h-auto w-full max-w-56">
        <defs>
          <pattern
            id="club-yb-rough"
            width="6"
            height="6"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <line x1="0" y1="0" x2="0" y2="6" stroke="#A7B98A" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="160" height="260" fill="url(#club-yb-rough)" opacity="0.6" />
        {/* fairway */}
        <path
          d="M70 240 C 60 200, 55 170, 70 140 C 85 110, 108 95, 108 70 L 130 70 C 130 100, 106 122, 94 145 C 82 170, 88 205, 94 240 Z"
          fill="#8FAE7E"
          stroke="#1F4D3A"
          strokeWidth="0.8"
        />
        {/* bunkers */}
        <ellipse cx="96" cy="58" rx="8" ry="5" fill="#E8D9B0" stroke="#B8893B" strokeWidth="0.6" />
        <ellipse
          cx="102"
          cy="160"
          rx="9"
          ry="4.5"
          fill="#E8D9B0"
          stroke="#B8893B"
          strokeWidth="0.6"
          transform="rotate(-25 102 160)"
        />
        {/* green + flag */}
        <ellipse cx="120" cy="48" rx="18" ry="13" fill="#4F7A5A" stroke="#1F4D3A" strokeWidth="0.8" />
        <line x1="122" y1="28" x2="122" y2="48" stroke="#2B2A28" strokeWidth="0.8" />
        <path d="M122 28 L131 31 L122 34 Z" fill="#B23A2E" />
        {/* tee */}
        <rect x="74" y="236" width="18" height="8" fill="#4F7A5A" stroke="#1F4D3A" strokeWidth="0.8" />
        {/* distance lines */}
        <g stroke="#2B2A28" strokeWidth="0.6" strokeDasharray="2 2">
          <line x1="60" y1="140" x2="100" y2="140" />
          <line x1="82" y1="104" x2="122" y2="104" />
        </g>
        <g className="font-club-mono" fontSize="7" fill="#2B2A28">
          <text x="104" y="142">150</text>
          <text x="126" y="106">100</text>
          <text x="96" y="232">382 ↑</text>
        </g>
        {/* pencil notes */}
        <g className="font-club-hand" fontSize="11" fill="#3E6E8E">
          <text x="8" y="70">aim L of trap</text>
          <text x="10" y="200">wind off</text>
          <text x="10" y="212">the lake →</text>
        </g>
      </svg>
    </div>
  );
}

export function PullQuote() {
  return (
    <blockquote className="bg-club-green px-7 py-10 text-club-cream">
      <span className="block font-club-serif text-6xl leading-none text-club-brass">
        &ldquo;
      </span>
      <p className="font-club-serif text-2xl italic leading-snug">
        Every good round in this city starts on a rubber mat, with a bucket of
        balls and a north wind off the lake.
      </p>
      <footer className="mt-5 font-club-sign text-xs uppercase tracking-[0.3em] text-club-sand">
        — Overheard at the tee line
      </footer>
    </blockquote>
  );
}

export function Chalkboard() {
  return (
    <div className="border-[10px] border-[#6B4A2B] bg-club-slate p-6 shadow-inner">
      <div
        className="space-y-1 text-club-cream"
        style={{
          textShadow: "0 0 1px rgba(243,235,216,0.6)",
        }}
      >
        <p className="font-club-hand text-3xl text-club-sand">Today on the Range</p>
        <div className="my-2 h-px bg-club-cream/30" />
        <p className="font-club-hand text-2xl">Grass tees — OPEN</p>
        <p className="font-club-hand text-2xl">Mats — back row only</p>
        <p className="font-club-hand text-2xl">
          Wind: <span className="text-club-sand">NE 12</span>, off the lake
        </p>
        <p className="font-club-hand text-2xl">Lights on at 7:15</p>
        <p className="pt-2 font-club-hand text-2xl text-[#E58A7F]">
          Ask about heated winter bays!
        </p>
      </div>
    </div>
  );
}
