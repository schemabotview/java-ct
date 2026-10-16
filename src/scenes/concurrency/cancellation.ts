import type { Scene } from '@graphlearning/flow'

// §6 — a timeout on waiting, cancellation by interruption, and a task that never checks for it.
// Real JDK 25.0.2 output.
export const ccCancellation: Scene = {
  id: 'cc-cancellation',
  title: 'Cancellation, interruption, deadlines and timeouts',
  flow: 'TB',
  nodes: [
    {
      id: 'timeline',
      kind: 'memory',
      label: 'One 5-second task, cancelled at 300 ms',
      slots: [
        { at: '0 ms', name: 'submit', note: 'Thread.sleep(5_000)' },
        { at: '300 ms', name: 'get(300 ms) times out', note: 'task still running' },
        { at: '300 ms', name: 'cancel(true)', note: 'interrupts the worker' },
        { at: '300 ms', name: 'sleep throws', note: 'InterruptedException' },
        { at: 'then', name: 'task cleans up', note: 'and ends early' },
      ],
    },
    {
      id: 'output',
      kind: 'code',
      filename: 'Cancel.java',
      label: `get(300 ms): TimeoutException - the task is still running
  cooperative task: interrupted, cleaning up
cancel(true): true, isCancelled true

cancel(true): true                 // a busy loop that never checks
  stubborn task: finished its full second anyway`,
    },
    {
      id: 'rules',
      label: 'Cancellation is a request',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'check', label: 'Check it', sub: 'blocking calls, or isInterrupted', pattern: 'service', icon: 'circlecheck' },
        { id: 'keep', label: 'Keep it', sub: 'rethrow, or re-interrupt', pattern: 'service', icon: 'repeat' },
        { id: 'deadline', label: 'Deadlines', sub: 'bound every wait', pattern: 'network', icon: 'clock' },
      ],
    },
  ],
  edges: [
    { source: 'timeline', target: 'output', label: 'printed' },
    { source: 'output', target: 'rules' },
  ],
}
