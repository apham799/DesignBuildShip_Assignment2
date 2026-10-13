import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/design-systems/clubhouse";
import { clubhouseFonts } from "@/components/moodboards/clubhouse/fonts";
import { guideFacilities } from "./data";
import { Finder } from "./finder";
import { GuideProvider } from "./guide-context";
import { Planner } from "./planner";
import { BrandMark, SiteHeader } from "./site-header";

export const metadata: Metadata = {
  title: "Practice Facility Guide",
  description: "Find a driving range, short-game area, or winter dome around Chicago, and plan your next practice session.",
};

const glance = [
  { label: "Facilities", value: guideFacilities.length },
  { label: "Open right now", value: guideFacilities.filter((f) => f.status === "open" || f.status === "closing").length },
  { label: "Lit at night", value: guideFacilities.filter((f) => f.amenities.includes("Lit at night")).length },
  { label: "Heated or indoor", value: guideFacilities.filter((f) => f.amenities.includes("Heated bays") || f.amenities.includes("Indoor")).length },
];

const steps = [
  { title: "Find a range", body: "Filter by area and amenities, or browse the lakefront map. Every listing shows hours, bucket prices, and how to get there." },
  { title: "Save your favorites", body: "Add ranges to your practice plan as you go. Your plan stays put while this page is open." },
  { title: "Make a session card", body: "Pick a bucket and what to work on, and the planner splits the balls into a card you can print for the tee." },
];

function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="grid grid-cols-1 items-center gap-10 py-10 sm:py-14 lg:grid-cols-[1.25fr_1fr] lg:gap-16 lg:py-20">
      <div>
        <p className="font-club-sign text-xs uppercase tracking-[0.3em] text-club-flag sm:text-sm">Chicagoland · for the regulars</p>
        <h1 id="hero-title" className="mt-3 font-club-serif text-[2.75rem] leading-[1.02] tracking-[-0.01em] text-club-accent sm:text-6xl lg:text-7xl">
          Where Chicago <em className="text-club-flag">practices</em>.
        </h1>
        <p className="mt-6 max-w-xl font-club-serif text-lg leading-relaxed sm:text-xl">
          A field guide to the city&rsquo;s driving ranges, short-game greens, and winter domes. Find somewhere to hit
          a bucket tonight, then plan what you&rsquo;ll work on when you get there.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="#finder">Find a range</ButtonLink>
          <ButtonLink href="#planner" variant="secondary">
            Plan a session
          </ButtonLink>
        </div>
      </div>

      <aside aria-label="At a glance" className="rounded border border-club-rule bg-club-paper p-5 shadow-[0_1px_2px_rgba(43,42,40,0.12),0_8px_20px_-12px_rgba(31,77,58,0.45)] sm:p-6">
        <div className="flex items-baseline justify-between border-b-[3px] border-double border-club-text pb-3">
          <h2 className="font-club-sign text-sm uppercase tracking-[0.25em]">The almanac · today</h2>
          <BrandMark className="size-8" />
        </div>
        <dl className="mt-1 divide-y divide-club-rule">
          {glance.map((g) => (
            <div key={g.label} className="flex items-baseline justify-between py-3">
              <dt className="font-club-serif text-base text-club-muted">{g.label}</dt>
              <dd className="font-club-serif text-3xl tabular-nums">{g.value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 border-t border-club-rule pt-3 font-club-hand text-2xl leading-tight text-club-lake">
          Wind NE 12 off the lake. Club up on the north ranges.
        </p>
      </aside>
    </section>
  );
}

function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="scroll-mt-24 border-t-[3px] border-double border-club-text pt-10 print:hidden">
      <p className="font-club-sign text-xs uppercase tracking-[0.25em] text-club-flag">How it works</p>
      <h2 id="about-title" className="mt-1 font-club-serif text-[2rem] leading-[1.1] sm:text-[2.5rem]">
        Three steps to a better bucket
      </h2>
      <ol className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        {steps.map((s, i) => (
          <li key={s.title} className="rounded border border-club-rule bg-club-surface p-6">
            <span className="font-club-serif text-5xl leading-none text-club-brass">{i + 1}</span>
            <h3 className="mt-3 font-club-serif text-[1.375rem] font-semibold">{s.title}</h3>
            <p className="mt-2 font-club-serif text-base leading-relaxed text-club-muted">{s.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mt-20 border-t-[3px] border-double border-club-text print:hidden">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-start md:justify-between lg:px-8">
        <div className="flex max-w-md gap-3">
          <BrandMark className="size-10 shrink-0" />
          <p className="font-club-serif text-sm leading-relaxed text-club-muted">
            <span className="block font-club-serif text-base text-club-text">Clubhouse Almanac</span>
            A Chicago practice facility guide. Listings, hours, and prices on this page are sample data made for a design
            study, not real facilities.
          </p>
        </div>
        <nav aria-label="Project">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 font-club-sign text-xs uppercase tracking-[0.18em]">
            {[
              { href: "/", label: "Design gallery" },
              { href: "/design-systems/1", label: "Design system" },
              { href: "/moodboards/1", label: "Mood board" },
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="rounded-sm text-club-accent underline decoration-club-accent/40 underline-offset-4 outline-none hover:decoration-club-accent focus-visible:ring-2 focus-visible:ring-club-focus"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}

export default function PracticeFacilityGuide() {
  return (
    <div
      className={`${clubhouseFonts} flex-1 bg-club-bg text-club-text print:bg-white`}
      style={{ backgroundImage: "radial-gradient(rgba(43,42,40,0.05) 1px, transparent 1px)", backgroundSize: "5px 5px" }}
    >
      <a
        href="#finder"
        className="sr-only z-50 rounded-sm bg-club-accent px-4 py-2 font-club-sign text-sm uppercase tracking-[0.18em] text-club-on-accent focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to the finder
      </a>
      <GuideProvider>
        {/* No wrapper here: a sticky header only sticks within its parent. */}
        <SiteHeader />
        <main className="mx-auto max-w-7xl space-y-20 px-4 sm:px-6 lg:px-8">
          <div className="print:hidden">
            <Hero />
          </div>
          <div className="print:hidden">
            <Finder />
          </div>
          <Planner />
          <About />
        </main>
        <Footer />
      </GuideProvider>
    </div>
  );
}
