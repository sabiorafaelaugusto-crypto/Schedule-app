// Ficha C.2: hierarchy is fixed as Edit → Duplicate → Delete.
export default function ActionSheet({ appointment, onEdit, onDuplicate, onDelete, onClose }) {
  if (!appointment) return null;

  return (
    <div
      className="fixed inset-0 z-30 flex items-end justify-center bg-ink-900/35"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-paper-raised rounded-card overflow-hidden shadow-nav mb-2">
          <SheetItem label="Edit" onClick={onEdit} />
          <Divider />
          <SheetItem label="Duplicate" onClick={onDuplicate} />
          <Divider />
          <SheetItem label="Delete" onClick={onDelete} destructive />
        </div>
        <button
          onClick={onClose}
          className="w-full bg-paper-raised rounded-card py-3.5 text-[15px] font-medium text-ink-900 shadow-nav"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

function SheetItem({ label, onClick, destructive }) {
  return (
    <button
      onClick={onClick}
      className={`w-full py-3.5 text-[16px] font-body ${destructive ? "text-priority-high" : "text-ink-900"}`}
    >
      {label}
    </button>
  );
}

function Divider() {
  return <div className="h-px bg-ink-900/[0.06]" />;
}
