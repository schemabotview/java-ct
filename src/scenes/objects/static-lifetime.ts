import type { Scene } from '@graphlearning/flow'

// §4 — one static counter shared by the class, one id per instance, and an object that becomes
// unreachable when its last reference is cleared. Real JDK 25.0.2 output.
export const objStatic: Scene = {
  id: 'obj-static',
  title: 'Instance and static members, lifetime and reachability',
  flow: 'TB',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      filename: 'Static.java',
      label: `class LineItem {
    private static int created = 0;   // one per class
    private final int id;             // one per object
    LineItem() { created++; id = created; }
}
LineItem a = new LineItem();   LineItem b = new LineItem();
a = null;
// 1 2 created=2      a is null, created still 2`,
    },
    {
      id: 'memory',
      label: 'After a = null',
      pattern: 'group',
      flow: 'LR',
      children: [
        {
          id: 'class-data',
          kind: 'memory',
          label: 'LineItem class',
          slots: [{ at: 'created', name: '2', note: 'static: shared' }],
        },
        {
          id: 'locals',
          kind: 'memory',
          label: 'main frame',
          slots: [
            { at: 'a', name: 'null' },
            { at: 'b', name: 'ref →' },
          ],
        },
        {
          id: 'instances',
          label: 'Heap',
          pattern: 'group',
          flow: 'TB',
          children: [
            { id: 'item-one', label: 'LineItem id 1', sub: 'unreachable: eligible for GC', pattern: 'warn', icon: 'trash' },
            { id: 'item-two', label: 'LineItem id 2', sub: 'reachable through b', pattern: 'storage', icon: 'box' },
          ],
        },
      ],
      edges: [{ source: 'locals', target: 'item-two', label: 'b' }],
    },
    {
      id: 'limits',
      kind: 'list',
      framed: true,
      label: 'What garbage collection does not do',
      items: [
        'run at a predictable time',
        'close files, sockets or connections',
        'free objects you still reference',
      ],
    },
  ],
  edges: [
    { source: 'code', target: 'memory' },
    { source: 'memory', target: 'limits' },
  ],
}
