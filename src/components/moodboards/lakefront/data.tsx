// Sample data shared across the board. Facility names and details are placeholders.

export const categories = {
  range: { label: "Driving Range", color: "#009B3A" },
  short: { label: "Short Game", color: "#00A1DE" },
  sim: { label: "Simulator", color: "#522398" },
  dome: { label: "Winter Dome", color: "#C60C30" },
  par3: { label: "Par-3 Course", color: "#F9461C" },
} as const;

export type Category = keyof typeof categories;

export type Station = {
  name: string;
  grid: string;
  kinds: Category[];
};

// North to south along the lakefront.
export const stations: Station[] = [
  { name: "Montrose Range", grid: "4400 N · 600 W", kinds: ["range"] },
  { name: "Belmont Harbor Tee", grid: "3200 N · 500 W", kinds: ["range", "sim"] },
  { name: "Fullerton Short Game", grid: "2400 N · 400 W", kinds: ["short"] },
  { name: "North Ave Sim Lab", grid: "1600 N · 300 W", kinds: ["sim"] },
  { name: "Streeterville Dome", grid: "500 N · 400 E", kinds: ["dome", "range"] },
  { name: "Museum Campus Greens", grid: "1200 S · 300 E", kinds: ["short"] },
  { name: "Bronzeville Range", grid: "3100 S · 500 E", kinds: ["range"] },
  { name: "Hyde Park Links", grid: "5600 S · 1600 E", kinds: ["par3", "short"] },
  { name: "South Shore Practice", grid: "7100 S · 2400 E", kinds: ["range", "short"] },
];

export function Bullet({ kind, size = 10 }: { kind: Category; size?: number }) {
  return (
    <span
      title={categories[kind].label}
      className="inline-block shrink-0"
      style={{ width: size, height: size, backgroundColor: categories[kind].color }}
    />
  );
}
