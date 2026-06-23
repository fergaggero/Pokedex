"use client";

import { PokemonModelViewer } from "@/components/pokemon-model-viewer";
import { getPokemon3DModels } from "@/lib/pokemon-assets";

export function PokemonModelsSection({ pokemonId }: { pokemonId: number }) {
  const models = getPokemon3DModels(pokemonId);

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Modelos 3D</h2>
      <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {models.map((model) => (
          <PokemonModelViewer
            key={model.url}
            src={model.url}
            label={model.label}
          />
        ))}
      </div>
    </section>
  );
}
