"use client";

import { useEffect, useId, useMemo, useState } from "react";
import {
  Button,
  CloseButton,
  DetailPanel,
  EmptyState,
  FacilityCard,
  FilterChip,
  ListRow,
  LoadingNote,
  Modal,
  SearchField,
  Select,
  Skeleton,
  Tabs,
  Toggle,
} from "@/components/design-systems/clubhouse";
import { amenityFilters, guideFacilities, regions, sortOptions, type GuideFacility, type Region, type SortKey } from "./data";
import { facilityById, useGuide, useIsDesktop } from "./guide-context";
import { LakefrontMap } from "./lakefront-map";
import { SaveControl } from "./save-control";

type Filters = { query: string; region: "" | Region; openNow: boolean; amenities: string[] };
const noFilters: Filters = { query: "", region: "", openNow: false, amenities: [] };

function matches(f: GuideFacility, filters: Filters) {
  const q = filters.query.trim().toLowerCase();
  return (
    (!filters.region || f.region === filters.region) &&
    (!filters.openNow || f.status === "open" || f.status === "closing") &&
    filters.amenities.every((a) => f.amenities.includes(a)) &&
    (!q || [f.name, f.area, f.region, ...f.amenities].join(" ").toLowerCase().includes(q))
  );
}

const sorters: Record<SortKey, (a: GuideFacility, b: GuideFacility) => number> = {
  near: (a, b) => a.miles - b.miles,
  name: (a, b) => a.name.localeCompare(b.name),
  bays: (a, b) => b.bays - a.bays,
};

