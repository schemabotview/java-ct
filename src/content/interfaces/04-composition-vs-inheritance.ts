import type { Section } from '../types'

export const compositionVsInheritance: Section = {
  id: 'composition-vs-inheritance',
  title: "Composition versus inheritance and substitutability",
  scene: 'ifc-comp-inherit',
  focus: 'sub-count',
  slide: `## Prefer composition

Inheriting from a class ties you to its **implementation**, not just its contract. Wrapping it ties you only to what it promises.

### The subclass that counts wrong
- \`CountingSet\` counts in both \`add\` and \`addAll\`
- \`HashSet.addAll\` happens to call \`add\` for each element
- Three SKUs counted **six** times, with no error
- It broke because of code it **did not write**

### The wrapper that counts right
- \`CountingSetWrapper\` **has** a private set and delegates to it
- It relies only on what \`Set\` documents: **3**
- Swap in another \`Set\` and nothing else changes

### Substitutability
- A subclass must keep every promise of its parent
- If "is a" is doubtful, use "has a"
- A parent built for extension **documents** its hooks`,
  narration:
    "Inheritance is powerful, and it is easy to reach for too early. Here we want a set that counts how many elements were added. The first attempt extends HashSet and overrides both add and addAll to increment a counter. It compiles, it runs, and when we add three SKUs it reports six. Nothing threw an exception; the number is simply wrong. The reason is an implementation detail of the parent: HashSet's addAll works by calling add for each element, so every element is counted twice. The subclass depended on how HashSet is written, not just on what it promises, and that kind of hidden coupling can break whenever the parent changes. The second version uses composition. It holds a private set and forwards calls to it, so its own counting is never re-entered. It reports three. A related rule is substitutability: anywhere code expects the parent, the subclass must keep every promise the parent made. When you are not sure that has-a should really be is-a, choose has-a.",
}
