/**
 * ACT_CREATE_RECORD — Record Operations surface action handler.
 *
 * Initializes the editor context for a new draft record and
 * switches the active surface to the Record Editor.
 *
 * Behavior contract:
 *  - Resets `selectedRecordId` to null so the editor treats the
 *    form as a fresh draft rather than an existing-record edit.
 *  - Clears any prior `lastError` so the editor form starts in a
 *    clean state.
 *  - Sets `activeSurface` to `SURF_RECORD_EDITOR` so the editor
 *    renders immediately after the trigger.
 *  - Updates `storageStatus` to `ready` (no persistence yet —
 *    the record is not stored until ACT_SAVE_RECORD runs).
 */

import type { QuickNoteContextValue } from '../quick-note/quick-note.store';
import type {
  QuickNotePanelId,
  QuickNoteSurfaceId,
} from '../quick-note/quick-note.types';

export interface CreateRecordOptions {
  /**
   * Optional target surface. Defaults to `SURF_RECORD_EDITOR`.
   */
  surface?: QuickNoteSurfaceId;
  /**
   * Optional initial panel for the editor surface. Defaults to
   * `editor-form`.
   */
  panel?: QuickNotePanelId;
}

export function actCreateRecord(
  store: QuickNoteContextValue,
  options: CreateRecordOptions = {},
): void {
  const target: QuickNoteSurfaceId = options.surface ?? 'SURF_RECORD_EDITOR';
  const panel: QuickNotePanelId = options.panel ?? 'editor-form';

  store.setSelectedRecord(null);
  store.setLastError(null);
  store.setStorageStatus('ready');
  store.setActivePanel(panel);
  store.setActiveSurface(target);
}

export function handleCreateRecordFromDom(store: QuickNoteContextValue): void {
  actCreateRecord(store);
}