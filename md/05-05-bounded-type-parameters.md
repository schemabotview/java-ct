## Bounded type parameters

An unconstrained `T` can be *any* type, so inside a generic class or method you can only call `Object`'s methods on it — `toString`, `equals`. That's often too little. A **bounded type parameter** narrows `T` to "any type that *is a* something," which unlocks that something's methods while still staying generic.

### An upper bound with `extends`

`<T extends Bound>` means "`T` is `Bound` or a subtype of it." Inside, `T` now has all of `Bound`'s members:

```java
public static <T extends Comparable<T>> T max(List<T> list) {
    T best = list.get(0);
    for (T x : list)
        if (x.compareTo(best) > 0) best = x;   // legal — T is guaranteed Comparable
    return best;
}
```

Without the bound, `x.compareTo(best)` wouldn't compile — a bare `T` has no `compareTo`. The bound is the *promise* that lets the compiler allow it, and the *requirement* the caller must meet: `max(List.of(3, 1, 2))` works (`Integer` is `Comparable`); `max(List.of(someRunnable))` is rejected at compile time.

### `extends` here means "is-a," for both classes and interfaces

The keyword is always `extends` in a bound — even when the bound is an *interface*. `<T extends Comparable<T>>`, `<T extends Number>`, `<T extends Closeable>` all read as "`T` is a …". So a bound of `Number` lets you call `.doubleValue()`, `.intValue()` on `T`; a bound of an interface lets you call that interface's methods. It's a *constraint on the type argument*, not a class-extension relationship.

### Multiple bounds

A type parameter can require several bounds at once with `&` — at most one may be a class (and it must come first), the rest interfaces:

```java
public static <T extends Number & Comparable<T>> T clamp(T v, T lo, T hi) {
    if (v.compareTo(lo) < 0) return lo;      // Comparable
    if (v.compareTo(hi) > 0) return hi;
    return v;                                // and .doubleValue() etc. from Number
}
```

`T` must be *both* a `Number` *and* `Comparable` — the method can use members of each.

### Recursive bounds — the `T extends Comparable<T>` idiom

The bound can *mention `T` itself*, which looks odd but is exactly right for self-comparison: `<T extends Comparable<T>>` says "`T` can be compared **to its own type**." That's why it's the canonical signature for `max`, `sort`, and friends — it stops you comparing apples to oranges, because the `Comparable` must be parameterised on `T`. You'll meet this shape constantly in the standard library; recognise it as "a type comparable with itself."

### Bounds vs wildcards — where this is heading

A bound constrains the type parameter *you declare* — the type the method works in terms of. It does **not**, by itself, make an API flexible about *related* types: a `List<Number>` parameter still won't accept a `List<Integer>` argument, because generics are **invariant** (a `List<Integer>` is *not* a `List<Number>`). Solving *that* — letting a method accept "a list of `Number` *or any subtype*" — needs a different tool, the **wildcard**, which is the next two sections. Bounds say what a *type* can do; wildcards say how *flexible* a parameter's type argument may be. Together they're what make generic APIs both safe and usable.
