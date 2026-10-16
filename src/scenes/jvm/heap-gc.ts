import type { Scene } from '@graphlearning/flow'

// §3 — two million short-lived orders under a 64 MiB heap: G1 young collections reclaim almost
// everything each time. Real -Xlog:gc output from JDK 25.0.2 (G1 is the default collector here).
export const jvmHeapGc: Scene = {
  id: 'jvm-heap-gc',
  title: 'Heap, stacks, garbage collection and allocation models',
  flow: 'TB',
  nodes: [
    {
      id: 'memory',
      label: 'Where things live',
      pattern: 'group',
      cols: 2,
      children: [
        {
          id: 'stack',
          kind: 'memory',
          label: 'Thread stack — one per thread',
          slots: [
            { at: 'main', name: 'total, order', note: 'locals, references' },
            { at: 'lineCents', name: 'base', note: 'gone on return' },
          ],
        },
        {
          id: 'heap',
          label: 'Heap — shared, collected',
          pattern: 'group',
          cols: 1,
          children: [
            { id: 'young', label: 'Young regions', sub: 'new objects; most die here', pattern: 'service', icon: 'zap' },
            { id: 'old', label: 'Old regions', sub: 'survivors are promoted', pattern: 'storage', icon: 'database' },
          ],
        },
      ],
    },
    {
      id: 'code',
      kind: 'code',
      filename: 'Garbage.java',
      label: `for (int order = 0; order < 2_000_000; order++) {
    List<LineItem> lines = List.of(
        new LineItem("A-" + (order % 100), 1250, 3),
        new LineItem("B-200", 899, 2));
    for (LineItem l : lines) total += (long) l.unitCents() * l.quantity();
}                                   // each list is garbage one iteration later`,
    },
    {
      id: 'log',
      kind: 'code',
      filename: 'java -Xmx64m -Xlog:gc Garbage — decorations trimmed',
      label: `0.007s  Using G1
0.100s  GC(0) Pause Young (Normal) (G1 Evacuation Pause)
              29M->1M(64M) 1.855ms
0.110s  GC(1) Pause Young  30M->1M(64M) 1.389ms
0.125s  GC(2) Pause Young  38M->1M(64M) 1.362ms
0.135s  GC(3) Pause Young  38M->1M(64M) 1.184ms
total 11096000000`,
    },
  ],
  edges: [
    { source: 'memory', target: 'code' },
    { source: 'code', target: 'log', label: 'run' },
  ],
}
