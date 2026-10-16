import type { Section } from '../types'

export const functionalInterfaces: Section = {
  id: 'functional-interfaces',
  title: "Functional interfaces, lambda expressions and target types",
  scene: 'str-functional',
  focus: 'shapes',
  slide: `## Lambdas need a target

A **lambda** is a compact implementation of an interface with exactly **one** abstract method — a **functional interface**.

### Target typing
- The same text \`l -> l.unitCents() * l.quantity()\` becomes a \`PricingPolicy\` or a \`ToIntFunction\`
- The **variable's type** decides which interface the lambda implements
- Parameter types are inferred from that interface

### The standard shapes
- \`Function\` T → R, \`Predicate\` T → boolean
- \`Supplier\` () → T, \`Consumer\` T → nothing
- Predicates compose: \`negate\`, \`and\`, \`or\`

### Exactly one method
- Two abstract methods: javac reports **not a functional interface**
- \`@FunctionalInterface\` asks javac to check that for you`,
  narration:
    "A lambda expression is a short way to write an implementation of an interface that has exactly one abstract method. Such an interface is called a functional interface, and our PricingPolicy from chapter four already is one. The important idea is the target type. A lambda on its own has no type. The very same text, multiply the unit price by the quantity, becomes a PricingPolicy in one line and a ToIntFunction in the next, because the type of the variable it is assigned to decides which interface it implements. The compiler then infers the parameter types from that interface, which is why we never wrote LineItem inside the lambda. The java dot util dot function package supplies the common shapes: a Function turns a T into an R, a Predicate answers yes or no, a Supplier produces a value from nothing, and a Consumer takes a value and returns nothing. Predicates even compose with negate, and, and or. And if an interface has two abstract methods, a lambda cannot implement it, and javac says so.",
}
