// Client-side service for the protected CV download flow.
//
// Security notes:
// - The password is sent to the server once via HTTPS POST and is NEVER
//   logged, persisted, stored in localStorage, or placed in a URL.
// - The short-lived token returned by the server expires in 60 seconds
//   and is kept only in memory.
// - There is no public CV URL anywhere in the frontend bundle.

/**
 * Ask the server to validate the password.
 * Returns { ok } plus either a download token or a machine-readable reason.
 */
export async function unlockCV(password) {
  let res;
  try {
    res = await fetch("/api/cv/unlock", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
  } catch {
    // Network failure (offline, tunnel down, local dev without API)
    return { ok: false, reason: "unavailable" };
  }

  if (res.status === 401) return { ok: false, reason: "incorrect" };
  if (res.status === 429) return { ok: false, reason: "rate-limited" };
  if (res.status === 503) return { ok: false, reason: "unconfigured" };
  if (!res.ok) return { ok: false, reason: "unavailable" };

  try {
    const data = await res.json();
    if (typeof data.token !== "string") {
      return { ok: false, reason: "unavailable" };
    }
    return { ok: true, token: data.token };
  } catch {
    return { ok: false, reason: "unavailable" };
  }
}

/**
 * Exchange a short-lived token for the CV file and trigger a browser download.
 * The response is read as a blob so the token never enters browser history
 * as a navigated URL, and the CV is never addressable by a permanent link.
 */
export async function downloadCV(token) {
  let res;
  try {
    res = await fetch(`/api/cv/download?token=${encodeURIComponent(token)}`);
  } catch {
    return false;
  }

  if (!res.ok) return false;

  try {
    const blob = await res.blob();
    if (blob.size === 0) return false;

    const objectUrl = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = objectUrl;
    anchor.download = "Ayomide-Emmanuel-CV.pdf";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    // Defer revocation so the download has time to start
    setTimeout(() => URL.revokeObjectURL(objectUrl), 4000);
    return true;
  } catch {
    return false;
  }
}
