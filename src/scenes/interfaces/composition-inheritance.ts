import type { Scene } from '@graphlearning/flow'

// §4 — the classic fragile-base-class trap: HashSet.addAll calls add, so a subclass that counts in
// both double-counts. The wrapper delegates and is immune. Real JDK 25.0.2 output.
export const ifcCompInherit: Scene = {
  id: 'ifc-comp-inherit',
  title: 'Composition versus inheritance',
  flow: 'TB',
  nodes: [
    {
      id: 'subclass',
      kind: 'code',
      filename: 'inheritance — extends HashSet',
      label: `class CountingSet<E> extends HashSet<E> {
    int added = 0;
    @Override public boolean add(E e) {
        added++; return super.add(e);
    }
    @Override public boolean addAll(Collection<? extends E> c) {
        added += c.size(); return super.addAll(c);  // calls add()
    }
}`,
    },
    {
      id: 'trace',
      label: 'addAll of 3 SKUs',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'sub-count', label: 'subclass: 6', sub: 'addAll +3, then add +1 ×3', pattern: 'warn', icon: 'ban' },
        { id: 'wrap-count', label: 'wrapper: 3', sub: 'delegates to a private set', pattern: 'service', icon: 'circlecheck' },
      ],
    },
    {
      id: 'wrapper',
      kind: 'code',
      filename: 'composition — has a Set',
      label: `class CountingSetWrapper<E> {
    private final Set<E> inner = new HashSet<>();
    int added = 0;
    boolean addAll(Collection<? extends E> c) {
        added += c.size(); return inner.addAll(c);
    }
}`,
    },
  ],
  edges: [
    { source: 'subclass', target: 'trace', label: 'run' },
    { source: 'trace', target: 'wrapper', label: 'instead' },
  ],
}
