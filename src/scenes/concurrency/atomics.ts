import type { Scene } from '@graphlearning/flow'

// §4 — a thread-safe map does not make a get-then-put sequence atomic; merge does it in one step.
// Real JDK 25.0.2 runs: 4 threads × 10,000 updates over 3 keys.
export const ccAtomics: Scene = {
  id: 'cc-atomics',
  title: 'Atomics, concurrent collections and compound operations',
  flow: 'TB',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      filename: 'Chm.java — both maps are ConcurrentHashMap',
      label: `Integer old = racy.get(sku);                     // check
racy.put(sku, old == null ? 1 : old + 1);       // then act

merged.merge(sku, 1, Integer::sum);             // one atomic step`,
    },
    {
      id: 'totals',
      kind: 'evolution',
      label: 'Total of all counts — expected 40,000',
      evolution: {
        unit: 'counted updates',
        baseline: 30000,
        stages: [
          { label: 'get + put', sub: 'run 1', value: 34328, valueLabel: '34,328' },
          { label: 'get + put', sub: 'run 2', value: 34629, valueLabel: '34,629' },
          { label: 'get + put', sub: 'run 3', value: 31283, valueLabel: '31,283' },
          { label: 'merge', sub: 'every run', value: 40000, valueLabel: '40,000', pattern: 'service' },
        ],
      },
    },
    {
      id: 'tools',
      label: 'Single operations that are atomic',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'atomic-int', label: 'AtomicInteger', sub: 'incrementAndGet, compareAndSet', pattern: 'service', icon: 'hash' },
        { id: 'map-ops', label: 'Map methods', sub: 'merge, compute, putIfAbsent', pattern: 'service', icon: 'key' },
        { id: 'queues', label: 'Blocking queues', sub: 'put / take hand-off', pattern: 'service', icon: 'sortarrows' },
      ],
    },
  ],
  edges: [
    { source: 'code', target: 'totals', label: '3 runs' },
    { source: 'totals', target: 'tools' },
  ],
}
