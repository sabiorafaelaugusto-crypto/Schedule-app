// Ficha C.4: "No" gets the visually emphasized treatment (the safer default),
// "Yes" stays understated — the opposite of how destructive actions are
// usually styled, on purpose, per the product decision.
export default function ConfirmDeleteDialog({ open, onConfirm, onCancel }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-ink-900/40 px-6" onClick={onCancel}>
      <div
        className="w-full max-w-xs bg-paper-raised rounded-card px-5 pt-5 pb-4 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="font-body text-[15px] text-ink-900 leading-snug mb-5">
          Are you sure you want to delete this appointment?
        </p>
        <div className="flex flex-col gap-2">
          <button
            onClick={onCancel}
            className="w-full bg-ink-900 text-paper-raised rounded-card py-3 text-[15px] font-medium"
          >
            No
          </button>
          <button
            onClick={onConfirm}
            className="w-full text-priority-high py-2.5 text-[14px] font-medium"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}
