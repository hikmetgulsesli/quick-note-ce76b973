import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  type Dispatch,
  type ReactNode,
} from 'react';
import {
  QUICK_NOTE_PANEL_BY_SURFACE,
  deriveQuickNoteCounts,
  type QuickNoteAction,
  type QuickNoteCounts,
  type QuickNotePanelId,
  type QuickNoteRecord,
  type QuickNoteState,
  type QuickNoteStorageStatus,
  type QuickNoteSurfaceId,
} from './quick-note.types';
import { QUICK_NOTE_FIXTURE_STATE } from '../../__fixtures__/quick-note.fixture';
import { loadQuickNoteState, saveQuickNoteState } from './quick-note.repo';

export const QUICK_NOTE_INITIAL_STATE: QuickNoteState = {
  ...QUICK_NOTE_FIXTURE_STATE,
  storageStatus: 'idle',
  hydrated: false,
};

export function quickNoteReducer(state: QuickNoteState, action: QuickNoteAction): QuickNoteState {
  switch (action.type) {
    case 'BOOTSTRAP':
      return {
        ...action.payload,
        hydrated: true,
      };
    case 'SET_ACTIVE_SURFACE': {
      const nextPanel = QUICK_NOTE_PANEL_BY_SURFACE[action.surface];
      return {
        ...state,
        activeSurface: action.surface,
        activePanel: nextPanel,
      };
    }
    case 'SET_ACTIVE_PANEL':
      return { ...state, activePanel: action.panel };
    case 'SET_SELECTED_RECORD':
      return { ...state, selectedRecordId: action.recordId };
    case 'SET_STORAGE_STATUS':
      return {
        ...state,
        storageStatus: action.status,
        storageMessage: action.message ?? null,
      };
    case 'SET_LAST_ERROR':
      return { ...state, lastError: action.message };
    case 'UPSERT_RECORD': {
      const existingIndex = state.records.findIndex((r) => r.id === action.record.id);
      const records =
        existingIndex >= 0
          ? state.records.map((r) => (r.id === action.record.id ? action.record : r))
          : [...state.records, action.record];
      return {
        ...state,
        records,
        selectedRecordId: action.record.id,
        lastError: null,
      };
    }
    case 'DELETE_RECORD': {
      const records = state.records.filter((r) => r.id !== action.recordId);
      return {
        ...state,
        records,
        selectedRecordId:
          state.selectedRecordId === action.recordId ? null : state.selectedRecordId,
      };
    }
    case 'HYDRATE':
      return { ...state, records: action.records, hydrated: true };
    default:
      return state;
  }
}

export interface QuickNoteContextValue {
  state: QuickNoteState;
  dispatch: Dispatch<QuickNoteAction>;
  counts: QuickNoteCounts;
  bootstrap: () => void;
  setActiveSurface: (surface: QuickNoteSurfaceId) => void;
  setActivePanel: (panel: QuickNotePanelId) => void;
  setSelectedRecord: (recordId: string | null) => void;
  setLastError: (message: string | null) => void;
  setStorageStatus: (status: QuickNoteStorageStatus, message?: string | null) => void;
  upsertRecord: (record: QuickNoteRecord) => void;
  deleteRecord: (recordId: string) => void;
}

const QuickNoteContext = createContext<QuickNoteContextValue | null>(null);

export interface QuickNoteProviderProps {
  children: ReactNode;
  /**
   * Optional override used by tests to inject deterministic initial state
   * without touching the persistence adapter. When omitted, the provider
   * bootstraps from the repo (which falls back to fixture data).
   */
  initialState?: QuickNoteState;
  /**
   * Disable persistence side effects (load on mount, save on changes).
   * Used in unit tests that exercise the reducer in isolation.
   */
  disablePersistence?: boolean;
}

