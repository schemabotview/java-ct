import type { Scene } from '@graphlearning/flow'

// §8 — cheap threads make it easy to overwhelm a scarce dependency. A Semaphore caps concurrent
// calls; a bounded queue with AbortPolicy refuses excess work. Real JDK 25.0.2 output.
export const ccBounded: Scene = {
  id: 'cc-bounded',
  title: 'Bounded work, backpressure, connection limits and overload',
  flow: 'TB',
  nodes: [
    {
      id: 'flow',
      label: '1,000 virtual threads, one payment service',
      pattern: 'group',
      flow: 'LR',
      children: [
        { id: 'callers', label: '1,000 callers', sub: 'virtual threads', pattern: 'user', icon: 'users' },
        { id: 'gate', label: 'Semaphore(10)', sub: 'acquire … release', pattern: 'warn', icon: 'lock' },
        { id: 'service', label: 'Payment service', sub: 'handles ~10 at once', pattern: 'external', icon: 'server' },
      ],
      edges: [
        { source: 'callers', target: 'gate' },
        { source: 'gate', target: 'service', label: '≤ 10' },
      ],
    },
    {
      id: 'code',
      kind: 'code',
      filename: 'Bounded.java',
      label: `permits.acquireUninterruptibly();
try { callPaymentService(); } finally { permits.release(); }

new ThreadPoolExecutor(2, 2, 0, SECONDS,
        new ArrayBlockingQueue<>(10), new AbortPolicy());`,
    },
    {
      id: 'results',
      kind: 'table',
      label: 'Peak concurrent calls, and what was refused',
      headers: ['strategy', 'result'],
      values: [
        ['no limit', 'peak 1,000 concurrent calls'],
        ['Semaphore(10)', 'peak 10 concurrent calls'],
        ['2 threads + queue of 10, 100 tasks', 'accepted 12, rejected 88'],
      ],
    },
    {
      id: 'what',
      label: 'What to bound',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'connections', label: 'Connections', sub: 'to a database or service', pattern: 'external', icon: 'plug' },
        { id: 'queue-len', label: 'Queue length', sub: 'work waiting in memory', pattern: 'storage', icon: 'layers' },
        { id: 'rate', label: 'Request rate', sub: 'calls per second', pattern: 'network', icon: 'gauge' },
      ],
    },
  ],
  edges: [
    { source: 'flow', target: 'code' },
    { source: 'code', target: 'results', label: 'run' },
    { source: 'results', target: 'what' },
  ],
}
