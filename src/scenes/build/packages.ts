import type { Scene } from '@graphlearning/flow'

// §1 — the order app split into three packages with one dependency direction, and javac enforcing
// package-private access. Real JDK 25.0.2 output.
export const bldPackages: Scene = {
  id: 'bld-packages',
  title: 'Packages, imports, visibility and dependency direction',
  flow: 'TB',
  nodes: [
    {
      id: 'graph',
      label: 'Dependencies point one way — towards the domain',
      pattern: 'group',
      flow: 'TB',
      children: [
        { id: 'app', label: 'shop.app', sub: 'App: wiring, config, main', pattern: 'user', icon: 'power' },
        { id: 'io', label: 'shop.io', sub: 'CsvOrders: input formats', pattern: 'network', icon: 'file' },
        {
          id: 'domain',
          label: 'shop.domain — knows nothing about I/O',
          pattern: 'group',
          cols: 3,
          children: [
            { id: 'lineitem', label: 'LineItem', sub: 'public record', pattern: 'service', icon: 'tag' },
            { id: 'order', label: 'Order', sub: 'public class', pattern: 'service', icon: 'receipt' },
            { id: 'totals', label: 'Totals', sub: 'package-private', pattern: 'warn', icon: 'lock' },
          ],
        },
      ],
      edges: [
        { source: 'app', target: 'io', label: 'imports' },
        { source: 'io', target: 'domain', label: 'imports' },
      ],
    },
    {
      id: 'error',
      kind: 'code',
      filename: 'from shop.io, reaching into shop.domain',
      label: `int x = shop.domain.Totals.sum(java.util.List.of());
// error: Totals is not public in shop.domain;
//        cannot be accessed from outside package`,
    },
  ],
  edges: [{ source: 'graph', target: 'error', label: 'javac enforces' }],
}
