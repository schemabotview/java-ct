import type { Section } from '../types'

export const collectionChoices: Section = {
  id: 'collection-choices',
  title: "List, Set, Map, Queue and implementation choices",
  scene: 'col-choices',
  focus: 'results',
  slide: `## Choosing a collection

Pick the **interface** by the question your code asks, then the **implementation** by the guarantees you need.

### The four questions
- **List** — what is at position *i*? Keeps order and duplicates
- **Set** — have I seen this? No duplicates
- **Map** — what goes with this key? One value per key
- **Queue / Deque** — what is next? First in, first out

### Same scans, different answers
- HashSet: **3 unique**, in no promised order
- LinkedHashSet keeps arrival order; TreeSet sorts
- \`TreeMap.merge\` counts each SKU: A-100 = 3
- \`ArrayDeque.poll\` hands back the **oldest** order first

### Declare the interface
- \`List<String> list = new ArrayList<>()\` — the type says what you rely on
- Swap the implementation later without touching callers`,
  narration:
    "The collections library offers many classes, but the first choice is easy if you ask what question your code needs answered. If it asks what is at a position, use a List, which keeps order and allows duplicates. If it asks whether an item has been seen before, use a Set. If it asks what goes with a key, use a Map. And if it asks what should be handled next, use a Queue or a Deque. Then choose an implementation by the guarantees you need. Feed the same five scans into each and the differences are plain. The ArrayList keeps all five, in order. The HashSet keeps three unique SKUs and promises nothing about their order. A LinkedHashSet keeps them in arrival order, and a TreeSet keeps them sorted. A TreeMap with merge counts each SKU, and the ArrayDeque hands back the oldest order first. Declare variables with the interface type, so that the code says what it relies on, and the implementation can change without touching every caller.",
}
