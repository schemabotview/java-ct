import type { Scene } from '@graphlearning/flow'

// §8 — the order application's whole lifecycle in one picture, each box labelled with the course
// that built it. A synthesis frame: every number on it appeared earlier, from a real run.
export const jvmReview: Scene = {
  id: 'jvm-review',
  title: 'Integrated application review and continued specialisation',
  flow: 'TB',
  nodes: [
    {
      id: 'inputs',
      label: 'Boundaries in',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'csv', label: 'CSV import', sub: 'charset, validation · 5, 8', pattern: 'external', icon: 'file' },
        { id: 'http-in', label: 'Price service', sub: 'timeouts, retries · 11', pattern: 'external', icon: 'globe' },
        { id: 'config', label: 'Configuration', sub: 'resources, -D · 9', pattern: 'external', icon: 'wrench' },
      ],
    },
    {
      id: 'core',
      label: 'Domain core — no I/O',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'model', label: 'Order, LineItem', sub: 'invariants, records · 3', pattern: 'service', icon: 'receipt' },
        { id: 'policy', label: 'PricingPolicy', sub: 'interfaces, sealed · 4', pattern: 'service', icon: 'tag' },
        { id: 'totals', label: 'Totals', sub: 'collections, streams · 6, 7', pattern: 'service', icon: 'sigma' },
      ],
    },
    {
      id: 'outputs',
      label: 'Boundaries out',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'db', label: 'Database', sub: 'transactions · 11', pattern: 'storage', icon: 'database' },
        { id: 'files-out', label: 'Export file', sub: 'atomic replace · 8', pattern: 'storage', icon: 'harddrive' },
        { id: 'workers', label: 'Worker threads', sub: 'bounded, cancellable · 10', pattern: 'network', icon: 'gears' },
      ],
    },
    {
      id: 'evidence',
      label: 'Evidence around all of it',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'tests', label: 'Tests', sub: 'unit and integration · 5, 11', pattern: 'user', icon: 'circlecheck' },
        { id: 'build', label: 'Build', sub: 'pinned, repeatable · 9', pattern: 'user', icon: 'package' },
        { id: 'runtime', label: 'Runtime', sub: 'GC logs, JFR, dumps · 12', pattern: 'user', icon: 'gauge' },
      ],
    },
  ],
  edges: [
    { source: 'inputs', target: 'core', label: 'parsed into' },
    { source: 'core', target: 'outputs', label: 'persisted, processed' },
    { source: 'outputs', target: 'evidence', label: 'observed by' },
  ],
}
