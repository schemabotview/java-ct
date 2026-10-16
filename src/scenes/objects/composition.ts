import type { Scene } from '@graphlearning/flow'

// §5 — an Order owns its LineItems and delegates each line's arithmetic to the line. 1250 × 3 +
// 899 × 2 + 499 = 6047, printed by a real JDK 25.0.2 run.
export const objComposition: Scene = {
  id: 'obj-composition',
  title: 'Composition and delegation',
  flow: 'TB',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      filename: 'Compose.java',
      label: `class Order {
    private final List<LineItem> lines = new ArrayList<>();
    private final int shippingCents;
    int totalCents() {
        int sum = shippingCents;
        for (LineItem line : lines) sum += line.totalCents();
        return sum;
    }
}`,
    },
    {
      id: 'model',
      label: 'The object graph and what it computes',
      pattern: 'group',
      flow: 'LR',
      children: [
        {
          id: 'graph',
          label: 'An Order has LineItems',
          pattern: 'group',
          flow: 'TB',
          children: [
            { id: 'order', label: 'Order', sub: 'owns the list · shipping 499', pattern: 'service', icon: 'receipt' },
            {
              id: 'lines',
              label: 'lines',
              pattern: 'group',
              cols: 2,
              children: [
                { id: 'line-a', label: 'A-100', sub: '1250 × 3 = 3750', pattern: 'storage', icon: 'tag' },
                { id: 'line-b', label: 'B-200', sub: '899 × 2 = 1798', pattern: 'storage', icon: 'tag' },
              ],
            },
          ],
          edges: [{ source: 'order', target: 'lines', label: 'line.totalCents()' }],
        },
        {
          id: 'sum',
          kind: 'table',
          label: 'order.totalCents()',
          headers: ['part', 'from', 'cents'],
          values: [
            ['shipping', 'Order', '499'],
            ['A-100', 'LineItem', '3750'],
            ['B-200', 'LineItem', '1798'],
            ['total', 'printed', '6047'],
          ],
        },
      ],
      edges: [{ source: 'graph', target: 'sum', label: 'run' }],
    },
  ],
  edges: [{ source: 'code', target: 'model' }],
}
