import type { Section } from '../types'

export const recordsAndImmutability: Section = {
  id: 'records-and-immutability',
  title: "Records, final references and shallow versus deep immutability",
  scene: 'obj-records',
  focus: 'shared-list',
  slide: `## Records and immutability

A **record** is a concise class for data: final fields, a constructor, accessors, \`equals\`, \`hashCode\` and \`toString\`, all generated.

### final is shallow
- A record's fields cannot be **reassigned**
- Records suit **values** compared by content, like a LineItem
- But \`order\` stores the caller's \`ArrayList\` — a later \`add\` shows up inside it

### Defensive copy
- The compact constructor replaces \`skus\` with \`List.copyOf(skus)\`
- \`safe\` keeps \`[A-100]\`, and its list rejects \`add\` outright
- Copy on the way **in**: no caller keeps a handle

### The limit
- \`List.copyOf\` freezes the **list**, not the elements
- A list of \`StringBuilder\`s can still change: \`[gift wrap]\``,
  narration:
    "A record is Java's concise way to declare a class that is mostly data. From one line, the compiler generates final fields, a constructor, accessor methods, and sensible equals, hash code and to-string methods. It is tempting to read final as unchangeable, but final only means the field cannot be pointed somewhere else. Our first Order record stores the very list the caller passed in. When the caller adds B two hundred afterwards, the order sees it, because they share one mutable list. The fix is a defensive copy. In the compact constructor, SafeOrder replaces the incoming list with List dot copyOf, an unmodifiable copy. The caller's later add has no effect, and trying to add through the accessor throws an unsupported operation exception. There is still a limit. Copying a list freezes the list itself, not the objects inside it. A list holding a mutable string builder still lets that builder change. Deep immutability needs immutable elements all the way down.",
}
