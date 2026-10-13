import { Caveat, Courier_Prime, Fraunces, Oswald } from "next/font/google";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT"],
  variable: "--font-fraunces",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
});

const courierPrime = Courier_Prime({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-courier-prime",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
});

export const clubhouseFonts = [fraunces, oswald, courierPrime, caveat]
  .map((font) => font.variable)
  .join(" ");
