import type { Section } from '../types'

export const unitTests: Section = {
  id: 'unit-tests',
  title: "Unit tests, boundary cases, test doubles and expected behaviour",
  scene: 'fail-tests',
  focus: 'red',
  slide: `## Tests as evidence

A **unit test** runs a small piece of code with chosen input and checks the result against a **stated expectation**.

### What these tests cover
- The worked example: 1250 × 3 + 499 = **4249**
- A boundary case: an empty order costs only shipping
- A failure case: quantity \`0\` must throw
- \`flat\` is a **fake** policy — the test controls the order's dependency

### Reading a red result
- Surefire names the test, the line and **expected vs actual**
- Here the code's 6047 is right — the **test's** 5948 was miscalculated
- A failure means the two disagree; investigate before "fixing" either

### The limit
- Passing tests prove the covered cases, not every case`,
  narration:
    "A unit test is a small program that runs a piece of your code with chosen input and compares the result against an expectation written down in advance. These tests use JUnit Jupiter, run by Maven's surefire plugin. The first checks our worked example, forty-two forty-nine. The second checks a boundary, an empty order, which should cost only the shipping. The third checks a failure case: a zero quantity must throw. Notice the pricing policy. Instead of the real one, the test supplies a tiny fake, so the test controls the order's dependency and checks only the order's own arithmetic. All three pass. Then someone adds a check for a second line and the build goes red. The report is precise: which test, which line, expected fifty-nine forty-eight, but was sixty forty-seven. Work it by hand and you find the code is right; the test's expectation was miscalculated. A failing test tells you two things disagree, not which one is wrong. And passing tests only prove the cases they cover.",
}
