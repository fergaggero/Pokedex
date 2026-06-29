import { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { isFavorite } from "../utils/favorites";

export function PokemonCard({ id, name, onSelect }) {
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    setFavorite(isFavorite(id));
  }, [id]);

  return (
    <>
      <div style={{ position: "relative" }}>
        {favorite && <FaHeart style={{ position: "absolute", right: "0" }} />}

        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
          alt={name}
          width={120}
        />

        <p>
          #{id} <b>{name.toUpperCase()}</b>
        </p>
      </div>
    </>
  );
}
