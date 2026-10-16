import type { Section } from '../types'

export const classesAndIdentity: Section = {
  id: 'classes-and-identity',
  title: "Classes, instances, fields, methods and identity",
  scene: 'obj-identity',
  focus: 'obj-one',
  slide: `## Classes and objects

A **class** describes a kind of thing: its fields and its methods. Each \`new\` creates a separate **instance** with its own field values.

### From loose variables to a LineItem
- \`sku\`, \`unitCents\` and \`quantity\` now travel **together**
- \`totalCents()\` lives beside the data it needs
- Callers ask the object instead of repeating the arithmetic

### Identity
- \`first\` and \`second\` hold equal fields but are **two objects**
- \`same = first\` copies a reference — one object, two names
- Changing \`same.quantity\` changes what \`first\` sees: 5000

### The default toString
- \`Identity$LineItem@482cd91f\` — a class name and a hash, not the data`,
  narration:
    "Until now our order lived in loose variables: a price here, a quantity there. A class gathers them into one kind of thing. LineItem declares three fields and a method that uses them, so the arithmetic lives next to the data it needs, and callers simply ask the line for its total. Each time you write new, Java creates a separate object, an instance, with its own copy of those fields. That is why first and second, built with exactly the same values, are still two objects, and double-equals says false. Now look at same. It was assigned from first, which copies only the reference, so there is one object with two names. Change the quantity through same, and first reports five thousand while second still reports thirty-seven fifty. Hold on to that picture of variables pointing at objects; most bugs in this chapter come from forgetting it. And notice what printing an object shows by default: a class name and a hash, not the data you care about.",
}
