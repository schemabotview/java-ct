## Iterating collections

Every collection exists to be walked over. Java gives you several ways, and the differences matter — one of them has a famous trap. The unifying idea: any `Collection` is **`Iterable`**, so it works with the tools built on that interface.

### The everyday loop: for-each

The **enhanced for** loop is the default. It reads cleanly and works on any `Iterable` — every `List`, `Set`, `Queue`:

```java
for (String name : names) {
    System.out.println(name);
}
```

Under the hood the compiler turns this into calls on an **`Iterator`** — a little cursor with `hasNext()` and `next()`. You rarely name the `Iterator` yourself, but knowing it's there explains the trap below.

### The trap: modifying while iterating

Change a collection's *structure* (add or remove) **while a for-each is walking it**, and you get a **`ConcurrentModificationException`**:

```java
for (String name : names) {
    if (name.isBlank()) names.remove(name);   // throws ConcurrentModificationException
}
```

The iterator notices the collection changed underneath it and fails **fast** — deliberately, so a subtle bug becomes a loud crash. (Despite the name, this happens on a single thread; it's about structural modification, not concurrency.) There are three correct fixes:

- **`removeIf`** — the cleanest, purpose-built for exactly this:

```java
names.removeIf(name -> name.isBlank());   // one line, no exception
```

- **An explicit `Iterator` and `it.remove()`** — remove *through* the iterator, which it permits:

```java
for (var it = names.iterator(); it.hasNext(); ) {
    if (it.next().isBlank()) it.remove();   // safe
}
```

- **Collect-then-remove** — gather the doomed elements in one pass, remove them in another.

For **maps**, the same rule applies: mutate via the entry-set iterator, or use `map.entrySet().removeIf(...)`, or `values().removeIf(...)`.

### `forEach` and the functional style

Every collection also has a **`forEach`** method taking a lambda — handy for a quick side-effect:

```java
names.forEach(System.out::println);
ages.forEach((name, age) -> System.out.println(name + " is " + age));
```

It's concise, but it's still a *loop for effects*. When you want to **transform, filter, or aggregate** rather than just visit, that's the job of **streams** — `names.stream().filter(...).map(...).toList()` — which get their own module (07). Think of `forEach` as the functional twin of the for-each loop, and streams as the step beyond.

### Choosing

Reach for the **for-each loop** by default — it's the clearest way to visit every element. Use **`removeIf`** (or an explicit `Iterator`) the moment you need to delete *during* a walk. Use **`forEach`** for a tidy one-liner side-effect. And when the loop is really building a *new* result from the old, remember streams are waiting in module 07. Next, a different concern that shapes how you *hand out* collections: making them immutable, and defending the mutable ones.
