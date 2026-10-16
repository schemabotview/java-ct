import type { Section } from '../types'

export const checkedAndUnchecked: Section = {
  id: 'checked-and-unchecked',
  title: "Checked and unchecked exceptions and caller responsibilities",
  scene: 'fail-checked',
  focus: 'error',
  slide: `## Checked or unchecked?

Java splits exceptions into two kinds, and the compiler **enforces** one of them.

### Checked — part of the signature
- Subclasses of \`Exception\` but not \`RuntimeException\`
- Conditions outside the program's control: a missing file, a closed network
- Every caller must **catch** it or **declare** \`throws\` — javac checks

### Unchecked — not enforced
- \`RuntimeException\` and its subclasses: bad arguments, null, broken invariants
- Usually a **bug** to fix rather than a condition to handle
- \`Error\` is unchecked too

### The rule on the left
- \`Files.readString\` declares \`IOException\`
- \`load\` neither catches nor declares it — **compile error**`,
  narration:
    "Java divides exceptions into two families, and the compiler treats them differently. Checked exceptions describe conditions outside the program's control, like a file that is not there or a network connection that drops. They are part of a method's signature. Files dot readString declares that it may throw an IOException, and so every caller has a decision to make: catch it and do something sensible, or declare it with throws and pass the decision upward. Our load method does neither, and javac refuses to compile it, naming the exception and both options. Unchecked exceptions are RuntimeException and its subclasses: an illegal argument, a null reference, an index out of bounds. These usually signal a bug in the calling code, so the compiler does not force every caller to mention them. Errors, like a stack overflow, are unchecked as well. The practical rule follows from the purpose. If a caller can reasonably recover, a checked exception makes that duty visible. If the only fix is to correct the code, unchecked is the honest choice.",
}
