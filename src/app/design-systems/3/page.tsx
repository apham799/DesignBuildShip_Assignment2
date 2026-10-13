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
  tabTrack,
  Tabs,
  TextInput,
  TextLink,
  Toast,
  Toggle,
  type Force,
} from "@/components/design-systems/night";
import { colorRoles, elevationRoles, radii, spacing, typeRoles } from "@/components/design-systems/night/tokens";
import { nightSystemFonts } from "@/components/design-systems/night/fonts";
import { contrastRatio } from "@/components/design-systems/contrast";
import { LiveCard, LiveFilters, ModalDemo, SearchFlow } from "./demos";
import { Block, Caption, Panel, Section, StateGrid } from "./doc";

export const metadata: Metadata = {
  title: "Design System 03 — Under the Lights",
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
      <span className="font-night-mono text-sm font-bold tabular-nums">{ratio.toFixed(2)}:1</span>
      <Badge tone={level === "Fails" ? "error" : "success"}>{level}</Badge>
    </span>
  );
}

export default function NightDesignSystem() {
  return (
    <div
      className={`${nightSystemFonts} flex-1 bg-night-bg font-night-body text-night-text`}
      style={{
        background:
          "radial-gradient(60% 30% at 10% 0%, rgba(255,181,71,0.10), transparent 70%), radial-gradient(50% 30% at 90% 5%, rgba(92,225,230,0.10), transparent 70%), #07090F",
      }}
    >
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-wrap gap-x-6 gap-y-2 font-night-mono text-xs uppercase tracking-[0.1em]">
          <TextLink href="/">← Back to gallery</TextLink>
          <TextLink href="/moodboards/3">Mood board 03</TextLink>
        </div>

        <header className="mt-10 grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-end">
          <div>
            <p className="font-night-mono text-xs uppercase tracking-[0.3em] text-night-warning">Design System 03</p>
            <h1 className="mt-3 font-night-display text-6xl font-black uppercase leading-[0.9] md:text-7xl">
              Under the
              <br />
              <span className="text-night-accent" style={{ textShadow: "0 0 32px rgba(200,255,77,0.45)" }}>
                Lights
              </span>
            </h1>
          </div>
          <p className="font-night-body text-lg leading-relaxed text-night-muted">
            The UI kit for a space-arcade guide to practice. Dark surfaces, floodlight-white text, lime for action, cyan
            for selection and focus, violet for saved. Light is the elevation system: things glow instead of casting
            shadows. Every component is shown in every state.
          </p>
        </header>

        <div className="mt-14 grid gap-12 lg:grid-cols-[12rem_1fr]">
          <nav aria-label="Design system sections" className="lg:sticky lg:top-8 lg:self-start">
            <ol className="flex flex-wrap gap-1 lg:flex-col">
              {nav.map(([id, label], i) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="flex items-center gap-3 rounded-full px-3 py-1.5 text-sm text-night-muted outline-none transition-colors hover:bg-white/5 hover:text-night-text focus-visible:ring-2 focus-visible:ring-night-focus"
                  >
                    <span className="font-night-mono text-[10px] text-night-accent">{String(i + 1).padStart(2, "0")}</span>
                    {label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <main className="min-w-0 space-y-20">
            {/* ── Color ─────────────────────────────── */}
            <Section
              id="colors"
              index={1}
              title="Color roles"
              intro="On a dark ground, contrast comes easily, so the job is keeping roles distinct: lime means go, cyan means selected or focused, violet means saved. Every text and UI role is checked against the surface it sits on, with ratios computed from the token values."
            >
              {colorRoles.map((group) => (
                <Block key={group.group} title={group.group}>
                  <div className="relative overflow-x-auto rounded-3xl border border-night-rule bg-night-surface">
                    <table className="w-full min-w-[40rem] table-fixed border-collapse text-left">
                      <colgroup>
                        <col className="w-[30%]" />
                        <col className="w-[20%]" />
                        <col className="w-[30%]" />
                        <col className="w-[20%]" />
                      </colgroup>
                      <thead>
                        <tr className="border-b border-night-rule font-night-mono text-[10px] uppercase tracking-[0.12em] text-night-muted">
                          <th className="px-5 py-3 font-normal">Role</th>
                          <th className="px-5 py-3 font-normal">Token</th>
                          <th className="px-5 py-3 font-normal">Use</th>
                          <th className="px-5 py-3 font-normal">Contrast</th>
                        </tr>
                      </thead>
                      <tbody>
                        {group.roles.map((r) => (
                          <tr key={r.name} className="border-b border-night-rule last:border-0">
                            <td className="px-5 py-3">
                              <span className="flex items-center gap-3">
                                <span
                                  className="grid size-10 shrink-0 place-items-center rounded-xl border border-night-rule font-night-display text-xs font-bold"
                                  style={{ backgroundColor: r.on?.hex ?? r.hex, color: r.on ? r.hex : undefined }}
                                >
                                  {r.on ? "Aa" : ""}
                                </span>
                                <span className="text-base">{r.name}</span>
                              </span>
                            </td>
                            <td className="px-5 py-3 font-night-mono text-xs">
                              {r.token}
                              <br />
                              <span className="text-night-muted">{r.hex}</span>
                            </td>
                            <td className="px-5 py-3 text-sm text-night-muted">{r.usage}</td>
                            <td className="px-5 py-3">
                              {r.on ? (
                                <span className="flex flex-col gap-1">
                                  <ContrastBadge fg={r.hex} bg={r.on.hex} min={r.on.min} />
                                  <span className="font-night-mono text-[10px] text-night-muted">on {r.on.name}</span>
                                </span>
                              ) : (
                                <span className="font-night-mono text-xs text-night-muted">—</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Block>
              ))}
            </Section>

            {/* ── Type ──────────────────────────────── */}
            <Section id="type" index={2} title="Type roles" intro="Unbounded is wide and loud, so it's kept to headings and buttons. Space Grotesk handles reading, JetBrains Mono sets labels and launch-monitor numbers, and Instrument Serif italic appears only as an occasional accent.">
              <div className="divide-y divide-night-rule rounded-3xl border border-night-rule bg-night-surface">
                {typeRoles.map((t) => (
                  <div key={t.name} className="grid gap-2 px-6 py-4 md:grid-cols-[11rem_1fr]">
                    <div>
                      <p className="font-night-display text-sm font-semibold">{t.name}</p>
                      <p className="font-night-mono text-[10px] text-night-muted">{t.spec}</p>
                    </div>
                    <p className={`${t.className} min-w-0`}>{t.sample}</p>
                  </div>
                ))}
              </div>
            </Section>

            {/* ── Space & shape ─────────────────────── */}
            <Section id="space" index={3} title="Spacing & shape" intro="A 4px grid. Shapes are soft and rounded, like screens and arcade buttons. Depth comes from lighter surfaces and glow, never drop shadows.">
              <Block title="Spacing scale" note="Tailwind steps · 4px base">
                <Panel className="space-y-2">
                  {spacing.map((s) => (
                    <div key={s.token} className="grid grid-cols-[3rem_4rem_1fr] items-center gap-3">
                      <span className="font-night-mono text-xs">{s.token}</span>
                      <span className="font-night-mono text-xs text-night-muted">{s.px}px</span>
                      <span className="flex items-center gap-3">
                        <span className="h-3 shrink-0 rounded-full bg-night-accent shadow-[0_0_10px_-2px_rgba(200,255,77,0.8)]" style={{ width: s.px }} />
                        <span className="text-sm text-night-muted">{s.use}</span>
                      </span>
                    </div>
                  ))}
                </Panel>
              </Block>
              <div className="grid gap-10 md:grid-cols-2">
                <Block title="Radius">
                  <div className="grid grid-cols-2 gap-3">
                    {radii.map((r) => (
                      <div key={r.name} className="flex items-center gap-3 rounded-2xl border border-night-rule bg-night-surface p-3">
                        <span className={`size-12 shrink-0 border-2 border-night-select bg-night-select/10 ${r.className}`} />
                        <span>
                          <span className="block text-sm font-semibold">
                            {r.name} <span className="font-night-mono text-[10px] font-normal text-night-muted">{r.value}</span>
                          </span>
                          <span className="text-xs text-night-muted">{r.use}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </Block>
                <Block title="Surfaces & glow">
                  <div className="grid grid-cols-2 gap-4">
                    {elevationRoles.map((e) => (
                      <div key={e.name} className={`rounded-2xl p-4 ${e.className}`}>
                        <p className="font-night-display text-sm font-semibold">{e.name}</p>
                        <p className="text-xs text-night-muted">{e.use}</p>
                      </div>
                    ))}
                  </div>
                </Block>
              </div>
            </Section>

            {/* ── Buttons & links ───────────────────── */}
            <Section id="actions" index={4} title="Buttons & links" intro="Lime is the one “go” button per view. Secondary is outlined cyan, ghost is for low-stakes actions, and danger is coral. Hover brightens and glows, and pressed buttons shrink slightly, like pushing a real arcade button.">
              <Block title="Buttons" note="Medium 48px is the default · small 36px">
                <StateGrid
                  columns={["Primary", "Secondary", "Ghost", "Danger"]}
                  rows={controlStates.map((st) => ({
                    label: st.label,
                    cells: (["primary", "secondary", "ghost", "danger"] as const).map((v) => (
                      <Button key={v} variant={v} force={st.force} disabled={st.disabled} loading={st.loading}>
                        {v === "danger" ? "Remove" : "Play"}
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
              <Block title="Links" note="Underlined at rest · hover turns lime">
                <StateGrid
                  columns={["Rest", "Hover", "Focus", "Pressed", "External"]}
                  rows={[
                    {
                      cells: [
                        <TextLink key="r" href="#actions">Hours &amp; buckets</TextLink>,
                        <TextLink key="h" href="#actions" force="hover">Hours &amp; buckets</TextLink>,
                        <TextLink key="f" href="#actions" force="focus">Hours &amp; buckets</TextLink>,
                        <TextLink key="p" href="#actions" force="active">Hours &amp; buckets</TextLink>,
                        <TextLink key="e" href="https://www.adlerplanetarium.org" external>Adler Planetarium</TextLink>,
                      ],
                    },
                  ]}
                  minCell="7.5rem"
                />
              </Block>
            </Section>

            {/* ── Forms ─────────────────────────────── */}
            <Section id="forms" index={5} title="Form controls" intro="Fields sit a step darker than the card, like a screen set into a console. Focus lights the edge cyan. Errors pair a coral edge with a marked message, so they never rely on color alone.">
              <Block title="Text input">
                <div className="grid gap-5 rounded-3xl border border-night-rule bg-night-surface p-6 sm:grid-cols-2 lg:grid-cols-3">
                  <TextInput label="Rest" placeholder="Your ZIP code" hint="We sort ranges by distance." />
                  <TextInput label="Hover" placeholder="Your ZIP code" force="hover" />
                  <TextInput label="Focus" placeholder="Your ZIP code" force="focus" />
                  <TextInput label="Filled" defaultValue="60614" />
                  <TextInput label="Error" defaultValue="606" error="ZIP codes have five digits." />
                  <TextInput label="Success" defaultValue="60614" success="Sorted from 60614." />
                  <TextInput label="Disabled" placeholder="Your ZIP code" disabled />
                </div>
              </Block>
              <Block title="Search field" note="Clear button appears once there is text">
                <div className="grid gap-5 rounded-3xl border border-night-rule bg-night-surface p-6 sm:grid-cols-2">
                  <SearchField label="Search, empty" placeholder="Search ranges" />
                  <SearchField label="Search, filled" defaultValue="Lincoln Park" />
                  <SearchField label="Search, focus" placeholder="Search ranges" force="focus" />
                  <SearchField label="Search, disabled" placeholder="Search ranges" disabled />
                </div>
              </Block>
              <Block title="Select">
                <div className="grid gap-5 rounded-3xl border border-night-rule bg-night-surface p-6 sm:grid-cols-2 lg:grid-cols-3">
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
                        label={r.mixed ? "All amenities" : "Lit at night"}
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
                        name={`ds3-radio-${r.label}-${s}`}
                        label="Small bucket"
                        description="40 balls"
                        defaultChecked={r.checked}
                        force={toForce(s)}
                        disabled={s === "Disabled"}
                      />
                    )),
                  }))}
                />
              </Block>
              <Block title="Toggles" note="role=switch · track lights up when on">
                <StateGrid
                  columns={[...inputStates]}
                  rows={[
                    { label: "Off", on: false },
                    { label: "On", on: true },
                  ].map((r) => ({
                    label: r.label,
                    cells: inputStates.map((s) => (
                      <Toggle key={s} label="Lit at night" defaultOn={r.on} force={toForce(s)} disabled={s === "Disabled"} />
                    )),
                  }))}
                />
              </Block>
            </Section>

            {/* ── Navigation ────────────────────────── */}
            <Section id="navigation" index={6} title="Tabs & filter chips" intro="Tabs are pill segments in a dark track, and the selected one lights up white. Selected chips glow cyan. Use the arrow keys to move between tabs.">
              <Block title="Tabs, live">
                <Panel>
                  <Tabs
                    label="Range sections"
                    items={[
                      { id: "overview", label: "Overview", panel: <p className="text-base">{facilities[0].summary}</p> },
                      {
                        id: "hours",
                        label: "Hours",
                        panel: <p className="font-night-mono text-sm">{facilities[0].schedule.map((s) => `${s.days}: ${s.hours}`).join(" · ")}</p>,
                      },
                      { id: "scores", label: "Reviews", count: 24, panel: <p className="font-night-serif text-2xl italic">“The upper deck at dusk is unreal.”</p> },
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
                        <div key={t.label} role="tablist" aria-label={`${t.label} tab example`} className={tabTrack}>
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
                        <FilterChip key="r">Indoor</FilterChip>,
                        <FilterChip key="h" force="hover">Indoor</FilterChip>,
                        <FilterChip key="f" force="focus">Indoor</FilterChip>,
                        <FilterChip key="p" force="active">Indoor</FilterChip>,
                        <FilterChip key="s" selected>Indoor</FilterChip>,
                        <FilterChip key="d" disabled>Indoor</FilterChip>,
                      ],
                    },
                  ]}
                  minCell="7rem"
                />
              </Block>
            </Section>

            {/* ── Content ───────────────────────────── */}
            <Section id="content" index={7} title="Cards, rows & badges" intro="A card is a lit screen for one range, with launch-monitor readouts for its numbers. Rows read like a high-score table. Hover glows lime, selection glows cyan, and saved glows violet.">
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
              <Block title="List rows" note="Closed ranges stay listed but can’t be opened">
                <div className="divide-y divide-night-rule overflow-hidden rounded-3xl border border-night-rule bg-night-surface">
                  {[
                    { label: "Rest", facility: facilities[1] },
                    { label: "Hover", facility: facilities[2], force: "hover" as Force },
                    { label: "Focus", facility: facilities[1], force: "focus" as Force },
                    { label: "Selected", facility: facilities[0], selected: true },
                    { label: "Disabled", facility: facilities[3] },
                  ].map((r, i) => (
                    <div key={r.label} className="grid grid-cols-1 items-center sm:grid-cols-[5.5rem_minmax(0,1fr)]">
                      <span className="px-4 pt-3 font-night-mono text-[10px] uppercase tracking-[0.1em] text-night-muted sm:pt-0">{r.label}</span>
                      <ListRow facility={r.facility} index={i + 1} force={r.force} selected={r.selected} />
                    </div>
                  ))}
                </div>
              </Block>
            </Section>

            {/* ── Overlays ──────────────────────────── */}
            <Section id="overlays" index={8} title="Detail panel & modal" intro="The detail panel holds everything about one range. It sits beside the list on wide screens and opens in a modal on phones. The modal blurs the page behind it, traps focus, closes on Esc or a backdrop click, and returns focus when it closes.">
              <Block title="Modal, live">
                <ModalDemo />
              </Block>
              <Block title="Detail panel, inline">
                <div className="max-w-xl overflow-hidden rounded-3xl border border-night-rule bg-night-surface">
                  <DetailPanel
                    facility={facilities[0]}
                    actions={
                      <>
                        <Button>Save this range</Button>
                        <Button variant="secondary">Directions</Button>
                      </>
                    }
                  />
                </div>
              </Block>
            </Section>

            {/* ── Feedback ──────────────────────────── */}
            <Section id="feedback" index={9} title="Alerts & toast" intro="Alerts sit in the page flow with a glowing status mark. A toast confirms a quick action and disappears on its own after a few seconds.">
              <div className="space-y-3">
                <Alert tone="success" title="Saved">Lakeshore Practice Tee is saved on this device until you close the tab.</Alert>
                <Alert tone="info" title="Winter hours start November 1">Most grass ranges move to mats or close. Domes open the same week.</Alert>
                <Alert tone="warning" title="Closing soon">South Shore Links Range closes in 40 minutes.</Alert>
                <Alert tone="error" title="Couldn’t load hours" action={<Button size="sm" variant="secondary">Retry</Button>}>
                  Check your connection and try again.
                </Alert>
              </div>
              <Block title="Toast">
                <div className="max-w-md">
                  <Toast action={<span className="font-night-mono text-[11px] uppercase tracking-[0.1em] text-night-select underline underline-offset-4">Undo</span>}>
                    Saved. Nice shot.
                  </Toast>
                </div>
              </Block>
            </Section>

            {/* ── UI states ─────────────────────────── */}
            <Section id="states" index={10} title="UI states" intro="Every list and detail view needs all four. The copy can be playful in titles but stays plain in the explanation, so people always know what to do next.">
              <div className="grid gap-6 lg:grid-cols-2">
                <Block title="Empty">
                  <EmptyState title="Nothing in range" action={<Button variant="secondary" size="sm">Clear filters</Button>}>
                    No ranges match those filters. Try turning off “Heated bays.”
                  </EmptyState>
                </Block>
                <Block title="Loading">
                  <div className="space-y-4">
                    <LoadingNote>Warming up the lights…</LoadingNote>
                    <FacilityCardSkeleton />
                  </div>
                </Block>
                <Block title="Error">
                  <ErrorState title="Signal lost" action={<Button size="sm">Try again</Button>}>
                    We couldn’t load the ranges. Your filters are saved.
                  </ErrorState>
                </Block>
                <Block title="Success">
                  <div className="space-y-4">
                    <Alert tone="success" title="Plan saved">3 ranges, sorted by distance from 60614.</Alert>
                    <div className="max-w-sm">
                      <Toast>Saved. Nice shot.</Toast>
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
    </div>
  );
}
