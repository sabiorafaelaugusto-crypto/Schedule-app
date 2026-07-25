const TABS = [
  { key: "previous", label: "Previous" },
  { key: "today", label: "Today" },
  { key: "upcoming", label: "Upcoming" },
];

export default function BottomNav({ active, onChange, onAdd }) {
  return (
    <div className="fixed bottom-0 inset-x-0 flex flex-col items-center gap-3 pb-[max(1.25rem,env(safe-area-inset-bottom))] px-4 pointer-events-none">
      {/* Módulo B not built yet — placeholder action for now. */}
      <button
        onClick={onAdd}
        aria-label="Schedule new appointment"
        className="pointer-events-auto w-14 h-14 rounded-full bg-brand text-paper-raised shadow-nav flex items-center justify-center active:scale-95 transition-transform"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M12 5v14M5 12h14" />
        </svg>
      </button>

      <nav className="pointer-events-auto bg-ink-900 rounded-pill shadow-nav px-1.5 py-1.5 flex gap-1">
        {TABS.map((tab) => {
          const isActive = tab.key === active;
          return (
            <button
              key={tab.key}
              onClick={() => onChange(tab.key)}
              className={`px-4 py-2 rounded-pill text-[13px] font-body font-medium transition-colors ${
                isActive ? "bg-paper-raised text-ink-900" : "text-paper-raised/55"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
