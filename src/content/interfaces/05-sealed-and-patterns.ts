import type { Section } from '../types'

export const sealedAndPatterns: Section = {
  id: 'sealed-and-patterns',
  title: "Sealed hierarchies, instanceof patterns and pattern-based switch",
  scene: 'ifc-sealed',
  focus: 'code',
  slide: `## Sealed types and patterns

A **sealed** interface lists every permitted implementation. A **pattern switch** over it can then be checked for completeness by the compiler.

### Closed set of outcomes
- A payment is \`Approved\`, \`Declined\` or \`Pending\` — nothing else
- Each case is a record carrying only what it needs

### Exhaustive switch
- \`case Approved a\` tests the type **and** binds a variable
- \`when\` adds a guard; more specific cases come first
- No \`default\`: remove a case and javac reports it is **not covered**

### Patterns elsewhere
- \`o instanceof Approved(String code)\` deconstructs a record
- A \`null\` selector throws unless the switch has \`case null\``,
  narration:
    "Some results have a fixed set of shapes. A payment attempt is approved, declined or pending, and nothing else. A sealed interface says exactly that: it names its permitted implementations, and no other class may implement it. Each outcome is a small record carrying just its own data, an authorisation code, a reason, a retry delay. Now a switch can match on the type itself. Case approved a checks the type and, if it matches, binds the variable a, already cast, ready to use. A when clause adds a guard, so a declined payment for insufficient funds gets its own message, and because cases are tried in order, the specific one comes before the general one. There is no default, and that is deliberate. Delete the pending case, and the compiler reports that the switch does not cover all possible inputs. The same patterns work with instanceof, including taking a record apart into its components. One caution: a null selector throws a NullPointerException unless the switch explicitly handles case null.",
}
