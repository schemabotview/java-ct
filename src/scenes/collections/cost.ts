import type { Scene } from '@graphlearning/flow'

// §7 — cost shown as work counted, not time measured: equals/compareTo calls to find the last of
// 10,000 SKUs. Real JDK 25.0.2 counts; they depend on n and on the hash spread, not on the machine.
export const colCost: Scene = {
  id: 'col-cost',
  title: 'Ordering guarantees, complexity and workload trade-offs',
  flow: 'TB',
  nodes: [
    {
      id: 'counts',
      kind: 'evolution',
      label: 'Comparisons to find 1 SKU among 10,000',
      evolution: {
        unit: 'equals / compareTo calls',
        stages: [
          { label: 'ArrayList', sub: 'contains', at: 'O(n)', value: 10000, valueLabel: '10,000', items: ['scans every element', 'keeps insertion order'] },
          { label: 'TreeSet', sub: 'contains', at: 'O(log n)', value: 24, valueLabel: '24', items: ['walks a balanced tree', 'keeps sorted order'] },
          { label: 'HashSet', sub: 'contains', at: 'O(1) average', value: 1, valueLabel: '1', items: ['jumps to one bucket', 'no order at all'], pattern: 'service' },
        ],
      },
    },
    {
      id: 'tradeoffs',
      label: 'The fastest lookup is not always the right choice',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'small', label: 'Small n', sub: 'a list is often simplest', pattern: 'service', icon: 'table' },
        { id: 'order', label: 'Need order?', sub: 'tree or linked variant', pattern: 'service', icon: 'sortarrows' },
        { id: 'measure', label: 'Measure', sub: 'with your real workload', pattern: 'warn', icon: 'gauge' },
      ],
    },
  ],
  edges: [{ source: 'counts', target: 'tradeoffs' }],
}
