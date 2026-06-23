import Link from "next/link";
import { getPokemonSpriteUrl } from "@/services/pokemon.service";

export function PokemonCard({ name, id }: { name: string; id: number }) {
  return (
    <Link
      href={`/pokemon/${name}`}
      className="bg-zinc-900 rounded-xl p-4 capitalize hover:scale-105 transition block"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={getPokemonSpriteUrl(id)}
        alt={name}
        width={96}
        height={96}
        loading="lazy"
        className="mx-auto h-24 w-24 object-contain"
      />
      <span className="mt-2 block text-center text-sm">{name}</span>
    </Link>
  );
}
