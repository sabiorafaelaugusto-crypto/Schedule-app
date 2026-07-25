// Ficha C.4: explicit Yes/No confirmation before deleting anything.
// "No" gets the visual emphasis, to make the safe choice the easy one.
export default function DeleteConfirmDialog({ open, onConfirm, onCancel }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-ink-900/45 px-6" onClick={onCancel}>
      <div
        className="w-full max-w-xs bg-paper-raised rounded-card p-5 flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="font-body text-[15px] text-ink-900 text-center leading-snug">
          Are you sure you want to delete this appointment?
        </p>
        <div className="flex flex-col gap-2">
          <button
            onClick={onCancel}
            className="w-full bg-ink-900 text-paper-raised rounded-card py-3 text-[15px] font-medium active:scale-[0.99] transition-transform"
          >
            No
          </button>
          <button
            onClick={onConfirm}
            className="w-full bg-paper text-priority-high rounded-card py-3 text-[15px] font-medium active:scale-[0.99] transition-transform"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}
