// AUTO-GENERATED from Stitch — DO NOT modify layout or CSS
// Screen: Insights - Quick Note
// 
// AGENT INSTRUCTIONS:
// 1. DO NOT change className values or layout structure
// 2. Add useState for dynamic values (replace hardcoded text)
// 3. Wire interactive controls through the typed actions prop
// 4. Replace placeholder data with props/state

import { ArrowRight, BadgeHelp, BarChart3, CircleHelp, CirclePlus, CircleUserRound, Download, FilePenLine, FileText, Lightbulb, ListFilter, Plus, RefreshCw, Settings, Tag } from "lucide-react";


export type InsightsQuickNoteActionId = "new-note-1" | "settings-2" | "account-circle-3" | "filter-4" | "export-5" | "notes-1" | "insights-2" | "archive-3" | "settings-4" | "help-5" | "review-them-6";

export interface InsightsQuickNoteProps {
  actions?: Partial<Record<InsightsQuickNoteActionId, () => void>>;

}

export function InsightsQuickNote({ actions }: InsightsQuickNoteProps) {
  return (
    <>
      {/* SideNavBar (Web) */}
      <aside className="hidden md:flex flex-col h-full py-lg fixed left-0 top-0 w-60 border-r border-outline-variant bg-surface-container-low dark:bg-surface-container-lowest z-20">
      <div className="px-md mb-xl flex flex-col gap-sm">
      <h1 className="font-headline-md text-headline-md text-primary">Quick Note</h1>
      <p className="font-label-md text-label-md text-on-surface-variant">Minimalist Editor</p>
      </div>
      <div className="px-md mb-lg">
      <button className="w-full flex items-center justify-center gap-xs bg-primary text-on-primary py-sm px-md rounded font-body-md text-body-md hover:opacity-90 transition-opacity" type="button" data-action-id="new-note-1" onClick={actions?.["new-note-1"]}>
      <Plus className="text-[18px]" aria-hidden={true} focusable="false" />
                      New Note
                  </button>
      </div>
      <nav className="flex-1 flex flex-col gap-xs px-sm">
      <a className="flex items-center gap-sm text-on-surface-variant dark:text-surface-variant px-md py-sm hover:bg-surface-container-highest dark:hover:bg-surface-dim transition-colors rounded" href="#" data-action-id="notes-1" onClick={(event) => { event.preventDefault(); actions?.["notes-1"]?.(); }}>
      <FileText className="text-[20px]" aria-hidden={true} focusable="false" />
      <span className="font-label-md text-label-md">Notes</span>
      </a>
      <a className="flex items-center gap-sm bg-secondary-container dark:bg-secondary text-on-secondary-container dark:text-on-secondary rounded-lg px-md py-sm border-l-4 border-primary hover:bg-surface-container-highest dark:hover:bg-surface-dim transition-colors scale-95 duration-100" href="#" data-action-id="insights-2" onClick={(event) => { event.preventDefault(); actions?.["insights-2"]?.(); }}>
      <BarChart3 data-weight="fill" style={{fontVariationSettings: "'FILL' 1"}} className="text-[20px]" aria-hidden={true} focusable="false" />
      <span className="font-label-md text-label-md font-bold">Insights</span>
      </a>
      <a className="flex items-center gap-sm text-on-surface-variant dark:text-surface-variant px-md py-sm hover:bg-surface-container-highest dark:hover:bg-surface-dim transition-colors rounded" href="#" data-action-id="archive-3" onClick={(event) => { event.preventDefault(); actions?.["archive-3"]?.(); }}>
      <BadgeHelp className="text-[20px]" aria-hidden={true} focusable="false" />
      <span className="font-label-md text-label-md">Archive</span>
      </a>
      </nav>
      <div className="mt-auto px-sm flex flex-col gap-xs border-t border-outline-variant pt-md">
      <a className="flex items-center gap-sm text-on-surface-variant dark:text-surface-variant px-md py-sm hover:bg-surface-container-highest dark:hover:bg-surface-dim transition-colors rounded" href="#" data-action-id="settings-4" onClick={(event) => { event.preventDefault(); actions?.["settings-4"]?.(); }}>
      <Settings className="text-[20px]" aria-hidden={true} focusable="false" />
      <span className="font-label-md text-label-md">Settings</span>
      </a>
      <a className="flex items-center gap-sm text-on-surface-variant dark:text-surface-variant px-md py-sm hover:bg-surface-container-highest dark:hover:bg-surface-dim transition-colors rounded" href="#" data-action-id="help-5" onClick={(event) => { event.preventDefault(); actions?.["help-5"]?.(); }}>
      <CircleHelp className="text-[20px]" aria-hidden={true} focusable="false" />
      <span className="font-label-md text-label-md">Help</span>
      </a>
      </div>
      </aside>
      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-screen md:ml-60 w-full">
      {/* TopNavBar (Mobile & Desktop) */}
      <header className="flex justify-between items-center w-full px-margin-desktop max-w-7xl mx-auto h-16 bg-surface dark:bg-background border-b border-outline-variant dark:border-outline docked full-width top-0 z-10 md:hidden">
      <div className="font-headline-md text-headline-md font-bold text-on-surface dark:text-on-background">Quick Note</div>
      <div className="flex gap-md">
      <button className="text-secondary dark:text-secondary-fixed-dim hover:text-primary transition-colors" type="button" aria-label="Settings" data-action-id="settings-2" onClick={actions?.["settings-2"]}><Settings aria-hidden={true} focusable="false" /></button>
      <button className="text-secondary dark:text-secondary-fixed-dim hover:text-primary transition-colors" type="button" aria-label="Account Circle" data-action-id="account-circle-3" onClick={actions?.["account-circle-3"]}><CircleUserRound aria-hidden={true} focusable="false" /></button>
      </div>
      </header>
      {/* Insights Content Canvas */}
      <div className="flex-1 p-margin-mobile md:p-margin-desktop max-w-7xl mx-auto w-full flex flex-col gap-lg">
      {/* Header Actions */}
      <div className="flex justify-between items-end">
      <div>
      <h2 className="font-headline-lg text-headline-lg text-on-surface">Insights Overview</h2>
      <p className="font-body-md text-body-md text-on-surface-variant mt-xs">Your documentation habits this week.</p>
      </div>
      <div className="flex gap-sm">
      <button className="flex items-center gap-xs px-md py-sm border border-outline-variant rounded font-label-md text-label-md text-on-surface bg-surface hover:bg-surface-container-highest transition-colors shadow-sm" type="button" data-action-id="filter-4" onClick={actions?.["filter-4"]}>
      <ListFilter className="text-[16px]" aria-hidden={true} focusable="false" />
                              Filter
                          </button>
      <button className="flex items-center gap-xs px-md py-sm border border-outline-variant rounded font-label-md text-label-md text-on-surface bg-surface hover:bg-surface-container-highest transition-colors shadow-sm" type="button" data-action-id="export-5" onClick={actions?.["export-5"]}>
      <Download className="text-[16px]" aria-hidden={true} focusable="false" />
                              Export
                          </button>
      </div>
      </div>
      {/* Metrics Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
      {/* Metric 1 */}
      <div className="bg-surface-container-lowest border border-outline-variant p-md rounded flex flex-col gap-sm">
      <div className="flex justify-between items-center text-on-surface-variant">
      <span className="font-label-md text-label-md">Created This Week</span>
      <FilePenLine className="text-[18px]" aria-hidden={true} focusable="false" />
      </div>
      <div className="flex items-baseline gap-sm">
      <span className="font-headline-lg text-headline-lg text-on-surface">24</span>
      <span className="font-label-sm text-label-sm text-primary">+12% vs last week</span>
      </div>
      </div>
      {/* Metric 2 */}
      <div className="bg-surface-container-lowest border border-outline-variant p-md rounded flex flex-col gap-sm">
      <div className="flex justify-between items-center text-on-surface-variant">
      <span className="font-label-md text-label-md">Avg. Note Length</span>
      <BadgeHelp className="text-[18px]" aria-hidden={true} focusable="false" />
      </div>
      <div className="flex items-baseline gap-sm">
      <span className="font-headline-lg text-headline-lg text-on-surface">342</span>
      <span className="font-label-sm text-label-sm text-on-surface-variant">words</span>
      </div>
      </div>
      {/* Metric 3 */}
      <div className="bg-surface-container-lowest border border-outline-variant p-md rounded flex flex-col gap-sm">
      <div className="flex justify-between items-center text-on-surface-variant">
      <span className="font-label-md text-label-md">Top Tag</span>
      <BadgeHelp className="text-[18px]" aria-hidden={true} focusable="false" />
      </div>
      <div className="flex items-baseline gap-sm">
      <span className="font-headline-lg text-headline-lg text-on-surface">#dev</span>
      <span className="font-label-sm text-label-sm text-on-surface-variant">15 uses</span>
      </div>
      </div>
      </div>
      {/* Two Column Layout below metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg flex-1">
      {/* Main Feed (Left 2 cols) */}
      <div className="lg:col-span-2 flex flex-col gap-md">
      <h3 className="font-body-lg text-body-lg text-on-surface font-semibold border-b border-outline-variant pb-xs">Recent Activity</h3>
      <div className="flex flex-col gap-0 border border-outline-variant rounded bg-surface-container-lowest overflow-hidden">
      {/* Item 1 */}
      <div className="flex items-start gap-md p-md border-b border-outline-variant hover:bg-surface-container-low transition-colors">
      <div className="mt-xs text-primary"><CirclePlus className="text-[20px]" aria-hidden={true} focusable="false" /></div>
      <div className="flex-1">
      <div className="flex justify-between items-baseline mb-xs">
      <span className="font-body-md text-body-md text-on-surface font-medium">Created "API Spec Draft"</span>
      <span className="font-label-sm text-label-sm text-on-surface-variant">2h ago</span>
      </div>
      <div className="flex gap-xs">
      <span className="px-xs py-[2px] bg-surface-container border border-outline-variant rounded font-label-sm text-label-sm text-on-surface-variant">#dev</span>
      </div>
      </div>
      </div>
      {/* Item 2 */}
      <div className="flex items-start gap-md p-md border-b border-outline-variant hover:bg-surface-container-low transition-colors">
      <div className="mt-xs text-on-surface-variant"><RefreshCw className="text-[20px]" aria-hidden={true} focusable="false" /></div>
      <div className="flex-1">
      <div className="flex justify-between items-baseline mb-xs">
      <span className="font-body-md text-body-md text-on-surface font-medium">Updated "Q3 Goals"</span>
      <span className="font-label-sm text-label-sm text-on-surface-variant">5h ago</span>
      </div>
      <p className="font-body-sm text-body-sm text-on-surface-variant">Added 150 words to section 2.</p>
      </div>
      </div>
      {/* Item 3 */}
      <div className="flex items-start gap-md p-md hover:bg-surface-container-low transition-colors">
      <div className="mt-xs text-on-surface-variant"><Tag className="text-[20px]" aria-hidden={true} focusable="false" /></div>
      <div className="flex-1">
      <div className="flex justify-between items-baseline mb-xs">
      <span className="font-body-md text-body-md text-on-surface font-medium">Tagged 3 notes</span>
      <span className="font-label-sm text-label-sm text-on-surface-variant">Yesterday</span>
      </div>
      <div className="flex gap-xs">
      <span className="px-xs py-[2px] bg-surface-container border border-outline-variant rounded font-label-sm text-label-sm text-on-surface-variant">#personal</span>
      </div>
      </div>
      </div>
      </div>
      </div>
      {/* Secondary Panel (Right 1 col) */}
      <div className="flex flex-col gap-lg">
      {/* Hints / Actionables */}
      <div className="bg-secondary-container dark:bg-surface-dim border border-outline-variant p-md rounded flex flex-col gap-md">
      <h3 className="font-body-lg text-body-lg text-on-secondary-container font-semibold flex items-center gap-xs">
      <Lightbulb className="text-[20px]" aria-hidden={true} focusable="false" /> Suggestions
                              </h3>
      <ul className="flex flex-col gap-sm">
      <li className="flex items-start gap-sm">
      <ArrowRight className="text-[16px] text-primary mt-[2px]" aria-hidden={true} focusable="false" />
      <span className="font-body-sm text-body-sm text-on-surface">You have 5 untagged notes from last week. <a className="text-primary hover:underline" href="#" data-action-id="review-them-6" onClick={(event) => { event.preventDefault(); actions?.["review-them-6"]?.(); }}>Review them</a>.</span>
      </li>
      <li className="flex items-start gap-sm">
      <ArrowRight className="text-[16px] text-primary mt-[2px]" aria-hidden={true} focusable="false" />
      <span className="font-body-sm text-body-sm text-on-surface">"Meeting Notes" tag is growing fast. Consider splitting it.</span>
      </li>
      </ul>
      </div>
      {/* Category Distribution */}
      <div className="flex flex-col gap-sm bg-surface-container-lowest border border-outline-variant p-md rounded">
      <h3 className="font-body-md text-body-md text-on-surface font-semibold mb-xs">Tags by Volume</h3>
      <div className="flex items-center gap-sm">
      <span className="w-16 font-label-sm text-label-sm text-on-surface-variant truncate">#dev</span>
      <div className="flex-1 h-2 bg-surface-container rounded overflow-hidden">
      <div className="h-full bg-primary" style={{width: "75%"}}></div>
      </div>
      <span className="font-label-sm text-label-sm text-on-surface-variant">75%</span>
      </div>
      <div className="flex items-center gap-sm">
      <span className="w-16 font-label-sm text-label-sm text-on-surface-variant truncate">#ideas</span>
      <div className="flex-1 h-2 bg-surface-container rounded overflow-hidden">
      <div className="h-full bg-secondary" style={{width: "40%"}}></div>
      </div>
      <span className="font-label-sm text-label-sm text-on-surface-variant">40%</span>
      </div>
      <div className="flex items-center gap-sm">
      <span className="w-16 font-label-sm text-label-sm text-on-surface-variant truncate">#meetings</span>
      <div className="flex-1 h-2 bg-surface-container rounded overflow-hidden">
      <div className="h-full bg-outline" style={{width: "25%"}}></div>
      </div>
      <span className="font-label-sm text-label-sm text-on-surface-variant">25%</span>
      </div>
      </div>
      </div>
      </div>
      </div>
      </main>
    </>
  );
}
