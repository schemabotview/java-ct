import type { Scene } from '@graphlearning/flow'

// §7 — a side effect from a parallel stream into an unsynchronised ArrayList loses elements; a
// collector does not. Real JDK 25.0.2 output on a 4-core container — the lost counts differ per run.
export const strParallel: Scene = {
  id: 'str-parallel',
  title: 'Side effects, encounter order and parallel streams',
  flow: 'TB',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      filename: 'Par.java',
      label: `List<Integer> shared = new ArrayList<>();
IntStream.range(0, 10_000).parallel().forEach(shared::add);   // side effect

List<Integer> collected =
    IntStream.range(0, 10_000).parallel().boxed().toList();   // collector`,
    },
    {
      id: 'runs',
      kind: 'evolution',
      label: 'Elements that reached the list, of 10,000',
      evolution: {
        unit: 'elements kept',
        stages: [
          { label: 'run 1', sub: 'forEach + add', value: 8314, valueLabel: '8,314' },
          { label: 'run 2', sub: 'forEach + add', value: 6336, valueLabel: '6,336' },
          { label: 'run 3', sub: 'forEach + add', value: 7897, valueLabel: '7,897' },
          { label: 'toList()', sub: 'collector', value: 10000, valueLabel: '10,000', pattern: 'service' },
        ],
      },
    },
    {
      id: 'order',
      kind: 'code',
      filename: 'encounter order',
      label: `range(0, 8).parallel().forEach(a::append)
    // 54237610
range(0, 8).parallel().forEachOrdered(b::append)
    // 01234567`,
    },
  ],
  edges: [
    { source: 'code', target: 'runs', label: 'three runs' },
    { source: 'runs', target: 'order' },
  ],
}
