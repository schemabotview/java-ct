import type { Scene } from '@graphlearning/flow'

// §3 — the server applies the order, answers too late (1 s, slower than the 500 ms timeout), and the client's retry places it again. An
// idempotency key turns the retry into a lookup. Real JDK 25.0.2 output with a 500 ms client
// timeout and a 1 s first response.
export const intRetries: Scene = {
  id: 'int-retries',
  title: 'Deadlines, retries, idempotency and uncertain outcomes',
  flow: 'TB',
  nodes: [
    {
      id: 'timeline',
      kind: 'memory',
      label: 'One POST /orders, seen from both sides',
      slots: [
        { at: '0 ms', name: 'client sends', note: 'timeout 500 ms' },
        { at: 'next', name: 'server applies order 1', note: 'it is placed' },
        { at: '500 ms', name: 'client: HttpTimeoutException', note: 'outcome unknown' },
        { at: '500 ms', name: 'client retries', note: 'same order again' },
        { at: 'next', name: 'server applies order 2', note: 'a duplicate' },
      ],
    },
    {
      id: 'runs',
      kind: 'table',
      label: 'Retrying after a timeout',
      headers: ['retry strategy', 'attempt 2', 'server applied'],
      values: [
        ['naive', 'status 201 created', '[order 1, order 2]'],
        ['Idempotency-Key: 7f3c-17', 'status 200 already applied', '[order 1]'],
      ],
    },
    {
      id: 'rules',
      label: 'Retry safely',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'deadline', label: 'One deadline', sub: 'for the whole operation', pattern: 'network', icon: 'clock' },
        { id: 'idempotent', label: 'Idempotent', sub: 'a repeat changes nothing', pattern: 'service', icon: 'key' },
        { id: 'backoff', label: 'Back off', sub: 'few retries, growing gaps', pattern: 'service', icon: 'history' },
      ],
    },
  ],
  edges: [
    { source: 'timeline', target: 'runs', label: 'measured' },
    { source: 'runs', target: 'rules' },
  ],
}
