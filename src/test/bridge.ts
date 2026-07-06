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
 */

export interface QuickNoteAppHandle {
  /** Current shell state. */
  state: QuickNoteContextValue['state'];
  /** Derived counts (total / draft / active / archived). */
  counts: QuickNoteContextValue['counts'];
  /** Convenience getters for common shell fields. */
  activeSurface: QuickNoteSurfaceId;
  activePanel: QuickNotePanelId;
  selectedRecordId: string | null;
  storageStatus: QuickNoteContextValue['state']['storageStatus'];
  storageMessage: string | null;
  lastError: string | null;
  /** Stable navigation/action handlers for screen-owner stories. */
  actions: {
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
 * Mount the test bridge for the given provider value. Idempotent: calling
 * twice replaces the previous handle rather than stacking listeners, so
 * HMR and test remounts stay safe.
 */
export function mountQuickNoteAppBridge(value: QuickNoteContextValue): QuickNoteAppHandle {
  const handle: QuickNoteAppHandle = {
    state: value.state,
    counts: value.counts,
    activeSurface: value.state.activeSurface,
    activePanel: value.state.activePanel,
    selectedRecordId: value.state.selectedRecordId,
    storageStatus: value.state.storageStatus,
    storageMessage: value.state.storageMessage,
    lastError: value.state.lastError,
    actions: {
      bootstrap: value.bootstrap,
      setActiveSurface: value.setActiveSurface,
      setActivePanel: value.setActivePanel,
      setSelectedRecord: value.setSelectedRecord,
      setLastError: value.setLastError,
      setStorageStatus: value.setStorageStatus,
      upsertRecord: value.upsertRecord,
      deleteRecord: value.deleteRecord,
      dispatch: value.dispatch,
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
}

/** Return the currently mounted handle, if any. */
export function getQuickNoteAppBridge(): QuickNoteAppHandle | null {
  return mountedHandle;
}

export type { QuickNoteProviderProps };