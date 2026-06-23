import React from "react";
import "../css/Types.css";

export function DragonEffect() {
  return (
    <div className="dragon-effect-container">
      {/* Capa 1: Escamas principales */}
      <div className="scales-pattern" />

      {/* Capa 2: Un destello tenue que se mueve detrás para dar profundidad */}
      <div className="dragon-glow" />
    </div>
  );
}
