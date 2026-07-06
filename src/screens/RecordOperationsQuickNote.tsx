// AUTO-GENERATED from Stitch — DO NOT modify layout or CSS
// Screen: Record Operations - Quick Note
// 
// AGENT INSTRUCTIONS:
// 1. DO NOT change className values or layout structure
// 2. Add useState for dynamic values (replace hardcoded text)
// 3. Wire interactive controls through the typed actions prop
// 4. Replace placeholder data with props/state

import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpDown,
  BadgeHelp,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  CircleUserRound,
  CloudOff,
  FileText,
  ListFilter,
  Pencil,
  Plus,
  Search,
  Settings,
  Trash2,
} from "lucide-react";
import { useQuickNoteStore } from "../features/quick-note/quick-note.store";
import type { QuickNoteRecord } from "../features/quick-note/quick-note.types";
import {
  actCreateRecord,
} from "../features/surf-record-operations/act_create_record";
import {
  actSearchRecords,
  filterRecordsByQuery,
  readSearchQueryFromDom,
} from "../features/surf-record-operations/act_search_records";
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

function formatRowDate(iso: string): string {
  try {
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return iso;
    return date.toLocaleString([], {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return iso;
  }
}

function truncate(value: string, max: number): string {
  if (value.length <= max) return value;
  return value.slice(0, max - 1).trimEnd() + '…';
}

const DEFAULT_PREVIEW_TITLE = 'Select a record';
const DEFAULT_PREVIEW_BODY = 'Pick a row from the list to preview it here.';

export function RecordOperationsQuickNote({ actions }: RecordOperationsQuickNoteProps) {
  const store = useQuickNoteStore();
  const { state, counts } = store;

  const [searchInput, setSearchInput] = useState('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [pageIndex, setPageIndex] = useState(0);
  const [retryVisible, setRetryVisible] = useState(false);

  // Keep the search input in sync with whatever the shared module
  // remembers. The hook reads the persisted query so a navigation
  // round-trip preserves the user's filter.
  useEffect(() => {
    const domValue = readSearchQueryFromDom();
    if (domValue !== searchInput) {
      setSearchInput(domValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.activeSurface]);

  // Surface the Retry Loading block whenever the store reports a
  // recoverable error so the user can recover without losing the
  // existing data.
  useEffect(() => {
    if (state.storageStatus === 'error') {
      setRetryVisible(true);
    }
  }, [state.storageStatus]);

  const filteredRecords = useMemo<QuickNoteRecord[]>(() => {
    const filtered = filterRecordsByQuery(state.records, searchInput);
    const sorted = filtered.slice().sort((a, b) => {
      const aTime = new Date(a.updatedAt).getTime();
      const bTime = new Date(b.updatedAt).getTime();
      return sortDirection === 'asc' ? aTime - bTime : bTime - aTime;
    });
    return sorted;
  }, [state.records, searchInput, sortDirection]);

  const pageSize = 10;
  const totalPages = Math.max(1, Math.ceil(filteredRecords.length / pageSize));
  const safePageIndex = Math.min(pageIndex, totalPages - 1);
  const visibleRecords = filteredRecords.slice(
    safePageIndex * pageSize,
    safePageIndex * pageSize + pageSize,
  );

  const selectedRecord = useMemo(
    () => state.records.find((r) => r.id === state.selectedRecordId) ?? null,
    [state.records, state.selectedRecordId],
  );

  const onSearchChange = (value: string) => {
    setSearchInput(value);
    actSearchRecords(value);
    setPageIndex(0);
  };

  const onNewNote = () => {
    actCreateRecord(store);
  };

  const onSelectRow = (event: React.MouseEvent<HTMLDivElement>) => {
    const recordId = readSelectedRecordIdFromDom(event.currentTarget);
    actSelectRecord(store, recordId, { openEditor: false });
  };

  const onEditRow = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    const recordId = readSelectedRecordIdFromDom(event.currentTarget);
    actSelectRecord(store, recordId, { openEditor: true });
  };

  const onDeleteRow = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    const recordId = readSelectedRecordIdFromDom(event.currentTarget);
    if (recordId) {
      store.deleteRecord(recordId);
    }
  };

  const onRetry = () => {
    const result = actRetryLoad(store);
    if (result.ok) {
      setRetryVisible(false);
    }
  };

  const onPrevPage = () => {
    setPageIndex((current) => Math.max(0, current - 1));
  };
  const onNextPage = () => {
    setPageIndex((current) => Math.min(totalPages - 1, current + 1));
  };

  const onToggleSort = () => {
    setSortDirection((current) => (current === 'asc' ? 'desc' : 'asc'));
  };

  const goToSurface = (surface: 'SURF_RECORD_OPERATIONS' | 'SURF_RECORD_EDITOR' | 'SURF_INSIGHTS') => () => {
    store.setActiveSurface(surface);
  };

  const fullActionMap: Record<RecordOperationsQuickNoteActionId, (event?: React.MouseEvent) => void> = {
    'new-note-1': actions?.['new-note-1'] ?? (() => onNewNote()),
    'settings-2': actions?.['settings-2'] ?? (() => undefined),
    'account-circle-3': actions?.['account-circle-3'] ?? (() => undefined),
    'filter-4': actions?.['filter-4'] ?? (() => undefined),
    'sort-5': actions?.['sort-5'] ?? (() => onToggleSort()),
    'edit-6': actions?.['edit-6'] ?? ((event?: React.MouseEvent) => {
      if (event) onEditRow(event as React.MouseEvent<HTMLButtonElement>);
    }),
    'edit-7': actions?.['edit-7'] ?? ((event?: React.MouseEvent) => {
      if (event) onEditRow(event as React.MouseEvent<HTMLButtonElement>);
    }),
    'edit-8': actions?.['edit-8'] ?? ((event?: React.MouseEvent) => {
      if (event) onEditRow(event as React.MouseEvent<HTMLButtonElement>);
    }),
    'edit-9': actions?.['edit-9'] ?? ((event?: React.MouseEvent) => {
      if (event) onEditRow(event as React.MouseEvent<HTMLButtonElement>);
    }),
    'retry-loading-10': actions?.['retry-loading-10'] ?? (() => onRetry()),
    'chevron-left-11': actions?.['chevron-left-11'] ?? (() => onPrevPage()),
    'chevron-right-12': actions?.['chevron-right-12'] ?? (() => onNextPage()),
    'edit-13': actions?.['edit-13'] ?? ((event?: React.MouseEvent) => {
      if (event) onEditRow(event as React.MouseEvent<HTMLButtonElement>);
    }),
    'delete-14': actions?.['delete-14'] ?? ((event?: React.MouseEvent) => {
      if (event) onDeleteRow(event as React.MouseEvent<HTMLButtonElement>);
    }),
    'notes-1': actions?.['notes-1'] ?? goToSurface('SURF_RECORD_OPERATIONS'),
    'insights-2': actions?.['insights-2'] ?? goToSurface('SURF_INSIGHTS'),
    'archive-3': actions?.['archive-3'] ?? (() => undefined),
    'settings-4': actions?.['settings-4'] ?? (() => undefined),
    'help-5': actions?.['help-5'] ?? (() => undefined),
  };

  const rowEditActionIds = ['edit-6', 'edit-7', 'edit-8', 'edit-9'] as const;
  const rowIndexFor = (rowNumber: number): (typeof rowEditActionIds)[number] => {
    return rowEditActionIds[Math.min(rowNumber, rowEditActionIds.length - 1)];
  };

  const renderRangeStart = filteredRecords.length === 0
    ? 0
    : safePageIndex * pageSize + 1;
  const renderRangeEnd = Math.min(
    (safePageIndex + 1) * pageSize,
    filteredRecords.length,
  );
  const resultCountLabel = filteredRecords.length === 0
    ? 'No matching notes'
    : `Showing ${renderRangeStart}-${renderRangeEnd} of ${filteredRecords.length}`;

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
      <button className="mt-sm bg-primary text-on-primary rounded font-label-md text-label-md py-sm px-md flex items-center justify-center gap-xs hover:bg-primary-container hover:text-on-primary-container transition-colors duration-150 shadow-sm" data-action="ACT_CREATE_RECORD" type="button" data-action-id="new-note-1" onClick={() => fullActionMap['new-note-1']()}>
      <Plus className="text-sm" aria-hidden={true} focusable="false" />
                      New Note
                  </button>
      </div>
      <nav className="flex-1 flex flex-col gap-xs px-xs">
      <a className="flex items-center gap-sm bg-secondary-container text-on-secondary-container rounded-lg px-md py-sm border-l-4 border-primary font-label-md text-label-md" href="#" data-action-id="notes-1" onClick={(event) => { event.preventDefault(); fullActionMap['notes-1'](); }}>
      <FileText aria-hidden={true} focusable="false" />
                      Notes
                  </a>
      <a className="flex items-center gap-sm text-on-surface-variant px-md py-sm hover:bg-surface-container-highest transition-colors duration-100 rounded-lg font-label-md text-label-md" href="#" data-action-id="insights-2" onClick={(event) => { event.preventDefault(); fullActionMap['insights-2'](); }}>
      <BarChart3 aria-hidden={true} focusable="false" />
                      Insights
                  </a>
      <a className="flex items-center gap-sm text-on-surface-variant px-md py-sm hover:bg-surface-container-highest transition-colors duration-100 rounded-lg font-label-md text-label-md" href="#" data-action-id="archive-3" onClick={(event) => { event.preventDefault(); fullActionMap['archive-3'](); }}>
      <BadgeHelp aria-hidden={true} focusable="false" />
                      Archive
                  </a>
      </nav>
      <div className="mt-auto px-xs flex flex-col gap-xs border-t border-outline-variant pt-sm">
      <a className="flex items-center gap-sm text-on-surface-variant px-md py-sm hover:bg-surface-container-highest transition-colors duration-100 rounded-lg font-label-md text-label-md" href="#" data-action-id="settings-4" onClick={(event) => { event.preventDefault(); fullActionMap['settings-4'](); }}>
      <Settings aria-hidden={true} focusable="false" />
                      Settings
                  </a>
      <a className="flex items-center gap-sm text-on-surface-variant px-md py-sm hover:bg-surface-container-highest transition-colors duration-100 rounded-lg font-label-md text-label-md" href="#" data-action-id="help-5" onClick={(event) => { event.preventDefault(); fullActionMap['help-5'](); }}>
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
      <button className="text-secondary hover:text-primary transition-colors duration-150" type="button" aria-label="Settings" data-action-id="settings-2" onClick={() => fullActionMap['settings-2']()}>
      <Settings aria-hidden={true} focusable="false" />
      </button>
      <button className="text-secondary hover:text-primary transition-colors duration-150" type="button" aria-label="Account Circle" data-action-id="account-circle-3" onClick={() => fullActionMap['account-circle-3']()}>
      <CircleUserRound aria-hidden={true} focusable="false" />
      </button>
      </div>
      </header>
      {/* Scrollable Canvas */}
      <div className="flex-1 overflow-y-auto p-margin-desktop bg-surface">
      {/* Metrics Row */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-xl">
      <div className="bg-surface-container-lowest border border-outline-variant rounded p-md">
      <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-xs">Total Notes</p>
      <p className="font-headline-lg text-headline-lg text-on-surface">{counts.total}</p>
      <p className="font-label-sm text-label-sm text-primary mt-xs">{counts.active} active · {counts.draft} draft</p>
      </div>
      <div className="bg-surface-container-lowest border border-outline-variant rounded p-md">
      <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-xs">Recent Activity</p>
      <p className="font-headline-lg text-headline-lg text-on-surface">{state.storageStatus === 'error' ? 'Recoverable' : state.storageStatus === 'loading' ? 'Syncing…' : state.hydrated ? 'Up to date' : 'Idle'}</p>
      <p className="font-label-sm text-label-sm text-secondary mt-xs">{state.lastError ? state.lastError : state.storageMessage ?? 'No errors'}</p>
      </div>
      <div className="bg-surface-container-lowest border border-outline-variant rounded p-md">
      <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-xs">Active Tags</p>
      <p className="font-headline-lg text-headline-lg text-on-surface">{(() => {
        const set = new Set<string>();
        for (const record of state.records) {
          for (const tag of record.tags) set.add(tag);
        }
        return set.size;
      })()}</p>
      <div className="flex gap-xs mt-xs flex-wrap">
      {(() => {
        const tagCounts = new Map<string, number>();
        for (const record of state.records) {
          for (const tag of record.tags) {
            tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
          }
        }
        const top = Array.from(tagCounts.entries()).sort((a, b) => b[1] - a[1]).slice(0, 3);
        if (top.length === 0) {
          return <span className="font-label-sm text-label-sm text-secondary">No tags yet</span>;
        }
        return top.map(([tag, count], index) => (
          <span
            key={tag}
            className={
              index === 0
                ? "inline-flex items-center px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm"
                : "inline-flex items-center px-2 py-0.5 rounded-full bg-surface-container-highest text-on-surface-variant font-label-sm text-label-sm"
            }
          >
            #{tag} · {count}
          </span>
        ));
      })()}
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
        placeholder="Search notes..."
        type="text"
        value={searchInput}
        onChange={(event) => onSearchChange(event.target.value)}
      />
      </div>
      <div className="flex items-center gap-xs ml-sm">
      <button className="p-1.5 text-secondary hover:text-primary hover:bg-surface-variant rounded transition-colors" title="Filter" type="button" data-action-id="filter-4" onClick={() => fullActionMap['filter-4']()}>
      <ListFilter className="text-sm" aria-hidden={true} focusable="false" />
      </button>
      <button
        className="p-1.5 text-secondary hover:text-primary hover:bg-surface-variant rounded transition-colors"
        title={sortDirection === 'asc' ? 'Sort ascending' : 'Sort descending'}
        type="button"
        data-action-id="sort-5"
        onClick={() => fullActionMap['sort-5']()}
      >
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
      <div className="divide-y divide-outline-variant">
      {visibleRecords.length === 0 ? (
        <div className="p-md text-center font-body-sm text-body-sm text-secondary" data-action="ACT_SEARCH_RECORDS_EMPTY">
          {searchInput
            ? `No notes match “${searchInput}”.`
            : 'No notes yet. Click "New Note" to start.'}
        </div>
      ) : (
        visibleRecords.map((record, rowIndex) => {
          const isSelected = record.id === state.selectedRecordId;
          return (
            <div
              key={record.id}
              data-action="ACT_SELECT_RECORD"
              data-record-id={record.id}
              className={
                isSelected
                  ? "grid grid-cols-12 gap-sm p-sm items-center hover:bg-surface-container-low transition-colors group relative bg-secondary-container/20 border-l-2 border-primary"
                  : "grid grid-cols-12 gap-sm p-sm items-center hover:bg-surface-container-low transition-colors group relative border-l-2 border-transparent"
              }
              onClick={onSelectRow}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  onSelectRow(event as unknown as React.MouseEvent<HTMLDivElement>);
                }
              }}
            >
            <div className="col-span-4 pl-sm font-body-sm text-body-sm font-medium text-on-surface truncate flex items-center gap-xs">
              <span className="truncate">{record.title}</span>
              {record.status === 'draft' ? (
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-medium bg-surface-container-high text-on-surface-variant">DRAFT</span>
              ) : null}
            </div>
            <div className="col-span-5 font-body-sm text-body-sm text-on-surface-variant truncate">{truncate(record.body, 100)}</div>
            <div className="col-span-2 font-label-sm text-label-sm text-secondary">{formatRowDate(record.updatedAt)}</div>
            <div className="col-span-1 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              className="text-secondary hover:text-primary"
              type="button"
              aria-label="Edit"
              data-record-id={record.id}
              data-action-id={rowIndexFor(rowIndex)}
              onClick={onEditRow}
            ><Pencil className="text-sm" aria-hidden={true} focusable="false" /></button>
            </div>
            </div>
          );
        })
      )}
      {/* Loading/Retry State Example (Hidden by default, shown for demonstration) */}
      <div
        className={
          retryVisible
            ? "flex flex-col items-center justify-center p-xl text-center"
            : "hidden flex-col items-center justify-center p-xl text-center"
        }
      >
      <CloudOff className="text-outline text-3xl mb-sm" aria-hidden={true} focusable="false" />
      <p className="font-body-md text-body-md text-on-surface-variant mb-md">{state.storageMessage ?? 'Failed to load older records.'}</p>
      <button className="px-md py-sm bg-surface-container-lowest border border-outline-variant rounded font-label-md text-label-md text-on-surface hover:bg-surface-variant transition-colors" data-action="ACT_RETRY_LOAD" type="button" data-action-id="retry-loading-10" onClick={() => fullActionMap['retry-loading-10']()}>
                                          Retry Loading
                                      </button>
      </div>
      </div>
      </div>
      <div className="p-xs border-t border-outline-variant bg-surface-container-low flex justify-between items-center text-secondary font-label-sm text-label-sm">
      <span>{resultCountLabel}</span>
      <div className="flex gap-xs">
      <button
        className="p-1 hover:text-primary disabled:opacity-50"
        type="button"
        aria-label="Chevron Left"
        data-action-id="chevron-left-11"
        disabled={safePageIndex === 0}
        onClick={() => fullActionMap['chevron-left-11']()}
      ><ChevronLeft className="text-sm" aria-hidden={true} focusable="false" /></button>
      <button
        className="p-1 hover:text-primary disabled:opacity-50"
        type="button"
        aria-label="Chevron Right"
        data-action-id="chevron-right-12"
        disabled={safePageIndex >= totalPages - 1}
        onClick={() => fullActionMap['chevron-right-12']()}
      ><ChevronRight className="text-sm" aria-hidden={true} focusable="false" /></button>
      </div>
      </div>
      </div>
      {/* Preview Panel */}
      <aside className="w-full lg:w-80 bg-surface-container-low border border-outline-variant rounded shadow-sm flex flex-col hidden md:flex">
      <div className="p-md border-b border-outline-variant flex justify-between items-center bg-surface-container-lowest rounded-t">
      <h2 className="font-label-md text-label-md font-bold text-on-surface uppercase tracking-wider">Preview</h2>
      <div className="flex gap-xs">
      <button
        className="text-secondary hover:text-primary transition-colors disabled:opacity-50"
        title="Edit"
        type="button"
        data-action-id="edit-13"
        disabled={!selectedRecord}
        onClick={(event) => fullActionMap['edit-13'](event)}
      ><Pencil className="text-sm" aria-hidden={true} focusable="false" /></button>
      <button
        className="text-secondary hover:text-error transition-colors disabled:opacity-50"
        title="Delete"
        type="button"
        data-action-id="delete-14"
        disabled={!selectedRecord}
        onClick={(event) => fullActionMap['delete-14'](event)}
      ><Trash2 className="text-sm" aria-hidden={true} focusable="false" /></button>
      </div>
      </div>
      <div className="p-md flex-1 overflow-y-auto">
      {selectedRecord ? (
        <>
          <div className="mb-sm flex items-center gap-xs flex-wrap">
            {selectedRecord.tags.length === 0 ? (
              <span className="font-label-sm text-label-sm text-secondary">No tags</span>
            ) : (
              selectedRecord.tags.map((tag, idx) => (
                <span
                  key={tag}
                  className={
                    idx === 0
                      ? "inline-flex items-center px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm"
                      : "inline-flex items-center px-2 py-0.5 rounded-full bg-surface-container-highest text-on-surface-variant font-label-sm text-label-sm"
                  }
                >
                  #{tag}
                </span>
              ))
            )}
          </div>
          <h3 className="font-headline-md text-headline-md text-on-surface mb-xs">{selectedRecord.title}</h3>
          <p className="font-label-sm text-label-sm text-secondary mb-md">
            Created: {formatRowDate(selectedRecord.createdAt)} • Edited: {formatRowDate(selectedRecord.updatedAt)}
          </p>
          <div className="font-body-sm text-body-sm text-on-surface-variant space-y-4 prose prose-sm prose-slate whitespace-pre-line">
            {selectedRecord.body}
          </div>
        </>
      ) : (
        <>
          <h3 className="font-headline-md text-headline-md text-on-surface mb-xs">{DEFAULT_PREVIEW_TITLE}</h3>
          <p className="font-label-sm text-label-sm text-secondary mb-md">{DEFAULT_PREVIEW_BODY}</p>
        </>
      )}
      </div>
      </aside>
      </div>
      </div>
      </main>
    </>
  );
}