import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "https://pokeapi.co/api/v2";

export function EvolutionNode({ node }) {
  const [pokemon, setPokemon] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPokemon = async () => {
      const response = await fetch(`${API_URL}/pokemon/${node.species.name}`);

      const data = await response.json();

      setPokemon(data);
    };

    loadPokemon();
  }, [node.species.name]);

  return (
    <div className="evolution-node">
      <div
        className="evolution-card"
        onClick={() => navigate("/pokemon/" + pokemon.id)}
      >
        {pokemon && (
          <>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />

            <p>{pokemon.name}</p>
          </>
        )}
      </div>

      {node.evolves_to.length > 0 && (
        <>
          <div className="evolution-line-vertical" />

          <div className="evolution-children">
            {node.evolves_to.map((child) => (
              <EvolutionNode key={child.species.name} node={child} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
