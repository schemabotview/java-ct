import type { Section } from '../types'

export const tasksAndExecutors: Section = {
  id: 'tasks-and-executors',
  title: "Tasks, threads, executors and lifecycle ownership",
  scene: 'cc-executors',
  focus: 'output',
  slide: `## Executors own the threads

Describe work as **tasks** and hand them to an **executor**, which owns a set of reusable threads. Whoever creates an executor must also **shut it down**.

### Submitting and observing
- \`submit\` returns a \`Future\`; \`get()\` waits for the result
- A task's exception comes back wrapped in \`ExecutionException\`
- Orders 17 and 18 price fine; order 19's failure is **observed**

### Failures nobody looks at
- \`execute\` prints the stack trace from a worker thread
- \`submit\` without \`get()\` loses the failure **entirely**

### Lifecycle
- \`shutdown\` stops accepting work; \`awaitTermination\` waits
- \`try (ExecutorService pool = …)\` closes it for you
- An executor left running can keep the JVM alive`,
  narration:
    "Concurrency in Java usually starts not with threads but with tasks. A task is a piece of work, such as pricing one order. An executor owns a set of threads, takes tasks from a queue and runs them, reusing the same threads again and again. Our pool has two threads and three pricing tasks. Submitting a task returns a Future, a handle for a result that may not exist yet. Calling get waits for it. Orders seventeen and eighteen price normally. Order nineteen throws, and the exception does not vanish: get rethrows it wrapped in an ExecutionException, so the caller sees exactly what went wrong. Now look at the other rows. Started with execute, the same failure is printed by the worker thread to standard error, where nobody may be reading. Submitted and never asked about, it disappears completely. Finally, ownership: whoever creates an executor is responsible for shutting it down and waiting for it to finish. Try-with-resources does both, and an executor that is never shut down can keep the whole JVM running.",
}
