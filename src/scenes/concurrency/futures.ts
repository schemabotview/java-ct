import type { Scene } from '@graphlearning/flow'

// §5 — two independent lookups combined, then a failing one recovered with exceptionally. Real
// JDK 25.0.2 output; 309 ms is max(200, 300) plus overhead, not their sum.
export const ccFutures: Scene = {
  id: 'cc-futures',
  title: 'Futures, CompletableFuture and composing results and failures',
  flow: 'TB',
  nodes: [
    {
      id: 'graph',
      label: 'Run independent work at the same time, then combine',
      pattern: 'group',
      flow: 'LR',
      children: [
        {
          id: 'inputs',
          label: 'supplyAsync',
          pattern: 'group',
          flow: 'TB',
          children: [
            { id: 'price', label: 'priceCents', sub: '200 ms → 3750', pattern: 'service', icon: 'tag' },
            { id: 'stock', label: 'stock', sub: '300 ms → 7', pattern: 'service', icon: 'boxes' },
          ],
        },
        { id: 'combine', label: 'thenCombine', sub: 'waits for both', pattern: 'network', icon: 'merge' },
      ],
      edges: [
        { source: 'price', target: 'combine' },
        { source: 'stock', target: 'combine' },
      ],
    },
    {
      id: 'code',
      kind: 'code',
      filename: 'Cf.java',
      label: `CompletableFuture<String> quote = price.thenCombine(stock,
    (p, s) -> "A-100 x3 = " + p + " cents, " + s + " in stock");
// A-100 x3 = 3750 cents, 7 in stock   (309 ms)

total = price.thenCombine(
            supplyAsync(() -> shippingQuote("MARS")), Integer::sum);
total.exceptionally(e -> -1).join();
// recovered from CompletionException:
//   IllegalStateException: no carrier for MARS
// with fallback: -1
total.join();   // CompletionException caused by IllegalStateException`,
    },
  ],
  edges: [{ source: 'graph', target: 'code', label: 'in code' }],
}
