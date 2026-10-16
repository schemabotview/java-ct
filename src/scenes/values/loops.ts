import type { Scene } from '@graphlearning/flow'

// §6 — a running total traced iteration by iteration, then the off-by-one that walks past the end.
// The trace rows are the program's own printed output on JDK 25.0.2.
export const valLoops: Scene = {
  id: 'val-loops',
  title: 'Loops, termination, break and continue',
  flow: 'TB',
  nodes: [
    {
      id: 'loop',
      kind: 'code',
      filename: 'Loops.java',
      label: `int[] prices = {1250, 899, 2400};
int[] qty    = {3,    0,   1};
int total = 0;
for (int i = 0; i < prices.length; i++) {
    if (qty[i] == 0) continue;   // skip this line
    if (prices[i] < 0) break;    // stop the loop
    total += prices[i] * qty[i];
}`,
    },
    {
      id: 'trace',
      kind: 'table',
      label: 'Trace — one row per iteration',
      headers: ['i', 'qty[i]', 'action', 'total'],
      values: [
        ['0', '3', 'add 1250 × 3', '3750'],
        ['1', '0', 'continue', '3750'],
        ['2', '1', 'add 2400 × 1', '6150'],
        ['3', '—', 'i < 3 is false: exit', '6150'],
      ],
    },
    {
      id: 'off-by-one',
      kind: 'code',
      filename: 'i <= prices.length',
      label: `Exception in thread "main"
  java.lang.ArrayIndexOutOfBoundsException:
  Index 3 out of bounds for length 3`,
    },
  ],
  edges: [
    { source: 'loop', target: 'trace', label: 'run' },
    { source: 'trace', target: 'off-by-one', label: 'one step too far' },
  ],
}
