// Minimal localStorage persistence. No backend, no external database —
// consistent with the "autonomia sem nuvem" premise for this V2.
const KEY = "prospecting-schedule:appointments";

export function loadAppointments(fallback) {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // Corrupted or inaccessible storage — fall back to seed data below.
  }
  return fallback;
}

export function saveAppointments(appointments) {
  try {
    localStorage.setItem(KEY, JSON.stringify(appointments));
  } catch {
    // Storage full or unavailable — creation flow still works for the
    // current session, it just won't persist across reloads.
  }
}

export function createId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `appt-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
