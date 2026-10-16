import type { Section } from '../types'

export const compositionAndDelegation: Section = {
  id: 'composition-and-delegation',
  title: "Composition, delegation and relationships between objects",
  scene: 'obj-composition',
  focus: 'lines',
  slide: `## Composition and delegation

Build bigger objects from smaller ones. An Order **has** LineItems and **delegates** each line's arithmetic to the line itself.

### Composition
- \`Order\` owns a private list of \`LineItem\`s and a shipping charge
- Each part keeps its **own** invariants; the whole adds its own
- Ownership is explicit: the order creates and controls its list

### Delegation
- \`totalCents()\` asks each line for **its** total, then adds shipping
- Order never repeats \`unitCents * quantity\`
- Change how a line is priced, and Order does not change

### Check it
- 499 + 3750 + 1798 = **6047** — the run agrees`,
  narration:
    "Real models are built from smaller models. An Order is not a pile of numbers; it has line items, and each line item already knows how to compute its own total. That relationship, an object holding others as parts, is composition. The order owns a private list of lines and a shipping charge, and because it controls that list, it can enforce rules about the whole, while each line keeps enforcing its own. The total method shows delegation. Instead of reaching into each line and multiplying the price by the quantity itself, the order asks each line for its total and adds them up, starting from the shipping. The multiplication lives in exactly one place. If line pricing later gains a discount, only LineItem changes. The table on the left is the evidence: four ninety-nine for shipping, thirty-seven fifty for the first line, seventeen ninety-eight for the second, and a printed total of sixty forty-seven. Work the sum by hand before you trust the run.",
}
