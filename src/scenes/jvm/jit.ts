import type { Scene } from '@graphlearning/flow'

// §2 — measured warm-up: 30 batches of 200,000 calls to lineCents, microseconds per batch. Real
// HotSpot / JDK 25.0.2 data on a 4-core container: default mode (interpreter, then JIT tiers) vs
// -Xint (interpreter only). The PrintCompilation lines are HotSpot-specific diagnostic output.
export const jvmJit: Scene = {
  id: 'jvm-jit',
  title: 'Interpretation, JIT compilation and implementation-specific optimisation',
  flow: 'TB',
  nodes: [
    {
      id: 'warmup',
      kind: 'plot',
      label: 'Microseconds per batch of 200,000 calls',
      plot: {
        x: { min: 0, max: 30, step: 5, label: 'batch' },
        y: { min: 0, max: 11000, step: 2000, label: 'µs' },
        axes: 'corner',
        series: [
          { kind: 'line', label: '-Xint: interpreter only', labelAt: [20, 8600], color: 'warn', points: [[1, 7953], [2, 8797], [3, 10497], [4, 7498], [5, 7019], [6, 10211], [7, 7211], [8, 6797], [9, 6865], [10, 6803], [11, 6895], [12, 6829], [13, 6875], [14, 7469], [15, 7046], [16, 6882], [17, 6833], [18, 6957], [19, 6897], [20, 6854], [21, 6829], [22, 7008], [23, 6799], [24, 7885], [25, 7190], [26, 6812], [27, 6870], [28, 7043], [29, 7028], [30, 6902]] },
          { kind: 'line', label: 'default: interpreter, then JIT', labelAt: [20, 2000], color: 'service', points: [[1, 4028], [2, 899], [3, 869], [4, 865], [5, 846], [6, 807], [7, 896], [8, 882], [9, 1079], [10, 547], [11, 522], [12, 549], [13, 494], [14, 536], [15, 493], [16, 552], [17, 495], [18, 861], [19, 515], [20, 591], [21, 581], [22, 494], [23, 517], [24, 494], [25, 509], [26, 506], [27, 532], [28, 555], [29, 494], [30, 551]] },
        ],
      },
    },
    {
      id: 'compile-log',
      kind: 'code',
      filename: 'java -XX:+PrintCompilation  (HotSpot)',
      label: `27   11       3       Warm::lineCents (13 bytes)          // tier 3: C1
27   12       4       Warm::lineCents (13 bytes)          // tier 4: C2
27   11       3       Warm::lineCents (13 bytes)   made not entrant
30   13 %     3       Warm::main @ 34 (141 bytes)         // % = on-stack replacement`,
    },
  ],
  edges: [{ source: 'warmup', target: 'compile-log', label: 'what the JIT did' }],
}
