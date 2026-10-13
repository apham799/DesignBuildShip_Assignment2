"use client";

// Save / remove for the practice plan. Both buttons are always there, in the same grid,
// so nothing changes size; only their states change. Not saved: Save is active and Remove
// is disabled. Saved: Save shows its success state and Remove becomes available.
import { Button } from "@/components/design-systems/clubhouse";
import { facilityById, useGuide } from "./guide-context";

type Props = {
  facilityId: string;
  // Primary where saving is the main action (the detail panel), secondary elsewhere.
  variant?: "primary" | "secondary";
  size?: "sm" | "md";
  label?: string;
};

export function SaveControl({ facilityId, variant = "secondary", size = "sm", label = "Save to plan" }: Props) {
  const { inPlan, togglePlan } = useGuide();
  const saved = inPlan(facilityId);
  const name = facilityById(facilityId)?.name ?? "this facility";

  return (
    <div className="grid w-full grid-cols-[minmax(0,1fr)_auto] gap-2">
      <Button
        variant={saved ? "success" : variant}
        size={size}
        className="w-full whitespace-nowrap"
        // Saved: still focusable and announced, but clicking again does nothing.
        aria-disabled={saved || undefined}
        onClick={saved ? undefined : () => togglePlan(facilityId)}
        icon={
          saved ? (
            <svg viewBox="0 0 16 16" className="size-3.5 shrink-0" aria-hidden fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3.5 8.5 L6.5 11.5 L12.5 4.5" />
            </svg>
          ) : undefined
        }
      >
        {saved ? "Saved to plan" : label}
      </Button>
      <Button variant="ghost" size={size} className="whitespace-nowrap" disabled={!saved} onClick={() => togglePlan(facilityId)} aria-label={`Remove ${name} from your practice plan`}>
        Remove
      </Button>
    </div>
  );
}
