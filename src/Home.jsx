import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { PokedexButton } from "./PokedexButton";
import { PokemonCard } from "./PokemonCard";
import { SearchBar } from "./components/SearchBar";

import "./css/App.css";

const API_URL = "https://pokeapi.co/api/v2";

export function Home() {
  const [generationList, setGenerationList] = useState([]);
  const [allPokemons, setAllPokemons] = useState([]);
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokedexId, setSelectedPokedexId] = useState(null);

  const [currentGenerationUrl, setCurrentGenerationUrl] = useState(
    "https://pokeapi.co/api/v2/generation/1/",
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const regionsList = [
    "Kanto",
    "Johto",
    "Hoenn",
    "Sinnoh",
    "Unova",
    "Kalos",
    "Alola",
    "Galar",
    "Paldea",
  ];

  const pokedexImages = import.meta.glob("./assets/pokedexes/*.png", {
    eager: true,
    import: "default",
  });

  const getGenerationId = (url) => {
    return url.match(/\/(\d+)\/$/)?.[1];
  };

  // Cargar generaciones
  useEffect(() => {
    const loadGenerations = async () => {
      try {
        const response = await fetch(`${API_URL}/generation`);
        const data = await response.json();

        setGenerationList(data.results);
      } catch (err) {
        setError(err.message);
      }
    };

    loadGenerations();
  }, []);

  // Cargar todos los Pokémon para búsqueda
  useEffect(() => {
    const loadAllPokemonNames = async () => {
      try {
        const response = await fetch(`${API_URL}/pokemon?limit=2000`);
        const data = await response.json();

        const pokemons = data.results.map((pokemon) => ({
          id: pokemon.url.match(/\/(\d+)\/$/)?.[1],
          name: pokemon.name,
        }));

        setAllPokemons(pokemons);
      } catch (err) {
        setError(err.message);
      }
    };

    loadAllPokemonNames();
  }, []);

  // Mostrar Kanto al iniciar
  useEffect(() => {
    if (generationList.length > 0 && !selectedPokedexId) {
      handleGenerationClick("1", "https://pokeapi.co/api/v2/generation/1/");
    }
  }, [generationList]);

  const handleGenerationClick = async (generationId, url) => {
    try {
      setLoading(true);

      setSelectedPokedexId(generationId);
      setCurrentGenerationUrl(url);

      const response = await fetch(url);
      const data = await response.json();

      const pokemons = data.pokemon_species
        .map((pokemon) => ({
          id: pokemon.url.match(/\/(\d+)\/$/)?.[1],
          name: pokemon.name,
        }))
        .sort((a, b) => Number(a.id) - Number(b.id));

      setPokemonList(pokemons);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value) => {
    const search = value.trim().toLowerCase();

    if (!search) {
      handleGenerationClick(selectedPokedexId || "1", currentGenerationUrl);
      return;
    } else {
      setSelectedPokedexId(null);
    }

    const filtered = allPokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(search),
    );

    setPokemonList(filtered);
  };

  return (
    <main>
      <h1
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "0px 20px",
        }}
      >
        <img
          src="../src/assets/pokedex.webp"
          alt="Pokedex"
          style={{
            width: "40px",
            height: "auto",
          }}
        />

        <span
          style={{
            fontFamily: "pokemon",
          }}
        >
          POKEDEX
        </span>

        <SearchBar onSearch={handleSearch} />
      </h1>

      {error && <p>Error: {error}</p>}

      <section className="grid" style={{ padding: "10px 10px" }}>
        {generationList.map((generation, index) => {
          const generationId = getGenerationId(generation.url);

          const image = pokedexImages[`./assets/pokedexes/${generationId}.png`];

          return (
            <PokedexButton
              key={generationId}
              name={regionsList[index]}
              image={image}
              generationId={generationId}
              selected={selectedPokedexId === generationId}
              onSelect={() =>
                handleGenerationClick(generationId, generation.url)
              }
            />
          );
        })}
      </section>

      {loading && <p>Cargando...</p>}

      <ul
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
          gap: "1rem",
          listStyle: "none",
          padding: 0,
        }}
      >
        {pokemonList.map((pokemon) => (
          <li key={pokemon.id} className="pokemon-item">
            <Link to={`/pokemon/${pokemon.id}`} className="pokemon-link-item">
              <PokemonCard id={pokemon.id} name={pokemon.name} />
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
