import type { Scene } from '@graphlearning/flow'

// §7 — an array is an object; assigning it copies the reference, `clone()` copies the elements.
// Printed values are real JDK 25.0.2 output (`[I@…` differs on every run).
export const valArrays: Scene = {
  id: 'val-arrays',
  title: 'Arrays, aliases and copies',
  flow: 'TB',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      filename: 'Arrays1.java',
      label: `int[] quantities = {3, 1, 2};
int[] alias = quantities;      // same array
alias[0] = 99;
int[] copy = quantities.clone(); // new array
copy[0] = 3;
// quantities [99, 1, 2]   copy [3, 1, 2]
// new int[3] → [0, 0, 0]  new String[2] → [null, null]
// println(quantities) → [I@3c87521`,
    },
    {
      id: 'heap',
      label: 'Two references, one array — and a copy',
      pattern: 'group',
      flow: 'LR',
      children: [
        {
          id: 'refs',
          label: 'Variables',
          pattern: 'group',
          flow: 'TB',
          children: [
            { id: 'quantities', label: 'quantities', sub: 'int[] reference', pattern: 'user', icon: 'link' },
            { id: 'alias', label: 'alias', sub: 'int[] reference', pattern: 'user', icon: 'link' },
            { id: 'copy', label: 'copy', sub: 'int[] reference', pattern: 'user', icon: 'link' },
          ],
        },
        {
          id: 'arrays',
          label: 'Array objects',
          pattern: 'group',
          flow: 'TB',
          children: [
            {
              id: 'shared',
              kind: 'memory',
              label: 'int[3] — shared',
              slots: [
                { at: '[0]', name: '99' },
                { at: '[1]', name: '1' },
                { at: '[2]', name: '2' },
              ],
            },
            {
              id: 'cloned',
              kind: 'memory',
              label: 'int[3] — clone',
              slots: [
                { at: '[0]', name: '3' },
                { at: '[1]', name: '1' },
                { at: '[2]', name: '2' },
              ],
            },
          ],
        },
      ],
      edges: [
        { source: 'quantities', target: 'shared' },
        { source: 'alias', target: 'shared' },
        { source: 'copy', target: 'cloned' },
      ],
    },
  ],
  edges: [{ source: 'code', target: 'heap' }],
}
