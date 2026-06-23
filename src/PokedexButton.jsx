import { useState } from "react";

export function PokedexButton({
  name,
  generationId,
  image,
  selected = false,
  onSelect,
}) {
  const buttonClassName = selected
    ? "generation-btn selected"
    : "generation-btn";

  return (
    <button key={name} className={buttonClassName} onClick={onSelect}>
      <img src={image} alt={name} />

      <p>{name}</p>
    </button>
  );
}
