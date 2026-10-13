import { Space_Grotesk } from "next/font/google";
import { nightFonts } from "@/components/moodboards/night/fonts";

// The mood board's Unbounded and Instrument Serif are display faces. Space Grotesk
// is added for body copy so longer text stays readable on dark backgrounds.
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const nightSystemFonts = `${nightFonts} ${spaceGrotesk.variable}`;
