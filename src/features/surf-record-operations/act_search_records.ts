/**
 * ACT_SEARCH_RECORDS — search_input_persistent action for the
 * Record Operations surface.
 *
 * Filters the record list by the live query string and persists the
 * query to localStorage so navigation away and back (e.g. opening
 * the editor and returning) keeps the user's filter in place.
 *
 * The filter is intentionally lenient: title, body, or any tag
 * match counts as a hit. Empty queries clear the filter and
 * return every record in its stored order.
 */

import type { QuickNoteContextValue } from '../quick-note/quick-note.store';
import type { QuickNoteRecord } from '../quick-note/quick-note.types';

export const QUICK_NOTE_SEARCH_STORAGE_KEY = 'quick-note:search-query:v1';

export interface SearchRecordsResult {
  query: string;
  matches: QuickNoteRecord[];
  total: number;
}

function isStorageAvailable(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return typeof window.localStorage !== 'undefined';
  } catch {
    return false;
  }
}

/**
 * Read the persisted search query. Returns an empty string when no
 * value is stored or when storage is unavailable.
 */
export function readSearchRecordsQuery(): string {
  if (!isStorageAvailable()) return '';
  try {
    return window.localStorage.getItem(QUICK_NOTE_SEARCH_STORAGE_KEY) ?? '';
  } catch {
    return '';
  }
}

function persistSearchQuery(query: string): void {
  if (!isStorageAvailable()) return;
  try {
    if (query) {
      window.localStorage.setItem(QUICK_NOTE_SEARCH_STORAGE_KEY, query);
    } else {
      window.localStorage.removeItem(QUICK_NOTE_SEARCH_STORAGE_KEY);
    }
  } catch {
    // Storage failures are non-fatal — the search still works in
    // memory for the current session.
  }
}

/**
 * Filter records by a free-form query. Matches on title, body, or
 * any tag (case-insensitive). When the query is empty, returns the
 * input list as-is so the screen can render the full collection.
 */
export function filterRecordsByQuery(
  records: QuickNoteRecord[],
  query: string,
): QuickNoteRecord[] {
  const q = (query ?? '').trim().toLowerCase();
  if (!q) return records.slice();
  return records.filter((r) => {
    if (r.title.toLowerCase().includes(q)) return true;
    if (r.body.toLowerCase().includes(q)) return true;
    for (const tag of r.tags) {
      if (tag.toLowerCase().includes(q)) return true;
    }
    return false;
  });
}

/**
 * Execute the search action: persist the query and compute the
 * matching subset. The store is read-only here — the screen owns
 * the visible filter state so it can keep the input controlled
 * without bouncing through the reducer.
 */
export function actSearchRecords(
  store: QuickNoteContextValue,
  query: string,
): SearchRecordsResult {
  const normalized = query ?? '';
  persistSearchQuery(normalized);
  const matches = filterRecordsByQuery(store.state.records, normalized);
  return {
    query: normalized,
    matches,
    total: store.state.records.length,
  };
}