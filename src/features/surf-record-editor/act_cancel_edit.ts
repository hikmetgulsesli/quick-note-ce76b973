/**
 * ACT_CANCEL_EDIT — secondary-button action for the Record Editor
 * surface.
 *
 * Cancels the in-flight edit by:
 *   1. Clearing the current selection so the editor stops preloading
 *      the record body.
 *   2. Returning the user to the Record Operations list so they can
 *      pick a different record (or start fresh) without an
 *      unsaved-changes prompt blocking the navigation.
 *
 * The screen is responsible for clearing its own local form state on
 * remount; this action only orchestrates the store transition.
 */

import type { QuickNoteContextValue } from '../quick-note/quick-note.store';

export interface CancelEditResult {
  ok: boolean;
  surface: 'SURF_RECORD_OPERATIONS';
}

export function actCancelEdit(store: QuickNoteContextValue): CancelEditResult {
  store.setSelectedRecord(null);
  store.setActiveSurface('SURF_RECORD_OPERATIONS');
  return { ok: true, surface: 'SURF_RECORD_OPERATIONS' };
}