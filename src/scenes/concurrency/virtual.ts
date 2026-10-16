import type { Scene } from '@graphlearning/flow'

// §7 — the same two workloads on platform and virtual threads. Real JDK 25.0.2 timings on a 4-core
// container (second of two runs); waiting work scales with virtual threads, CPU work does not.
export const ccVirtual: Scene = {
  id: 'cc-virtual',
  title: 'Virtual threads, blocking workloads and platform threads',
  flow: 'TB',
  nodes: [
    {
      id: 'waiting',
      kind: 'evolution',
      label: '10,000 tasks that each wait 100 ms',
      evolution: {
        unit: 'wall-clock ms',
        stages: [
          { label: '200 platform threads', sub: 'fixed pool', value: 5059, valueLabel: '5,059 ms' },
          { label: 'virtual threads', sub: 'one per task', value: 160, valueLabel: '160 ms', pattern: 'service' },
        ],
      },
    },
    {
      id: 'contrast',
      label: 'Computation is different',
      pattern: 'group',
      flow: 'LR',
      children: [
        {
          id: 'cpu',
          kind: 'table',
          label: '64 CPU-bound tasks on 4 cores',
          headers: ['executor', 'wall clock'],
          values: [
            ['4 platform threads', '459 ms'],
            ['virtual threads', '487 ms — no faster'],
          ],
        },
        {
          id: 'model',
          label: 'Why',
          pattern: 'group',
          cols: 2,
          children: [
            { id: 'unmount', label: 'Blocking unmounts', sub: 'its carrier runs others', pattern: 'service', icon: 'share' },
            { id: 'cores', label: 'Cores are cores', sub: 'computation still needs a CPU', pattern: 'warn', icon: 'cpu' },
          ],
        },
      ],
      edges: [{ source: 'cpu', target: 'model', label: 'why' }],
    },
  ],
  edges: [
    { source: 'waiting', target: 'contrast', label: 'but' },
  ],
}
