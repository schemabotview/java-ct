import type { Section } from '../types'

export const virtualThreads: Section = {
  id: 'virtual-threads',
  title: "Virtual threads, blocking workloads and platform threads",
  scene: 'cc-virtual',
  focus: 'waiting',
  slide: `## Virtual threads scale waiting

A **virtual thread** is cheap to create and gives up its carrier thread whenever it **blocks**. Thousands can wait at once.

### 10,000 tasks that each wait 100 ms
- 200 platform threads: 50 rounds — about **5 s**
- One virtual thread per task: all wait together — about **0.16 s**
- Blocking code stays simple: no callbacks needed
- The JDK's blocking APIs unmount for you

### 64 CPU-bound tasks on 4 cores
- Platform: 459 ms; virtual: 487 ms — **no faster**
- Computation still needs a core
- Use a pool sized to the cores for CPU work

### Using them well
- One virtual thread per task; do not pool them
- Limit the **scarce resource** they call, not the threads
- Measure with the real workload`,
  narration:
    "Platform threads are mapped one-to-one onto operating system threads, so they are relatively expensive, and pools usually keep a few hundred at most. A virtual thread is managed by the JVM and runs on top of a small number of carrier threads. When it blocks, waiting for a sleep, a network response or a lock, it unmounts and frees its carrier for someone else. Ten thousand tasks that each wait a hundred milliseconds show the difference. A pool of two hundred platform threads has to work through them in fifty rounds of waiting, and takes about five seconds. With a virtual thread per task, all ten thousand wait at the same time, and the whole batch finishes in about a sixth of a second, with ordinary blocking code and no callbacks. Now give the same machine sixty-four tasks of pure computation. Four platform threads take four hundred and fifty-nine milliseconds; virtual threads take slightly longer. Four cores are still four cores. So create one virtual thread per task, do not pool them, and put your limits on the scarce resources they call.",
}
