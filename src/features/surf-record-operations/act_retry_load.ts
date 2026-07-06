/**
 * ACT_RETRY_LOAD — Record Operations surface action handler.
 *
 * Retries the recoverable "load older records" failure. In this
 * scaffold the persistence layer is local-only, so the retry
 * re-bootstraps the shared store state from the persistence
 * adapter and surfaces a deterministic loading → ready/error
 * transition that the screen can render.
 *
 * Behavior contract:
 *  - Sets `storageStatus` to `loading` so the screen can render
 *    a spinner / disabled Retry button.
 *  - Calls the existing `bootstrap()` entry on the shared store
 *    which re-reads persisted state (or the fixture fallback).
 *  - On success: clears `lastError`, leaves storageStatus on
 *    `ready` (set by the bootstrap effect), and returns `ok`.
 *  - On failure: surfaces the storage error via `lastError` and
 *    leaves storageStatus on `error` so the Retry button stays
 *    visible.
 *
 *  The screen's Retry Loading button is rendered with
 *  `data-action="ACT_RETRY_LOAD"` (see SCREEN_INDEX.json).
 */

import type { QuickNoteContextValue } from '../quick-note/quick-note.store';

export interface RetryLoadResult {
  ok: boolean;
  status: 'ready' | 'error';
  message: string | null;
}

export function actRetryLoad(store: QuickNoteContextValue): RetryLoadResult {
  store.setStorageStatus('loading', 'Retrying record load…');
  try {
    store.bootstrap();
    const status = store.state.storageStatus;
    if (status === 'error') {
      store.setLastError(
        store.state.storageMessage ?? 'Failed to reload records.',
      );
      return {
        ok: false,
        status: 'error',
        message: store.state.storageMessage,
      };
    }
    store.setLastError(null);
    return { ok: true, status: 'ready', message: null };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    store.setStorageStatus('error', message);
    store.setLastError(message);
    return { ok: false, status: 'error', message };
  }
}

export function handleRetryLoadFromDom(store: QuickNoteContextValue): RetryLoadResult {
  return actRetryLoad(store);
}