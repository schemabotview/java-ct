## The shared-mutable-state problem

Virtual threads and structured concurrency made *running* work in parallel cheap and safe. But the moment two of those threads touch the **same piece of data**, a new and much subtler class of bug appears — one that doesn't crash, doesn't throw, and usually passes every test you write. This is the heart of the module's second half, and the reason locks, atomics, and the memory model exist at all. The enemy has a name: **shared mutable state**.

### Each thread has its own stack — the heap is shared

Start from what's safe. Every thread gets its own **call stack**, so local variables and method parameters are private to that thread. A `int total` declared inside a method is never a concurrency problem. The danger is **objects on the heap**: fields of a shared object, static fields, elements of a shared collection. When two threads hold a reference to the same object and both write its fields, they are stepping on each other.

```java
class Counter {
    int count = 0;              // a field — lives on the heap, shared
    void increment() { count++; }
}
```

That `count` is fine with one thread. Hand the *same* `Counter` to two threads and it quietly breaks.

### Why `count++` is a race: it's three operations, not one

The trap is that `count++` *looks* atomic but isn't. The JVM turns it into three separate steps:

```
1. read  count       (say, 41)
2. add   1           (compute 42)
3. write count       (store 42)
```

Two threads can interleave *between* those steps. Thread A reads 41; before it writes, Thread B also reads 41; both compute 42; both write 42. Two increments happened, but the count only went up by one. That's a **lost update** — and it's why a counter hammered by two threads ends up *below* the number of increments:

```java
Counter c = new Counter();
Runnable job = () -> { for (int i = 0; i < 100_000; i++) c.increment(); };
Thread t1 = Thread.ofPlatform().start(job);
Thread t2 = Thread.ofPlatform().start(job);
t1.join(); t2.join();
System.out.println(c.count);   // NOT 200000 — maybe 137204, different every run
```

### Race condition: correctness that depends on timing

That is the definition of a **race condition**: the result depends on the *interleaving* of threads — on who happens to run when. Nothing is deterministic. The same code gives a different answer each run, and the JVM, the OS scheduler, and the hardware are all free to interleave however they like. Worse, a **read-modify-write** sequence (`count++`, `list.add`, "check then act") is only the obvious form; even a plain shared `boolean` flag can be read *stale* by another thread, because there's no guarantee a write on one thread is ever *seen* by another. (That visibility half of the problem is what `volatile` and the memory model, later in this module, address.)

### Why it's so dangerous: the bug hides

The cruel part is that this bug is nearly invisible. With one thread, or under light load, or on your laptop, the interleaving that triggers it may almost never happen — the test passes, the demo works, it ships. Then production runs it on more cores under real contention and the counts drift, the cache corrupts, the balance goes negative. A race condition is a **latent** bug: present in the code, absent from most runs.

### The two escape routes — the rest of the module

There are only two fundamental cures, and everything ahead is a variation on one of them. **Don't share** — give each thread its own data (thread confinement), or make the shared data **immutable** so there's nothing to write (a `record`, a `final` field, an unmodifiable collection — the safest concurrency is no mutation at all). Or, when threads genuinely must share mutable state, **coordinate** every access so the read-modify-write can't be split: a **lock** (`synchronized`, `ReentrantLock`) makes the three steps one indivisible unit, and **atomic variables** do the same in hardware for a single value. The next sections build exactly those tools — but the mindset to carry in is this: *shared, mutable, and concurrent — pick at most two.*
