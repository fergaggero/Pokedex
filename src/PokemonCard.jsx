import { useState } from "react";

export function PokemonCard({ id, name, onSelect }) {
  return (
    <>
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
        alt={name}
        width={120}
      />

      <p>
        #{id} <b>{name.toUpperCase()}</b>
      </p>
    </>
  );
}
