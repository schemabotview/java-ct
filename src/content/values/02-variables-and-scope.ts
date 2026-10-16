import type { Section } from '../types'

export const variablesAndScope: Section = {
  id: 'variables-and-scope',
  title: "Variables, initialisation, scope, final and var",
  scene: 'val-scope',
  focus: 'block',
  slide: `## Variables and scope

A variable is a **name with a type, a value and a scope**. The compiler checks all three before anything runs.

### The rules on the left
- **Scope** — a name exists from its declaration to the end of its block
- **Initialisation** — a local must be assigned before it is read
- **final** — assigned exactly once; a second assignment will not compile
- **var** — the compiler infers the type from the initialiser; it is still fixed

### Reading the two errors
- \`cannot find symbol\` — \`line\` was used outside the block that declared it
- \`cannot assign … final variable\` — the rule held

### Habit
- Declare each variable in the **smallest** scope; javac reports every error in one pass`,
  narration:
    "A variable is more than a name. It has a type, a current value, and a scope, the region of code where the name means anything at all. On the left, the variable called line is declared inside the loop's braces, so it exists only there. When we try to print it after the loop, the compiler cannot find it, and says so. The variable unitCents is marked final, which means it can be assigned once and never again, so the later assignment is rejected too. Notice that javac found both problems in a single pass, and reported them in order, each with its line number. Two more rules are quieter. A local variable must be given a value before it is read, which is why totalCents starts at zero. And var asks the compiler to infer the type from the right-hand side. That saves typing, but the type is still fixed; quantity is an int forever. Keep each variable in the smallest scope that needs it, and many mistakes become impossible to write.",
}
