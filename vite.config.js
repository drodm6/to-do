import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Standard Vite config for a React + Tailwind v4 project.
// The tailwindcss() plugin is what makes `@import 'tailwindcss'`
// at the top of index.css actually work — no separate
// tailwind.config.js or content globs needed in v4.
export default defineConfig({
  plugins: [react(), tailwindcss()],
});