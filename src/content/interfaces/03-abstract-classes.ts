import type { Section } from '../types'

export const abstractClasses: Section = {
  id: 'abstract-classes',
  title: "Abstract classes and shared implementation",
  scene: 'ifc-abstract',
  focus: 'code',
  slide: `## Abstract classes

An **abstract class** is a partial implementation: it holds shared state and code, and leaves named steps for subclasses to supply.

### The template on the left
- \`apply\` is **final**: the check-then-subtract algorithm cannot be bypassed
- \`discountCents\` is **abstract**: each subclass decides only that step
- 10 % of 3750 gives 3375; a fixed 500 gives 3250
- Subclasses see the step; callers see only \`apply\`

### The shared guard pays off
- A 5000 discount on 3750 fails **once**, in the base class
- An abstract class **cannot be instantiated** — javac refuses

### Interface or abstract class?
- Interface: a capability many unrelated classes can offer
- Abstract class: shared code and state for one family`,
  narration:
    "An interface states what must be done. An abstract class goes further and does part of the work. Discount owns the algorithm for applying any discount: compute the amount off, check it is sensible, subtract it. That method is final, so no subclass can skip the check. The one step that varies, how much to take off, is declared abstract, and each subclass supplies only that. Ten percent of thirty-seven fifty leaves thirty-three seventy-five; a fixed five pounds leaves thirty-two fifty. Now try a fixed discount larger than the price. The guard in the base class catches it, once, for every kind of discount that will ever exist, and throws with the bad value in the message. Because Discount is incomplete, you cannot create one directly, and the compiler says so. When should you choose which? Reach for an interface when you are describing a capability that many unrelated classes might offer. Reach for an abstract class when one family of classes genuinely shares code and state.",
}
