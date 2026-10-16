import type { Scene } from '@graphlearning/flow'

// §1 — tasks submitted to a fixed pool, a failure observed through Future.get, the same failure
// printed by the worker when nobody waits, and lost entirely with submit-and-forget. Real
// JDK 25.0.2 output.
export const ccExecutors: Scene = {
  id: 'cc-executors',
  title: 'Tasks, threads, executors and lifecycle ownership',
  flow: 'TB',
  nodes: [
    {
      id: 'model',
      label: 'You submit tasks; the executor owns the threads',
      pattern: 'group',
      flow: 'LR',
      children: [
        { id: 'tasks', label: 'Tasks', sub: 'price(17), price(18), price(19)', pattern: 'user', icon: 'scroll' },
        { id: 'queue', label: 'Work queue', sub: 'waits for a free thread', pattern: 'storage', icon: 'layers' },
        { id: 'workers', label: '2 worker threads', sub: 'reused for every task', pattern: 'service', icon: 'gears' },
      ],
      edges: [
        { source: 'tasks', target: 'queue', label: 'submit' },
        { source: 'queue', target: 'workers' },
      ],
    },
    {
      id: 'code',
      kind: 'code',
      filename: 'Exec.java',
      label: `ExecutorService pool = Executors.newFixedThreadPool(2);
try {
    for (int id : new int[] {17, 18, 19})
        results.add(pool.submit(() -> price(id)));
    for (Future<Integer> f : results)
        try { IO.println("result " + f.get()); }
        catch (ExecutionException e) { IO.println("failed: " + e.getCause()); }
} finally {
    pool.shutdown();                         // the owner ends it
    pool.awaitTermination(5, TimeUnit.SECONDS);
}`,
    },
    {
      id: 'output',
      kind: 'table',
      label: 'Where a task failure ends up',
      headers: ['how it was started', 'what you see'],
      values: [
        ['submit + get()', 'failed: IllegalStateException: no price for order 19'],
        ['execute()', 'stack trace from "pool-1-thread-2" on stderr'],
        ['submit, never get()', 'nothing at all'],
      ],
    },
  ],
  edges: [
    { source: 'model', target: 'code' },
    { source: 'code', target: 'output', label: 'results 1700, 1800, then' },
  ],
}
