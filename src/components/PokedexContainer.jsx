import { useState } from "react";
import "../css/App.css";

export function PokedexContainer({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`pokedex-shell ${isOpen ? "open" : ""}`}
      onClick={() => !isOpen && setIsOpen(true)}
    >
      {isOpen ? (
        <div className="content-inner fade-in">{children}</div>
      ) : (
        <div className="closed-label">POKEDEX</div>
      )}
    </div>
  );
}
