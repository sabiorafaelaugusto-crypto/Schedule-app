import { PRIORITY_STYLES } from "../lib/schedule";

const ORDER = ["high", "medium", "low"];

// Ficha B.2: priority is chosen via a click-to-open drawer, not inline
// buttons. Nothing is pre-selected.
export default function PriorityDrawer({ open, value, onSelect, onClose }) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-20 flex items-end justify-center bg-ink-900/35"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-paper-raised rounded-t-[24px] px-5 pt-3 pb-[max(1.5rem,env(safe-area-inset-bottom))]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-9 h-1 rounded-pill bg-ink-900/10 mx-auto mb-4" />
        <p className="font-body text-[13px] text-ink-500 mb-3">Priority</p>

        <div className="flex flex-col gap-2">
          {ORDER.map((key) => {
            const style = PRIORITY_STYLES[key];
            const selected = value === key;
            return (
              <button
                key={key}
                onClick={() => {
                  onSelect(key);
                  onClose();
                }}
                className={`w-full flex items-center gap-3 rounded-card px-4 py-3.5 border transition-colors ${
                  selected ? `${style.tint} border-transparent` : "bg-paper border-transparent"
                }`}
              >
                <span className={`w-2.5 h-2.5 rounded-full ${style.dot}`} />
                <span className={`font-body text-[15px] ${selected ? style.text : "text-ink-900"}`}>
                  {style.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
