import type { Scene } from '@graphlearning/flow'

// §3 — from integer cents to BigDecimal: construction from text, scale, an explicit rounding
// decision, and equals vs compareTo. Real JDK 25.0.2 output.
export const bndMoney: Scene = {
  id: 'bnd-money',
  title: 'BigDecimal, currency assumptions, scale and rounding',
  flow: 'TB',
  nodes: [
    {
      id: 'construct',
      kind: 'code',
      filename: 'construct from text, not from double',
      label: `new BigDecimal(0.1)
    // 0.1000000000000000055511151231257827021181583404541015625
new BigDecimal("0.1")                      // 0.1

BigDecimal total = new BigDecimal("12.50")
    .multiply(BigDecimal.valueOf(3))
    .add(new BigDecimal("4.99"));          // 42.49, scale 2
total.movePointRight(2).intValueExact();   // 4249 cents again`,
    },
    {
      id: 'rounding',
      kind: 'table',
      label: '2.125 rounded to 2 places — a business decision',
      headers: ['RoundingMode', 'result'],
      values: [
        ['HALF_UP', '2.13'],
        ['HALF_EVEN', '2.12'],
        ['DOWN', '2.12'],
      ],
    },
    {
      id: 'traps',
      kind: 'code',
      filename: 'two traps',
      label: `new BigDecimal("10.00").divide(new BigDecimal("3"))
    // ArithmeticException: Non-terminating decimal expansion
new BigDecimal("10.00").divide(three, 2, HALF_EVEN)   // 3.33

new BigDecimal("2.0").equals(new BigDecimal("2.00"))      // false
new BigDecimal("2.0").compareTo(new BigDecimal("2.00"))   // 0`,
    },
  ],
  edges: [
    { source: 'construct', target: 'rounding', label: 'then round' },
    { source: 'rounding', target: 'traps' },
  ],
}
