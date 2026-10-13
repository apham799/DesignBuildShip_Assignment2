// Placeholder facilities shared by every design system. Not real listings.

export type FacilityStatus = "open" | "closing" | "seasonal" | "closed";

// Practice types, used for color-coded markers in some systems.
export type FacilityKind = "range" | "short" | "sim" | "dome" | "par3";

export type Facility = {
  id: string;
  name: string;
  area: string;
  distance: string;
  status: FacilityStatus;
  hours: string;
  summary: string;
  amenities: string[];
  bays: number;
  bucket: string;
  longest: string;
  schedule: { days: string; hours: string }[];
  // Chicago street-grid address, e.g. "3200 N · 500 W".
  grid: string;
  kinds: FacilityKind[];
  transit: string;
};

export const facilities: Facility[] = [
  {
    id: "lakeshore",
    name: "Lakeshore Practice Tee",
    area: "North Side",
    distance: "2.4 mi",
    status: "open",
    hours: "Open until 10 PM",
    summary: "Two-tier range by the lake with grass tees in summer, heated mats in winter, and a short-game green out back.",
    amenities: ["Grass tees", "Lit at night", "Putting green", "Heated bays"],
    bays: 60,
    bucket: "$12",
    longest: "300y",
    schedule: [
      { days: "Mon – Thu", hours: "7 AM – 10 PM" },
      { days: "Fri – Sat", hours: "7 AM – 11 PM" },
      { days: "Sunday", hours: "8 AM – 9 PM" },
    ],
    grid: "3200 N · 500 W",
    kinds: ["range", "short"],
    transit: "Red Line · Belmont · 12 min walk",
  },
  {
    id: "southshore",
    name: "South Shore Links Range",
    area: "South Side",
    distance: "6.1 mi",
    status: "closing",
    hours: "Closes in 40 min",
    summary: "A grass range beside a nine-hole course, with a chipping area and a practice bunker.",
    amenities: ["Grass tees", "Practice bunker", "Chipping area"],
    bays: 32,
    bucket: "$9",
    longest: "260y",
    schedule: [{ days: "Daily", hours: "8 AM – 7 PM" }],
    grid: "7100 S · 2400 E",
    kinds: ["range", "short"],
    transit: "Metra Electric · South Shore · 8 min walk",
  },
  {
    id: "westpark",
    name: "West Park Golf Dome",
    area: "West Side",
    distance: "4.8 mi",
    status: "seasonal",
    hours: "Opens Nov 1",
    summary: "An inflatable winter dome with turf mats and a putting area.",
    amenities: ["Indoor", "Heated bays", "Putting green"],
    bays: 40,
    bucket: "$14",
    longest: "Indoor",
    schedule: [{ days: "Nov – Mar", hours: "9 AM – 10 PM" }],
    grid: "1600 N · 4800 W",
    kinds: ["dome", "range"],
    transit: "Green Line · Central · 15 min walk",
  },
  {
    id: "harbor",
    name: "Harbor Point Short Game",
    area: "Near North",
    distance: "1.2 mi",
    status: "closed",
    hours: "Closed for the season",
    summary: "Putting and chipping greens by the harbor. Closed for repairs this season.",
    amenities: ["Putting green", "Chipping area"],
    bays: 0,
    bucket: "—",
    longest: "—",
    schedule: [{ days: "Season", hours: "Closed" }],
    grid: "600 N · 400 E",
    kinds: ["short"],
    transit: "Bus 66 · Chicago Ave · 5 min walk",
  },
];

export const statusBadge: Record<FacilityStatus, { tone: "success" | "warning" | "info" | "neutral"; label: string }> = {
  open: { tone: "success", label: "Open now" },
  closing: { tone: "warning", label: "Closing soon" },
  seasonal: { tone: "info", label: "Seasonal" },
  closed: { tone: "neutral", label: "Closed" },
};
