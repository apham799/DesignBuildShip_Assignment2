// Found photographs from Wikimedia Commons, shown as wayfinding-style plates.
// Files live in public/moodboards/2; every photo carries its source and license.
import Image from "next/image";

type Photo = {
  src: string;
  alt: string;
  label: string;
  // Signal bar color: a CTA line color or a facility category color.
  line: string;
  // Architecture reads as black and white; signs and ranges stay in color.
  mono?: boolean;
  // Focal point for the crop.
  position?: string;
  author: string;
  license: string;
  sourceUrl: string;
};

const commons = "https://commons.wikimedia.org/wiki/File:";
const ink = "#111315";

export const photos = {
  damenSign: {
    src: "/moodboards/2/damen-blue-line-sign.jpg",
    alt: "Blue and white CTA station sign reading Damen, Blue Line",
    label: "Damen · Blue Line",
    line: "#00A1DE",
    author: "Daniel Schwen",
    license: "CC BY-SA 4.0",
    sourceUrl: `${commons}CTA_Damen_sign.jpg`,
  },
  halstedSign: {
    src: "/moodboards/2/halsted-orange-line-sign.jpg",
    alt: "Orange CTA sign for Halsted station on the Orange Line",
    label: "Halsted · Orange Line",
    line: "#F9461C",
    author: "AlphaBeta135",
    license: "CC BY 4.0",
    sourceUrl: `${commons}Halsted_station_(CTA_Orange_Line)_sign_-_Chicago,_IL_-_May_2026.jpg`,
  },
  diverseySign: {
    src: "/moodboards/2/diversey-pkwy-sign.jpg",
    alt: "Green Chicago street sign for W Diversey Pkwy against a white sky",
    label: "W Diversey Pkwy · 2800 N",
    line: "#009B3A",
    author: "Tony Webster",
    license: "CC BY-SA 3.0",
    sourceUrl: `${commons}W_Diversey_Pkwy_Chicago_Street_Sign_3089031468_o.jpg`,
  },
  loopL: {
    src: "/moodboards/2/loop-l-madison-wabash.jpg",
    alt: "An elevated CTA train curving through the Loop above Wabash Avenue",
    label: "The Loop · Madison & Wabash",
    line: "#62361B",
    author: "David Wilson",
    license: "CC BY 2.0",
    sourceUrl: `${commons}20130307_10_CTA_Loop_L_@_Madison_Wabash.jpg`,
  },
  damenPlatform: {
    src: "/moodboards/2/damen-l-platform.jpg",
    alt: "Elevated Damen L platform with a blue edge strip running toward the skyline",
    label: "Platform edge, Damen",
    line: "#00A1DE",
    author: "Eric Fischer",
    license: "CC BY 2.0",
    sourceUrl: `${commons}Damen_%22L%22_platform_(38345317576).jpg`,
  },
  streetGrid: {
    src: "/moodboards/2/street-grid-at-night.jpg",
    alt: "Aerial view of Chicago at night, the street grid traced in lights",
    label: "The grid, lit",
    line: "#F9E300",
    author: "Janfortytwo",
    license: "CC BY-SA 3.0",
    sourceUrl: `${commons}Chicago_street_grid.jpg`,
  },
  flamingo: {
    src: "/moodboards/2/calder-flamingo.jpg",
    alt: "Alexander Calder's red Flamingo sculpture in front of Mies van der Rohe's black steel Federal Center",
    label: "Flamingo · Federal Plaza",
    line: "#C60C30",
    author: "JeremyA",
    license: "Public domain",
    sourceUrl: `${commons}Calder_Flamingo.jpg`,
  },
  federalCenter: {
    src: "/moodboards/2/federal-center-plaza.jpg",
    alt: "Looking up at the dark steel and glass facade of the Federal Center by Mies van der Rohe",
    label: "Federal Center · Mies",
    line: ink,
    mono: true,
    author: "Esther Westerveld",
    license: "CC BY 2.0",
    sourceUrl: `${commons}Federal_Center_Plaza_(Ludwig_Mies_van_der_Rohe)_-_Chicago_IL_(7833816800).jpg`,
  },
  ibm: {
    src: "/moodboards/2/ibm-building.jpg",
    alt: "The dark, gridded tower of the IBM Building, Mies van der Rohe's last American design",
    label: "IBM Building · 1973",
    line: ink,
    mono: true,
    position: "50% 30%",
    author: "Teemu008",
    license: "CC BY-SA 2.0",
    sourceUrl: `${commons}IBM_Building_(7372612012).jpg`,
  },
  crownHall: {
    src: "/moodboards/2/crown-hall-iit.jpg",
    alt: "S. R. Crown Hall at IIT, a low glass pavilion hung from exposed steel beams",
    label: "Crown Hall · IIT",
    line: ink,
    mono: true,
    author: "Joe Ravi",
    license: "Public domain",
    sourceUrl: `${commons}Crown_Hall_1.jpg`,
  },
  lakeShore880: {
    src: "/moodboards/2/880-lake-shore-drive.jpg",
    alt: "Looking up the steel mullions of 880 Lake Shore Drive",
    label: "880 Lake Shore Drive",
    line: ink,
    mono: true,
    author: "Marc Rochkind",
    license: "CC BY-SA 4.0",
    sourceUrl: `${commons}880_Lake_Shore_Drive_01.jpg`,
  },
  skyRange: {
    src: "/moodboards/2/sky-range-elevated.jpg",
    alt: "An elevated driving range wrapped in tall green netting, seen from a bridge",
    label: "Sky Range · elevated tees",
    line: "#009B3A",
    author: "Kbseah",
    license: "CC BY-SA 4.0",
    sourceUrl: `${commons}Sky_Range_elevated_golf_driving_range.jpg`,
  },
  numberedBays: {
    src: "/moodboards/2/numbered-range-bays.jpg",
    alt: "A row of numbered hitting bays with green mats under bright lights",
    label: "Bays 29–31",
    line: "#009B3A",
    position: "50% 70%",
    author: "antjeverena",
    license: "CC BY-SA 2.0",
    sourceUrl: `${commons}Golfing_range_(2614870913).jpg`,
  },
  simulator: {
    src: "/moodboards/2/indoor-golf-simulator.jpg",
    alt: "A dark indoor golf simulator bay with a projected fairway on the screen",
    label: "Simulator bay",
    line: "#522398",
    author: "Ohconfucius",
    license: "CC BY-SA 3.0",
    sourceUrl: `${commons}Indoor_golf_simulator.JPG`,
  },
  lakeShoreDrive: {
    src: "/moodboards/2/lake-shore-drive-north.jpg",
    alt: "Lake Shore Drive running north beside the lakefront toward the downtown skyline",
    label: "Lake Shore Drive, northbound",
    line: "#00A1DE",
    author: "Sea Cow",
    license: "CC BY-SA 4.0",
    sourceUrl: `${commons}Lake_Shore_Drive_N.jpg`,
  },
} satisfies Record<string, Photo>;

export function FoundPhoto({ photo, wide = false }: { photo: Photo; wide?: boolean }) {
  return (
    <div className="flex h-full flex-col">
      <div className={`relative w-full flex-1 ${wide ? "aspect-video" : "aspect-[4/3]"}`}>
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={wide ? "(min-width: 768px) 720px, 100vw" : "(min-width: 768px) 360px, 100vw"}
          className={`object-cover ${photo.mono ? "contrast-125 grayscale" : ""}`}
          style={{ objectPosition: photo.position ?? "50% 50%" }}
        />
      </div>
      <div className="flex items-stretch border-t border-line-ink">
        <span className="w-2 shrink-0" style={{ backgroundColor: photo.line }} />
        <div className="flex flex-1 flex-wrap items-baseline justify-between gap-x-3 px-3 py-2">
          <span className="font-line-sans text-sm font-bold tracking-tight">{photo.label}</span>
          <a
            href={photo.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-line-mono text-[9px] text-line-steel hover:text-line-red"
          >
            {photo.author} · {photo.license} · Wikimedia ↗
          </a>
        </div>
      </div>
    </div>
  );
}
