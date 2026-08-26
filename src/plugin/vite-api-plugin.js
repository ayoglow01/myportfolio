// Vite plugin that runs the Vercel serverless functions locally during
// development so `npm run dev` works without `vercel dev`.
//
// Usage: import this in vite.config.ts and add it to the plugins array.
//   import { cvApiPlugin } from "./src/plugins/vite-api-plugin.js";
//   plugins: [react(), tailwindcss(), viteSingleFile(), cvApiPlugin()]

import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "../..");

// Load .env from project root (Vite only auto-loads VITE_ prefixed vars)
function loadEnv() {
  try {
    const fs = createRequire(import.meta.url)("node:fs");
    const envPath = path.join(projectRoot, ".env");
    if (!fs.existsSync(envPath)) return;
    const lines = fs.readFileSync(envPath, "utf8").split("\n");
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq <= 0) continue;
      const key = trimmed.slice(0, eq).trim();
      const val = trimmed.slice(eq + 1).trim();
      if (!(key in process.env)) {
        process.env[key] = val;
      }
    }
  } catch {
    // .env not readable — that's fine, user may have set vars in shell
  }
}

export function cvApiPlugin() {
  return {
    name: "cv-api-dev",
    configureServer(server) {
      // Load .env once when the dev server starts
      loadEnv();

      server.middlewares.use(async (req, res, next) => {
        // Only intercept our API routes
        if (!req.url?.startsWith("/api/cv/")) return next();

        // Parse the route
        const route = req.url.split("?")[0];
        let handler;
        try {
          if (route === "/api/cv/unlock") {
            handler = (await import("../../api/cv/unlock.js")).default;
          } else if (route === "/api/cv/download") {
            handler = (await import("../../api/cv/download.js")).default;
          }
        } catch (e) {
          console.error("[cv-api] Failed to load handler:", e.message);
        }

        if (!handler) return next();

        // Build a minimal Vercel-compatible req/res pair
        const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);

        // Parse body for POST requests
        let body = undefined;
        if (req.method === "POST") {
          body = await new Promise((resolve) => {
            let data = "";
            req.on("data", (chunk) => (data += chunk));
            req.on("end", () => {
              try { resolve(JSON.parse(data)); }
              catch { resolve({}); }
            });
          });
        }

        // Merge query params
        req.query = Object.fromEntries(url.searchParams);

        // Provide body on the request object (Vercel style)
        req.body = body;

        // Shim res methods that Vercel handlers expect
        const originalRes = res;
        const shimRes = {
          _status: 200,
          _headers: {},
          status(code) { this._status = code; return this; },
          setHeader(k, v) { this._headers[k] = v; originalRes.setHeader(k, v); return this; },
          json(data) {
            originalRes.writeHead(this._status, {
              ...this._headers,
              "Content-Type": "application/json",
            });
            originalRes.end(JSON.stringify(data));
          },
          pipe(stream) {
            originalRes.writeHead(this._status, this._headers);
            stream.pipe(originalRes);
          },
          end(data) { originalRes.end(data); },
        };

        try {
          await handler(req, shimRes);
        } catch (e) {
          console.error("[cv-api] Handler error:", e);
          if (!originalRes.headersSent) {
            originalRes.writeHead(500, { "Content-Type": "application/json" });
            originalRes.end(JSON.stringify({ error: "Internal server error" }));
          }
        }
      });
    },
  };
}
