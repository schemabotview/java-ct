import type { Section } from '../types'

export const problemToOutput: Section = {
  id: 'problem-to-output',
  title: 'Problems, algorithms, programs and output',
  scene: 'fp-problem-to-output',
  focus: 'algorithm',
  slide: `## From a problem to a result

A **program** is an algorithm written precisely enough for a machine to follow. Its only proof of life is **observable behaviour** — what it prints, writes or sends.

### Four things, not one
- **Problem** — what is known: a price, a quantity, a shipping charge
- **Algorithm** — the steps in plain words, before any Java
- **Program** — those steps in a language the toolchain accepts
- **Output** — the one line you can check against a hand calculation

### Why cents
- Money is held as **integer minor units**: 12.50 becomes \`1250\`
- Integer arithmetic is exact, so 1250 × 3 + 499 is exactly **4249**
- Decimal money and rounding wait until the requirements demand them`,
  narration:
    "Every program in this course starts the same way, with a problem small enough to solve by hand. Here, an order: three items at twelve fifty each, plus four ninety-nine shipping. Before writing any Java, separate four things that beginners tend to blur together. The problem is what you know. The algorithm is the sequence of steps, in plain words: multiply, add, report. The program is those same steps written precisely enough for a machine to follow. And the output is the observable behaviour, the one line you can check. Notice that we hold money as whole cents. Twelve fifty becomes twelve hundred and fifty, and integer arithmetic on cents is exact, so we know in advance the answer must be four thousand two hundred and forty-nine. That expected value matters. A program that prints something is not the same as a program that prints the right thing, and the only way to tell is to have worked out the answer first.",
}
