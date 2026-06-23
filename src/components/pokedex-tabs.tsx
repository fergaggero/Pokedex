import Link from "next/link";
import type { PokedexItem } from "@/types/pokedex";

export function PokedexTabs({
  pokedexes,
  selected,
}: {
  pokedexes: PokedexItem[];
  selected: string;
}) {
  return (
    <div className="flex gap-2 flex-wrap mb-6">
      {pokedexes.map((p) => (
        <Link
          key={p.name}
          href={`/?pokedex=${p.name}`}
          prefetch={false}
          scroll={false}
          className={`px-3 py-1 rounded-full text-sm capitalize ${
            selected === p.name ? "bg-blue-600" : "bg-zinc-800 hover:bg-zinc-700"
          }`}
        >
          {p.name}
        </Link>
      ))}
    </div>
  );
}
