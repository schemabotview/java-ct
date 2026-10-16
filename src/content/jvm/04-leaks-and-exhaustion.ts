import type { Section } from '../types'

export const leaksAndExhaustion: Section = {
  id: 'leaks-and-exhaustion',
  title: "Retained objects, memory leaks and resource exhaustion",
  scene: 'jvm-leaks',
  focus: 'root',
  slide: `## A leak is a reference you forgot

Java collects **unreachable** objects. A Java memory leak is objects that are **still reachable** but no longer useful.

### The retained cache
- A \`static\` map is reachable for the JVM's lifetime
- Keyed by request id, it gains one 10 KB entry per request
- Under 64 MiB: about **6,000** requests, then \`OutOfMemoryError\`

### Finding it
- \`jcmd <pid> GC.class_histogram\` counts live objects by class
- **201 MB** of \`byte[]\`, and exactly **20,001** \`Leak$Quote\`s
- Count matching requests is the clue: something keeps every one

### Fixing it
- Bound the cache: \`removeEldestEntry\` above 1,000
- Same workload: 20,000 requests, size 1,000, **done**`,
  narration:
    "Java's garbage collector reclaims objects that are no longer reachable. So a Java memory leak is not memory the program forgot to free; it is objects that are still reachable, through some chain of references, but are no longer useful. Here, a static map serves as a cache. Static fields are reachable for as long as the class is loaded, which is effectively forever. The cache is keyed by request id, and since every request has a new id, every request adds a ten kilobyte entry and nothing is ever removed. With a sixty-four mebibyte heap, it survives about six thousand requests and then fails with an OutOfMemoryError. Finding the culprit starts with a class histogram from jcmd. Two hundred megabytes are in byte arrays, and there are exactly twenty thousand and one Quote objects, one per request so far. When a count tracks the number of requests, something is keeping every one. The fix is to bound the cache, here a LinkedHashMap that drops its eldest entry beyond a thousand. The same workload then finishes.",
}
