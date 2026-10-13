import type { Metadata } from "next";
import {
  Alert,
  Badge,
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
} from "@/components/design-systems/clubhouse";
import { colorRoles, decorativeOnly, elevationRoles, radii, spacing, typeRoles } from "@/components/design-systems/clubhouse/tokens";
import { contrastRatio } from "@/components/design-systems/contrast";
import { clubhouseFonts } from "@/components/moodboards/clubhouse/fonts";
import { LiveCard, LiveFilters, ModalDemo, SearchFlow } from "./demos";
import { Block, Panel, Section, StateGrid } from "./doc";

export const metadata: Metadata = {
  title: "Design System 01 — Clubhouse Almanac",
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

const controlStates: { label: string; force?: Force; disabled?: boolean }[] = [
  { label: "Rest" },
  { label: "Hover", force: "hover" },
  { label: "Focus", force: "focus" },
  { label: "Pressed", force: "active" },
  { label: "Disabled", disabled: true },
];

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
      <span className="font-club-mono text-sm text-club-text">{ratio.toFixed(2)}:1</span>
      <Badge tone={level === "Fails" ? "error" : "success"}>{level}</Badge>
    </span>
  );
}

export default function ClubhouseDesignSystem() {
  return (
    <div className={`${clubhouseFonts} flex-1 bg-club-bg text-club-text`}>
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <TextLink href="/" className="font-club-mono text-xs uppercase tracking-wider">
            ← Back to gallery
          </TextLink>
          <TextLink href="/moodboards/1" className="font-club-mono text-xs uppercase tracking-wider">
            Mood board 01
          </TextLink>
        </div>

        <header className="mt-8 pb-10">
          <p className="font-club-sign text-sm uppercase tracking-[0.35em] text-club-flag">Design System 01</p>
          <h1 className="mt-2 font-club-serif text-6xl leading-[0.95] text-club-accent md:text-7xl">Clubhouse Almanac</h1>
          <p className="mt-5 max-w-2xl font-club-serif text-lg leading-relaxed">
            The UI kit for a warm, worn-in guide to Chicago&rsquo;s practice ranges. Scorecard paper, fairway green,
            and flagstick red, with every component shown in every state. Hover, focus, and pressed are forced in the
            grids below, and everything is live, so tab through it or click around.
          </p>
        </header>

        <div className="grid gap-12 lg:grid-cols-[12rem_1fr]">
          <nav aria-label="Design system sections" className="lg:sticky lg:top-8 lg:self-start">
            <ol className="flex flex-wrap gap-x-4 gap-y-1 lg:flex-col">
              {nav.map(([id, label], i) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="flex gap-2 rounded-sm py-0.5 font-club-serif text-sm text-club-muted outline-none hover:text-club-accent focus-visible:ring-2 focus-visible:ring-club-focus"
                  >
                    <span className="font-club-mono text-club-flag">{String(i + 1).padStart(2, "0")}</span>
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
              kicker="Foundations"
              title="Color roles"
              intro="Components use role tokens, never raw palette colors. Each text and UI role is checked against the background it sits on: 4.5:1 for text, 3:1 for control edges and the focus ring. Ratios are computed from the token values."
            >
              {colorRoles.map((group) => (
                <Block key={group.group} title={group.group}>
                  <div className="relative overflow-x-auto rounded border border-club-rule bg-club-surface">
                    <table className="w-full min-w-[40rem] table-fixed border-collapse text-left">
                      <colgroup>
                        <col className="w-[30%]" />
                        <col className="w-[18%]" />
                        <col className="w-[32%]" />
                        <col className="w-[20%]" />
                      </colgroup>
                      <thead>
                        <tr className="border-b border-club-rule font-club-sign text-[11px] uppercase tracking-[0.2em] text-club-muted">
                          <th className="px-4 py-2 font-medium">Role</th>
                          <th className="px-4 py-2 font-medium">Token</th>
                          <th className="px-4 py-2 font-medium">Use</th>
                          <th className="px-4 py-2 font-medium">Contrast</th>
                        </tr>
                      </thead>
                      <tbody>
                        {group.roles.map((r) => (
                          <tr key={r.name} className="border-b border-club-rule last:border-0">
                            <td className="px-4 py-3">
                              <span className="flex items-center gap-3">
                                <span
                                  className="grid size-10 shrink-0 place-items-center rounded-sm border border-club-edge font-club-serif text-sm"
                                  style={{ backgroundColor: r.on?.hex ?? r.hex, color: r.on ? r.hex : undefined }}
                                >
                                  {r.on ? "Aa" : ""}
                                </span>
                                <span className="font-club-serif text-base">{r.name}</span>
                              </span>
                            </td>
                            <td className="px-4 py-3 font-club-mono text-xs">
                              {r.token}
                              <br />
                              <span className="text-club-muted">{r.hex}</span>
                            </td>
                            <td className="px-4 py-3 font-club-serif text-sm text-club-muted">{r.usage}</td>
                            <td className="px-4 py-3">
                              {r.on ? (
                                <span className="flex flex-col gap-1">
                                  <ContrastBadge fg={r.hex} bg={r.on.hex} min={r.on.min} />
                                  <span className="font-club-mono text-[11px] text-club-muted">on {r.on.name}</span>
                                </span>
                              ) : (
                                <span className="font-club-mono text-xs text-club-muted">—</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Block>
              ))}
              <Block title="Decorative only" note="Never used for text or control edges">
                <div className="grid gap-3 sm:grid-cols-3">
                  {decorativeOnly.map((d) => (
                    <div key={d.name} className="flex items-center gap-3 rounded border border-club-rule bg-club-surface p-3">
                      <span className="size-10 shrink-0 rounded-sm" style={{ backgroundColor: d.hex }} />
                      <span>
                        <span className="block font-club-serif text-base">
                          {d.name} <span className="font-club-mono text-xs text-club-muted">{d.hex}</span>
                        </span>
                        <span className="font-club-serif text-sm text-club-muted">{d.note}</span>
                      </span>
                    </div>
                  ))}
                </div>
              </Block>
            </Section>

            {/* ── Type ──────────────────────────────── */}
            <Section
              id="type"
              kicker="Foundations"
              title="Type roles"
              intro="Fraunces carries reading and headings, Oswald handles labels and buttons, Courier Prime sets data. Caveat is for decorative margin notes only and never holds information the reader needs."
            >
              <div className="divide-y divide-club-rule rounded border border-club-rule bg-club-surface">
                {typeRoles.map((t) => (
                  <div key={t.name} className="grid gap-2 px-5 py-4 md:grid-cols-[11rem_1fr]">
                    <div>
                      <p className="font-club-serif text-base font-semibold">{t.name}</p>
                      <p className="font-club-mono text-xs text-club-muted">{t.spec}</p>
                    </div>
                    <p className={`${t.className} min-w-0 text-club-text`}>{t.sample}</p>
                  </div>
                ))}
              </div>
            </Section>

            {/* ── Space & shape ─────────────────────── */}
            <Section id="space" kicker="Foundations" title="Spacing & shape" intro="A 4px base grid. Corners stay nearly square, like printed cards, and shadows read as paper resting on paper.">
              <Block title="Spacing scale" note="Tailwind steps · 4px base">
                <Panel className="space-y-2">
                  {spacing.map((s) => (
                    <div key={s.token} className="grid grid-cols-[3rem_4rem_1fr] items-center gap-3">
                      <span className="font-club-mono text-xs">{s.token}</span>
                      <span className="font-club-mono text-xs text-club-muted">{s.px}px</span>
                      <span className="flex items-center gap-3">
                        <span className="h-3 shrink-0 bg-club-accent" style={{ width: s.px }} />
                        <span className="font-club-serif text-sm text-club-muted">{s.use}</span>
                      </span>
                    </div>
                  ))}
                </Panel>
              </Block>
              <div className="grid gap-10 md:grid-cols-2">
                <Block title="Radius">
                  <div className="grid grid-cols-2 gap-3">
                    {radii.map((r) => (
                      <div key={r.name} className="flex items-center gap-3 rounded border border-club-rule bg-club-surface p-3">
                        <span className={`size-12 shrink-0 border-2 border-club-accent bg-club-accent/10 ${r.className}`} />
                        <span>
                          <span className="block font-club-serif text-base">
                            {r.name} <span className="font-club-mono text-xs text-club-muted">{r.value}</span>
                          </span>
                          <span className="font-club-serif text-sm text-club-muted">{r.use}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </Block>
                <Block title="Lines & elevation">
                  <div className="grid grid-cols-2 gap-4">
                    {elevationRoles.map((e) => (
                      <div key={e.name} className={`rounded border border-club-rule bg-club-surface p-4 ${e.className}`}>
                        <p className="font-club-serif text-base">{e.name}</p>
                        <p className="font-club-serif text-sm text-club-muted">{e.use}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 space-y-3 rounded border border-club-rule bg-club-surface p-4 font-club-mono text-xs text-club-muted">
                    <p className="border-b border-club-rule pb-2">1px rule · dividers</p>
                    <p className="border-b border-club-edge pb-2">1px edge · control outlines</p>
                    <p className="border-b-[3px] border-double border-club-accent pb-2">3px double · section heads</p>
                  </div>
                </Block>
              </div>
            </Section>

            {/* ── Buttons & links ───────────────────── */}
            <Section id="actions" kicker="Components" title="Buttons & links" intro="One primary action per view. Secondary for alternatives, ghost for low-stakes actions, danger for removing things. Pressed buttons sink 1px.">
              <Block title="Buttons" note="Medium (44px) is the default; small (36px) for dense areas">
                <StateGrid
                  columns={["Primary", "Secondary", "Ghost", "Danger"]}
                  rows={[...controlStates, { label: "Loading", loading: true }].map((st) => ({
                    label: st.label,
                    cells: (["primary", "secondary", "ghost", "danger"] as const).map((v) => (
                      <Button
                        key={v}
                        variant={v}
                        force={"force" in st ? st.force : undefined}
                        disabled={"disabled" in st ? st.disabled : undefined}
                        loading={"loading" in st}
                      >
                        {v === "danger" ? "Remove" : "Search"}
                      </Button>
                    )),
                  }))}
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
              <Block title="Links" note="Underlined at rest so they never rely on color alone">
                <StateGrid
                  columns={["Rest", "Hover", "Focus", "Pressed", "External"]}
                  rows={[
                    {
                      cells: [
                        <TextLink key="r" href="#actions" className="font-club-serif text-base">Hours &amp; buckets</TextLink>,
                        <TextLink key="h" href="#actions" force="hover" className="font-club-serif text-base">Hours &amp; buckets</TextLink>,
                        <TextLink key="f" href="#actions" force="focus" className="font-club-serif text-base">Hours &amp; buckets</TextLink>,
                        <TextLink key="p" href="#actions" force="active" className="font-club-serif text-base">Hours &amp; buckets</TextLink>,
                        <TextLink key="e" href="https://www.chicagoparkdistrict.com" external className="font-club-serif text-base">Park District</TextLink>,
                      ],
                    },
                  ]}
                />
              </Block>
            </Section>

            {/* ── Forms ─────────────────────────────── */}
            <Section id="forms" kicker="Components" title="Form controls" intro="Labels always sit above fields, in Oswald caps. Errors show a message and an icon along with the red edge, so they never rely on color alone.">
              <Block title="Text input">
                <div className="grid gap-5 rounded border border-club-rule bg-club-surface p-5 sm:grid-cols-2 lg:grid-cols-3">
                  <TextInput label="Rest" placeholder="Your ZIP code" hint="We use it to sort by distance." />
                  <TextInput label="Hover" placeholder="Your ZIP code" force="hover" />
                  <TextInput label="Focus" placeholder="Your ZIP code" force="focus" />
                  <TextInput label="Filled" defaultValue="60614" />
                  <TextInput label="Error" defaultValue="606" error="ZIP codes have five digits." />
                  <TextInput label="Success" defaultValue="60614" success="Sorted by distance from 60614." />
                  <TextInput label="Disabled" placeholder="Your ZIP code" disabled />
                </div>
              </Block>
              <Block title="Search field" note="Clear button appears once there is text">
                <div className="grid gap-5 rounded border border-club-rule bg-club-surface p-5 sm:grid-cols-2">
                  <SearchField label="Search, empty" placeholder="Search ranges or neighborhoods" />
                  <SearchField label="Search, filled" defaultValue="Lincoln Park" />
                  <SearchField label="Search, focus" placeholder="Search ranges" force="focus" />
                  <SearchField label="Search, disabled" placeholder="Search ranges" disabled />
                </div>
              </Block>
              <Block title="Select">
                <div className="grid gap-5 rounded border border-club-rule bg-club-surface p-5 sm:grid-cols-2 lg:grid-cols-3">
                  <Select label="Rest" options={neighborhoods} />
                  <Select label="Hover" options={neighborhoods} force="hover" />
                  <Select label="Focus" options={neighborhoods} force="focus" />
                  <Select label="Error" options={neighborhoods} error="Pick a neighborhood to continue." />
                  <Select label="Disabled" options={neighborhoods} disabled />
                </div>
              </Block>
              <Block title="Checkboxes">
                <StateGrid
                  columns={["Rest", "Hover", "Focus", "Disabled"]}
                  rows={[
                    { label: "Unchecked", checked: false, indeterminate: false },
                    { label: "Checked", checked: true, indeterminate: false },
                    { label: "Mixed", checked: false, indeterminate: true },
                  ].map((r) => ({
                    label: r.label,
                    cells: [undefined, "hover", "focus", "disabled"].map((s) => (
                      <Checkbox
                        key={s ?? "rest"}
                        label={r.indeterminate ? "All amenities" : "Grass tees"}
                        defaultChecked={r.checked}
                        indeterminate={r.indeterminate}
                        force={s === "hover" || s === "focus" ? s : undefined}
                        disabled={s === "disabled"}
                      />
                    )),
                  }))}
                />
              </Block>
              <Block title="Radios">
                <StateGrid
                  columns={["Rest", "Hover", "Focus", "Disabled"]}
                  rows={[
                    { label: "Unselected", checked: false },
                    { label: "Selected", checked: true },
                  ].map((r) => ({
                    label: r.label,
                    cells: [undefined, "hover", "focus", "disabled"].map((s) => (
                      <Radio
                        key={s ?? "rest"}
                        name={`radio-${r.label}-${s ?? "rest"}`}
                        label="Small bucket"
                        description="40 balls"
                        defaultChecked={r.checked}
                        force={s === "hover" || s === "focus" ? s : undefined}
                        disabled={s === "disabled"}
                      />
                    )),
                  }))}
                />
              </Block>
              <Block title="Toggles" note="role=switch · label is clickable">
                <StateGrid
                  columns={["Rest", "Hover", "Focus", "Disabled"]}
                  rows={[
                    { label: "Off", on: false },
                    { label: "On", on: true },
                  ].map((r) => ({
                    label: r.label,
                    cells: [undefined, "hover", "focus", "disabled"].map((s) => (
                      <Toggle
                        key={s ?? "rest"}
                        label="Lit at night"
                        defaultOn={r.on}
                        force={s === "hover" || s === "focus" ? s : undefined}
                        disabled={s === "disabled"}
                      />
                    )),
                  }))}
                />
              </Block>
            </Section>

            {/* ── Navigation ────────────────────────── */}
            <Section id="navigation" kicker="Components" title="Tabs & filter chips" intro="Tabs switch between views of one facility. Chips narrow a list and can be combined. Use the arrow keys to move between tabs.">
              <Block title="Tabs, live">
                <Panel>
                  <Tabs
                    label="Facility sections"
                    items={[
                      { id: "overview", label: "Overview", panel: <p className="font-club-serif text-base">{facilities[0].summary}</p> },
                      {
                        id: "hours",
                        label: "Hours",
                        panel: (
                          <p className="font-club-mono text-sm">
                            {facilities[0].schedule.map((s) => `${s.days}: ${s.hours}`).join(" · ")}
                          </p>
                        ),
                      },
                      { id: "reviews", label: "Reviews", count: 24, panel: <p className="font-club-serif text-base">“The upper deck at sunset is worth the wait.”</p> },
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
                        <div key={t.label} role="tablist" aria-label={`${t.label} tab example`} className="border-b border-club-rule">
                          <Tab force={t.force} selected={t.selected} disabled={t.disabled} tabIndex={-1}>
                            Hours
                          </Tab>
                        </div>
                      )),
                    },
                  ]}
                />
              </Block>
              <Block title="Filter chips, live">
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
                        <FilterChip key="r">Grass tees</FilterChip>,
                        <FilterChip key="h" force="hover">Grass tees</FilterChip>,
                        <FilterChip key="f" force="focus">Grass tees</FilterChip>,
                        <FilterChip key="p" force="active">Grass tees</FilterChip>,
                        <FilterChip key="s" selected>Grass tees</FilterChip>,
                        <FilterChip key="d" disabled>Grass tees</FilterChip>,
                      ],
                    },
                  ]}
                  minCell="7rem"
                />
              </Block>
            </Section>

            {/* ── Content ───────────────────────────── */}
            <Section id="content" kicker="Components" title="Cards, rows & badges" intro="A facility shows up as a card in grid views and as a row in lists. The whole card is one link, and secondary actions sit on top of it.">
              <Block title="Badges">
                <Panel className="flex flex-wrap gap-2">
                  <Badge tone="success" dot>Open now</Badge>
                  <Badge tone="warning" dot>Closing soon</Badge>
                  <Badge tone="info" dot>Seasonal</Badge>
                  <Badge tone="error" dot>Closed today</Badge>
                  <Badge tone="neutral">Closed</Badge>
                  <Badge tone="accent">Staff pick</Badge>
                  <Badge tone="flag">New</Badge>
                  <Badge tone="outline">Heated bays</Badge>
                </Panel>
              </Block>
              <Block title="Facility card, live" note="Adding it shows a success toast">
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
                      <p className="mb-2 font-club-sign text-[11px] font-medium uppercase tracking-[0.2em] text-club-muted">{s.label}</p>
                      <FacilityCard facility={facilities[0]} force={s.force} saved={s.saved} />
                    </div>
                  ))}
                </div>
              </Block>
              <Block title="List rows" note="Closed facilities stay visible but can’t be opened">
                <div className="divide-y divide-club-rule overflow-hidden rounded border border-club-rule bg-club-surface">
                  {[
                    { label: "Rest", facility: facilities[1] },
                    { label: "Hover", facility: facilities[2], force: "hover" as Force },
                    { label: "Focus", facility: facilities[1], force: "focus" as Force },
                    { label: "Selected", facility: facilities[0], selected: true },
                    { label: "Disabled", facility: facilities[3] },
                  ].map((r, i) => (
                    <div key={r.label} className="grid grid-cols-1 items-center sm:grid-cols-[5.5rem_minmax(0,1fr)]">
                      <span className="px-3 pt-3 font-club-sign text-[11px] font-medium uppercase tracking-[0.15em] text-club-muted sm:pt-0">{r.label}</span>
                      <ListRow facility={r.facility} index={i + 1} force={r.force} selected={r.selected} />
                    </div>
                  ))}
                </div>
              </Block>
            </Section>

            {/* ── Overlays ──────────────────────────── */}
            <Section id="overlays" kicker="Components" title="Detail panel & modal" intro="The detail panel holds everything about one facility. On wide screens it sits beside the list; on phones, or from a card, it opens in a modal. The modal traps focus, closes on Esc or a backdrop click, and returns focus when it closes.">
              <Block title="Modal, live">
                <ModalDemo />
              </Block>
              <Block title="Detail panel, inline">
                <div className="max-w-xl overflow-hidden rounded border border-club-rule shadow-[0_24px_60px_-20px_rgba(22,54,42,0.6)]">
                  <DetailPanel
                    facility={facilities[0]}
                    actions={
                      <>
                        <Button>Add to practice plan</Button>
                        <Button variant="secondary">Get directions</Button>
                      </>
                    }
                  />
                </div>
              </Block>
            </Section>

            {/* ── Feedback ──────────────────────────── */}
            <Section id="feedback" kicker="Components" title="Alerts & toast" intro="Alerts sit in the page flow. A toast confirms a quick action and disappears on its own after a few seconds.">
              <div className="space-y-3">
                <Alert tone="success" title="Added to your practice plan">Lakeshore Practice Tee is saved on this device until you close the tab.</Alert>
                <Alert tone="info" title="Winter hours start November 1">Most grass ranges move to mats or close. Domes open the same week.</Alert>
                <Alert tone="warning" title="Closing soon">South Shore Links Range closes in 40 minutes.</Alert>
                <Alert tone="error" title="Couldn’t load hours" action={<Button size="sm" variant="secondary">Retry</Button>}>
                  Check your connection and try again.
                </Alert>
              </div>
              <Block title="Toast">
                <div className="max-w-md">
                  <Toast action={<span className="font-club-sign text-xs uppercase tracking-[0.15em] underline underline-offset-4">Undo</span>}>
                    Added to your practice plan.
                  </Toast>
                </div>
              </Block>
            </Section>

            {/* ── UI states ─────────────────────────── */}
            <Section id="states" kicker="Patterns" title="UI states" intro="Every list and detail view needs all four. Copy stays plain and says what to do next.">
              <div className="grid gap-6 lg:grid-cols-2">
                <Block title="Empty">
                  <EmptyState title="No ranges match those filters" action={<Button variant="secondary" size="sm">Clear filters</Button>}>
                    Try removing “Heated bays” or widening the distance.
                  </EmptyState>
                </Block>
                <Block title="Loading">
                  <div className="space-y-4">
                    <LoadingNote>Raking the bunkers…</LoadingNote>
                    <FacilityCardSkeleton />
                  </div>
                </Block>
                <Block title="Error">
                  <ErrorState title="Couldn’t load the ranges" action={<Button size="sm">Try again</Button>}>
                    Something went wrong on our end. Your filters are saved.
                  </ErrorState>
                </Block>
                <Block title="Success">
                  <div className="space-y-4">
                    <Alert tone="success" title="Practice plan saved">3 ranges, sorted by distance from 60614.</Alert>
                    <div className="max-w-sm">
                      <Toast>Added to your practice plan.</Toast>
                    </div>
                  </div>
                </Block>
              </div>
              <Block title="Try the flow" note="Search “zzz” for empty, “rain” for error">
                <Panel>
                  <SearchFlow />
                </Panel>
              </Block>
            </Section>
          </main>
        </div>
      </div>
    </div>
  );
}
