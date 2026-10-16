import type { Section } from '../types'

export const deadlinesAndRetries: Section = {
  id: 'deadlines-and-retries',
  title: "Deadlines, retries, idempotency and uncertain outcomes",
  scene: 'int-retries',
  focus: 'timeline',
  slide: `## A timeout is not a "no"

When a request times out, the client knows only that **it stopped waiting**. The server may have finished the work anyway.

### What happened
- The server placed the order, then answered after 1 s
- The client gave up at 500 ms: \`HttpTimeoutException\`
- A naive retry placed it **again**: two orders, one customer

### Idempotency
- The client sends an **Idempotency-Key** with every attempt
- The server remembers keys it has applied
- The retry gets **already applied**: one order

### Deadlines and back-off
- Budget the **whole operation**, not each attempt separately
- Retry a few times, with growing gaps — only when the call is idempotent`,
  narration:
    "Here is the most important idea in this course. When a request times out, the client knows exactly one thing: it stopped waiting. It does not know whether the server failed, is still working, or finished successfully a moment too late. In this run, the server placed the order straight away and then took a full second to reply. The client's timeout was half a second, so it gave up, assumed failure, and retried. The server placed the order again. One customer, two orders, and a second charge. Retrying is only safe when repeating the request cannot change the result, a property called idempotency. GET requests usually have it. Placing an order does not, unless you design it in. The fix here is an idempotency key: the client generates one key for this order and sends it with every attempt, and the server remembers the keys it has applied. The retry now gets already applied, and there is one order. Finally, budget time for the whole operation, retry only a few times with growing gaps, and only when the call is idempotent.",
}
