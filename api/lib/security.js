// Shared security utilities for CV protection endpoints.
// Uses only Node.js built-ins — no external dependencies.
import crypto from "node:crypto";

/**
 * Constant-time string comparison that is safe for arbitrary-length inputs.
 * Both values are hashed first so timingSafeEqual always compares
 * equal-length buffers and never leaks length information.
 */
export function safeCompare(a, b) {
  const ha = crypto.createHash("sha256").update(String(a), "utf8").digest();
  const hb = crypto.createHash("sha256").update(String(b), "utf8").digest();
  return crypto.timingSafeEqual(ha, hb);
}

/**
 * Issue a short-lived, tamper-proof download token.
 * Format: "<expiresAtMs>.<hmac>" — the HMAC covers the expiry so the
 * token cannot be forged or extended without the server secret.
 */
export function issueToken(ttlMs, secret) {
  const expires = Date.now() + ttlMs;
  const signature = crypto
    .createHmac("sha256", secret)
    .update(String(expires))
    .digest("hex");
  return `${expires}.${signature}`;
}

/**
 * Verify a token issued by issueToken().
 * Returns true only when the signature is valid AND the token has not expired.
 */
export function verifyToken(token, secret) {
  if (typeof token !== "string") return false;

  const dot = token.lastIndexOf(".");
  if (dot <= 0) return false;

  const expires = token.slice(0, dot);
  const signature = token.slice(dot + 1);

  if (!/^\d+$/.test(expires)) return false;
  if (!/^[a-f0-9]{64}$/.test(signature)) return false;

  const expected = crypto
    .createHmac("sha256", secret)
    .update(expires)
    .digest("hex");

  if (!safeCompare(signature, expected)) return false;
  return Date.now() < Number(expires);
}

/**
 * Best-effort in-memory rate limiter.
 *
 * NOTE: On serverless platforms (Vercel), memory is shared per warm function
 * instance, not globally, so this limits burst attacks from the same IP on a
 * warm instance. For strict global limiting, swap this for a Redis/Upstash
 * backed implementation — the function signature is drop-in compatible.
 */
const attempts = new Map();
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_ATTEMPTS = 5;

export function checkRateLimit(key) {
  const now = Date.now();
  const record = attempts.get(key);

  // Periodically prune the map so cold/warm instances never grow unbounded
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

/** Apply hardened headers to every CV endpoint response. */
export function applySecurityHeaders(res) {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
  res.setHeader("Referrer-Policy", "no-referrer");
}

/** Extract the client IP (best effort) for rate limiting. */
export function getClientIp(req) {
  const fwd = req.headers["x-forwarded-for"];
  if (typeof fwd === "string" && fwd.length > 0) {
    return fwd.split(",")[0].trim();
  }
  return req.socket?.remoteAddress || "unknown";
}
