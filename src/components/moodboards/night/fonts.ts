import { Instrument_Serif, JetBrains_Mono, Unbounded } from "next/font/google";

const unbounded = Unbounded({
  subsets: ["latin"],
  variable: "--font-unbounded",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
});

export const nightFonts = [unbounded, jetbrainsMono, instrumentSerif]
  .map((font) => font.variable)
  .join(" ");
