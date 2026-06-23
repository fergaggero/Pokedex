import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";

const root = createRoot(document.getElementById("app"));

root.render(
  <BrowserRouter>
    <div id="pokedex-root" className="pokedex-wrapper">
      <App />
    </div>
  </BrowserRouter>,
);
