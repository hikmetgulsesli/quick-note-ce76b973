/**
 * ACT_RETRY_LOAD — secondary-button action for the Record
 * Operations surface.
 *
 * The Record Operations row list can fail to load when persisted
 * state is corrupt or storage is unavailable. This action retries
 * the load:
 *   1. Mark storage as `loading` so the UI can show progress.
 *   2. Re-run the bootstrap, which reloads the persisted state
 *      through `loadQuickNoteState()`.
 *   3. Inspect the freshly loaded payload synchronously (React
 *      state updates are batched, so we cannot rely on
 *      `store.state` having refreshed yet at this point).
 *   4. Mirror the result onto the store's `storageStatus` and
 *      `lastError` so the visible retry panel dismisses on
 *      success or stays open with a clear message on failure.
 *
 * The action never throws — failures are reported through the
 * typed result so the screen can update its visible state without
 * try/catch boilerplate.
 */

import type { QuickNoteContextValue } from '../quick-note/quick-note.store';
import { loadQuickNoteState } from '../quick-note/quick-note.repo';

export interface RetryLoadResult {
  ok: boolean;
  status: 'ready' | 'error';
  message: string | null;
}

export function actRetryLoad(store: QuickNoteContextValue): RetryLoadResult {
  store.setStorageStatus('loading', 'Retrying record load…');
  try {
    // Load the persisted state exactly once (synchronous localStorage
    // I/O + JSON parse) and inspect the result synchronously to
    // decide success vs. error. We then dispatch the BOOTSTRAP payload
    // ourselves so the store hydrates without re-running the load.
    const result = loadQuickNoteState();
    if (result.storageStatus === 'error') {
      const msg = result.storageMessage ?? 'Failed to reload records.';
      store.setLastError(msg);
      store.setStorageStatus('error', msg);
      return { ok: false, status: 'error', message: msg };
    }
    store.dispatch({ type: 'BOOTSTRAP', payload: result.state });
    store.setLastError(null);
    store.setStorageStatus('ready');
    return { ok: true, status: 'ready', message: null };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    store.setLastError(message);
    store.setStorageStatus('error', message);
    return { ok: false, status: 'error', message };
  }
}