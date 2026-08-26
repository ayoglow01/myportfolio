import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv, Plugin } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";
// @ts-expect-error JS API handlers without TS declarations
import unlockHandler from "./api/cv/unlock.js";
// @ts-expect-error JS API handlers without TS declarations
import downloadHandler from "./api/cv/download.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Vite middleware plugin that runs the /api/cv/* serverless endpoints
// during local development (`npm run dev`) and local preview (`vite preview`)
// so you don't need `npx vercel dev` installed.
function cvApiMiddlewarePlugin(): Plugin {
  const attachMiddleware = (server: any) => {
    server.middlewares.use(async (req: any, res: any, next: any) => {
      const urlObj = new URL(req.url || "/", "http://localhost");
      const pathname = urlObj.pathname;

      if (pathname !== "/api/cv/unlock" && pathname !== "/api/cv/download") {
        return next();
      }

      // Shim Vercel-style res.status(code).json(data) / res.send(data)
      res.status = (statusCode: number) => {
        res.statusCode = statusCode;
        return res;
      };
      res.json = (data: any) => {
        if (!res.getHeader("Content-Type")) {
          res.setHeader("Content-Type", "application/json");
        }
        res.end(JSON.stringify(data));
        return res;
      };
      res.send = (data: any) => {
        res.end(data);
        return res;
      };

      // Shim req.query from URL search params
      req.query = Object.fromEntries(urlObj.searchParams.entries());

      // Parse JSON body for POST requests
      if (req.method === "POST") {
        const chunks: Buffer[] = [];
        for await (const chunk of req) {
          chunks.push(Buffer.from(chunk));
        }
        const raw = Buffer.concat(chunks).toString("utf8");
        try {
          req.body = raw ? JSON.parse(raw) : {};
        } catch {
          req.body = {};
        }
      }

      try {
        if (pathname === "/api/cv/unlock") {
          await unlockHandler(req, res);
        } else if (pathname === "/api/cv/download") {
          await downloadHandler(req, res);
        }
      } catch (err) {
        console.error("Local API handler error:", err);
        if (!res.headersSent) {
          res.status(500).json({ error: "Internal server error" });
        } else {
          res.end();
        }
      }
    });
  };

  return {
    name: "vite-plugin-cv-api",
    configureServer(server) {
      attachMiddleware(server);
    },
    configurePreviewServer(server) {
      attachMiddleware(server);
    },
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load ALL environment variables from .env (including non-VITE_ variables
  // like CV_PASSWORD and CV_TOKEN_SECRET) into process.env for local API routes
  const env = loadEnv(mode, process.cwd(), "");
  Object.assign(process.env, env);

  return {
    plugins: [react(), tailwindcss(), cvApiMiddlewarePlugin(), viteSingleFile()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  };
});
