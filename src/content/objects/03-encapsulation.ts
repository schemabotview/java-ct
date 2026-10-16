import type { Section } from '../types'

export const encapsulation: Section = {
  id: 'encapsulation',
  title: "Encapsulation, access control and information hiding",
  scene: 'obj-encapsulation',
  focus: 'private-err',
  slide: `## Encapsulation

Keep fields **private** and change them only through methods. Then the class alone decides what states are possible.

### Public fields break invariants
- Anyone can call \`open.lineCents.add(1000)\` and skip \`add()\`
- The list now says 5249 while \`totalCents\` says 4249
- The bug appears far from the code that caused it

### Private fields protect them
- Outside code can only call \`add()\`, which checks and updates both
- \`javac\` refuses the direct write: **private access**
- The class can later change how it stores data without breaking callers

### Access levels
- \`private\` → class · none → package · \`protected\` → subclasses · \`public\` → all`,
  narration:
    "Encapsulation means a class keeps its fields private and lets the outside world change them only through its own methods. Here is why it matters. In the first version, the list of line amounts and the running total are both public. The add method keeps them in step, but nothing forces callers to use it. One caller appends a thousand straight onto the list, and now the lines add up to fifty-two forty-nine while the total still claims forty-two forty-nine. Worse, that mismatch will surface somewhere else entirely, long after the line that caused it. In the second version both fields are private. The only way in is add, which checks the amount and updates both together. If other code tries to write the total directly, the compiler refuses: total cents has private access. A useful side effect is freedom: because nobody outside depends on how the data is stored, the class can change its representation later without breaking anyone. Java offers four levels, from private, through package and protected, to public.",
}
