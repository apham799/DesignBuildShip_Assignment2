import Link from "next/link";
import type { ReactNode } from "react";
import { ClubhousePreview, GuidePreview, LakefrontPreview, NightPreview } from "@/components/design-systems/previews";

type Entry = {
  label: string;
  title: string;
  description: string;
  href?: string;
  status: string;
  swatches?: string[];
  // A live sample of a design system's components, shown instead of swatches.
  preview?: ReactNode;
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
        preview: <ClubhousePreview />,
      },
      {
        label: "02",
        title: "Lakefront Line",
        description: "UI kit from Mood Board 02: transit-sign components, signal colors, every state, and UI states.",
        href: "/design-systems/2",
        status: "Draft",
        preview: <LakefrontPreview />,
      },
      {
        label: "03",
        title: "Under the Lights",
        description: "UI kit from Mood Board 03: dark arcade components that glow, every state, and UI states.",
        href: "/design-systems/3",
        status: "Draft",
        preview: <NightPreview />,
      },
    ],
  },
  {
    heading: "Final Site",
    entries: [
      {
        label: "→",
        title: "Practice Facility Guide",
        description: "The finished guide to Chicago practice facilities, built in Design System 01: Clubhouse Almanac.",
        href: "/practice-facility-guide",
        status: "Draft",
        preview: <GuidePreview />,
      },
    ],
  },
];

function EntryVisual({ entry }: { entry: Entry }) {
  if (entry.preview) {
    // inert: the sample controls can't be focused or clicked; the card link handles clicks.
    return (
      <div inert aria-hidden className="pointer-events-none h-36 select-none border-b border-stone-200">
        {entry.preview}
      </div>
    );
  }
  if (entry.swatches) {
    return (
      <div className="flex h-24">
        {entry.swatches.map((c) => (
          <span key={c} className="flex-1" style={{ backgroundColor: c }} />
        ))}
      </div>
    );
  }
  return <div className="h-24 bg-[repeating-linear-gradient(135deg,transparent_0_10px,rgba(0,0,0,0.04)_10px_20px)]" />;
}

function EntryCard({ entry }: { entry: Entry }) {
  const meta = (
    <div className="flex items-baseline justify-between font-mono text-xs text-stone-500">
      <span>{entry.label}</span>
      <span>{entry.status}</span>
    </div>
  );

  if (!entry.href) {
    return (
      <div className="flex flex-col overflow-hidden rounded-lg border border-dashed border-stone-300 text-stone-400">
        <EntryVisual entry={entry} />
        <div className="flex flex-1 flex-col gap-2 p-5">
          {meta}
          <h3 className="text-lg font-semibold tracking-tight">{entry.title}</h3>
          <p className="text-sm text-stone-600">{entry.description}</p>
        </div>
      </div>
    );
  }
  // The title link stretches over the whole card, so the card stays one click target.
  return (
    <article className="relative flex flex-col overflow-hidden rounded-lg border border-stone-200 bg-white transition hover:-translate-y-0.5 hover:shadow-lg has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-stone-900 has-[a:focus-visible]:ring-offset-2">
      <EntryVisual entry={entry} />
      <div className="flex flex-1 flex-col gap-2 p-5">
        {meta}
        <h3 className="text-lg font-semibold tracking-tight">
          <Link href={entry.href} className="outline-none after:absolute after:inset-0 after:content-['']">
            {entry.title}
          </Link>
        </h3>
        <p className="text-sm text-stone-600">{entry.description}</p>
      </div>
    </article>
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
