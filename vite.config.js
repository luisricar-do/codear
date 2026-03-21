import fs from "node:fs";
import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { contentPlugin } from "./vite-plugin-content.js";

/** GitHub Pages: sem servidor SPA, o 404.html recebe URLs desconhecidas — cópia do index carrega o React na rota certa. */
function spaFallback404() {
  let outDir;
  return {
    name: "spa-fallback-404",
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir);
    },
    closeBundle() {
      const indexHtml = path.join(outDir, "index.html");
      const notFoundHtml = path.join(outDir, "404.html");
      if (fs.existsSync(indexHtml)) {
        fs.copyFileSync(indexHtml, notFoundHtml);
      }
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss(), contentPlugin(), spaFallback404()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (id.includes("react-pdf") || id.includes("pdfjs-dist")) return "pdf";
          if (id.includes("framer-motion")) return "motion";
          if (id.includes("react-markdown") || id.includes("remark") || id.includes("micromark"))
            return "markdown";
          if (id.includes("react-dom") || id.includes("/react/") || id.includes("scheduler"))
            return "react-vendor";
          if (id.includes("react-router")) return "router";
        },
      },
    },
  },
});
