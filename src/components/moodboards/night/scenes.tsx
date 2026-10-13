// Atmosphere pieces: the lit range, neon, snow under the lights, floodlights, haze.
// Motion uses motion-safe: so it stops for people who prefer reduced motion.

// Small seeded generator so scattered details render the same on server and client.
export function seeded(seed: number) {
  let t = seed;
  return () => {
    t = (t + 0x6d2b79f5) | 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

const starRand = seeded(7);
const stars = Array.from({ length: 40 }, () => ({
  x: starRand() * 600,
  y: starRand() * 150,
  r: 0.4 + starRand() * 0.9,
}));

const skyline: [number, number, number][] = [
  [150, 196, 14], [166, 186, 10], [178, 200, 16], [196, 176, 12], [210, 190, 14],
  [226, 160, 10], [238, 182, 16], [256, 198, 12], [330, 192, 14], [346, 172, 12],
  [360, 150, 16], [378, 184, 12], [392, 194, 16], [410, 178, 10], [422, 196, 18],
];

export function TracerHero() {
  return (
    <div className="relative h-full overflow-hidden">
      <svg viewBox="0 0 600 300" className="block h-full w-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="night-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#07090F" />
            <stop offset="0.7" stopColor="#141B2E" />
            <stop offset="1" stopColor="#1C2440" />
          </linearGradient>
          <linearGradient id="night-turf" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0F3325" />
            <stop offset="1" stopColor="#1E6B4A" />
          </linearGradient>
          <linearGradient id="night-cone" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#F4F1E8" stopOpacity="0.35" />
            <stop offset="1" stopColor="#F4F1E8" stopOpacity="0" />
          </linearGradient>
          <filter id="night-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <rect width="600" height="300" fill="url(#night-sky)" />
        {stars.map((s, i) => (
          <circle key={i} cx={s.x.toFixed(1)} cy={s.y.toFixed(1)} r={s.r.toFixed(2)} fill="#F4F1E8" opacity="0.6" />
        ))}
        {/* distant skyline with sodium-lit windows */}
        <g fill="#0B1020">
          {skyline.map(([x, y, w]) => (
            <rect key={x} x={x} y={y} width={w} height={216 - y} />
          ))}
        </g>
        <g fill="#FFB547" opacity="0.8">
          {skyline.map(([x, y]) => (
            <rect key={x} x={x + 4} y={y + 8} width="1.6" height="1.6" />
          ))}
        </g>
        {/* the field */}
        <polygon points="0,300 600,300 470,214 130,214" fill="url(#night-turf)" />
        <g stroke="#F4F1E8" strokeOpacity="0.12">
          <line x1="96" y1="236" x2="504" y2="236" />
          <line x1="56" y1="262" x2="544" y2="262" />
        </g>
        <g fill="none" filter="url(#night-glow)">
          <ellipse cx="250" cy="226" rx="26" ry="5" stroke="#5CE1E6" strokeWidth="1.5" />
          <ellipse cx="420" cy="222" rx="18" ry="3.5" stroke="#FF5A5F" strokeWidth="1.5" />
          <ellipse cx="330" cy="248" rx="34" ry="7" stroke="#FFB547" strokeWidth="1.5" />
        </g>
        {/* floodlight cones and poles */}
        <polygon points="58,58 0,300 250,300" fill="url(#night-cone)" />
        <polygon points="542,58 350,300 600,300" fill="url(#night-cone)" />
        {[58, 542].map((x) => (
          <g key={x}>
            <line x1={x} y1="62" x2={x} y2="300" stroke="#26304A" strokeWidth="3" />
            <rect x={x - 16} y="48" width="32" height="12" rx="2" fill="#F4F1E8" filter="url(#night-glow)" />
          </g>
        ))}
        {/* ball tracers */}
        <g fill="none" strokeLinecap="round" filter="url(#night-glow)">
          <path
            d="M300 296 C 318 120, 398 58, 424 222"
            pathLength="1"
            strokeDasharray="1"
            stroke="#C8FF4D"
            strokeWidth="2.5"
            className="motion-safe:animate-tracer"
          />
          <path
            d="M296 296 C 280 150, 236 110, 250 226"
            pathLength="1"
            strokeDasharray="1"
            stroke="#FFB547"
            strokeWidth="2"
            className="motion-safe:animate-tracer [animation-delay:1.4s]"
          />
        </g>
      </svg>
      <div className="absolute right-4 top-4 rounded-full border border-night-lime/40 bg-night-ink/60 px-3 py-1 font-night-mono text-[11px] text-night-lime backdrop-blur">
        CARRY 238 · APEX 31 YD
      </div>
    </div>
  );
}

export function NeonSign() {
  return (
    <div
      className="flex h-full min-h-64 flex-col items-center justify-center gap-3 p-6"
      style={{
        backgroundColor: "#1A1216",
        backgroundImage:
          "repeating-linear-gradient(0deg, rgba(0,0,0,0.35) 0 2px, transparent 2px 22px), repeating-linear-gradient(90deg, rgba(0,0,0,0.25) 0 2px, transparent 2px 46px)",
      }}
    >
      <p
        className="font-night-display text-4xl font-bold uppercase tracking-wider text-[#FFD7D8]"
        style={{ textShadow: "0 0 4px #FF5A5F, 0 0 12px #FF5A5F, 0 0 28px #FF5A5F" }}
      >
        Open L<span className="motion-safe:animate-flicker">a</span>te
      </p>
      <p
        className="font-night-serif text-2xl italic text-[#D9FBFC]"
        style={{ textShadow: "0 0 4px #5CE1E6, 0 0 14px #5CE1E6" }}
      >
        heated bays inside
      </p>
    </div>
  );
}

const snowRand = seeded(42);
const flakes = Array.from({ length: 46 }, () => ({
  left: snowRand() * 100,
  size: 1.5 + snowRand() * 2.5,
  duration: 4 + snowRand() * 5,
  delay: -snowRand() * 9,
}));

export function SnowScene() {
  return (
    <div className="relative h-full min-h-64 overflow-hidden bg-night-ink">
      {/* light cone */}
      <div
        className="absolute inset-x-0 top-0 h-full"
        style={{
          background:
            "conic-gradient(from 160deg at 50% 0%, transparent 0deg, rgba(244,241,232,0.22) 20deg, rgba(244,241,232,0.22) 40deg, transparent 60deg)",
        }}
      />
      <div className="absolute left-1/2 top-0 h-3 w-16 -translate-x-1/2 rounded-b-md bg-night-flood shadow-[0_0_30px_8px_rgba(244,241,232,0.5)]" />
      {flakes.map((f, i) => (
        <span
          key={i}
          className="absolute top-0 rounded-full bg-night-flood motion-safe:animate-snow"
          style={{
            left: `${f.left.toFixed(1)}%`,
            width: f.size,
            height: f.size,
            animationDuration: `${f.duration.toFixed(2)}s`,
            animationDelay: `${f.delay.toFixed(2)}s`,
            opacity: f.left > 30 && f.left < 70 ? 0.95 : 0.35,
          }}
        />
      ))}
      {/* heated stall glow and snowbank */}
      <div className="absolute inset-x-6 bottom-8 h-14 rounded-t-xl bg-night-panel shadow-[0_-10px_40px_-6px_rgba(255,181,71,0.55)]">
        <div className="mx-auto mt-3 h-1.5 w-3/4 rounded-full bg-night-amber shadow-[0_0_16px_4px_rgba(255,181,71,0.7)]" />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-9 rounded-t-[50%] bg-[#DDE3EE]" />
      <p className="absolute bottom-2 left-4 font-night-mono text-[10px] text-night-ink">
        28°F · HEATERS ON · OPEN ALL WINTER
      </p>
    </div>
  );
}

export function FloodlightBank() {
  return (
    <div className="flex h-full items-center justify-center bg-night-ink p-6">
      <div className="rounded-xl border border-night-line bg-[#0B0F1A] p-3">
        <div className="grid grid-cols-5 gap-2">
          {Array.from({ length: 15 }, (_, i) => (
            <span
              key={i}
              className="size-9 rounded-full"
              style={{
                background: "radial-gradient(circle at 45% 40%, #FFFFFF 0 20%, #F4F1E8 35%, #C9C2A8 70%)",
                boxShadow: "0 0 18px 4px rgba(244,241,232,0.45)",
                opacity: i === 7 ? 0.25 : 1,
              }}
            />
          ))}
        </div>
        <p className="mt-3 text-center font-night-mono text-[10px] text-night-mist">BANK 3 · 1 BULB OUT</p>
      </div>
    </div>
  );
}

// Inline SVG noise for a film-grain overlay.
const grain =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")";

export function HazeTexture() {
  return (
    <div
      className="relative flex h-full min-h-64 items-end overflow-hidden p-4"
      style={{
        background:
          "radial-gradient(60% 50% at 25% 30%, rgba(255,181,71,0.85), transparent 70%), radial-gradient(55% 60% at 80% 75%, rgba(92,225,230,0.55), transparent 70%), radial-gradient(40% 40% at 70% 20%, rgba(255,90,95,0.45), transparent 70%), #0E1424",
      }}
    >
      <div className="absolute inset-0 mix-blend-overlay" style={{ backgroundImage: grain }} />
      <span className="relative rounded-full bg-night-ink/60 px-3 py-1 font-night-mono text-[10px] text-night-flood backdrop-blur">
        Sodium haze · film grain
      </span>
    </div>
  );
}
