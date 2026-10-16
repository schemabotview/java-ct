import type { Section } from '../types'

export const capturesAndReferences: Section = {
  id: 'captures-and-references',
  title: "Method references, captured variables and effectively final bindings",
  scene: 'str-captures',
  focus: 'ok',
  slide: `## What a lambda can capture

A lambda can use local variables from the surrounding method, but only if they are **effectively final** — assigned once and never changed.

### The rule
- \`shipping\` assigned twice: javac rejects the capture
- Assigned once: the lambda captures the **value** 499
- The lambda may run later, on another thread — a changing local would be ambiguous

### The loophole that is not one
- \`log\` never changes — it always refers to the same list
- The **list** it refers to changes: \`[priced, priced]\`
- Effectively final reference ≠ immutable object

### Method references
- \`Class::method\` is shorthand for a lambda that only calls a method
- Four forms: static, any instance, this instance, constructor`,
  narration:
    "Lambdas can use variables from the method around them, which is called capturing. There is one rule: a captured local variable must be effectively final, meaning it is assigned exactly once and never changed afterwards. In the first example, shipping is assigned, then reassigned, and then used inside a lambda, and javac rejects it. Why the rule? A lambda can be stored and run later, even on another thread, so if the local kept changing, nobody could say which value the lambda should see. Assign it once and the lambda simply captures the value, adding four ninety-nine to each total. Now look at the log. The variable log never changes; it always refers to the same list. So capturing it is allowed. But the list itself is mutable, and each run of the lambda adds to it. An effectively final reference does not make the object behind it immutable. Finally, when a lambda does nothing but call one method, a method reference says the same thing more directly, in four forms.",
}
