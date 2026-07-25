// Ficha C.2: fixed hierarchy — Edit, then Duplicate, then Delete.
export default function CardActionMenu({ open, onEdit, onDuplicate, onDelete, onClose }) {
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

        <div className="flex flex-col gap-1">
          <MenuItem label="Edit" onClick={onEdit} />
          <MenuItem label="Duplicate" onClick={onDuplicate} />
          <MenuItem label="Delete" tone="danger" onClick={onDelete} />
        </div>
      </div>
    </div>
  );
}

function MenuItem({ label, onClick, tone }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left rounded-card px-4 py-3.5 text-[15px] font-body ${
        tone === "danger" ? "text-priority-high" : "text-ink-900"
      }`}
    >
      {label}
    </button>
  );
}
