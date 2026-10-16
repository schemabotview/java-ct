import type { Scene } from '@graphlearning/flow'

// §3 — the same order, once with public fields and once with private ones. Both outputs are real
// JDK 25.0.2 runs; the access error needs two files (Order.java, Shop.java), because members of one
// top-level class can see each other's private members.
export const objEncapsulation: Scene = {
  id: 'obj-encapsulation',
  title: 'Encapsulation and access control',
  flow: 'LR',
  nodes: [
    {
      id: 'cases',
      label: 'The same order, two designs',
      pattern: 'group',
      flow: 'TB',
      children: [
        {
          id: 'exposed',
          label: 'Public fields — anyone can break the total',
          pattern: 'group',
          flow: 'TB',
          children: [
            {
              id: 'open-code',
              kind: 'code',
              filename: 'caller',
              label: `open.add(3750);  open.add(499);
open.lineCents.add(1000);   // bypasses add()`,
            },
            {
              id: 'open-out',
              kind: 'code',
              filename: 'terminal',
              label: `[3750, 499, 1000] total=4249   // lines disagree`,
            },
          ],
          edges: [{ source: 'open-code', target: 'open-out' }],
        },
        {
          id: 'hidden',
          label: 'Private fields — only add() can change them',
          pattern: 'group',
          flow: 'TB',
          children: [
            {
              id: 'private-code',
              kind: 'code',
              filename: 'Order.java',
              label: `private final List<Integer> lineCents
        = new ArrayList<>();
private int totalCents;
void add(int cents) { /* check, then update both */ }`,
            },
            {
              id: 'private-err',
              kind: 'code',
              filename: 'javac Order.java Shop.java',
              label: `Shop.java:4: error: totalCents has private access in Order
        order.totalCents = -1;
             ^`,
            },
          ],
          edges: [{ source: 'private-code', target: 'private-err', label: 'from outside' }],
        },
      ],
      edges: [{ source: 'exposed', target: 'hidden', label: 'hide the state' }],
    },
    {
      id: 'levels',
      label: 'Four access levels',
      pattern: 'group',
      cols: 1,
      children: [
        { id: 'private', label: 'private', sub: 'this class', pattern: 'warn', icon: 'lock' },
        { id: 'package', label: '(none)', sub: 'this package', pattern: 'service', icon: 'package' },
        { id: 'protected', label: 'protected', sub: '+ subclasses', pattern: 'service', icon: 'tree' },
        { id: 'public', label: 'public', sub: 'everyone', pattern: 'external', icon: 'globe' },
      ],
    },
  ],
  edges: [{ source: 'cases', target: 'levels', label: 'choose a level' }],
}
