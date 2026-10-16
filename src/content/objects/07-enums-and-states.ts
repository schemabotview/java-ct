import type { Section } from '../types'

export const enumsAndStates: Section = {
  id: 'enums-and-states',
  title: "Enums and explicit domain states",
  scene: 'obj-enums',
  focus: 'paid',
  slide: `## Enums for domain states

An **enum** is a class with a fixed set of named instances. Use it whenever a value must be **one of a known few**.

### Better than strings or ints
- \`Status.PAID\` cannot be misspelled the way \`"Paid"\` can
- \`valueOf("Paid")\` throws — the case mismatch is caught, not stored
- An enum can carry **behaviour**: \`canMoveTo\` lives with the states

### Encode the moves
- NEW → PAID or CANCELLED; PAID → SHIPPED or CANCELLED
- SHIPPED and CANCELLED are **final** — nothing leaves them
- The switch covers every constant, so it needs no \`default\`

### When you add a state
- The compiler flags every switch that no longer covers all constants`,
  narration:
    "An order moves through a handful of states, and the code should make that explicit. An enum is a class with a fixed set of named instances: new, paid, shipped and cancelled, and no others can ever exist. Compare that with storing the status as a string. A string can hold anything, including a typo, and the mistake is only discovered later, if at all. With an enum, asking for a constant called Paid with the wrong capitalisation fails immediately. Enums can also carry behaviour. Here, canMoveTo encodes the diagram at the top: a new order can be paid or cancelled, a paid order can be shipped or cancelled, and shipped and cancelled are final. The switch inside handles every constant, so it needs no default branch, and that is a feature. If someone later adds a returned state, the compiler reports every switch expression that no longer covers all the cases, instead of letting the new state fall silently into a default.",
}
