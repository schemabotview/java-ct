import type { Scene } from '@graphlearning/flow'

// §5 — structural change during iteration, the supported alternative, and views that write through
// to their backing collection. Real JDK 25.0.2 output.
export const colViews: Scene = {
  id: 'col-views',
  title: 'Iteration, mutation, views and fail-fast limits',
  flow: 'TB',
  nodes: [
    {
      id: 'cme',
      kind: 'code',
      filename: 'remove while iterating',
      label: `List<Integer> qty = [3, 0, 2, 0, 1];
for (Integer q : qty) if (q == 0) qty.remove(q);
// ConcurrentModificationException

qty.removeIf(q -> q == 0);          // [3, 2, 1]`,
    },
    {
      id: 'views',
      label: 'Views share storage with their source',
      pattern: 'group',
      flow: 'LR',
      children: [
        {
          id: 'backing',
          kind: 'memory',
          label: 'qty — the ArrayList',
          slots: [
            { at: '[0]', name: '99', note: 'written via the view' },
            { at: '[1]', name: '2' },
            { at: '[2]', name: '1' },
          ],
        },
        { id: 'sublist', label: 'qty.subList(0, 2)', sub: 'a window, not a copy', pattern: 'network', icon: 'search' },
      ],
      edges: [{ source: 'sublist', target: 'backing', label: 'set(0, 99)' }],
    },
    {
      id: 'map-view',
      kind: 'code',
      filename: 'map views write through too',
      label: `Map<String, Integer> stock = {A-100=5, B-200=0};
stock.values().removeIf(n -> n == 0);   // {A-100=5}`,
    },
  ],
  edges: [
    { source: 'cme', target: 'views' },
    { source: 'views', target: 'map-view' },
  ],
}
