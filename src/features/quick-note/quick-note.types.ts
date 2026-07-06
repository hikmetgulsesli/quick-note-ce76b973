/**
 * Domain types for the Quick Note app shell, state, and persistence.
 *
 * These types intentionally stay narrow: US-001 owns the shared app shell
 * state, navigation state, selected entity, storage status, last error,
 * active panel, and item count. Screen-owner stories can extend the
 * domain, but they must not change the shape of `QuickNoteState` here.
 */

export type QuickNoteSurfaceId =
  | 'SURF_RECORD_OPERATIONS'
  | 'SURF_RECORD_EDITOR'
  | 'SURF_INSIGHTS';

export type QuickNotePanelId =
  | 'list'
  | 'preview'
  | 'editor-form'
  | 'metrics'
  | 'activity'
  | 'distribution';

export type QuickNoteStorageStatus = 'idle' | 'loading' | 'ready' | 'error';

export type QuickNoteRecordStatus = 'draft' | 'active' | 'archived';

export interface QuickNoteRecord {
  id: string;
  title: string;
  body: string;
  tags: string[];
  status: QuickNoteRecordStatus;
  createdAt: string;
  updatedAt: string;
}

export interface QuickNoteCounts {
  total: number;
  draft: number;
  active: number;
  archived: number;
}

export interface QuickNoteState {
  records: QuickNoteRecord[];
  selectedRecordId: string | null;
  activeSurface: QuickNoteSurfaceId;
  activePanel: QuickNotePanelId;
  storageStatus: QuickNoteStorageStatus;
  storageMessage: string | null;
  lastError: string | null;
  hydrated: boolean;
}

export type QuickNoteAction =
  | { type: 'BOOTSTRAP'; payload: QuickNoteState }
  | { type: 'SET_ACTIVE_SURFACE'; surface: QuickNoteSurfaceId }
  | { type: 'SET_ACTIVE_PANEL'; panel: QuickNotePanelId }
  | { type: 'SET_SELECTED_RECORD'; recordId: string | null }
  | { type: 'SET_STORAGE_STATUS'; status: QuickNoteStorageStatus; message?: string | null }
  | { type: 'SET_LAST_ERROR'; message: string | null }
  | { type: 'UPSERT_RECORD'; record: QuickNoteRecord }
  | { type: 'DELETE_RECORD'; recordId: string }
  | { type: 'HYDRATE'; records: QuickNoteRecord[] };

export const QUICK_NOTE_STORAGE_KEY = 'quick-note:state:v1';

export const QUICK_NOTE_SURFACE_ORDER: QuickNoteSurfaceId[] = [
  'SURF_RECORD_OPERATIONS',
  'SURF_RECORD_EDITOR',
  'SURF_INSIGHTS',
];

export const QUICK_NOTE_PANEL_BY_SURFACE: Record<QuickNoteSurfaceId, QuickNotePanelId> = {
  SURF_RECORD_OPERATIONS: 'list',
  SURF_RECORD_EDITOR: 'editor-form',
  SURF_INSIGHTS: 'metrics',
};

export function deriveQuickNoteCounts(records: QuickNoteRecord[]): QuickNoteCounts {
  let draft = 0;
  let active = 0;
  let archived = 0;
  for (const record of records) {
    if (record.status === 'draft') draft += 1;
    else if (record.status === 'active') active += 1;
    else if (record.status === 'archived') archived += 1;
  }
  return { total: records.length, draft, active, archived };
}

export function isQuickNoteSurfaceId(value: unknown): value is QuickNoteSurfaceId {
  return (
    value === 'SURF_RECORD_OPERATIONS' ||
    value === 'SURF_RECORD_EDITOR' ||
    value === 'SURF_INSIGHTS'
  );
}

export function isQuickNotePanelId(value: unknown): value is QuickNotePanelId {
  return (
    value === 'list' ||
    value === 'preview' ||
    value === 'editor-form' ||
    value === 'metrics' ||
    value === 'activity' ||
    value === 'distribution'
  );
}
