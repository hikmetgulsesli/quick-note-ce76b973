/**
 * ACT_SEARCH_RECORDS — Record Operations surface action handler.
 *
 * Drives the persistent search input rendered by the Record
 * Operations toolbar. The actual filter derivation happens in the
 * screen, but the canonical query state lives here so it can be
 * observed and asserted by tests without poking at the DOM.
 *
 * Behavior contract:
 *  - Stores the search query in module-level state so the Record
 *    Operations screen can read it during render without
 *    prop-drilling the value through every list cell.
 *  - Trims whitespace and treats empty strings as "no filter".
 *  - Exposes `readSearchRecordsQuery` so the screen's render
 *    function can derive the filtered list deterministically.
 *  - Surfaces no UI feedback directly; the screen renders the
 *    visible result count + empty state derived from the query.
 */

import type { QuickNoteRecord } from '../quick-note/quick-note.types';

let currentQuery = '';

export function readSearchRecordsQuery(): string {
  return currentQuery;
}

export function resetSearchRecordsQuery(): void {
  currentQuery = '';
}

/**
 * Read the query from the toolbar search input. The Record
 * Operations screen renders a single text input with
 * `data-action="ACT_SEARCH_RECORDS"` and a placeholder of
 * "Search notes...".
 */
export function readSearchQueryFromDom(
  root: ParentNode = typeof document !== 'undefined' ? document : ({} as ParentNode),
): string {
  const input = root.querySelector<HTMLInputElement>(
    'input[data-action="ACT_SEARCH_RECORDS"]',
  );
  return input?.value ?? '';
}

/**
 * Update the active search query. Returns the normalized query
 * (trimmed, lowercased for matching) so callers can derive
 * filtered state in the same call.
 */
export function actSearchRecords(query: string): string {
  const normalized = (query ?? '').trim();
  currentQuery = normalized;
  return normalized;
}

/**
 * Apply the current query to a record list. Matches against
 * title, body, and any tag — case-insensitive.
 */
export function filterRecordsByQuery(
  records: QuickNoteRecord[],
  query: string = currentQuery,
): QuickNoteRecord[] {
  const needle = (query ?? '').trim().toLowerCase();
  if (!needle) return records.slice();
  return records.filter((record) => {
    if (record.title.toLowerCase().includes(needle)) return true;
    if (record.body.toLowerCase().includes(needle)) return true;
    for (const tag of record.tags) {
      if (tag.toLowerCase().includes(needle)) return true;
    }
    return false;
  });
}

/**
 * DOM-binding wrapper. The Record Operations screen wires
 * `onChange` (and the controlled `value`) of the toolbar search
 * input through this handler so the shared query stays in sync.
 */
export function handleSearchRecordsFromDom(): string {
  return actSearchRecords(readSearchQueryFromDom());
}