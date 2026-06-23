import "../css/SearchBar.css";

export function SearchBar({ onSearch }) {
  return (
    <div className="search-container">
      <div className="search-box">
        <input
          type="text"
          placeholder="Buscar Pokémon..."
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
    </div>
  );
}
