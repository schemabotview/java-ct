import type { Scene } from '@graphlearning/flow'

// §5 — totals, grouping and partitioning, then a reduction that breaks the associativity law in
// parallel. Real JDK 25.0.2 output on a 4-core container; the parallel subtraction gave 0 on every
// run tried, but any value other than -500500 is the point.
export const strCollectors: Scene = {
  id: 'str-collectors',
  title: 'Reduction, collectors, grouping and combination laws',
  flow: 'TB',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      filename: 'Reduce.java — 4 lines: A-100 ×3, B-200 ×2, A-100 ×1, C-300 ×10',
      label: `lines.stream().mapToInt(LineItem::cents).sum()             // 8788
lines.stream().map(LineItem::cents).reduce(0, Integer::sum) // 8788
lines.stream().collect(groupingBy(LineItem::sku, TreeMap::new,
                                  summingInt(LineItem::cents)))
    // {A-100=5000, B-200=1798, C-300=1990}
lines.stream().collect(partitioningBy(l -> l.cents() >= 2000,
                                      counting()))
    // {false=3, true=1}`,
    },
    {
      id: 'laws',
      kind: 'table',
      label: '1..1000 reduced from 0',
      headers: ['operation', 'sequential', 'parallel'],
      values: [
        ['(a, b) -> a + b', '500500', '500500'],
        ['(a, b) -> a - b', '-500500', '0'],
      ],
    },
    {
      id: 'rules',
      label: 'What parallel reduction requires',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'assoc', label: 'Associative', sub: '(a+b)+c = a+(b+c)', pattern: 'service', icon: 'merge' },
        { id: 'identity', label: 'True identity', sub: '0 for +, 1 for ×', pattern: 'service', icon: 'hash' },
        { id: 'stateless', label: 'No side effects', sub: 'no shared state', pattern: 'warn', icon: 'ban' },
      ],
    },
  ],
  edges: [
    { source: 'code', target: 'laws', label: 'the law' },
    { source: 'laws', target: 'rules' },
  ],
}
