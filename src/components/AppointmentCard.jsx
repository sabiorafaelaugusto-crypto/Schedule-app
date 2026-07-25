import { PRIORITY_STYLES, formatCardDate, formatTime12h } from "../lib/schedule";
import { useLongPress } from "../lib/useLongPress";

// Ficha C.1: title, time, and priority are shown only when present — the
// dedicated space for a missing field stays empty, nothing fills in for it.
// Ficha C.2: long-press is the only way to reach Edit/Duplicate/Delete —
// there is no default tap action on the card itself.
export default function AppointmentCard({ appointment, onLongPress }) {
  const { day, month } = formatCardDate(appointment.date);
  const time = formatTime12h(appointment.time);
  const priority = appointment.priority ? PRIORITY_STYLES[appointment.priority] : null;
  const longPress = useLongPress(() => onLongPress(appointment));

  return (
    <div
      {...longPress}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onLongPress(appointment);
      }}
      className="w-full text-left bg-paper-raised rounded-card shadow-card px-4 py-3.5 flex items-stretch gap-3.5 select-none"
    >
      <div className="flex flex-col items-center justify-center w-14 shrink-0 border-r border-ink-900/[0.06] pr-3.5">
        <span className="font-mono text-[22px] leading-none font-medium text-ink-900">{day}</span>
        <span className="font-mono text-[11px] tracking-widest text-ink-500 mt-1">{month}</span>
      </div>

      <div className="flex-1 min-w-0 flex flex-col justify-center gap-1">
        <p className="font-body text-[15px] leading-snug text-ink-900 truncate min-h-[20px]">
          {appointment.title || ""}
        </p>
        <p className="font-mono text-[13px] text-ink-500 min-h-[16px]">
          {time || ""}
        </p>
      </div>

      <div className="flex items-start pt-0.5">
        {priority && (
          <span
            className={`inline-flex items-center gap-1.5 rounded-pill px-2.5 py-1 text-[11px] font-medium font-body tracking-wide ${priority.tint} ${priority.text}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${priority.dot}`} />
            {priority.label.toUpperCase()}
          </span>
        )}
      </div>
    </div>
  );
}
