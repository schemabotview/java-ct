import type { Scene } from '@graphlearning/flow'

// §8 — Java passes values. For an int that is the number; for an array it is the reference value,
// so the callee can mutate the shared array but cannot rebind the caller's variable. Real JDK 25.0.2
// output; the recursion is bounded by the array length.
export const valMethods: Scene = {
  id: 'val-methods',
  title: 'Methods, parameters and recursion',
  flow: 'TB',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      filename: 'Methods.java',
      label: `static void addOne(int n)   { n = n + 1; }
static void rebind(int[] a) { a = new int[] {0, 0, 0}; }
static void mutate(int[] a) { a[0] = 0; }

int q = 3;  int[] qs = {3, 1, 2};
addOne(q);  rebind(qs);   // q 3   qs [3, 1, 2]
mutate(qs);               // qs [0, 1, 2]`,
    },
    {
      id: 'frames',
      label: 'During mutate(qs): two frames, one array',
      pattern: 'group',
      flow: 'LR',
      children: [
        {
          id: 'main-frame',
          kind: 'memory',
          label: 'main frame',
          slots: [
            { at: 'q', name: '3', note: 'copied into addOne' },
            { at: 'qs', name: 'ref →', note: 'value copied into a' },
          ],
        },
        {
          id: 'mutate-frame',
          kind: 'memory',
          label: 'mutate frame',
          slots: [{ at: 'a', name: 'ref →', note: 'same reference value' }],
        },
        { id: 'array', label: 'int[] object', sub: '[0, 1, 2] after a[0] = 0', pattern: 'storage', icon: 'box' },
      ],
      edges: [
        { source: 'main-frame', target: 'mutate-frame', label: 'call' },
        { source: 'mutate-frame', target: 'array', label: 'a[0] = 0' },
      ],
    },
    {
      id: 'recursion',
      kind: 'code',
      filename: 'bounded recursion',
      label: `static int sumFrom(int[] cents, int i) {
    if (i == cents.length) return 0;          // base case
    return cents[i] + sumFrom(cents, i + 1);  // smaller
}
sumFrom({3750, 899, 4800}, 0)   // 9449`,
    },
    {
      id: 'call-stack',
      kind: 'memory',
      label: 'The call stack at its deepest — newest frame on top',
      slots: [
        { at: 'i = 3', name: 'return 0', note: 'base case: stop' },
        { at: 'i = 2', name: '4800 + 0', note: '= 4800' },
        { at: 'i = 1', name: '899 + 4800', note: '= 5699' },
        { at: 'i = 0', name: '3750 + 5699', note: '= 9449' },
      ],
    },
  ],
  edges: [
    { source: 'code', target: 'frames' },
    { source: 'frames', target: 'recursion' },
    { source: 'recursion', target: 'call-stack', label: 'unwinds' },
  ],
}
