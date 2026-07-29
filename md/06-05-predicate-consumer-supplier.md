## `Predicate`, `Consumer`, `Supplier`

`Function` computes a result from an input. The other three core interfaces cover the shapes where something's *missing*: no boolean-shaped output (`Predicate`), no output at all (`Consumer`), or no input at all (`Supplier`). Together with `Function` these four are the vocabulary you'll reach for constantly — recognising them by shape is most of reading functional Java.

### `Predicate<T>` — a test, returning `boolean`

`Predicate<T>` takes a `T` and answers `true`/`false`. Its method is **`test`**:

```java
Predicate<String> isBlank = s -> s.isBlank();
isBlank.test("  ");        // true

Predicate<Integer> isEven = n -> n % 2 == 0;
```

This is the shape of a *filter*: `stream.filter(Predicate)`, `list.removeIf(Predicate)`. Whenever you're deciding "does this element qualify?", you're writing a `Predicate`.

### `Consumer<T>` — do something, return nothing

`Consumer<T>` takes a `T` and returns `void` — it exists purely for its **side effect**. Its method is **`accept`**:

```java
Consumer<String> print = s -> System.out.println(s);
print.accept("hi");        // prints; returns nothing

list.forEach(print);       // forEach IS typed to take a Consumer
```

`forEach` is the canonical consumer sink: hand each element to a `Consumer`. Reach for it when you want to *act on* values (log them, add them somewhere) rather than compute from them.

### `Supplier<T>` — produce on demand, no input

`Supplier<T>` takes nothing and returns a `T`. Its method is **`get`**:

```java
Supplier<Double> random = () -> Math.random();
random.get();              // a fresh value each call

Supplier<List<String>> newList = ArrayList::new;
```

A `Supplier` is a *deferred* or *lazy* value — the work happens only when `get()` is called, if ever. That laziness is the point: `orElseGet(Supplier)` and `Logger` methods take suppliers so an expensive default or message is computed *only when actually needed*.

### The two-argument and primitive variants

The same four generalise:

- **`BiPredicate<T,U>`**, **`BiConsumer<T,U>`** — two-input versions (`map.forEach` takes a `BiConsumer<K,V>`).
- **Primitive forms** — `IntPredicate`, `IntConsumer`, `IntSupplier`, `BooleanSupplier`, etc. — to avoid boxing in numeric code.

You don't memorise the list; you recognise the *pattern*: a `Bi…` prefix means two inputs, an `Int…`/`Long…`/`Double…` prefix means a primitive.

### The cheat-sheet — pick by shape

The whole vocabulary reduces to *"what goes in, what comes out?"*:

| Interface | Method | In → Out | Use for |
|---|---|---|---|
| `Supplier<T>` | `get` | — → `T` | lazy/deferred value, factory |
| `Consumer<T>` | `accept` | `T` → — | side effect (`forEach`) |
| `Predicate<T>` | `test` | `T` → `boolean` | a test (`filter`, `removeIf`) |
| `Function<T,R>` | `apply` | `T` → `R` | transform (`map`) |

Learn to read a method's signature and know which shape it wants: `filter` wants a `Predicate`, `map` a `Function`, `forEach` a `Consumer`, `orElseGet` a `Supplier`. With these four internalised, the standard library's functional methods become self-explanatory — and when *none* of them fits your domain, you write your own functional interface, which is next.
