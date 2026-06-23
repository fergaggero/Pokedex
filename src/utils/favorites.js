export function getFavorites() {
  const favorites = localStorage.getItem("favorites");

  return favorites ? JSON.parse(favorites) : [];
}

export function isFavorite(id) {
  return getFavorites().includes(Number(id));
}

export function toggleFavorite(id) {
  const favorites = getFavorites();

  const pokemonId = Number(id);

  if (favorites.includes(pokemonId)) {
    const updated = favorites.filter((fav) => fav !== pokemonId);

    localStorage.setItem("favorites", JSON.stringify(updated));

    return false;
  }

  const updated = [...favorites, pokemonId];

  localStorage.setItem("favorites", JSON.stringify(updated));

  return true;
}
