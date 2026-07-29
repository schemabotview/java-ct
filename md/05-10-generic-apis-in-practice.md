## Generic APIs in practice

You can now read and write generics; this closing section is about *judgement* — when to make something generic, how to shape its signature, and how to read the dense generic APIs you meet daily. The goal isn't maximum genericity; it's an API that's flexible for callers and honest about its contract.

### When to reach for generics — and when not

Make something generic when it does the **same thing regardless of the element type** — a container, an algorithm, a transformation. `Box<T>`, `Repository<T, ID>`, `Cache<K,V>`, a `firstOrNull` utility: the logic genuinely doesn't care about the type, only the *relationships* between types.

Don't genericise when the type *does* matter, or when there's only ever one. A parameter `<T>` used exactly once, with no relationship to any other type or return, adds noise without safety — a plain type (or an interface) is clearer. The tell for a *useful* type parameter: **it appears at least twice** in the signature, tying inputs to each other or to the output.

### Shape signatures with PECS and bounds

The two design tools from this module combine into a checklist for any generic method:

- **Bound a parameter** when the method must *call methods on* `T` — `<T extends Comparable<T>>` to compare, `<T extends Closeable>` to close.
- **Apply PECS to each parameter** — `? extends T` for the ones you *read from*, `? super T` for the ones you *write to*, an exact `T` when you do both.

Watch a real signature fall out of these rules:

```java
static <T> void copy(List<? super T> dest, List<? extends T> src)          // PECS
static <T extends Comparable<? super T>> T max(Collection<? extends T> c)   // bound + PECS
```

`max` reads that fluently once you know the vocabulary: *"for a `T` comparable with itself or a supertype, take a collection producing `T`s and return the largest."* The `? super T` on `Comparable` even lets a `Comparable<Object>` order your `T`s — maximum flexibility, still safe.

### The generic types you already lean on

Most of the standard library's power is generic APIs, and you now have the vocabulary to read them:

- **`Optional<T>`** — a typed "maybe a value," ending null-returns (module 07).
- **`Comparator<T>` / `Comparable<T>`** — orderings, wired through `? super T` (module 04).
- **The functional interfaces** — `Function<T,R>`, `Predicate<T>`, `Supplier<T>`, `Consumer<T>` — the backbone of lambdas and streams (modules 06–07), all generic.
- **`Stream<T>`, `List<E>`, `Map<K,V>`** — the collections and pipelines you've used throughout.

Every one is "written once, works for any type," and their signatures are just bounds and PECS applied consistently.

### The principles to carry forward

- **Program to generic interfaces** — accept `List<T>`, return `Optional<T>`; let callers pick the type.
- **Be liberal in, specific out** — use wildcards on parameters to accept the widest input; return concrete types (`List<T>`, not `List<? extends T>`) so callers aren't stuck with a read-only result.
- **Let inference work** — declare the type argument once (on the variable, or via the diamond), and let the compiler carry it.
- **Push errors to compile time** — the entire reason generics exist. A signature that encodes the type relationships turns a class of run-time failures into red squiggles in the editor.

That's generics end to end: a compile-time system for expressing *"this works for any type, and here's exactly how the types relate,"* checked before your program ever runs. Module 06 turns to another pillar of modern Java — treating **functions** themselves as values — and you'll find its `Function<T,R>` and `Predicate<T>` are generics you can now read at a glance.
