import type { Section } from '../types'

export const constructorsAndInvariants: Section = {
  id: 'constructors-and-invariants',
  title: "Constructors, validation and invariants",
  scene: 'obj-invariants',
  focus: 'rules',
  slide: `## Constructors guard invariants

An **invariant** is a rule that holds for every object of a class, for its whole life. The constructor is the first place to enforce it.

### Check at the boundary
- The constructor is the **only door** into a new LineItem
- Reject bad input there: quantity \`0\`, a negative price, a missing sku
- \`Objects.requireNonNull\` fails fast with a named argument

### What rejection looks like
- \`IllegalArgumentException\` with the bad value in its message
- \`<init>\` in the stack trace is the constructor
- No object is created — **nothing invalid can escape**

### Why here, not later
- Every method can then **trust** the fields without re-checking
- \`final\` fields keep a valid object valid`,
  narration:
    "An invariant is a rule that must be true of every object of a class, for as long as it exists. For a LineItem we choose three: the quantity is at least one, the price is never negative, and there is always a sku. The constructor is the only way to create a LineItem, so it is the natural place to check. If the quantity is zero, we throw an IllegalArgumentException and include the bad value in the message, because a future reader of a log will need it. Requiring a non-null sku with Objects dot requireNonNull fails immediately and names the argument. Look at the stack trace at the bottom. The frame marked init is the constructor itself, and the line below it is the caller that passed zero. Most importantly, when the constructor throws, no object comes into existence at all. Nothing invalid escapes. That pays off everywhere else: every method can trust the fields without checking them again, and marking the fields final keeps a valid object valid.",
}
