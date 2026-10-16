import type { Section } from '../types'

export const nestedClasses: Section = {
  id: 'nested-classes',
  title: "Nested, local and anonymous classes",
  scene: 'ifc-nested',
  focus: 'inner',
  slide: `## Classes inside classes

Java lets a class be declared **inside** another class, a method, or an expression. Each form differs in what it can see.

### Four forms
- **Static nested** — grouped under its outer class, but independent
- **Inner** — every instance holds a hidden reference to an outer object
- **Local** — declared in a block, visible only there
- **Anonymous** — declared and instantiated in one expression

### What javac writes
- Every form is a real class: \`Order$Line\`, \`Order$Numbered\`
- Unnamed ones get numbers: \`Order$1\`, \`Order$1Pair\`

### Choosing
- Default to **static nested**; an inner class keeps its outer object alive`,
  narration:
    "Not every class needs its own file. Java lets you declare classes inside other classes, inside methods, and even inside a single expression. A static nested class, like Order dot Line, is grouped under Order for organisation, but it is otherwise independent and needs no Order to exist. An inner class, declared without static, is different: every instance carries a hidden reference to the Order that created it. That is why the code writes order dot new Numbered, and why each Numbered can read and advance that order's line counter. A local class or record lives inside a method and is visible only there. And an anonymous class is declared and instantiated in one go, here a comparator used once. Look at what the compiler wrote out. Each form became a real class file with its own binary name, numbered when it has no name of its own. As a default, choose static nested. An inner class's hidden reference keeps its outer object reachable, which can quietly hold memory you expected to be freed.",
}
