import type { Section } from '../types'

export const errorBoundaries: Section = {
  id: 'error-boundaries',
  title: "Validation, domain failures and application error boundaries",
  scene: 'fail-boundaries',
  focus: 'flow',
  slide: `## Failures at the boundary

Bad input is **expected**, not exceptional. Validate it where it enters the program, and turn each failure into information the caller can act on.

### Turn failures into values
- \`parse\` returns \`Parsed\` or \`Rejected\` — a sealed result
- Each rejection carries the **line number** and the **reason**
- The import loop reports and **continues**: 1 imported, 3 rejected

### Catch order matters
- \`NumberFormatException\` **extends** \`IllegalArgumentException\`
- Catch the specific type first, or its message is never seen

### One error boundary per entry point
- Inside: let invariants throw
- At the edge: catch, report clearly, and decide what continues`,
  narration:
    "Some failures are not surprises at all. When people type or upload order lines, some of them will be wrong, and the program should expect that. So validation belongs at the boundary, where input enters, and each failure should become information the caller can act on. Here, parse returns a sealed result: either a parsed line item or a rejection carrying the line number and the reason. The import loop handles both cases. It keeps the good line, reports each bad one with a clear message, and carries on to the next, ending with one imported and three rejected. Notice the order of the catch blocks. NumberFormatException is a subclass of IllegalArgumentException, so it must be caught first. Put the general one first and the specific message is never reached. This leads to a simple structure. Deep inside, invariants are allowed to throw, because a violation there is a bug. At each entry point, a request, a file, a command, one error boundary catches, reports clearly and decides what can continue.",
}
