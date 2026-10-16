import type { Section } from '../types'

export const methodsAndRecursion: Section = {
  id: 'methods-and-recursion',
  title: "Methods, parameters, return values, overloading and recursion",
  scene: 'val-methods',
  focus: 'mutate-frame',
  slide: `## Java passes values

Each call gets a **new frame** whose parameters are **copies** of the arguments. For a reference, the copy is the reference value.

### Three calls, three outcomes
- \`addOne(q)\` changes its own copy — \`q\` stays \`3\`
- \`rebind(qs)\` points its copy elsewhere — \`qs\` is untouched
- \`mutate(qs)\` follows the shared reference — the array **does** change

### Signatures
- A method declares parameter types and a **return type**
- **Overloading**: same name, different parameter types — \`lineTotal(int, int)\` and \`lineTotal(long, int)\`

### Bounded recursion
- A method may call itself on a **smaller** problem
- The **base case** stops it: \`sumFrom\` returns \`0\` at the end
- Each call adds a stack frame, so depth is **bounded**`,
  narration:
    "When you call a method, Java creates a fresh frame for it and copies each argument into a parameter. That is the whole rule, and it explains three results that often surprise people. addOne receives a copy of the number three and increments its copy; the caller's q is still three. rebind receives a copy of the array reference and then points its copy at a brand-new array; the caller's variable never moves. mutate also receives a copy of the reference, but instead of moving it, it follows it to the shared array and changes element zero. That change is visible to main, because both frames refer to the same object. So Java does not pass variables by reference; it passes values, and some of those values are references. Methods can share a name when their parameter types differ, which is called overloading. And a method can call itself on a smaller version of the problem. Recursion is only safe with a base case, here the end of the array, that eventually stops the calls.",
}
