## Intermediate operations

The middle of every pipeline is a chain of **intermediate operations** — the stages that transform the stream on its way to the terminal. They share two defining traits, and understanding those traits explains everything the operations do.

### The two rules that define an intermediate op

**1. It returns a new stream.** Every intermediate operation takes a stream and gives back a stream — which is exactly why you can chain them with dots. `filter` returns a stream, so you can call `.map` on it, which returns a stream, so you can call `.distinct` on it. The chain is just stream-to-stream-to-stream.

**2. It is lazy.** Writing an intermediate op does *no work*. It records what should happen and returns immediately. Nothing flows until a terminal operation is attached and starts pulling. A pipeline of ten intermediate operations with no terminal executes exactly zero of them.

```java
Stream<String> s = names.stream()
    .filter(n -> n.length() > 3)   // records "keep long names"
    .map(String::toUpperCase);     // records "uppercase them"
// nothing has happened yet — s is a recipe, not a result
```

### The toolkit, grouped by what they do

`map` and `filter` get their own section next; here is the rest of the toolbox and the job each one does:

- **`distinct()`** — drop duplicates (uses `equals`). `Stream.of(1,2,2,3).distinct()` → `1,2,3`.
- **`sorted()`** — sort in natural order, or `sorted(comparator)` for a rule. Note this one has to see *all* elements before it can emit any.
- **`limit(n)`** — take at most the first `n` and stop. This is the guard rail that tames an infinite stream.
- **`skip(n)`** — discard the first `n`, keep the rest. `limit` and `skip` together give you paging.
- **`peek(action)`** — look at each element as it passes, without changing it. **Debugging only** — never use `peek` for real side effects.

```java
IntStream.rangeClosed(1, 100)
    .filter(n -> n % 2 == 0)   // evens
    .skip(5)                   // drop the first five evens
    .limit(3)                  // keep the next three
    .forEach(System.out::println);   // 12, 14, 16
```

### Laziness you can watch: the pipeline pulls one element at a time

The single most important thing to internalize: a stream does **not** run stage by stage over the whole collection. It runs **element by element** through the whole pipeline. The terminal asks for one element; that element is pulled through `filter`, then `map`, then delivered — and only then is the next element pulled.

Add a `peek` to each stage and you can *see* this interleaving:

```java
Stream.of("a", "b", "c")
    .peek(x -> System.out.println("filter sees " + x))
    .filter(x -> !x.equals("b"))
    .peek(x -> System.out.println("map sees " + x))
    .map(String::toUpperCase)
    .forEach(x -> System.out.println("got " + x));
```

The output interleaves — `filter sees a`, `map sees a`, `got A`, *then* `filter sees b` (and no `got` for it) — proving each element travels the full pipeline before the next one starts.

### Why the interleaving is a gift, not a curiosity

Because elements flow one at a time, two optimizations come for free. **Short-circuiting:** `limit`, and terminals like `findFirst` or `anyMatch`, can stop the whole pipeline the moment they have enough — the elements after that are never even generated. **Fusion:** there are no intermediate collections; `filter` doesn't build a filtered list for `map` to consume — it hands each surviving element straight on. On an infinite stream, this is the difference between a program that finishes and one that never does.
