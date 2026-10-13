"use client";

// Shared, in-memory state for the guide. Nothing is stored; a reload starts fresh.
import { createContext, useCallback, useContext, useEffect, useMemo, useState, useSyncExternalStore, type ReactNode } from "react";
import { Toast } from "@/components/design-systems/clubhouse";
import { guideFacilities, type GuideFacility } from "./data";

type ToastState = { id: number; message: string; undo?: () => void } | null;

type GuideState = {
  plan: string[];
  inPlan: (id: string) => boolean;
  togglePlan: (id: string) => void;
  removeFromPlan: (id: string) => void;
  planOpen: boolean;
  setPlanOpen: (open: boolean) => void;
  plannerFacility: string;
  setPlannerFacility: (id: string) => void;
  // Fill the planner with a facility and jump to it.
  planSessionAt: (id: string) => void;
  notify: (message: string, undo?: () => void) => void;
};

const GuideContext = createContext<GuideState | null>(null);

export function facilityById(id: string): GuideFacility | undefined {
  return guideFacilities.find((f) => f.id === id);
}

export function GuideProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<string[]>([]);
  const [planOpen, setPlanOpen] = useState(false);
  const [plannerFacility, setPlannerFacility] = useState("");
  const [toast, setToast] = useState<ToastState>(null);

  const notify = useCallback((message: string, undo?: () => void) => {
    setToast({ id: Date.now(), message, undo });
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 5000);
    return () => clearTimeout(timer);
  }, [toast]);

  const removeFromPlan = useCallback(
    (id: string) => {
      const index = plan.indexOf(id);
      if (index === -1) return;
      setPlan((p) => p.filter((x) => x !== id));
      notify(`Removed ${facilityById(id)?.name} from your plan.`, () =>
        setPlan((p) => (p.includes(id) ? p : [...p.slice(0, index), id, ...p.slice(index)])),
      );
    },
    [plan, notify],
  );

  const togglePlan = useCallback(
    (id: string) => {
      if (plan.includes(id)) {
        removeFromPlan(id);
        return;
      }
      setPlan((p) => [...p, id]);
      notify(`Added ${facilityById(id)?.name} to your practice plan.`, () => setPlan((p) => p.filter((x) => x !== id)));
    },
    [plan, notify, removeFromPlan],
  );

  const planSessionAt = useCallback((id: string) => {
    setPlannerFacility(id);
    setPlanOpen(false);
    // Wait a frame so a closing modal releases focus before we scroll.
    requestAnimationFrame(() => {
      const planner = document.getElementById("planner");
      // No explicit behavior: follows the CSS setting, so reduced-motion users get an instant jump.
      planner?.scrollIntoView({ block: "start" });
      document.querySelector<HTMLSelectElement>('#planner select[name="facility"]')?.focus({ preventScroll: true });
    });
  }, []);

  const value = useMemo<GuideState>(
    () => ({
      plan,
      inPlan: (id) => plan.includes(id),
      togglePlan,
      removeFromPlan,
      planOpen,
      setPlanOpen,
      plannerFacility,
      setPlannerFacility,
      planSessionAt,
      notify,
    }),
    [plan, togglePlan, removeFromPlan, planOpen, plannerFacility, planSessionAt, notify],
  );

  return (
    <GuideContext.Provider value={value}>
      {children}
      {/* toast region, bottom center on every screen size */}
      <div className="pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center px-4">
        {toast && (
          <div key={toast.id} className="pointer-events-auto w-full max-w-md">
            <Toast
              action={
                toast.undo && (
                  <button
                    type="button"
                    onClick={() => {
                      toast.undo?.();
                      setToast(null);
                    }}
                    className="rounded-sm font-club-sign text-xs uppercase tracking-[0.15em] underline underline-offset-4 outline-none hover:no-underline focus-visible:ring-2 focus-visible:ring-club-on-select"
                  >
                    Undo
                  </button>
                )
              }
            >
              {toast.message}
            </Toast>
          </div>
        )}
      </div>
    </GuideContext.Provider>
  );
}

export function useGuide() {
  const ctx = useContext(GuideContext);
  if (!ctx) throw new Error("useGuide must be used inside <GuideProvider>");
  return ctx;
}

// True on laptop-and-up widths, where details open in a side panel instead of a modal.
const desktopQuery = "(min-width: 1024px)";
export function useIsDesktop() {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(desktopQuery);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(desktopQuery).matches,
    () => false,
  );
}