export function Finder() {
  const { inPlan } = useGuide();
  const isDesktop = useIsDesktop();
  const [filters, setFilters] = useState<Filters>(noFilters);
  const [sort, setSort] = useState<SortKey>("near");
  const [view, setView] = useState("list");
  const [mapReady, setMapReady] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const amenityLabel = useId();
  const modalTitle = useId();

  const results = useMemo(() => guideFacilities.filter((f) => matches(f, filters)).sort(sorters[sort]), [filters, sort]);
  const activeCount = (filters.query ? 1 : 0) + (filters.region ? 1 : 0) + (filters.openNow ? 1 : 0) + filters.amenities.length;
  const selected = selectedId ? facilityById(selectedId) : undefined;

  // The map "unrolls" the first time it's opened, to show the loading state.
  useEffect(() => {
    if (view !== "map" || mapReady) return;
    const timer = setTimeout(() => setMapReady(true), 700);
    return () => clearTimeout(timer);
  }, [view, mapReady]);

  function select(id: string) {
    setSelectedId(id);
    if (!isDesktop) setModalOpen(true);
  }

  function toggleAmenity(a: string) {
    setFilters((f) => ({ ...f, amenities: f.amenities.includes(a) ? f.amenities.filter((x) => x !== a) : [...f.amenities, a] }));
  }

  const empty = (
    <EmptyState
      title="No ranges match those filters"
      action={
        <Button size="sm" onClick={() => setFilters(noFilters)}>
          Clear filters
        </Button>
      }
    >
      Try removing an amenity or widening the area. Fewer filters usually turn up a range nearby.
    </EmptyState>
  );

  const listView =
    results.length === 0 ? (
      empty
    ) : (
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {results.map((f) => (
          <li key={f.id}>
            <FacilityCard
              facility={f}
              href={`#${f.id}`}
              saved={inPlan(f.id)}
              selected={isDesktop && selectedId === f.id}
              onSelect={() => select(f.id)}
              action={
                <SaveControl facilityId={f.id} />
              }
            />
          </li>
        ))}
      </ul>
    );

  const mapView = !mapReady ? (
    <div className="space-y-4">
      <LoadingNote>Unrolling the map…</LoadingNote>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <Skeleton className="aspect-[320/440] w-full" />
        <div className="space-y-3">
          {[0, 1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </div>
    </div>
  ) : results.length === 0 ? (
    empty
  ) : (
    <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
      {/* the map stays in view while the list scrolls past it */}
      <div className="md:sticky md:top-28">
        <LakefrontMap facilities={results} all={guideFacilities} selectedId={selectedId} onSelect={select} />
      </div>
      <ol className="divide-y divide-club-rule overflow-hidden rounded border border-club-rule bg-club-surface">
        {results.map((f, i) => (
          <li key={f.id}>
            <ListRow facility={f} index={i + 1} href={`#${f.id}`} selected={selectedId === f.id} disabled={false} onSelect={() => select(f.id)} />
          </li>
        ))}
      </ol>
    </div>
  );

  const detailActions = (f: GuideFacility, onAfter?: () => void) => <DetailActions facility={f} onAfter={onAfter} />;

  // Side panel on laptop and up; phones and tablets get the modal instead.
  const sidePanel = (
    <aside aria-label="Facility details" className="hidden lg:block">
      <div className="sticky top-28 overflow-hidden rounded border border-club-rule shadow-[0_24px_60px_-20px_rgba(22,54,42,0.45)]">
        {selected ? (
          <DetailPanel key={selected.id} facility={selected} actions={detailActions(selected)} />
        ) : (
          <div className="flex flex-col items-center gap-3 bg-club-surface px-6 py-12 text-center">
            <svg viewBox="0 0 64 48" className="h-12 w-16" aria-hidden>
              <ellipse cx="32" cy="40" rx="26" ry="6" fill="#A7B98A" />
              <line x1="36" y1="40" x2="36" y2="6" stroke="#2B2A28" strokeWidth="2" />
              <path d="M36 6 L50 11 L36 16 Z" fill="#B23A2E" />
            </svg>
            <p className="font-club-serif text-[1.375rem] font-semibold">Pick a facility</p>
            <p className="max-w-xs font-club-serif text-base text-club-muted">
              Choose a card or a pin on the map to see hours, buckets, and how to get there.
            </p>
          </div>
        )}
      </div>
    </aside>
  );
  const withSidePanel = (view: React.ReactNode) => (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] xl:grid-cols-[minmax(0,1fr)_24rem]">
      <div className="min-w-0">{view}</div>
      {sidePanel}
    </div>
  );

  return (
    <section id="finder" aria-labelledby="finder-title" className="scroll-mt-24">
      <div className="max-w-2xl">
        <p className="font-club-sign text-xs uppercase tracking-[0.25em] text-club-flag">The finder</p>
        <h2 id="finder-title" className="mt-1 font-club-serif text-[2rem] leading-[1.1] sm:text-[2.5rem]">
          Find a practice facility
        </h2>
        <p className="mt-3 font-club-serif text-base leading-relaxed text-club-muted sm:text-lg">
          Search by name, neighborhood, or what you want to work on. Results update as you go.
        </p>
      </div>

      {/* controls */}
      <div className="mt-8 space-y-5 rounded border border-club-rule bg-club-surface p-4 sm:p-6">
        <SearchField
          label="Search facilities"
          placeholder="Try “Lakeview”, “bunker”, or “sim”"
          value={filters.query}
          onValueChange={(query) => setFilters((f) => ({ ...f, query }))}
        />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_auto] lg:items-end">
          <Select
            label="Area"
            value={filters.region}
            onChange={(e) => setFilters((f) => ({ ...f, region: e.target.value as Filters["region"] }))}
            options={[{ value: "", label: "All of Chicagoland" }, ...regions.map((r) => ({ value: r, label: r }))]}
          />
          <Select
            label="Sort by"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            options={sortOptions.map((o) => ({ value: o.value, label: o.label }))}
          />
          <div className="flex h-11 items-center">
            <Toggle label="Open now" on={filters.openNow} onChange={(openNow) => setFilters((f) => ({ ...f, openNow }))} />
          </div>
        </div>
        <div role="group" aria-labelledby={amenityLabel}>
          <p id={amenityLabel} className="mb-2 font-club-sign text-xs font-medium uppercase tracking-[0.2em]">
            Amenities
          </p>
          <div className="flex flex-wrap gap-2">
            {amenityFilters.map((a) => {
              const on = filters.amenities.includes(a);
              const count = guideFacilities.filter((f) => matches(f, { ...filters, amenities: on ? filters.amenities : [...filters.amenities, a] })).length;
              return (
                <FilterChip key={a} selected={on} count={count} disabled={!on && count === 0} onClick={() => toggleAmenity(a)}>
                  {a}
                </FilterChip>
              );
            })}
          </div>
        </div>
        {/* filter summary and reset, tucked in the box's bottom-right corner */}
        <div className="flex flex-wrap items-center justify-end gap-x-4 gap-y-1 border-t border-club-rule pt-4">
          {activeCount > 0 && (
            <span className="font-club-serif text-sm text-club-muted">
              {activeCount} {activeCount === 1 ? "filter" : "filters"} on
            </span>
          )}
          <Button variant="ghost" size="sm" disabled={activeCount === 0} onClick={() => setFilters(noFilters)}>
            Clear filters
          </Button>
        </div>
      </div>

      {/* results: the view tabs run full width; under them, the results and the detail panel
          share a row, so the panel lines up with the first row of cards */}
      <div className="mt-8">
        {/* The List tab shows the count visually; this keeps screen readers told as it changes. */}
        <p className="sr-only" aria-live="polite">
          {results.length} {results.length === 1 ? "facility matches" : "facilities match"}
        </p>
        <Tabs
          label="Results view"
          onChange={setView}
          items={[
            { id: "list", label: "List", count: results.length, panel: withSidePanel(listView) },
            { id: "map", label: "Map", panel: withSidePanel(mapView) },
          ]}
        />
      </div>

      {/* modal on phones and tablets */}
      {/* Resizing up to desktop hands the selection to the side panel instead. */}
      <Modal open={modalOpen && !isDesktop && !!selected} onClose={() => setModalOpen(false)} labelledBy={modalTitle}>
        {selected && (
          <DetailPanel
            facility={selected}
            titleId={modalTitle}
            onCloseSlot={<CloseButton onClick={() => setModalOpen(false)} />}
            actions={detailActions(selected, () => setModalOpen(false))}
          />
        )}
      </Modal>
    </section>
  );
}

function DetailActions({ facility, onAfter }: { facility: GuideFacility; onAfter?: () => void }) {
  const { planSessionAt } = useGuide();
  const closed = facility.status === "closed";
  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex flex-col items-start gap-3">
        {/* the one primary action in the panel; once saved it shows its success state */}
        <SaveControl facilityId={facility.id} variant="primary" size="md" />
        <Button
          variant="secondary"
          disabled={closed}
          onClick={() => {
            onAfter?.();
            planSessionAt(facility.id);
          }}
        >
          Plan a session here
        </Button>
      </div>
      {closed && <p className="font-club-serif text-sm text-club-muted">Sessions can be planned once it reopens in spring.</p>}
    </div>
  );
}
