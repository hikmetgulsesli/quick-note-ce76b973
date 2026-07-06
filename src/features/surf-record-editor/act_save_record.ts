/**
 * ACT_SAVE_RECORD — form-submit action for the Record Editor surface.
 *
 * Reads the live editor inputs, validates the title, upserts the
 * resulting record into the shared store, and surfaces a typed result
 * so the screen can flip back to Record Operations and clear its
 * dirty flag.
 *
 * The screen passes the title/body/tags it read (either from React
 * state or the live DOM inputs); this module is intentionally
 * pure with respect to the screen layer so the same logic powers
 * both real interactions and the runtime verification harness.
 */

import type { QuickNoteContextValue } from '../quick-note/quick-note.store';
import type { QuickNoteRecord } from '../quick-note/quick-note.types';

export interface SaveRecordInput {
  title: string;
  body: string;
  tags: string[];
}

export interface SaveRecordResult {
  ok: boolean;
  record: QuickNoteRecord | null;
  error: string | null;
}

/**
 * Parse a free-form tag string (e.g. `meeting, urgent, project-x`) into
 * a clean tag array. Trims whitespace, drops empty entries, strips
 * leading `#`, and de-duplicates while preserving the first occurrence.
 */
export function parseTagsString(value: string): string[] {
  if (!value) return [];
  const seen = new Set<string>();
  const out: string[] = [];
  for (const raw of value.split(',')) {
    const cleaned = raw.trim().replace(/^#+/, '');
    if (!cleaned) continue;
    const key = cleaned.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(cleaned);
  }
  return out;
}

/**
 * Generate a fresh record id. Falls back to a timestamp + random
 * suffix when the global crypto API is unavailable (e.g. older
 * test environments).
 */
function nextRecordId(): string {
  if (typeof globalThis.crypto?.randomUUID === 'function') {
    return `note-${globalThis.crypto.randomUUID()}`;
  }
  return `note-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

/**
 * Save (create or update) the record owned by the editor surface.
 *
 * Validation:
 * - Title is required and trimmed. Empty titles return
 *   `{ ok: false, error: 'Title is required' }` so the screen can
 *   surface the existing inline error indicator.
 *
 * Identity:
 * - When the store has a `selectedRecordId`, the existing record is
 *   updated in place and `updatedAt` is refreshed; `createdAt` and
 *   the assigned id are preserved.
 * - Otherwise a new record is created with `status: 'draft'` so the
 *   user can iterate before promoting it to active.
 */
export function actSaveRecord(
  store: QuickNoteContextValue,
  input: SaveRecordInput,
): SaveRecordResult {
  const title = (input.title ?? '').trim();
  if (!title) {
    store.setLastError('Title is required');
    return { ok: false, record: null, error: 'Title is required' };
  }

  const now = new Date().toISOString();
  const records = store.state.records;
  const existing =
    store.state.selectedRecordId != null
      ? records.find((r) => r.id === store.state.selectedRecordId) ?? null
      : null;

  const record: QuickNoteRecord = {
    id: existing?.id ?? nextRecordId(),
    title,
    body: input.body ?? '',
    tags: Array.isArray(input.tags) ? input.tags : [],
    status: existing?.status ?? 'draft',
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
  };

  store.upsertRecord(record);
  store.setLastError(null);
  return { ok: true, record, error: null };
}