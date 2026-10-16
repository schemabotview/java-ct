import type { Scene } from '@graphlearning/flow'

// §3 — an invariant across two fields (available + reserved = 100) that volatile cannot protect,
// and a Condition that waits for it to become true. Real JDK 25.0.2 output, 1,000 customers on 8
// threads, five runs.
export const ccLocks: Scene = {
  id: 'cc-locks',
  title: 'Synchronisation, locks, condition waiting and protected invariants',
  flow: 'TB',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      filename: 'Stock.java — 100 units, 1,000 customers',
      label: `volatile int available = 100, reserved = 0;
boolean reserve() {                       // check, then act
    if (available > 0) { available--; reserved++; return true; }
    return false;
}
synchronized boolean reserve() { ...same body... }   // one at a time`,
    },
    {
      id: 'runs',
      kind: 'table',
      label: 'Customers told "yes" for 100 units',
      headers: ['run', 'volatile fields', 'synchronized'],
      values: [
        ['1', '100', '100'],
        ['2', '100', '100'],
        ['3', '101 — oversold', '100'],
        ['4', '101 — oversold', '100'],
        ['5', '100', '100'],
      ],
    },
    {
      id: 'condition',
      kind: 'code',
      filename: 'waiting for the invariant to allow progress',
      label: `lock.lock();
try {
    while (shelf == 0) restocked.awaitUninterruptibly();  // releases the lock
    shelf--;
} finally { lock.unlock(); }
// restocked 5      buyer took one, shelf now 4`,
    },
  ],
  edges: [
    { source: 'code', target: 'runs', label: '5 runs' },
    { source: 'runs', target: 'condition', label: 'and to wait' },
  ],
}
