import type { Section } from '../types'

export const equalsHashcodeTostring: Section = {
  id: 'equals-hashcode-tostring',
  title: "equals, hashCode, toString, aliases and value semantics",
  scene: 'obj-equality',
  focus: 'hash-not-eq',
  slide: `## Identity or value?

By default, \`equals\` means **identity**. Decide whether two objects with the same content should count as the same — then implement it consistently.

### The evidence
- A plain class: equal content, \`equals\` false, the set keeps **both**
- A record: value equality is generated, so the set keeps **one**
- \`"Aa"\` and \`"BB"\` share hash 2112 yet are not equal

### The contract
- Equal objects **must** have equal hash codes
- Equal hash codes **never** prove equality
- Fields used by \`equals\` must not change while in a hash set

### toString is output
- A generated \`toString\` prints **every** field, card numbers included
- Override it to mask secrets and personal data`,
  narration:
    "Two line items for the same product and quantity: are they the same? Java's default answer is no. Unless a class overrides equals, it compares identity, so a plain class with identical content gives false, and a hash set happily stores both copies. A record generates value-based equals and hash code from its fields, so the two records are equal, and the set keeps one. These methods come as a pair, with a contract. Objects that are equal must report the same hash code, or hash-based collections will fail to find them. The reverse does not hold. The strings capital A lower-case a, and double B, both hash to two thousand one hundred and twelve, yet they are different. A matching hash is only a hint. And the fields that equals depends on must not change while the object sits in a hash set, or the set loses track of it. Finally, remember that toString is output. A generated one prints every field, including a card number, so override it to mask anything sensitive.",
}
