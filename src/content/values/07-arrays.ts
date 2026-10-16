import type { Section } from '../types'

export const arrays: Section = {
  id: 'arrays',
  title: "Arrays, indexing, iteration and multidimensional structures",
  scene: 'val-arrays',
  focus: 'shared',
  slide: `## Arrays are objects

An array is a **fixed-length object** of same-typed elements, indexed from \`0\`. A variable of array type holds a **reference** to it.

### Assignment is not copying
- \`alias = quantities\` copies the reference — **one** array, two names
- \`alias[0] = 99\` is visible through \`quantities\` too
- \`clone()\` makes a **new** array with the same elements

### Defaults and printing
- \`new int[3]\` is \`[0, 0, 0]\`; \`new String[2]\` is \`[null, null]\`
- Printing an array shows a type and hash, like \`[I@3c87521\`
- \`Arrays.toString\` shows the elements

### Multidimensional
- \`int[][]\` is an array **of arrays** — rows can differ in length
- Three order lines of price and quantity sum to \`9449\``,
  narration:
    "An array holds a fixed number of values of one type, numbered from zero. The important detail is that an array is an object, and a variable of array type holds a reference to it. So when we write alias equals quantities, nothing is copied except that reference. There is still one array, now reachable through two names. Change element zero through alias, and quantities sees ninety-nine as well, because it is the same object. If you want an independent copy, ask for one: clone creates a new array with the same elements, and changing the copy leaves the original alone. New arrays start filled with defaults, zeros for numbers and null for references. Printing an array directly is rarely useful; you get a type code and a hash, so use Arrays dot toString to see the elements. A two-dimensional array is really an array of arrays, one per row. Here, three order lines each hold a price and a quantity, and walking them gives a total of ninety-four forty-nine.",
}
