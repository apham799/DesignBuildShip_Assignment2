import type { Metadata } from "next";
import Link from "next/link";
import {
  Alert,
  Badge,
  Bullet,
  Button,
  Checkbox,
  DetailPanel,
  EmptyState,
  ErrorState,
  FacilityCard,
  FacilityCardSkeleton,
  facilities,
  FilterChip,
  ListRow,
  LoadingNote,
  Radio,
  SearchField,
  Select,
  Tab,
  Tabs,
  TextInput,
  TextLink,
  Toast,
  Toggle,
  type Force,
} from "@/components/design-systems/lakefront";
import { colorRoles, elevationRoles, radii, signals, spacing, typeRoles } from "@/components/design-systems/lakefront/tokens";
import { contrastRatio } from "@/components/design-systems/contrast";
import type { FacilityKind } from "@/components/design-systems/sample";
import { lakefrontFonts } from "@/components/moodboards/lakefront/fonts";
import { LiveCard, LiveFilters, ModalDemo, SearchFlow } from "./demos";
import { Block, Caption, Panel, Section, StateGrid } from "./doc";

export const metadata: Metadata = {
  title: "Design System 02 — Lakefront Line",
};

const nav = [
  ["colors", "Color roles"],
  ["type", "Type roles"],
  ["space", "Spacing & shape"],
  ["actions", "Buttons & links"],
  ["forms", "Form controls"],
  ["navigation", "Tabs & chips"],
  ["content", "Cards, rows & badges"],
  ["overlays", "Detail panel & modal"],
  ["feedback", "Alerts & toast"],
  ["states", "UI states"],
] as const;

const controlStates: { label: string; force?: Force; disabled?: boolean; loading?: boolean }[] = [
  { label: "Rest" },
  { label: "Hover", force: "hover" },
  { label: "Focus", force: "focus" },
  { label: "Pressed", force: "active" },
  { label: "Disabled", disabled: true },
  { label: "Loading", loading: true },
];

const inputStates = ["Rest", "Hover", "Focus", "Disabled"] as const;
const toForce = (s: string): Force | undefined => (s === "Hover" ? "hover" : s === "Focus" ? "focus" : undefined);

const neighborhoods = [
  { value: "", label: "Any neighborhood" },
  { value: "north", label: "North Side" },
  { value: "south", label: "South Side" },
  { value: "west", label: "West Side" },
];

function ContrastBadge({ fg, bg, min }: { fg: string; bg: string; min: 3 | 4.5 }) {
  const ratio = contrastRatio(fg, bg);
  const level = ratio >= 7 ? "AAA" : ratio >= min ? (min === 3 ? "AA · UI" : "AA") : "Fails";
  return (
    <span className="inline-flex items-center gap-2">
      <span className="font-line-mono text-sm font-medium tabular-nums">{ratio.toFixed(2)}:1</span>
      <Badge tone={level === "Fails" ? "error" : "success"}>{level}</Badge>
    </span>
  );
}

