import { useState } from "react";
import PriorityDrawer from "./PriorityDrawer";
import { PRIORITY_STYLES } from "../lib/schedule";

// Ficha C.3: compact pop-up for Edit/Duplicate — title, date, time,
// priority only (Notes is never shown here; it's only reachable by
// expanding to the dedicated screen). All four fields stay optional
// except Date, same as the creation flow.
export default function EditPopup({ appointment, mode, onConfirm, onExpand, onClose }) {
  const [title, setTitle] = useState(appointment.title || "");
  const [date, setDate] = useState(appointment.date || "");
  const [time, setTime] = useState(appointment.time || "");
  const [priority, setPriority] = useState(appointment.priority || "");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dateError, setDateError] = useState(false);

  const priorityStyle = priority ? PRIORITY_STYLES[priority] : null;
  const confirmLabel = mode === "duplicate" ? "Duplicate" : "Confirm";

  function currentFields() {
    return { title: title.trim(), date, time, priority, notes: appointment.notes || "" };
  }

  function handleConfirm() {
    if (!date) {
      setDateError(true);
      return;
    }
    onConfirm(currentFields());
  }

  function handleExpand() {
    onExpand(currentFields());
  }

  return (
    <div className="fixed inset-0 z-30 flex items-end justify-center bg-ink-900/35" onClick={onClose}>
      <div
        className="w-full max-w-md bg-paper rounded-t-[24px] px-5 pt-3 pb-[max(1.5rem,env(safe-area-inset-bottom))]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-9 h-1 rounded-pill bg-ink-900/10 mx-auto mb-3" />

        <div className="flex items-center justify-between mb-4">
          <p className="font-display text-[17px] font-medium text-ink-900">
            {mode === "duplicate" ? "Duplicate appointment" : "Edit appointment"}
          </p>
          <button
            onClick={handleExpand}
            className="flex items-center gap-1 text-[13px] text-brand-dim font-medium"
          >
            Expand
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 3H5a2 2 0 00-2 2v4M15 3h4a2 2 0 012 2v4M9 21H5a2 2 0 01-2-2v-4M15 21h4a2 2 0 002-2v-4" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full bg-paper-raised rounded-card px-4 py-3 text-[15px] text-ink-900 placeholder:text-ink-300 outline-none focus:ring-2 focus:ring-brand/30"
          />

          <div className="flex gap-3">
            <input
              type="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                if (e.target.value) setDateError(false);
              }}
              className={`flex-1 bg-paper-raised rounded-card px-4 py-3 text-[15px] text-ink-900 outline-none focus:ring-2 focus:ring-brand/30 ${
                dateError ? "ring-2 ring-priority-high/40" : ""
              }`}
            />
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="flex-1 bg-paper-raised rounded-card px-4 py-3 text-[15px] text-ink-900 outline-none focus:ring-2 focus:ring-brand/30"
            />
          </div>
          {dateError && (
            <p className="font-body text-[12px] text-priority-high -mt-1.5">
              Select a date to continue.
            </p>
          )}

          <button
            onClick={() => setDrawerOpen(true)}
            className="w-full flex items-center justify-between bg-paper-raised rounded-card px-4 py-3 text-left outline-none focus:ring-2 focus:ring-brand/30"
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

          <button
            onClick={handleConfirm}
            className="mt-1 w-full bg-brand text-paper-raised rounded-card py-3.5 text-[15px] font-medium active:scale-[0.99] transition-transform"
          >
            {confirmLabel}
          </button>
        </div>
      </div>

      <PriorityDrawer
        open={drawerOpen}
        value={priority}
        onSelect={setPriority}
        onClose={() => setDrawerOpen(false)}
      />
    </div>
  );
}
