import {
  extractSpriteAssets,
  groupSpriteAssets,
} from "@/lib/pokemon-assets";
import type { PokemonSprites } from "@/types/pokemon";

export function PokemonSpriteGallery({ sprites }: { sprites: PokemonSprites }) {
  const assets = extractSpriteAssets(sprites);
  const groups = groupSpriteAssets(assets);

  if (assets.length === 0) {
    return null;
  }

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-6">
        Sprites <span className="text-zinc-500 text-lg">({assets.length})</span>
      </h2>

      <div className="space-y-10">
        {groups.map(([groupName, groupAssets]) => (
          <div key={groupName}>
            <h3 className="text-sm font-medium text-zinc-400 uppercase tracking-wide mb-4">
              {groupName}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {groupAssets.map((asset) => (
                <figure
                  key={asset.url}
                  className="bg-zinc-900 rounded-lg p-2 flex flex-col"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={asset.url}
                    alt={asset.label}
                    loading="lazy"
                    className="h-20 w-full object-contain flex-1"
                  />
                  <figcaption className="text-[10px] leading-tight text-zinc-500 mt-2 text-center line-clamp-3">
                    {asset.label.replace(`${groupName} · `, "")}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
