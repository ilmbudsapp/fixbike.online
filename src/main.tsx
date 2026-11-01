import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";

import App from "./App.tsx";
import "./styles/fonts.css";
import "./App.css";

const el = document.getElementById("root")!;
const tree = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

if (el.hasChildNodes()) {
  hydrateRoot(el, tree);
} else {
  createRoot(el).render(tree);
}
