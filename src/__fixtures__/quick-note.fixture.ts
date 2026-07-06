import type { QuickNoteRecord, QuickNoteState } from '../features/quick-note/quick-note.types';

/**
 * Deterministic fixture data for US-001 app shell bootstrap.
 *
 * Why this exists:
 * - The first rendered surface must be the actual product workflow, not
 *   a marketing landing page or empty placeholder. A small, representative
 *   data set lets the shell mount the Record Operations surface with real
 *   content immediately after load.
 * - Persisted state should never leak through to the first paint; this
 *   fixture is the canonical seed used when no valid persisted state is
 *   found in the repo.
 */

export const QUICK_NOTE_FIXTURE_RECORDS: QuickNoteRecord[] = [
  {
    id: 'note-001',
    title: 'Welcome to Quick Note',
    body: 'Capture a short thought, label it, and keep going.',
    tags: ['welcome', 'quick-note'],
    status: 'active',
    createdAt: '2026-07-01T09:00:00.000Z',
    updatedAt: '2026-07-01T09:00:00.000Z',
  },
  {
    id: 'note-002',
    title: 'Daily standup notes',
    body: 'Review blockers before the morning sync.',
    tags: ['meeting', 'standup'],
    status: 'active',
    createdAt: '2026-07-02T08:30:00.000Z',
    updatedAt: '2026-07-02T08:30:00.000Z',
  },
  {
    id: 'note-003',
    title: 'Idea: keyboard shortcut cheatsheet',
    body: 'Draft a one-page reference for power users.',
    tags: ['idea', 'draft'],
    status: 'draft',
    createdAt: '2026-07-03T15:14:00.000Z',
    updatedAt: '2026-07-03T15:14:00.000Z',
  },
  {
    id: 'note-004',
    title: 'Q2 retro parking lot',
    body: 'Topics deferred from the retrospective review.',
    tags: ['retro', 'planning'],
    status: 'archived',
    createdAt: '2026-06-21T17:05:00.000Z',
    updatedAt: '2026-06-25T11:42:00.000Z',
  },
];

export const QUICK_NOTE_FIXTURE_STATE: QuickNoteState = {
  records: QUICK_NOTE_FIXTURE_RECORDS,
  selectedRecordId: 'note-001',
  activeSurface: 'SURF_RECORD_OPERATIONS',
  activePanel: 'list',
  storageStatus: 'idle',
  storageMessage: null,
  lastError: null,
  hydrated: false,
};