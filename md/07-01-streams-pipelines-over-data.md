## Streams — pipelines over data

Module 06 made behaviour a value — a `Predicate` you can pass, a `Function` you can hand to a method. On its own that is a nicer way to write a callback. This module is where it pays off: the **Stream** takes those small functions and threads them through a **pipeline over a whole collection**, so an entire loop's worth of work reads as one declarative sentence.

### The shift: from *how* to *what*

Here is the loop you have written a hundred times — take a list of orders, keep the big ones, pull out their totals, add them up:

```java
double sum = 0;
for (Order o : orders) {
    if (o.total() > 100) {      // filter
        sum += o.total();       // map, then reduce
    }
}
```

The mechanics — the accumulator, the index, the `if` — are *how*. The intent is buried inside them. A stream lets you say only the *what*:

```java
double sum = orders.stream()
    .filter(o -> o.total() > 100)   // keep the big ones
    .mapToDouble(Order::total)      // pull out the total
    .sum();                         // add them up
```

Three verbs, in the order you'd say them aloud. Each `filter`, `map`, `sum` is one of module 06's functions dropped into a stage. The loop's scaffolding is gone.

### What a stream actually is

A **stream is not a collection.** A collection *holds* elements in memory; a stream *describes a computation* over a sequence of elements and carries none of them itself. Three properties fall out of that, and they matter for the whole module:

- **No storage.** A stream doesn't own its data — it draws elements from a source (a `List`, an array, a generator) on demand.
- **Single-use.** You traverse a stream once. After a terminal operation runs, that stream is spent — call `.stream()` again for a fresh one. It's a one-shot pipeline, not a reusable container.
- **Lazy.** The intermediate stages (`filter`, `map`) do nothing when you write them. They only run when a **terminal** operation at the end pulls elements through — and even then, one element at a time.

### The anatomy of every pipeline

Every stream expression has exactly three parts, and naming them now makes the rest of the module fall into place:

```java
orders.stream()                    // 1. SOURCE   — where elements come from
    .filter(o -> o.total() > 100)  // 2. INTERMEDIATE ops — lazy, return a new stream
    .mapToDouble(Order::total)     //    (you can chain as many as you like)
    .sum();                        // 3. TERMINAL op — runs the pipeline, produces a result
```

1. A **source** (`stream()`, `Stream.of(...)`, `IntStream.range(...)`) starts the flow.
2. Zero or more **intermediate** operations — each returns a *new* stream, so they chain. They're lazy: they build up the recipe, they don't cook.
3. Exactly one **terminal** operation — `sum`, `collect`, `forEach`, `count` — which *triggers* execution and yields a value (or a side effect). No terminal, no work: an intermediate chain with nothing on the end never runs.

That laziness isn't a technicality — it's what lets a stream fuse the stages. Rather than build a full filtered list, then a full mapped list, the pipeline pulls **one element all the way through** before touching the next, so there are no throwaway intermediate collections.

### Why it's worth a module

Streams are the reason functional Java earns its keep in everyday code:

- **Readability.** The pipeline reads as intent — *filter, map, sum* — not as bookkeeping.
- **Composability.** Every stage is one of module 06's small functions; you assemble behaviour instead of writing control flow.
- **A path to parallelism.** Because you described *what* and not *how*, the same pipeline can run across cores with a single change (`parallelStream()`) — the subject of section 08.

The rest of the module walks the pipeline end to end: how to **create** streams, the **intermediate** operations (`map`, `filter`, `flatMap`), the **terminal** operations, **reduction** and `reduce`, the powerful **collectors**, **parallel** streams — and finally `Optional`, the companion type that lets a pipeline return "maybe a result" without ever handing you a `null`.
