// Ficha C.4: a 5-second window to undo a delete before it becomes permanent.
export default function UndoToast({ visible, onUndo }) {
  if (!visible) return null;

  return (
    <div className="fixed left-0 right-0 bottom-28 flex justify-center px-5 z-20">
      <div className="bg-ink-900 text-paper-raised rounded-pill pl-4 pr-1.5 py-1.5 flex items-center gap-3 shadow-nav">
        <span className="font-body text-[13px]">Appointment deleted</span>
        <button
          onClick={onUndo}
          className="font-body text-[13px] font-medium bg-paper-raised/10 rounded-pill px-3 py-1.5"
        >
          Undo
        </button>
      </div>
    </div>
  );
}
