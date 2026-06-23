import { Routes, Route } from "react-router-dom";
import { Home } from "./Home.jsx";
import { PokemonPage } from "./PokemonPage.jsx";

import "@fontsource/poppins";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/700.css";
import "@fontsource/poppins/900.css";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pokemon/:id" element={<PokemonPage />} />
    </Routes>
  );
}
