const MESSAGES = {
  previous: "No past appointments",
  today: "No appointments today",
  upcoming: "No upcoming appointments",
};

export default function EmptyState({ tab }) {
  return (
    <div className="flex-1 flex items-center justify-center py-24">
      <p className="font-body text-[15px] text-ink-900/30">{MESSAGES[tab]}</p>
    </div>
  );
}
