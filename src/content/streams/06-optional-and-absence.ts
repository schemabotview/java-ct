import type { Section } from '../types'

export const optionalAndAbsence: Section = {
  id: 'optional-and-absence',
  title: "Optional, absence and API choices",
  scene: 'str-optional',
  focus: 'return-type',
  slide: `## Optional for "maybe absent"

\`Optional<T>\` is a return type that says **"there might be no result"** — and makes the caller deal with it.

### Reading an Optional
- \`findFirst\` returns \`Optional.empty\` when nothing matches
- \`map\` transforms a value if present; \`orElse\` supplies a fallback
- \`orElseThrow\` fails with a clear exception of your choice

### Eager versus lazy defaults
- \`orElse(expensiveDefault())\` **always** builds the default
- \`orElseGet(() -> ...)\` builds it only when needed

### Where it belongs
- Return values where absence is a normal outcome
- Not fields, parameters, or collections — return an **empty list**
- \`get()\` on empty throws: **No value present**`,
  narration:
    "Optional is a container that holds either one value or nothing, and its purpose is to make absence visible in a method's return type. findFirst returns an Optional because a search might find nothing. Here no line has a quantity of ten, so bulk is empty, while pricey holds A-one hundred. You work with an Optional through its methods rather than by unwrapping it. map transforms the value if one is present. orElse supplies a fallback, and orElseThrow fails with an exception you choose. One subtle trap: the argument to orElse is evaluated before orElse is even called, so an expensive default is built every time, even when the value was present. orElseGet takes a supplier and only calls it when needed. Use Optional where absence is a normal, expected outcome of a query, which mostly means return values. It is not meant for fields or parameters, and a method returning a collection should return an empty one instead. Calling get on an empty Optional throws no value present, so prefer the safer methods.",
}
