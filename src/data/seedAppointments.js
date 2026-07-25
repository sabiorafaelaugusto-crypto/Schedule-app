import { toISODate } from "../lib/schedule";

// Sample data used to preview the Schedule screen (Módulo A) before the
// creation flow (Módulo B) exists. Dates are generated relative to "today"
// so the demo always looks correct regardless of when it's opened.
function daysFromToday(offset) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return toISODate(d);
}

export const seedAppointments = [
  {
    id: "seed-1",
    title: "Follow-up email — TOTVS",
    date: daysFromToday(0),
    time: "14:00",
    priority: "high",
    notes: "Ask about the remote work policy and next steps.",
  },
  {
    id: "seed-2",
    title: "Update LinkedIn keywords",
    date: daysFromToday(0),
    time: "09:30",
    priority: "medium",
    notes: "",
  },
  {
    id: "seed-3",
    title: "",
    date: daysFromToday(0),
    time: "",
    priority: "low",
    notes: "",
  },
  {
    id: "seed-4",
    title: "Practice case study interview",
    date: daysFromToday(2),
    time: "18:00",
    priority: "high",
    notes: "",
  },
  {
    id: "seed-5",
    title: "Check Gupy applications",
    date: daysFromToday(5),
    time: "",
    priority: "medium",
    notes: "",
  },
  {
    id: "seed-6",
    title: "Assessment — BairesDev",
    date: daysFromToday(-1),
    time: "10:00",
    priority: "medium",
    notes: "",
  },
  {
    id: "seed-7",
    title: "Recruiter call",
    date: daysFromToday(-6),
    time: "16:00",
    priority: "low",
    notes: "",
  },
];
