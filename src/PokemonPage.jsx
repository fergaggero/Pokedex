import { useEffect, useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { capitalize } from "./Utils.jsx";
import { PokemonBackgroundEffect } from "./components/PokemonBackgroundEffect.jsx";
import { EvolutionTree } from "./components/EvolutionTree.jsx";
import ReactCompareImage from "react-compare-image";
import "./css/App.css";

const API_URL = "https://pokeapi.co/api/v2";

export function PokemonPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isScrolled, setIsScrolled] = useState(false);
  const [tab, setTab] = useState("info");
  const [pokemon, setPokemon] = useState(null);
  const [evolution, setEvolution] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [glowColor, setGlowColor] = useState(null);
  const [zoomImage, setZoomImage] = useState(null);
  const typeColors = {
    grass: "#439938",
    fire: "#E5623E",
    water: "#3299E2",
    electric: "#E0BC27",
    psychic: "#EA6B8E",
    ice: "#46C7CA",
    dragon: "#586FBC",
    dark: "#4F4747",
    fairy: "#E28CE1",
    fighting: "#E58F22",
    poison: "#9354CB",
    ground: "#A5733B",
    flying: "#77A8CB",
    bug: "#9F9E2B",
    rock: "#A8A37F",
    ghost: "#6F4672",
    steel: "#77B0C6",
    normal: "#838383",
  };
  const typesImages = import.meta.glob("./assets/types/*.svg", {
    eager: true,
    import: "default",
  });

  const changePokemon = (offset) => {
    const newId = Number(id) + offset;

    if (newId < 1) return;

    navigate(`/pokemon/${newId}`);
  };

  const handleZoom = (imageUrl) => {
    setZoomImage(imageUrl);
  };

  useEffect(() => {
    const loadPokemon = async () => {
      try {
        setLoading(true);

        // Pokémon principal
        const pokemonResponse = await fetch(`${API_URL}/pokemon/${id}`);
        const pokemonData = await pokemonResponse.json();

        setPokemon(pokemonData);

        const primaryType = pokemonData.types?.[0]?.type?.name;
        setGlowColor(typeColors[primaryType] || "#4ade80");

        // Especie
        const speciesResponse = await fetch(`${API_URL}/pokemon-species/${id}`);
        const speciesData = await speciesResponse.json();

        const description =
          speciesData.flavor_text_entries.find(
            (entry) => entry.language.name === "es",
          )?.flavor_text ?? "";

        // Variantes
        const variantsData = await Promise.all(
          speciesData.varieties.map(async (variant) => {
            const response = await fetch(variant.pokemon.url);

            return {
              ...variant,
              data: await response.json(),
            };
          }),
        );

        // Descripciones en español
        const flavorTexts = speciesData.flavor_text_entries.filter(
          (entry) => entry.language.name === "es",
        );

        // Cadena evolutiva
        const evolutionResponse = await fetch(speciesData.evolution_chain.url);

        const evolutionChainData = await evolutionResponse.json();

        setEvolution({
          ...speciesData,
          variantsData,
          flavorTexts,
          description,
          evolutionChain: evolutionChainData.chain,
        });

        console.log(speciesData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadPokemon();
  }, [id]);

  // controlar scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // obtener cadena evolutiva
  function extractEvolutionChain(chain) {
    const evolutions = [];

    function traverse(node) {
      evolutions.push({
        name: node.species.name,
        url: node.species.url,
      });

      node.evolves_to.forEach(traverse);
    }

    traverse(chain);

    return evolutions;
  }

  // HEADER CARGANDO
  if (loading)
    return (
      <main>
        <header className="header">
          <button className="btn" onClick={() => navigate("/")}>
            <FaChevronLeft className="icon" />
          </button>

          <h1 style={{ margin: "auto" }}>Cargando...</h1>

          <button className="btn">
            <FaHeart className="icon" />
          </button>
        </header>
      </main>
    );

  // ERROR
  if (error) return <p>Error: {error}</p>;

  // SIN DATOS
  if (!pokemon) return null;

  return (
    <main>
      {/* HEADER */}

      <header className={`header ${isScrolled ? "header-scrolled" : ""}`}>
        <button className="btn" onClick={() => navigate("/")}>
          <FaChevronLeft className="icon" />
        </button>

        <h1 style={{ margin: "auto" }}>#{pokemon.id}</h1>

        <button className="btn">
          <FaHeart className="icon" />
        </button>
      </header>

      {/* DIALOG ZOOM */}

      {zoomImage && (
        <dialog open className="zoom-dialog" onClick={() => setZoomImage(null)}>
          <img
            src={zoomImage}
            alt=""
            className="zoom-image"
            onClick={(e) => e.stopPropagation()}
          />
        </dialog>
      )}

      <PokemonBackgroundEffect
        type={pokemon.types[0].type.name}
        color={glowColor}
      />

      {/* FICHA PRINCIPAL */}

      <section className="pokemon-hero">
        <div
          className="pokemon-glow"
          style={{
            "--glow-color": glowColor,
          }}
        ></div>

        <div className="swipe-hint-container">
          <div className="hint-content">
            <span>2D</span>
            <div className="arrow-container">
              <div className="arrow-head left"></div>
              <div className="arrow-line"></div>
              <div className="arrow-head right"></div>
            </div>
            <span>3D</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "15px",
            height: "400px",
          }}
        >
          <button
            className="btn-small"
            disabled={Number(id) <= 1}
            onClick={() => changePokemon(-1)}
          >
            <FaChevronLeft className="icon-small" />
          </button>

          <div style={{ width: "400px" }}>
            <ReactCompareImage
              leftImage={
                pokemon.sprites.other["official-artwork"].front_default
              }
              rightImage={pokemon.sprites.other["home"].front_default}
              handleSize="0"
              sliderLineWidth="0"
              sliderPositionPercentage="1"
              hover="true"
              rightImageCss={{ marginTop: "0px" }}
            />
          </div>

          <button className="btn-small" onClick={() => changePokemon(1)}>
            <FaChevronRight className="icon-small" />
          </button>
        </div>

        <h1>{capitalize(pokemon.name)}</h1>

        <div className="types-container">
          {pokemon.types.map((typeInfo) => {
            const typeName = typeInfo.type.name;
            const typeColor = typeColors[typeName] || "#a3a3a3";

            const image = typesImages[`./assets/types/${typeName}.svg`];

            return (
              <div
                className="type-badge"
                key={typeName}
                style={{
                  backgroundColor: typeColor,
                }}
              >
                <img className="type-img" src={image} alt="" />
                <span key={typeName}>{typeName.toUpperCase()}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* TABS */}

      <div className="tabs">
        <div className="tab-div">
          <button className="tab-button" onClick={() => setTab("info")}>
            Información
          </button>
          {tab === "info" && <div className="tab-selected"></div>}
        </div>

        <div className="tab-div">
          <button className="tab-button" onClick={() => setTab("stats")}>
            Stats
          </button>
          {tab === "stats" && <div className="tab-selected"></div>}
        </div>

        <div className="tab-div">
          <button className="tab-button" onClick={() => setTab("evolution")}>
            Cadena evolutiva
          </button>
          {tab === "evolution" && <div className="tab-selected"></div>}
        </div>

        <div className="tab-div">
          <button className="tab-button" onClick={() => setTab("sprites")}>
            Sprites
          </button>
          {tab === "sprites" && <div className="tab-selected"></div>}
        </div>

        <div className="tab-div">
          <button className="tab-button" onClick={() => setTab("alternate")}>
            Formas alternativas
          </button>
          {tab === "alternate" && <div className="tab-selected"></div>}
        </div>

        <div className="tab-div">
          <button className="tab-button" onClick={() => setTab("lang")}>
            En otros idiomas
          </button>
          {tab === "lang" && <div className="tab-selected"></div>}
        </div>
      </div>

      {/* CONTENIDO */}

      {tab === "info" && (
        <section>
          <p>{evolution.description}</p>

          <p>
            Altura: <b> {pokemon.height / 10} m.</b>
          </p>

          <p>
            Peso: <b>{pokemon.weight / 10} kg.</b>
          </p>

          <p>
            Amistad: <b>{evolution.base_happiness} </b>
          </p>

          <p>
            Ratio de captura: <b>{evolution.capture_rate} </b>
          </p>

          <p>
            Habilidades:{" "}
            <b>{pokemon.abilities.map((h) => h.ability.name).join(", ")}</b>
          </p>
        </section>
      )}

      {tab === "stats" && (
        <section className="card" style={{ margin: "20px" }}>
          <div>
            {pokemon.stats.map((statsInfo) => {
              return (
                <div
                  key={statsInfo.stat.name}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "150px 50px 1fr",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <span>{capitalize(statsInfo.stat.name)}</span>
                  <span>{statsInfo.base_stat}</span>
                  <div className="stat-bar">
                    <div
                      className="stat-fill"
                      style={{
                        "--glow-color": glowColor,
                        width: `${(statsInfo.base_stat / 255) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {tab === "evolution" && (
        <section>
          <h2>Cadena evolutiva</h2>

          <EvolutionTree chain={evolution?.evolutionChain} />
        </section>
      )}

      {tab === "sprites" && (
        <section>
          <ul
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
              gap: "1rem",
              listStyle: "none",
              padding: 0,
            }}
          >
            <li>
              <h3>Frente</h3>
              <img
                className="sprite"
                src={pokemon.sprites.front_default}
                alt=""
                onClick={() => handleZoom(pokemon.sprites.front_default)}
              />
            </li>

            <li>
              <h3>Espalda</h3>
              <img
                className="sprite"
                src={pokemon.sprites.back_default}
                alt=""
                onClick={() => handleZoom(pokemon.sprites.back_default)}
              />
            </li>

            <li>
              <h3> Dream World</h3>
              <img
                className="sprite"
                src={pokemon.sprites.other["dream_world"].front_default}
                alt=""
                onClick={() =>
                  handleZoom(pokemon.sprites.other["dream_world"].front_default)
                }
              />
            </li>

            <li>
              <h3> Pokémon Home</h3>
              <img
                className="sprite"
                src={pokemon.sprites.other["home"].front_default}
                alt=""
                onClick={() =>
                  handleZoom(pokemon.sprites.other["home"].front_default)
                }
              />
            </li>

            <li>
              <h3> Showdown</h3>
              <img
                className="sprite"
                src={pokemon.sprites.other["showdown"].front_default}
                alt=""
                onClick={() =>
                  handleZoom(pokemon.sprites.other["showdown"].front_default)
                }
              />
            </li>
          </ul>
        </section>
      )}

      {tab === "alternate" && (
        <section>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
              gap: "1rem",
              listStyle: "none",
              padding: 0,
            }}
          >
            {evolution.variantsData.map((variant) => {
              return (
                <div>
                  <h3>{capitalize(variant.pokemon.name)}</h3>
                  <img
                    className="sprite"
                    src={
                      variant.data.sprites.other["official-artwork"]
                        .front_default
                    }
                    alt=""
                    onClick={() =>
                      handleZoom(
                        variant.data.sprites.other["official-artwork"]
                          .front_default,
                      )
                    }
                  />
                </div>
              );
            })}
          </div>
        </section>
      )}

      {tab === "lang" && (
        <section>
          {evolution.names.map((form) => {
            return (
              <div>
                <small>{form.language.name}</small>
                <h4> {form.name}</h4>
              </div>
            );
          })}
        </section>
      )}
    </main>
  );
}
