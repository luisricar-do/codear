import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const MIMES = {
  ".json": "application/json",
  ".md": "text/markdown; charset=utf-8",
  ".pdf": "application/pdf",
};

/**
 * Plugin Vite que:
 * - Em dev: serve a pasta ./content em /content
 * - Em build: copia ./content para dist/content
 */
export function contentPlugin() {
  let root;
  return {
    name: "vite-plugin-content",
    configResolved(config) {
      root = config.root;
    },
    configureServer(server) {
      const contentDir = path.resolve(root, "content");
      server.middlewares.use("/content", (req, res, next) => {
        const urlPath = req.url?.split("?")[0] || "";
        const safePath = path.normalize(urlPath).replace(/^(\.\.(\/|\\))+/, "");
        const filePath = path.join(contentDir, safePath);
        if (!filePath.startsWith(contentDir) || !fs.existsSync(filePath)) {
          return next();
        }
        const stat = fs.statSync(filePath);
        if (!stat.isFile()) return next();
        const ext = path.extname(filePath);
        const mime = MIMES[ext] || "application/octet-stream";
        res.setHeader("Content-Type", mime);
        fs.createReadStream(filePath).pipe(res);
      });
    },
    closeBundle() {
      const contentDir = path.resolve(root, "content");
      const outDir = path.resolve(root, "dist");
      const dest = path.join(outDir, "content");
      if (!fs.existsSync(contentDir)) return;
      fs.mkdirSync(dest, { recursive: true });
      function copyRecursive(src, dst) {
        const entries = fs.readdirSync(src, { withFileTypes: true });
        for (const e of entries) {
          const s = path.join(src, e.name);
          const d = path.join(dst, e.name);
          if (e.isDirectory()) {
            fs.mkdirSync(d, { recursive: true });
            copyRecursive(s, d);
          } else {
            fs.copyFileSync(s, d);
          }
        }
      }
      copyRecursive(contentDir, dest);
    },
  };
}
