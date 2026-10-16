import type { Section } from '../types'

export const heapAndGc: Section = {
  id: 'heap-and-gc',
  title: "Heap, stacks, garbage collection and allocation models",
  scene: 'jvm-heap-gc',
  focus: 'young',
  slide: `## Most objects die young

Every thread has its own **stack** of frames. Objects live on the shared **heap**, and the **garbage collector** reclaims those no longer reachable.

### The workload
- Two million orders, each a fresh list of two \`LineItem\`s
- Each list is garbage one iteration later
- Heap limited to **64 MiB**

### What the GC log shows
- The collector is **G1**, the default here
- Young collections: **38M → 1M**, about 1–2 ms each
- Almost nothing survives — short-lived objects are cheap
- Size the heap with \`-Xmx\`; choose collectors only with evidence

### Reading GC logs
- Before → after (heap size), and the pause time
- Watch "after" over time: if it keeps rising, objects are being **retained**`,
  narration:
    "Memory in a running Java program is split two ways. Every thread has its own stack, a pile of frames holding local variables and references, and each frame disappears when its method returns. Objects themselves live on the heap, which all threads share, and the garbage collector reclaims objects that are no longer reachable. This program builds two million orders, each a brand-new list of two line items, and each list becomes garbage one loop iteration later. The heap is capped at sixty-four mebibytes. The GC log tells the story. The collector is G1, the default on this machine. Young collections run every few milliseconds, and each one starts with around thirty-eight megabytes in use and ends with about one: almost everything was already dead. Each pause takes one to two milliseconds. That is the generational idea at work: most objects die young, so collecting the young area is cheap. When you read these logs, watch the after figure over time. If it keeps creeping up, something is holding on to objects, which is the next section.",
}
