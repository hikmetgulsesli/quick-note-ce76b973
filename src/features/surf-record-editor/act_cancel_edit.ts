/**
 * ACT_CANCEL_EDIT — Record Editor surface action handler.
 *
 * Discards the current editor form changes and returns the user to
 * the Record Operations surface. The screen-level handler is
 * `cancel-6` (top-bar Cancel button) plus `back-to-notes-5` (the
 * Back-to-Notes toolbar button). Both are wired through the same
 * shared logic so cancellation is consistent regardless of the
 * trigger.
 *
 * Behavior contract:
 *  - Clears `lastError` so the editor does not stay sticky on a
 *    previous save failure.
 *  - Resets the active panel to the Record Operations default
 *    (`list`) and the active surface to `SURF_RECORD_OPERATIONS`
 *    so the user lands on the list immediately.
 *  - Preserves the existing selected record id when one was set,
 *    so the list can re-highlight the row the user was editing
 *    before opening the editor.
 */

import type { QuickNoteContextValue } from '../quick-note/quick-note.store';
import type { QuickNoteSurfaceId } from '../quick-note/quick-note.types';

export interface CancelEditOptions {
  /**
   * Optional surface to return to. Defaults to
   * `SURF_RECORD_OPERATIONS` because that is the editor's logical
   * "back" target — the list is where the user came from.
   */
  returnSurface?: QuickNoteSurfaceId;
  /**
   * When true, clears any draft form state by leaving the active
   * surface alone but resetting lastError. Used when the editor
   * stays mounted (for example when validation fails elsewhere).
   */
  soft?: boolean;
}

export function actCancelEdit(
  store: QuickNoteContextValue,
  options: CancelEditOptions = {},
): void {
  store.setLastError(null);
  if (options.soft) {
    return;
  }
  const target: QuickNoteSurfaceId = options.returnSurface ?? 'SURF_RECORD_OPERATIONS';
  store.setActiveSurface(target);
}

export function handleCancelEditFromDom(store: QuickNoteContextValue): void {
  actCancelEdit(store);
}