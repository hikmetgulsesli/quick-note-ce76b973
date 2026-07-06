// AUTO-GENERATED from Stitch — DO NOT modify layout or CSS
// Screen: Record Editor - Quick Note
// 
// AGENT INSTRUCTIONS:
// 1. DO NOT change className values or layout structure
// 2. Add useState for dynamic values (replace hardcoded text)
// 3. Wire interactive controls through the typed actions prop
// 4. Replace placeholder data with props/state

import { ArrowLeft, BadgeHelp, BarChart3, CircleAlert, CircleHelp, CircleUserRound, FileText, Plus, Settings, Tag, X } from "lucide-react";


export type RecordEditorQuickNoteActionId = "settings-1" | "account-circle-2" | "create-3" | "new-note-4" | "back-to-notes-5" | "cancel-6" | "save-note-7" | "close-8" | "notes-1" | "insights-2" | "notes-3" | "insights-4" | "archive-5" | "settings-6" | "help-7";

export interface RecordEditorQuickNoteProps {
  actions?: Partial<Record<RecordEditorQuickNoteActionId, () => void>>;

}

export function RecordEditorQuickNote({ actions }: RecordEditorQuickNoteProps) {
  return (
    <>
      {/* Mobile Top Navigation */}
      <header className="md:hidden sticky top-0 z-50 bg-surface text-primary border-b border-outline-variant w-full">
      <div className="flex justify-between items-center w-full px-margin-mobile max-w-7xl mx-auto h-16">
      <span className="font-headline-md text-headline-md font-bold text-on-surface">Quick Note</span>
      <div className="flex items-center gap-md">
      <button className="text-secondary hover:text-primary transition-colors duration-150" type="button" aria-label="Settings" data-action-id="settings-1" onClick={actions?.["settings-1"]}>
      <Settings aria-hidden={true} focusable="false" />
      </button>
      <button className="text-secondary hover:text-primary transition-colors duration-150" type="button" aria-label="Account Circle" data-action-id="account-circle-2" onClick={actions?.["account-circle-2"]}>
      <CircleUserRound aria-hidden={true} focusable="false" />
      </button>
      <button className="bg-primary text-on-primary px-4 py-2 rounded font-label-md text-label-md" type="button" data-action-id="create-3" onClick={actions?.["create-3"]}>
                          Create
                      </button>
      </div>
      </div>
      {/* Mobile Nav Links */}
      <nav className="flex px-margin-mobile gap-md border-t border-outline-variant bg-surface overflow-x-visible md:overflow-x-auto flex-col md:flex-row items-stretch md:items-start">
      <a className="text-primary font-bold border-b-2 border-primary pb-1 py-3 px-2 whitespace-nowrap active opacity-80 transition-opacity duration-150" href="#" data-action-id="notes-1" onClick={(event) => { event.preventDefault(); actions?.["notes-1"]?.(); }}>Notes</a>
      <a className="text-secondary py-3 px-2 whitespace-nowrap hover:text-primary transition-colors duration-150" href="#" data-action-id="insights-2" onClick={(event) => { event.preventDefault(); actions?.["insights-2"]?.(); }}>Insights</a>
      </nav>
      </header>
      {/* Desktop Side Navigation */}
      <aside className="hidden md:flex flex-col h-screen py-lg bg-surface-container-low text-primary font-label-md text-label-md fixed left-0 top-0 w-60 border-r border-outline-variant z-40 shrink-0">
      <div className="px-md mb-xl flex items-center gap-sm">
      <div className="w-8 h-8 rounded-full bg-surface-variant flex items-center justify-center overflow-hidden shrink-0">
      <img className="w-full h-full object-cover" data-alt="A minimalist abstract user avatar icon with subtle blue gradients on a white background, highly legible and sharp." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsW9nkaA3kv4_daTK5erEivr6gcy0uZmxWSVaxYbKTz0PBH9_0n8dZyYlpWlwBVrbyRrjxksPudlLuTw3peiZdopox0jZlhZGq9-EoVCpEmR48MRlDQNTbZaYmyS6zcIyqvv3EFn1-xBLtFzfzB6kNVNKXpF5qMiv0uMZh9-U5ox39F9w_epsG5lpPVbnXntMKi4w9oVTrMk0AaWHU5UBX1um1GnDE4ErTnKi4moUFPsIkyLm_-lolLmkeAI6FPjfxx4UVd3OCGLs" />
      </div>
      <div>
      <h1 className="font-headline-md text-headline-md text-primary m-0 leading-tight">Quick Note</h1>
      <span className="font-body-sm text-body-sm text-secondary block mt-xs">Minimalist Editor</span>
      </div>
      </div>
      <div className="px-md mb-lg">
      <button className="w-full bg-primary text-on-primary py-2 rounded flex justify-center items-center gap-xs hover:bg-primary-container transition-colors" type="button" data-action-id="new-note-4" onClick={actions?.["new-note-4"]}>
      <Plus  style={{fontSize: "18px"}} aria-hidden={true} focusable="false" /> New Note
                  </button>
      </div>
      <nav className="flex-1 px-sm space-y-sm">
      <a className="flex items-center gap-sm bg-secondary-container text-on-secondary-container rounded-lg px-md py-sm border-l-4 border-primary scale-95 duration-100" href="#" data-action-id="notes-3" onClick={(event) => { event.preventDefault(); actions?.["notes-3"]?.(); }}>
      <FileText aria-hidden={true} focusable="false" /> Notes
                  </a>
      <a className="flex items-center gap-sm text-on-surface-variant px-md py-sm hover:bg-surface-container-highest transition-colors" href="#" data-action-id="insights-4" onClick={(event) => { event.preventDefault(); actions?.["insights-4"]?.(); }}>
      <BarChart3 aria-hidden={true} focusable="false" /> Insights
                  </a>
      <a className="flex items-center gap-sm text-on-surface-variant px-md py-sm hover:bg-surface-container-highest transition-colors" href="#" data-action-id="archive-5" onClick={(event) => { event.preventDefault(); actions?.["archive-5"]?.(); }}>
      <BadgeHelp aria-hidden={true} focusable="false" /> Archive
                  </a>
      </nav>
      <div className="px-sm space-y-sm mt-auto">
      <a className="flex items-center gap-sm text-on-surface-variant px-md py-sm hover:bg-surface-container-highest transition-colors" href="#" data-action-id="settings-6" onClick={(event) => { event.preventDefault(); actions?.["settings-6"]?.(); }}>
      <Settings aria-hidden={true} focusable="false" /> Settings
                  </a>
      <a className="flex items-center gap-sm text-on-surface-variant px-md py-sm hover:bg-surface-container-highest transition-colors" href="#" data-action-id="help-7" onClick={(event) => { event.preventDefault(); actions?.["help-7"]?.(); }}>
      <CircleHelp aria-hidden={true} focusable="false" /> Help
                  </a>
      </div>
      </aside>
      {/* Main Content Area */}
      <main className="flex-1 md:ml-60 flex flex-col h-screen overflow-hidden">
      {/* Editor Header Toolbar */}
      <div className="flex items-center justify-between px-margin-mobile md:px-margin-desktop py-md border-b border-outline-variant bg-surface sticky top-0 z-30 shrink-0">
      <div className="flex items-center gap-md">
      <button className="text-secondary hover:text-primary transition-colors flex items-center gap-xs font-label-md text-label-md" id="btn-cancel" type="button" data-action-id="back-to-notes-5" onClick={actions?.["back-to-notes-5"]}>
      <ArrowLeft  style={{fontSize: "18px"}} aria-hidden={true} focusable="false" />
      <span className="hidden sm:inline">Back to Notes</span>
      </button>
      <div className="h-6 w-px bg-outline-variant mx-sm"></div>
      <div className="flex items-center gap-xs text-secondary">
      <BadgeHelp  style={{fontSize: "16px"}} aria-hidden={true} focusable="false" />
      <span className="font-body-sm text-body-sm" id="save-status">Saved</span>
      </div>
      </div>
      <div className="flex items-center gap-sm">
      <button className="px-md py-sm rounded border border-outline-variant text-on-surface font-label-md text-label-md hover:bg-surface-container-low transition-colors" id="btn-cancel-top" type="button" data-action-id="cancel-6" onClick={actions?.["cancel-6"]}>Cancel</button>
      <button className="px-md py-sm rounded bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-container transition-colors" id="btn-save" type="button" data-action-id="save-note-7" onClick={actions?.["save-note-7"]}>Save Note</button>
      </div>
      </div>
      {/* Editor Canvas */}
      <div className="flex-1 overflow-y-auto px-margin-mobile md:px-margin-desktop py-lg pb-xl">
      <div className="max-w-3xl mx-auto w-full h-full flex flex-col bg-surface-container-lowest border border-outline-variant rounded p-lg md:p-xl">
      <form className="flex flex-col h-full gap-md relative" id="note-editor-form">
      {/* Unsaved Changes Notice */}
      <div className="hidden absolute -top-12 left-0 right-0 bg-secondary-container text-on-secondary-container px-md py-sm rounded font-body-sm text-body-sm flex items-center justify-between" id="unsaved-notice">
      <span>You have unsaved changes.</span>
      <button className="text-secondary hover:text-primary" type="button" aria-label="Close" data-action-id="close-8" onClick={actions?.["close-8"]}>
      <X  style={{fontSize: "16px"}} aria-hidden={true} focusable="false" />
      </button>
      </div>
      {/* Title Field */}
      <div className="flex flex-col gap-xs">
      <label className="font-label-md text-label-md text-secondary" htmlFor="note-title">Title <span className="text-error">*</span></label>
      <input className="q-input w-full bg-surface-container-lowest border border-outline-variant rounded px-md py-sm font-headline-lg text-headline-lg text-on-surface placeholder:text-outline transition-colors" id="note-title" name="note-title" placeholder="Enter note title..." required={true} type="text" />
      <span className="hidden text-error font-body-sm text-body-sm mt-xs flex items-center gap-xs" id="title-error">
      <CircleAlert  style={{fontSize: "14px"}} aria-hidden={true} focusable="false" /> Title is required.
                              </span>
      </div>
      {/* Tags Field */}
      <div className="flex flex-col gap-xs border-b border-outline-variant pb-md">
      <label className="font-label-md text-label-md text-secondary" htmlFor="note-tags">Tags <span className="text-outline font-normal">(Optional)</span></label>
      <div className="flex items-center gap-sm">
      <Tag className="text-outline" aria-hidden={true} focusable="false" />
      <input className="q-input flex-1 bg-transparent border-none p-0 focus:ring-0 font-body-sm text-body-sm text-on-surface placeholder:text-outline" id="note-tags" name="note-tags" placeholder="e.g. meeting, urgent, project-x" type="text" />
      </div>
      </div>
      {/* Body Field */}
      <div className="flex flex-col gap-xs flex-1">
      <label className="sr-only" htmlFor="note-body">Note Body</label>
      <textarea className="q-input w-full flex-1 bg-surface-container-lowest border-none resize-none p-0 focus:ring-0 font-body-lg text-body-lg text-on-surface placeholder:text-outline leading-relaxed" id="note-body" name="note-body" placeholder="Start typing your note here..."></textarea>
      </div>
      </form>
      </div>
      </div>
      </main>
      
    </>
  );
}
