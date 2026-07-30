## Virtual threads — Java 21's big shift

This is the headline change of modern Java. For twenty-five years a Java thread was expensive, and every concurrency tool — pools, async callbacks, reactive frameworks — existed largely to *ration* threads. **Virtual threads**, finalized in Java 21, make a thread so cheap you can have *millions*, and in doing so retire most of that complexity. It is the most consequential concurrency feature Java has ever added.

### The old cost: platform threads are OS threads

A classic Java thread — now called a **platform thread** — is a thin wrapper over an **operating-system thread**. That's the source of the cost: each OS thread reserves ~1 MB of stack and is scheduled by the kernel, so a machine tops out at a few *thousand* of them. On a server that handles each request on its own thread, that ceiling *is* your maximum concurrency — and it's the reason thread pools exist, to share a scarce resource.

### The idea: many virtual threads on few OS threads

A **virtual thread** is a thread managed by the *JVM*, not the OS. Millions can exist because they're just objects on the heap, not kernel resources. The JVM runs them on a small pool of platform threads — called **carriers** — and here's the trick:

> When a virtual thread hits a **blocking** call (I/O, a database, `sleep`), the JVM *unmounts* it from its carrier and parks it, freeing that carrier to run another virtual thread. When the blocking call is ready, the virtual thread is *remounted* and continues.

So a blocked virtual thread costs almost nothing — no OS thread is tied up waiting. Thousands can be "blocked" on I/O while a handful of carriers stay busy doing real work.

### The payoff: blocking code that scales

The revolution is that **you write plain, blocking, sequential code** — the easy kind — and it scales like complex asynchronous code. No callbacks, no reactive pipelines: just `read`, then `process`, then `write`, top to bottom, one virtual thread per task:

```java
// one virtual thread PER TASK — even a million of them
try (var pool = Executors.newVirtualThreadPerTaskExecutor()) {
    for (Request r : requests)
        pool.submit(() -> handle(r));      // blocking handle() is fine now
}
```

`Thread.ofVirtual().start(runnable)` starts one directly; `newVirtualThreadPerTaskExecutor()` gives one virtual thread *per task* — a model that was insane with platform threads and is now the recommended default for server workloads.

### The rule that flips: don't pool virtual threads

Every instinct from the last section inverts:

- **Platform threads are pooled** because they're scarce — you ration them.
- **Virtual threads are not pooled** because they're abundant — you create one *per task* and let it block freely. Pooling them would re-introduce the very scarcity they eliminate.

The old advice "never block a thread" becomes "blocking a *virtual* thread is fine — that's the whole point." Reserve a bounded pool for genuinely CPU-bound work; use virtual threads for the far more common I/O-bound work.

### Where it fits — and its limits

Virtual threads shine for **I/O-bound, high-concurrency** work: web servers, API gateways, anything that spends its time waiting on the network or disk with thousands of concurrent tasks. They do **not** speed up CPU-bound work — a virtual thread still needs a carrier (an OS thread on a core) to compute, so raw number-crunching is bounded by cores as always. Two caveats to know: heavy use of `synchronized` blocks can "pin" a virtual thread to its carrier (defeating the unmount), and virtual threads don't reduce total compute — they remove the *waiting* tax. Understood that way, they're the feature that makes simple, readable, one-thread-per-task code the right default again — and the foundation for structured concurrency, two sections on.
