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
} from "@/components/design-systems/lakefront";
import type { FacilityKind } from "@/components/design-systems/sample";
import { signals } from "@/components/design-systems/lakefront/tokens";

const kinds = Object.keys(signals) as FacilityKind[];

export function LiveFilters() {
  const [on, setOn] = useState<FacilityKind[]>(["range"]);
  const matches = facilities.filter((f) => on.length === 0 || on.some((k) => f.kinds.includes(k)));
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by type of practice">
        {kinds.map((k) => {
          const count = facilities.filter((f) => f.kinds.includes(k)).length;
          return (
            <FilterChip
              key={k}
              kind={k}
              selected={on.includes(k)}
              count={count}
              disabled={count === 0}
              onClick={() => setOn((cur) => (cur.includes(k) ? cur.filter((x) => x !== k) : [...cur, k]))}
            >
              {signals[k].label}
            </FilterChip>
          );
        })}
      </div>
      <p className="font-line-mono text-xs text-line-muted" aria-live="polite">
        {matches.length} of {facilities.length} stops on the line
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
    <div className="space-y-5">
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
              {saved ? "★ Saved to your line" : "Save to your line"}
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
                className="font-line-sans text-sm font-bold underline decoration-2 underline-offset-4"
              >
                Undo
              </button>
            }
          >
            Saved to your line.
          </Toast>
        )}
      </div>
    </div>
  );
}

export function ModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        View stop details →
      </Button>
      <Modal open={open} onClose={() => setOpen(false)} labelledBy="ds2-detail-title">
        <DetailPanel
          facility={facilities[0]}
          titleId="ds2-detail-title"
          onCloseSlot={<CloseButton onClick={() => setOpen(false)} />}
          actions={
            <>
              <Button onClick={() => setOpen(false)}>Save to your line</Button>
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
          <SearchField label="Search by street or line" name="q" placeholder="Try “Belmont”, “zzz”, or “rain”" />
        </div>
        <Button type="submit" loading={phase === "loading"}>
          Search
        </Button>
      </form>
      <div aria-live="polite">
        {phase === "loading" && (
          <div className="space-y-4">
            <LoadingNote>Checking the board…</LoadingNote>
            <div className="grid gap-4 sm:grid-cols-2">
              <FacilityCardSkeleton />
              <FacilityCardSkeleton />
            </div>
          </div>
        )}
        {phase === "results" && (
          <div className="space-y-4">
            <Alert tone="success" title={`2 stops match “${query || "all"}”`} />
            <div className="grid gap-4 sm:grid-cols-2">
              <FacilityCard facility={facilities[0]} />
              <FacilityCard facility={facilities[1]} />
            </div>
          </div>
        )}
        {phase === "empty" && (
          <EmptyState
            title="No stops on this line"
            action={
              <Button variant="secondary" size="sm" onClick={() => setPhase("idle")}>
                Clear search
              </Button>
            }
          >
            Nothing matched “{query}”. Try a street name like Belmont, or a CTA line.
          </EmptyState>
        )}
        {phase === "error" && (
          <ErrorState title="Service interruption" action={<Button size="sm" onClick={() => run("Belmont")}>Try again</Button>}>
            We couldn’t load the ranges. Your filters are saved, so try again in a moment.
          </ErrorState>
        )}
      </div>
    </div>
  );
}
