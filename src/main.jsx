import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css"; // loads Tailwind + your black/orange theme tokens

// Finds the <div id="root"> from index.html and tells React to
// render <App /> inside it. This is the one-time setup step —
// you won't touch this file again as you build out the app.
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);