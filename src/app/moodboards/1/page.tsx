import type { Metadata } from "next";
import Link from "next/link";
import { FacilityCard } from "@/components/moodboards/clubhouse/facility-card";
import { clubhouseFonts } from "@/components/moodboards/clubhouse/fonts";
import {
  Crest,
  DistanceMarkers,
  DuskSkyline,
  IconSet,
  LakefrontMap,
} from "@/components/moodboards/clubhouse/illustrations";
import {
  BucketTicket,
  Chalkboard,
  Palette,
  PullQuote,
  SessionCard,
  TypeSpecimen,
  YardageBook,
} from "@/components/moodboards/clubhouse/paper";
import { FoundPhoto, photos } from "@/components/moodboards/clubhouse/photos";
import { DimpleTexture, TurfTexture } from "@/components/moodboards/clubhouse/textures";

export const metadata: Metadata = {
  title: "Mood Board 01 — Clubhouse Almanac",
};

const keywords = [
  "Heritage public links",
  "Scorecard paper",
  "Pencil in the margins",
  "Brass & forest green",
  "Wind off the lake",
  "Range lights at dusk",
];

// Order is tuned for the three-column masonry flow.
const artifacts = [
  { title: "Palette", node: <Palette /> },
  { title: "Postcard — Jackson Park links", node: <FoundPhoto photo={photos.jacksonParkLinks} tilt={-1.5} /> },
  { title: "Crest / embroidered patch", node: <Crest /> },
  { title: "Photo — Warren Wood, Chicago Daily News", node: <FoundPhoto photo={photos.warrenWood} tilt={1} /> },
  { title: "Range session card", node: <SessionCard /> },
  { title: "Photo — Lincoln Park lakefront tee", node: <FoundPhoto photo={photos.wavelandLakefront} /> },
  { title: "Postcard — The Golf Girl, 1906", node: <FoundPhoto photo={photos.golfGirl} tilt={-1} /> },
  { title: "Type specimen", node: <TypeSpecimen /> },
  { title: "Postcard — Cook County practice field", node: <FoundPhoto photo={photos.emmonsCollins} tilt={1.5} /> },
  { title: "Photo — Lincoln Park at dusk", node: <FoundPhoto photo={photos.lincolnParkDusk} /> },
  { title: "Range at dusk", node: <DuskSkyline /> },
  { title: "Bucket ticket", node: <BucketTicket /> },
  { title: "Ad — golf clubs, 1940", node: <FoundPhoto photo={photos.clubsAd} /> },
  { title: "Yardage book page", node: <YardageBook /> },
  { title: "Photo — Smoot & Cummins, Chicago Daily News", node: <FoundPhoto photo={photos.smootCummins} tilt={-1} /> },
  { title: "Postcard — Cog Hill", node: <FoundPhoto photo={photos.cogHill} tilt={-1} /> },
  { title: "Texture — golf ball dimples", node: <DimpleTexture /> },
  { title: "Pull quote", node: <PullQuote /> },
  { title: "Photo — the range mat", node: <FoundPhoto photo={photos.rangeMat} /> },
  { title: "Lakefront map fragment", node: <LakefrontMap /> },
  { title: "Photo — three-tier range at night", node: <FoundPhoto photo={photos.rangeAtNight} /> },
  { title: "Distance markers", node: <DistanceMarkers /> },
  { title: "Photo — Waveland Field House", node: <FoundPhoto photo={photos.wavelandFieldHouse} /> },
  { title: "Amenity icons", node: <IconSet /> },
  { title: "Book plate — Chick Evans, 1921", node: <FoundPhoto photo={photos.chickEvans} tilt={-0.75} /> },
  { title: "Facility card (try the button)", node: <FacilityCard /> },
  { title: "Photo — covered practice bays", node: <FoundPhoto photo={photos.coveredBays} /> },
  { title: "Postcard — Jackson Park golf shelter", node: <FoundPhoto photo={photos.jacksonParkShelter} tilt={2} /> },
  { title: "Texture — cross-cut turf", node: <TurfTexture /> },
  { title: "Pro shop chalkboard", node: <Chalkboard /> },
];

export default function ClubhouseMoodBoard() {
  return (
    <div
      className={`${clubhouseFonts} flex-1 bg-club-page text-club-ink`}
      style={{
        backgroundImage:
          "radial-gradient(rgba(43,42,40,0.05) 1px, transparent 1px)",
        backgroundSize: "5px 5px",
      }}
    >
      <div className="mx-auto max-w-6xl px-6 py-10">
        <Link
          href="/"
          className="font-club-mono text-xs uppercase tracking-wider text-club-green hover:text-club-red"
        >
          ← Back to gallery
        </Link>

        <header className="mt-8 grid gap-8 border-b-2 border-club-green pb-10 md:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="font-club-sign text-sm uppercase tracking-[0.35em] text-club-red">
              Mood Board 01
            </p>
            <h1 className="mt-2 font-club-serif text-6xl leading-[0.95] text-club-green md:text-7xl">
              Clubhouse Almanac
            </h1>
            <p className="mt-5 max-w-xl font-club-serif text-lg leading-relaxed">
              Chicago&rsquo;s practice ranges, seen through the paper goods of
              old public golf: scorecards, bucket tickets, yardage books, and a
              chalkboard by the pro shop door. It feels warm, local, and a little
              worn in, like a guide written by a regular.
            </p>
          </div>
          <div className="flex flex-col justify-end gap-4">
            <ul className="flex flex-wrap gap-2">
              {keywords.map((k) => (
                <li
                  key={k}
                  className="border border-club-green/50 bg-club-paper px-3 py-1 font-club-sign text-xs uppercase tracking-wider text-club-green"
                >
                  {k}
                </li>
              ))}
            </ul>
            <p className="font-club-mono text-xs text-club-ink/60">
              Draft · {artifacts.length} of 25–30 artifacts
            </p>
          </div>
        </header>

        <section className="mt-10 columns-1 gap-6 sm:columns-2 lg:columns-3">
          {artifacts.map((a, i) => (
            <figure key={a.title} className="mb-6 break-inside-avoid">
              <div className="overflow-hidden shadow-[0_1px_2px_rgba(43,42,40,0.12),0_10px_24px_-14px_rgba(31,77,58,0.5)]">
                {a.node}
              </div>
              <figcaption className="mt-2 flex gap-2 font-club-mono text-[11px] uppercase tracking-wider text-club-ink/70">
                <span className="text-club-red">{String(i + 1).padStart(2, "0")}</span>
                <span>{a.title}</span>
              </figcaption>
            </figure>
          ))}
        </section>
      </div>
    </div>
  );
}
