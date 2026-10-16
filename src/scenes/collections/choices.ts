import type { Scene } from '@graphlearning/flow'

// §4 — the same five scans in each structure. Every printed line is real JDK 25.0.2 output.
export const colChoices: Scene = {
  id: 'col-choices',
  title: 'List, Set, Map, Queue and implementation choices',
  flow: 'TB',
  nodes: [
    {
      id: 'input',
      kind: 'code',
      filename: 'scanned at the till',
      label: `List.of("A-100", "B-200", "A-100", "C-300", "A-100")`,
    },
    {
      id: 'results',
      kind: 'table',
      label: 'Same input, different contract',
      headers: ['structure', 'result', 'promise'],
      values: [
        ['ArrayList', '[A-100, B-200, A-100, C-300, A-100]', 'order, duplicates'],
        ['HashSet', '3 unique', 'no duplicates, no order'],
        ['LinkedHashSet', '[A-100, B-200, C-300]', 'insertion order'],
        ['TreeSet', '[A-100, B-200, C-300]', 'sorted'],
        ['TreeMap merge', '{A-100=3, B-200=1, C-300=1}', 'key → value, sorted'],
        ['ArrayDeque', 'poll → order 17', 'first in, first out'],
      ],
    },
    {
      id: 'families',
      label: 'Choose the interface by the question you ask',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'list', label: 'List', sub: 'what is at position i?', pattern: 'service', icon: 'table' },
        { id: 'set', label: 'Set', sub: 'have I seen this?', pattern: 'service', icon: 'fingerprint' },
        { id: 'map', label: 'Map', sub: 'what goes with this key?', pattern: 'service', icon: 'key' },
        { id: 'queue', label: 'Queue / Deque', sub: 'what is next?', pattern: 'service', icon: 'sortarrows' },
      ],
    },
  ],
  edges: [
    { source: 'input', target: 'results' },
    { source: 'results', target: 'families' },
  ],
}
