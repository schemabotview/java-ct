import type { Section } from '../types'

export const immutableStructures: Section = {
  id: 'immutable-structures',
  title: "Unmodifiable and immutable structures, copies and element mutability",
  scene: 'col-immutable',
  focus: 'view',
  slide: `## Unmodifiable is not immutable

Java offers two ways to stop callers changing a collection, and they promise **different** things.

### Unmodifiable view
- \`Collections.unmodifiableList(skus)\` rejects writes **through it**
- The owner can still change \`skus\` — the view **shows** C-300
- Good for exposing live state read-only

### Immutable copy
- \`List.copyOf\` and \`List.of\` take a snapshot nobody can change
- Later changes to \`skus\` do not appear: still 2 items
- They reject \`null\` elements outright
- Copying an already immutable list may return the **same** list

### Elements are another matter
- No collection freezes the objects inside it
- An \`int[]\` element can still change: quantity 4`,
  narration:
    "There are two quite different ways to hand out a collection that callers cannot change, and mixing them up causes real bugs. The first is an unmodifiable view. Collections dot unmodifiableList wraps the original list, and any attempt to add through the wrapper throws an unsupported operation exception. But the wrapper is a view. The owner still holds the original list and can keep changing it, and when C three hundred is added, the view shows it. That is exactly right when you want to expose live state read-only. The second is an immutable copy. List dot copyOf, like List dot of, takes a snapshot that nobody can change, and later additions to the source never appear in it. These factory methods also refuse null elements. Neither approach does anything for the elements themselves. A list can be completely unmodifiable and still contain mutable objects, like this array, whose quantity changes to four. Real immutability needs immutable elements as well as an immutable container.",
}
