import type { Section } from '../types'

export const stringsAndEquality: Section = {
  id: 'strings-and-equality',
  title: "Strings, text blocks, identity and content equality",
  scene: 'val-strings',
  focus: 'built',
  slide: `## Identity versus content

\`==\` on references asks **"the same object?"** \`equals\` asks **"the same characters?"** For strings you almost always mean the second.

### What the diagram shows
- **a** and **b** share one pooled literal — the same object
- **c** is built at run time: a different object with the same text
- So \`a == c\` is **false** while \`a.equals(c)\` is **true**

### Why it bites
- Tests that only use literals pass by luck; real input fails
- Strings are **immutable** — every operation returns a new string
- Put the literal first: \`"A-100".equals(input)\` never throws on null

### Text blocks
- Three quotes open a multi-line string with indentation stripped
- The receipt keeps its two lines and its inner indent`,
  narration:
    "Here is one of the most common bugs in early Java code. The double-equals operator, applied to two references, asks whether they point at the same object. It does not look at the contents. Variables a and b were both written as the same literal, and the JVM shares one copy of each literal, so they really are the same object, and double-equals says true. Variable c holds the same characters, but they were assembled while the program ran, so it is a separate object. Double-equals now says false, while the equals method, which compares characters, says true. Code that compares strings with double-equals often passes every test that uses literals, then fails the moment real input arrives from a file or a user. So for content, always use equals. Strings are also immutable; every operation hands back a new string rather than changing the old one. And for multi-line text, a text block, opened with three quotes, keeps the layout readable and strips the common indentation for you.",
}
