"use client";

import { useState } from "react";

const amenities = ["Grass Tees", "Lit Until 10 PM", "Putting Green"];

// Sample listing for tone only; the name and details are placeholders.
export function FacilityCard() {
  const [inPlan, setInPlan] = useState(false);

  return (
    <article className="bg-club-paper text-club-ink">
      <header className="flex items-center justify-between bg-club-green px-5 py-3 text-club-cream">
        <span className="font-club-sign text-[11px] uppercase tracking-[0.3em]">
          Practice Facility
        </span>
        <span className="font-club-mono text-[11px]">No. 07</span>
      </header>
      <div className="space-y-4 p-5">
        <div>
          <h3 className="font-club-serif text-2xl leading-tight">
            Lakeshore Practice Tee
          </h3>
          <p className="font-club-mono text-xs text-club-ink/60">
            Sample listing · North Side · 2.4 mi
          </p>
        </div>
        <ul className="flex flex-wrap gap-2">
          {amenities.map((a) => (
            <li
              key={a}
              className="border border-club-green/40 px-2 py-0.5 font-club-sign text-[11px] uppercase tracking-wider text-club-green"
            >
              {a}
            </li>
          ))}
        </ul>
        <dl className="grid grid-cols-3 divide-x divide-club-green/20 border-y border-club-green/20 py-2 text-center">
          {[
            ["Bays", "60"],
            ["Small Bucket", "$12"],
            ["Longest", "300y"],
          ].map(([label, value]) => (
            <div key={label}>
              <dt className="font-club-sign text-[10px] uppercase tracking-wider text-club-ink/60">
                {label}
              </dt>
              <dd className="font-club-serif text-xl">{value}</dd>
            </div>
          ))}
        </dl>
        <button
          type="button"
          onClick={() => setInPlan((v) => !v)}
          aria-pressed={inPlan}
          className={`w-full border-2 px-4 py-2 font-club-sign text-sm uppercase tracking-[0.2em] transition-colors ${
            inPlan
              ? "border-club-green bg-club-green text-club-cream"
              : "border-club-red text-club-red hover:bg-club-red hover:text-club-cream"
          }`}
        >
          {inPlan ? "✓ In Your Practice Plan" : "Add to Practice Plan"}
        </button>
      </div>
    </article>
  );
}
