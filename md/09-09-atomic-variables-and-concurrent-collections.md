## Atomic variables & concurrent collections

A full lock is the right tool for a multi-step critical section, but it's heavy for the most common case of all: **one variable** that several threads increment, or **one collection** they all read and write. For those, Java's `java.util.concurrent` package gives you data structures that are *already* thread-safe — the coordination is built into the object, so you write no locks at all. Two families cover almost everything: **atomic variables** and **concurrent collections**.

### Atomic variables — a lock-free single value

`AtomicInteger`, `AtomicLong`, and `AtomicReference<T>` wrap a single value and expose operations that are indivisible in **hardware**, not by locking. The broken counter becomes correct and fast:

```java
AtomicInteger count = new AtomicInteger(0);
count.incrementAndGet();   // atomic read-add-write, no lock
int now = count.get();
```

`incrementAndGet()` is a single atomic step, so the interleaving that lost updates simply can't happen.

### How it works: compare-and-swap, not blocking

Under the hood these use a CPU instruction called **compare-and-swap** (CAS): "if this value is *still* what I last read, set it to the new value; otherwise tell me it changed." It's **optimistic** — no thread blocks; a thread that gets beaten simply retries in a small loop. For arbitrary updates, `updateAndGet` and `accumulateAndGet` run your function in exactly that retry loop:

```java
max.updateAndGet(cur -> Math.max(cur, candidate));   // retries until it wins
```

Because nobody blocks, atomics scale better than locks under high contention — but they only protect **one** variable. Two atomics touched together are *not* atomic as a pair; that still needs a lock.

### Concurrent collections — thread-safe by construction

For shared collections, don't reach for a plain `HashMap` (it can corrupt under concurrent writes) or the old `Collections.synchronizedMap` (correct but a single coarse lock). Use the purpose-built concurrent types:

- **`ConcurrentHashMap`** — the workhorse. Highly concurrent reads and writes, no external locking.
- **`CopyOnWriteArrayList`** — cheap reads, expensive writes; ideal for read-mostly lists like listeners.
- **`ConcurrentLinkedQueue`** and the **`BlockingQueue`** family (`ArrayBlockingQueue`, `LinkedBlockingQueue`) — the backbone of producer/consumer handoff, where `take()` blocks until an item arrives.

### Compound operations must stay atomic too

The subtle trap: a concurrent map makes *each* call thread-safe, but a **check-then-act** across two calls is still a race. This is broken —

```java
if (!map.containsKey(k)) map.put(k, compute(k));   // two threads both pass the check
```

— because both threads can pass the `containsKey` before either `put`s. Use the map's **atomic compound methods** instead, which do the check and the act as one operation:

```java
map.computeIfAbsent(k, this::compute);   // atomic: compute-and-put, once
map.merge(word, 1, Integer::sum);        // atomic tally — a concurrent word count
```

The guiding rule for the whole section: **prefer these ready-made tools over hand-rolled locks.** An `AtomicInteger` or a `ConcurrentHashMap` is easier to get right than a `synchronized` block, faster under load, and far harder to deadlock. Drop to explicit locks only when your invariant spans several variables at once. One piece of the puzzle remains — not *atomicity* but *visibility*: how does a thread even know a write happened? That's the memory model, next.
