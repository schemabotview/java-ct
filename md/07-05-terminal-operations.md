## Terminal operations

An intermediate chain is a recipe that never cooks. The **terminal operation** is the one that runs it: it consumes the stream, drives every element through the pipeline, and produces a **result that is not a stream** — a value, a collection, a boolean, or a side effect. Exactly one terminal ends every pipeline, and attaching it is what makes anything happen at all.

### The defining trait: it triggers, then the stream is spent

Two things are true of every terminal, and they're two sides of one coin. First, it is **eager** — the moment it's called, the whole pipeline executes. Second, it **consumes** the stream: once a terminal has run, that stream is closed. Touch it again and you get `IllegalStateException: stream has already been operated upon or closed`. A stream is a one-shot; for a second pass, start a fresh one from the source.

```java
Stream<String> s = names.stream();
long n = s.count();     // runs the pipeline
s.forEach(...);         // IllegalStateException — s is already spent
```

### The families of terminal, by what they hand back

**Reduce to a single value** — collapse the whole stream to one answer:

```java
stream.count();                     // long: how many elements
intStream.sum();                    // primitive streams only: 5050
intStream.average();                // OptionalDouble — the stream might be empty
stream.min(comparator);             // Optional<T> — likewise
stream.max(comparator);
```

Notice `average`/`min`/`max` return an **`Optional`**: an empty stream has no minimum, so the type honestly says "maybe." (That's section 09.)

**Search — and short-circuit** — ask a question and stop as soon as it's answered:

```java
stream.anyMatch(p);     // true the instant one element passes — rest never examined
stream.allMatch(p);     // false the instant one fails
stream.noneMatch(p);
stream.findFirst();     // Optional<T> — the first element, then stop
stream.findAny();       // Optional<T> — any element (cheaper in parallel)
```

These are the payoff of laziness: on an infinite or huge stream, `findFirst` pulls just enough elements to answer, then halts.

**Collect into a container** — gather the elements into a data structure:

```java
List<String> list = stream.toList();                   // Java 16+, the modern shorthand
Set<String>  set  = stream.collect(Collectors.toSet());
```

`collect` with `Collectors` is a world of its own — grouping, joining, summarizing — and gets the whole of section 07.

**Perform a side effect** — do something with each element, return nothing:

```java
stream.forEach(System.out::println);   // prints each; returns void
```

`forEach` is the stream's exit into the imperative world. Reach for it only for genuine side effects (printing, writing) — if you're building a value, use a `collect` or a reduction, not a `forEach` that mutates an external variable.

### Why terminals return `Optional`, not `null`

A recurring theme: `findFirst`, `min`, `max`, `reduce` (the one-arg form), `average` — all return an `Optional` rather than a bare value or `null`. The reason is honesty about **emptiness**. Filter a stream down to nothing and there *is* no first element; the type should force you to handle that case rather than hand you a `null` that explodes three lines later. That deliberate pairing — pipeline in, `Optional` out — is why sections 09 and 10 close the module on `Optional`.
