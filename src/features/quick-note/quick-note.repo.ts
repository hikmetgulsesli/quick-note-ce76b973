import {
  QUICK_NOTE_STORAGE_KEY,
  isQuickNotePanelId,
  isQuickNoteSurfaceId,
  type QuickNoteRecord,
  type QuickNoteRecordStatus,
  type QuickNoteState,
  type QuickNoteStorageStatus,
} from './quick-note.types';
import { QUICK_NOTE_FIXTURE_STATE } from '../../__fixtures__/quick-note.fixture';

export interface QuickNoteLoadResult {
  state: QuickNoteState;
  storageStatus: QuickNoteStorageStatus;
  storageMessage: string | null;
  recovered: boolean;
}

const QUICK_NOTE_RECORD_STATUSES: QuickNoteRecordStatus[] = ['draft', 'active', 'archived'];

interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

function getStorage(): StorageLike | null {
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage ?? null;
  } catch {
    return null;
  }
}

function isQuickNoteRecord(value: unknown): value is QuickNoteRecord {
  if (!value || typeof value !== 'object') return false;
  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.id === 'string' &&
    typeof candidate.title === 'string' &&
    typeof candidate.body === 'string' &&
    Array.isArray(candidate.tags) &&
    candidate.tags.every((tag) => typeof tag === 'string') &&
    typeof candidate.status === 'string' &&
    (QUICK_NOTE_RECORD_STATUSES as string[]).includes(candidate.status as string) &&
    typeof candidate.createdAt === 'string' &&
    typeof candidate.updatedAt === 'string'
  );
}

/**
 * Validate every persisted record and return only the well-formed
 * ones. Malformed entries are silently dropped instead of failing the
 * whole batch — a single corrupt record must not invalidate the user's
 * entire history.
 *
 * Returns `null` only when the input is not an array at all (caller
 * already checked this), preserving the original "shape invalid"
 * signal while letting partial corruption recover gracefully.
 */
function sanitizeRecords(input: unknown): QuickNoteRecord[] | null {
  if (!Array.isArray(input)) return null;
  const out: QuickNoteRecord[] = [];
  for (const entry of input) {
    if (isQuickNoteRecord(entry)) {
      out.push(entry);
    }
  }
  return out;
}

function sanitizeState(raw: unknown): QuickNoteState | null {
  if (!raw || typeof raw !== 'object') return null;
  const candidate = raw as Record<string, unknown>;
  if (!Array.isArray(candidate.records)) return null;
  const records = sanitizeRecords(candidate.records);
  if (!records) return null;
  if (!isQuickNoteSurfaceId(candidate.activeSurface)) return null;
  if (!isQuickNotePanelId(candidate.activePanel)) return null;
  // Defensive: only honor `selectedRecordId` when it is a string AND
  // references an existing record in the sanitized set. A stale or
  // missing id would crash screens that assume the selected record is
  // present whenever `selectedRecordId` is non-null. Fall back to null
  // in that case so the UI can render a safe default.
  const candidateSelectedRecordId = candidate.selectedRecordId;
  const selectedRecordId =
    typeof candidateSelectedRecordId === 'string' &&
    records.some((r) => r.id === candidateSelectedRecordId)
      ? candidateSelectedRecordId
      : null;
  return {
    records,
    selectedRecordId,
    activeSurface: candidate.activeSurface,
    activePanel: candidate.activePanel,
    storageStatus: 'ready',
    storageMessage: null,
    lastError: null,
    hydrated: true,
  };
}

/**
 * Load the persisted Quick Note state.
 *
 * Recovery rules:
 * - When `localStorage` is unavailable (SSR/tests without storage), return
 *   the fixture state with `storageStatus: 'idle'` so the shell can still
 *   render the first product surface.
 * - When persisted data is corrupt, do NOT throw. Return the fixture
 *   state, mark `storageStatus: 'error'` with a recoverable message,
 *   and clear the corrupt entry so subsequent saves start fresh.
 */
export function loadQuickNoteState(): QuickNoteLoadResult {
  const storage = getStorage();
  if (!storage) {
    return {
      state: { ...QUICK_NOTE_FIXTURE_STATE, storageStatus: 'idle' },
      storageStatus: 'idle',
      storageMessage: null,
      recovered: false,
    };
  }
  let raw: string | null = null;
  try {
    raw = storage.getItem(QUICK_NOTE_STORAGE_KEY);
  } catch {
    return {
      state: { ...QUICK_NOTE_FIXTURE_STATE, storageStatus: 'error', storageMessage: 'Storage read failed' },
      storageStatus: 'error',
      storageMessage: 'Storage read failed',
      recovered: true,
    };
  }
  if (!raw) {
    return {
      state: { ...QUICK_NOTE_FIXTURE_STATE, storageStatus: 'idle' },
      storageStatus: 'idle',
      storageMessage: null,
      recovered: false,
    };
  }
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    try {
      storage.removeItem(QUICK_NOTE_STORAGE_KEY);
    } catch {
      // ignore — we still want to recover with the fixture
    }
    return {
      state: { ...QUICK_NOTE_FIXTURE_STATE, storageStatus: 'error', storageMessage: 'Corrupt persisted state was reset' },
      storageStatus: 'error',
      storageMessage: 'Corrupt persisted state was reset',
      recovered: true,
    };
  }
  const sanitized = sanitizeState(parsed);
  if (!sanitized) {
    try {
      storage.removeItem(QUICK_NOTE_STORAGE_KEY);
    } catch {
      // ignore
    }
    return {
      state: { ...QUICK_NOTE_FIXTURE_STATE, storageStatus: 'error', storageMessage: 'Invalid persisted state was reset' },
      storageStatus: 'error',
      storageMessage: 'Invalid persisted state was reset',
      recovered: true,
    };
  }
  return {
    state: sanitized,
    storageStatus: 'ready',
    storageMessage: null,
    recovered: false,
  };
}

/**
 * Persist the current Quick Note state.
 *
 * Returns true on success, false on storage failure. Failures are
 * swallowed here; the caller (store reducer) flips `storageStatus` to
 * `'error'` so the UI can show a recoverable banner without crashing.
 */
export function saveQuickNoteState(state: QuickNoteState): boolean {
  const storage = getStorage();
  if (!storage) return false;
  try {
    const payload: QuickNoteState = {
      ...state,
      // Persist only deterministic data; runtime flags are not stored.
      storageStatus: 'ready',
      storageMessage: null,
      lastError: null,
      hydrated: true,
    };
    storage.setItem(QUICK_NOTE_STORAGE_KEY, JSON.stringify(payload));
    return true;
  } catch {
    return false;
  }
}

export function clearQuickNoteState(): boolean {
  const storage = getStorage();
  if (!storage) return false;
  try {
    storage.removeItem(QUICK_NOTE_STORAGE_KEY);
    return true;
  } catch {
    return false;
  }
}