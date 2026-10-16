import type { Scene } from '@graphlearning/flow'

// §9 — two threads taking the same two locks in opposite orders, and the jstack output that names
// the cycle. Real JDK 25.0.2 thread dump, addresses shortened.
export const ccDeadlock: Scene = {
  id: 'cc-deadlock',
  title: 'Deadlocks, starvation, liveness and diagnostic timelines',
  flow: 'TB',
  nodes: [
    {
      id: 'cycle',
      label: 'Each thread holds one lock and waits for the other',
      pattern: 'group',
      flow: 'LR',
      children: [
        { id: 'checkout', label: 'checkout', sub: 'holds inventory', pattern: 'user', icon: 'receipt' },
        { id: 'refund', label: 'refund', sub: 'holds payments', pattern: 'user', icon: 'history' },
      ],
      edges: [
        { source: 'checkout', target: 'refund', label: 'waits for payments' },
        { source: 'refund', target: 'checkout', label: 'waits for inventory' },
      ],
    },
    {
      id: 'code',
      kind: 'code',
      filename: 'Deadlock.java',
      label: `Thread checkout = new Thread(() -> {
    synchronized (inventory) { pause();
        synchronized (payments) { ... } }
});
Thread refund = new Thread(() -> {
    synchronized (payments) { pause();
        synchronized (inventory) { ... } }      // opposite order
});`,
    },
    {
      id: 'dump',
      kind: 'code',
      filename: 'jstack <pid>',
      label: `"checkout" #23 ... waiting for monitor entry
   java.lang.Thread.State: BLOCKED (on object monitor)
Found one Java-level deadlock:
=============================
"checkout":
  waiting to lock monitor 0x…2500 (object 0x…e590, a java.lang.Object),
  which is held by "refund"
"refund":
  waiting to lock monitor 0x…1140 (object 0x…e580, a java.lang.Object),
  which is held by "checkout"`,
    },
  ],
  edges: [
    { source: 'cycle', target: 'code', label: 'from' },
    { source: 'code', target: 'dump', label: 'diagnosed by' },
  ],
}
