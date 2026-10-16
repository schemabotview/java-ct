import type { Scene } from '@graphlearning/flow'

// §8 — the same failure mid-write, once straight into orders.csv and once into a temp file that is
// moved into place only on success. Real JDK 25.0.2 output.
export const bndAtomic: Scene = {
  id: 'bnd-atomic',
  title: 'Closure, partial writes, atomic replacement and recovery',
  flow: 'TB',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      filename: 'Atomic.java',
      label: `static void writeAtomic(Path target, List<String> rows)
        throws IOException {
    Path tmp = Files.createTempFile(
        target.toAbsolutePath().getParent(), "orders", ".tmp");
    try {
        writeDirect(tmp, rows);              // may fail part-way
        Files.move(tmp, target, ATOMIC_MOVE, REPLACE_EXISTING);
    } finally {
        Files.deleteIfExists(tmp);
    }
}`,
    },
    {
      id: 'outcomes',
      kind: 'table',
      label: 'orders.csv after a failure on the third row',
      headers: ['strategy', 'orders.csv afterwards'],
      values: [
        ['before', '[17,A-100,3, 18,B-200,2, 19,C-300,10]'],
        ['write directly', '[20,A-100,1, 21,B-200,1]   — half new, old lost'],
        ['temp + move', '[17,A-100,3, 18,B-200,2, 19,C-300,10]   — intact'],
      ],
    },
    {
      id: 'limits',
      label: 'What the move does and does not promise',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'whole', label: 'All or nothing', sub: 'readers see old or new', pattern: 'service', icon: 'circlecheck' },
        { id: 'same-fs', label: 'Same filesystem', sub: 'else ATOMIC_MOVE fails', pattern: 'warn', icon: 'harddrive' },
        { id: 'durable', label: 'Not durability', sub: 'a crash may need fsync', pattern: 'warn', icon: 'power' },
      ],
    },
  ],
  edges: [
    { source: 'code', target: 'outcomes', label: 'fail on row 3' },
    { source: 'outcomes', target: 'limits' },
  ],
}
