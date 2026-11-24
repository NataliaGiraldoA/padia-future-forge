import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";
import type { IncomingMessage, ServerResponse } from "http";
import { componentTagger } from "lovable-tagger";

/**
 * Plugin que persiste los cambios hechos desde /admin directamente en
 * `src/data/padiaContent.json` dentro del código fuente del repositorio.
 */
function padiaCodePersistencePlugin(): Plugin {
  const dataFilePath = path.resolve(__dirname, "./src/data/padiaContent.json");

  const attachMiddleware = (
    middlewares: {
      use: (
        route: string,
        fn: (req: IncomingMessage, res: ServerResponse, next: () => void) => void,
      ) => void;
    },
  ) => {
    middlewares.use("/api/admin-content", (req, res, next) => {
      if (req.method === "GET") {
        try {
          const raw = fs.readFileSync(dataFilePath, "utf-8");
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json; charset=utf-8");
          res.end(raw);
        } catch (err) {
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json; charset=utf-8");
          res.end(JSON.stringify({ ok: false, error: String(err) }));
        }
        return;
      }

      if (req.method === "POST") {
        let body = "";
        req.on("data", (chunk) => {
          body += chunk;
        });
        req.on("end", () => {
          try {
            const parsed = JSON.parse(body);
            if (!Array.isArray(parsed.members) || !Array.isArray(parsed.projects)) {
              res.statusCode = 400;
              res.setHeader("Content-Type", "application/json; charset=utf-8");
              res.end(JSON.stringify({ ok: false, error: "Invalid payload" }));
              return;
            }
            const formatted = JSON.stringify(
              { members: parsed.members, projects: parsed.projects },
              null,
              2,
            );
            fs.writeFileSync(dataFilePath, `${formatted}\n`, "utf-8");
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json; charset=utf-8");
            res.end(JSON.stringify({ ok: true, file: "src/data/padiaContent.json" }));
          } catch (err) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json; charset=utf-8");
            res.end(JSON.stringify({ ok: false, error: String(err) }));
          }
        });
        return;
      }

      next();
    });
  };

  return {
    name: "padia-code-persistence",
    configureServer(server) {
      attachMiddleware(server.middlewares);
    },
    configurePreviewServer(server) {
      attachMiddleware(server.middlewares);
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: '/',
  server: {
    allowedHosts: ['lidis.usbcali.edu.co', '.lidis.usbcali.edu.co'],
    host: "::",
    port: 3000,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    padiaCodePersistencePlugin(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
