// Design System 01 — Clubhouse Almanac. Token values mirror globals.css.

export type ColorRole = {
  name: string;
  token: string;
  hex: string;
  usage: string;
  // Background it is checked against, and the minimum it must meet.
  on?: { name: string; hex: string; min: 3 | 4.5 };
};

const surface = { name: "surface", hex: "#F8F2E4" };
const bg = { name: "bg", hex: "#E9DFC8" };

export const colorRoles: { group: string; roles: ColorRole[] }[] = [
  {
    group: "Surfaces",
    roles: [
      { name: "Background", token: "club-bg", hex: "#E9DFC8", usage: "Page ground behind everything" },
      { name: "Surface", token: "club-surface", hex: "#F8F2E4", usage: "Cards, panels, modals" },
      { name: "Field", token: "club-field", hex: "#FFFCF4", usage: "Text inputs and selects" },
    ],
  },
  {
    group: "Text",
    roles: [
      { name: "Text", token: "club-text", hex: "#2B2A28", usage: "Body copy and headings", on: { ...surface, min: 4.5 } },
      { name: "Text on background", token: "club-text", hex: "#2B2A28", usage: "Copy placed directly on the page", on: { ...bg, min: 4.5 } },
      { name: "Muted text", token: "club-muted", hex: "#5F5A50", usage: "Hints, metadata, captions", on: { ...surface, min: 4.5 } },
      { name: "Muted on background", token: "club-muted", hex: "#5F5A50", usage: "Metadata directly on the page", on: { ...bg, min: 4.5 } },
    ],
  },
  {
    group: "Lines",
    roles: [
      { name: "Rule", token: "club-rule", hex: "#D8CBAB", usage: "Decorative dividers only, never a control edge" },
      { name: "Edge", token: "club-edge", hex: "#8A7D63", usage: "Input, checkbox, and card outlines", on: { ...surface, min: 3 } },
      { name: "Focus ring", token: "club-focus", hex: "#3E6E8E", usage: "2px ring, 2px offset on every focusable element", on: { ...surface, min: 3 } },
    ],
  },
  {
    group: "Action",
    roles: [
      { name: "Accent", token: "club-accent", hex: "#1F4D3A", usage: "Reserved for the primary action, plus link text", on: { ...surface, min: 4.5 } },
      { name: "On accent", token: "club-on-accent", hex: "#F3EBD8", usage: "Text and icons on the accent", on: { name: "accent", hex: "#1F4D3A", min: 4.5 } },
      { name: "Accent hover", token: "club-accent-hover", hex: "#16362A", usage: "Hover and pressed for accent fills", on: { name: "on accent", hex: "#F3EBD8", min: 4.5 } },
      { name: "Selected", token: "club-select", hex: "#2B2A28", usage: "Checked boxes, toggles, selected chips, tabs, rows", on: { name: "on select", hex: "#F8F2E4", min: 4.5 } },
      { name: "Flag", token: "club-flag", hex: "#B23A2E", usage: "Secondary emphasis, destructive actions", on: { ...surface, min: 4.5 } },
    ],
  },
  {
    group: "Feedback",
    roles: [
      { name: "Success", token: "club-success", hex: "#2F6B4F", usage: "On success tint #E2EADB", on: { name: "success tint", hex: "#E2EADB", min: 4.5 } },
      { name: "Warning", token: "club-warning", hex: "#7A5714", usage: "On warning tint #F4E7C6", on: { name: "warning tint", hex: "#F4E7C6", min: 4.5 } },
      { name: "Error", token: "club-error", hex: "#A3342A", usage: "On error tint #F5DCD6", on: { name: "error tint", hex: "#F5DCD6", min: 4.5 } },
      { name: "Info", token: "club-info", hex: "#335C78", usage: "On info tint #DBE5EA", on: { name: "info tint", hex: "#DBE5EA", min: 4.5 } },
    ],
  },
  {
    group: "Disabled",
    roles: [
      { name: "Disabled", token: "club-disabled", hex: "#9A927F", usage: "Disabled text and edges. Exempt from contrast minimums, so always pair it with another cue." },
      { name: "Disabled fill", token: "club-disabled-bg", hex: "#ECE4D2", usage: "Disabled control backgrounds" },
    ],
  },
];

