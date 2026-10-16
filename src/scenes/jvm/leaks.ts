import type { Scene } from '@graphlearning/flow'

// §4 — a cache keyed by request id that never evicts: every Quote stays reachable, so the collector
// cannot help. Real JDK 25.0.2 output; the histogram is jcmd GC.class_histogram at 20,000 requests
// under -Xmx512m.
export const jvmLeaks: Scene = {
  id: 'jvm-leaks',
  title: 'Retained objects, memory leaks and resource exhaustion',
  flow: 'TB',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      filename: 'Leak.java',
      label: `static final Map<String, Quote> CACHE = new HashMap<>();   // never evicts
static Quote quote(String requestId) {
    return CACHE.computeIfAbsent(requestId,
        id -> new Quote("A-100", 1250, new byte[10_000]));
}
quote("req-" + i);                       // a new key for every request`,
    },
    {
      id: 'graph',
      label: 'Still referenced, so never collected',
      pattern: 'group',
      flow: 'LR',
      children: [
        { id: 'root', label: 'static CACHE', sub: 'a GC root: always reachable', pattern: 'warn', icon: 'key' },
        { id: 'map', label: 'HashMap', sub: 'one entry per request id', pattern: 'storage', icon: 'table' },
        { id: 'quotes', label: '20,001 Quotes', sub: '10 KB payload each', pattern: 'storage', icon: 'boxes' },
      ],
      edges: [
        { source: 'root', target: 'map' },
        { source: 'map', target: 'quotes' },
      ],
    },
    {
      id: 'histo',
      kind: 'table',
      label: 'jcmd <pid> GC.class_histogram — top 5',
      headers: ['#', 'instances', 'bytes', 'class'],
      values: [
        ['1', '48,795', '201,281,632', '[B  (byte arrays)'],
        ['2', '820', '2,288,912', 'jdk.internal.vm.FillerElement[]'],
        ['3', '28,717', '689,208', 'java.lang.String'],
        ['4', '21,013', '672,416', 'java.util.HashMap$Node'],
        ['5', '20,001', '480,024', 'Leak$Quote'],
      ],
    },
    {
      id: 'outcomes',
      kind: 'table',
      label: 'Same workload, -Xmx64m',
      headers: ['cache', 'result'],
      values: [
        ['HashMap, never evicts', 'size 6001 … OutOfMemoryError'],
        ['LinkedHashMap, removeEldestEntry > 1,000', '20,000 requests, size 1000, done'],
      ],
    },
  ],
  edges: [
    { source: 'code', target: 'graph' },
    { source: 'graph', target: 'histo', label: 'evidence' },
    { source: 'histo', target: 'outcomes', label: 'fix: bound it' },
  ],
}
