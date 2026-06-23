import { PokemonCard } from "@/components/pokemon-card";
import {
  getPokedex,
  getPokemonFromPokedex,
} from "@/services/pokedex.service";

export async function PokemonGrid({ pokedex }: { pokedex: string }) {
  const detail = await getPokedex(pokedex);
  const pokemon = getPokemonFromPokedex(detail);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {pokemon.map((p) => (
        <PokemonCard key={`${p.id}-${p.name}`} name={p.name} id={p.id} />
      ))}
    </div>
  );
}
