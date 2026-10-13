import type { Metadata } from "next";
import Link from "next/link";
import {
  CarryChart,
  FacilityCard,
  HoursTimeline,
} from "@/components/moodboards/lakefront/charts";
import { lakefrontFonts } from "@/components/moodboards/lakefront/fonts";
import {
  DepartureBoard,
  PhoneList,
  RangePass,
} from "@/components/moodboards/lakefront/interactive";
import { GridDiagram, LineMap, WindRose } from "@/components/moodboards/lakefront/maps";
import { FoundPhoto, photos } from "@/components/moodboards/lakefront/photos";
import {
  Palette,
  Pictograms,
  Poster,
  StationSign,
  TypeSpecimen,
} from "@/components/moodboards/lakefront/signage";

export const metadata: Metadata = {
  title: "Mood Board 02 — Lakefront Line",
};

const keywords = [
  "Chicago modernism",
  "Transit wayfinding",
  "Swiss grid",
  "Signal color coding",
  "Glass & steel",
  "Data first",
];

// Full class names so Tailwind can see them.
const span = {
  2: "md:col-span-2",
  3: "md:col-span-3",
  4: "md:col-span-4",
  6: "md:col-span-6",
} as const;

// Each row adds up to six columns.
const artifacts: { title: string; span: keyof typeof span; node: React.ReactNode }[] = [
  { title: "The Practice Line", span: 4, node: <LineMap /> },
  { title: "Palette", span: 2, node: <Palette /> },
  { title: "Type specimen", span: 3, node: <TypeSpecimen /> },
  { title: "Platform sign", span: 3, node: <StationSign /> },
  { title: "Photo — Damen sign", span: 2, node: <FoundPhoto photo={photos.damenSign} /> },
  { title: "Photo — Halsted sign", span: 2, node: <FoundPhoto photo={photos.halstedSign} /> },
  { title: "Photo — Diversey street sign", span: 2, node: <FoundPhoto photo={photos.diverseySign} /> },
  { title: "Departure board (live, faked)", span: 4, node: <DepartureBoard /> },
  { title: "Range pass (tap it)", span: 2, node: <RangePass /> },
  { title: "Photo — the Loop L", span: 3, node: <FoundPhoto photo={photos.loopL} /> },
  { title: "Photo — platform edge", span: 3, node: <FoundPhoto photo={photos.damenPlatform} /> },
  { title: "Street grid", span: 2, node: <GridDiagram /> },
  { title: "Photo — the grid at night", span: 2, node: <FoundPhoto photo={photos.streetGrid} /> },
  { title: "Wind rose", span: 2, node: <WindRose /> },
  { title: "Photo — Calder's Flamingo", span: 2, node: <FoundPhoto photo={photos.flamingo} /> },
  { title: "Photo — Federal Center", span: 2, node: <FoundPhoto photo={photos.federalCenter} /> },
  { title: "Photo — IBM Building", span: 2, node: <FoundPhoto photo={photos.ibm} /> },
  { title: "Carry chart", span: 3, node: <CarryChart /> },
  { title: "Hours timeline", span: 3, node: <HoursTimeline /> },
  { title: "Photo — Crown Hall", span: 3, node: <FoundPhoto photo={photos.crownHall} /> },
  { title: "Photo — 880 Lake Shore Drive", span: 3, node: <FoundPhoto photo={photos.lakeShore880} /> },
  { title: "Poster", span: 2, node: <Poster /> },
  { title: "Facility card", span: 2, node: <FacilityCard /> },
  { title: "Mobile list (try the filters)", span: 2, node: <PhoneList /> },
  { title: "Photo — elevated range", span: 2, node: <FoundPhoto photo={photos.skyRange} /> },
  { title: "Photo — numbered bays", span: 2, node: <FoundPhoto photo={photos.numberedBays} /> },
  { title: "Photo — simulator bay", span: 2, node: <FoundPhoto photo={photos.simulator} /> },
  { title: "Photo — Lake Shore Drive", span: 4, node: <FoundPhoto photo={photos.lakeShoreDrive} wide /> },
  { title: "Pictograms", span: 2, node: <Pictograms /> },
];

export default function LakefrontMoodBoard() {
  return (
    <div
      className={`${lakefrontFonts} flex-1 bg-line-paper font-line-sans text-line-ink`}
      style={{
        backgroundImage:
          "linear-gradient(rgba(17,19,21,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(17,19,21,0.04) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    >
      <header className="bg-line-ink text-line-paper">
        <div className="flex h-2">
          {["bg-line-green", "bg-line-blue", "bg-line-purple", "bg-line-red", "bg-line-orange", "bg-line-yellow"].map(
            (c) => (
              <span key={c} className={`flex-1 ${c}`} />
            ),
          )}
        </div>
        <div className="mx-auto max-w-6xl px-6 pb-12 pt-8">
          <Link
            href="/"
            className="font-line-mono text-xs uppercase tracking-wider text-line-concrete hover:text-line-paper"
          >
            ← Back to gallery
          </Link>
          <div className="mt-10 grid gap-8 md:grid-cols-[1.5fr_1fr]">
            <div>
              <p className="font-line-mono text-xs uppercase tracking-[0.3em] text-line-yellow">
                Mood Board 02
              </p>
              <h1 className="mt-3 text-6xl font-black uppercase min-[400px]:text-7xl leading-[0.85] tracking-tighter [font-stretch:70%] md:text-8xl">
                Lakefront
                <br />
                Line
              </h1>
            </div>
            <div className="flex flex-col justify-end gap-5">
              <p className="text-lg leading-snug text-line-aluminum">
                Chicago&rsquo;s practice facilities drawn as a transit system. Every
                range is a stop, every type of practice has a signal color, and
                every place is found by its spot on the city&rsquo;s street grid.
                Clear, civic, and built for getting somewhere.
              </p>
              <ul className="flex flex-wrap gap-1.5">
                {keywords.map((k) => (
                  <li
                    key={k}
                    className="border border-line-paper/30 px-2 py-0.5 font-line-mono text-[10px] uppercase tracking-wider"
                  >
                    {k}
                  </li>
                ))}
              </ul>
              <p className="font-line-mono text-xs text-line-concrete">
                Draft · {artifacts.length} of 25–30 artifacts
              </p>
            </div>
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-6 py-10 md:grid-cols-6">
        {artifacts.map((a, i) => (
          <figure
            key={a.title}
            className={`flex flex-col border border-line-ink bg-line-paper ${span[a.span]}`}
          >
            <figcaption className="flex items-baseline gap-3 border-b border-line-ink px-3 py-1.5 font-line-mono text-[10px] uppercase tracking-wider">
              <span className="font-semibold">{String(i + 1).padStart(2, "0")}</span>
              <span>{a.title}</span>
            </figcaption>
            <div className="flex-1">{a.node}</div>
          </figure>
        ))}
      </section>
    </div>
  );
}
