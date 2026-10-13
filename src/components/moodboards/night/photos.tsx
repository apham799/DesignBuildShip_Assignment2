// Found photographs from Wikimedia Commons, shown as glowing screens.
// Files live in public/moodboards/3; every photo carries its source and license.
import Image from "next/image";

type Photo = {
  src: string;
  alt: string;
  label: string;
  // Glow color picked up from the palette.
  glow: string;
  position?: string;
  author: string;
  license: string;
  sourceUrl: string;
};

const commons = "https://commons.wikimedia.org/wiki/File:";
const lime = "#C8FF4D";
const cyan = "#5CE1E6";
const amber = "#FFB547";
const coral = "#FF5A5F";
const violet = "#8B7CFF";

export const photos = {
  adler: {
    src: "/moodboards/3/adler-planetarium-snow-night.jpg",
    alt: "The Adler Planetarium's dome glowing teal at night in falling snow",
    label: "Adler Planetarium, snowfall",
    glow: cyan,
    author: "Tony Webster",
    license: "CC BY-SA 2.0",
    sourceUrl: `${commons}Snowy_Adler_Planetarium_at_Night,_Chicago_(3298841691).jpg`,
  },
  apollo8: {
    src: "/moodboards/3/apollo-8-msi.jpg",
    alt: "The Apollo 8 command module under violet light at the Museum of Science and Industry",
    label: "Apollo 8 · Museum of Science and Industry",
    glow: violet,
    author: "Tcnottwins",
    license: "CC BY-SA 4.0",
    sourceUrl: `${commons}Apollo_8_CM_MSI.jpg`,
  },
  starDome: {
    src: "/moodboards/3/planetarium-star-dome.jpg",
    alt: "Stars streaking across a planetarium dome above rows of seats",
    label: "Warp speed on the dome",
    glow: cyan,
    author: "ESO/P. Horálek",
    license: "CC BY 4.0",
    sourceUrl: `${commons}A_sky_full(dome)_of_stars_(upr_IMG_6301-CC).jpg`,
  },
  starTrails: {
    src: "/moodboards/3/iss-star-trails.jpg",
    alt: "Star trails and city lights streaking over Earth, photographed from the International Space Station",
    label: "Star trails from orbit",
    glow: amber,
    author: "NASA/Don Pettit",
    license: "Public domain",
    sourceUrl: `${commons}International_Space_Station_star_trails_-_JSC2012E039800.jpg`,
  },
  highScores: {
    src: "/moodboards/3/pinball-highest-scores.jpg",
    alt: "Orange dot-matrix pinball display reading Highest Scores",
    label: "High scores · Williams pinball",
    glow: amber,
    author: "ElHeineken",
    license: "CC BY 3.0",
    sourceUrl: `${commons}Pinball_Dot_Matrix_Display_-_Demolition_Man.JPG`,
  },
  shootAgain: {
    src: "/moodboards/3/addams-family-shoot-again.jpg",
    alt: "A glowing Shoot Again insert on The Addams Family pinball playfield",
    label: "Shoot again",
    glow: amber,
    author: "DocChewbacca",
    license: "CC BY-SA 2.0",
    sourceUrl: `${commons}Addams-Family-pinball-detail.jpg`,
  },
  arcade: {
    src: "/moodboards/3/retro-arcade.jpg",
    alt: "A long room of arcade cabinets and pinball machines under colored lights",
    label: "The arcade aisle",
    glow: coral,
    author: "Arcade Perfect",
    license: "CC BY 2.0",
    sourceUrl: `${commons}Retrovolt_Arcade_2017_-_Arcade_and_Pinball_Machines.jpg`,
  },
  backglass: {
    src: "/moodboards/3/world-cup-pinball-backglass.jpg",
    alt: "Lit backglass of Bally's 1994 World Cup Soccer pinball machine",
    label: "Backglass · Bally, 1994",
    glow: lime,
    position: "50% 35%",
    author: "Polylerus",
    license: "CC0",
    sourceUrl: `${commons}Striker_pinball_backglass_-Glen_Burnie_MD.jpg`,
  },
  rhythmArcade: {
    src: "/moodboards/3/neon-rhythm-arcade.jpg",
    alt: "A gold rhythm-game cabinet in a dark arcade washed in blue and violet light",
    label: "Blue-hour arcade",
    glow: violet,
    author: "Reconrabbit",
    license: "CC0",
    sourceUrl: `${commons}Gold_Cabinet_DDR_World_Danbury_R1.jpg`,
  },
  blacklightGolf: {
    src: "/moodboards/3/blacklight-mini-golf.jpg",
    alt: "A glow-in-the-dark mini golf hole with neon-painted walls under blacklight",
    label: "Blacklight putting",
    glow: lime,
    author: "Dennis G. Jarvis",
    license: "CC BY-SA 2.0",
    sourceUrl: `${commons}DSC00003_-_Wizard%27s_Golf_(37048470692).jpg`,
  },
  glowGolfer: {
    src: "/moodboards/3/glow-mini-golfer.jpg",
    alt: "A mini golfer lining up a putt on a glowing indoor course",
    label: "Glow course",
    glow: lime,
    position: "50% 60%",
    author: "TMBLover",
    license: "CC BY-SA 4.0",
    sourceUrl: `${commons}Monster_Mini_Golf_Glow_in_the_Dark_Golfer.jpg`,
  },
  spaceSim: {
    src: "/moodboards/3/space-force-golf-simulator.jpg",
    alt: "A Space Force service member swinging at a golf simulator screen",
    label: "Golf sim · U.S. Space Force",
    glow: violet,
    author: "U.S. Space Force / SrA Tiarra Sibley",
    license: "Public domain",
    sourceUrl: `${commons}Vandenberg%27s_Pacific_Coast_Center_Gaming_Room_Grand_Opening_(8884035).jpg`,
  },
  rangeDusk: {
    src: "/moodboards/3/range-netting-at-dusk.jpg",
    alt: "Tall driving-range netting and lights silhouetted against an orange dusk sky",
    label: "Range netting at dusk",
    glow: amber,
    author: "M.O. Stevens",
    license: "CC BY-SA 4.0",
    sourceUrl: `${commons}Topgolf_distance_-_Hillsboro,_Oregon.jpg`,
  },
  navyPier: {
    src: "/moodboards/3/navy-pier-night.jpg",
    alt: "Navy Pier's Ferris wheel and carnival rides lit up at night",
    label: "Navy Pier after dark",
    glow: coral,
    author: "NoTalentHack",
    license: "CC BY-SA 3.0",
    sourceUrl: `${commons}Navy_Pier,_Amusement_Park,_Night.JPG`,
  },
  river: {
    src: "/moodboards/3/chicago-river-night.jpg",
    alt: "Chicago's skyline reflected in the river at night",
    label: "The river, lit",
    glow: cyan,
    author: "Spatms",
    license: "CC BY-SA 4.0",
    sourceUrl: `${commons}Chicago_Skyline_on_the_Chicago_River_at_night.jpg`,
  },
} satisfies Record<string, Photo>;

export function FoundPhoto({ photo, tall = false }: { photo: Photo; tall?: boolean }) {
  return (
    <div className={`relative h-full w-full ${tall ? "min-h-96" : "min-h-64"}`}>
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes="(min-width: 768px) 560px, 100vw"
        className="object-cover"
        style={{ objectPosition: photo.position ?? "50% 50%" }}
      />
      {/* screen-glass sheen and a fade so the label stays readable */}
      <div className="absolute inset-0 bg-gradient-to-t from-night-ink/90 via-transparent to-white/5" />
      <div className="absolute inset-x-3 bottom-3 flex flex-wrap items-end justify-between gap-2">
        <span
          className="flex items-center gap-2 rounded-full bg-night-ink/70 px-3 py-1 font-night-display text-[11px] font-semibold text-night-flood backdrop-blur"
        >
          <span className="size-2 rounded-full" style={{ backgroundColor: photo.glow, boxShadow: `0 0 8px ${photo.glow}` }} />
          {photo.label}
        </span>
        <a
          href={photo.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-night-ink/60 px-2 py-0.5 font-night-mono text-[9px] text-night-mist backdrop-blur hover:text-night-lime"
        >
          {photo.author} · {photo.license} ↗
        </a>
      </div>
    </div>
  );
}
