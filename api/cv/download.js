// GET /api/cv/download?token=...
// Verifies a short-lived token issued by /api/cv/unlock, then sends the
// private CV file. The CV itself lives in /private (never in /public), so
// there is NO public URL that can bypass authentication.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  verifyToken,
  applySecurityHeaders,
} from "../lib/security.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

  const secret =
    process.env.CV_TOKEN_SECRET ||
    `cv-token::${configuredPassword}`;

  // Validate token from query string
  const token = req.query?.token;
  if (typeof token !== "string" || !verifyToken(token, secret)) {
    return res.status(401).json({ error: "Access denied or link expired" });
  }

  // Check candidate folders (private/ at root or relative to function)
  const candidateDirs = [
    path.join(process.cwd(), "private"),
    path.resolve(__dirname, "../../private"),
  ];

  let cvPath = null;
  for (const dir of candidateDirs) {
    try {
      // First check exact "cv.pdf"
      const exactPath = path.join(dir, "cv.pdf");
      if (fs.existsSync(exactPath) && fs.statSync(exactPath).isFile()) {
        cvPath = exactPath;
        break;
      }
      // Fallback: check case-insensitively for any PDF in private/ (e.g. CV.pdf, resume.pdf)
      const files = fs.readdirSync(dir);
      const pdfFile = files.find((f) => f.toLowerCase().endsWith(".pdf"));
      if (pdfFile) {
        cvPath = path.join(dir, pdfFile);
        break;
      }
    } catch {
      // try next directory
    }
  }

  if (!cvPath) {
    return res.status(404).json({
      error: "CV file not found inside private/ folder on server (place cv.pdf in private/cv.pdf)",
    });
  }

  try {
    const buffer = fs.readFileSync(cvPath);
    const filename = path.basename(cvPath);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Length", String(buffer.length));
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="Ayomide-Emmanuel-${filename}"`
    );

    res.statusCode = 200;
    if (typeof res.send === "function") {
      return res.send(buffer);
    }
    return res.end(buffer);
  } catch (err) {
    console.error("Error reading PDF file:", err);
    return res.status(500).json({ error: "Unable to read CV file" });
  }
}
