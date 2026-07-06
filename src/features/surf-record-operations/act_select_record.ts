/**
 * ACT_SELECT_RECORD — inline_edit action for the Record Operations
 * surface.
 *
 * Selects a record by id and, optionally, navigates into the Record
 * Editor so the user can immediately edit it. The DOM helper is
 * used by the row's pencil/edit and trash buttons to discover which
 * record the click originated from, with a graceful fallback to
 * the store's currently selected record.
 */

import type { QuickNoteContextValue } from '../quick-note/quick-note.store';

export interface SelectRecordOptions {
  /** When true, switch to the Record Editor surface after selecting. */
  openEditor?: boolean;
}

export interface SelectRecordResult {
  ok: boolean;
  recordId: string | null;
  openedEditor: boolean;
}

/**
 * Read the record id associated with a click target.
 *
 * Resolution order:
 *   1. The closest ancestor row with `data-action="ACT_SELECT_RECORD"`
 *      carrying a `data-record-id` attribute.
 *   2. The click target itself if it carries `data-record-id`.
 *   3. A `null` fallback so callers can chain `?? selectedRecord?.id`.
 */
export function readSelectedRecordIdFromDom(
  target: Element | null,
): string | null {
  if (!target) return null;
  if (target instanceof HTMLElement && target.dataset.recordId) {
    return target.dataset.recordId;
  }
  const row = target.closest('[data-action="ACT_SELECT_RECORD"]') as HTMLElement | null;
  if (row?.dataset.recordId) {
    return row.dataset.recordId;
  }
  return null;
}

/**
 * Select a record by id, optionally opening the editor.
 *
 * The store is updated first, then the surface switch is dispatched
 * only when the user asked to open the editor. Null ids are accepted
 * and clear the current selection without erroring — this matches
 * the surface contract for "deselect" gestures.
 */
export function actSelectRecord(
  store: QuickNoteContextValue,
  recordId: string | null,
  options: SelectRecordOptions = {},
): SelectRecordResult {
  store.setSelectedRecord(recordId);
  const openedEditor = options.openEditor === true;
  if (openedEditor) {
    store.setActiveSurface('SURF_RECORD_EDITOR');
  }
  return { ok: true, recordId, openedEditor };
}