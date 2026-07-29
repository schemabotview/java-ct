## `Optional<T>` — no more nulls

Several stream terminals — `findFirst`, `min`, `max`, one-arg `reduce` — hand back an `Optional`, not a bare value. `Optional<T>` is Java's answer to the billion-dollar mistake: instead of returning `null` to mean "there might be no value here" and hoping the caller checks, you return a **box that visibly may or may not contain a `T`**, and the type system forces the caller to deal with the empty case.

### The problem it replaces

A method that returns `null` lies about its type. Its signature says `User`, but sometimes it's `null`, and nothing warns the caller:

```java
User u = findUser(id);       // says User; might be null
System.out.println(u.name()); // NullPointerException — the classic, at runtime, far from the cause
```

`Optional` makes the "might be absent" part of the **type**, so it can't be silently ignored:

```java
Optional<User> u = findUser(id);   // the type itself says "maybe a User"
```

### Creating and inspecting an Optional

Three factories create one, and you should rarely inspect it the clumsy way:

```java
Optional.of(value)         // a present value — throws if you pass null
Optional.ofNullable(ref)   // present if ref != null, else empty — the null-to-Optional bridge
Optional.empty()           // deliberately empty

opt.isPresent()            // boolean — but see below
opt.get()                  // the value — throws if empty; AVOID
```

The pairing `if (opt.isPresent()) opt.get()` works but misses the entire point — it's the null-check you were trying to escape, wearing a different coat. The value of `Optional` is the *methods that keep you inside the box.*

### The right way: transform and supply a fallback, without unwrapping

Treat an `Optional` like a stream of zero-or-one elements. The same functional operations apply, and they let you compute with a value that *might not be there*:

```java
String name = findUser(id)
    .map(User::name)                 // transform IF present, still Optional<String>
    .filter(n -> !n.isBlank())       // keep only if it passes
    .orElse("anonymous");            // supply a default if empty — now a plain String
```

- **`map`** applies a function only if a value is present, leaving empty untouched — no null check needed.
- **`filter`** can empty a present Optional that fails a test.
- **`flatMap`** chains a call that *itself* returns an Optional, avoiding `Optional<Optional<X>>`.

Then, at the edge, you leave the box by supplying what to do when empty:

- **`orElse(default)`** — a fallback value.
- **`orElseGet(supplier)`** — a fallback computed lazily (only if empty — use this when the default is expensive).
- **`orElseThrow()`** — demand the value, throw `NoSuchElementException` (or a supplied exception) if absent.
- **`ifPresent(consumer)`** / **`ifPresentOrElse(...)`** — run an action for the present (and optionally the empty) case.

### The discipline: where Optional belongs, and where it doesn't

`Optional` is designed for **one job — a return type that signals "possibly no result,"** most naturally from a method or a stream terminal. Use it there and callers get a compiler-enforced nudge to handle absence. But it is *not* a general nullable wrapper:

- **Don't** use `Optional` for fields or constructor parameters — it adds a wrapper object and boxing where a plain `@Nullable` reference is clearer and cheaper.
- **Don't** put it in collections — an empty list already means "nothing"; `List<Optional<T>>` is noise.
- **Never** call `.get()` without proving presence, and never return `null` *from* a method that returns `Optional` (an "empty or null" Optional is the worst of both).

Used with that discipline, `Optional` turns a whole class of runtime `NullPointerException`s into compile-time obligations — which is exactly why the Stream API hands you one wherever a result might legitimately not exist.
