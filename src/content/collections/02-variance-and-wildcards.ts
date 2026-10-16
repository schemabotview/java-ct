import type { Section } from '../types'

export const varianceAndWildcards: Section = {
  id: 'variance-and-wildcards',
  title: "Invariance, bounds, wildcards and producer/consumer reasoning",
  scene: 'col-variance',
  focus: 'invariant',
  slide: `## Why List<String> is not a List<Object>

Generic types are **invariant**: a \`List<String>\` is not a \`List<Object>\`, even though a \`String\` is an \`Object\`.

### The invalid insertion
- If the assignment were allowed, \`things.add(42)\` would compile
- A list promised to hold only strings would then hold an \`Integer\`
- javac stops it at the assignment: **incompatible types**

### Wildcards recover flexibility safely
- \`? extends Number\` — a **producer**: read values out as \`Number\`
- \`? super Integer\` — a **consumer**: write \`Integer\` values in
- **PECS**: producer \`extends\`, consumer \`super\`

### On the left
- \`sum\` accepts \`List<Integer>\` and \`List<Long>\`
- \`addShipping\` accepts \`List<Integer>\` and \`List<Number>\``,
  narration:
    "A string is an object, so it seems natural that a list of strings should be usable as a list of objects. Java says no, and the reason is worth working through. Suppose the assignment were allowed. A list of objects accepts any object, so adding the number forty-two would compile. But it is the very same list that someone else holds as a list of strings, and the next time they read from it, they would get an Integer. So generic types are invariant, and javac rejects the assignment. Wildcards recover the flexibility in a safe way. A parameter of type list of question-mark extends Number is a producer: you can read Numbers out of it, so sum accepts a list of integers or a list of longs, but you cannot add to it. A list of question-mark super Integer is a consumer: you can write Integers into it, so addShipping accepts a list of integers or a list of numbers. The rule of thumb is producer extends, consumer super.",
}
