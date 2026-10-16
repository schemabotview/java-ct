import type { Section } from '../types'

export const interfacesAndContracts: Section = {
  id: 'interfaces-and-contracts',
  title: "Interfaces, contracts, default methods and implementation choices",
  scene: 'ifc-contracts',
  focus: 'caller',
  slide: `## Interfaces are contracts

An **interface** names what a caller may rely on, without saying how it is done. Code written against it works with **any** implementation.

### The contract
- \`priceCents(LineItem)\` — every policy must provide it
- \`describe()\` is a **default** method: shared code, overridable
- \`total(lines, policy)\` never mentions a concrete class
- Implement **many** interfaces; extend only one class

### Two implementations
- **StandardPricing** — unit × quantity, so 5740
- **BulkDiscount** — 10 % off lines of 10 or more, so 5541
- Swapping one for the other changes **no caller**

### What a contract must say
- Inputs, results, and what happens on bad input — not just the signature`,
  narration:
    "So far, the order computed its total in one fixed way. Real shops need several pricing rules, and the code that adds up a basket should not care which one is in force. An interface expresses exactly that. PricingPolicy declares one obligation, price a line, and says nothing about how. It can also supply a default method, shared behaviour that implementations get for free and may override. Now the total method accepts any PricingPolicy and simply asks it to price each line. Two classes implement the interface. Standard pricing multiplies the unit price by the quantity and gives fifty-seven forty. Bulk discount takes ten percent off any line of ten or more, and gives fifty-five forty-one; integer division rounds the discounted line down, which is itself a decision worth writing down. The caller never changed. That is the payoff of programming against an interface. But remember that a signature is only part of a contract. A good one also states what the inputs mean, what the result means, and what happens when the input is wrong.",
}
