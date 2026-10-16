import type { Section } from '../types'

export const atomicsAndConcurrentCollections: Section = {
  id: 'atomics-and-concurrent-collections',
  title: "Atomics, concurrent collections and compound operations",
  scene: 'cc-atomics',
  focus: 'code',
  slide: `## Thread-safe parts, unsafe sequences

A \`ConcurrentHashMap\` keeps **each operation** safe. A **sequence** of operations is still a race unless it is done as one step.

### get, then put
- Each call is thread-safe on its own
- Between them, another thread updates the same key
- 40,000 updates counted as **31,283–34,629**

### merge
- Reads, combines and writes in **one atomic step**
- **40,000** on every run
- \`compute\` and \`putIfAbsent\` do the same for other shapes

### The toolbox
- \`AtomicInteger\`, \`AtomicLong\`, \`LongAdder\` for counters
- Concurrent maps and queues for shared structures
- Still a lock when one operation is not enough`,
  narration:
    "It is tempting to think that choosing a thread-safe collection makes the code using it thread-safe. It does not. A ConcurrentHashMap guarantees that each individual operation is safe: no corrupted buckets, no lost entries inside a single put. But counting with get followed by put is a sequence of two operations. Between the get and the put, another thread can update the same key, and its update is then overwritten. Four threads making ten thousand updates each should count forty thousand. The get-then-put version counted between thirty-one and thirty-five thousand, a different shortfall every run, with no error anywhere. merge reads the current value, combines it with the new one and writes the result as one atomic step inside the map, and it counted forty thousand every time. compute and putIfAbsent cover other shapes of the same idea. So the toolbox has three layers: atomic variables for single values, concurrent collections whose own methods do compound updates, and a lock when no single operation is enough.",
}
