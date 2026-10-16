import type { Section } from '../types'

export const toolRoles: Section = {
  id: 'tool-roles',
  title: 'JShell, terminal, editor and IDE',
  scene: 'fp-tool-roles',
  focus: 'jshell',
  slide: `## Choosing where to type

Four surfaces, **one JDK** underneath. The choice is about the size of the question, not about what Java is.

### Match the tool to the job
- **JShell** — a single expression and its value, with no file and no class
- **Terminal** — the JDK tools exactly as a build server runs them
- **Editor** — source files you keep, version and share
- **IDE** — editing, building, testing and debugging in one window

### JShell as a calculator for Java
- \`total / 100\` gives \`42\` — **integer division** drops the remainder
- \`total % 100\` gives \`49\` — the cents that were dropped

### Habits worth keeping
- JShell **forgets** on exit — keep anything that matters in a source file
- Know the terminal command behind every IDE button`,
  narration:
    "You will meet four places to write and run Java, and it is worth being clear that they are tools around the same JDK, not different kinds of Java. JShell is the quickest. You type one expression and it shows you the value, with no file and no class needed. On the left, we compute the total, then divide by one hundred and get forty-two, not forty-two point four nine, because dividing one integer by another throws the remainder away. The remainder operator gets the forty-nine cents back. That is a small surprise worth finding in JShell rather than in a finished program. The terminal runs javac and java exactly as an automated build would. An editor is where source files live so you can keep and share them. And an IDE bundles editing, building, testing and debugging into one window. Use whichever fits the question, but keep one habit: for every button you press in an IDE, know the terminal command it stands for.",
}
