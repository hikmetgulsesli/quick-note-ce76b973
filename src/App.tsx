import { useEffect } from 'react';
import { QuickNoteProvider, useQuickNoteStore } from './features/quick-note/quick-note.store';
import { mountQuickNoteAppBridge, unmountQuickNoteAppBridge } from './test/bridge';
import {
  InsightsQuickNote,
  RecordEditorQuickNote,
  RecordOperationsQuickNote,
} from './screens';
import type { QuickNoteSurfaceId } from './features/quick-note/quick-note.types';

/**
 * App shell for US-001.
 *
 * Responsibilities owned by this story:
 * - Bootstrap shared app shell state on mount (active surface, selected
 *   item, storage status, last error, active panel, item counts).
 * - Render the first product workflow (Record Operations) immediately;
 *   never a marketing landing page or placeholder surface.
 * - Expose the deterministic `window.app` test bridge for runtime
 *   verification and downstream screen-owner stories.
 *
 * Integration policy:
 * - All three generated screens (Record Operations, Record Editor,
 *   Insights) stay reachable through the shared active-surface switch.
 *   We do NOT delete or stop rendering previously integrated screens;
 *   we only route between them based on `state.activeSurface`.
 * - The mount root is a relative flex container so generated full-screen
 *   Stitch screens that own a sibling sidebar + content layout render
 *   side-by-side at desktop widths while keeping a stable viewport
 *   height and positioning for absolute/fixed elements (e.g. the
 *   desktop side navigation).
 */

function ActiveSurface() {
  const { state } = useQuickNoteStore();

  const renderSurface = (surface: QuickNoteSurfaceId) => {
    switch (surface) {
      case 'SURF_RECORD_EDITOR':
        return <RecordEditorQuickNote />;
      case 'SURF_INSIGHTS':
        return <InsightsQuickNote />;
      case 'SURF_RECORD_OPERATIONS':
      default:
        return <RecordOperationsQuickNote />;
    }
  };

  return (
    <div
      data-setfarm-root="baseline"
      data-setfarm-surface={state.activeSurface}
      data-testid="setfarm-app-root"
      data-testid-surface="setfarm-active-surface"
      className="relative !flex min-h-screen w-full overflow-x-hidden bg-slate-50 text-slate-950"
    >
      {renderSurface(state.activeSurface)}
    </div>
  );
}

function ShellBootstrapBridge() {
  const store = useQuickNoteStore();
  useEffect(() => {
    mountQuickNoteAppBridge(store);
  }, [store]);
  useEffect(() => {
    return () => {
      unmountQuickNoteAppBridge();
    };
  }, []);
  return null;
}

export default function App() {
  return (
    <QuickNoteProvider>
      <ShellBootstrapBridge />
      <ActiveSurface />
    </QuickNoteProvider>
  );
}