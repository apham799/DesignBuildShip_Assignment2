// Design System 02 — Lakefront Line. Token values mirror globals.css.
import type { FacilityKind } from "../sample";

export type ColorRole = {
  name: string;
  token: string;
  hex: string;
  usage: string;
  on?: { name: string; hex: string; min: 3 | 4.5 };
};

const surface = { name: "surface", hex: "#FFFFFF" };
const bg = { name: "bg", hex: "#F2F2EE" };

export const colorRoles: { group: string; roles: ColorRole[] }[] = [
  {
    group: "Surfaces",
    roles: [
      { name: "Background", token: "line-bg", hex: "#F2F2EE", usage: "Page ground, with an optional 24px grid" },
      { name: "Surface", token: "line-surface", hex: "#FFFFFF", usage: "Cards, panels, fields, modals" },
      { name: "Highlight tint", token: "line-highlight-tint", hex: "#FFF7B3", usage: "“You are here”: selected rows, matches" },
    ],
  },
  {
    group: "Text",
    roles: [
      { name: "Text", token: "line-text", hex: "#111315", usage: "Body copy, headings, sign text", on: { ...surface, min: 4.5 } },
      { name: "Text on background", token: "line-text", hex: "#111315", usage: "Copy placed directly on the page", on: { ...bg, min: 4.5 } },
      { name: "Muted text", token: "line-muted", hex: "#4A5057", usage: "Hints, metadata, grid addresses", on: { ...surface, min: 4.5 } },
      { name: "Muted on background", token: "line-muted", hex: "#4A5057", usage: "Metadata directly on the page", on: { ...bg, min: 4.5 } },
      { name: "Link", token: "line-link", hex: "#0071A8", usage: "Inline links (always underlined)", on: { ...surface, min: 4.5 } },
    ],
  },
  {
    group: "Lines",
    roles: [
      { name: "Rule", token: "line-rule", hex: "#D9DCDF", usage: "Dividers inside cards only, never a control edge" },
      { name: "Edge", token: "line-edge", hex: "#6B7178", usage: "Input, checkbox, and chip outlines", on: { ...surface, min: 3 } },
      { name: "Edge on background", token: "line-edge", hex: "#6B7178", usage: "Outlines placed on the page", on: { ...bg, min: 3 } },
      { name: "Focus ring", token: "line-focus", hex: "#0071A8", usage: "3px ring, 2px offset on every focusable element", on: { ...surface, min: 3 } },
    ],
  },
  {
    group: "Action",
    roles: [
      { name: "Accent", token: "line-accent", hex: "#111315", usage: "Primary buttons, selected tabs and chips, card frames", on: { ...surface, min: 4.5 } },
      { name: "On accent", token: "line-on-accent", hex: "#FFFFFF", usage: "Text on the accent", on: { name: "accent", hex: "#111315", min: 4.5 } },
      { name: "Accent hover", token: "line-accent-hover", hex: "#33383D", usage: "Hover for accent fills", on: { name: "on accent", hex: "#FFFFFF", min: 4.5 } },
      { name: "Highlight", token: "line-highlight", hex: "#F9E300", usage: "Live and “now” markers, behind ink text only", on: { name: "ink", hex: "#111315", min: 4.5 } },
      { name: "Danger", token: "line-danger", hex: "#C60C30", usage: "Destructive actions", on: { ...surface, min: 4.5 } },
    ],
  },
  {
    group: "Feedback",
    roles: [
      { name: "Success", token: "line-success", hex: "#00703A", usage: "On success tint #E3F2E8", on: { name: "success tint", hex: "#E3F2E8", min: 4.5 } },
      { name: "Warning", token: "line-warning", hex: "#7A5000", usage: "On warning tint #FFF4CC", on: { name: "warning tint", hex: "#FFF4CC", min: 4.5 } },
      { name: "Error", token: "line-error", hex: "#B00A2A", usage: "On error tint #FCE4E8", on: { name: "error tint", hex: "#FCE4E8", min: 4.5 } },
      { name: "Info", token: "line-info", hex: "#005A8C", usage: "On info tint #E1F1F9", on: { name: "info tint", hex: "#E1F1F9", min: 4.5 } },
    ],
  },
  {
    group: "Disabled",
    roles: [
      { name: "Disabled", token: "line-disabled", hex: "#9AA0A6", usage: "Disabled text and edges. Exempt from contrast minimums, so always pair it with another cue." },
      { name: "Disabled fill", token: "line-disabled-bg", hex: "#ECEDEA", usage: "Disabled control backgrounds" },
    ],
  },
];

