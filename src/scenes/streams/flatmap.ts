import type { Scene } from '@graphlearning/flow'

// §4 — map keeps one output per input; flatMap splices each order's lines into one stream.
// Real JDK 25.0.2 output.
export const strFlatMap: Scene = {
  id: 'str-flatmap',
  title: 'Filtering, mapping, flattening and short-circuiting',
  flow: 'TB',
  nodes: [
    {
      id: 'orders',
      label: 'Three orders',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'o17', label: 'Order 17', sub: 'A-100 ×3, B-200 ×2', pattern: 'storage', icon: 'receipt' },
        { id: 'o18', label: 'Order 18', sub: 'A-100 ×1, C-300 ×10', pattern: 'storage', icon: 'receipt' },
        { id: 'o19', label: 'Order 19', sub: 'no lines', pattern: 'storage', icon: 'receipt' },
      ],
    },
    {
      id: 'code',
      kind: 'code',
      filename: 'Flat.java',
      label: `orders.stream().map(Order::lines)            // 3 lists
orders.stream().flatMap(o -> o.lines().stream()) // 4 lines

orders.stream()
    .flatMap(o -> o.lines().stream())   // Stream<Order> → Stream<LineItem>
    .map(LineItem::sku)
    .distinct()
    .toList();                          // [A-100, B-200, C-300]

...anyMatch(l -> l.quantity() >= 3)     // true — stops at the first`,
    },
    {
      id: 'ops',
      label: 'The everyday operations',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'op-filter', label: 'filter', sub: 'keep some', pattern: 'service', icon: 'funnel' },
        { id: 'op-map', label: 'map', sub: 'one in, one out', pattern: 'service', icon: 'share' },
        { id: 'op-flat', label: 'flatMap', sub: 'one in, many out', pattern: 'network', icon: 'merge' },
        { id: 'op-distinct', label: 'distinct', sub: 'drop repeats', pattern: 'service', icon: 'fingerprint' },
        { id: 'op-match', label: 'anyMatch', sub: 'stops early', pattern: 'user', icon: 'search' },
        { id: 'op-first', label: 'findFirst', sub: 'stops early', pattern: 'user', icon: 'search' },
      ],
    },
  ],
  edges: [
    { source: 'orders', target: 'code' },
    { source: 'code', target: 'ops' },
  ],
}
