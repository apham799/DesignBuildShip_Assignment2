// Found photographs from Wikimedia Commons, framed to suit the board.
// Files live in public/moodboards/1; every photo carries its source and license.
import Image from "next/image";

type Frame = "postcard" | "corners" | "print";

type Photo = {
  src: string;
  width: number;
  height: number;
  alt: string;
  note?: string;
  author: string;
  license: string;
  sourceUrl: string;
  frame: Frame;
};

const commons = "https://commons.wikimedia.org/wiki/File:";

export const photos = {
  jacksonParkLinks: {
    src: "/moodboards/1/jackson-park-golf-links-postcard.jpg",
    width: 500,
    height: 316,
    alt: "Hand-tinted postcard of golfers on the links at Jackson Park, Chicago",
    note: "The Golf Links, Jackson Park, Chicago",
    author: "Unknown, via Newberry Library",
    license: "Public domain",
    sourceUrl: `${commons}The_Golf_Links,_Jackson_Park,_Chicago_(NBY_416563).jpg`,
    frame: "postcard",
  },
  jacksonParkShelter: {
    src: "/moodboards/1/jackson-park-golf-shelter-postcard.jpg",
    width: 500,
    height: 318,
    alt: "Postcard of the red-roofed golf shelter at Jackson Park, crowded with golfers",
    note: "Golf Shelter, Jackson Park",
    author: "Unknown, via Newberry Library",
    license: "Public domain",
    sourceUrl: `${commons}Golf_Shelter,_Jackson_Park,_Chicago_(NBY_417059).jpg`,
    frame: "postcard",
  },
  cogHill: {
    src: "/moodboards/1/cog-hill-pay-as-you-play-postcard.jpg",
    width: 500,
    height: 320,
    alt: "1934 linen postcard: Meet me at Cog-Hill, the world's finest public golf courses, pay as you play, Lemont, Illinois",
    note: "“Pay as you play” — Cog Hill, Lemont, 1934",
    author: "Unknown, via Newberry Library",
    license: "Public domain",
    sourceUrl: `${commons}Meet_me_at_Cog-Hill,_The_World%27s_Finest_Public_Golf_Courses,_Pay_as_you_Play_(NBY_10286).jpg`,
    frame: "postcard",
  },
  emmonsCollins: {
    src: "/moodboards/1/emmons-collins-practice-field-1930.jpg",
    width: 500,
    height: 320,
    alt: "1930 postcard of pheasants in the snow at the Emmons Collins Public Golf Practice Field, Ogden Ave. and Wolf Road, Cook County",
    note: "A public practice field on Ogden Ave., Cook County, 1930",
    author: "Unknown, via Newberry Library",
    license: "Public domain",
    sourceUrl: `${commons}Pheasants_at_Emmons_Collins_Public_Golf_Practice_Field,_Ogden_Ave._%26_Wolf_Road,_Cook_County,_Ill_(NBY_429010).jpg`,
    frame: "postcard",
  },
  warrenWood: {
    src: "/moodboards/1/warren-wood-1905.jpg",
    width: 636,
    height: 460,
    alt: "Glass-plate photo of golfer Warren Wood finishing a swing in front of a clubhouse porch",
    note: "Warren Wood, 1905",
    author: "Chicago Daily News",
    license: "Public domain",
    sourceUrl: `${commons}Warren_Wood.jpg`,
    frame: "corners",
  },
  chickEvans: {
    src: "/moodboards/1/chick-evans-golf-book-1921.jpg",
    width: 960,
    height: 1432,
    alt: "Plate from Chick Evans' Golf Book showing a golfer at the top of the backswing",
    note: "Plate from Chick Evans’ Golf Book, 1921",
    author: "Chick Evans",
    license: "No known restrictions",
    sourceUrl: `${commons}Chick_Evans%27_golf_book_(1921)_(14783018533).jpg`,
    frame: "corners",
  },
  clubsAd: {
    src: "/moodboards/1/golf-clubs-ad-1940.jpg",
    width: 500,
    height: 802,
    alt: "1940 color advertisement for Jimmy Hines and Ray Mangrum golf clubs, two golfers in front of a clubhouse",
    author: "Unknown, via Newberry Library",
    license: "Public domain",
    sourceUrl: `${commons}Jimmy_Hines,_Ray_Mangrum_Golf_Clubs_(NBY_1056).jpg`,
    frame: "print",
  },
  wavelandFieldHouse: {
    src: "/moodboards/1/waveland-field-house.jpg",
    width: 960,
    height: 563,
    alt: "The Waveland Field House and carillon tower in Lincoln Park, beside the lakefront golf course",
    author: "Ken Lund",
    license: "CC BY-SA 2.0",
    sourceUrl: `${commons}Waveland_Field_House_and_Carillon_Tower,_Lincoln_Park,_Chicago,_Illinois_(43344166122).jpg`,
    frame: "print",
  },
  wavelandLakefront: {
    src: "/moodboards/1/waveland-golf-course-lakefront.jpg",
    width: 960,
    height: 627,
    alt: "First tee of the Waveland golf course in Lincoln Park with Lake Michigan behind",
    author: "Alanscottwalker",
    license: "CC BY-SA 3.0",
    sourceUrl: `${commons}Waveland_Golf_Course.JPG`,
    frame: "print",
  },
  smootCummins: {
    src: "/moodboards/1/smoot-and-cummins-1905.jpg",
    width: 635,
    height: 461,
    alt: "Glass-plate photo of golfers Clement Smoot and Ned Cummins standing with their clubs",
    note: "Clement Smoot & Ned Cummins, 1905",
    author: "Chicago Daily News",
    license: "Public domain",
    sourceUrl: `${commons}Clement_Smoot_e_Ned_Cummins.jpg`,
    frame: "corners",
  },
  golfGirl: {
    src: "/moodboards/1/the-golf-girl-1906.jpg",
    width: 508,
    height: 821,
    alt: "1906 illustrated postcard by Howard Chandler Christy of a woman golfer in a red jacket and long skirt",
    note: "“The Golf Girl,” H. C. Christy, 1906",
    author: "Howard Chandler Christy, via Newberry Library",
    license: "Public domain",
    sourceUrl: `${commons}The_Golf_Girl,_artist_signed_H_C_Christy_1906_(NBY_3961).jpg`,
    frame: "postcard",
  },
  lincolnParkDusk: {
    src: "/moodboards/1/lincoln-park-dusk-skyline.jpg",
    width: 960,
    height: 720,
    alt: "The Lincoln Park lagoon at dusk with the Chicago skyline reflected in the water",
    author: "Warren LeMay",
    license: "CC BY-SA 2.0",
    sourceUrl: `${commons}Lincoln_Park,_Lake_Shore_Drive,_Lincoln_Park,_Chicago,_IL_(54517712500).jpg`,
    frame: "print",
  },
  coveredBays: {
    src: "/moodboards/1/covered-practice-bays.jpg",
    width: 960,
    height: 1280,
    alt: "A row of covered hitting bays at a driving range with long afternoon shadows",
    author: "Packer1028",
    license: "CC0",
    sourceUrl: `${commons}Driving_range_spots,_Rockwood_Golf_Park.jpg`,
    frame: "print",
  },
  rangeAtNight: {
    src: "/moodboards/1/three-tier-range-at-night.jpg",
    width: 960,
    height: 549,
    alt: "A three-story driving range in Portage, Wisconsin, lit up at night with glowing targets",
    author: "Wikideas1",
    license: "CC0",
    sourceUrl: `${commons}Driving_range-3.jpg`,
    frame: "print",
  },
  rangeMat: {
    src: "/moodboards/1/driving-range-mat.jpg",
    width: 960,
    height: 1122,
    alt: "A hitting mat and a pile of range balls looking out over an empty driving range",
    author: "Packer1028",
    license: "CC0",
    sourceUrl: `${commons}Driving_range_at_Rockwood_Golf_Park.jpg`,
    frame: "print",
  },
} satisfies Record<string, Photo>;