// Signal colors code facility types. They always sit next to a text label,
// so the color is never the only way to tell types apart.
export const signals: Record<FacilityKind, { label: string; hex: string }> = {
  range: { label: "Driving range", hex: "#009B3A" },
  short: { label: "Short game", hex: "#00A1DE" },
  sim: { label: "Simulator", hex: "#522398" },
  dome: { label: "Winter dome", hex: "#C60C30" },
  par3: { label: "Par-3 course", hex: "#F9461C" },
};

export const typeRoles = [
  { name: "Display", className: "font-line-sans text-[4rem] leading-[0.88] font-black uppercase tracking-[-0.02em] [font-stretch:62%]", spec: "Archivo · 64/56 · 900 · width 62 · caps", sample: "Practice Line" },
  { name: "Heading 1", className: "font-line-sans text-[2.5rem] leading-[1.05] font-extrabold tracking-[-0.01em]", spec: "Archivo · 40/42 · 800 · −1%", sample: "Ranges by the lake" },
  { name: "Heading 2", className: "font-line-sans text-[1.75rem] leading-[1.15] font-bold tracking-[-0.01em]", spec: "Archivo · 28/32 · 700", sample: "Lakeshore Practice Tee" },
  { name: "Heading 3", className: "font-line-sans text-xl leading-[1.3] font-bold", spec: "Archivo · 20/26 · 700", sample: "Hours & buckets" },
  { name: "Body large", className: "font-line-sans text-lg leading-[1.55]", spec: "Archivo · 18/28 · 400", sample: "A two-tier range at 3200 N with grass tees in summer and heated mats in winter." },
  { name: "Body", className: "font-line-sans text-base leading-normal", spec: "Archivo · 16/24 · 400", sample: "Take the Red Line to Belmont and walk east 12 minutes to the lakefront." },
  { name: "Small", className: "font-line-sans text-sm leading-[1.45]", spec: "Archivo · 14/20 · 400", sample: "Hours change with the season. Check before you go." },
  { name: "Label", className: "font-line-sans text-xs font-semibold uppercase tracking-[0.08em]", spec: "Archivo · 12/16 · 600 · +8% · caps", sample: "Driving range · Lit at night" },
  { name: "Data", className: "font-line-mono text-sm font-medium tabular-nums", spec: "IBM Plex Mono · 14/20 · 500 · tabular", sample: "3200 N · 500 W · 12 min" },
  { name: "Caption", className: "font-line-mono text-[11px] uppercase tracking-[0.06em]", spec: "IBM Plex Mono · 11/16 · 400 · caps", sample: "Sample data · Updated 07:42" },
] as const;

export const spacing = [
  { token: "1", px: 4, use: "Bullet to label" },
  { token: "2", px: 8, use: "Base unit, chip padding" },
  { token: "4", px: 16, use: "Control padding, card gutters" },
  { token: "6", px: 24, use: "Card padding, grid cell" },
  { token: "8", px: 32, use: "Between components" },
  { token: "12", px: 48, use: "Between sections" },
  { token: "16", px: 64, use: "Page margins on desktop" },
  { token: "24", px: 96, use: "Hero spacing" },
];

export const radii = [
  { name: "Square", className: "rounded-none", value: "0", use: "Everything: buttons, fields, cards, chips, tags" },
  { name: "Circle", className: "rounded-full", value: "50%", use: "Station dots, radios, toggle thumbs only" },
];

export const elevation = {
  offset: "shadow-[4px_4px_0_#111315]",
  offsetLarge: "shadow-[8px_8px_0_#111315]",
};

export const elevationRoles = [
  { name: "Flat", className: "border border-line-text", use: "Default. Frames come from 1px ink borders, not shadows." },
  { name: "Offset", className: `border border-line-text ${elevation.offset}`, use: "Card hover, dropdowns" },
  { name: "Offset large", className: `border border-line-text ${elevation.offsetLarge}`, use: "Dialogs and detail panels" },
];
