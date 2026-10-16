import type { Scene } from '@graphlearning/flow'

// §3 — every row is a printed value from Ops.java on JDK 25.0.2. The overflow rows are the point:
// `int` arithmetic wraps silently; `Math.multiplyExact` and a `long` are the two honest answers.
export const valOperators: Scene = {
  id: 'val-operators',
  title: 'Expressions, conversions and overflow',
  flow: 'TB',
  nodes: [
    {
      id: 'results',
      kind: 'table',
      label: 'Expression → printed result',
      headers: ['expression', 'result', 'why'],
      values: [
        ['4249 / 100', '42', 'int ÷ int drops the remainder'],
        ['4249 % 100', '49', 'the remainder'],
        ['4249 / 100.0', '42.49', 'one double widens the other'],
        ['0.1 + 0.2', '0.30000000000000004', 'binary floating point'],
        ['Integer.MAX_VALUE + 1', '-2147483648', 'wraps around, no error'],
        ['1250 * 2_000_000', '-1794967296', 'overflowed int, silently'],
        ['1250L * 2_000_000', '2500000000', 'long arithmetic: fits'],
      ],
    },
    {
      id: 'exact',
      kind: 'code',
      filename: 'Math.multiplyExact(1250, 2_000_000)',
      label: `Exception in thread "main"
  java.lang.ArithmeticException: integer overflow
    at java.base/java.lang.Math.multiplyExact(Math.java:996)`,
    },
    {
      id: 'ranges',
      label: 'Pick the type from the range you need',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'int', label: 'int', sub: '32-bit · about ±2.1 × 10⁹', pattern: 'service', icon: 'hash' },
        { id: 'long', label: 'long', sub: '64-bit · about ±9.2 × 10¹⁸', pattern: 'service', icon: 'hash' },
        { id: 'double', label: 'double', sub: '64-bit binary fraction', pattern: 'warn', icon: 'sigma' },
      ],
    },
  ],
  edges: [
    { source: 'results', target: 'exact', label: 'fail loudly instead' },
    { source: 'exact', target: 'ranges', label: 'or widen' },
  ],
}
