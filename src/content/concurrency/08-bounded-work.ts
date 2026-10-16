import type { Section } from '../types'

export const boundedWork: Section = {
  id: 'bounded-work',
  title: "Bounded work, backpressure, connection limits and overload",
  scene: 'cc-bounded',
  focus: 'gate',
  slide: `## Bound what you send downstream

Cheap threads make it easy to send **more work than a dependency can take**. Limits belong at the scarce resource.

### Unbounded
- 1,000 virtual threads call the payment service at once
- Peak concurrency **1,000** — a real service would time out or fail

### Semaphore
- \`acquire\` before the call, \`release\` in \`finally\`
- Peak concurrency **10**; the rest wait their turn

### Bounded queue
- 2 threads and a queue of 10 accept **12** tasks
- \`AbortPolicy\` **rejects** the other 88 immediately
- Rejecting early is **backpressure**: the caller can retry or shed load

### Size limits from the dependency's capacity, not from guesses`,
  narration:
    "Virtual threads remove the cost of waiting, which removes a natural brake. If each request starts a call to a payment service, a thousand requests produce a thousand simultaneous calls, and the measured peak here is exactly that. A real payment service, or a database with a connection limit, would slow down, time out or start failing, and the failures would spread back upstream. The fix is to put the limit where the scarcity is. A Semaphore with ten permits makes each caller acquire a permit before the call and release it in a finally block. The peak drops to ten, and the other callers simply wait their turn. A bounded executor takes a different approach. Two threads and a queue of ten can hold twelve tasks. With the abort policy, the remaining eighty-eight submissions are rejected immediately instead of piling up in memory. Rejecting early is backpressure: it tells the caller now, while it can still retry, slow down or shed load. Choose the numbers from the dependency's real capacity.",
}
