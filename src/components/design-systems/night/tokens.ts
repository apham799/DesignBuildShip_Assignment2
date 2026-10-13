// Design System 03 — Under the Lights. Token values mirror globals.css.

export type ColorRole = {
  name: string;
  token: string;
  hex: string;
  usage: string;
  on?: { name: string; hex: string; min: 3 | 4.5 };
};

const surface = { name: "surface", hex: "#141B2E" };
const bg = { name: "bg", hex: "#07090F" };
const raised = { name: "raised", hex: "#1C2440" };

export const colorRoles: { group: string; roles: ColorRole[] }[] = [
  {
    group: "Surfaces",
    roles: [
      { name: "Background", token: "night-bg", hex: "#07090F", usage: "Page ground, the night sky" },
      { name: "Surface", token: "night-surface", hex: "#141B2E", usage: "Cards and panels" },
      { name: "Raised", token: "night-raised", hex: "#1C2440", usage: "Modals, menus, anything above a card" },
      { name: "Field", token: "night-field", hex: "#0E1424", usage: "Inputs and HUD readouts, set into the surface" },
    ],
  },
  {
    group: "Text",
    roles: [
      { name: "Text", token: "night-text", hex: "#F4F1E8", usage: "Body copy and headings (floodlight white)", on: { ...surface, min: 4.5 } },
      { name: "Text on background", token: "night-text", hex: "#F4F1E8", usage: "Copy placed directly on the page", on: { ...bg, min: 4.5 } },
      { name: "Text on raised", token: "night-text", hex: "#F4F1E8", usage: "Copy inside modals", on: { ...raised, min: 4.5 } },
      { name: "Muted text", token: "night-muted", hex: "#9AA4BF", usage: "Hints, metadata, labels", on: { ...surface, min: 4.5 } },
      { name: "Muted on raised", token: "night-muted", hex: "#9AA4BF", usage: "Metadata inside modals", on: { ...raised, min: 4.5 } },
    ],
  },
  {
    group: "Lines",
    roles: [
      { name: "Rule", token: "night-rule", hex: "#26304A", usage: "Card outlines and dividers, decorative only" },
      { name: "Edge", token: "night-edge", hex: "#6B78A0", usage: "Input, checkbox, and chip outlines", on: { ...surface, min: 3 } },
      { name: "Edge on raised", token: "night-edge", hex: "#6B78A0", usage: "Control outlines inside modals", on: { ...raised, min: 3 } },
      { name: "Focus ring", token: "night-focus", hex: "#5CE1E6", usage: "2px ring with a soft glow on every focusable element", on: { ...surface, min: 3 } },
    ],
  },
  {
    group: "Action",
    roles: [
      { name: "Accent", token: "night-accent", hex: "#C8FF4D", usage: "Primary actions and “go” (tracer lime)", on: { ...surface, min: 4.5 } },
      { name: "On accent", token: "night-on-accent", hex: "#07090F", usage: "Text on lime and coral fills", on: { name: "accent", hex: "#C8FF4D", min: 4.5 } },
      { name: "Accent hover", token: "night-accent-hover", hex: "#DDFF8A", usage: "Hover for lime fills (gets brighter, not darker)", on: { name: "on accent", hex: "#07090F", min: 4.5 } },
      { name: "Select", token: "night-select", hex: "#5CE1E6", usage: "Selected chips and rows, links, focus (ice cyan)", on: { ...surface, min: 4.5 } },
      { name: "Special", token: "night-special", hex: "#A99DFF", usage: "Saved items and simulators (violet)", on: { ...surface, min: 4.5 } },
      { name: "Danger", token: "night-danger", hex: "#FF6B70", usage: "Destructive actions, with ink text on top", on: { name: "on accent", hex: "#07090F", min: 4.5 } },
    ],
  },
  {
    group: "Feedback",
    roles: [
      { name: "Success", token: "night-success", hex: "#A6F28A", usage: "On success tint #12301F", on: { name: "success tint", hex: "#12301F", min: 4.5 } },
      { name: "Warning", token: "night-warning", hex: "#FFC266", usage: "On warning tint #33240B", on: { name: "warning tint", hex: "#33240B", min: 4.5 } },
      { name: "Error", token: "night-error", hex: "#FF8A8E", usage: "On error tint #3A1418", on: { name: "error tint", hex: "#3A1418", min: 4.5 } },
      { name: "Info", token: "night-info", hex: "#6FE6EB", usage: "On info tint #0D2A33", on: { name: "info tint", hex: "#0D2A33", min: 4.5 } },
    ],
  },
  {
    group: "Disabled",
    roles: [
      { name: "Disabled", token: "night-disabled", hex: "#5A6480", usage: "Disabled text and edges. Exempt from contrast minimums, so always pair it with another cue." },
      { name: "Disabled fill", token: "night-disabled-bg", hex: "#1A2032", usage: "Disabled control backgrounds" },
    ],
  },
];

