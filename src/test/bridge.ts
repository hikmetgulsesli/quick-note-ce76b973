import type { QuickNoteAction, QuickNoteSurfaceId, QuickNotePanelId } from '../features/quick-note/quick-note.types';
import type {
  QuickNoteContextValue,
  QuickNoteProviderProps,
} from '../features/quick-note/quick-note.store';

/**
 * `window.app` is the deterministic verification surface required by
 * the Setfarm test contract for US-001. It exposes the live app shell
 * state plus a small action bridge so runtime tests can drive the
 * story-owned surface navigation, panel switches, and record selection
 * without poking at internals.
 *
 * Scope rule: this bridge only exposes capabilities owned by US-001.
 * Screen-owner stories may attach their own bridges (e.g. for editor
 * forms or insights filtering) but must not mutate the shell shape
 * declared here.
 *
 * Live-read contract: the handle's properties are exposed via ES6
 * getters that dynamically read from a module-level mutable reference
 * to the latest store context. This ensures that a test which holds
 * `const app = window.app` and later triggers an action observes the
 * updated state instead of a stale snapshot captured at mount time.
 */

export interface QuickNoteAppHandle {
  /** Current shell state. */
  readonly state: QuickNoteContextValue['state'];
  /** Derived counts (total / draft / active / archived). */
  readonly counts: QuickNoteContextValue['counts'];
  /** Convenience getters for common shell fields. */
  readonly activeSurface: QuickNoteSurfaceId;
  readonly activePanel: QuickNotePanelId;
  readonly selectedRecordId: string | null;
  readonly storageStatus: QuickNoteContextValue['state']['storageStatus'];
  readonly storageMessage: string | null;
  readonly lastError: string | null;
  /** Stable navigation/action handlers for screen-owner stories. */
  readonly actions: {
    bootstrap: () => void;
    setActiveSurface: (surface: QuickNoteSurfaceId) => void;
    setActivePanel: (panel: QuickNotePanelId) => void;
    setSelectedRecord: (recordId: string | null) => void;
    setLastError: (message: string | null) => void;
    setStorageStatus: QuickNoteContextValue['setStorageStatus'];
    upsertRecord: QuickNoteContextValue['upsertRecord'];
    deleteRecord: QuickNoteContextValue['deleteRecord'];
    /** Raw reducer dispatch for advanced shell-level tests. */
    dispatch: (action: QuickNoteAction) => void;
  };
}

declare global {
  interface Window {
    app?: QuickNoteAppHandle;
  }
}

let mountedHandle: QuickNoteAppHandle | null = null;
/**
 * Module-level mutable reference to the latest store context. Each
 * remount of the bridge (e.g. on React re-render) updates this so
 * getters read live values instead of the snapshot captured at the
 * first mount.
 */
let currentStore: QuickNoteContextValue | null = null;

/**
 * Mount the test bridge for the given provider value. Idempotent: calling
 * twice replaces the previous handle rather than stacking listeners, so
 * HMR and test remounts stay safe. Properties are ES6 getters so callers
 * that captured `window.app` before a state update still observe the
 * latest values.
 */
export function mountQuickNoteAppBridge(value: QuickNoteContextValue): QuickNoteAppHandle {
  currentStore = value;
  const handle: QuickNoteAppHandle = {
    get state() {
      return (currentStore ?? value).state;
    },
    get counts() {
      return (currentStore ?? value).counts;
    },
    get activeSurface() {
      return (currentStore ?? value).state.activeSurface;
    },
    get activePanel() {
      return (currentStore ?? value).state.activePanel;
    },
    get selectedRecordId() {
      return (currentStore ?? value).state.selectedRecordId;
    },
    get storageStatus() {
      return (currentStore ?? value).state.storageStatus;
    },
    get storageMessage() {
      return (currentStore ?? value).state.storageMessage;
    },
    get lastError() {
      return (currentStore ?? value).state.lastError;
    },
    actions: {
      bootstrap: () => (currentStore ?? value).bootstrap(),
      setActiveSurface: (surface) => (currentStore ?? value).setActiveSurface(surface),
      setActivePanel: (panel) => (currentStore ?? value).setActivePanel(panel),
      setSelectedRecord: (recordId) => (currentStore ?? value).setSelectedRecord(recordId),
      setLastError: (message) => (currentStore ?? value).setLastError(message),
      setStorageStatus: (status, message) =>
        (currentStore ?? value).setStorageStatus(status, message),
      upsertRecord: (record) => (currentStore ?? value).upsertRecord(record),
      deleteRecord: (recordId) => (currentStore ?? value).deleteRecord(recordId),
      dispatch: (action) => (currentStore ?? value).dispatch(action),
    },
  };
  if (typeof window !== 'undefined') {
    window.app = handle;
  }
  mountedHandle = handle;
  return handle;
}

/** Remove the test bridge. Safe to call outside the browser. */
export function unmountQuickNoteAppBridge(): void {
  if (typeof window !== 'undefined') {
    delete window.app;
  }
  mountedHandle = null;
  currentStore = null;
}

/** Return the currently mounted handle, if any. */
export function getQuickNoteAppBridge(): QuickNoteAppHandle | null {
  return mountedHandle;
}

export type { QuickNoteProviderProps };