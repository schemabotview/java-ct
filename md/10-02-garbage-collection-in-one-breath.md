## Garbage collection in one breath

In C you allocate memory and must remember to free it; forget, and you leak; free too early, and you crash. Java takes that entire burden away. You allocate with `new` and simply **stop referencing** an object when you're done — the **garbage collector** finds it and reclaims the memory automatically. This section is the one-breath version: what "garbage" means, how the GC finds it cheaply, and the little you actually need to do.

### Garbage = unreachable, not unused

The GC's definition of dead is precise and mechanical: an object is garbage when it is **no longer reachable**. Starting from a set of **GC roots** — local variables on live thread stacks, static fields, and so on — the collector follows every reference. Anything it can reach is live; everything it can't is garbage, and its memory can be reclaimed.

```java
var user = new User("Ana");   // reachable via the local variable `user`
user = null;                  // the User object is now unreachable → collectible
```

Note it's *reachability*, not whether you'll "use it again" — an object you never touch again but still hold a reference to stays alive. That gap is the source of most Java memory leaks.

### The generational hypothesis — why GC is fast

Naively, scanning the whole heap on every collection would be ruinously slow. Real collectors exploit an empirical fact — the **generational hypothesis**: *most objects die young.* So the heap is split into a **young generation** and an **old generation**:

- New objects are born in the young gen. A **minor GC** collects just this region — it's small, so it's frequent and fast, and typically most of it is already dead.
- Objects that survive several minor GCs are **promoted** to the old gen. The old gen fills slowly and is collected rarely by a **major GC**, which is more expensive.

Concentrating effort on the short-lived young gen is what makes garbage collection cheap enough to run continuously.

### Collectors and the stop-the-world pause

The JVM ships several collector algorithms, and you pick one with a flag. **G1** is the modern default — a balanced, region-based collector. **Parallel** maximizes raw throughput for batch jobs. **ZGC** and **Shenandoah** are low-latency collectors that do almost all their work *concurrently* with your program, keeping pauses to a millisecond or two even on huge heaps.

The reason the choice exists is the **stop-the-world pause**: during parts of a collection, application threads must halt so the GC can move objects safely. Old collectors paused noticeably; modern ones shrink that pause dramatically, which matters for anything latency-sensitive.

### What you actually do about it

Mostly, nothing — and that's the point. Two practical notes:

- **Don't call `System.gc()`.** It's only a *hint*, it usually forces an expensive full collection, and the JVM manages timing far better than you can. Leave it alone.
- **Do avoid leaks.** A leak in Java is an *unintended reference* that keeps an object reachable forever: a growing `static` collection you never clear, a cache without eviction, a listener you registered but never removed. The GC can't reclaim what something still points to.

The one knob you'll touch in practice is the maximum heap size, `-Xmx`. Beyond that, trust the collector. Garbage collection is a service the JVM runs *on* your objects — which raises the question of how those classes get into the JVM in the first place. That's class loading, next.
