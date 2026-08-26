// POST /api/cv/unlock
// Validates the CV password server-side and returns a short-lived
// download token. The password never leaves this function and is never
// exposed to the client.
import crypto from "node:crypto";

// ── Security helpers (inlined to avoid cross-file import issues with Vite) ──

function safeCompare(a, b) {
  const ha = crypto.createHash("sha256").update(String(a), "utf8").digest();
  const hb = crypto.createHash("sha256").update(String(b), "utf8").digest();
  return crypto.timingSafeEqual(ha, hb);
}

function issueToken(ttlMs, secret) {
  const expires = Date.now() + ttlMs;
  const signature = crypto
    .createHmac("sha256", secret)
    .update(String(expires))
    .digest("hex");
  return `${expires}.${signature}`;
}

// Best-effort in-memory rate limiter (per warm serverless instance)
const attempts = new Map();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;

function checkRateLimit(key) {
  const now = Date.now();
  const record = attempts.get(key);
  if (attempts.size > 5000) attempts.clear();
  if (!record || now - record.start > WINDOW_MS) {
    attempts.set(key, { start: now, count: 1 });
    return { allowed: true, remaining: MAX_ATTEMPTS - 1, retryAfter: 0 };
  }
  record.count += 1;
  if (record.count > MAX_ATTEMPTS) {
    return {
      allowed: false,
      remaining: 0,
      retryAfter: Math.ceil((record.start + WINDOW_MS - now) / 1000),
    };
  }
  return { allowed: true, remaining: MAX_ATTEMPTS - record.count, retryAfter: 0 };
}

function applySecurityHeaders(res) {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
  res.setHeader("Referrer-Policy", "no-referrer");
}

function getClientIp(req) {
  const fwd = req.headers["x-forwarded-for"];
  if (typeof fwd === "string" && fwd.length > 0) return fwd.split(",")[0].trim();
  return req.socket?.remoteAddress || "unknown";
}

// ── Handler ──

const TOKEN_TTL_MS = 60 * 1000;

export default async function handler(req, res) {
  applySecurityHeaders(res);

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const contentLength = Number(req.headers["content-length"] || 0);
  if (contentLength > 4096) {
    return res.status(413).json({ error: "Request too large" });
  }

  const ip = getClientIp(req);
  const limit = checkRateLimit(`cv-unlock:${ip}`);
  if (!limit.allowed) {
    res.setHeader("Retry-After", String(limit.retryAfter));
    return res.status(429).json({ error: "Too many attempts. Please try again later." });
  }

  const body = req.body ?? {};
  const password = body.password;
  if (typeof password !== "string" || password.length === 0 || password.length > 128) {
    return res.status(400).json({ error: "Invalid request" });
  }

  const configuredPassword = process.env.CV_PASSWORD;
  if (!configuredPassword) {
    return res.status(503).json({ error: "CV service unavailable" });
  }

  const isValid = safeCompare(password, configuredPassword);
  if (!isValid) {
    return res.status(401).json({ error: "Incorrect password" });
  }

  const secret = process.env.CV_TOKEN_SECRET || `cv-token::${configuredPassword}`;
  const token = issueToken(TOKEN_TTL_MS, secret);

  return res.status(200).json({ token, expiresIn: Math.floor(TOKEN_TTL_MS / 1000) });
}
