import { useEffect, useMemo, useRef, useState } from "react";
import BottomNav from "./components/BottomNav";
import AppointmentCard from "./components/AppointmentCard";
import EmptyState from "./components/EmptyState";
import ActionSheet from "./components/ActionSheet";
import EditPopup from "./components/EditPopup";
import ConfirmDeleteDialog from "./components/ConfirmDeleteDialog";
import UndoToast from "./components/UndoToast";
import CreateAppointmentScreen from "./screens/CreateAppointmentScreen";
import { seedAppointments } from "./data/seedAppointments";
import { classifyAppointment, groupAppointments } from "./lib/schedule";
import { createId, loadAppointments, saveAppointments } from "./lib/storage";

const UNDO_MS = 5000;

export default function App() {
  const [appointments, setAppointments] = useState(() => loadAppointments(seedAppointments));
  const [activeTab, setActiveTab] = useState("today");

  // "schedule" | "create" | "edit-full" | "duplicate-full"
  const [screen, setScreen] = useState("schedule");
  const [expandDraft, setExpandDraft] = useState(null); // { id?, fields }

  const [actionSheetFor, setActionSheetFor] = useState(null); // appointment
  const [popup, setPopup] = useState(null); // { mode: 'edit' | 'duplicate', appointment }
  const [confirmDeleteFor, setConfirmDeleteFor] = useState(null); // appointment

  const [undoVisible, setUndoVisible] = useState(false);
  const undoData = useRef(null); // { appointment }
  const undoTimer = useRef(null);

  useEffect(() => {
    saveAppointments(appointments);
  }, [appointments]);

  const groups = useMemo(() => groupAppointments(appointments), [appointments]);
  const items = groups[activeTab];

  function goToBucketFor(appointment) {
    const bucket = classifyAppointment(appointment);
    setActiveTab(bucket === "previous" ? "previous" : bucket === "upcoming" ? "upcoming" : "today");
  }

  // ---- Creation (Módulo B) ----
  function handleCreate(fields) {
    const appointment = { id: createId(), ...fields };
    setAppointments((prev) => [...prev, appointment]);
    goToBucketFor(appointment);
    setScreen("schedule");
  }

  // ---- Long-press menu (Ficha C.2) ----
  function handleLongPress(appointment) {
    setActionSheetFor(appointment);
  }

  function closeActionSheet() {
    setActionSheetFor(null);
  }

  function openEditPopup() {
    setPopup({ mode: "edit", appointment: actionSheetFor });
    setActionSheetFor(null);
  }

  function openDuplicatePopup() {
    setPopup({ mode: "duplicate", appointment: actionSheetFor });
    setActionSheetFor(null);
  }

  function openDeleteConfirm() {
    setConfirmDeleteFor(actionSheetFor);
    setActionSheetFor(null);
  }

  // ---- Edit / Duplicate pop-up (Ficha C.3) ----
  function handlePopupConfirm(fields) {
    if (popup.mode === "edit") {
      setAppointments((prev) =>
        prev.map((a) => (a.id === popup.appointment.id ? { ...a, ...fields } : a)),
      );
      goToBucketFor({ ...popup.appointment, ...fields });
    } else {
      const created = { id: createId(), ...fields };
      setAppointments((prev) => [...prev, created]);
      goToBucketFor(created);
    }
    setPopup(null);
  }

  function handlePopupExpand(fields) {
    const mode = popup.mode; // 'edit' | 'duplicate'
    setExpandDraft({ id: mode === "edit" ? popup.appointment.id : null, fields });
    setPopup(null);
    setScreen(mode === "edit" ? "edit-full" : "duplicate-full");
  }

  function handleExpandSubmit(fields) {
    if (screen === "edit-full") {
      setAppointments((prev) =>
        prev.map((a) => (a.id === expandDraft.id ? { ...a, ...fields } : a)),
      );
      goToBucketFor({ ...fields });
    } else {
      const created = { id: createId(), ...fields };
      setAppointments((prev) => [...prev, created]);
      goToBucketFor(created);
    }
    setExpandDraft(null);
    setScreen("schedule");
  }

  // ---- Delete + 5s undo (Ficha C.4) ----
  function confirmDelete() {
    const appointment = confirmDeleteFor;
    setAppointments((prev) => prev.filter((a) => a.id !== appointment.id));
    setConfirmDeleteFor(null);

    undoData.current = appointment;
    setUndoVisible(true);
    clearTimeout(undoTimer.current);
    undoTimer.current = setTimeout(() => {
      setUndoVisible(false);
      undoData.current = null;
    }, UNDO_MS);
  }

  function handleUndo() {
    if (undoData.current) {
      setAppointments((prev) => [...prev, undoData.current]);
      goToBucketFor(undoData.current);
    }
    clearTimeout(undoTimer.current);
    setUndoVisible(false);
    undoData.current = null;
  }

  // ---- Screens ----
  if (screen === "create") {
    return <CreateAppointmentScreen onSchedule={handleCreate} />;
  }

  if (screen === "edit-full" || screen === "duplicate-full") {
    return (
      <CreateAppointmentScreen
        initial={expandDraft.fields}
        heading={screen === "edit-full" ? "Edit appointment" : "Duplicate appointment"}
        submitLabel={screen === "edit-full" ? "Save changes" : "Duplicate"}
        onSchedule={handleExpandSubmit}
      />
    );
  }

  return (
    <div className="min-h-screen bg-paper font-body">
      <header className="px-5 pt-14 pb-4">
        <p className="font-mono text-[12px] tracking-[0.2em] text-brand-dim uppercase mb-1">
          Prospecting log
        </p>
        <h1 className="font-display text-[28px] font-medium text-ink-900">
          Schedule
        </h1>
      </header>

      <main className="px-5 pb-40 flex flex-col gap-2.5">
        {items.length === 0 ? (
          <EmptyState tab={activeTab} />
        ) : (
          items.map((appt) => (
            <AppointmentCard key={appt.id} appointment={appt} onLongPress={handleLongPress} />
          ))
        )}
      </main>

      <BottomNav active={activeTab} onChange={setActiveTab} onAdd={() => setScreen("create")} />

      <ActionSheet
        appointment={actionSheetFor}
        onEdit={openEditPopup}
        onDuplicate={openDuplicatePopup}
        onDelete={openDeleteConfirm}
        onClose={closeActionSheet}
      />

      {popup && (
        <EditPopup
          appointment={popup.appointment}
          mode={popup.mode}
          onConfirm={handlePopupConfirm}
          onExpand={handlePopupExpand}
          onClose={() => setPopup(null)}
        />
      )}

      <ConfirmDeleteDialog
        open={!!confirmDeleteFor}
        onConfirm={confirmDelete}
        onCancel={() => setConfirmDeleteFor(null)}
      />

      <UndoToast visible={undoVisible} onUndo={handleUndo} />
    </div>
  );
}
