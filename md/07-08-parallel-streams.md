## Parallel streams

Here is the promise the module has been building toward: because a pipeline describes *what* to compute and not *how* to loop, the same code can run across every core of your machine with a one-word change. `parallelStream()` — or `.parallel()` on an existing stream — splits the work across threads. But that power comes with sharp edges, and knowing when *not* to use it matters more than knowing how.

### The one-word switch

Sequential and parallel share the identical pipeline; only the source changes:

```java
long count = orders.stream()                    // sequential — one thread
    .filter(o -> o.total() > 100)
    .count();

long count = orders.parallelStream()            // parallel — many threads
    .filter(o -> o.total() > 100)
    .count();
```

Under the hood the framework **splits** the source into chunks, runs the pipeline on each chunk on a different thread (drawn from the shared `ForkJoinPool.commonPool`), and **combines** the partial results. You wrote a description; the runtime chose the execution.

### Why your reducer's contract suddenly matters

Everything in section 06 about associativity and neutral identities was laying the groundwork for this moment. In parallel, elements are combined **out of order and in separate groups**, then merged. That is only correct if:

- the combining operator is **associative** (grouping doesn't change the answer), and
- the identity is truly **neutral**, and
- each element is processed **independently** — the function for one element must not depend on, or mutate, shared state touched by another.

Break independence and you get the classic bug: a `forEach` that adds to a shared `ArrayList`, or a lambda that mutates a field, races across threads and produces **corrupt or nondeterministic results** — no exception, just wrong answers some of the time. The fix is never a lock; it's to stay functional — use `collect`/`reduce` with a proper collector, which the framework merges safely, and never mutate shared state from inside a pipeline.

### When parallel actually pays — and when it costs

Parallelism is not free: splitting the source, dispatching to threads, and merging results all have overhead. It only wins when the work is big enough to swamp that overhead. A useful mental checklist:

- **Enough data.** Thousands+ of elements, not dozens. On a small stream, the coordination costs more than the loop it replaces.
- **Cheap to split.** `ArrayList` and arrays split in O(1) by index; `LinkedList` and most `Stream.iterate` sources split badly and gain little.
- **Expensive per element, or many elements.** The per-element work should be substantial (or there should be a huge number of elements) so parallel arithmetic dominates coordination.
- **No ordering tax.** Order-sensitive ops (`limit`, `findFirst`) and stateful ones fight parallelism; `findAny` and unordered work parallelize cleanly.

And a hard rule: **never parallelize a pipeline whose lambdas touch shared mutable state or do blocking I/O** — the common pool is shared process-wide, so a blocked parallel stream can starve every other one.

### The honest default

Reach for `parallelStream()` only when you have measured a real, CPU-bound bottleneck over a large dataset — and then measure again to confirm it helped. For the overwhelming majority of pipelines, **sequential is the right choice**: simpler, deterministic, and often faster once overhead is counted. Parallel streams are a precision tool, not a default `.stream()` upgrade — the value of the module is that when you *do* need them, the code barely changes.
