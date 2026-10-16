import type { Section } from '../types'

export const sideEffectsAndParallel: Section = {
  id: 'side-effects-and-parallel',
  title: "Side effects, encounter order and parallel-stream trade-offs",
  scene: 'str-parallel',
  focus: 'runs',
  slide: `## Parallel streams and side effects

\`.parallel()\` splits the work across threads. It is only correct when the pipeline has **no shared mutable state** and its reductions obey the laws.

### A side effect loses data
- \`forEach(shared::add)\` writes into one \`ArrayList\` from many threads
- Three runs kept 8,314, 6,336 and 7,897 of 10,000 — no exception
- \`toList()\` collects per thread and merges: **10,000**, in order

### Encounter order
- Parallel \`forEach\` runs in whatever order threads reach elements
- \`forEachOrdered\` keeps the source order — at a cost

### When parallel helps
- Large data, CPU-heavy work per element, splittable source
- It does not make small or waiting work faster — measure first`,
  narration:
    "Adding parallel to a stream asks the library to split the work across several threads. That is only safe when the pipeline does not touch shared mutable state. Here, each element is added to one ordinary ArrayList from many threads at once. ArrayList is not built for that. Three runs kept roughly eight thousand three hundred, six thousand three hundred, and seven thousand nine hundred of the ten thousand elements, a different wrong answer each time, and not a single exception. The fix is not to share at all. A collector like toList gives each thread its own container and merges them at the end, so it keeps all ten thousand elements, in the original order. Order is the other casualty of parallelism. A parallel forEach handles elements in whatever order the threads reach them, while forEachOrdered preserves the source order, at some cost. So when does parallel help? With large amounts of data, real computation per element, and a source that splits well. For small inputs or work that mostly waits, it rarely does. Measure before you switch it on.",
}
