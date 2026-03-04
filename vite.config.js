import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { contentPlugin } from "./vite-plugin-content.js";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), contentPlugin()],
});
