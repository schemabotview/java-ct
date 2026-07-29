## Creating streams

Every pipeline begins with a **source** — the operation that produces the first stream. Before you can `filter` or `map`, you need a stream to filter, and where it comes from shapes what it can do. There are three families of source: from data you already have, from a rule that generates values, and from primitives.

### From a collection you already have

The workhorse. Every `Collection` has a `stream()` method — this is where most pipelines start:

```java
List<String> names = List.of("Ada", "Grace", "Alan");
names.stream()...                       // the common case

Arrays.stream(new int[]{1, 2, 3})...    // from an array
Stream.of("a", "b", "c")...             // from loose values (varargs)
Stream.of("solo")...                    // even a single one
```

`Stream.of` is handy when you don't have a collection, just a few literals. And an empty source is `Stream.empty()` — useful as a neutral return value instead of `null`.

### From a generating rule

Sometimes the elements don't exist yet — you have a *rule* for producing them. Two factories build a stream from a function:

```java
Stream.iterate(1, n -> n * 2)           // 1, 2, 4, 8, 16, ...  (seed, then apply f)
Stream.generate(Math::random)           // an endless supply of random doubles
```

Both are **infinite** — they never stop on their own. That's fine, because a stream is lazy: nothing is produced until a terminal pulls. But it means you **must** put a bounding operation in the pipeline, or the terminal will run forever:

```java
Stream.iterate(1, n -> n * 2)
    .limit(10)                          // <-- the guard rail: take only the first 10
    .forEach(System.out::println);
```

There's also a three-argument `Stream.iterate(seed, hasNext, next)` that carries its own stop condition — a functional cousin of the classic `for` loop.

### From primitives: the specialized streams

`Stream<Integer>` works, but every element is a *boxed* `Integer` — a heap object wrapping an `int`. Over millions of numbers that boxing is real overhead. So Java gives you three primitive streams — **`IntStream`, `LongStream`, `DoubleStream`** — that carry the primitive directly and add numeric terminals (`sum`, `average`, `max`) you don't get on an object stream:

```java
IntStream.range(0, 5)                   // 0, 1, 2, 3, 4   (end-exclusive)
IntStream.rangeClosed(1, 5)             // 1, 2, 3, 4, 5   (end-inclusive)
IntStream.range(1, 101).sum();          // 5050 — no boxing, a real sum() method
```

You move between the worlds when you need to: `stream.mapToInt(...)` drops from objects into an `IntStream`; `intStream.boxed()` lifts back to a `Stream<Integer>`.

### A few sources you'll meet later

Streams reach beyond collections. `"hello".chars()` streams a `String`'s characters; `Files.lines(path)` streams a file line by line without loading it all into memory (module 08); `Random.ints()` streams random numbers. The pattern is always the same — **whatever the source, the pipeline that follows is identical.** That uniformity is the point: learn the operations once, and they apply to a list, an array, a range, or a file alike.
