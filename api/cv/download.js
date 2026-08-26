// GET /api/cv/download?token=...
// Verifies a short-lived token issued by /api/cv/unlock, then streams the
// private CV file. The CV lives in /private (never in /public), so there
// is NO public URL that can bypass authentication.
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

// ── Security helpers (inlined to avoid cross-file import issues with Vite) ──

function safeCompare(a, b) {
  const ha = crypto.createHash("sha256").update(String(a), "utf8").digest();
  const hb = crypto.createHash("sha256").update(String(b), "utf8").digest();
  return crypto.timingSafeEqual(ha, hb);
}

function verifyToken(token, secret) {
  if (typeof token !== "string") return false;
  const dot = token.lastIndexOf(".");
  if (dot <= 0) return false;
  const expires = token.slice(0, dot);
  const signature = token.slice(dot + 1);
  if (!/^\d+$/.test(expires)) return false;
  if (!/^[a-f0-9]{64}$/.test(signature)) return false;
  const expected = crypto.createHmac("sha256", secret).update(expires).digest("hex");
  if (!safeCompare(signature, expected)) return false;
  return Date.now() < Number(expires);
}

function applySecurityHeaders(res) {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
  res.setHeader("Referrer-Policy", "no-referrer");
}

// ── Handler ──

export default async function handler(req, res) {
  applySecurityHeaders(res);

  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const configuredPassword = process.env.CV_PASSWORD;
  if (!configuredPassword) {
    return res.status(503).json({ error: "CV service unavailable" });
  }

  const secret = process.env.CV_TOKEN_SECRET || `cv-token::${configuredPassword}`;
  const token = req.query?.token;
  if (typeof token !== "string" || !verifyToken(token, secret)) {
    return res.status(401).json({ error: "Access denied or link expired" });
  }

  const cvPath = path.join(process.cwd(), "private", "cv.pdf");
  let stat;
  try {
    stat = fs.statSync(cvPath);
  } catch {
    return res.status(404).json({ error: "CV not found" });
  }

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Length", String(stat.size));
  res.setHeader("Content-Disposition", 'attachment; filename="Ayomide-Emmanuel-CV.pdf"');

  const stream = fs.createReadStream(cvPath);
  stream.on("error", () => {
    if (!res.headersSent) {
      res.status(500).json({ error: "Unable to read CV" });
    } else {
      res.end();
    }
  });
  stream.pipe(res);
}
