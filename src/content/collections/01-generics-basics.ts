import type { Section } from '../types'

export const genericsBasics: Section = {
  id: 'generics-basics',
  title: "Generic classes and methods, type parameters, inference and boxing",
  scene: 'col-generics',
  focus: 'no-casts',
  slide: `## Generic types

A **type parameter** lets one class or method work with many element types while the compiler still checks each use.

### A typed repository
- \`Repository<T>\` stores and finds items of **one** type
- \`Repository<LineItem>\` makes \`T\` mean \`LineItem\` everywhere
- \`find\` returns a \`LineItem\` — **no cast**, no wrong-type surprise

### Inference
- The **diamond** \`new Repository<>()\` takes \`T\` from the variable

### Boxing has a price
- Type arguments must be objects: \`int\` is boxed to \`Integer\`
- \`==\` on boxed values compares **identity** — 128 is not 128
- \`List<Integer>.remove(1)\` removes **index** 1, not the value 1`,
  narration:
    "Before generics, a collection could hold anything, and every read needed a cast that might fail at run time. A type parameter fixes that. Repository of T is written once, and T stands for whatever element type a particular repository holds. Declare a repository of LineItem, and the compiler treats T as LineItem in every method: save only accepts line items, and find returns one, with no cast required. Generic methods work the same way. firstOr declares its own T, and the compiler infers it from the arguments, here as String. The diamond operator lets the compiler infer the type argument for a constructor from the variable it is assigned to. There is one cost to understand. Type arguments must be reference types, so an int becomes a boxed Integer. Comparing boxed values with double-equals compares identity, and because small values are cached, one twenty-seven equals one twenty-seven while one twenty-eight does not. And remove on a list of integers picks the index overload, removing the element at position one.",
}
