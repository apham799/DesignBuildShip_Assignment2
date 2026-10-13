import Link from "next/link";

type Entry = {
  label: string;
  title: string;
  description: string;
  href?: string;
  status: string;
  swatches?: string[];
};

const sections: { heading: string; entries: Entry[] }[] = [
  {
    heading: "Mood Boards",
    entries: [
      {
        label: "01",
        title: "Clubhouse Almanac",
        description:
          "Heritage public golf: scorecard paper, brass, forest green, and wind off the lake.",
        href: "/moodboards/1",
        status: "Draft · 30 artifacts",
        swatches: ["#1F4D3A", "#F3EBD8", "#B23A2E", "#B8893B", "#3E6E8E", "#D9C49A"],
      },
      {
        label: "02",
        title: "Lakefront Line",
        description:
          "Chicago modernism and transit wayfinding: a Swiss grid, signal colors, glass and steel.",
        href: "/moodboards/2",
        status: "Draft · 29 artifacts",
        swatches: ["#111315", "#F2F2EE", "#009B3A", "#00A1DE", "#522398", "#C60C30", "#F9E300"],
      },
      {
        label: "03",
        title: "Under the Lights",
        description:
          "A space arcade: ball tracers like shooting stars, high-score data, pinball glow, and planetarium blue.",
        href: "/moodboards/3",
        status: "Draft · 30 artifacts",
        swatches: ["#07090F", "#141B2E", "#FFB547", "#C8FF4D", "#5CE1E6", "#FF5A5F"],
      },
    ],
  },
  {
    heading: "Design Systems",
    entries: [
      {
        label: "01",
        title: "Clubhouse Almanac",
        description: "UI kit from Mood Board 01: color and type roles, components in every state, and UI states.",
        href: "/design-systems/1",
        status: "Draft",
        swatches: ["#E9DFC8", "#F8F2E4", "#2B2A28", "#1F4D3A", "#B23A2E", "#3E6E8E"],
      },
      { label: "02", title: "Design System 02", description: "Based on Mood Board 02.", status: "Not started" },
      { label: "03", title: "Design System 03", description: "Based on Mood Board 03.", status: "Not started" },
    ],
  },
  {
    heading: "Final Site",
    entries: [
      {
        label: "→",
        title: "Chicago Range Guide",
        description: "The finished guide, built in the chosen design system.",
        status: "Not started",
      },
    ],
  },
];

function EntryCard({ entry }: { entry: Entry }) {
  const body = (
    <>
      {entry.swatches ? (
        <div className="flex h-24">
          {entry.swatches.map((c) => (
            <span key={c} className="flex-1" style={{ backgroundColor: c }} />
          ))}
        </div>
      ) : (
        <div className="h-24 bg-[repeating-linear-gradient(135deg,transparent_0_10px,rgba(0,0,0,0.04)_10px_20px)]" />
      )}
      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-baseline justify-between font-mono text-xs text-stone-500">
          <span>{entry.label}</span>
          <span>{entry.status}</span>
        </div>
        <h3 className="text-lg font-semibold tracking-tight">{entry.title}</h3>
        <p className="text-sm text-stone-600">{entry.description}</p>
      </div>
    </>
  );

  if (!entry.href) {
    return (
      <div className="flex flex-col overflow-hidden rounded-lg border border-dashed border-stone-300 text-stone-400">
        {body}
      </div>
    );
  }
  return (
    <Link
      href={entry.href}
      className="flex flex-col overflow-hidden rounded-lg border border-stone-200 bg-white transition hover:-translate-y-0.5 hover:shadow-lg"
    >
      {body}
    </Link>
  );
}

export default function Gallery() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-16">
      <header className="max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-widest text-stone-500">
          Design exploration
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          Chicago Range Guide
        </h1>
        <p className="mt-4 text-lg text-stone-600">
          A guide to golf practice facilities around Chicago. The work moves
          through three mood boards, then three design systems built from them,
          then one final site in the chosen style.
        </p>
      </header>

      {sections.map((section, i) => (
        <section key={section.heading} className="mt-14">
          <h2 className="mb-5 flex items-baseline gap-3 border-b border-stone-200 pb-3 text-sm font-medium uppercase tracking-widest text-stone-500">
            <span className="font-mono">{String(i + 1).padStart(2, "0")}</span>
            {section.heading}
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {section.entries.map((entry) => (
              <EntryCard key={entry.title} entry={entry} />
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
