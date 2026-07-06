/**
 * ACT_CREATE_RECORD — primary-button action for the Record
 * Operations surface.
 *
 * Creates a new draft record, selects it, and switches the active
 * surface to the Record Editor so the user can immediately start
 * typing. The new record is intentionally seeded with placeholder
 * content so the editor can detect the dirty state and surface the
 * title-validation error if the user saves without typing.
 */

import type { QuickNoteContextValue } from '../quick-note/quick-note.store';
import type { QuickNoteRecord } from '../quick-note/quick-note.types';

export interface CreateRecordResult {
  ok: boolean;
  record: QuickNoteRecord | null;
  error: string | null;
}

function newRecordId(): string {
  if (typeof globalThis.crypto?.randomUUID === 'function') {
    return `note-${globalThis.crypto.randomUUID()}`;
  }
  return `note-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

/**
 * Create a new draft record, select it, and switch to the editor.
 */
export function actCreateRecord(store: QuickNoteContextValue): CreateRecordResult {
  const now = new Date().toISOString();
  const record: QuickNoteRecord = {
    id: newRecordId(),
    title: '',
    body: '',
    tags: [],
    status: 'draft',
    createdAt: now,
    updatedAt: now,
  };
  try {
    store.upsertRecord(record);
    // `upsertRecord` already sets selectedRecordId, but we set it
    // explicitly so the intent is clear and the surface switch
    // never races the reducer.
    store.setSelectedRecord(record.id);
    store.setActiveSurface('SURF_RECORD_EDITOR');
    return { ok: true, record, error: null };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { ok: false, record: null, error: message };
  }
}