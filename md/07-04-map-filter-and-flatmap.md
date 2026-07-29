## `map`, `filter` and `flatMap`

Three intermediate operations do the bulk of the work in almost every pipeline. `filter` decides *which* elements continue, `map` decides *what each one becomes*, and `flatMap` handles the awkward case where each element expands into *many*. Learn these three shapes and most of stream programming is assembling them.

### `filter` — keep or drop, count stays the same or shrinks

`filter` takes a **`Predicate`** — a function from element to `boolean` (module 06). Each element that tests `true` continues; each `false` is discarded. The type never changes and the count only ever goes down:

```java
Stream<Integer> nums = Stream.of(1, 2, 3, 4, 5, 6);
nums.filter(n -> n % 2 == 0)     // Predicate<Integer>
    ...                          // 2, 4, 6  — still Integers, just fewer
```

Think of `filter` as a gate: same things flow, some don't make it through.

### `map` — transform each element, one in, one out

`map` takes a **`Function`** — a function from element to some new value. It applies that function to every element, producing a stream of the results. The count is **unchanged** (one output per input), but the **type can change** entirely:

```java
Stream<String> names = Stream.of("Ada", "Grace");
names.map(String::length)        // Function<String,Integer>
    ...                          // 3, 5   — a Stream<Integer> now, not Stream<String>

names.map(String::toUpperCase)   // "ADA", "GRACE" — same type, transformed value
```

`filter` changes *how many*; `map` changes *what each is*. Almost every pipeline is a few of each: filter to the rows you want, map them to the shape you need.

### The problem `flatMap` solves: one element → many

Sometimes the function you'd hand to `map` produces not one value but a *whole collection* per element. Map a list of orders to their line-items and each order gives you a `List<Item>` — so `map` leaves you with a **`Stream<List<Item>>`**, a stream of lists, when what you wanted was a flat stream of items:

```java
orders.stream()
    .map(Order::items)     // Order -> List<Item>
    ...                    // Stream<List<Item>>  — nested, awkward to work with
```

You're now stuck one level too deep. Every downstream operation would have to reach inside the inner list.

### `flatMap` — map, then flatten one level

`flatMap` takes a function that turns each element into a **stream**, then **concatenates** all those little streams into one flat stream. It's `map` plus a flattening step — the nesting disappears:

```java
orders.stream()
    .flatMap(o -> o.items().stream())   // Order -> Stream<Item>
    ...                                 // Stream<Item>  — flat, one level

// a classic: split lines into words
lines.stream()
    .flatMap(line -> Arrays.stream(line.split(" ")))   // each line -> stream of words
    ...                                                // one continuous stream of words
```

The rule of thumb writes itself: if the transform gives you **one value**, reach for `map`; if it gives you **many** (a list, an array, an `Optional`, a nested stream), reach for `flatMap` to keep the pipeline flat.

### The three shapes, side by side

- **`filter`** — `Predicate`, element → `boolean`; keeps the type, may reduce the count.
- **`map`** — `Function`, element → one value; keeps the count, may change the type.
- **`flatMap`** — `Function`, element → a *stream* of values; changes both, flattening one level of nesting away.