export function QuickNoteProvider({
  children,
  initialState,
  disablePersistence = false,
}: QuickNoteProviderProps) {
  const [state, dispatch] = useReducer(
    quickNoteReducer,
    initialState ?? QUICK_NOTE_INITIAL_STATE,
  );

  const bootstrap = useCallback(() => {
    if (disablePersistence) {
      dispatch({ type: 'HYDRATE', records: initialState?.records ?? QUICK_NOTE_FIXTURE_STATE.records });
      return;
    }
    const result = loadQuickNoteState();
    dispatch({ type: 'BOOTSTRAP', payload: result.state });
    if (result.storageStatus === 'error') {
      dispatch({ type: 'SET_STORAGE_STATUS', status: 'error', message: result.storageMessage });
    } else {
      dispatch({ type: 'SET_STORAGE_STATUS', status: result.storageStatus });
    }
  }, [disablePersistence, initialState]);

  // Bootstrap exactly once on mount.
  const bootstrappedRef = useRef(false);
  useEffect(() => {
    if (bootstrappedRef.current) return;
    bootstrappedRef.current = true;
    if (initialState) {
      dispatch({ type: 'BOOTSTRAP', payload: initialState });
      dispatch({ type: 'SET_STORAGE_STATUS', status: disablePersistence ? 'idle' : 'ready' });
      return;
    }
    bootstrap();
  }, [bootstrap, disablePersistence, initialState]);

  // Persist on every state change once hydrated.
  const hydratedRef = useRef(false);
  /**
   * Signature of the last payload we actually attempted to persist.
   * Used to suppress redundant `saveQuickNoteState` calls when the
   * effect re-runs because a status-transition dispatch updated
   * `state.storageStatus` without changing any persistable data.
   */
  const lastSavedPayloadRef = useRef<string | null>(null);
  useEffect(() => {
    if (disablePersistence) return;
    if (!state.hydrated) return;
    if (!hydratedRef.current) {
      hydratedRef.current = true;
      return;
    }
    // Only the deterministic shape is persisted; runtime flags
    // (storageStatus, storageMessage, lastError) must NOT count as a
    // payload change because they flip in response to our own save.
    const persistable = {
      records: state.records,
      selectedRecordId: state.selectedRecordId,
      activeSurface: state.activeSurface,
      activePanel: state.activePanel,
    };
    const signature = JSON.stringify(persistable);
    if (signature === lastSavedPayloadRef.current) {
      // Same payload as the previous attempt — only the runtime
      // status fields changed. Skip the redundant localStorage write.
      return;
    }
    lastSavedPayloadRef.current = signature;
    const ok = saveQuickNoteState(state);
    if (!ok) {
      if (state.storageStatus !== 'error') {
        dispatch({
          type: 'SET_STORAGE_STATUS',
          status: 'error',
          message: 'Could not save state to local storage',
        });
      }
    } else if (state.storageStatus !== 'ready') {
      dispatch({ type: 'SET_STORAGE_STATUS', status: 'ready' });
    }
  }, [disablePersistence, state]);

  const setActiveSurface = useCallback((surface: QuickNoteSurfaceId) => {
    dispatch({ type: 'SET_ACTIVE_SURFACE', surface });
  }, []);

  const setActivePanel = useCallback((panel: QuickNotePanelId) => {
    dispatch({ type: 'SET_ACTIVE_PANEL', panel });
  }, []);

  const setSelectedRecord = useCallback((recordId: string | null) => {
    dispatch({ type: 'SET_SELECTED_RECORD', recordId });
  }, []);

  const setLastError = useCallback((message: string | null) => {
    dispatch({ type: 'SET_LAST_ERROR', message });
  }, []);

  const setStorageStatus = useCallback((status: QuickNoteStorageStatus, message?: string | null) => {
    dispatch({ type: 'SET_STORAGE_STATUS', status, message });
  }, []);

  const upsertRecord = useCallback((record: QuickNoteRecord) => {
    dispatch({ type: 'UPSERT_RECORD', record });
  }, []);

  const deleteRecord = useCallback((recordId: string) => {
    dispatch({ type: 'DELETE_RECORD', recordId });
  }, []);

  const counts = useMemo(() => deriveQuickNoteCounts(state.records), [state.records]);

  const value = useMemo<QuickNoteContextValue>(
    () => ({
      state,
      dispatch,
      counts,
      bootstrap,
      setActiveSurface,
      setActivePanel,
      setSelectedRecord,
      setLastError,
      setStorageStatus,
      upsertRecord,
      deleteRecord,
    }),
    [
      state,
      counts,
      bootstrap,
      setActiveSurface,
      setActivePanel,
      setSelectedRecord,
      setLastError,
      setStorageStatus,
      upsertRecord,
      deleteRecord,
    ],
  );

  return <QuickNoteContext.Provider value={value}>{children}</QuickNoteContext.Provider>;
}

export function useQuickNoteStore(): QuickNoteContextValue {
  const value = useContext(QuickNoteContext);
  if (!value) {
    throw new Error('useQuickNoteStore must be used inside a <QuickNoteProvider>');
  }
  return value;
}

export function useQuickNoteState(): QuickNoteState {
  return useQuickNoteStore().state;
}

export function useQuickNoteDispatch(): Dispatch<QuickNoteAction> {
  return useQuickNoteStore().dispatch;
}