import type { Section } from '../types'

export const typesAndNull: Section = {
  id: 'types-and-null',
  title: "Primitive types, references and null",
  scene: 'val-types',
  focus: 'frame',
  slide: `## Primitives, references, null

Every Java variable has a **static type**. A primitive variable holds its value; a reference variable holds a way to reach an object.

### Two families
- **Primitives** — \`int\`, \`long\`, \`double\`, \`boolean\`, \`char\` and three more: the value itself
- **References** — \`String\`, arrays, every class: a pointer-like value to an object
- \`null\` is a reference to **no object at all**

### What null costs
- Printing \`null\` is fine — it shows the word \`null\`
- Calling a method through it throws \`NullPointerException\`
- The message names the variable when compiled with debug info (\`javac -g\`); a source launch says \`<local3>\`

### Rule of thumb
- Decide whether "no value" is legal **before** choosing \`null\``,
  narration:
    "Every variable in Java has a type the compiler knows, and that type falls into one of two families. A primitive, such as int, holds the value itself. Our quantity variable contains the number three, and nothing else. A reference, such as a String, holds something different: a way to reach an object that lives elsewhere. The sku variable does not contain the characters A dash one hundred. It refers to a String object that does. And a reference can also hold null, which means it refers to no object at all. Printing null is harmless; you just see the word. But asking a null reference to do something, like report its length, has nothing to act on, so the JVM throws a NullPointerException. Modern Java tells you exactly which variable was null, by name when the class was compiled with debug information. So before you reach for null, decide whether having no value is actually allowed at that point in the program.",
}