function Credit({ photo }: { photo: Photo }) {
  return (
    <a
      href={photo.sourceUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-2 block font-club-mono text-[9px] uppercase tracking-wider text-club-ink/50 hover:text-club-red"
    >
      {photo.author} · {photo.license} · Wikimedia Commons ↗
    </a>
  );
}

const corner = "absolute size-5 bg-club-ink/85";

export function FoundPhoto({ photo, tilt = 0 }: { photo: Photo; tilt?: number }) {
  const img = (
    <Image
      src={photo.src}
      width={photo.width}
      height={photo.height}
      alt={photo.alt}
      sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
      className={`h-auto w-full ${photo.frame === "print" ? "sepia-[.2] saturate-[.85]" : ""}`}
    />
  );

  if (photo.frame === "postcard") {
    return (
      <div className="bg-club-page px-5 py-6">
        <div
          className="bg-[#FBF7EE] p-2 shadow-md"
          style={{ transform: `rotate(${tilt}deg)` }}
        >
          {img}
          {photo.note && (
            <p className="px-1 pt-2 font-club-hand text-lg leading-tight text-club-lake">
              {photo.note}
            </p>
          )}
        </div>
        <Credit photo={photo} />
      </div>
    );
  }

  if (photo.frame === "corners") {
    return (
      <div className="bg-club-paper p-5">
        <div className="relative p-1.5" style={{ transform: `rotate(${tilt}deg)` }}>
          <div className="grayscale-[.2] sepia-[.35]">{img}</div>
          <span className={`${corner} left-0 top-0 [clip-path:polygon(0_0,100%_0,0_100%)]`} />
          <span className={`${corner} right-0 top-0 [clip-path:polygon(0_0,100%_0,100%_100%)]`} />
          <span className={`${corner} bottom-0 left-0 [clip-path:polygon(0_0,100%_100%,0_100%)]`} />
          <span className={`${corner} bottom-0 right-0 [clip-path:polygon(100%_0,100%_100%,0_100%)]`} />
        </div>
        {photo.note && (
          <p className="mt-2 font-club-hand text-lg leading-tight text-club-ink/80">
            {photo.note}
          </p>
        )}
        <Credit photo={photo} />
      </div>
    );
  }

  return (
    <div className="bg-club-paper p-3">
      {img}
      <div className="px-1">
        <Credit photo={photo} />
      </div>
    </div>
  );
}
