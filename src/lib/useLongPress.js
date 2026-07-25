import { useRef } from "react";

const LONG_PRESS_MS = 500;

/**
 * Fires onLongPress after holding for LONG_PRESS_MS. Works for both touch
 * and mouse (so it's testable on desktop too). A short press/click does
 * not trigger it and does not fire any other action — per Ficha C.2, the
 * card itself has no default tap action.
 */
export function useLongPress(onLongPress) {
  const timer = useRef(null);
  const fired = useRef(false);

  function start() {
    fired.current = false;
    timer.current = setTimeout(() => {
      fired.current = true;
      onLongPress();
    }, LONG_PRESS_MS);
  }

  function clear() {
    if (timer.current) clearTimeout(timer.current);
  }

  return {
    onMouseDown: start,
    onMouseUp: clear,
    onMouseLeave: clear,
    onTouchStart: start,
    onTouchEnd: clear,
    onContextMenu: (e) => e.preventDefault(),
  };
}
