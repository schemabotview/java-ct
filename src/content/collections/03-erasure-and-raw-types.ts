import type { Section } from '../types'

export const erasureAndRawTypes: Section = {
  id: 'erasure-and-raw-types',
  title: "Erasure, raw types, unchecked operations and heap pollution",
  scene: 'col-erasure',
  focus: 'timeline',
  slide: `## Erasure and raw types

Generic type arguments exist for the **compiler**. At run time they are **erased**: a \`List<String>\` and a \`List<Integer>\` are both just \`ArrayList\`.

### What erasure means
- \`skus.getClass() == qs.getClass()\` is **true**
- The compiler inserts casts where elements are read
- \`new T()\` and \`instanceof List<String>\` are not possible

### Raw types switch the checks off
- \`List raw = skus\` drops the type argument
- \`raw.add(42)\` succeeds — **heap pollution**
- The failure appears later, at a cast you never wrote: line 10

### Defences
- Never use raw types in new code
- Treat every **unchecked** warning as a bug report
- Compile with \`-Xlint:unchecked\` to see where they are`,
  narration:
    "Generic type arguments are a compile-time feature. When the program runs, they have been erased. A list of strings and a list of integers are both plain ArrayList objects, and comparing their classes gives true. The compiler made up the difference by checking every use and inserting casts at the points where elements are read back. Erasure explains some limits too: you cannot create a new T, or test whether something is an instance of list of String. Now look at what a raw type does. Assigning the list of strings to a variable of plain List, with no type argument, tells the compiler to stop checking. Adding the number forty-two succeeds, with no error, and the size says one, so everything looks fine. The list is now polluted. The failure only arrives two lines later, when a read hits the cast the compiler inserted, and a ClassCastException points at a line that never mentioned an Integer. The defence is simple: avoid raw types, and treat unchecked warnings as bugs.",
}
