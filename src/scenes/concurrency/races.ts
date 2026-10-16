import type { Scene } from '@graphlearning/flow'

// §2 — a lost update (counter++ is read-modify-write) and a visibility failure (a plain flag the
// worker never sees change). Real JDK 25.0.2 runs on 4 cores; the plain totals differ per run.
export const ccRaces: Scene = {
  id: 'cc-races',
  title: 'Races, atomicity, visibility and happens-before',
  flow: 'TB',
  nodes: [
    {
      id: 'lost-update',
      kind: 'memory',
      label: 'plain++ is three steps — two threads interleave',
      slots: [
        { at: 'T1', name: 'read 41' },
        { at: 'T2', name: 'read 41', note: 'before T1 writes' },
        { at: 'T1', name: 'write 42' },
        { at: 'T2', name: 'write 42', note: 'one increment lost' },
      ],
    },
    {
      id: 'counts',
      kind: 'table',
      label: '4 threads × 100,000 increments — expected 400,000',
      headers: ['run', 'plain int', 'AtomicInteger', 'synchronized'],
      values: [
        ['1', '398,872', '400,000', '400,000'],
        ['2', '396,955', '400,000', '400,000'],
        ['3', '397,227', '400,000', '400,000'],
      ],
    },
    {
      id: 'visibility',
      kind: 'code',
      filename: 'Visible.java — main sets the flag after 500 ms',
      label: `static boolean stop = false;            // plain
static volatile boolean stopV = false;  // volatile
worker: while (!stop) spins++;

plain    flag: worker STILL RUNNING after 2 s
volatile flag: worker stopped`,
    },
  ],
  edges: [
    { source: 'lost-update', target: 'counts', label: 'measured' },
    { source: 'counts', target: 'visibility', label: 'a second failure' },
  ],
}