export default function LakefrontDesignSystem() {
  return (
    <div
      className={`${lakefrontFonts} flex-1 bg-line-bg font-line-sans text-line-text`}
      style={{
        backgroundImage:
          "linear-gradient(rgba(17,19,21,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(17,19,21,0.04) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    >
      <header className="bg-line-text text-line-on-accent">
        <div className="flex h-2">
          {Object.values(signals).map((s) => (
            <span key={s.hex} className="flex-1" style={{ backgroundColor: s.hex }} />
          ))}
          <span className="flex-1 bg-line-highlight" />
        </div>
        <div className="mx-auto max-w-6xl px-6 pb-12 pt-8">
          <div className="flex flex-wrap gap-x-6 gap-y-2 font-line-mono text-xs uppercase">
            <Link href="/" className="text-line-rule underline decoration-2 underline-offset-4 outline-none hover:text-line-highlight focus-visible:ring-[3px] focus-visible:ring-line-highlight">
              ← Back to gallery
            </Link>
            <Link href="/moodboards/2" className="text-line-rule underline decoration-2 underline-offset-4 outline-none hover:text-line-highlight focus-visible:ring-[3px] focus-visible:ring-line-highlight">
              Mood board 02
            </Link>
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-end">
            <div>
              <p className="font-line-mono text-xs uppercase tracking-[0.3em] text-line-highlight">Design System 02</p>
              <h1 className="mt-3 text-7xl font-black uppercase leading-[0.85] tracking-[-0.02em] [font-stretch:62%] md:text-8xl">
                Lakefront
                <br />
                Line
              </h1>
            </div>
            <p className="text-lg leading-snug text-line-rule">
              The UI kit for a guide that reads like the CTA. Square corners, ink frames, signal colors that code each
              type of practice, and a yellow “you are here” highlight. Every component is shown in every state, forced
              in the grids and live everywhere else.
            </p>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-12 lg:grid-cols-[12rem_1fr]">
        <nav aria-label="Design system sections" className="lg:sticky lg:top-8 lg:self-start">
          <ol className="flex flex-wrap gap-x-4 gap-y-0 border-l-4 border-line-text lg:flex-col">
            {nav.map(([id, label], i) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="flex gap-3 px-3 py-1 font-line-sans text-sm font-semibold outline-none hover:bg-line-highlight focus-visible:ring-[3px] focus-visible:ring-line-focus"
                >
                  <span className="font-line-mono text-xs text-line-muted">{String(i + 1).padStart(2, "0")}</span>
                  {label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <main className="min-w-0 space-y-16">
          {/* ── Color ─────────────────────────────── */}
          <Section
            id="colors"
            index={1}
            title="Color roles"
            intro="Ink and white do the work. Components use role tokens, not raw palette colors, and every text and UI role is checked against its background: 4.5:1 for text, 3:1 for edges and the focus ring. Ratios are computed from the token values."
          >
            {colorRoles.map((group) => (
              <Block key={group.group} title={group.group}>
                <div className="overflow-x-auto border border-line-text bg-line-surface">
                  <table className="w-full min-w-[40rem] table-fixed border-collapse text-left">
                    <colgroup>
                      <col className="w-[30%]" />
                      <col className="w-[20%]" />
                      <col className="w-[30%]" />
                      <col className="w-[20%]" />
                    </colgroup>
                    <thead>
                      <tr className="bg-line-text font-line-mono text-[11px] uppercase tracking-[0.06em] text-line-on-accent">
                        <th className="px-4 py-2 font-normal">Role</th>
                        <th className="px-4 py-2 font-normal">Token</th>
                        <th className="px-4 py-2 font-normal">Use</th>
                        <th className="px-4 py-2 font-normal">Contrast</th>
                      </tr>
                    </thead>
                    <tbody>
                      {group.roles.map((r) => (
                        <tr key={r.name} className="border-b border-line-rule last:border-0">
                          <td className="px-4 py-3">
                            <span className="flex items-center gap-3">
                              <span
                                className="grid size-10 shrink-0 place-items-center border border-line-text font-line-sans text-sm font-bold"
                                style={{ backgroundColor: r.on?.hex ?? r.hex, color: r.on ? r.hex : undefined }}
                              >
                                {r.on ? "Aa" : ""}
                              </span>
                              <span className="text-base font-semibold">{r.name}</span>
                            </span>
                          </td>
                          <td className="px-4 py-3 font-line-mono text-xs">
                            {r.token}
                            <br />
                            <span className="text-line-muted">{r.hex}</span>
                          </td>
                          <td className="px-4 py-3 text-sm text-line-muted">{r.usage}</td>
                          <td className="px-4 py-3">
                            {r.on ? (
                              <span className="flex flex-col gap-1">
                                <ContrastBadge fg={r.hex} bg={r.on.hex} min={r.on.min} />
                                <span className="font-line-mono text-[11px] text-line-muted">on {r.on.name}</span>
                              </span>
                            ) : (
                              <span className="font-line-mono text-xs text-line-muted">—</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Block>
            ))}
            <Block title="Signal colors" note="Facility types · always paired with a text label">
              <div className="grid gap-px border border-line-text bg-line-text sm:grid-cols-5">
                {(Object.keys(signals) as FacilityKind[]).map((k) => (
                  <div key={k} className="flex flex-col gap-2 bg-line-surface p-4">
                    <span className="h-3 w-full" style={{ backgroundColor: signals[k].hex }} />
                    <span className="flex items-center gap-1.5 text-sm font-semibold">
                      <Bullet kind={k} />
                      {signals[k].label}
                    </span>
                    <span className="font-line-mono text-[11px] text-line-muted">
                      {signals[k].hex} · {contrastRatio(signals[k].hex, "#FFFFFF").toFixed(2)}:1
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-2 text-sm text-line-muted">
                Short-game blue measures 2.94:1 on white. That&rsquo;s fine because a text label always says the same thing,
                but it means signal colors may never appear alone.
              </p>
            </Block>
          </Section>

          {/* ── Type ──────────────────────────────── */}
          <Section id="type" index={2} title="Type roles" intro="One family, many widths. Archivo runs condensed for display and signs, normal for reading. IBM Plex Mono sets every number, address, and time, with tabular figures so columns line up.">
            <div className="border border-line-text bg-line-surface">
              {typeRoles.map((t) => (
                <div key={t.name} className="grid gap-2 border-b border-line-rule px-5 py-4 last:border-0 md:grid-cols-[11rem_1fr]">
                  <div>
                    <p className="text-base font-bold">{t.name}</p>
                    <p className="font-line-mono text-[11px] text-line-muted">{t.spec}</p>
                  </div>
                  <p className={`${t.className} min-w-0`}>{t.sample}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* ── Space & shape ─────────────────────── */}
          <Section id="space" index={3} title="Spacing & shape" intro="An 8px grid, square corners, and 1px ink frames. Instead of soft shadows, things that lift cast a hard offset shadow, like a sign panel standing off the wall.">
            <Block title="Spacing scale" note="Tailwind steps · 8px grid">
              <Panel className="space-y-2">
                {spacing.map((s) => (
                  <div key={s.token} className="grid grid-cols-[3rem_4rem_1fr] items-center gap-3">
                    <span className="font-line-mono text-xs">{s.token}</span>
                    <span className="font-line-mono text-xs text-line-muted">{s.px}px</span>
                    <span className="flex items-center gap-3">
                      <span className="h-3 shrink-0 bg-line-text" style={{ width: s.px }} />
                      <span className="text-sm text-line-muted">{s.use}</span>
                    </span>
                  </div>
                ))}
              </Panel>
            </Block>
            <div className="grid gap-10 md:grid-cols-2">
              <Block title="Shape">
                <div className="space-y-3">
                  {radii.map((r) => (
                    <div key={r.name} className="flex items-center gap-4 border border-line-text bg-line-surface p-4">
                      <span className={`size-12 shrink-0 border-[3px] border-line-text ${r.className}`} />
                      <span>
                        <span className="block text-base font-bold">
                          {r.name} <span className="font-line-mono text-xs font-normal text-line-muted">{r.value}</span>
                        </span>
                        <span className="text-sm text-line-muted">{r.use}</span>
                      </span>
                    </div>
                  ))}
                </div>
              </Block>
              <Block title="Frames & elevation">
                <div className="space-y-4">
                  {elevationRoles.map((e) => (
                    <div key={e.name} className={`bg-line-surface p-4 ${e.className}`}>
                      <p className="text-base font-bold">{e.name}</p>
                      <p className="text-sm text-line-muted">{e.use}</p>
                    </div>
                  ))}
                </div>
              </Block>
            </div>
          </Section>

          {/* ── Buttons & links ───────────────────── */}
          <Section id="actions" index={4} title="Buttons & links" intro="Primary is solid ink. Secondary lights up signal yellow on hover. Ghost is for low-stakes actions and danger is for removing things. Pressed buttons sink 1px.">
            <Block title="Buttons" note="Medium 48px is the default · small 36px">
              <StateGrid
                columns={["Primary", "Secondary", "Ghost", "Danger"]}
                rows={controlStates.map((st) => ({
                  label: st.label,
                  cells: (["primary", "secondary", "ghost", "danger"] as const).map((v) => (
                    <Button key={v} variant={v} force={st.force} disabled={st.disabled} loading={st.loading}>
                      {v === "danger" ? "Remove" : "Search"}
                    </Button>
                  )),
                }))}
                minCell="8rem"
              />
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <Button size="sm">Small primary</Button>
                <Button size="sm" variant="secondary">
                  Small secondary
                </Button>
                <Button size="sm" variant="ghost">
                  Small ghost
                </Button>
              </div>
            </Block>
            <Block title="Links" note="Always underlined · hover highlights">
              <StateGrid
                columns={["Rest", "Hover", "Focus", "Pressed", "External"]}
                rows={[
                  {
                    cells: [
                      <TextLink key="r" href="#actions">Hours &amp; buckets</TextLink>,
                      <TextLink key="h" href="#actions" force="hover">Hours &amp; buckets</TextLink>,
                      <TextLink key="f" href="#actions" force="focus">Hours &amp; buckets</TextLink>,
                      <TextLink key="p" href="#actions" force="active">Hours &amp; buckets</TextLink>,
                      <TextLink key="e" href="https://www.transitchicago.com" external>CTA trip planner</TextLink>,
                    ],
                  },
                ]}
              />
            </Block>
          </Section>

          {/* ── Forms ─────────────────────────────── */}
          <Section id="forms" index={5} title="Form controls" intro="Fields are 48px tall with 2px edges that turn ink on hover and focus. Errors pair the red edge with a marked message, so they never rely on color alone.">
            <Block title="Text input">
              <div className="grid gap-5 border border-line-text bg-line-surface p-5 sm:grid-cols-2 lg:grid-cols-3">
                <TextInput label="Rest" placeholder="Street or ZIP" hint="We sort stops by distance from here." />
                <TextInput label="Hover" placeholder="Street or ZIP" force="hover" />
                <TextInput label="Focus" placeholder="Street or ZIP" force="focus" />
                <TextInput label="Filled" defaultValue="3200 N Lake Shore" />
                <TextInput label="Error" defaultValue="606" error="ZIP codes have five digits." />
                <TextInput label="Success" defaultValue="60657" success="Sorted from 60657." />
                <TextInput label="Disabled" placeholder="Street or ZIP" disabled />
              </div>
            </Block>
            <Block title="Search field" note="Clear button appears once there is text">
              <div className="grid gap-5 border border-line-text bg-line-surface p-5 sm:grid-cols-2">
                <SearchField label="Search, empty" placeholder="Search by street or line" />
                <SearchField label="Search, filled" defaultValue="Belmont" />
                <SearchField label="Search, focus" placeholder="Search by street or line" force="focus" />
                <SearchField label="Search, disabled" placeholder="Search by street or line" disabled />
              </div>
            </Block>
            <Block title="Select">
              <div className="grid gap-5 border border-line-text bg-line-surface p-5 sm:grid-cols-2 lg:grid-cols-3">
                <Select label="Rest" options={neighborhoods} />
                <Select label="Hover" options={neighborhoods} force="hover" />
                <Select label="Focus" options={neighborhoods} force="focus" />
                <Select label="Error" options={neighborhoods} error="Pick a neighborhood to continue." />
                <Select label="Disabled" options={neighborhoods} disabled />
              </div>
            </Block>
            <Block title="Checkboxes">
              <StateGrid
                columns={[...inputStates]}
                rows={[
                  { label: "Unchecked", checked: false, mixed: false },
                  { label: "Checked", checked: true, mixed: false },
                  { label: "Mixed", checked: false, mixed: true },
                ].map((r) => ({
                  label: r.label,
                  cells: inputStates.map((s) => (
                    <Checkbox
                      key={s}
                      label={r.mixed ? "All types" : "Lit at night"}
                      defaultChecked={r.checked}
                      indeterminate={r.mixed}
                      force={toForce(s)}
                      disabled={s === "Disabled"}
                    />
                  )),
                }))}
              />
            </Block>
            <Block title="Radios">
              <StateGrid
                columns={[...inputStates]}
                rows={[
                  { label: "Unselected", checked: false },
                  { label: "Selected", checked: true },
                ].map((r) => ({
                  label: r.label,
                  cells: inputStates.map((s) => (
                    <Radio
                      key={s}
                      name={`ds2-radio-${r.label}-${s}`}
                      label="Walk"
                      description="Under 15 min"
                      defaultChecked={r.checked}
                      force={toForce(s)}
                      disabled={s === "Disabled"}
                    />
                  )),
                }))}
              />
            </Block>
            <Block title="Toggles" note="role=switch · thumb turns yellow when on">
              <StateGrid
                columns={[...inputStates]}
                rows={[
                  { label: "Off", on: false },
                  { label: "On", on: true },
                ].map((r) => ({
                  label: r.label,
                  cells: inputStates.map((s) => (
                    <Toggle key={s} label="Open now" defaultOn={r.on} force={toForce(s)} disabled={s === "Disabled"} />
                  )),
                }))}
              />
            </Block>
          </Section>

          {/* ── Navigation ────────────────────────── */}
          <Section id="navigation" index={6} title="Tabs & filter chips" intro="Tabs are one segmented sign, and the selected segment fills with ink. Chips that filter by practice type carry their signal color. Use the arrow keys to move between tabs.">
            <Block title="Tabs, live">
              <Panel>
                <Tabs
                  label="Stop sections"
                  items={[
                    { id: "overview", label: "Overview", panel: <p className="text-base">{facilities[0].summary}</p> },
                    {
                      id: "hours",
                      label: "Hours",
                      panel: <p className="font-line-mono text-sm">{facilities[0].schedule.map((s) => `${s.days}: ${s.hours}`).join(" · ")}</p>,
                    },
                    { id: "transit", label: "Transit", count: 3, panel: <p className="text-base">{facilities[0].transit}</p> },
                    { id: "lessons", label: "Lessons", disabled: true },
                  ]}
                />
              </Panel>
            </Block>
            <Block title="Tab states">
              <StateGrid
                columns={["Rest", "Hover", "Focus", "Selected", "Disabled"]}
                rows={[
                  {
                    cells: [
                      { label: "Rest" },
                      { label: "Hover", force: "hover" as Force },
                      { label: "Focus", force: "focus" as Force },
                      { label: "Selected", selected: true },
                      { label: "Disabled", disabled: true },
                    ].map((t) => (
                      <div key={t.label} role="tablist" aria-label={`${t.label} tab example`} className="inline-flex border-2 border-line-accent">
                        <Tab force={t.force} selected={t.selected} disabled={t.disabled} tabIndex={-1}>
                          Hours
                        </Tab>
                      </div>
                    )),
                  },
                ]}
                minCell="7rem"
              />
            </Block>
            <Block title="Filter chips, live" note="Types with no stops are disabled">
              <Panel>
                <LiveFilters />
              </Panel>
            </Block>
            <Block title="Chip states">
              <StateGrid
                columns={["Rest", "Hover", "Focus", "Pressed", "Selected", "Disabled"]}
                rows={[
                  {
                    cells: [
                      <FilterChip key="r" kind="range">Range</FilterChip>,
                      <FilterChip key="h" kind="range" force="hover">Range</FilterChip>,
                      <FilterChip key="f" kind="range" force="focus">Range</FilterChip>,
                      <FilterChip key="p" kind="range" force="active">Range</FilterChip>,
                      <FilterChip key="s" kind="range" selected>Range</FilterChip>,
                      <FilterChip key="d" disabled>Range</FilterChip>,
                    ],
                  },
                ]}
                minCell="7rem"
              />
            </Block>
          </Section>

          {/* ── Content ───────────────────────────── */}
          <Section id="content" index={7} title="Cards, rows & badges" intro="A card is a framed sign for one stop, topped with its signal colors. A row is a stop on the line, with a vertical rail through every station dot. Selected rows get the yellow “you are here” tint.">
            <Block title="Badges">
              <Panel className="flex flex-wrap gap-2">
                <Badge tone="success" dot>Open now</Badge>
                <Badge tone="warning" dot>Closing soon</Badge>
                <Badge tone="info" dot>Seasonal</Badge>
                <Badge tone="error" dot>Closed today</Badge>
                <Badge tone="neutral">Closed</Badge>
                <Badge tone="accent">Staff pick</Badge>
                <Badge tone="flag">★ Saved</Badge>
                <Badge tone="outline">Heated bays</Badge>
              </Panel>
            </Block>
            <Block title="Facility card, live" note="Saving shows a toast">
              <LiveCard />
            </Block>
            <Block title="Card states">
              <div className="grid gap-6 sm:grid-cols-2">
                {[
                  { label: "Rest" },
                  { label: "Hover", force: "hover" as Force },
                  { label: "Focus", force: "focus" as Force },
                  { label: "Saved", saved: true },
                ].map((s) => (
                  <div key={s.label}>
                    <Caption>{s.label}</Caption>
                    <FacilityCard facility={facilities[0]} force={s.force} saved={s.saved} />
                  </div>
                ))}
              </div>
            </Block>
            <Block title="List rows" note="Closed stops stay on the line but can’t be opened">
              <div className="border border-line-text bg-line-surface">
                {[
                  { label: "Rest", facility: facilities[1] },
                  { label: "Hover", facility: facilities[2], force: "hover" as Force },
                  { label: "Focus", facility: facilities[1], force: "focus" as Force },
                  { label: "Selected", facility: facilities[0], selected: true },
                  { label: "Disabled", facility: facilities[3] },
                ].map((r, i) => (
                  <div key={r.label} className="grid grid-cols-[5.5rem_1fr] items-stretch border-b border-line-rule last:border-0">
                    <span className="flex items-center px-3 font-line-mono text-[11px] uppercase text-line-muted">{r.label}</span>
                    <ListRow facility={r.facility} index={i + 1} force={r.force} selected={r.selected} />
                  </div>
                ))}
              </div>
            </Block>
          </Section>

          {/* ── Overlays ──────────────────────────── */}
          <Section id="overlays" index={8} title="Detail panel & modal" intro="The detail panel is headed like a platform sign. It sits beside the list on wide screens and opens in a modal on phones. The modal traps focus, closes on Esc or a backdrop click, and returns focus when it closes.">
            <Block title="Modal, live">
              <ModalDemo />
            </Block>
            <Block title="Detail panel, inline">
              <div className="max-w-xl border border-line-text shadow-[8px_8px_0_#111315]">
                <DetailPanel
                  facility={facilities[0]}
                  actions={
                    <>
                      <Button>Save to your line</Button>
                      <Button variant="secondary">Get directions →</Button>
                    </>
                  }
                />
              </div>
            </Block>
          </Section>

          {/* ── Feedback ──────────────────────────── */}
          <Section id="feedback" index={9} title="Alerts & toast" intro="Alerts are service notices in the page flow. A toast confirms a quick action and disappears on its own after a few seconds.">
            <div className="space-y-3">
              <Alert tone="success" title="Saved to your line">Lakeshore Practice Tee is saved on this device until you close the tab.</Alert>
              <Alert tone="info" title="Winter schedule starts November 1">Most grass ranges move to mats or close. Domes open the same week.</Alert>
              <Alert tone="warning" title="Closing soon">South Shore Links Range closes in 40 minutes.</Alert>
              <Alert tone="error" title="Couldn’t load hours" action={<Button size="sm" variant="secondary">Retry</Button>}>
                Check your connection and try again.
              </Alert>
            </div>
            <Block title="Toast">
              <div className="max-w-md">
                <Toast action={<span className="font-line-sans text-sm font-bold underline decoration-2 underline-offset-4">Undo</span>}>
                  Saved to your line.
                </Toast>
              </div>
            </Block>
          </Section>

          {/* ── UI states ─────────────────────────── */}
          <Section id="states" index={10} title="UI states" intro="Every list and detail view needs all four. The copy reads like a service notice: what happened, then what to do next.">
            <div className="grid gap-6 lg:grid-cols-2">
              <Block title="Empty">
                <EmptyState title="No stops match those filters" action={<Button variant="secondary" size="sm">Clear filters</Button>}>
                  Try removing “Winter dome” or searching a nearby street.
                </EmptyState>
              </Block>
              <Block title="Loading">
                <div className="space-y-4">
                  <LoadingNote>Checking the board…</LoadingNote>
                  <FacilityCardSkeleton />
                </div>
              </Block>
              <Block title="Error">
                <ErrorState title="Service interruption" action={<Button size="sm">Try again</Button>}>
                  We couldn’t load the ranges. Your filters are saved.
                </ErrorState>
              </Block>
              <Block title="Success">
                <div className="space-y-4">
                  <Alert tone="success" title="Your line is saved">3 stops, sorted by distance from 60657.</Alert>
                  <div className="max-w-sm">
                    <Toast>Saved to your line.</Toast>
                  </div>
                </div>
              </Block>
            </div>
            <Block title="Try the flow" note="Search “zzz” for empty · “rain” for error">
              <Panel>
                <SearchFlow />
              </Panel>
            </Block>
          </Section>
        </main>
      </div>
    </div>
  );
}
