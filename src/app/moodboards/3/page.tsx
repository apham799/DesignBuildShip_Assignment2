import type { Metadata } from "next";
import Link from "next/link";
import {
  BayTags,
  Dispersion,
  Forecast,
  Palette,
  Quote,
  TypeSpecimen,
  Wristband,
} from "@/components/moodboards/night/cards";
import { nightFonts } from "@/components/moodboards/night/fonts";
import { LaunchMonitor, LightsSwitch, SlotPicker } from "@/components/moodboards/night/interactive";
import { FoundPhoto, photos } from "@/components/moodboards/night/photos";
import {
  FloodlightBank,
  HazeTexture,
  NeonSign,
  SnowScene,
  TracerHero,
} from "@/components/moodboards/night/scenes";

export const metadata: Metadata = {
  title: "Mood Board 03 — Under the Lights",
};

const keywords = ["Space arcade", "Pinball glow", "Ball tracers", "High-score data", "Planetarium blue", "Glow & grain"];

// Full class names so Tailwind can see them.
const span = {
  2: "md:col-span-2",
  3: "md:col-span-3",
  4: "md:col-span-4",
} as const;

// Each row adds up to six columns.
const artifacts: { title: string; span: keyof typeof span; node: React.ReactNode }[] = [
  { title: "Tracers under the lights", span: 4, node: <TracerHero /> },
  { title: "Palette", span: 2, node: <Palette /> },
  { title: "Photo — Adler Planetarium", span: 3, node: <FoundPhoto photo={photos.adler} /> },
  { title: "Photo — Apollo 8 at MSI", span: 3, node: <FoundPhoto photo={photos.apollo8} /> },
  { title: "Launch monitor (hit a shot)", span: 3, node: <LaunchMonitor /> },
  { title: "Type specimen", span: 3, node: <TypeSpecimen /> },
  { title: "Photo — high scores", span: 2, node: <FoundPhoto photo={photos.highScores} /> },
  { title: "Photo — shoot again", span: 2, node: <FoundPhoto photo={photos.shootAgain} /> },
  { title: "Photo — pinball backglass", span: 2, node: <FoundPhoto photo={photos.backglass} /> },
  { title: "Neon sign", span: 2, node: <NeonSign /> },
  { title: "Snow in the light cone", span: 2, node: <SnowScene /> },
  { title: "Tonight's conditions", span: 2, node: <Forecast /> },
  { title: "Photo — stars on the dome", span: 4, node: <FoundPhoto photo={photos.starDome} /> },
  { title: "Photo — glow course", span: 2, node: <FoundPhoto photo={photos.glowGolfer} /> },
  { title: "Lights switch (flip it)", span: 4, node: <LightsSwitch /> },
  { title: "Bay status", span: 2, node: <BayTags /> },
  { title: "Photo — blacklight putting", span: 2, node: <FoundPhoto photo={photos.blacklightGolf} /> },
  { title: "Photo — golf sim, Space Force", span: 2, node: <FoundPhoto photo={photos.spaceSim} /> },
  { title: "Photo — blue-hour arcade", span: 2, node: <FoundPhoto photo={photos.rhythmArcade} /> },
  { title: "Manifesto", span: 2, node: <Quote /> },
  { title: "Shot dispersion", span: 2, node: <Dispersion /> },
  { title: "Texture — sodium haze", span: 2, node: <HazeTexture /> },
  { title: "Photo — the arcade aisle", span: 3, node: <FoundPhoto photo={photos.arcade} /> },
  { title: "Photo — star trails from orbit", span: 3, node: <FoundPhoto photo={photos.starTrails} /> },
  { title: "Bay booking (pick a time)", span: 2, node: <SlotPicker /> },
  { title: "Late-bucket wristband", span: 2, node: <Wristband /> },
  { title: "Floodlight bank", span: 2, node: <FloodlightBank /> },
  { title: "Photo — Navy Pier", span: 2, node: <FoundPhoto photo={photos.navyPier} /> },
  { title: "Photo — the river at night", span: 2, node: <FoundPhoto photo={photos.river} /> },
  { title: "Photo — range netting at dusk", span: 2, node: <FoundPhoto photo={photos.rangeDusk} /> },
];

export default function NightMoodBoard() {
  return (
    <div
      className={`${nightFonts} flex-1 bg-night-ink font-night-display text-night-flood`}
      style={{
        background:
          "radial-gradient(70% 40% at 15% 0%, rgba(255,181,71,0.12), transparent 70%), radial-gradient(60% 40% at 90% 10%, rgba(92,225,230,0.10), transparent 70%), #07090F",
      }}
    >
      <div className="mx-auto max-w-6xl px-6 py-10">
        <Link
          href="/"
          className="font-night-mono text-xs uppercase tracking-wider text-night-mist hover:text-night-lime"
        >
          ← Back to gallery
        </Link>

        <header className="mt-10 grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-end">
          <div>
            <p className="font-night-mono text-xs uppercase tracking-[0.3em] text-night-amber">Mood Board 03</p>
            <h1 className="mt-3 text-6xl font-black uppercase leading-[0.9] md:text-7xl">
              Under the
              <br />
              <span className="text-night-lime" style={{ textShadow: "0 0 32px rgba(200,255,77,0.45)" }}>
                Lights
              </span>
            </h1>
          </div>
          <div className="flex flex-col gap-4">
            <p className="font-night-serif text-xl leading-snug text-night-mist">
              Practice as a space arcade. Ball tracers streak like shooting stars,
              launch-monitor numbers read like a high-score screen, and putting
              glows under blacklight, with a nod to Chicago&rsquo;s pinball makers
              and its planetarium. Electric, playful, and a little cosmic.
            </p>
            <ul className="flex flex-wrap gap-1.5">
              {keywords.map((k) => (
                <li
                  key={k}
                  className="rounded-full border border-night-line px-3 py-1 font-night-mono text-[10px] uppercase tracking-wider text-night-flood"
                >
                  {k}
                </li>
              ))}
            </ul>
            <p className="font-night-mono text-xs text-night-mist">Draft · {artifacts.length} of 25–30 artifacts</p>
          </div>
        </header>

        <section className="mt-12 grid grid-cols-1 gap-3 md:grid-cols-6">
          {artifacts.map((a, i) => (
            <figure
              key={a.title}
              className={`flex flex-col overflow-hidden rounded-3xl border border-night-line bg-night-panel ${span[a.span]}`}
            >
              <div className="flex-1">{a.node}</div>
              <figcaption className="flex items-center gap-2 border-t border-night-line px-4 py-2 font-night-mono text-[10px] uppercase tracking-wider text-night-mist">
                <span className="text-night-lime">{String(i + 1).padStart(2, "0")}</span>
                <span>{a.title}</span>
              </figcaption>
            </figure>
          ))}
        </section>
      </div>
    </div>
  );
}
