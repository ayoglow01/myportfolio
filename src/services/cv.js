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
 * Returns { ok: true } on success, or { ok: false, error: string } if server returned an error.
 */
export async function downloadCV(token) {
  let res;
  try {
    res = await fetch(`/api/cv/download?token=${encodeURIComponent(token)}`);
  } catch {
    return { ok: false, error: "Network error while downloading CV." };
  }

  if (!res.ok) {
    try {
      const data = await res.json();
      return {
        ok: false,
        error: data.error || `Server responded with status ${res.status}`,
      };
    } catch {
      return { ok: false, error: `Failed to download CV (HTTP ${res.status}).` };
    }
  }

  try {
    const blob = await res.blob();
    if (blob.size === 0) {
      return { ok: false, error: "Received empty PDF file." };
    }

    const objectUrl = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = objectUrl;
    anchor.download = "Ayomide-Emmanuel-CV.pdf";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(objectUrl), 4000);
    return { ok: true };
  } catch (err) {
    return { ok: false, error: "Failed to save downloaded file." };
  }
}
