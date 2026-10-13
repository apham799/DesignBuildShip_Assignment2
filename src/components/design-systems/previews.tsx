// Small samples of each design system's real components, for the gallery hub.
// Rendered inert by the caller: they are a picture of the kit, not controls.
import * as Clubhouse from "@/components/design-systems/clubhouse";
import * as Lakefront from "@/components/design-systems/lakefront";
import * as Night from "@/components/design-systems/night";
import { nightSystemFonts } from "@/components/design-systems/night/fonts";
import { clubhouseFonts } from "@/components/moodboards/clubhouse/fonts";
import { lakefrontFonts } from "@/components/moodboards/lakefront/fonts";

const frame = "flex h-full w-full flex-wrap content-center items-center gap-2.5 p-5";

export function ClubhousePreview() {
  return (
    <div className={`${clubhouseFonts} ${frame} bg-club-bg`}>
      <Clubhouse.Button size="sm">Find a range</Clubhouse.Button>
      <Clubhouse.FilterChip selected>Lit at night</Clubhouse.FilterChip>
      <Clubhouse.Badge tone="success" dot>
        Open now
      </Clubhouse.Badge>
      <Clubhouse.Toggle label="Grass tees" defaultOn />
    </div>
  );
}

export function LakefrontPreview() {
  return (
    <div
      className={`${lakefrontFonts} ${frame} bg-line-bg`}
      style={{
        backgroundImage:
          "linear-gradient(rgba(17,19,21,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(17,19,21,0.05) 1px, transparent 1px)",
        backgroundSize: "16px 16px",
      }}
    >
      <Lakefront.Button size="sm">Search</Lakefront.Button>
      <Lakefront.FilterChip kind="range" selected>
        Range
      </Lakefront.FilterChip>
      <Lakefront.Badge tone="flag">★ Saved</Lakefront.Badge>
      <Lakefront.Toggle label="Open now" defaultOn />
    </div>
  );
}

export function NightPreview() {
  return (
    <div
      className={`${nightSystemFonts} ${frame}`}
      style={{ background: "radial-gradient(80% 90% at 20% 0%, rgba(200,255,77,0.12), transparent 70%), #07090F" }}
    >
      <Night.Button size="sm">Play</Night.Button>
      <Night.FilterChip selected>Lit at night</Night.FilterChip>
      <Night.Badge tone="success" dot>
        Open now
      </Night.Badge>
      <Night.Toggle label="Heated" defaultOn />
    </div>
  );
}

// The finished guide, previewed with its hero headline and calls to action.
export function GuidePreview() {
  return (
    <div className={`${clubhouseFonts} flex h-full w-full flex-col justify-center gap-3 bg-club-bg px-5`}>
      <p className="font-club-sign text-[10px] uppercase tracking-[0.3em] text-club-flag">Chicagoland · for the regulars</p>
      <p className="font-club-serif text-3xl leading-none text-club-accent">
        Where Chicago <em className="text-club-flag">practices</em>.
      </p>
      <div className="flex gap-2">
        <Clubhouse.Button size="sm">Find a range</Clubhouse.Button>
        <Clubhouse.Button size="sm" variant="secondary">
          Plan a session
        </Clubhouse.Button>
      </div>
    </div>
  );
}
