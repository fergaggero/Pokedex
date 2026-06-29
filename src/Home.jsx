import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { PokedexButton } from "./components/PokedexButton.jsx";
import { PokemonCard } from "./components/PokemonCard";
import { SearchBar } from "./components/SearchBar";
import { Footer } from "./components/Footer.jsx";

import "./css/App.css";

const API_URL = "https://pokeapi.co/api/v2";

export function Home() {
  const [generationList, setGenerationList] = useState([]);
  const [allPokemons, setAllPokemons] = useState([]);
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokedexId, setSelectedPokedexId] = useState(null);
  const [opened, setOpened] = useState(false);
  const [hideIntro, setHideIntro] = useState(false);

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

  useEffect(() => {
    const openTimer = setTimeout(() => {
      setOpened(true);
    }, 500);

    const hideTimer = setTimeout(() => {
      setHideIntro(true);
    }, 2300);

    return () => {
      clearTimeout(openTimer);
      clearTimeout(hideTimer);
    };
  }, []);

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
    const initPokedex = async () => {
      setLoading(true);
      try {
        // 1. Cargamos generaciones y Kanto en paralelo
        const [genRes, kantoRes] = await Promise.all([
          fetch(`${API_URL}/generation`),
          fetch(`${API_URL}/generation/1/`),
        ]);

        const genData = await genRes.json();
        const kantoData = await kantoRes.json();

        setGenerationList(genData.results);
        setSelectedPokedexId("1");

        // 2. Procesamos Kanto inmediatamente
        const pokemons = kantoData.pokemon_species
          .map((p) => ({ id: p.url.match(/\/(\d+)\/$/)?.[1], name: p.name }))
          .sort((a, b) => Number(a.id) - Number(b.id));

        setPokemonList(pokemons);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    initPokedex();
  }, []);

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
    <>
      {!hideIntro && (
        <div className={`pokedex-intro ${opened ? "open" : ""}`}>
          <div className="top-half" />

          <div className="center-line" />

          <div className="center-button" />

          <div className="bottom-half" />
        </div>
      )}

      <main className={`home-content ${opened ? "visible" : ""}`}>
        <h1
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "0px 20px",
            background: "#222222",
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

        <section
          className="grid"
          style={{ padding: "10px 10px", background: "#222222" }}
        >
          {generationList.map((generation, index) => {
            const generationId = getGenerationId(generation.url);

            const image =
              pokedexImages[`./assets/pokedexes/${generationId}.png`];

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

        <section className="pokedex-screen-frame">
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
                <Link
                  to={`/pokemon/${pokemon.id}`}
                  className="pokemon-link-item"
                >
                  <PokemonCard id={pokemon.id} name={pokemon.name} />
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <Footer></Footer>
      </main>
    </>
  );
}