export const decorativeOnly = [
  { name: "Brass", hex: "#B8893B", note: "Ornament, crests, and rules. Fails as text (2.8:1)." },
  { name: "Lake", hex: "#3E6E8E", note: "Maps and water. Also the focus ring." },
  { name: "Bunker", hex: "#D9C49A", note: "Tickets and highlights behind dark text." },
];

export const typeRoles = [
  { name: "Display", className: "font-club-serif text-[3.5rem] leading-[1.05] font-normal tracking-[-0.01em]", spec: "Fraunces · 56/59 · 400 · −1%", sample: "Where Chicago practices" },
  { name: "Heading 1", className: "font-club-serif text-[2.5rem] leading-[1.1] font-normal", spec: "Fraunces · 40/44 · 400", sample: "Driving ranges near the lake" },
  { name: "Heading 2", className: "font-club-serif text-[1.75rem] leading-[1.2] font-medium", spec: "Fraunces · 28/34 · 500", sample: "Lakeshore Practice Tee" },
  { name: "Heading 3", className: "font-club-serif text-[1.375rem] leading-[1.3] font-semibold", spec: "Fraunces · 22/29 · 600", sample: "Hours & buckets" },
  { name: "Body large", className: "font-club-serif text-lg leading-[1.6]", spec: "Fraunces · 18/29 · 400", sample: "A two-tier range on the lakefront with grass tees in summer and heated mats in winter." },
  { name: "Body", className: "font-club-serif text-base leading-[1.6]", spec: "Fraunces · 16/26 · 400", sample: "Buckets are sold at the pro shop window. Bring your own clubs or rent a set." },
  { name: "Small", className: "font-club-serif text-sm leading-[1.5]", spec: "Fraunces · 14/21 · 400", sample: "Hours change with the season. Check before you go." },
  { name: "Label", className: "font-club-sign text-xs font-medium uppercase tracking-[0.2em]", spec: "Oswald · 12/16 · 500 · +20% · caps", sample: "Grass tees · Lit at night" },
  { name: "Data", className: "font-club-mono text-sm", spec: "Courier Prime · 14/20 · 400", sample: "Bay 14 · 90 balls · 2.4 mi" },
  { name: "Note", className: "font-club-hand text-xl leading-tight", spec: "Caveat · 20/24 · 400 · decorative only", sample: "keep the tempo" },
] as const;

export const spacing = [
  { token: "1", px: 4, use: "Icon to label" },
  { token: "2", px: 8, use: "Chip padding, tight stacks" },
  { token: "3", px: 12, use: "Control padding" },
  { token: "4", px: 16, use: "Card padding (small), field gaps" },
  { token: "6", px: 24, use: "Card padding, group gaps" },
  { token: "8", px: 32, use: "Between components" },
  { token: "12", px: 48, use: "Between sections" },
  { token: "16", px: 64, use: "Page margins on desktop" },
];

export const radii = [
  { name: "None", className: "rounded-none", value: "0", use: "Tables, rules, tickets" },
  { name: "Small", className: "rounded-sm", value: "2px", use: "Buttons, inputs, checkboxes" },
  { name: "Medium", className: "rounded", value: "4px", use: "Cards, panels, modals" },
  { name: "Pill", className: "rounded-full", value: "9999px", use: "Filter chips, badges, toggles" },
];

export const elevation = {
  paper: "shadow-[0_1px_2px_rgba(43,42,40,0.12),0_8px_20px_-12px_rgba(31,77,58,0.45)]",
  lifted: "shadow-[0_2px_4px_rgba(43,42,40,0.12),0_16px_28px_-14px_rgba(31,77,58,0.55)]",
  modal: "shadow-[0_24px_60px_-20px_rgba(22,54,42,0.6)]",
};

export const elevationRoles = [
  { name: "Flat", className: "", use: "Rows, fields, anything inside a card" },
  { name: "Paper", className: elevation.paper, use: "Cards at rest" },
  { name: "Lifted", className: elevation.lifted, use: "Card hover, dropdowns" },
  { name: "Modal", className: elevation.modal, use: "Dialogs and detail panels" },
];
