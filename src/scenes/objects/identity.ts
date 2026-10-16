import type { Scene } from '@graphlearning/flow'

// §1 — two objects with equal fields are still two objects; a copied reference is the same object.
// Real JDK 25.0.2 output (the `@482cd91f` hash differs on every run).
export const objIdentity: Scene = {
  id: 'obj-identity',
  title: 'Classes, instances and identity',
  flow: 'TB',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      filename: 'Identity.java',
      label: `class LineItem {
    String sku;  int unitCents;  int quantity;
    int totalCents() { return unitCents * quantity; }
}
LineItem first  = new LineItem("A-100", 1250, 3);
LineItem second = new LineItem("A-100", 1250, 3);
LineItem same   = first;
same.quantity = 4;`,
    },
    {
      id: 'heap',
      label: 'Three variables, two LineItem objects',
      pattern: 'group',
      flow: 'LR',
      children: [
        {
          id: 'vars',
          label: 'Variables',
          pattern: 'group',
          flow: 'TB',
          children: [
            { id: 'first', label: 'first', sub: 'LineItem reference', pattern: 'user', icon: 'link' },
            { id: 'same', label: 'same', sub: 'copied from first', pattern: 'user', icon: 'link' },
            { id: 'second', label: 'second', sub: 'LineItem reference', pattern: 'user', icon: 'link' },
          ],
        },
        {
          id: 'objects',
          label: 'Objects',
          pattern: 'group',
          flow: 'TB',
          children: [
            {
              id: 'obj-one',
              kind: 'memory',
              label: 'LineItem #1',
              slots: [
                { at: 'sku', name: '"A-100"' },
                { at: 'unitCents', name: '1250' },
                { at: 'quantity', name: '4', note: 'changed via same' },
              ],
            },
            {
              id: 'obj-two',
              kind: 'memory',
              label: 'LineItem #2',
              slots: [
                { at: 'sku', name: '"A-100"' },
                { at: 'unitCents', name: '1250' },
                { at: 'quantity', name: '3' },
              ],
            },
          ],
        },
      ],
      edges: [
        { source: 'first', target: 'obj-one' },
        { source: 'same', target: 'obj-one' },
        { source: 'second', target: 'obj-two' },
      ],
    },
    {
      id: 'output',
      kind: 'code',
      filename: 'terminal',
      label: `first == second   false     first == same   true
first.totalCents() 5000     second.totalCents() 3750
println(first)     Identity$LineItem@482cd91f`,
    },
  ],
  edges: [
    { source: 'code', target: 'heap' },
    { source: 'heap', target: 'output', label: 'run' },
  ],
}
