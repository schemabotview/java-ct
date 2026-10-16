import type { Scene } from '@graphlearning/flow'

// §6 — the classic microbenchmark mistake: when the result is never used, the JIT removes the work.
// Real JDK 25.0.2 output, 200,000,000 calls per round.
export const jvmMeasurement: Scene = {
  id: 'jvm-measurement',
  title: 'Measurement, profiling, warm-up and benchmark pitfalls',
  flow: 'TB',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      filename: 'Naive.java — two loops, same arithmetic',
      label: `for (int i = 0; i < n; i++)
    lineCents(1250 + (i & 7), 3 + (i & 3), i % 20);        // result unused

long s = 0;
for (int i = 0; i < n; i++)
    s += lineCents(1250 + (i & 7), 3 + (i & 3), i % 20);   // result used
sink = s;`,
    },
    {
      id: 'rounds',
      kind: 'table',
      label: '200,000,000 calls',
      headers: ['round', 'result discarded', 'result used'],
      values: [
        ['1', '3 ms', '537 ms'],
        ['2', '1 ms', '518 ms'],
        ['3', '0 ms', '484 ms'],
      ],
    },
    {
      id: 'method',
      label: 'A measurement you can trust — in this order',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'symptom', label: '1 · Symptom', sub: 'what is slow, measured', pattern: 'user', icon: 'gauge' },
        { id: 'hypothesis', label: '2 · Hypothesis', sub: 'one suspected cause', pattern: 'network', icon: 'brain' },
        { id: 'change', label: '3 · One change', sub: 'small, reversible', pattern: 'service', icon: 'wrench' },
        { id: 'remeasure', label: '4 · Re-measure', sub: 'same conditions', pattern: 'service', icon: 'repeat' },
      ],
    },
  ],
  edges: [
    { source: 'code', target: 'rounds', label: '3 rounds' },
    { source: 'rounds', target: 'method' },
  ],
}
