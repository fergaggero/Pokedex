"use client";

import { useEffect, useState } from "react";

type PokemonModelViewerProps = {
  src: string;
  label: string;
};

export function PokemonModelViewer({ src, label }: PokemonModelViewerProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    import("@google/model-viewer").then(() => setReady(true));
  }, []);

  return (
    <div className="bg-zinc-900 rounded-xl p-4">
      <p className="text-sm text-zinc-400 mb-3 text-center">{label}</p>
      {ready ? (
        // @ts-expect-error model-viewer is a custom element
        <model-viewer
          src={src}
          alt={label}
          camera-controls
          auto-rotate
          shadow-intensity="1"
          exposure="1"
          style={{
            width: "100%",
            height: "280px",
            backgroundColor: "transparent",
          }}
        />
      ) : (
        <div
          className="w-full rounded-lg bg-zinc-800 animate-pulse"
          style={{ height: "280px" }}
        />
      )}
    </div>
  );
}
