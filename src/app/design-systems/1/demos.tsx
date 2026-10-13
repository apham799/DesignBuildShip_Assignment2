"use client";

// Live demos for the docs. Everything is faked in the browser and resets on reload.
import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  CloseButton,
  DetailPanel,
  EmptyState,
  ErrorState,
  FacilityCard,
  FacilityCardSkeleton,
  facilities,
  FilterChip,
  LoadingNote,
  Modal,
  SearchField,
  Toast,
} from "@/components/design-systems/clubhouse";

const filterOptions = ["Grass tees", "Lit at night", "Putting green", "Heated bays", "Indoor"];

export function LiveFilters() {
  const [on, setOn] = useState<string[]>(["Lit at night"]);
  const matches = facilities.filter((f) => on.every((o) => f.amenities.includes(o)));
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by amenity">
        {filterOptions.map((o) => (
          <FilterChip
            key={o}
            selected={on.includes(o)}
            count={facilities.filter((f) => f.amenities.includes(o)).length}
            onClick={() => setOn((cur) => (cur.includes(o) ? cur.filter((x) => x !== o) : [...cur, o]))}
          >
            {o}
          </FilterChip>
        ))}
        <FilterChip disabled>Simulators</FilterChip>
      </div>
      <p className="font-club-mono text-xs text-club-muted" aria-live="polite">
        {matches.length} of {facilities.length} facilities match
      </p>
    </div>
  );
}

export function LiveCard() {
  const [saved, setSaved] = useState(false);
  const [toast, setToast] = useState(false);

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(false), 4000);
    return () => clearTimeout(id);
  }, [toast]);

  return (
    <div className="space-y-4">
      <div className="max-w-sm">
        <FacilityCard
          facility={facilities[0]}
          saved={saved}
          action={
            <Button
              variant={saved ? "secondary" : "primary"}
              size="sm"
              className="w-full"
              aria-pressed={saved}
              onClick={() => {
                setSaved(!saved);
                setToast(!saved);
              }}
            >
              {saved ? "✓ In your plan" : "Add to practice plan"}
            </Button>
          }
        />
      </div>
      <div className="min-h-14 max-w-md">
        {toast && (
          <Toast
            action={
              <button
                type="button"
                onClick={() => {
                  setSaved(false);
                  setToast(false);
                }}
                className="font-club-sign text-xs uppercase tracking-[0.15em] underline underline-offset-4"
              >
                Undo
              </button>
            }
          >
            Added to your practice plan.
          </Toast>
        )}
      </div>
    </div>
  );
}

export function ModalDemo() {
  const [open, setOpen] = useState(false);
  const facility = facilities[0];
  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        View details
      </Button>
      <Modal open={open} onClose={() => setOpen(false)} labelledBy="detail-title">
        <DetailPanel
          facility={facility}
          titleId="detail-title"
          onCloseSlot={<CloseButton onClick={() => setOpen(false)} />}
          actions={
            <>
              <Button onClick={() => setOpen(false)}>Add to practice plan</Button>
              <Button variant="ghost" onClick={() => setOpen(false)}>
                Cancel
              </Button>
            </>
          }
        />
      </Modal>
    </>
  );
}

type Phase = "idle" | "loading" | "results" | "empty" | "error";

// Search "zzz" for the empty state and "rain" for the error state.
export function SearchFlow() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [query, setQuery] = useState("");

  function run(q: string) {
    setQuery(q);
    setPhase("loading");
    setTimeout(() => {
      const t = q.trim().toLowerCase();
      setPhase(t === "rain" ? "error" : t === "zzz" ? "empty" : "results");
    }, 1200);
  }

  return (
    <div className="space-y-4">
      <form
        className="flex flex-wrap items-end gap-3"
        onSubmit={(e) => {
          e.preventDefault();
          run(String(new FormData(e.currentTarget).get("q") ?? ""));
        }}
      >
        <div className="min-w-64 flex-1">
          <SearchField label="Search facilities" name="q" placeholder="Try “lake”, “zzz”, or “rain”" />
        </div>
        <Button type="submit" loading={phase === "loading"}>
          Search
        </Button>
      </form>
      <div aria-live="polite">
        {phase === "loading" && (
          <div className="space-y-4">
            <LoadingNote>Raking the bunkers…</LoadingNote>
            <div className="grid gap-4 sm:grid-cols-2">
              <FacilityCardSkeleton />
              <FacilityCardSkeleton />
            </div>
          </div>
        )}
        {phase === "results" && (
          <div className="space-y-4">
            <Alert tone="success" title={`2 facilities match “${query || "all"}”`} />
            <div className="grid gap-4 sm:grid-cols-2">
              <FacilityCard facility={facilities[0]} />
              <FacilityCard facility={facilities[1]} />
            </div>
          </div>
        )}
        {phase === "empty" && (
          <EmptyState
            title="No ranges match that"
            action={
              <Button variant="secondary" size="sm" onClick={() => setPhase("idle")}>
                Clear search
              </Button>
            }
          >
            Nothing turned up for “{query}”. Try a neighborhood, or remove a filter.
          </EmptyState>
        )}
        {phase === "error" && (
          <ErrorState title="Couldn’t load the ranges" action={<Button size="sm" onClick={() => run("lake")}>Try again</Button>}>
            Something went wrong on our end. Your filters are saved, so try again in a moment.
          </ErrorState>
        )}
      </div>
    </div>
  );
}
