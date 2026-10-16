import type { Scene } from '@graphlearning/flow'

// §3 — a lazy pipeline traced with peek: nothing runs until the terminal operation, elements flow one
// at a time, and findFirst stops before D-400. Real JDK 25.0.2 output.
export const strPipelines: Scene = {
  id: 'str-pipelines',
  title: 'Stream sources, operations and laziness',
  flow: 'TB',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      filename: 'Lazy.java',
      label: `Stream<Integer> pipeline = lines.stream()          // source
    .peek(l -> IO.println("  see    " + l.sku()))
    .filter(l -> l.quantity() > 0)                 // intermediate
    .map(l -> l.unitCents() * l.quantity());       // intermediate
IO.println("pipeline built - nothing printed yet");
pipeline.filter(c -> c < 2000).findFirst();        // terminal
pipeline.count();                                  // again?`,
    },
    {
      id: 'run',
      label: 'Pulled by the terminal operation',
      pattern: 'group',
      flow: 'LR',
      children: [
        {
          id: 'stages',
          label: 'One element at a time, only when pulled',
          pattern: 'group',
          flow: 'TB',
          children: [
            { id: 'source', label: 'Source', sub: 'A, B, C, D', pattern: 'storage', icon: 'database' },
            { id: 'filter', label: 'filter', sub: 'quantity > 0', pattern: 'service', icon: 'funnel' },
            { id: 'map', label: 'map', sub: 'to cents', pattern: 'service', icon: 'share' },
            { id: 'terminal', label: 'findFirst', sub: 'pulls, then stops', pattern: 'user', icon: 'power' },
          ],
          edges: [
            { source: 'source', target: 'filter' },
            { source: 'filter', target: 'map' },
            { source: 'map', target: 'terminal' },
          ],
        },
        {
          id: 'output',
          kind: 'code',
          filename: 'terminal',
          label: `pipeline built - nothing printed yet
  see    A-100          3750: not < 2000
  see    B-200          quantity 0: filtered out
  see    C-300          1990: found — D-400 never seen
first under 2000: 1990
stream has already been operated upon or closed`,
        },
      ],
      edges: [{ source: 'stages', target: 'output', label: 'prints' }],
    },
  ],
  edges: [{ source: 'code', target: 'run' }],
}
