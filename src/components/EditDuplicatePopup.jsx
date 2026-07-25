import { useState } from "react";
import PriorityDrawer from "./PriorityDrawer";
import { PRIORITY_STYLES } from "../lib/schedule";

// Ficha C.3: a lean pop-up with title/date/time/priority — Notes is
// deliberately absent here, only reachable via "Expand".
export default function EditDuplicatePopup({ mode, appointment, onConfirm, onExpand, onClose }) {
  const [title, setTitle] = useState(appointment.title || "");
  const [date, setDate] = useState(appointment.date);
  const [time, setTime] = useState(appointment.time || "");
  const [priority, setPriority] = useState(appointment.priority || "");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dateError, setDateError] = useState(false);

  const isDuplicate = mode === "duplicate";
  const priorityStyle = priority ? PRIORITY_STYLES[priority] : null;

  function handleConfirm() {
    if (!date) {
      setDateError(true);
      return;
    }
    onConfirm({ title: title.trim(), date, time, priority });
  }

  return (
    <div className="fixed inset-0 z-20 flex items-end justify-center bg-ink-900/35" onClick={onClose}>
      <div
        className="w-full max-w-md bg-paper-raised rounded-t-[24px] px-5 pt-3 pb-[max(1.5rem,env(safe-area-inset-bottom))] flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-9 h-1 rounded-pill bg-ink-900/10 mx-auto" />

        <div className="flex items-center justify-between">
          <p className="font-display text-[17px] font-medium text-ink-900">
            {isDuplicate ? "Duplicate appointment" : "Edit appointment"}
          </p>
          <button onClick={onExpand} className="font-body text-[13px] text-brand-dim underline underline-offset-2">
            Expand
          </button>
        </div>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full bg-paper rounded-card px-4 py-3 text-[15px] text-ink-900 placeholder:text-ink-300 outline-none focus:ring-2 focus:ring-brand/30"
        />

        <div className="flex gap-3">
          <input
            type="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              if (e.target.value) setDateError(false);
            }}
            className={`flex-1 bg-paper rounded-card px-4 py-3 text-[15px] text-ink-900 outline-none focus:ring-2 focus:ring-brand/30 ${
              dateError ? "ring-2 ring-priority-high/40" : ""
            }`}
          />
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="flex-1 bg-paper rounded-card px-4 py-3 text-[15px] text-ink-900 outline-none focus:ring-2 focus:ring-brand/30"
          />
        </div>
        {dateError && (
          <p className="font-body text-[12px] text-priority-high -mt-2">
            Select a date to continue.
          </p>
        )}

        <button
          onClick={() => setDrawerOpen(true)}
          className="w-full flex items-center justify-between bg-paper rounded-card px-4 py-3 text-left outline-none focus:ring-2 focus:ring-brand/30"
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
          className="w-full bg-brand text-paper-raised rounded-card py-3.5 text-[15px] font-medium active:scale-[0.99] transition-transform"
        >
          {isDuplicate ? "Duplicate" : "Confirm"}
        </button>
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
