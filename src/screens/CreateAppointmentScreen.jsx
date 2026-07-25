import { useState } from "react";
import PriorityDrawer from "../components/PriorityDrawer";
import { PRIORITY_STYLES } from "../lib/schedule";

const NOTES_LIMIT = 2000;

// Ficha B.1: only Date is required. There is intentionally no cancel
// button — to discard a draft, the user creates it and deletes it from
// the Schedule screen instead (a known trade-off, revisited after testing).
// Also reused as the "expand" destination from the Edit/Duplicate pop-up
// (Ficha C.3), where Notes becomes editable — via `initial` and `submitLabel`.
export default function CreateAppointmentScreen({
  initial,
  submitLabel = "Schedule",
  heading = "New appointment",
  onSchedule,
}) {
  const [title, setTitle] = useState(initial?.title || "");
  const [date, setDate] = useState(initial?.date || "");
  const [time, setTime] = useState(initial?.time || "");
  const [priority, setPriority] = useState(initial?.priority || "");
  const [notes, setNotes] = useState(initial?.notes || "");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dateError, setDateError] = useState(false);

  const priorityStyle = priority ? PRIORITY_STYLES[priority] : null;

  function handleSchedule() {
    if (!date) {
      setDateError(true);
      return;
    }
    onSchedule({
      title: title.trim(),
      date,
      time,
      priority,
      notes: notes.trim(),
    });
  }

  return (
    <div className="min-h-screen bg-paper font-body pb-16">
      <header className="px-5 pt-14 pb-6">
        <p className="font-mono text-[12px] tracking-[0.2em] text-brand-dim uppercase mb-1">
          Prospecting log
        </p>
        <h1 className="font-display text-[28px] font-medium text-ink-900">
          {heading}
        </h1>
      </header>

      <main className="px-5 flex flex-col gap-5">
        <Field label="Title">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Follow-up email — Acme Corp"
            className="w-full bg-paper-raised rounded-card px-4 py-3.5 text-[15px] text-ink-900 placeholder:text-ink-300 outline-none focus:ring-2 focus:ring-brand/30"
          />
        </Field>

        <Field label="Date" required error={dateError ? "Select a date to schedule this appointment." : null}>
          <input
            type="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              if (e.target.value) setDateError(false);
            }}
            className={`w-full bg-paper-raised rounded-card px-4 py-3.5 text-[15px] text-ink-900 outline-none focus:ring-2 focus:ring-brand/30 ${
              dateError ? "ring-2 ring-priority-high/40" : ""
            }`}
          />
        </Field>

        <Field label="Time">
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full bg-paper-raised rounded-card px-4 py-3.5 text-[15px] text-ink-900 outline-none focus:ring-2 focus:ring-brand/30"
          />
        </Field>

        <Field label="Priority">
          <button
            onClick={() => setDrawerOpen(true)}
            className="w-full flex items-center justify-between bg-paper-raised rounded-card px-4 py-3.5 text-left outline-none focus:ring-2 focus:ring-brand/30"
          >
            {priorityStyle ? (
              <span className={`inline-flex items-center gap-2 text-[15px] ${priorityStyle.text}`}>
                <span className={`w-2.5 h-2.5 rounded-full ${priorityStyle.dot}`} />
                {priorityStyle.label}
              </span>
            ) : (
              <span className="text-[15px] text-ink-300">Select priority</span>
            )}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-ink-300">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
        </Field>

        <Field label="Notes">
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value.slice(0, NOTES_LIMIT))}
            placeholder="Add any context for this appointment…"
            rows={6}
            className="w-full bg-paper-raised rounded-card px-4 py-3.5 text-[15px] text-ink-900 placeholder:text-ink-300 outline-none focus:ring-2 focus:ring-brand/30 resize-none"
          />
        </Field>

        <button
          onClick={handleSchedule}
          className="mt-2 w-full bg-brand text-paper-raised rounded-card py-4 text-[15px] font-medium active:scale-[0.99] transition-transform"
        >
          {submitLabel}
        </button>
      </main>

      <PriorityDrawer
        open={drawerOpen}
        value={priority}
        onSelect={setPriority}
        onClose={() => setDrawerOpen(false)}
      />
    </div>
  );
}

function Field({ label, required, error, children }) {
  return (
    <div>
      <label className="flex items-center gap-1 font-body text-[13px] text-ink-500 mb-1.5">
        {label}
        {required && <span className="text-priority-high">*</span>}
      </label>
      {children}
      {error && <p className="font-body text-[12px] text-priority-high mt-1.5">{error}</p>}
    </div>
  );
}
