/**
 * ACT_SELECT_RECORD — Record Operations surface action handler.
 *
 * Selects an existing record in the shared Quick Note store. The
 * Record Operations list renders each row with
 * `data-action="ACT_SELECT_RECORD"` (the whole row) plus a
 * per-row Edit pencil icon. Both interactions land here.
 *
 * Behavior contract:
 *  - Updates `selectedRecordId` to the targeted record so the
 *    preview panel can render its details.
 *  - Sets `activePanel` to `preview` so the operations surface
 *    highlights the preview pane.
 *  - Sets `activeSurface` to `SURF_RECORD_OPERATIONS` so even an
 *    Edit pencil click from a different surface navigates back
 *    to the list view (deterministic and predictable).
 *  - Clears any prior `lastError`.
 */

import type { QuickNoteContextValue } from '../quick-note/quick-note.store';
import type { QuickNoteRecord } from '../quick-note/quick-note.types';

export interface SelectRecordOptions {
  /**
   * When true, immediately navigates to the Record Editor
   * surface after selecting the record. The Edit pencil uses
   * this path; the row click does not.
   */
  openEditor?: boolean;
}

/**
 * Read the record id from the triggering DOM node. The list rows
 * expose `data-record-id` on the row container; the per-row Edit
 * buttons expose the same attribute on themselves. Falling back to
 * the closest `[data-record-id]` ancestor keeps both flows working.
 */
export function readSelectedRecordIdFromDom(
  target: EventTarget | ParentNode | null,
): string | null {
  if (!target) return null;
  const element =
    'closest' in (target as Element)
      ? (target as Element)
      : (target as ParentNode);
  if (typeof (element as Element).closest !== 'function') return null;
  const host = (element as Element).closest<HTMLElement>('[data-record-id]');
  return host?.dataset.recordId ?? null;
}

/**
 * Core select-record logic. Returns the selected record when
 * the id matched an existing entry, otherwise null.
 */
export function actSelectRecord(
  store: QuickNoteContextValue,
  recordId: string | null,
  options: SelectRecordOptions = {},
): QuickNoteRecord | null {
  if (!recordId) {
    store.setSelectedRecord(null);
    store.setLastError(null);
    return null;
  }
  const found = store.state.records.find((r) => r.id === recordId) ?? null;
  if (!found) {
    store.setLastError(`Record "${recordId}" not found.`);
    store.setSelectedRecord(null);
    return null;
  }
  store.setSelectedRecord(found.id);
  store.setLastError(null);
  if (options.openEditor) {
    store.setActivePanel('editor-form');
    store.setActiveSurface('SURF_RECORD_EDITOR');
  } else {
    store.setActivePanel('preview');
    store.setActiveSurface('SURF_RECORD_OPERATIONS');
  }
  return found;
}

export function handleSelectRecordFromDom(
  store: QuickNoteContextValue,
  target: EventTarget | null,
  options: SelectRecordOptions = {},
): QuickNoteRecord | null {
  const recordId = readSelectedRecordIdFromDom(target);
  return actSelectRecord(store, recordId, options);
}