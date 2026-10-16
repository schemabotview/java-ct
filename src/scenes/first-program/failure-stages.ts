import type { Scene } from '@graphlearning/flow'

// §6 — the three failure stages side by side, each with real JDK 25.0.2 output, then the first
// debugging moves. The wrong-result card is the classic string-concatenation slip: `+` after a
// String concatenates left to right, so 3750 and 499 are glued, not added.
export const failureStages: Scene = {
  id: 'fp-failure-stages',
  title: 'Where it went wrong',
  flow: 'TB',
  nodes: [
    {
      id: 'stages',
      label: 'Three stages, three kinds of failure',
      pattern: 'group',
      flow: 'TB',
      children: [
        {
          id: 'compile-error',
          kind: 'code',
          filename: '1 · compile time — javac refuses',
          label: `Order.java:2: error: ';' expected
    int totalCents = 1250 * 3 + 499
                                   ^
1 error`,
        },
        {
          id: 'runtime-error',
          kind: 'code',
          filename: '2 · run time — the JVM throws',
          label: `$ java OrderTotal.java three
Exception in thread "main"
  java.lang.NumberFormatException:
  For input string: "three"
    at OrderTotal.main(OrderTotal.java:3)`,
        },
        {
          id: 'wrong-result',
          kind: 'code',
          filename: '3 · wrong result — runs, prints nonsense',
          label: `IO.println("Total: " + itemsCents + shippingCents);

Total: 3750499          // expected 4249`,
        },
      ],
    },
    {
      id: 'first-steps',
      kind: 'list',
      framed: true,
      label: 'First debugging steps',
      items: [
        'read the first error, file and line',
        'reproduce with the smallest input',
        'compare against a worked expected value',
        'change one thing, then re-run',
      ],
    },
  ],
  edges: [{ source: 'stages', target: 'first-steps' }],
}
