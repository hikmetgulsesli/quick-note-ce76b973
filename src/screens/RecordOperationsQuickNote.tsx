// AUTO-GENERATED from Stitch — DO NOT modify layout or CSS
// Screen: Record Operations - Quick Note
// 
// AGENT INSTRUCTIONS:
// 1. DO NOT change className values or layout structure
// 2. Add useState for dynamic values (replace hardcoded text)
// 3. Wire interactive controls through the typed actions prop
// 4. Replace placeholder data with props/state

import { useEffect, useMemo, useState, type ChangeEvent, type MouseEvent as ReactMouseEvent } from "react";
import { ArrowUpDown, BadgeHelp, BarChart3, ChevronLeft, ChevronRight, CircleHelp, CircleUserRound, CloudOff, FileText, ListFilter, Pencil, Plus, Search, Settings, Trash2 } from "lucide-react";
import { useQuickNoteStore } from "../features/quick-note/quick-note.store";
import type { QuickNoteRecord } from "../features/quick-note/quick-note.types";
import {
  actSearchRecords,
  filterRecordsByQuery,
  readSearchRecordsQuery,
} from "../features/surf-record-operations/act_search_records";
import {
  actCreateRecord,
} from "../features/surf-record-operations/act_create_record";
import {
  actSelectRecord,
  readSelectedRecordIdFromDom,
} from "../features/surf-record-operations/act_select_record";
import {
  actRetryLoad,
} from "../features/surf-record-operations/act_retry_load";


export type RecordOperationsQuickNoteActionId = "new-note-1" | "settings-2" | "account-circle-3" | "filter-4" | "sort-5" | "edit-6" | "edit-7" | "edit-8" | "edit-9" | "retry-loading-10" | "chevron-left-11" | "chevron-right-12" | "edit-13" | "delete-14" | "notes-1" | "insights-2" | "archive-3" | "settings-4" | "help-5";

export interface RecordOperationsQuickNoteProps {
  actions?: Partial<Record<RecordOperationsQuickNoteActionId, () => void>>;

}

const PAGE_SIZE = 4;

type SortDirection = 'asc' | 'desc';

