## Locks — `synchronized` and `ReentrantLock`

The previous section left us with a broken counter and two cures. This is the second cure: when threads genuinely must share mutable state, **coordinate** every access so the dangerous read-modify-write can't be split apart. The tool is a **lock**, and the property it buys is **mutual exclusion** — at most one thread runs the guarded code at a time. Java gives you two ways to get it: the built-in `synchronized` keyword and the explicit `ReentrantLock` class.

### `synchronized` — the built-in lock

Every Java object carries a hidden **monitor** (an intrinsic lock). The `synchronized` keyword acquires it on entry and releases it on exit — even if the block throws. Mark the counter's method `synchronized` and the three steps of `count++` become one indivisible unit:

```java
class Counter {
    int count = 0;
    synchronized void increment() { count++; }   // one thread at a time
    synchronized int get() { return count; }      // reads must lock too
}
```

Now two threads can hammer `increment()` all day and land on exactly the expected total. You can also synchronize a *block* rather than a whole method, locking on a specific object:

```java
synchronized (lock) {   // acquire lock's monitor
    balance -= amount;  // critical section
}                       // release on exit — even on exception
```

A `synchronized` **method** locks on `this` (or on the `Class` object for a `static` method). Prefer locking on a **private final lock object** so no outside code can grab the same monitor.

### What a lock actually guarantees — two things, not one

A lock does more than serialize access. It provides:

- **Atomicity (mutual exclusion).** Only the lock holder runs the critical section, so read-modify-write completes without interference. This is the fix for the race.
- **Visibility.** Releasing a lock *flushes* your writes to main memory; acquiring it *reads* the latest. So changes one thread makes under the lock are guaranteed visible to the next thread that takes the same lock — the "happens-before" edge that plain fields lack. (More on visibility in the memory-model section.)

Both guarantees require every access — **including reads** — to use the **same** lock. Guard the writes but not the reads, and you've only half-fixed it.

### `ReentrantLock` — the explicit, more capable lock

`ReentrantLock` gives the same guarantees as an object, with `lock()` / `unlock()` you call yourself. The unlock **must** go in a `finally`, or an exception leaks the lock forever:

```java
private final ReentrantLock lock = new ReentrantLock();

lock.lock();
try {
    balance -= amount;   // critical section
} finally {
    lock.unlock();       // always, even on exception
}
```

Why bother, when `synchronized` is terser? Because the explicit lock can do things the keyword can't: `tryLock()` (take the lock only if free — no blocking), `tryLock(timeout)` (give up after a while — a deadlock escape hatch), `lockInterruptibly()`, optional **fairness**, and multiple `Condition` variables for fine-grained wait/notify. Reach for it when you need those; otherwise `synchronized` is simpler and just as fast.

### Reentrancy, and the ever-present danger of deadlock

Both locks are **reentrant**: a thread that already holds a lock can acquire it again (a synchronized method calling another synchronized method on the same object won't self-deadlock). But locks bring their own hazard — **deadlock**: thread A holds lock 1 and waits for lock 2 while thread B holds lock 2 and waits for lock 1, and both freeze forever. The classic defense is to always acquire multiple locks in a **consistent global order**. Keep critical sections **short**, never call unknown code while holding a lock, and hold the lock for as little as correctness demands. A lock is correct but coarse; the next section shows a lighter-weight tool for the common case of a single variable.
