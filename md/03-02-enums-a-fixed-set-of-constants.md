## Enums — a fixed set of constants

When a value can only ever be one of a known, fixed set — the days of the week, a traffic light, an order status — the wrong way to model it is a `String` or an `int`. Both let *any* value slip in, so you end up validating and guarding everywhere. An **`enum`** makes the set closed: the compiler guarantees a variable holds one of exactly these constants, or `null`, and nothing else.

### Declaring one

```java
public enum Status { ACTIVE, SUSPENDED, CLOSED }

Status s = Status.ACTIVE;
```

`Status` is a real type, and `ACTIVE`, `SUSPENDED`, `CLOSED` are its only instances — each a singleton the JVM creates once. You can't invent a fourth. Compare that to a `String status`, where `"activ"` typos through silently and `"ACTIVE"` vs `"active"` is a lurking bug.

### Why an enum beats a String or int

- **Type safety** — a method taking a `Status` *cannot* be handed a random string. Illegal values don't compile.
- **Readability** — `Status.CLOSED` says what it means; `3` does not.
- **Refactor-friendly** — rename a constant and the compiler finds every use; misspell it and compilation fails immediately.

### The methods every enum gets for free

Because an enum is a class under the hood, each one comes with useful built-ins:

- **`values()`** — an array of all the constants, in declared order (great for looping).
- **`valueOf("ACTIVE")`** — parse a constant from its exact name (throws if no match).
- **`name()`** — the constant's identifier as text, `"ACTIVE"`.
- **`ordinal()`** — its zero-based position in the declaration. Handy occasionally, but **don't persist it** — reorder the constants and every stored number silently shifts.

```java
for (Status st : Status.values()) System.out.println(st.name());
```

### Enums shine in `switch`

Switching on an enum is where they pay off most, because the compiler knows the *complete* set of cases. With an arrow `switch` expression that covers them all, you need **no `default`** — and if someone adds a `PENDING` constant next year, the compiler flags this `switch` as no longer exhaustive:

```java
String label = switch (s) {
    case ACTIVE    -> "open for business";
    case SUSPENDED -> "temporarily on hold";
    case CLOSED    -> "shut down";
};   // exhaustive — compiler is satisfied, no default needed
```

That compiler-checked completeness is a superpower a `String` can never give you.

### A note on collections

For sets and maps keyed by an enum, the standard library has specialised, fast implementations — **`EnumSet`** and **`EnumMap`** — backed by tiny bit-vectors and arrays rather than hashing. Reach for `EnumSet.of(ACTIVE, SUSPENDED)` over a `HashSet<Status>` when the keys are enum constants. So far these are plain constants; the next section shows an enum can also carry its *own* data and behaviour — which is where Java's enums pull decisively ahead of most languages'.