// Light is part of the system: glows mark action, selection, and focus.
export const glow = {
  accent: "shadow-[0_0_24px_-4px_rgba(200,255,77,0.75)]",
  select: "shadow-[0_0_20px_-4px_rgba(92,225,230,0.7)]",
  special: "shadow-[0_0_24px_-6px_rgba(169,157,255,0.8)]",
  danger: "shadow-[0_0_22px_-4px_rgba(255,107,112,0.7)]",
};

export const typeRoles = [
  { name: "Display", className: "font-night-display text-[3.5rem] leading-[0.95] font-black uppercase", spec: "Unbounded · 56/53 · 900 · caps", sample: "Player One" },
  { name: "Heading 1", className: "font-night-display text-4xl leading-[1.1] font-bold", spec: "Unbounded · 36/40 · 700", sample: "Ranges near you" },
  { name: "Heading 2", className: "font-night-display text-2xl leading-[1.25] font-semibold", spec: "Unbounded · 24/30 · 600", sample: "Lakeshore Practice Tee" },
  { name: "Heading 3", className: "font-night-display text-lg leading-[1.35] font-semibold", spec: "Unbounded · 18/24 · 600", sample: "Hours & buckets" },
  { name: "Body large", className: "font-night-body text-lg leading-[1.6]", spec: "Space Grotesk · 18/29 · 400", sample: "A two-tier range by the lake with grass tees in summer and heated mats in winter." },
  { name: "Body", className: "font-night-body text-base leading-[1.6]", spec: "Space Grotesk · 16/26 · 400", sample: "Buckets are sold at the window. Bring your own clubs or rent a set." },
  { name: "Small", className: "font-night-body text-sm leading-[1.5]", spec: "Space Grotesk · 14/21 · 400", sample: "Hours change with the season. Check before you go." },
  { name: "Label", className: "font-night-mono text-[11px] font-medium uppercase tracking-[0.12em]", spec: "JetBrains Mono · 11/16 · 500 · +12% · caps", sample: "Driving range · Lit at night" },
  { name: "Readout", className: "font-night-mono text-2xl font-bold tabular-nums", spec: "JetBrains Mono · 24/32 · 700 · tabular", sample: "152.4 MPH · 247 YD" },
  { name: "Voice", className: "font-night-serif text-2xl italic leading-snug", spec: "Instrument Serif · 24/31 · italic · accents only", sample: "the range lights up" },
] as const;

export const spacing = [
  { token: "1", px: 4, use: "Icon to label" },
  { token: "2", px: 8, use: "Chip padding, tight stacks" },
  { token: "3", px: 12, use: "Readout padding" },
  { token: "4", px: 16, use: "Control padding, field gaps" },
  { token: "5", px: 20, use: "Card padding" },
  { token: "8", px: 32, use: "Between components" },
  { token: "12", px: 48, use: "Between sections" },
  { token: "16", px: 64, use: "Page margins on desktop" },
];

export const radii = [
  { name: "Medium", className: "rounded-lg", value: "8px", use: "Checkboxes, readouts" },
  { name: "Large", className: "rounded-xl", value: "12px", use: "Inputs, selects, alerts" },
  { name: "Card", className: "rounded-3xl", value: "24px", use: "Cards, panels, modals" },
  { name: "Pill", className: "rounded-full", value: "9999px", use: "Buttons, chips, badges, tabs, toggles" },
];

export const elevationRoles = [
  { name: "Surface", className: "border border-night-rule bg-night-surface", use: "Cards at rest. Depth comes from lighter surfaces, not shadows." },
  { name: "Raised", className: "border border-night-rule bg-night-raised", use: "Modals and menus" },
  { name: "Glow · accent", className: `border border-night-accent/50 bg-night-surface ${glow.accent}`, use: "Hovered primary actions and cards" },
  { name: "Glow · select", className: `border border-night-select/60 bg-night-surface ${glow.select}`, use: "Selected chips and rows, focus" },
];
