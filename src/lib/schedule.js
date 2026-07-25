// Classification logic for the Schedule screen (Ficha A.1 / A.2).
// Rules (from product spec):
// - "today": appointment date === current date
// - "previous": appointment date < current date, limited to the last 30 days
// - "upcoming": appointment date is between tomorrow and 7 days from today (rolling window)
// - Items further than 7 days out are not shown yet; they appear as the window reaches them.
// - There is no "overdue" state: the Today -> Previous transition happens at midnight only.

const DAY_MS = 24 * 60 * 60 * 1000;

/** Strips time information, returns a Date set to local midnight. */
function toDateOnly(dateStr) {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function daysBetween(a, b) {
  return Math.round((toDateOnly(b) - toDateOnly(a)) / DAY_MS);
}

/**
 * Returns which tab an appointment belongs to, or null if it should not be
 * shown yet (further than 7 days out) or is older than the 30-day retention
 * window for Previous.
 */
export function classifyAppointment(appointment, today = new Date()) {
  const todayStr = toISODate(today);
  const diff = daysBetween(todayStr, appointment.date);

  if (diff === 0) return "today";
  if (diff < 0) return diff >= -30 ? "previous" : null;
  return diff <= 7 ? "upcoming" : null;
}

export function toISODate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function groupAppointments(appointments, today = new Date()) {
  const groups = { previous: [], today: [], upcoming: [] };

  for (const appt of appointments) {
    const bucket = classifyAppointment(appt, today);
    if (bucket) groups[bucket].push(appt);
  }

  // Previous: most recent first. Today/Upcoming: soonest first.
  groups.previous.sort((a, b) => b.date.localeCompare(a.date) || (a.time || "").localeCompare(b.time || ""));
  groups.today.sort((a, b) => (a.time || "").localeCompare(b.time || ""));
  groups.upcoming.sort((a, b) => a.date.localeCompare(b.date) || (a.time || "").localeCompare(b.time || ""));

  return groups;
}

export const PRIORITY_STYLES = {
  high: { label: "High", dot: "bg-priority-high", tint: "bg-priority-highTint", text: "text-priority-high" },
  medium: { label: "Medium", dot: "bg-priority-medium", tint: "bg-priority-mediumTint", text: "text-priority-medium" },
  low: { label: "Low", dot: "bg-priority-low", tint: "bg-priority-lowTint", text: "text-priority-low" },
};

export function formatCardDate(dateStr) {
  const d = toDateOnly(dateStr);
  const day = d.getDate();
  const month = d.toLocaleString("en-US", { month: "short" }).toUpperCase();
  return { day, month };
}

export function formatTime12h(time) {
  if (!time) return null;
  const [h, m] = time.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${String(m).padStart(2, "0")} ${period}`;
}
