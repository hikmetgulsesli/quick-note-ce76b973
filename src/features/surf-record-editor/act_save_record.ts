/**
 * ACT_SAVE_RECORD — Record Editor surface action handler.
 *
 * Persists the current draft form state into the shared Quick Note
 * store. The form values are read from the controlled input fields
 * rendered by `RecordEditorQuickNote` and merged with the implicit
 * draft/active status and timestamp bookkeeping that the store
 * requires.
 *
 * Behavior contract:
 *  - Validates that the title is non-empty (matches the visible
 *    "Title is required" error rendered by the editor form).
 *  - Creates a new record when `selectedRecordId` is null,
 *    otherwise updates the existing record (preserving its id,
 *    createdAt, and status when the user did not change them).
 *  - Surfaces a visible "Saved" status via the store's
 *    `storageStatus` field and clears any previous error.
 *  - Surfaces a recoverable error via `lastError` and
 *    `storageStatus === 'error'` when validation or persistence
 *    fails; the form stays mounted so the user can retry.
 */

import type { QuickNoteContextValue } from '../quick-note/quick-note.store';
import type {
  QuickNoteRecord,
  QuickNoteRecordStatus,
} from '../quick-note/quick-note.types';

export interface SaveRecordInput {
  title: string;
  body: string;
  tags: string[];
  status?: QuickNoteRecordStatus;
}

export interface SaveRecordResult {
  ok: boolean;
  recordId?: string;
  error?: string;
}

const TITLE_ERROR = 'Title is required.';
const BODY_ERROR = 'Note body cannot be empty.';

function sanitizeTags(tags: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const raw of tags) {
    if (typeof raw !== 'string') continue;
    const trimmed = raw.trim();
    if (!trimmed) continue;
    if (seen.has(trimmed)) continue;
    seen.add(trimmed);
    out.push(trimmed);
  }
  return out;
}

function parseTagsInput(input: string): string[] {
  if (!input) return [];
  return input
    .split(/[,\n]/)
    .map((tag) => tag.replace(/^#/, '').trim())
    .filter(Boolean);
}

/**
 * Extract a `SaveRecordInput` from the editor form DOM.
 *
 * The Record Editor screen renders three named inputs:
 *  - `note-title` (required text)
 *  - `note-tags`  (optional comma-separated text)
 *  - `note-body`  (textarea)
 *
 * When called from a non-DOM context (unit tests, server rendering)
 * `root` defaults to the active document so a missing `document`
 * simply yields an empty input — the store will then report the
 * missing-field error to the user.
 */
export function readSaveRecordInputFromDom(
  root: ParentNode = typeof document !== 'undefined' ? document : ({} as ParentNode),
): SaveRecordInput {
  const titleInput = root.querySelector<HTMLInputElement>('input[name="note-title"]');
  const tagsInput = root.querySelector<HTMLInputElement>('input[name="note-tags"]');
  const bodyInput = root.querySelector<HTMLTextAreaElement>('textarea[name="note-body"]');
  return {
    title: titleInput?.value ?? '',
    tags: parseTagsInput(tagsInput?.value ?? ''),
    body: bodyInput?.value ?? '',
  };
}

/**
 * Core save-record logic. Operates only on the shared store value;
 * the caller (the Record Editor screen's `save-note-7` handler) is
 * responsible for deriving the input from the DOM.
 */
export function actSaveRecord(
  store: QuickNoteContextValue,
  input: SaveRecordInput,
  now: () => string = () => new Date().toISOString(),
): SaveRecordResult {
  const title = (input.title ?? '').trim();
  const body = (input.body ?? '').trim();
  const tags = sanitizeTags(input.tags ?? []);

  if (!title) {
    store.setLastError(TITLE_ERROR);
    store.setStorageStatus('error', TITLE_ERROR);
    return { ok: false, error: TITLE_ERROR };
  }
  if (!body) {
    store.setLastError(BODY_ERROR);
    store.setStorageStatus('error', BODY_ERROR);
    return { ok: false, error: BODY_ERROR };
  }

  const existingId = store.state.selectedRecordId;
  const existing = existingId
    ? store.state.records.find((r) => r.id === existingId) ?? null
    : null;

  const next: QuickNoteRecord = {
    id: existing?.id ?? `note-${now().replace(/[^0-9]/g, '').slice(0, 14)}`,
    title,
    body,
    tags,
    status: input.status ?? existing?.status ?? 'active',
    createdAt: existing?.createdAt ?? now(),
    updatedAt: now(),
  };

  store.upsertRecord(next);
  store.setLastError(null);
  store.setStorageStatus('ready');
  return { ok: true, recordId: next.id };
}

/**
 * DOM-binding wrapper. Exposed so the Record Editor screen can
 * pass `actions["save-note-7"] = () => handleSaveRecordFromDom(store)`.
 */
export function handleSaveRecordFromDom(store: QuickNoteContextValue): SaveRecordResult {
  const input = readSaveRecordInputFromDom();
  return actSaveRecord(store, input);
}