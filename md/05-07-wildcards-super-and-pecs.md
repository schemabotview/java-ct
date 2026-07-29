## Wildcards — `? super T` and PECS

`? extends` gave you a parameter you can *read* from. Its mirror image, **`? super T`**, gives you one you can *write* to — and the mnemonic that ties the two together, **PECS**, is one of the most useful things to memorise in all of Java generics.

### `? super T` — a lower-bounded wildcard

`List<? super Integer>` means "a list of *some unknown type that is `Integer` or a supertype of it*" — so `List<Integer>`, `List<Number>`, `List<Object>` all qualify. Now the read/write trade-off **flips**: you can *add* `Integer`s, but you can only *read* elements as `Object`.

```java
void addNumbers(List<? super Integer> dest) {
    dest.add(1);              // ✅ whatever the list really is, an Integer fits
    dest.add(2);              // ✅
    Object o = dest.get(0);   // read comes back only as Object — that's all that's guaranteed
    Integer i = dest.get(0);  // ❌ compile error — could be a List<Number>, not Integer
}
```

Why can you write? Because the list's element type is `Integer` *or something more general*, so an `Integer` is always a valid element. Why only read as `Object`? Because you don't know *how* general — it might be `List<Object>` — and the one type everything is, is `Object`.

### The mental model: a consumer

Where `? extends T` is a **producer** (data flows out), `? super T` is a **consumer** — data flows *in*: your method *puts `T`s into* it. You write to it; you don't meaningfully read from it.

### PECS — Producer `extends`, Consumer `super`

That gives the rule for choosing a wildcard on any parameter:

> **PECS — Producer `extends`, Consumer `super`.**
> If the parameter *produces* `T`s for you to read → `? extends T`.
> If the parameter *consumes* `T`s you supply → `? super T`.
> If it does **both** (you read *and* write) → use an exact type `List<T>`, no wildcard.

The canonical signature that uses *both* at once is a copy:

```java
static <T> void copy(List<? super T> dest, List<? extends T> src) {
    for (T x : src) dest.add(x);      // src PRODUCES (extends), dest CONSUMES (super)
}
```

`src` is the producer, so `? extends T`; `dest` is the consumer, so `? super T`. Read that signature and PECS is doing the whole job.

### Where you've already seen it

The pattern is everywhere in the standard library once you know to look:

- `Collections.max(Collection<? extends T>)` — reads the elements → **producer**, `extends`.
- `Stream.forEach(Consumer<? super T>)` and `list.forEach(...)` — you *hand each element to* the consumer → **consumer**, `super`.
- `Comparator<? super T>` on `sort`/`TreeSet` — the comparator *consumes* your elements.
- `stream.map(Function<? super T, ? extends R>)` — consumes `T`, produces `R` — PECS on both ends of one function.

### The rule of thumb

When you *design* a generic method, ask of each parameter: *do I read from it, or write to it?* Read → `? extends`; write → `? super`; both → exact type. Apply PECS and your APIs accept the widest possible range of caller types while staying fully type-safe — the difference between a method that's a pleasure to call and one that rejects every list you hand it. This all works because of a single run-time reality — the compiler is doing bookkeeping that mostly *vanishes* once the program runs. That reality is **type erasure**, next.
