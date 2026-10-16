import type { Section } from '../types'

export const operatorsAndOverflow: Section = {
  id: 'operators-and-overflow',
  title: "Expressions, operators, conversions and overflow",
  scene: 'val-operators',
  focus: 'results',
  slide: `## Operators and numeric limits

An expression's **type decides its arithmetic**. The same digits give different answers as \`int\`, \`long\` or \`double\`.

### Integer arithmetic
- \`/\` on two ints **truncates**; \`%\` gives the remainder
- One \`double\` operand **widens** the other, so \`4249 / 100.0\` is \`42.49\`
- \`0.1 + 0.2\` is not \`0.3\` — binary floating point cannot hold it exactly

### Overflow is silent
- \`int\` holds about ±2.1 billion; past that it **wraps** to negative
- \`1250 * 2_000_000\` prints \`-1794967296\` with no error at all
- \`1250L * 2_000_000\` uses \`long\` and fits
- \`long\` reaches about ±9.2 × 10¹⁸

### Choosing a defence
- \`Math.multiplyExact\` throws on overflow instead of lying`,
  narration:
    "Java decides how to do arithmetic from the types involved, not from the numbers you had in mind. Divide one int by another and the result is an int, so the remainder is simply thrown away: forty-two. The percent operator recovers it: forty-nine. Make either side a double and the other is widened to match, giving forty-two point four nine. Doubles have their own surprise: point one plus point two is not exactly point three, because binary fractions cannot represent it. That is one reason we keep money in whole cents. Now the dangerous row. An int can only hold values up to about two point one billion. Multiply twelve fifty by two million and the true answer, two and a half billion, does not fit, so the value wraps around and prints a negative number. There is no exception and no warning. Using a long fixes the range. Math dot multiplyExact takes the other approach: it throws an ArithmeticException, so an impossible total fails loudly instead of being stored quietly.",
}
