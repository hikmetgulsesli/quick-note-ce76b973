// AUTO-GENERATED from Stitch — DO NOT modify layout or CSS
// Screen: Record Operations - Quick Note
// 
// AGENT INSTRUCTIONS:
// 1. DO NOT change className values or layout structure
// 2. Add useState for dynamic values (replace hardcoded text)
// 3. Wire interactive controls through the typed actions prop
// 4. Replace placeholder data with props/state

import { ArrowUpDown, BadgeHelp, BarChart3, ChevronLeft, ChevronRight, CircleHelp, CircleUserRound, CloudOff, FileText, ListFilter, Pencil, Plus, Search, Settings, Trash2 } from "lucide-react";


export type RecordOperationsQuickNoteActionId = "new-note-1" | "settings-2" | "account-circle-3" | "filter-4" | "sort-5" | "edit-6" | "edit-7" | "edit-8" | "edit-9" | "retry-loading-10" | "chevron-left-11" | "chevron-right-12" | "edit-13" | "delete-14" | "notes-1" | "insights-2" | "archive-3" | "settings-4" | "help-5";

export interface RecordOperationsQuickNoteProps {
  actions?: Partial<Record<RecordOperationsQuickNoteActionId, () => void>>;

}

export function RecordOperationsQuickNote({ actions }: RecordOperationsQuickNoteProps) {
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
      <button className="mt-sm bg-primary text-on-primary rounded font-label-md text-label-md py-sm px-md flex items-center justify-center gap-xs hover:bg-primary-container hover:text-on-primary-container transition-colors duration-150 shadow-sm" data-action="ACT_CREATE_RECORD" type="button" data-action-id="new-note-1" onClick={actions?.["new-note-1"]}>
      <Plus className="text-sm" aria-hidden={true} focusable="false" />
                      New Note
                  </button>
      </div>
      <nav className="flex-1 flex flex-col gap-xs px-xs">
      <a className="flex items-center gap-sm bg-secondary-container text-on-secondary-container rounded-lg px-md py-sm border-l-4 border-primary font-label-md text-label-md" href="#" data-action-id="notes-1" onClick={(event) => { event.preventDefault(); actions?.["notes-1"]?.(); }}>
      <FileText aria-hidden={true} focusable="false" />
                      Notes
                  </a>
      <a className="flex items-center gap-sm text-on-surface-variant px-md py-sm hover:bg-surface-container-highest transition-colors duration-100 rounded-lg font-label-md text-label-md" href="#" data-action-id="insights-2" onClick={(event) => { event.preventDefault(); actions?.["insights-2"]?.(); }}>
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
      <button className="text-secondary hover:text-primary transition-colors duration-150" type="button" aria-label="Settings" data-action-id="settings-2" onClick={actions?.["settings-2"]}>
      <Settings aria-hidden={true} focusable="false" />
      </button>
      <button className="text-secondary hover:text-primary transition-colors duration-150" type="button" aria-label="Account Circle" data-action-id="account-circle-3" onClick={actions?.["account-circle-3"]}>
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
      <p className="font-headline-lg text-headline-lg text-on-surface">1,432</p>
      <p className="font-label-sm text-label-sm text-primary mt-xs">+12 this week</p>
      </div>
      <div className="bg-surface-container-lowest border border-outline-variant rounded p-md">
      <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-xs">Recent Activity</p>
      <p className="font-headline-lg text-headline-lg text-on-surface">Today, 9:41 AM</p>
      <p className="font-label-sm text-label-sm text-secondary mt-xs">Last edited "Q3 Strategy"</p>
      </div>
      <div className="bg-surface-container-lowest border border-outline-variant rounded p-md">
      <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-xs">Active Tags</p>
      <p className="font-headline-lg text-headline-lg text-on-surface">24</p>
      <div className="flex gap-xs mt-xs">
      <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">#urgent</span>
      <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-surface-container-highest text-on-surface-variant font-label-sm text-label-sm">#drafts</span>
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
      <input className="w-full pl-8 pr-3 py-1.5 bg-surface-container-lowest border border-outline-variant rounded font-body-sm text-body-sm text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors" data-action="ACT_SEARCH_RECORDS" placeholder="Search notes..." type="text" />
      </div>
      <div className="flex items-center gap-xs ml-sm">
      <button className="p-1.5 text-secondary hover:text-primary hover:bg-surface-variant rounded transition-colors" title="Filter" type="button" data-action-id="filter-4" onClick={actions?.["filter-4"]}>
      <ListFilter className="text-sm" aria-hidden={true} focusable="false" />
      </button>
      <button className="p-1.5 text-secondary hover:text-primary hover:bg-surface-variant rounded transition-colors" title="Sort" type="button" data-action-id="sort-5" onClick={actions?.["sort-5"]}>
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
      {/* Row 1 (Active) */}
      <div className="grid grid-cols-12 gap-sm p-sm items-center hover:bg-surface-container-low transition-colors group relative bg-secondary-container/20 border-l-2 border-primary" data-action="ACT_SELECT_RECORD">
      <div className="col-span-4 pl-sm font-body-sm text-body-sm font-medium text-on-surface truncate">Q3 Strategy Planning</div>
      <div className="col-span-5 font-body-sm text-body-sm text-on-surface-variant truncate">Initial thoughts on expanding the feature set for Q3, focusing on performance...</div>
      <div className="col-span-2 font-label-sm text-label-sm text-secondary">Today, 9:41 AM</div>
      <div className="col-span-1 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
      <button className="text-secondary hover:text-primary" type="button" aria-label="Edit" data-action-id="edit-6" onClick={actions?.["edit-6"]}><Pencil className="text-sm" aria-hidden={true} focusable="false" /></button>
      </div>
      </div>
      {/* Row 2 */}
      <div className="grid grid-cols-12 gap-sm p-sm items-center hover:bg-surface-container-low transition-colors group relative border-l-2 border-transparent">
      <div className="col-span-4 pl-sm font-body-sm text-body-sm font-medium text-on-surface truncate">Meeting Notes: Design Sync</div>
      <div className="col-span-5 font-body-sm text-body-sm text-on-surface-variant truncate">Discussed the new color tokens and typography hierarchy adjustments. Need to follow up...</div>
      <div className="col-span-2 font-label-sm text-label-sm text-secondary">Yesterday</div>
      <div className="col-span-1 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
      <button className="text-secondary hover:text-primary" type="button" aria-label="Edit" data-action-id="edit-7" onClick={actions?.["edit-7"]}><Pencil className="text-sm" aria-hidden={true} focusable="false" /></button>
      </div>
      </div>
      {/* Row 3 */}
      <div className="grid grid-cols-12 gap-sm p-sm items-center hover:bg-surface-container-low transition-colors group relative border-l-2 border-transparent">
      <div className="col-span-4 pl-sm font-body-sm text-body-sm font-medium text-on-surface truncate flex items-center gap-xs">
                                          Project Ideas
                                          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-medium bg-surface-container-high text-on-surface-variant">DRAFT</span>
      </div>
      <div className="col-span-5 font-body-sm text-body-sm text-on-surface-variant truncate">List of potential side projects involving WebGL and data visualization techniques...</div>
      <div className="col-span-2 font-label-sm text-label-sm text-secondary">Oct 24, 2023</div>
      <div className="col-span-1 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
      <button className="text-secondary hover:text-primary" type="button" aria-label="Edit" data-action-id="edit-8" onClick={actions?.["edit-8"]}><Pencil className="text-sm" aria-hidden={true} focusable="false" /></button>
      </div>
      </div>
      {/* Row 4 */}
      <div className="grid grid-cols-12 gap-sm p-sm items-center hover:bg-surface-container-low transition-colors group relative border-l-2 border-transparent">
      <div className="col-span-4 pl-sm font-body-sm text-body-sm font-medium text-on-surface truncate">Grocery List</div>
      <div className="col-span-5 font-body-sm text-body-sm text-on-surface-variant truncate">Oat milk, coffee beans, spinach, eggs, whole wheat bread...</div>
      <div className="col-span-2 font-label-sm text-label-sm text-secondary">Oct 20, 2023</div>
      <div className="col-span-1 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
      <button className="text-secondary hover:text-primary" type="button" aria-label="Edit" data-action-id="edit-9" onClick={actions?.["edit-9"]}><Pencil className="text-sm" aria-hidden={true} focusable="false" /></button>
      </div>
      </div>
      {/* Loading/Retry State Example (Hidden by default, shown for demonstration) */}
      <div className="hidden flex-col items-center justify-center p-xl text-center">
      <CloudOff className="text-outline text-3xl mb-sm" aria-hidden={true} focusable="false" />
      <p className="font-body-md text-body-md text-on-surface-variant mb-md">Failed to load older records.</p>
      <button className="px-md py-sm bg-surface-container-lowest border border-outline-variant rounded font-label-md text-label-md text-on-surface hover:bg-surface-variant transition-colors" data-action="ACT_RETRY_LOAD" type="button" data-action-id="retry-loading-10" onClick={actions?.["retry-loading-10"]}>
                                          Retry Loading
                                      </button>
      </div>
      </div>
      </div>
      <div className="p-xs border-t border-outline-variant bg-surface-container-low flex justify-between items-center text-secondary font-label-sm text-label-sm">
      <span>Showing 1-4 of 1,432</span>
      <div className="flex gap-xs">
      <button className="p-1 hover:text-primary disabled:opacity-50" type="button" aria-label="Chevron Left" data-action-id="chevron-left-11" onClick={actions?.["chevron-left-11"]}><ChevronLeft className="text-sm" aria-hidden={true} focusable="false" /></button>
      <button className="p-1 hover:text-primary" type="button" aria-label="Chevron Right" data-action-id="chevron-right-12" onClick={actions?.["chevron-right-12"]}><ChevronRight className="text-sm" aria-hidden={true} focusable="false" /></button>
      </div>
      </div>
      </div>
      {/* Preview Panel */}
      <aside className="w-full lg:w-80 bg-surface-container-low border border-outline-variant rounded shadow-sm flex flex-col hidden md:flex">
      <div className="p-md border-b border-outline-variant flex justify-between items-center bg-surface-container-lowest rounded-t">
      <h2 className="font-label-md text-label-md font-bold text-on-surface uppercase tracking-wider">Preview</h2>
      <div className="flex gap-xs">
      <button className="text-secondary hover:text-primary transition-colors" title="Edit" type="button" data-action-id="edit-13" onClick={actions?.["edit-13"]}><Pencil className="text-sm" aria-hidden={true} focusable="false" /></button>
      <button className="text-secondary hover:text-error transition-colors" title="Delete" type="button" data-action-id="delete-14" onClick={actions?.["delete-14"]}><Trash2 className="text-sm" aria-hidden={true} focusable="false" /></button>
      </div>
      </div>
      <div className="p-md flex-1 overflow-y-auto">
      <div className="mb-sm flex items-center gap-xs">
      <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">#strategy</span>
      <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-surface-container-highest text-on-surface-variant font-label-sm text-label-sm">#q3</span>
      </div>
      <h3 className="font-headline-md text-headline-md text-on-surface mb-xs">Q3 Strategy Planning</h3>
      <p className="font-label-sm text-label-sm text-secondary mb-md">Created: Oct 25, 2023 9:00 AM • Edited: Today, 9:41 AM</p>
      <div className="font-body-sm text-body-sm text-on-surface-variant space-y-4 prose prose-sm prose-slate">
      <p>Initial thoughts on expanding the feature set for Q3, focusing on performance and data density.</p>
      <ul>
      <li>Optimize initial load times for the primary data table.</li>
      <li>Introduce customizable hotkeys for power users.</li>
      <li>Review color contrast ratios in the dark mode theme.</li>
      </ul>
      <p>Next steps: Schedule a sync with the design team to review the proposed layout changes for the Insights panel.</p>
      </div>
      </div>
      </aside>
      </div>
      </div>
      </main>
    </>
  );
}
