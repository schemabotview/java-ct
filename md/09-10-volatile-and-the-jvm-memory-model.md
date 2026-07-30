## `volatile` and the JVM memory model

Every fix so far has been about **atomicity** — stopping two threads from interleaving mid-update. But the shared-state problem had a second, sneakier half: **visibility**. Even a single, complete write by one thread is not guaranteed to be *seen* by another. A thread can spin forever on a `boolean stop` flag that another thread already set to `true`, because it never re-reads it from main memory. Fixing that is what `volatile` and the **Java Memory Model** are for.

### Why a write can be invisible

For speed, your program does not run the way the source reads. A CPU keeps values in **registers and per-core caches**, so a write may sit in one core's cache and never reach another. The compiler and the CPU also **reorder** independent instructions. None of this is a bug — it's essential for performance, and it's invisible within a single thread. Across threads, though, it means one thread's writes can appear late, out of order, or not at all.

```java
boolean stop = false;          // plain field
// thread 1:  while (!stop) { work(); }   // may loop FOREVER
// thread 2:  stop = true;                // thread 1 might never see it
```

### The Java Memory Model — the rules of visibility

The JMM is the contract that says *when* a write by one thread is guaranteed visible to a read by another. Its core relation is **happens-before**: if action A happens-before action B, then A's effects are visible to B. Without a happens-before edge between two threads, the JVM promises you **nothing** about ordering or visibility. The edges you can create are exactly the concurrency tools:

- **Unlocking** a monitor happens-before any later **lock** of it (this is the visibility half of `synchronized`).
- A **`volatile` write** happens-before every later **`volatile` read** of that field.
- `Thread.start()` happens-before the started thread's first action; a thread's last action happens-before another thread's return from `join()`.

### `volatile` — visibility and ordering for one field

Marking a field `volatile` makes every read come from **main memory** and every write flush **to** it, and it forbids reordering around that access. It gives you the visibility and ordering edges — so the stop flag now works:

```java
volatile boolean stop = false;   // now the loop is guaranteed to see the change
```

But be precise about what `volatile` does **not** give you: **atomicity**. `volatile count++` is *still* a race, because the read-modify-write is three steps and `volatile` only guarantees each individual read and write is fresh — not that the trio is indivisible. So the rule of thumb: `volatile` is for a **flag or a published reference** that one thread writes and others read; for a counter, use an `AtomicInteger`; for a multi-step invariant, use a lock.

### The module in one picture

That completes the toolkit, and the whole module resolves into a single decision. Concurrency goes wrong only with **shared, mutable state**, and you have two ways out. **Don't share** — confine data to one thread, or make it immutable (a `record`, `final` fields) so there is nothing to coordinate; this is the first and best answer. Or, when sharing is unavoidable, **coordinate**: a **lock** for a multi-variable critical section, an **atomic** for a single value, `volatile` for a visibility-only flag — each one establishing the happens-before edges the memory model requires.

And the modern advice that ties the module together: **stay high-level.** Reach first for executors, `ConcurrentHashMap`, `CompletableFuture`, structured concurrency — the tools from the module's first half. They encapsulate these low-level rules correctly so you rarely have to reason about happens-before by hand. Drop to `synchronized`, `volatile`, and the raw memory model only when you must — and now you know what they actually promise.