function formatRelativeDate(iso: string, now: Date = new Date()): string {
  if (!iso) return '';
  const ts = new Date(iso).getTime();
  if (Number.isNaN(ts)) return '';
  const diffMs = now.getTime() - ts;
  const minute = 60_000;
  const hour = 60 * minute;
  const day = 24 * hour;
  if (diffMs < minute) return 'Just now';
  if (diffMs < hour) return `${Math.floor(diffMs / minute)} min ago`;
  if (diffMs < day) return `${Math.floor(diffMs / hour)}h ago`;
  if (diffMs < 7 * day) return new Date(iso).toLocaleDateString('en-US', { weekday: 'short' });
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatFullDate(iso: string): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

function snippetOf(record: QuickNoteRecord, max = 90): string {
  const body = (record.body ?? '').replace(/\s+/g, ' ').trim();
  if (body.length <= max) return body;
  return `${body.slice(0, max - 1)}…`;
}

export function RecordOperationsQuickNote({ actions }: RecordOperationsQuickNoteProps) {
  const store = useQuickNoteStore();
  const { state, counts } = store;

  const [searchInput, setSearchInput] = useState(() => readSearchRecordsQuery());
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [pageIndex, setPageIndex] = useState(0);
  const [retryVisible, setRetryVisible] = useState(false);

  const selectedRecord =
    state.records.find((r) => r.id === state.selectedRecordId) ?? null;

  // Re-hydrate the search input from localStorage when the surface
  // becomes active again, so a navigation round-trip preserves the
  // user's filter.
  useEffect(() => {
    const persistedQuery = readSearchRecordsQuery();
    if (persistedQuery !== searchInput) {
      setSearchInput(persistedQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.activeSurface]);

  // Surface the Retry Loading block whenever the store reports a
  // recoverable error so the user can recover without losing the
  // existing data. Visibility is fully driven by the store's
  // `storageStatus` so successful retries automatically dismiss the
  // panel without relying on the synchronous return value of the
  // action handler.
  useEffect(() => {
    if (state.storageStatus === 'error') {
      setRetryVisible(true);
    } else if (state.storageStatus === 'ready') {
      setRetryVisible(false);
    }
  }, [state.storageStatus]);

  const filteredRecords = useMemo(() => {
    const matches = filterRecordsByQuery(state.records, searchInput);
    const sorted = matches.slice().sort((a, b) => {
      const aTs = new Date(a.updatedAt).getTime();
      const bTs = new Date(b.updatedAt).getTime();
      if (aTs === bTs) return a.id < b.id ? -1 : 1;
      return sortDirection === 'desc' ? bTs - aTs : aTs - bTs;
    });
    return sorted;
  }, [state.records, searchInput, sortDirection]);

  const totalFiltered = filteredRecords.length;
  const totalRecords = state.records.length;
  const totalPages = Math.max(1, Math.ceil(totalFiltered / PAGE_SIZE));
  const clampedPageIndex = Math.min(pageIndex, totalPages - 1);
  const pageStart = clampedPageIndex * PAGE_SIZE;
  const pageEnd = pageStart + PAGE_SIZE;
  const visibleRecords = filteredRecords.slice(pageStart, pageEnd);

  // Reset to the first page when the filter shrinks the result set
  // below the current offset, so the user never lands on a blank
  // page.
  useEffect(() => {
    if (clampedPageIndex !== pageIndex) {
      setPageIndex(clampedPageIndex);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalFiltered]);

  const showingRange = totalFiltered === 0
    ? '0-0'
    : `${pageStart + 1}-${Math.min(pageEnd, totalFiltered)}`;

  const onSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const next = event.target.value;
    setSearchInput(next);
    setPageIndex(0);
    actSearchRecords(store, next);
  };

  const onNewNote = (event: ReactMouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    actCreateRecord(store);
    actions?.["new-note-1"]?.();
  };

  const onSortToggle = (event: ReactMouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setSortDirection((prev) => (prev === 'desc' ? 'asc' : 'desc'));
    actions?.["sort-5"]?.();
  };

  const onFilterClick = (event: ReactMouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // Filter is a no-op for now: search already covers free-text
    // filtering and the surfaced "Filter" affordance is reserved
    // for future faceted filtering. We still call through to the
    // `actions` prop so app-level consumers can hook in.
    actions?.["filter-4"]?.();
  };

  const onSelectRow = (event: ReactMouseEvent<HTMLDivElement>) => {
    const id = readSelectedRecordIdFromDom(event.currentTarget);
    actSelectRecord(store, id, { openEditor: false });
  };

  const onEditRow = (event: ReactMouseEvent<HTMLButtonElement>, rowId: string | null) => {
    event.stopPropagation();
    // `rowId` is already in the React component's closure from the
    // row map, so there is no need to query the DOM for it. Fall
    // back to the currently selected record so a stale render still
    // has a sensible target.
    const recordId = rowId ?? selectedRecord?.id ?? null;
    actSelectRecord(store, recordId, { openEditor: true });
    const editActionId = ('edit-' + (rowId ?? 'x')) as RecordOperationsQuickNoteActionId;
    actions?.[editActionId]?.();
  };

  const onRetry = (event: ReactMouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // Visibility of the retry panel is driven by `state.storageStatus`
    // via the useEffect above so we don't reach for the synchronous
    // return value here (React batches state updates asynchronously,
    // so doing so would race with the post-bootstrap status change).
    actRetryLoad(store);
    actions?.["retry-loading-10"]?.();
  };

  const onPrevPage = (event: ReactMouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setPageIndex((prev) => Math.max(0, prev - 1));
    actions?.["chevron-left-11"]?.();
  };

  const onNextPage = (event: ReactMouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setPageIndex((prev) => Math.min(totalPages - 1, prev + 1));
    actions?.["chevron-right-12"]?.();
  };

  const onEditPreview = (event: ReactMouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    actSelectRecord(store, selectedRecord?.id ?? null, { openEditor: true });
    actions?.["edit-13"]?.();
  };

  const onDeletePreview = (event: ReactMouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (selectedRecord) {
      store.deleteRecord(selectedRecord.id);
    }
    actions?.["delete-14"]?.();
  };

  const onNavInsights = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    store.setActiveSurface('SURF_INSIGHTS');
    actions?.["insights-2"]?.();
  };

  const totalNotesLabel = totalRecords.toLocaleString('en-US');
  const recentActivityLabel = selectedRecord
    ? formatRelativeDate(selectedRecord.updatedAt)
    : 'No activity yet';
  const recentActivityCaption = selectedRecord
    ? `Last edited "${selectedRecord.title}"`
    : 'Pick a note to start editing';
  const activeTagsCount = (() => {
    const set = new Set<string>();
    for (const r of state.records) for (const t of r.tags) set.add(t);
    return set.size;
  })();
  const recentTagList = useMemo(() => {
    const counts = new Map<string, number>();
    for (const r of state.records) {
      for (const t of r.tags) counts.set(t, (counts.get(t) ?? 0) + 1);
    }
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 2)
      .map(([t]) => t);
  }, [state.records]);

  const draftCountLabel = counts.draft.toString();
  const activeCountLabel = counts.active.toString();
  const archivedCountLabel = counts.archived.toString();

  return (
    <>
      {/* Side Nav */}
      <aside className="hidden md:flex flex-col bg-surface-container-low border-r border-outline-variant fixed left-0 top-0 h-full w-60 py-lg">
      <div className="px-md mb-xl flex flex-col gap-sm">
      <div className="flex items-center gap-sm">
      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary">
      <Pencil className="text-sm" aria-hidden={true} focusable="false" />
      </div>
      <div>
      <h1 className="font-headline-md text-headline-md text-primary">Quick Note</h1>
      <p className="font-label-sm text-label-sm text-on-surface-variant">Minimalist Editor</p>
      </div>
      </div>
      <button className="mt-sm bg-primary text-on-primary rounded font-label-md text-label-md py-sm px-md flex items-center justify-center gap-xs hover:bg-primary-container hover:text-on-primary-container transition-colors duration-150 shadow-sm" data-action="ACT_CREATE_RECORD" type="button" data-action-id="new-note-1" onClick={onNewNote}>
      <Plus className="text-sm" aria-hidden={true} focusable="false" />
                      New Note
                  </button>
      </div>
      <nav className="flex-1 flex flex-col gap-xs px-xs">
      <a className="flex items-center gap-sm bg-secondary-container text-on-secondary-container rounded-lg px-md py-sm border-l-4 border-primary font-label-md text-label-md" href="#" data-action-id="notes-1" onClick={(event) => { event.preventDefault(); actions?.["notes-1"]?.(); }}>
      <FileText aria-hidden={true} focusable="false" />
                      Notes
                  </a>
      <a className="flex items-center gap-sm text-on-surface-variant px-md py-sm hover:bg-surface-container-highest transition-colors duration-100 rounded-lg font-label-md text-label-md" href="#" data-action-id="insights-2" onClick={onNavInsights}>
      <BarChart3 aria-hidden={true} focusable="false" />
                      Insights
                  </a>
      <a className="flex items-center gap-sm text-on-surface-variant px-md py-sm hover:bg-surface-container-highest transition-colors duration-100 rounded-lg font-label-md text-label-md" href="#" data-action-id="archive-3" onClick={(event) => { event.preventDefault(); actions?.["archive-3"]?.(); }}>
      <BadgeHelp aria-hidden={true} focusable="false" />
                      Archive
                  </a>
      </nav>
      <div className="mt-auto px-xs flex flex-col gap-xs border-t border-outline-variant pt-sm">
      <a className="flex items-center gap-sm text-on-surface-variant px-md py-sm hover:bg-surface-container-highest transition-colors duration-100 rounded-lg font-label-md text-label-md" href="#" data-action-id="settings-4" onClick={(event) => { event.preventDefault(); actions?.["settings-4"]?.(); }}>
      <Settings aria-hidden={true} focusable="false" />
                      Settings
                  </a>
      <a className="flex items-center gap-sm text-on-surface-variant px-md py-sm hover:bg-surface-container-highest transition-colors duration-100 rounded-lg font-label-md text-label-md" href="#" data-action-id="help-5" onClick={(event) => { event.preventDefault(); actions?.["help-5"]?.(); }}>
      <CircleHelp aria-hidden={true} focusable="false" />
                      Help
                  </a>
      </div>
      </aside>
      {/* Main Content Canvas */}
      <main className="flex-1 md:ml-60 flex flex-col h-screen overflow-hidden">
      {/* Top App Bar (Mobile Nav mostly, but acting as header here) */}
      <header className="bg-surface docked full-width top-0 border-b border-outline-variant flex justify-between items-center w-full px-margin-desktop h-16 shrink-0 z-10 md:hidden">
      <div className="font-headline-md text-headline-md font-bold text-on-surface">Quick Note</div>
      <div className="flex gap-sm">
      <button className="text-secondary hover:text-primary transition-colors duration-150" type="button" aria-label="Settings" data-action-id="settings-2" onClick={(event) => { event.preventDefault(); actions?.["settings-2"]?.(); }}>
      <Settings aria-hidden={true} focusable="false" />
      </button>
      <button className="text-secondary hover:text-primary transition-colors duration-150" type="button" aria-label="Account Circle" data-action-id="account-circle-3" onClick={(event) => { event.preventDefault(); actions?.["account-circle-3"]?.(); }}>
      <CircleUserRound aria-hidden={true} focusable="false" />
      </button>
      </div>
      </header>
      {/* Scrollable Canvas */}
      <div className="flex-1 overflow-y-auto p-margin-desktop bg-surface">
      {/* Metrics Row */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-xl" data-testid="record-ops-metrics">
      <div className="bg-surface-container-lowest border border-outline-variant rounded p-md">
      <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-xs">Total Notes</p>
      <p className="font-headline-lg text-headline-lg text-on-surface" data-testid="metric-total">{totalNotesLabel}</p>
      <p className="font-label-sm text-label-sm text-primary mt-xs">{activeCountLabel} active · {draftCountLabel} draft · {archivedCountLabel} archived</p>
      </div>
      <div className="bg-surface-container-lowest border border-outline-variant rounded p-md">
      <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-xs">Recent Activity</p>
      <p className="font-headline-lg text-headline-lg text-on-surface" data-testid="metric-recent">{recentActivityLabel}</p>
      <p className="font-label-sm text-label-sm text-secondary mt-xs">{recentActivityCaption}</p>
      </div>
      <div className="bg-surface-container-lowest border border-outline-variant rounded p-md">
      <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-xs">Active Tags</p>
      <p className="font-headline-lg text-headline-lg text-on-surface" data-testid="metric-tags">{activeTagsCount.toString()}</p>
      <div className="flex gap-xs mt-xs">
      {recentTagList.length === 0 ? (
        <span className="font-label-sm text-label-sm text-on-surface-variant">No tags yet</span>
      ) : recentTagList.map((t) => (
        <span key={t} className="inline-flex items-center px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">#{t}</span>
      ))}
      </div>
      </div>
      </section>
      {/* Operational Workspace */}
      <div className="flex flex-col lg:flex-row gap-gutter h-[calc(100vh-220px)] min-h-[500px]">
      {/* Main List View */}
      <div className="flex-1 flex flex-col bg-surface-container-lowest border border-outline-variant rounded shadow-sm overflow-hidden">
      {/* Toolbar */}
      <div className="p-sm border-b border-outline-variant flex items-center justify-between bg-surface-container-low">
      <div className="flex-1 max-w-md relative">
      <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-secondary text-sm" aria-hidden={true} focusable="false" />
      <input
        className="w-full pl-8 pr-3 py-1.5 bg-surface-container-lowest border border-outline-variant rounded font-body-sm text-body-sm text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors"
        data-action="ACT_SEARCH_RECORDS"
        data-testid="record-ops-search"
        placeholder="Search notes..."
        type="text"
        value={searchInput}
        onChange={onSearchChange}
      />
      </div>
      <div className="flex items-center gap-xs ml-sm">
      <button className="p-1.5 text-secondary hover:text-primary hover:bg-surface-variant rounded transition-colors" title="Filter" type="button" data-action-id="filter-4" onClick={onFilterClick}>
      <ListFilter className="text-sm" aria-hidden={true} focusable="false" />
      </button>
      <button className="p-1.5 text-secondary hover:text-primary hover:bg-surface-variant rounded transition-colors" title="Sort" type="button" data-action-id="sort-5" onClick={onSortToggle} data-sort={sortDirection}>
      <ArrowUpDown className="text-sm" aria-hidden={true} focusable="false" />
      </button>
      </div>
      </div>
      {/* List Area */}
      <div className="flex-1 overflow-y-auto">
      {/* Table Header */}
      <div className="grid grid-cols-12 gap-sm p-sm border-b border-outline-variant bg-surface font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider sticky top-0 z-10">
      <div className="col-span-4 pl-sm">Title</div>
      <div className="col-span-5">Snippet</div>
      <div className="col-span-2">Date</div>
      <div className="col-span-1 text-center">Actions</div>
      </div>
      {/* Rows */}
      <div className="divide-y divide-outline-variant" data-testid="record-ops-rows">
      {visibleRecords.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-xl text-center" data-testid="record-ops-empty">
          <p className="font-body-md text-body-md text-on-surface-variant">
            {searchInput
              ? `No notes match "${searchInput}".`
              : 'No notes yet — click New Note to start.'}
          </p>
        </div>
      ) : (
        visibleRecords.map((record, index) => {
          const isSelected = state.selectedRecordId === record.id;
          const rowClasses = isSelected
            ? "grid grid-cols-12 gap-sm p-sm items-center hover:bg-surface-container-low transition-colors group relative bg-secondary-container/20 border-l-2 border-primary"
            : "grid grid-cols-12 gap-sm p-sm items-center hover:bg-surface-container-low transition-colors group relative border-l-2 border-transparent";
          const editActionId = `edit-${6 + index}` as RecordOperationsQuickNoteActionId;
          return (
            <div
              key={record.id}
              className={rowClasses}
              data-action="ACT_SELECT_RECORD"
              data-record-id={record.id}
              data-testid={`record-row-${record.id}`}
              onClick={onSelectRow}
            >
              <div className="col-span-4 pl-sm font-body-sm text-body-sm font-medium text-on-surface truncate flex items-center gap-xs">
                {record.title || 'Untitled note'}
                {record.status === 'draft' ? (
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-medium bg-surface-container-high text-on-surface-variant">DRAFT</span>
                ) : null}
              </div>
              <div className="col-span-5 font-body-sm text-body-sm text-on-surface-variant truncate">{snippetOf(record)}</div>
              <div className="col-span-2 font-label-sm text-label-sm text-secondary">{formatRelativeDate(record.updatedAt)}</div>
              <div className="col-span-1 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  className="text-secondary hover:text-primary"
                  type="button"
                  aria-label="Edit"
                  data-action-id={editActionId}
                  data-record-id={record.id}
                  onClick={(event) => onEditRow(event, record.id)}
                >
                  <Pencil className="text-sm" aria-hidden={true} focusable="false" />
                </button>
              </div>
            </div>
          );
        })
      )}
      {/* Loading/Retry State Example (Hidden by default, shown for demonstration) */}
      <div
        className={retryVisible
          ? "flex flex-col items-center justify-center p-xl text-center"
          : "hidden flex-col items-center justify-center p-xl text-center"}
        data-testid="record-ops-retry"
        data-visible={retryVisible ? "true" : "false"}
      >
      <CloudOff className="text-outline text-3xl mb-sm" aria-hidden={true} focusable="false" />
      <p className="font-body-md text-body-md text-on-surface-variant mb-md">Failed to load older records.</p>
      <button className="px-md py-sm bg-surface-container-lowest border border-outline-variant rounded font-label-md text-label-md text-on-surface hover:bg-surface-variant transition-colors" data-action="ACT_RETRY_LOAD" type="button" data-action-id="retry-loading-10" onClick={onRetry}>
                                          Retry Loading
                                      </button>
      </div>
      </div>
      </div>
      <div className="p-xs border-t border-outline-variant bg-surface-container-low flex justify-between items-center text-secondary font-label-sm text-label-sm">
      <span data-testid="record-ops-pagination-summary">
        {searchInput
          ? `Showing ${showingRange} of ${totalFiltered} match${totalFiltered === 1 ? '' : 'es'} (${totalRecords} total)`
          : `Showing ${showingRange} of ${totalFiltered}`}
      </span>
      <div className="flex gap-xs">
      <button
        className="p-1 hover:text-primary disabled:opacity-50"
        type="button"
        aria-label="Chevron Left"
        data-action-id="chevron-left-11"
        onClick={onPrevPage}
        disabled={clampedPageIndex === 0}
      ><ChevronLeft className="text-sm" aria-hidden={true} focusable="false" /></button>
      <button
        className="p-1 hover:text-primary disabled:opacity-50"
        type="button"
        aria-label="Chevron Right"
        data-action-id="chevron-right-12"
        onClick={onNextPage}
        disabled={clampedPageIndex >= totalPages - 1}
      ><ChevronRight className="text-sm" aria-hidden={true} focusable="false" /></button>
      </div>
      </div>
      </div>
      {/* Preview Panel */}
      <aside className="w-full lg:w-80 bg-surface-container-low border border-outline-variant rounded shadow-sm flex flex-col hidden md:flex" data-testid="record-ops-preview">
      <div className="p-md border-b border-outline-variant flex justify-between items-center bg-surface-container-lowest rounded-t">
      <h2 className="font-label-md text-label-md font-bold text-on-surface uppercase tracking-wider">Preview</h2>
      <div className="flex gap-xs">
      <button
        className="text-secondary hover:text-primary transition-colors"
        title="Edit"
        type="button"
        data-action-id="edit-13"
        onClick={onEditPreview}
        disabled={!selectedRecord}
      ><Pencil className="text-sm" aria-hidden={true} focusable="false" /></button>
      <button
        className="text-secondary hover:text-error transition-colors"
        title="Delete"
        type="button"
        data-action-id="delete-14"
        onClick={onDeletePreview}
        disabled={!selectedRecord}
      ><Trash2 className="text-sm" aria-hidden={true} focusable="false" /></button>
      </div>
      </div>
      <div className="p-md flex-1 overflow-y-auto">
      {selectedRecord ? (
        <>
          <div className="mb-sm flex items-center gap-xs flex-wrap">
            {selectedRecord.tags.length === 0 ? (
              <span className="font-label-sm text-label-sm text-on-surface-variant">No tags</span>
            ) : (
              selectedRecord.tags.map((tag) => (
                <span key={tag} className="inline-flex items-center px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">#{tag}</span>
              ))
            )}
          </div>
          <h3 className="font-headline-md text-headline-md text-on-surface mb-xs">{selectedRecord.title || 'Untitled note'}</h3>
          <p className="font-label-sm text-label-sm text-secondary mb-md">
            Created: {formatFullDate(selectedRecord.createdAt)} • Edited: {formatFullDate(selectedRecord.updatedAt)}
          </p>
          <div className="font-body-sm text-body-sm text-on-surface-variant space-y-4 prose prose-sm prose-slate">
            {selectedRecord.body ? (
              selectedRecord.body.split(/\n+/).map((line, i) => (
                <p key={i}>{line}</p>
              ))
            ) : (
              <p className="italic">No content yet. Click Edit to start writing.</p>
            )}
          </div>
        </>
      ) : (
        <p className="font-body-sm text-body-sm text-on-surface-variant" data-testid="record-ops-preview-empty">
          Select a note to preview its contents.
        </p>
      )}
      </div>
      </aside>
      </div>
      </div>
      </main>
    </>
  );
}