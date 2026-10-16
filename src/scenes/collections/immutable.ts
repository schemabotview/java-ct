import type { Scene } from '@graphlearning/flow'

// §8 — an unmodifiable view, an immutable copy, and the elements neither protects. Real JDK 25.0.2
// output.
export const colImmutable: Scene = {
  id: 'col-immutable',
  title: 'Unmodifiable views, immutable copies and element mutability',
  flow: 'TB',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      filename: 'Immut.java',
      label: `List<String> skus = new ArrayList<>(List.of("A-100", "B-200"));
List<String> view = Collections.unmodifiableList(skus);
List<String> copy = List.copyOf(skus);
skus.add("C-300");`,
    },
    {
      id: 'compare',
      label: 'After skus.add("C-300")',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'source', label: 'skus', sub: '[A-100, B-200, C-300]', pattern: 'storage', icon: 'pencil' },
        { id: 'view', label: 'view', sub: 'sees C-300 · add throws', pattern: 'network', icon: 'search' },
        { id: 'copy', label: 'copy', sub: '[A-100, B-200] · fixed', pattern: 'service', icon: 'lock' },
      ],
    },
    {
      id: 'output',
      kind: 'code',
      filename: 'terminal',
      label: `view [A-100, B-200, C-300]   copy [A-100, B-200]
view.add -> UnsupportedOperationException
List.of(null) -> NullPointerException
List.of(new int[] {1250, 3}) then [1] = 4 -> quantity 4`,
    },
    {
      id: 'when',
      label: 'Which to hand out',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'live', label: 'Live, read-only', sub: 'return an unmodifiable view', pattern: 'network', icon: 'search' },
        { id: 'snapshot', label: 'A snapshot', sub: 'return List.copyOf', pattern: 'service', icon: 'copy' },
      ],
    },
  ],
  edges: [
    { source: 'code', target: 'compare' },
    { source: 'compare', target: 'output', label: 'run' },
    { source: 'output', target: 'when' },
  ],
}
