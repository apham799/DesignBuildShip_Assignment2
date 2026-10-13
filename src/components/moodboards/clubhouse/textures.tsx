// Surface textures rendered with CSS gradients.

export function DimpleTexture() {
  return (
    <div
      className="flex h-44 items-end p-4"
      style={{
        backgroundColor: "#F4F0E6",
        backgroundImage: [
          // soft highlight so the surface reads as curved
          "radial-gradient(ellipse at 30% 25%, rgba(255,255,255,0.9), transparent 60%)",
          // two offset rows of dimples: shaded cup with a bright lower rim
          "radial-gradient(circle at 50% 50%, rgba(43,42,40,0.22) 0, rgba(43,42,40,0.08) 4px, rgba(255,255,255,0.7) 5px, transparent 6px)",
          "radial-gradient(circle at 50% 50%, rgba(43,42,40,0.22) 0, rgba(43,42,40,0.08) 4px, rgba(255,255,255,0.7) 5px, transparent 6px)",
        ].join(","),
        backgroundSize: "100% 100%, 14px 14px, 14px 14px",
        backgroundPosition: "0 0, 0 0, 7px 7px",
      }}
    >
      <span className="bg-club-paper/90 px-2 py-1 font-club-mono text-[10px] uppercase tracking-wider text-club-ink">
        Dimple pattern · 336 count
      </span>
    </div>
  );
}

export function TurfTexture() {
  return (
    <div
      className="flex h-44 items-end p-4"
      style={{
        backgroundColor: "#2F6B4F",
        backgroundImage: [
          "repeating-linear-gradient(45deg, rgba(255,255,255,0.07) 0 22px, transparent 22px 44px)",
          "repeating-linear-gradient(-45deg, rgba(0,0,0,0.08) 0 22px, transparent 22px 44px)",
        ].join(","),
      }}
    >
      <span className="bg-club-green-deep/80 px-2 py-1 font-club-mono text-[10px] uppercase tracking-wider text-club-cream">
        Cross-cut fairway · mowed at 7/16&Prime;
      </span>
    </div>
  );
}
