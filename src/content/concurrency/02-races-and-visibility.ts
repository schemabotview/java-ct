import type { Section } from '../types'

export const racesAndVisibility: Section = {
  id: 'races-and-visibility',
  title: "Races, atomicity, visibility and happens-before",
  scene: 'cc-races',
  focus: 'lost-update',
  slide: `## Two ways sharing goes wrong

When threads share mutable data without coordination, Java guarantees surprisingly little. Two separate failures appear.

### Atomicity: lost updates
- \`plain++\` is **read, add, write** — three steps
- Two threads read 41, both write 42: one increment vanishes
- 4 × 100,000 increments ended at **396,955** — different every run
- \`AtomicInteger\` and \`synchronized\` both give 400,000

### Visibility: stale reads
- The worker spins on a plain \`stop\` flag
- \`main\` sets it — the worker **never sees** the change
- \`volatile\` makes the write visible: the worker stops

### Happens-before
- Only synchronisation actions order one thread's writes before another's reads`,
  narration:
    "When two threads share mutable data without coordination, two quite different things can go wrong. The first is atomicity. Incrementing a counter looks like one operation, but it is three: read the current value, add one, write it back. If two threads both read forty-one before either writes, they both write forty-two, and one increment is lost. Four threads each incrementing a hundred thousand times should reach four hundred thousand. The plain counter ended a few thousand short, by a different amount on every run. An AtomicInteger, or a synchronized method, reached four hundred thousand every time. The second failure is visibility. A worker thread loops until a plain boolean flag becomes true. The main thread sets it after half a second, and two seconds later the worker is still spinning. Without synchronisation, the JVM is allowed to keep using a value it already read. Marking the flag volatile makes the write visible, and the worker stops. The rule behind both is happens-before: only synchronisation actions guarantee that one thread's writes are seen by another.",
}
