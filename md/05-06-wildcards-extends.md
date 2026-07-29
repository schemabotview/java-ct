## Wildcards — `? extends T`

Here's the fact that surprises everyone: **`List<Integer>` is *not* a `List<Number>`**, even though `Integer` is a `Number`. Generics are **invariant** — a parameterised type is not a subtype of the "same" type with a supertype argument. A method that takes `List<Number>` will therefore reject a `List<Integer>`, which makes it uselessly rigid. **Wildcards** fix this, and `? extends` is the first half.

### Why invariance exists (it's protecting you)

Suppose the assignment *were* allowed:

```java
List<Integer> ints = new ArrayList<>();
List<Number>  nums = ints;   // imagine this compiled…
nums.add(3.14);              // …a Double into a List<Integer>!
int x = ints.get(0);         // boom — it isn't an Integer
```

Invariance forbids that second line precisely to stop the disaster on the fourth. So the strictness is a feature — but it means a plain `List<Number>` parameter can't accept the subtype lists you'd reasonably want to pass.

### `? extends T` — an upper-bounded wildcard

Write the parameter as **`List<? extends Number>`** — "a list of *some unknown type that is a `Number` or a subtype*." Now every `List<Integer>`, `List<Double>`, `List<Number>` is accepted:

```java
double sum(List<? extends Number> list) {     // accepts List<Integer>, List<Double>, …
    double total = 0;
    for (Number n : list) total += n.doubleValue();   // reading as Number: fine
    return total;
}
```

You can pass any list whose element type is a `Number`. Reading works because whatever the real element type is, it *is a* `Number`.

### The catch: you can read, but you can't write

With `? extends`, the compiler knows only that elements are "some subtype of `Number`" — but **not which one** — so it forbids adding:

```java
List<? extends Number> list = someIntegers;
Number n = list.get(0);   // ✅ read — it's certainly a Number
list.add(1);              // ❌ compile error — is the list Integer? Double? can't be sure
list.add(null);           // (the sole exception — null is any type)
```

If the list is really a `List<Integer>`, adding a `Double` would corrupt it; since the compiler can't tell, it bans *all* additions. That's the defining trade-off: **`? extends` makes a source you can read from, not a sink you can write to.**

### The mental model: a producer

Think of `? extends T` as declaring **"this parameter is a *producer* of `T`s"** — data flows *out* of it, into your method. You iterate it, sum it, copy *from* it. You cannot put anything *in* (except `null`), because the exact type is unknown.

This is exactly why `Collections.max(Collection<? extends T>)` and `stream.map(Function<? super T, ? extends R>)` are written with `? extends` on their *input* collections — they only *read* the elements. Use `? extends` whenever your method **consumes** a collection's contents without adding to it. The mirror image — a parameter you *write into* — needs `? super`, and together they form the rule every Java developer memorises: **PECS**, next.
