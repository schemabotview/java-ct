import type { Section } from '../types'

export const bigdecimalAndRounding: Section = {
  id: 'bigdecimal-and-rounding',
  title: "BigDecimal, currency assumptions, scale and rounding",
  scene: 'bnd-money',
  focus: 'rounding',
  slide: `## When cents are not enough

Integer cents work until requirements bring **fractions of a cent**: tax rates, discounts, currency conversion. Then use **BigDecimal**, and decide every rounding.

### Construct from text
- \`new BigDecimal(0.1)\` captures the double's binary error exactly
- \`new BigDecimal("0.1")\` is exactly one tenth
- 12.50 × 3 + 4.99 = **42.49**, scale 2 — and back to 4249 cents

### Rounding is a business rule
- 2.125 becomes 2.13 with HALF_UP, 2.12 with HALF_EVEN or DOWN
- Which mode, at which step, is a **requirement** to write down

### Two traps
- 10 ÷ 3 has no exact decimal — pass a scale and a mode
- \`equals\` compares scale too: 2.0 ≠ 2.00; use \`compareTo\``,
  narration:
    "Integer cents have served us well, and they remain the right choice while every amount is a whole number of cents. Requirements change that: a tax rate, a percentage discount or a currency conversion produces fractions of a cent, and then BigDecimal is the tool. First, construct it from text. Building a BigDecimal from the double point one faithfully captures the double's binary error, all fifty-odd digits of it. Building it from the string point one gives exactly one tenth. Our familiar order is twelve fifty times three plus four ninety-nine, forty-two forty-nine with a scale of two, and moving the decimal point gives back four thousand two hundred and forty-nine cents. Second, rounding is not a technical detail; it is a business rule. Two point one two five becomes two point one three rounding half up, and two point one two rounding half even or down. Which mode, applied at which step, belongs in the requirements. And two traps: dividing ten by three needs an explicit scale, and equals also compares scale, so use compareTo.",
}
