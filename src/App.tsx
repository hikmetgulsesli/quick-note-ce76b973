import { useEffect, useMemo } from 'react';
import { QuickNoteProvider, useQuickNoteStore } from './features/quick-note/quick-note.store';
import { mountQuickNoteAppBridge, unmountQuickNoteAppBridge } from './test/bridge';
import {
  InsightsQuickNote,
  RecordEditorQuickNote,
  RecordOperationsQuickNote,
  type RecordEditorQuickNoteActionId,
  type RecordOperationsQuickNoteActionId,
} from './screens';
import type { QuickNoteSurfaceId } from './features/quick-note/quick-note.types';

/**
 * App shell for US-001 + US-002.
 *
 * Responsibilities owned by US-001 (unchanged):
 * - Bootstrap shared app shell state on mount (active surface, selected
 *   item, storage status, last error, active panel, item counts).
 * - Render the first product workflow (Record Operations) immediately;
 *   never a marketing landing page or placeholder surface.
 * - Expose the deterministic `window.app` test bridge for runtime
 *   verification and downstream screen-owner stories.
 *
 * Responsibilities added by US-002:
 * - Provide a flex viewport container (`data-setfarm-root`) so the
 *   generated Stitch screens' fixed sidebar + main canvas layout
 *   renders side-by-side on desktop without clipping or stacking.
 *   The mount root uses `relative min-h-screen w-full overflow-hidden`
 *   so absolute/fixed generated layers have a stable viewport frame.
 * - Wire the screen-owned action IDs (`notes-*`, `insights-*`) for
 *   navigation between generated screens. The remaining action IDs
 *   are owned and handled inside each generated screen file.
 *
 * Integration policy:
 * - All three generated screens (Record Operations, Record Editor,
 *   Insights) stay reachable through the shared active-surface switch.
 *   We do NOT delete or stop rendering previously integrated screens;
 *   we only route between them based on `state.activeSurface`.
 */

function ActiveSurface() {
  const store = useQuickNoteStore();
  const { state } = store;

  const goToOperations = () => store.setActiveSurface('SURF_RECORD_OPERATIONS');
  const goToInsights = () => store.setActiveSurface('SURF_INSIGHTS');

  // Editor screen navigation actions: route the chrome links through
  // the active-surface switch so the back/forward behaviour is
  // deterministic regardless of which screen the user lands on.
  const editorActions = useMemo<Partial<Record<RecordEditorQuickNoteActionId, () => void>>>(
    () => ({
      'notes-1': goToOperations,
      'notes-3': goToOperations,
      'insights-2': goToInsights,
      'insights-4': goToInsights,
    }),
    // goToOperations / goToInsights are stable references inside this
    // component lifetime, so a one-shot memo is enough.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  // Operations screen navigation actions: Insights link in the side
  // nav and mobile top bar routes to the Insights surface; the other
  // affordances are already wired by the screen itself.
  const operationsActions = useMemo<Partial<Record<RecordOperationsQuickNoteActionId, () => void>>>(
    () => ({
      'insights-2': goToInsights,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const renderSurface = (surface: QuickNoteSurfaceId) => {
    switch (surface) {
      case 'SURF_RECORD_EDITOR':
        return <RecordEditorQuickNote actions={editorActions} />;
      case 'SURF_INSIGHTS':
        return <InsightsQuickNote />;
      case 'SURF_RECORD_OPERATIONS':
      default:
        return <RecordOperationsQuickNote actions={operationsActions} />;
    }
  };

  return (
    <div
      data-setfarm-root="baseline"
      data-setfarm-surface={state.activeSurface}
      data-testid="setfarm-app-root"
      data-testid-surface="setfarm-active-surface"
      className="relative flex min-h-screen w-full overflow-hidden bg-slate-50 text-slate-950"
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